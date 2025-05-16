import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDesktop, FaApple, FaWindows, FaLinux, FaExclamationTriangle } from 'react-icons/fa';

const AdminAgentDetails = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [agentDetails, setAgentDetails] = useState(null);
  const [agentDetailsLoading, setAgentDetailsLoading] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    // Get selected organization from localStorage
    const savedOrg = localStorage.getItem('selectedOrganization');
    if (savedOrg) {
      try {
        const orgData = JSON.parse(savedOrg);
        setSelectedOrganization(orgData);
        console.log("Selected organization:", orgData);
      } catch (error) {
        console.error("Error parsing organization data:", error);
      }
    }

    // Listen for organization change events
    const handleOrgChange = (event) => {
      console.log("Organization changed:", event.detail);
      setSelectedOrganization(event.detail);
      fetchAgents(event.detail.id);
    };

    window.addEventListener('organizationChanged', handleOrgChange);

    // Initial fetch
    if (savedOrg) {
      try {
        const orgData = JSON.parse(savedOrg);
        fetchAgents(orgData.id);
      } catch (error) {
        console.error("Error fetching initial agents:", error);
      }
    }

    return () => {
      window.removeEventListener('organizationChanged', handleOrgChange);
    };
  }, []);

  const fetchAgents = async (organizationId) => {
    if (!organizationId) {
      console.error("No organization ID provided");
      setErrorMessage("Please select an organization first.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      console.log(`Fetching agents for organization ID: ${organizationId}`);

      const response = await axios.get(`https://api.testerally.ai/installer/track-download/?user_id=${organizationId}`);
      
      console.log("Agents API response:", response.data);
      
      if (response.data && response.data.id) {

        setAgents([response.data]);
      } else if (Array.isArray(response.data)) {

        setAgents(response.data);
      } else {
        setAgents([]);
      }

    } catch (error) {
      console.error('Failed to fetch agents:', error);
      setErrorMessage("Failed to load agents. Please try again later.");
      setAgents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAgentDetails = async (agentId) => {
    if (!selectedOrganization || !agentId) {
      console.error("Missing organization ID or agent ID");
      return;
    }

    setAgentDetailsLoading(true);
    try {
      const response = await axios.get(`https://api.testerally.ai/installer/cloud/systeminfo/?exe_id=${agentId}`);
      console.log("Agent details response:", response.data);
      setAgentDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch agent details:', error);
      setAgentDetails(null);
    } finally {
      setAgentDetailsLoading(false);
    }
  };


  const getCleanOsName = (agent) => {
    if (!agent || !agent.os_name) return "Unknown OS";
    
    const osLower = agent.os_name.toLowerCase();
    if (osLower.includes("mac") || osLower.includes("darwin")) return "MacOS";
    if (osLower.includes("win")) return "Windows";
    if (osLower.includes("linux")) return "Linux";
    return agent.os_name;
  };

  const getOsIcon = (osName) => {
    switch (osName.toLowerCase()) {
      case "macos":
        return <FaApple />;
      case "windows":
        return <FaWindows />;
      case "linux":
        return <FaLinux />;
      default:
        return <FaDesktop />;
    }
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    setShowDetailsModal(true);
    fetchAgentDetails(agent.id);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedAgent(null);
    setAgentDetails(null);
  };

  const renderDetailsModal = () => {
    if (!showDetailsModal || !selectedAgent) return null;
    
    const downloadCount = selectedAgent?.download_count || 0;
    const osName = getCleanOsName(selectedAgent);
    const osIcon = getOsIcon(osName);;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-xl font-semibold text-gray-800">Agent Details</h3>
            <button 
              onClick={closeDetailsModal}
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
                <div className="mt-3 grid gap-2">
                  {agentDetails.cpu && (
                    <div className="bg-white p-2 rounded">
                      <span className="font-medium text-gray-700">Processor:</span> {agentDetails.cpu}
                    </div>
                  )}
                  <div className="bg-white p-2 rounded">
                    <span className="font-medium text-gray-700">Version:</span> {selectedAgent.os_version || 'Unknown'}
                  </div>
                  {agentDetails.screen_resolution && (
                    <div className="bg-white p-2 rounded">
                      <span className="font-medium text-gray-700">Screen:</span> {agentDetails.screen_resolution}
                    </div>
                  )}
                  <div className="bg-white p-2 rounded">
                    <span className="font-medium text-gray-700">IP Address:</span> {selectedAgent.ip_address || 'Unknown'}
                  </div>
                </div>
              ) : (
                // No agent details found
                <div className="bg-yellow-50 p-3 rounded mt-3 border border-yellow-200">
                  <p className="text-yellow-800">
                    <span className="font-medium">Not Installed or Logged In:</span> No system details available 
                    for this agent. It may not have connected to the service yet.
                  </p>
                </div>
              )}
            </div>
            
            {/* Download Info */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-blue-700">Installation Details</h5>
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                    {downloadCount}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-blue-700">
                This agent has been downloaded {downloadCount} time(s).
              </p>
              {selectedAgent.last_downloaded && (
                <p className="mt-1 text-sm text-blue-700">
                  Last downloaded: {new Date(selectedAgent.last_downloaded).toLocaleString()}
                </p>
              )}
              {selectedAgent.file_version && (
                <p className="mt-1 text-sm text-blue-700">
                  Agent version: {selectedAgent.file_version}
                </p>
              )}
              {selectedAgent.is_update_available === "yes" && (
                <div className="mt-2 p-2 bg-yellow-100 rounded text-yellow-800 text-sm">
                  <FaExclamationTriangle className="inline mr-1" /> Update available for this agent
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Agent Management</h1>
        <p className="text-gray-600 mt-2">
          {selectedOrganization ? 
            `View and manage testing agents for ${selectedOrganization.name}` : 
            'Please select an organization to view agents'}
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {!selectedOrganization && !isLoading && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Please select an organization from the sidebar first.</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading agents...</span>
        </div>
      ) : selectedOrganization && agents.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
          <FaDesktop className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Agents Found</h3>
          <p className="mt-1 text-gray-500">
            No agents have been registered for this organization yet.
          </p>
        </div>
      ) : selectedOrganization && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleAgentClick(agent)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🤖</span>
                    <h2 className="text-lg font-medium text-gray-900">Agent-{agent.id}</h2>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agent.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.is_active ? 'Online' : 'Offline'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    {getOsIcon(getCleanOsName(agent))}
                    <span className="ml-2">{getCleanOsName(agent)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last Downloaded: {agent.last_downloaded || 'Never'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    Version: {agent.file_version || 'Unknown'}
                  </div>
                  <button 
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgentClick(agent);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {renderDetailsModal()}
    </div>
  );
};

export default AdminAgentDetails;