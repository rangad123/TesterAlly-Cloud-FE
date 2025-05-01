import React, { Component } from 'react';
import { Copy } from "lucide-react";

export class AgentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: [],
      userId: null,
      isLoading: true,
      isCreating: false,
      errorMessage: null,
      isDetecting: false,
      osName: '',
      osIcon: '',
      osVersion: '',
      processorInfo: '',
      browserInfo: '',
      screenResolution: '',
      devicePixelRatio: '',
      colorDepth: '',
      downloadStarted: false,
      downloadCompleted: false,
      showDetailsModal: false,
      selectedAgent: null,
      agentDetails: null,
      agentDetailsLoading: false,
      updatingAgentId: null,
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId") || this.createUserId();
    this.setState({ userId }, () => {
      this.fetchAgents();
      this.detectSystemInfoClient();
    });
  }

  createUserId = () => {
    const newUserId = `user_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("userId", newUserId);
    return newUserId;
  }

  // Fetch existing agents for the user
  fetchAgents = async () => {
    this.setState({ isLoading: true, errorMessage: null });
    try {
      const response = await fetch(`https://api.testerally.ai/installer/track-download/?user_id=${this.state.userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Agent data:", data); 
      
      // Transform the data into an array of agents if it's not already
      let agents = [];
      if (Array.isArray(data)) {
        agents = data;
      } else if (data && typeof data === 'object') {
        if (data.id) {
          agents = [data];
        } else if (data.agents && Array.isArray(data.agents)) {
          agents = data.agents;
        }
      }
      
      this.setState({ agents, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      this.setState({ 
        isLoading: false, 
        errorMessage: null
//        errorMessage: "Failed to load your agents. Please try again later." 
      });
    }
  };

  // Start the create agent process
  startCreateAgent = () => {
    this.setState({ 
      isCreating: true,
      isDetecting: true 
    }, () => {
      this.detectSystemInfoClient();
    });
  }

  // Cancel the create agent process
  cancelCreateAgent = () => {
    this.setState({ 
      isCreating: false,
      isDetecting: false,
      downloadStarted: false,
      downloadCompleted: false
    });
  }

  // Client-side system detection
detectSystemInfoClient = async () => {
  this.setState({ isDetecting: true });
  
  // Initialize default values
  let detectedOs = '';
  let osName = '';
  let osIcon = '';
  let osVersion = '';
  let processorInfo = '';
  let browserInfo = '';
  let browserVersion = '';
  let deviceModel = '';
  let isMobile = false;
  
  try {
    // Try to use modern navigator.userAgentData API first (more accurate and privacy-preserving)
    if (navigator.userAgentData) {
      console.log("Using modern UserAgentData API");
      
      // Basic low-entropy values
      const brands = navigator.userAgentData.brands;
      isMobile = navigator.userAgentData.mobile;
      const platform = navigator.userAgentData.platform;
      
      // Set detected OS based on platform
      detectedOs = platform;
      osName = platform;
      
      // Set OS icon based on platform
      if (/Windows/i.test(platform)) {
        osIcon = '🪟';
        detectedOs = 'Windows';
      } else if (/macOS/i.test(platform)) {
        osIcon = '🍎';
        detectedOs = 'macOS';
      } else if (/Linux/i.test(platform)) {
        osIcon = '🐧';
        detectedOs = 'Linux';
      } else if (/Android/i.test(platform)) {
        osIcon = '📱';
        detectedOs = 'Android';
      } else if (/iOS/i.test(platform)) {
        osIcon = '📱';
        detectedOs = 'iOS';
      } else {
        osIcon = '🖥️';
      }
      
      // Get browser info from brands
      const brandInfo = brands.find(brand => 
        !brand.brand.includes('Not') && 
        !brand.brand.includes('Google') && 
        brand.brand !== 'Chromium'
      );
      if (brandInfo) {
        browserInfo = brandInfo.brand;
        browserVersion = brandInfo.version;
      }
      
      // Try to get high-entropy values (requires permission in some browsers)
      try {
        const highEntropyValues = await navigator.userAgentData.getHighEntropyValues([
          "architecture",
          "bitness",
          "model",
          "platformVersion",
          "uaFullVersion",
          "fullVersionList"
        ]);
        
        console.log("High entropy values:", highEntropyValues);
        
        // Enhanced OS detection with version
        if (highEntropyValues.platformVersion) {
          osVersion = `${osName} ${highEntropyValues.platformVersion}`;
        }
        
        // Enhanced processor info
        if (highEntropyValues.architecture && highEntropyValues.bitness) {
          processorInfo = `${highEntropyValues.architecture} ${highEntropyValues.bitness}-bit`;
        }
        
        // Device model (mostly for mobile)
        if (highEntropyValues.model) {
          deviceModel = highEntropyValues.model;
        }
        
        // More detailed browser version
        if (highEntropyValues.uaFullVersion) {
          browserVersion = highEntropyValues.uaFullVersion;
        }
        
        // For Windows, extract more readable version
        if (detectedOs === 'Windows' && highEntropyValues.platformVersion) {
          const winVersion = parseFloat(highEntropyValues.platformVersion);
          if (winVersion >= 13) {
            osVersion = 'Windows 11';
          } else if (winVersion >= 10) {
            osVersion = 'Windows 10';
          } else if (winVersion >= 6.3) {
            osVersion = 'Windows 8.1';
          } else if (winVersion >= 6.2) {
            osVersion = 'Windows 8';
          } else if (winVersion >= 6.1) {
            osVersion = 'Windows 7';
          }
        }
        
        // For macOS, make version more readable
        if (detectedOs === 'macOS' && highEntropyValues.platformVersion) {
          const majorVersion = parseInt(highEntropyValues.platformVersion.split('.')[0], 10);
          if (majorVersion >= 14) {
            osVersion = `macOS Sequoia (${highEntropyValues.platformVersion})`;
          } else if (majorVersion === 13) {
            osVersion = `macOS Sonoma (${highEntropyValues.platformVersion})`;
          } else if (majorVersion === 12) {
            osVersion = `macOS Monterey (${highEntropyValues.platformVersion})`;
          } else if (majorVersion === 11) {
            osVersion = `macOS Big Sur (${highEntropyValues.platformVersion})`;
          } else if (majorVersion === 10) {
            const minorVersion = parseInt(highEntropyValues.platformVersion.split('.')[1], 10);
            if (minorVersion >= 15) {
              osVersion = `macOS Catalina (${highEntropyValues.platformVersion})`;
            } else if (minorVersion >= 14) {
              osVersion = `macOS Mojave (${highEntropyValues.platformVersion})`;
            } else if (minorVersion >= 13) {
              osVersion = `macOS High Sierra (${highEntropyValues.platformVersion})`;
            }
          }
        }
      } catch (highEntropyError) {
        console.warn("Failed to get high entropy values:", highEntropyError);
        // Continue with fallback detection below
      }
    }
    
    // Fallback to traditional userAgent if userAgentData isn't available or didn't provide complete info
    if (!detectedOs || !osVersion) {
      console.log("Using traditional userAgent fallback");
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      
      // OS detection
      if (/Windows NT/.test(userAgent)) {
        detectedOs = "Windows";
        osIcon = "🪟";
        
        if (/Windows NT 10.0/.test(userAgent)) {
          osVersion = "Windows 10/11";
        } else if (/Windows NT 6.3/.test(userAgent)) {
          osVersion = "Windows 8.1";
        } else if (/Windows NT 6.2/.test(userAgent)) {
          osVersion = "Windows 8";
        } else if (/Windows NT 6.1/.test(userAgent)) {
          osVersion = "Windows 7";
        } else {
          osVersion = "Windows (unknown version)";
        }
      } else if (/Macintosh|Mac OS X|MacIntel/.test(userAgent)) {
        detectedOs = "macOS";
        osIcon = "🍎";
        
        // Try to extract macOS version
        const macOSVersionMatch = userAgent.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
        if (macOSVersionMatch) {
          const versionString = macOSVersionMatch[1].replace(/_/g, '.');
          osVersion = `macOS ${versionString}`;
        } else {
          osVersion = "macOS (unknown version)";
        }
      } else if (/Linux/.test(userAgent) && !/Android/.test(userAgent)) {
        detectedOs = "Linux";
        osIcon = "🐧";
        
        // Try to detect Linux distribution
        if (/Ubuntu/.test(userAgent)) {
          osVersion = "Ubuntu";
        } else if (/Fedora/.test(userAgent)) {
          osVersion = "Fedora";
        } else if (/Debian/.test(userAgent)) {
          osVersion = "Debian";
        } else {
          osVersion = "Linux (unknown distribution)";
        }
      } else if (/Android/.test(userAgent)) {
        detectedOs = "Android";
        osIcon = "📱";
        
        // Try to extract Android version
        const androidVersionMatch = userAgent.match(/Android (\d+(\.\d+)+)/);
        if (androidVersionMatch) {
          osVersion = `Android ${androidVersionMatch[1]}`;
        } else {
          osVersion = "Android (unknown version)";
        }
      } else if (/iPhone|iPad|iPod/.test(userAgent)) {
        const device = /iPhone/.test(userAgent) ? "iPhone" : 
                      (/iPad/.test(userAgent) ? "iPad" : "iPod");
        detectedOs = "iOS";
        osIcon = "📱";
        
        // Try to extract iOS version
        const iosVersionMatch = userAgent.match(/OS (\d+_\d+(_\d+)?)/);
        if (iosVersionMatch) {
          const iosVersion = iosVersionMatch[1].replace(/_/g, '.');
          osVersion = `iOS ${iosVersion} (${device})`;
        } else {
          osVersion = `iOS (${device})`;
        }
      } else {
        detectedOs = "Unknown";
        osIcon = "❓";
        osVersion = "Unknown OS";
      }
      
      // Processor architecture detection
      if (!processorInfo) {
        if (/Win64|x64|WOW64|x86_64/.test(userAgent)) {
          processorInfo = "64-bit architecture";
        } else if (/Win32|x86/.test(userAgent)) {
          processorInfo = "32-bit architecture";
        } else if (/ARM/.test(userAgent)) {
          if (/Apple/.test(userAgent)) {
            processorInfo = "Apple Silicon";
          } else {
            processorInfo = "ARM architecture";
          }
        } else if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
          processorInfo = "Apple Silicon (M1/M2/M3)";
        } else if (/Intel/.test(userAgent) || platform === 'MacIntel') {
          processorInfo = "Intel processor";
        } else {
          processorInfo = "Unknown architecture";
        }
      }

    }
    
    // Screen information
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const devicePixelRatio = `${window.devicePixelRatio || 1}x`;
    const colorDepth = `${window.screen.colorDepth}-bit`;
    
    // Additional device info
    const memoryInfo = navigator.deviceMemory 
      ? `${navigator.deviceMemory} GB RAM` 
      : "Unknown RAM";
    
    const logicalCores = navigator.hardwareConcurrency 
      ? `${navigator.hardwareConcurrency} logical cores` 
      : "Unknown cores";

    
    // Set full browser info with version
    const fullBrowserInfo = browserVersion 
      ? `${browserInfo} ${browserVersion}` 
      : browserInfo;
    
    // Enhanced processor info
    const enhancedProcessorInfo = logicalCores !== "Unknown cores" 
      ? `${processorInfo} (${logicalCores})` 
      : processorInfo;
    
    // Update state with all the collected information
    this.setState({
      detectedOs,
      selectedOs: detectedOs, 
      osName,
      osIcon,
      osVersion,
      processorInfo: enhancedProcessorInfo,
      browserInfo: fullBrowserInfo,
      screenResolution,
      devicePixelRatio,
      colorDepth,
      memoryInfo,
      deviceModel: deviceModel || "Unknown model",
      isMobile,
      isDetecting: false
    }, () => {
      this.detectBestArchitecture();
    });
    
    console.log("System detection complete:", {
      detectedOs,
      osName,
      osVersion,
      processorInfo: enhancedProcessorInfo,
      browserInfo: fullBrowserInfo,
      screenResolution,
      memoryInfo,
      deviceModel,
    });
    
  } catch (error) {
    console.error("Error during system detection:", error);
    
    // Fallback to basic detection in case of error
    this.setState({
      detectedOs: "Unknown",
      selectedOs: "Windows", // Default to Windows as a safe bet
      osName: "Unknown",
      osIcon: "❓",
      osVersion: "Unknown",
      processorInfo: "Unknown",
      browserInfo: "Unknown",
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      isDetecting: false
    });
  }
}

handleOsSelection = (os) => {
  this.setState({ 
    selectedOs: os,
    selectedArchitecture: ''
  }, () => {
    this.detectBestArchitecture();
  });
}

detectBestArchitecture = () => {
  const { selectedOs, processorInfo } = this.state;
  let bestArch = '';
  
  console.log("Detecting architecture from processor info:", processorInfo);
  
  // Check processor info to suggest the best architecture
  if (selectedOs === 'Windows') {
    if (/Apple Silicon|ARM|arm64/i.test(processorInfo)) {
      bestArch = 'arm64';
    } else if (/64[-\s]?bit|x64|x86_64|amd64/i.test(processorInfo)) {
      bestArch = 'x64';
    } else if (/32[-\s]?bit|x86(?!\s*[-_]?64)|i[3-6]86/i.test(processorInfo)) {
      bestArch = 'x86';
    } else {
      // Default to x64 for modern Windows systems
      bestArch = 'x64';
    }
  } else if (selectedOs === 'macOS') {
    if (/Apple Silicon|M1|M2|M3|ARM/i.test(processorInfo)) {
      bestArch = 'arm64';
    } else if (/Intel/i.test(processorInfo)) {
      bestArch = 'intel';
    } else {
      // Default to universal for macOS
      bestArch = 'universal';
    }
  } else if (selectedOs === 'Linux') {
    if (/ARM|arm64|aarch64/i.test(processorInfo)) {
      bestArch = 'arm64';
    } else if (/64[-\s]?bit|x64|x86_64|amd64/i.test(processorInfo)) {
      bestArch = 'x64';
    } else {
      // Default to x64 for modern Linux systems
      bestArch = 'x64';
    }
  }

  console.log("Detected best architecture:", bestArch, "from processor info:", processorInfo);
  
  // Update state with best architecture if found
  if (bestArch) {
    this.setState({ selectedArchitecture: bestArch });
  }
}


  getDownloadInfo = () => {
    const { osName } = this.state;
    
    switch (osName) {
      case "Windows":
        return {
          fileName: "testerally_setup.exe",
          buttonText: "Download for Windows"
        };
      case "macOS":
        return {
          fileName: "testerally_setup.dmg",
          buttonText: "Download for macOS"
        };
      case "Ubuntu":
      case "Debian":
      case "Fedora":
      case "Linux":
        return {
          fileName: "testerally_setup.deb",
          buttonText: "Download for Linux"
        };
      case "Android":
        return {
          fileName: "testerally.apk",
          buttonText: "Download for Android"
        };
      case "iOS":
      case "iPadOS":
        return {
          fileName: "",
          buttonText: "Get on App Store",
          appStoreLink: "https://apps.apple.com/app/testerally"
        };
      default:
        return {
          fileName: "",
          buttonText: "Choose your download"
        };
    }
  }

  handleDownload = async () => {
    const downloadUrl = "https://github.com/rangad123/TestAuth-BE/releases/download/V1.0/TesterAlly_01_009.exe";
    
    // Extract version from the URL
    const fileNameMatch = downloadUrl.match(/TesterAlly_([^.]+)\.exe/);
    const versionString = fileNameMatch ? fileNameMatch[1] : "unknown";
    
    // Rest of your existing download code...
    const existingAgent = this.state.agents.find(agent => 
      agent.os_name === this.state.osName && 
      agent.os_version === this.state.osVersion
    );
  
    if (existingAgent && existingAgent.download_count >= 3) {
      this.setState({ 
        errorMessage: "Download limit reached. Each system has a maximum of 3 downloads."
      });
      return;
    }
  
    this.setState({ downloadStarted: true });
  
    try {

        const response = await fetch('https://api.testerally.ai/installer/track-download/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id: this.state.userId,
                os_name: this.state.osName,
                os_version: this.state.osVersion,
                file_version: versionString 
            }),
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Agent created:", data);
  
        // Step 2: Start the actual download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `TesterAlly_${versionString}.exe`); 
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        console.log("Download started successfully.");

        setTimeout(() => {
            this.setState({ 
                downloadStarted: false, 
                downloadCompleted: true 
            });
  
            setTimeout(() => {
                this.fetchAgents();
                this.setState({ 
                    isCreating: false,
                    downloadCompleted: false
                });
            }, 2000);
            
        }, 3000);
        
    } catch (error) {
        console.error('Download error:', error);
        this.setState({ 
            downloadStarted: false,
            errorMessage: `Failed to download: ${error.message}`
        });
    }
  };

  isUpdateAvailable = (agent) => {
    const downloadUrl = "https://github.com/rangad123/TestAuth-BE/releases/download/V1.0/TesterAlly_01_009.exe";
    const fileNameMatch = downloadUrl.match(/TesterAlly_([^.]+)\.exe/);
    const currentVersion = fileNameMatch ? fileNameMatch[1] : "unknown";
  
    const agentVersion = agent.file_version || "unknown";
    const isUpdate = currentVersion !== agentVersion;
  
    console.log("agentVersion:", agentVersion);
    console.log("currentVersion:", currentVersion);

    this.trackUpdateStatus(agent, isUpdate ? "yes" : "no");
  
    return isUpdate;
  };
  
  trackUpdateStatus = async (agent, isUpdateAvailable) => {
    try {
      const queryParams = new URLSearchParams({
        user_id: this.state.userId,
      });
  
      const getResponse = await fetch(`https://api.testerally.ai/installer/track-download/?${queryParams}`);
      if (!getResponse.ok) {
        throw new Error("Failed to fetch download UID");
      }
  
      const agentData = await getResponse.json();
      console.log("agentData status tracked:", agentData);
  
      if (!Array.isArray(agentData) || agentData.length === 0) {
        throw new Error("No agent data found");
      }
  
      const downloadUid = agentData[0].download_uid;
  
      console.log("Sending PUT payload:", {
        download_uid: downloadUid,
        is_update_available: isUpdateAvailable
      });
  
      const putResponse = await fetch(`https://api.testerally.ai/installer/track-download/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          download_uid: downloadUid,
          is_update_available: isUpdateAvailable
        }),
      });

      const responseBody = putResponse
    console.log("PUT Response body:", responseBody);
  
      if (!putResponse.ok) {
        const errorText = await putResponse.text();
        throw new Error(`PUT update failed: ${errorText}`);
      }
  
      console.log("Update status tracked successfully:", isUpdateAvailable);
  
    } catch (error) {
      console.error("Tracking update status failed:", error.message);
    }
  };
  
  updateAgent = async (agentId, e) => {
    e.stopPropagation(); 

    this.setState({ updatingAgentId: agentId });

    const downloadUrl = "https://github.com/rangad123/TestAuth-BE/releases/download/V1.0/TesterAlly_01_009.exe";
    const fileNameMatch = downloadUrl.match(/TesterAlly_([^.]+)\.exe/);
    const versionString = fileNameMatch ? fileNameMatch[1] : "unknown";
    
    try {
      const response = await fetch(`https://api.testerally.ai/installer/track-download/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: this.state.userId,
          os_name: this.state.osName,
          os_version: this.state.osVersion,
          file_version: versionString
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `TesterAlly_${versionString}.exe`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        this.fetchAgents();
        this.setState({ updatingAgentId: null });
      }, 3000);
      
    } catch (error) {
      console.error('Update error:', error);
      this.setState({ 
        errorMessage: `Failed to update: ${error.message}`,
        updatingAgentId: null
      });
    }
  };

fetchAgentDetails = async (agentId) => {
  console.log("user_id:", this.state.userId);
  console.log("agentId:", agentId);

  this.setState({ agentDetailsLoading: true });

  try {
    const response = await fetch(`https://api.testerally.ai/installer/cloud/systeminfo/?exe_id=${agentId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Agent details:", data);
    
    // Always set loading to false, regardless of result
    this.setState({ agentDetailsLoading: false });
    
    // Check if the data object contains valid agent details
    if (data && Array.isArray(data) && data.length > 0) {
      // Find system data
      const systemData = data;
      
      // Update the agents list with the accurate details
      const updatedAgents = this.state.agents.map(agent => {
        // Find the matching system data based on OS
        const osName = this.getCleanOsName(agent).toLowerCase();
        const matchingSystemData = systemData.find(sys => {
          const sysOsName = (sys.os_name || "").toLowerCase();
          return sysOsName.includes(osName) || osName.includes(sysOsName);
        });
        
        if (agent.id === agentId && matchingSystemData) {
          return { ...agent, systemInfo: matchingSystemData };
        }
        return agent;
      });
      
      this.setState({ agents: updatedAgents });
      
      // Find the specific agent's system info
      const currentAgent = updatedAgents.find(a => a.id === agentId);
      return currentAgent?.systemInfo || null;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch agent details:', error);
    this.setState({ 
      errorMessage: "Failed to load agent details. Please try again later.",
      agentDetailsLoading: false // Ensure loading state is reset on error
    });
    return null;
  }
};

showAgentDetails = async (agentId) => {
  // First show the modal with loading state
  const agent = this.state.agents.find(a => a.id === agentId);
  
  if (!agent) {
    this.setState({
      errorMessage: "Agent not found."
    });
    return;
  }
  
  this.setState({ 
    showDetailsModal: true, 
    selectedAgent: agent,
    agentDetails: null,
    agentDetailsLoading: true
  });
  
  // Then fetch the details
  const agentDetails = await this.fetchAgentDetails(agentId);
  
  // Check if OS matches the current system
  const currentOsName = this.getCurrentSystemOs(); 
  const agentOsName = this.getCleanOsName(agent);
  
  const osMatches = currentOsName.toLowerCase().includes(agentOsName.toLowerCase()) ||
                    agentOsName.toLowerCase().includes(currentOsName.toLowerCase());
  
  this.setState({ 
    agentDetails,
    osMatches,
    agentDetailsLoading: false // Ensure loading is set to false
  });

  console.log("osMatches:", osMatches);
  console.log("agentDetails:", agentDetails);
};

getCurrentSystemOs = () => {
  const userAgent = window.navigator.userAgent;
  
  if (userAgent.indexOf("Windows") !== -1) return "Windows";
  if (userAgent.indexOf("Mac") !== -1) return "macOS";
  if (userAgent.indexOf("Linux") !== -1) return "Linux";
  if (userAgent.indexOf("Android") !== -1) return "Android";
  if (userAgent.indexOf("iOS") !== -1) return "iOS";
  
  return "Unknown";
};

closeDetailsModal = () => {
  this.setState({ 
    showDetailsModal: false, 
    selectedAgent: null,
    agentDetails: null 
  });
};


getCleanOsName = (agent) => {
  if (!agent) return "Unknown";
  
  // Check if the agent has os_name directly
  if (agent.os_name) return agent.os_name;
  
  // Check if the agent has systemInfo with os_name
  if (agent.systemInfo && agent.systemInfo.os_name) return agent.systemInfo.os_name;
  
  // If there's a system property containing a string with OS info
  if (typeof agent.system === 'string') {
    const system = agent.system.toLowerCase();
    if (system.includes('windows')) return 'Windows';
    if (system.includes('mac') || system.includes('osx')) return 'macOS';
    if (system.includes('linux')) return 'Linux';
    if (system.includes('android')) return 'Android';
    if (system.includes('ios')) return 'iOS';
  }
  
  return "Unknown";
};

getOsIcon = (osName) => {
  const name = osName.toLowerCase();
  
  if (name.includes('windows')) return '🪟';
  if (name.includes('mac') || name.includes('osx')) return '🍎';
  if (name.includes('linux')) return '🐧';
  if (name.includes('android')) return '🤖';
  if (name.includes('ios')) return '📱';
  
  return '💻';
};

  
  formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  }


hasAgentForCurrentOs = () => {
  const { agents } = this.state;
  const currentOsName = this.getCurrentSystemOs();
  
  return agents.some(agent => {
    const agentOsName = this.getCleanOsName(agent);
    return currentOsName.toLowerCase().includes(agentOsName.toLowerCase()) ||
           agentOsName.toLowerCase().includes(currentOsName.toLowerCase());
  });
};

  renderSystemInfo() {
    const { 
      isDetecting,
      detectedOs,
      selectedOs,
      osIcon,
      osVersion,
      processorInfo,
      screenResolution,
      devicePixelRatio,
      colorDepth,
    } = this.state;
  
    if (isDetecting) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Detecting your system...</p>
        </div>
      );
    }
  
    return (
      <div>
        {/* OS Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Your Operating System</h3>
          
          {/* Windows Option */}
          <div 
            className={`flex items-center p-4 mb-3 border rounded-lg cursor-pointer ${selectedOs === 'Windows' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => this.handleOsSelection('Windows')}
          >
            <div className="mr-3">
              <input 
                type="radio" 
                name="os" 
                checked={selectedOs === 'Windows'} 
                onChange={() => {}} 
                className="w-5 h-5 text-purple-600"
              />
            </div>
            <div className="flex items-center flex-1">
              <span className="text-xl mr-3">🪟</span>
              <span className="font-medium">Windows</span>
            </div>
            {detectedOs === 'Windows' && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Detected Platform
              </span>
            )}
          </div>
          
          {/* macOS Option */}
          <div 
            className={`flex items-center p-4 mb-3 border rounded-lg cursor-pointer ${selectedOs === 'macOS' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => this.handleOsSelection('macOS')}
          >
            <div className="mr-3">
              <input 
                type="radio" 
                name="os" 
                checked={selectedOs === 'macOS'} 
                onChange={() => {}} 
                className="w-5 h-5 text-purple-600"
              />
            </div>
            <div className="flex items-center flex-1">
              <span className="text-xl mr-3">🍎</span>
              <span className="font-medium">macOS</span>
            </div>
            {detectedOs === 'macOS' && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Detected Platform
              </span>
            )}
          </div>
          
          {/* Linux Option */}
          <div 
            className={`flex items-center p-4 mb-3 border rounded-lg cursor-pointer ${selectedOs === 'Linux' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => this.handleOsSelection('Linux')}
          >
            <div className="mr-3">
              <input 
                type="radio" 
                name="os" 
                checked={selectedOs === 'Linux'} 
                onChange={() => {}} 
                className="w-5 h-5 text-purple-600"
              />
            </div>
            <div className="flex items-center flex-1">
              <span className="text-xl mr-3">🐧</span>
              <span className="font-medium">Linux</span>
            </div>
            {detectedOs === 'Linux' && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Detected Platform
              </span>
            )}
          </div>
        </div>
        
        {/* System Details */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{osIcon || '🖥️'}</span>
            <div>
              <h3 className="text-lg font-medium text-gray-800">System Details</h3>
              <p className="text-gray-600">{osVersion || `${selectedOs} (Unknown version)`}</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <h4 className="font-medium text-purple-600">Processor</h4>
              <p className="text-gray-700">{processorInfo || 'Unknown'}</p>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <h4 className="font-medium text-purple-600">Display</h4>
              <p className="text-gray-700">{screenResolution || 'Unknown'} ({devicePixelRatio} ratio, {colorDepth})</p>
            </div>
            
            
            {/* Architecture Selection Section */}
            <div className="sm:col-span-2">
              <h4 className="font-medium text-purple-600 mb-2">Select Your Architecture</h4>
              <div className="flex flex-wrap gap-2">
                {this.renderArchitectureOptions()}
              </div>
            </div>
            
            {/* Show message for non-Windows users */}
            {selectedOs !== "Windows" && selectedOs !== "" && (
              <div className="sm:col-span-2 bg-yellow-50 p-3 rounded shadow-sm">
                <p className="text-yellow-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Note: Currently Windows installer is available. Support for {selectedOs} is coming soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  renderArchitectureOptions() {
    const { selectedOs, selectedArchitecture } = this.state;
    
    let architectureOptions = [];
    
    if (selectedOs === 'Windows') {
      architectureOptions = [
        { value: 'x64', label: 'x64 (64-bit)' },
        { value: 'x86', label: 'x86 (32-bit)' },
        { value: 'arm64', label: 'ARM64' }
      ];
    } else if (selectedOs === 'macOS') {
      architectureOptions = [
        { value: 'universal', label: 'Universal (Intel + Apple Silicon)' },
        { value: 'intel', label: 'Intel Only' },
        { value: 'arm64', label: 'Apple Silicon Only' }
      ];
    } else if (selectedOs === 'Linux') {
      architectureOptions = [
        { value: 'x64', label: 'x64 (64-bit)' },
        { value: 'arm64', label: 'ARM64' }
      ];
    }
    
    return architectureOptions.map(option => (
      <button
        key={option.value}
        className={`px-4 py-2 border rounded ${
          selectedArchitecture === option.value
            ? 'bg-purple-100 border-purple-500 text-purple-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
        onClick={() => this.setState({ selectedArchitecture: option.value })}
      >
        {option.label}
      </button>
    ));
  }

  renderDetailsModal() {
    const { showDetailsModal, selectedAgent, agentDetails, agentDetailsLoading, osMatches } = this.state;
    
    if (!showDetailsModal || !selectedAgent) return null;
    
    const downloadCount = selectedAgent?.download_count || 0;
    const remainingDownloads = 3 - downloadCount;
    const osName = this.getCleanOsName(selectedAgent);
    const osIcon = this.getOsIcon(osName);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-xl font-semibold text-gray-800">Agent Details</h3>
            <button 
              onClick={this.closeDetailsModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal Body */}
          <div className="p-6">
            {/* Agent Icon and ID */}
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🤖</span>
              <h4 className="text-lg font-medium">Agent-{selectedAgent.id}</h4>
            </div>
            
            {/* System Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{osIcon}</span>
                <span className="font-medium">{osName}</span>
              </div>
              
              {agentDetailsLoading ? (
                // Loading state
                <div className="flex justify-center mt-3">
                  <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2 text-gray-600">Loading details...</span>
                </div>
              ) : agentDetails ? (
                // Agent details found
                <>
                  {osMatches ? (
                    <div className="mt-3 grid gap-2">
                      <div className="bg-white p-2 rounded">
                        <span className="font-medium text-gray-700">Processor:</span> {agentDetails.cpu || 'Unknown'}
                      </div>
                      <div className="bg-white p-2 rounded">
                        <span className="font-medium text-gray-700">Version:</span> {agentDetails.os_version || 'Unknown'}
                      </div>
                      <div className="bg-white p-2 rounded">
                        <span className="font-medium text-gray-700">Screen:</span> {agentDetails.screen_resolution || 'Unknown'}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-3 rounded mt-3 border border-yellow-200">
                      <p className="text-yellow-800">
                        <span className="font-medium">OS Mismatch:</span> This agent is designed for {osName} systems, but 
                        you appear to be using a different operating system. After downloading and installing the agent, 
                        please run it and login with your credentials to continue.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                // No agent details found - this section will now ALWAYS show when there are no details
                <div className="bg-yellow-50 p-3 rounded mt-3 border border-yellow-200">
                  <p className="text-yellow-800">
                    <span className="font-medium">Not Installed or Logged In:</span> It appears you haven't installed 
                    this agent or haven't logged in yet. After downloading and installing the agent, 
                    please run it and login with your credentials to view system details.
                  </p>
                </div>
              )}
            </div>
            
            {/* Download Status - Cleaner Display */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-blue-700">Download Status</h5>
                <div className="flex items-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    downloadCount >= 3 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  } font-medium text-sm`}>{downloadCount}</span>
                  <span className="mx-1 text-gray-500">/</span>
                  <span className="text-gray-500">3</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-blue-700">
                {remainingDownloads > 0 
                  ? `You have ${remainingDownloads} download(s) remaining for this system.` 
                  : 'You have reached the maximum number of downloads for this system.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { 
      agents, 
      isLoading, 
      errorMessage, 
      isCreating,
      downloadStarted,
      downloadCompleted
    } = this.state;
    
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-purple-600">Testerally Agents</h1>
              <p className="text-gray-600 mt-1">Create and manage your automation agents</p>
            </div>
          </div>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errorMessage}
              </p>
            </div>
          )}
          
          {/* Initial Description and Create Button */}
          {!isCreating && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Automate Your Testing</h2>
                  <p className="text-gray-600 mb-2">
                    Testerally Agent is a powerful testing automation tool that helps you create, run, and manage automated tests.
                  </p>
                  <ul className="text-gray-600 ml-5 list-disc mb-4 md:mb-0">
                    <li>Record and replay user interactions</li>
                    <li>Generate test scripts automatically</li>
                    <li>Run tests across different environments</li>
                    <li>Get detailed reports and analytics</li>
                  </ul>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center justify-center mt-4 md:mt-0">
                  {this.hasAgentForCurrentOs() ? (
                    <>
                      <button 
                        disabled
                        className="px-6 py-3 bg-gray-300 text-gray-600 font-medium rounded-md shadow-sm cursor-not-allowed"
                      >
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Create Agent
                        </span>
                      </button>
                      <p className="text-sm text-red-600 mt-2">
                        You already have an agent for your current system.
                      </p>
                    </>
                  ) : (
                    <button 
                      onClick={this.startCreateAgent}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors shadow-sm"
                    >
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Agent
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Create Agent Flow */}
          {isCreating && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Create New Agent</h2>
                <button 
                  onClick={this.cancelCreateAgent}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* System Detection */}
          {this.renderSystemInfo()}
          
          {/* Download Button */}
          <div className="flex justify-center mt-6">
            <button 
              onClick={this.handleDownload}
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors shadow-sm disabled:bg-purple-300 disabled:cursor-not-allowed"
              disabled={!this.state.selectedOs || !this.state.selectedArchitecture || this.state.downloadStarted}
            >
              {downloadStarted ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {downloadCompleted ? "Download Complete" : "Downloading..."}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Continue
                </>
              )}
            </button>
          </div>
          
          {/* Download confirmation message */}
          {downloadCompleted && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Download complete! Your agent will appear in the list below shortly.
              </p>
            </div>
          )}
        </div>
      )}
          
          {/* Agent List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Agents</h2>
              <p className="text-gray-600 mt-1">View and manage all your installed agents</p>
            </div>
            
            {isLoading ? (
              <div className="p-6 flex justify-center">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-purple-600">Loading agents...</span>
              </div>
            ) : agents.length === 0 ? (
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-gray-600">You don't have any agents yet.</p>
                <p className="text-gray-500 text-sm mt-1">Create your first agent by clicking the "Create Agent" button.</p>
              </div>
            ) : (
              <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 top-0">
                    <tr>
                      <th className="px-6 py-3 font-semibold tracking-wide">Agent ID</th>
                      <th className="px-6 py-3 font-semibold tracking-wide">System</th>
                      <th className="px-6 py-3 font-semibold tracking-wide">Last Active</th>
                      <th className="px-6 py-3 font-semibold tracking-wide">Download Count</th>
                      <th className="px-6 py-3 font-semibold tracking-wide">Agenty Key</th>
                    
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {agents.map((agent, index) => {
                      const osName = this.getCleanOsName(agent);
                      const osVersion = agent.os_version || '';

                      return (
                        <tr
                          key={agent.id || index}
                          className="hover:bg-gray-50 transition-all duration-150 cursor-pointer"
                          onClick={() => this.showAgentDetails(agent.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 flex items-center">
                            <span className="text-xl mr-2">🤖</span>
                            Agent-{agent.id || index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">{this.getOsIcon(agent.os_name || 'Unknown')}</span>
                              <div>
                                <div className="font-medium">{osName}</div>
                                {osVersion && (
                                  <div className="text-gray-500 text-xs truncate max-w-[150px]">{osVersion}</div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            {this.formatDate(agent.last_downloaded)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                              {agent.download_count || 0} downloads
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {this.isUpdateAvailable(agent) ? (
                              <button
                                className={`px-3 py-1 rounded-md text-sm font-medium ${
                                  this.state.updatingAgentId === agent.id 
                                    ? "bg-gray-200 text-gray-600 cursor-not-allowed" 
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                }`}
                                onClick={(e) => this.updateAgent(agent.id, e)}
                                disabled={this.state.updatingAgentId === agent.id}
                              >
                                {this.state.updatingAgentId === agent.id ? (
                                  <div className="flex items-center">
                                    <div className="w-4 h-4 mr-2 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Update
                                  </div>
                                )}
                              </button>
                            ) : (
                              <div
                                className="flex items-center space-x-2 group cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(agent.download_uid);
                                  const copiedText = e.currentTarget.querySelector(".copied-text");
                                  const copyLabel = e.currentTarget.querySelector(".copy-label");
                                  copiedText.classList.remove("hidden");
                                  copyLabel.classList.add("hidden");
                                  setTimeout(() => {
                                    copiedText.classList.add("hidden");
                                    copyLabel.classList.remove("hidden");
                                  }, 2000);
                                }}
                              >
                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-800 truncate max-w-[150px]">
                                  {agent.download_uid}
                                </span>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Copy className="w-4 h-4 group-hover:text-black transition" />
                                  <span className="copy-label">Copy</span>
                                  <span className="copied-text hidden text-green-600">Copied!</span>
                                </div>
                              </div>
                            )}
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            )}
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">Need help? Contact our support team at 
              <a href="mailto:support@testerally.ai" className="text-purple-600 hover:text-purple-800 ml-1">support@testerally.ai</a>
            </p>
            <p className="text-gray-500 text-sm mt-2">© 2025 Testerally.ai - All rights reserved</p>
          </div>
        </div>
        {/* Details Modal */}
        {this.renderDetailsModal()}
      </div>
    );
  }
}

export default AgentList;