
import React, { useState, useEffect, useRef, useMemo } from 'react';

function TesterAllyDocs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  // const [selectedProjectType, setSelectedProjectType] = useState('web-desktop');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  const gettingStartedRef = useRef(null);
  const aiPromptRef = useRef(null);
  const otpVerificationRef = useRef(null);
  const bestPracticesRef = useRef(null);
  const commandsRef = useRef(null);
  const examplesRef = useRef(null);
  const apiRef = useRef(null);

  const sectionRefs = useMemo(
    () => ({
      'getting-started': gettingStartedRef,
      'ai-prompt': aiPromptRef,
      'otp-verification': otpVerificationRef,
      'best-practices': bestPracticesRef,
      'commands': commandsRef,
      'examples': examplesRef,
      'api': apiRef,
    }),
    []
  );

   useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (sectionKey) => {
    const element = sectionRefs[sectionKey]?.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  };

  const navigationItems = [
    { key: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { key: 'ai-prompt', label: 'AI Prompt to Test Steps', icon: '🤖' },
    { key: 'otp-verification', label: 'OTP Verification', icon: '🔐' },
    { key: 'best-practices', label: 'Best Practices', icon: '💡' },
    // { key: 'commands', label: 'Supported Commands', icon: '⚡' },
    { key: 'examples', label: 'Examples', icon: '📝' },
    { key: 'api', label: 'API Reference', icon: '🔗' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-purple-600">TesterAlly Docs</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-purple-600">TesterAlly</h2>
            <p className="text-sm text-gray-600 mt-1">Documentation</p>
          </div>
          
          <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
            {navigationItems.map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3
                  ${activeSection === item.key
                    ? 'bg-purple-100 text-purple-700 font-medium border-r-2 border-purple-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 bg-purple-100" ref={contentRef}>
          <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
            
            {/* Getting Started Section */}
            <section ref={sectionRefs['getting-started']} className="mb-16">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-600">TesterAlly</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">AI-Powered Testing Made Simple</h2>
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    TesterAlly is an AI-powered testing agent that empowers anyone—technical or not—to build full end-to-end tests simply by describing user actions in plain English. By focusing on the end user's perspective, TesterAlly dramatically reduces the need for ongoing maintenance caused by frequent UI or locator changes.
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-8 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-purple-600 text-center">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">💻</span>
                      </div>
                      <h4 className="text-lg font-semibold text-purple-600">No-Code Simplicity</h4>
                    </div>
                    <p className="text-gray-600 text-center text-sm">Write tests in plain English—no coding required. Intelligent language interpretation turns your instructions into robust test cases.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h4 className="text-lg font-semibold text-purple-600">Smart Maintenance</h4>
                    </div>
                    <p className="text-gray-600 text-center text-sm">Say goodbye to brittle locators. Auto-adjusts test steps when UI changes are detected through semantic analysis.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <h4 className="text-lg font-semibold text-purple-600">AI Prompt Generation</h4>
                    </div>
                    <p className="text-gray-600 text-center text-sm">Simply describe your test scenario in natural language and TesterAlly automatically generates complete test steps for you.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🔐</span>
                      </div>
                      <h4 className="text-lg font-semibold text-blue-600">OTP Verification</h4>
                    </div>
                    <p className="text-gray-600 text-center text-sm">Built-in support for OTP verification during test execution. Connect your OTP receiver device for seamless authentication testing.</p>
                  </div>
                </div>
              </div>

              {/* Platform Support */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">Platform Support</h3>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <p className="mb-4 text-gray-700">TesterAlly seamlessly supports test automation across multiple platforms:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ul className="list-disc ml-6 space-y-2 text-gray-600">
                      <li>Web applications (Laptop/PC and Mobile)</li>
                      <li>Mobile applications (Android)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Start Guide */}
              <div className="bg-purple-50 rounded-xl p-6 md:p-8 border border-purple-200">
                <h3 className="text-2xl font-bold mb-6 text-purple-600">Quick Start Guide</h3>
                <p className="mb-6 text-gray-700">Follow these simple steps to create your first test with TesterAlly:</p>
                
                <div className="space-y-4">
                  {[
                    "Sign up for a TesterAlly account",
                    "Create a new agent",
                    "Install the agent file and log in using your agent key",
                    "Connect with your GitHub account",
                    "Create a project and invite members to your project",
                    "Use the AI prompt feature to quickly generate test steps from descriptions"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 pt-1 text-sm md:text-base">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* AI Prompt Section */}
            <section ref={sectionRefs['ai-prompt']} className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-purple-600">AI Prompt to Test Steps</h3>
              <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <p className="text-gray-700 mb-6 text-lg">
                  TesterAlly's AI-powered prompt feature allows you to generate complete test cases by simply describing what you want to test in natural language.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-semibold mb-4 text-purple-600">How it works:</h4>
                  <div className="space-y-3">
                    {[
                      "Describe your test scenario in plain English",
                      "AI converts your description into actionable test steps",
                      "Review and modify the generated steps if needed",
                      "Execute all steps automatically"
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <p className="text-purple-700 font-semibold mb-3">💡 Example Prompt:</p>
                  <p className="text-gray-700 italic mb-4 bg-white p-3 rounded border">"Test user login with email admin@test.com and password 123, then verify the dashboard loads and shows welcome message"</p>
                  <p className="text-purple-700 font-semibold mb-3">🔄 Generated Steps:</p>
                  <ol className="list-decimal ml-6 text-green-700 space-y-1 bg-white p-4 rounded border font-mono text-sm">
                    <li>open https://app.example.com/login</li>
                    <li>type admin@test.com in email field</li>
                    <li>type 123 in password field</li>
                    <li>click Login button</li>
                    <li>verify Dashboard page loads</li>
                    <li>verify Welcome message appears</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* OTP Verification Section */}
            <section ref={sectionRefs['otp-verification']} className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-purple-600">OTP Verification</h3>
              <div className="bg-white rounded-xl p-6 md:p-8 border border-blue-200 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-xl">🔐</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-blue-600">Seamless OTP Testing</h4>
                </div>
                
                <p className="text-gray-700 mb-6 text-lg">
                  TesterAlly includes built-in support for OTP (One-Time Password) verification during test case creation and execution. This feature enables comprehensive testing of authentication flows that require OTP validation.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h5 className="text-lg font-semibold mb-4 text-blue-600">Setup Requirements:</h5>
                  <div className="space-y-3 text-gray-700">
                    {[
                      "Connect your OTP receiver device to TesterAlly",
                      "Configure device settings in your agent configuration",
                      "Follow the detailed instructions provided within the tool"
                    ].map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span>{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
                  <p className="text-blue-700 font-semibold mb-3">📱 Example Usage in Prompt:</p>
                  <div className="bg-white p-4 rounded border mb-4">
                    <p className="text-gray-700 italic text-sm md:text-base">
                      "Test user registration with phone number +1234567890, wait for OTP verification, enter OTP code, and verify account creation success"
                    </p>
                  </div>
                  
                  <p className="text-blue-700 font-semibold mb-3">🔄 Generated Steps with OTP:</p>
                  <div className="bg-white p-4 rounded border overflow-x-auto">
                    <ol className="list-decimal ml-4 text-green-700 space-y-1 font-mono text-xs md:text-sm">
                      <li>open https://app.example.com/register</li>
                      <li>type +1234567890 in phone number field</li>
                      <li>click Send OTP button</li>
                      <li>wait for OTP verification step</li>
                      <li>retrieve OTP from connected device</li>
                      <li>type OTP code in verification field</li>
                      <li>click Verify button</li>
                      <li>verify Account created successfully message</li>
                    </ol>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> For OTP verification, simply include "OTP" or "verification code" in your test description. TesterAlly will automatically handle the OTP retrieval process using your connected device.
                  </p>
                </div>
              </div>
            </section>

            {/* Best Practices Section */}
            <section ref={sectionRefs['best-practices']} className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-purple-600">Best Practices</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Write User-Focused Tests",
                    description: "Focus on what users actually do, not technical implementation details. This makes tests more maintainable and meaningful.",
                    color: "purple",
                    icon: "👤"
                  },
                  {
                    title: "Use Clear, Descriptive Language",
                    description: 'Be specific about elements and actions. Instead of "click button", use "click the Submit button" or "click the red Save button".',
                    color: "purple",
                    icon: "📝"
                  },
                  {
                    title: "Add Verification Steps",
                    description: "Always verify that actions completed successfully. Check for success messages, page changes, or expected elements.",
                    color: "purple",
                    icon: "✅"
                  },
                  {
                    title: "Leverage AI Prompt Generation",
                    description: "Use descriptive prompts to quickly generate test cases. The more specific your description, the better the generated steps will be.",
                    color: "purple",
                    icon: "🤖"
                  },
                  {
                    title: "Include OTP Testing When Needed",
                    description: 'For authentication flows requiring OTP, simply mention "OTP verification" in your test description. Ensure your OTP receiver device is properly connected and configured.',
                    color: "blue",
                    icon: "🔐"
                  }
                ].map((practice, index) => (
                  <div key={index} className={`bg-white rounded-lg p-6 border border-${practice.color}-200 shadow-sm hover:shadow-md transition-shadow`}>
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 bg-${practice.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-lg">{practice.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-semibold mb-3 text-${practice.color}-600`}>{practice.title}</h4>
                        <p className="text-gray-700">{practice.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Commands Section */}
            {/* <section ref={sectionRefs['commands']} className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-purple-600">Supported Commands</h3>
              <p className="mb-8 text-lg text-gray-700">TesterAlly supports a comprehensive set of commands for interacting with your application. All commands use natural language syntax.</p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-purple-600">Select Project Type & Platform:</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: 'web-desktop', label: 'Web Application (Desktop/PC)' },
                    { key: 'web-mobile', label: 'Web Application (Mobile Platform)' },
                    { key: 'mobile-android', label: 'Mobile Application (Android)' }
                  ].map(type => (
                    <button
                      key={type.key}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        selectedProjectType === type.key
                          ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedProjectType(type.key)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mb-8">
                <h4 className="text-xl font-bold text-purple-700 mb-2">Currently Showing Commands For:</h4>
                <p className="text-lg text-purple-600">
                  {selectedProjectType === 'web-desktop' && 'Web Application (Desktop/PC)'}
                  {selectedProjectType === 'web-mobile' && 'Web Application (Mobile Platform)'}
                  {selectedProjectType === 'mobile-android' && 'Mobile Application (Android)'}
                </p>
              </div>

              <div className="space-y-8">
                {selectedProjectType === 'web-desktop' && (
                  <>
                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Navigation Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">open [URL]</code>
                          <p className="text-gray-700 mb-2">Navigate to a specific URL</p>
                          <p className="text-sm text-gray-500 italic">Example: "open https://example.com"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Interaction Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">click [element]</code>
                          <p className="text-gray-700 mb-2">Click on buttons, links, or any clickable element</p>
                          <p className="text-sm text-gray-500 italic">Example: "click the Login button"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">type [text] in [element]</code>
                          <p className="text-gray-700 mb-2">Enter text into input fields</p>
                          <p className="text-sm text-gray-500 italic">Example: "type admin in the username field"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Verification Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">verify [element]</code>
                          <p className="text-gray-700 mb-2">Check if an element is displayed on the page</p>
                          <p className="text-sm text-gray-500 italic">Example: "verify Welcome message"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">get [element]</code>
                          <p className="text-gray-700 mb-2">Check if an element contains specific text</p>
                          <p className="text-sm text-gray-500 italic">Example: "get user email"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">wait (modal appear)</code>
                          <p className="text-gray-700 mb-2">Wait for an element to become visible</p>
                          <p className="text-sm text-gray-500 italic">Example: "wait for confirmation modal to appear"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Scroll Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">scroll up</code>
                          <p className="text-gray-700 mb-2">Scroll the page upward</p>
                          <p className="text-sm text-gray-500 italic">Example: "scroll up"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">scroll down</code>
                          <p className="text-gray-700 mb-2">Scroll the page downward</p>
                          <p className="text-sm text-gray-500 italic">Example: "scroll down"</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}


                {selectedProjectType === 'web-mobile' && (
                  <>
                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Navigation Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">open [URL]</code>
                          <p className="text-gray-700 mb-2">Navigate to a specific URL in mobile browser</p>
                          <p className="text-sm text-gray-500 italic">Example: "open https://m.example.com"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Interaction Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">click [element]</code>
                          <p className="text-gray-700 mb-2">Tap on buttons, links, or any tappable element</p>
                          <p className="text-sm text-gray-500 italic">Example: "click the Login button"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">type [text] in [element]</code>
                          <p className="text-gray-700 mb-2">Enter text into input fields</p>
                          <p className="text-sm text-gray-500 italic">Example: "type admin in the username field"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Verification Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">verify [element]</code>
                          <p className="text-gray-700 mb-2">Check if an element is displayed on the page</p>
                          <p className="text-sm text-gray-500 italic">Example: "verify Welcome message"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">get [element]</code>
                          <p className="text-gray-700 mb-2">Check if an element contains specific text</p>
                          <p className="text-sm text-gray-500 italic">Example: "get user email"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">wait (modal appear)</code>
                          <p className="text-gray-700 mb-2">Wait for an element to become visible</p>
                          <p className="text-sm text-gray-500 italic">Example: "wait for loading spinner to disappear"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Scroll & Swipe Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">scroll up</code>
                          <p className="text-gray-700 mb-2">Scroll the page upward</p>
                          <p className="text-sm text-gray-500 italic">Example: "scroll up"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">scroll down</code>
                          <p className="text-gray-700 mb-2">Scroll the page downward</p>
                          <p className="text-sm text-gray-500 italic">Example: "scroll down"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe left</code>
                          <p className="text-gray-700 mb-2">Swipe left gesture</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe left"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe right</code>
                          <p className="text-gray-700 mb-2">Swipe right gesture</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe right"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe long left</code>
                          <p className="text-gray-700 mb-2">Perform a long swipe to the left</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe long left"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe long right</code>
                          <p className="text-gray-700 mb-2">Perform a long swipe to the right</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe long right"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                      <h5 className="text-lg font-semibold mb-3 text-green-700">📱 Mobile Web Special Features</h5>
                      <ul className="text-green-700 space-y-2 text-sm">
                        <li>• Commands are optimized for mobile browser interactions</li>
                        <li>• Supports touch gestures like tap, swipe, and scroll</li>
                        <li>• Responsive design elements are automatically detected</li>
                      </ul>
                    </div>
                  </>
                )}

                {selectedProjectType === 'mobile-android' && (
                  <>
                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Navigation Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">open [app name]</code>
                          <p className="text-gray-700 mb-2">Open an installed app from the device (shows dropdown suggestions)</p>
                          <p className="text-sm text-gray-500 italic">Example: "open YouTube"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">search [text]</code>
                          <p className="text-gray-700 mb-2">Search the Text</p>
                          <p className="text-sm text-gray-500 italic">Example: "search Agent"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Interaction Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">click [element]</code>
                          <p className="text-gray-700 mb-2">Tap on buttons, icons, or any tappable element</p>
                          <p className="text-sm text-gray-500 italic">Example: "click the Search button"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">type [text] in [element]</code>
                          <p className="text-gray-700 mb-2">Enter text into input fields</p>
                          <p className="text-sm text-gray-500 italic">Example: "type test video in the search field"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Verification Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">verify [element]</code>
                          <p className="text-gray-700 mb-2">Check if an element is displayed on the screen</p>
                          <p className="text-sm text-gray-500 italic">Example: "verify Search results"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">get [element]</code>
                          <p className="text-gray-700 mb-2">Get text content from an element</p>
                          <p className="text-sm text-gray-500 italic">Example: "get video title"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">wait (element appear)</code>
                          <p className="text-gray-700 mb-2">Wait for an element to become visible</p>
                          <p className="text-sm text-gray-500 italic">Example: "wait for video to load"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h4 className="text-2xl font-bold mb-6 text-purple-600">Scroll & Swipe Commands</h4>
                      <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">scroll up</code>
                          <p className="text-gray-700 mb-2">Scroll the page upward</p>
                          <p className="text-sm text-gray-500 italic">Example: "scroll up"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">scroll down</code>
                          <p className="text-gray-700 mb-2">Scroll the page downward</p>
                          <p className="text-sm text-gray-500 italic">Example: "scroll down"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe left</code>
                          <p className="text-gray-700 mb-2">Swipe left gesture</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe left"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe right</code>
                          <p className="text-gray-700 mb-2">Swipe right gesture</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe right"</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe long left</code>
                          <p className="text-gray-700 mb-2">Perform a long swipe to the left</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe long left"</p>
                        </div>
                        <div className="pb-4">
                          <code className="bg-gray-100 px-3 py-2 rounded text-green-700 font-mono text-sm block mb-3">swipe long right</code>
                          <p className="text-gray-700 mb-2">Perform a long swipe to the right</p>
                          <p className="text-sm text-gray-500 italic">Example: "swipe long right"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h5 className="text-lg font-semibold mb-3 text-blue-700">📱 Mobile App Special Features</h5>
                      <ul className="text-blue-700 space-y-2 text-sm">
                        <li>• When using "open [app name]", TesterAlly shows a dropdown with all installed apps on the connected device</li>
                        <li>• Device must be connected and have USB debugging enabled for Android testing</li>
                        <li>• Commands adapt to the mobile interface and touch interactions</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </section> */}

            {/* Examples Section */}
            <section ref={sectionRefs['examples']} className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-purple-600">Test Examples</h3>
              <p className="mb-8 text-lg text-gray-700">Here are practical examples showing how to write effective tests with TesterAlly.</p>

              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                  <h4 className="text-2xl font-bold mb-4 text-purple-600">Example 1: User Login Flow</h4>
                  <p className="mb-6 text-gray-700">A complete test for user authentication:</p>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 overflow-x-auto">
                    <pre className="text-green-700 font-mono text-sm whitespace-pre-wrap">
{`1. open https://app.testerally.com/login
2. click Login
3. type user@example.com in Your Email
4. type password123 in Your Password
5. click Login 
6. verify Welcome back
7. get user@example.com`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                  <h4 className="text-2xl font-bold mb-4 text-purple-600">Example 2: Mobile App Testing</h4>
                  <p className="mb-6 text-gray-700">Testing mobile application features:</p>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 overflow-x-auto">
                    <pre className="text-green-700 font-mono text-sm whitespace-pre-wrap">
{`1. Open chrome
2. click Sign Up
3. type newuser@email.com in the email field
4. type SecurePass123 in the password field
5. type SecurePass123 in the confirm password field
6. click Create Account
7. wait for the verification screen to appear
8. verify Please check your email
9. click Skip for now
10. Tap Get Started`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* API Section */}
            <section ref={sectionRefs['api']} className="mb-16">
              <h3 className="text-3xl font-bold mb-6 text-purple-600">API Reference</h3>
              <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <p className="text-lg mb-6 text-gray-700">
                  TesterAlly provides a comprehensive REST API for programmatic test management and execution.
                </p>
                <p className="mb-6 text-gray-700">
                  The API documentation includes:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-8">
                  <li>Authentication and authorization</li>
                  <li>Test creation and management endpoints</li>
                  <li>Test execution and scheduling</li>
                  <li>Results and reporting APIs</li>
                  <li>Webhook integrations</li>
                  <li>SDK libraries for popular languages</li>
                </ul>
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <p className="text-purple-700 font-semibold mb-2">📚 Complete API Documentation</p>
                  <p className="text-gray-700">
                    Visit our comprehensive API documentation at{' '}
                    <a href="https://docs.testerally.com/api" className="text-purple-600 hover:text-purple-700 underline font-medium">
                      docs.testerally.com/api
                    </a>
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Footer */}
          <footer className="bg-gray-50 border-t border-gray-200 py-12 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">Join thousands of teams already using TesterAlly to streamline their testing process.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg">
                    Start Free Trial
                  </button>
                  <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    View Pricing
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#features" className="hover:text-purple-600 transition-colors">Features</a></li>
                      <li><a href="#pricing" className="hover:text-purple-600 transition-colors">Pricing</a></li>
                      <li><a href="#security" className="hover:text-purple-600 transition-colors">Security</a></li>
                      <li><a href="#integrations" className="hover:text-purple-600 transition-colors">Integrations</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#docs" className="hover:text-purple-600 transition-colors">Documentation</a></li>
                      <li><a href="#api" className="hover:text-purple-600 transition-colors">API Reference</a></li>
                      <li><a href="#tutorials" className="hover:text-purple-600 transition-colors">Tutorials</a></li>
                      <li><a href="#blog" className="hover:text-purple-600 transition-colors">Blog</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#help" className="hover:text-purple-600 transition-colors">Help Center</a></li>
                      <li><a href="#contact" className="hover:text-purple-600 transition-colors">Contact Us</a></li>
                      <li><a href="#community" className="hover:text-purple-600 transition-colors">Community</a></li>
                      <li><a href="#status" className="hover:text-purple-600 transition-colors">Status</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#about" className="hover:text-purple-600 transition-colors">About</a></li>
                      <li><a href="#careers" className="hover:text-purple-600 transition-colors">Careers</a></li>
                      <li><a href="#privacy" className="hover:text-purple-600 transition-colors">Privacy</a></li>
                      <li><a href="#terms" className="hover:text-purple-600 transition-colors">Terms</a></li>
                    </ul>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>&copy; 2024 TesterAlly. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default TesterAllyDocs;