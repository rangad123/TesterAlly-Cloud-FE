import React, { useState } from 'react';

function TesterAllyDocs() {
  const [activeSection, setActiveSection] = useState('documentation');
  const [activeSubsection, setActiveSubsection] = useState('getting-started');
  const [selectedProjectType, setSelectedProjectType] = useState('web-desktop'); 

  const getCurrentContent = () => {
    const section = sections.find(sec => sec.key === activeSection);
    if (!section) return null;

    if (section.hasSubsections && activeSubsection) {
      const subsection = section.subsections.find(sub => sub.key === activeSubsection);
      return subsection ? subsection.content : section.content;
    }
    
    return section.content;
  };

  const handleSectionClick = (sectionKey) => {
    const section = sections.find(sec => sec.key === sectionKey);
    setActiveSection(sectionKey);
    
    if (section && section.hasSubsections) {
      setActiveSubsection(section.subsections[0].key);
    } else {
      setActiveSubsection(null);
    }
  };

  const sections = [
    {
      key: 'documentation',
      label: 'Documentation',
      hasSubsections: true,
      subsections: [
        {
          key: 'getting-started',
          label: 'Getting Started',
          content: (
            <>
              <h1 className="text-5xl font-bold mb-6 text-purple-500">TesterAlly</h1>
              <h2 className="text-3xl font-semibold mb-4 text-purple-500">AI-Powered Testing Made Simple</h2>
              <p className="text-lg mb-6 leading-relaxed">
                TesterAlly is an AI-powered testing agent that empowers anyone—technical or not—to build full end-to-end tests simply by describing user actions in plain English. By focusing on the end user's perspective, TesterAlly dramatically reduces the need for ongoing maintenance caused by frequent UI or locator changes.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-purple-600">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Key Features</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-purple-300">No-Code Simplicity</h4>
                    <p className="text-gray-300">Write tests in plain English—no coding required. Intelligent language interpretation turns your instructions into robust test cases.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-purple-300">Smart Maintenance</h4>
                    <p className="text-gray-300">Say goodbye to brittle locators. Auto-adjusts test steps when UI changes are detected through semantic analysis.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-purple-300">AI Prompt Generation</h4>
                    <p className="text-gray-300">Simply describe your test scenario in natural language and TesterAlly automatically generates complete test steps for you.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-purple-500">Platform Support</h3>
              <p className="mb-3 text-gray-300">TesterAlly seamlessly supports test automation across multiple platforms:</p>
              <div className="grid md:grid-cols-2 gap-2 mb-6">
                <ul className="list-disc ml-6 space-y-1 text-gray-300">
                  <li>Web applications (Laptop/PC and Mobile)</li>
                  <li>Mobile applications (Android)</li>
                </ul>
              </div>
              <h2 className="text-4xl font-semibold mb-6 text-purple-500">Getting Started</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Quick Start Guide</h3>
                <p className="mb-4 text-gray-300">Follow these simple steps to create your first test with TesterAlly:</p>
                <ol className="list-decimal ml-6 space-y-2 text-gray-300">
                  <li>Sign up for a TesterAlly account</li>
                  <li>Create a new agent</li>
                  <li>Install the agent file and log in using your agent key</li>
                  <li>Connect with your GitHub account</li>
                  <li>Create a project and invite members to your project</li>
                  <li>Use the AI prompt feature to quickly generate test steps from descriptions</li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-purple-500">AI Prompt to Test Steps</h3>
              <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-purple-600">
                <p className="text-gray-300 mb-4">
                  TesterAlly's AI-powered prompt feature allows you to generate complete test cases by simply describing what you want to test in natural language.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-4">
                  <h4 className="text-lg font-semibold mb-3 text-purple-400">How it works:</h4>
                  <ol className="list-decimal ml-6 space-y-2 text-gray-300">
                    <li>Describe your test scenario in plain English</li>
                    <li>AI converts your description into actionable test steps</li>
                    <li>Review and modify the generated steps if needed</li>
                    <li>Execute all steps automatically</li>
                  </ol>
                </div>
                <div className="bg-purple-900 bg-opacity-30 rounded-lg p-4 border border-purple-600">
                  <p className="text-purple-300 font-semibold mb-2">💡 Example Prompt:</p>
                  <p className="text-gray-300 italic mb-3">"Test user login with email admin@test.com and password 123, then verify the dashboard loads and shows welcome message"</p>
                  <p className="text-purple-300 font-semibold mb-2">🔄 Generated Steps:</p>
                  <ol className="list-decimal ml-6 text-green-300 text-sm">
                    <li>open https://app.example.com/login</li>
                    <li>type admin@test.com in email field</li>
                    <li>type 123 in password field</li>
                    <li>click Login button</li>
                    <li>verify Dashboard page loads</li>
                    <li>verify Welcome message appears</li>
                  </ol>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-purple-500">Best Practices</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-2 text-purple-400">Write User-Focused Tests</h4>
                  <p className="text-gray-300">Focus on what users actually do, not technical implementation details. This makes tests more maintainable and meaningful.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-2 text-purple-400">Use Clear, Descriptive Language</h4>
                  <p className="text-gray-300">Be specific about elements and actions. Instead of "click button", use "click the Submit button" or "click the red Save button".</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-2 text-purple-400">Add Verification Steps</h4>
                  <p className="text-gray-300">Always verify that actions completed successfully. Check for success messages, page changes, or expected elements.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-2 text-purple-400">Leverage AI Prompt Generation</h4>
                  <p className="text-gray-300">Use descriptive prompts to quickly generate test cases. The more specific your description, the better the generated steps will be.</p>
                </div>
              </div>
            </>
          )
        },
        {
          key: 'commands',
          label: 'Supported Commands',
          content: (
            <>
              <h2 className="text-4xl font-semibold mb-6 text-purple-500">Supported Commands</h2>
              <p className="mb-6 text-lg text-gray-300">TesterAlly supports a comprehensive set of commands for interacting with your application. All commands use natural language syntax.</p>

              {/* Project Type Selector */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Select Project Type & Platform:</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedProjectType === 'web-desktop'
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-purple-500'
                    }`}
                    onClick={() => setSelectedProjectType('web-desktop')}
                  >
                    Web Application (Desktop/PC)
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedProjectType === 'web-mobile'
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-purple-500'
                    }`}
                    onClick={() => setSelectedProjectType('web-mobile')}
                  >
                    Web Application (Mobile Platform)
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedProjectType === 'mobile-android'
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-purple-500'
                    }`}
                    onClick={() => setSelectedProjectType('mobile-android')}
                  >
                    Mobile Application (Android)
                  </button>
                </div>
              </div>

              {/* Commands Display */}
              <div className="space-y-6">
                <div className="bg-purple-900 bg-opacity-30 rounded-lg p-4 border border-purple-600">
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Currently Showing Commands For:</h3>
                  <p className="text-lg text-white">
                    {selectedProjectType === 'web-desktop' && 'Web Application (Desktop/PC)'}
                    {selectedProjectType === 'web-mobile' && 'Web Application (Mobile Platform)'}
                    {selectedProjectType === 'mobile-android' && 'Mobile Application (Android)'}
                  </p>
                </div>

                {/* Web Desktop Commands */}
                {selectedProjectType === 'web-desktop' && (
                  <>
                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Navigation Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">open [URL]</code>
                          <p className="text-gray-300 mb-1">Navigate to a specific URL</p>
                          <p className="text-sm text-gray-400 italic">Example: "open https://example.com"</p>
                        </div>
                        {/* <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">Refresh page</code>
                          <p className="text-gray-300 mb-1">Reload the current page</p>
                          <p className="text-sm text-gray-400 italic">Example: "Refresh page"</p>
                        </div> */}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Interaction Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">click [element]</code>
                          <p className="text-gray-300 mb-1">Click on buttons, links, or any clickable element</p>
                          <p className="text-sm text-gray-400 italic">Example: "click the Login button"</p>
                        </div>
                        <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">type [text] in [element]</code>
                          <p className="text-gray-300 mb-1">Enter text into input fields</p>
                          <p className="text-sm text-gray-400 italic">Example: "type admin in the username field"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Verification Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">verify [element]</code>
                          <p className="text-gray-300 mb-1">Check if an element is displayed on the page</p>
                          <p className="text-sm text-gray-400 italic">Example: "verify Welcome message"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">get [element]</code>
                          <p className="text-gray-300 mb-1">Check if an element contains specific text</p>
                          <p className="text-sm text-gray-400 italic">Example: "get user email"</p>
                        </div>
                        <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">wait (modal appear)</code>
                          <p className="text-gray-300 mb-1">Wait for an element to become visible</p>
                          <p className="text-sm text-gray-400 italic">Example: "wait for confirmation modal to appear"</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Web Mobile Commands */}
                {selectedProjectType === 'web-mobile' && (
                  <>
                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Navigation Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">open [URL]</code>
                          <p className="text-gray-300 mb-1">Navigate to a specific URL in mobile browser</p>
                          <p className="text-sm text-gray-400 italic">Example: "open https://m.example.com"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Interaction Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">click [element]</code>
                          <p className="text-gray-300 mb-1">Tap on buttons, links, or any tappable element</p>
                          <p className="text-sm text-gray-400 italic">Example: "click the Login button"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">type [text] in [element]</code>
                          <p className="text-gray-300 mb-1">Enter text into input fields</p>
                          <p className="text-sm text-gray-400 italic">Example: "type admin in the username field"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Verification Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">verify [element]</code>
                          <p className="text-gray-300 mb-1">Check if an element is displayed on the page</p>
                          <p className="text-sm text-gray-400 italic">Example: "verify Welcome message"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">get [element]</code>
                          <p className="text-gray-300 mb-1">Check if an element contains specific text</p>
                          <p className="text-sm text-gray-400 italic">Example: "get user email"</p>
                        </div>
                        <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">wait (modal appear)</code>
                          <p className="text-gray-300 mb-1">Wait for an element to become visible</p>
                          <p className="text-sm text-gray-400 italic">Example: "wait for loading spinner to disappear"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Scroll & Swipe Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">scroll up</code>
                          <p className="text-gray-300 mb-1">Scroll the page upward</p>
                          <p className="text-sm text-gray-400 italic">Example: "scroll up"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">scroll down</code>
                          <p className="text-gray-300 mb-1">Scroll the page downward</p>
                          <p className="text-sm text-gray-400 italic">Example: "scroll down"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe left</code>
                          <p className="text-gray-300 mb-1">Swipe left gesture</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe left"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe right</code>
                          <p className="text-gray-300 mb-1">Swipe right gesture</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe right"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe long left</code>
                          <p className="text-gray-300 mb-1">Perform a long swipe to the left</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe long left"</p>
                        </div>
                        <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe long right</code>
                          <p className="text-gray-300 mb-1">Perform a long swipe to the right</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe long right"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 border border-green-600">
                      <h4 className="text-lg font-semibold mb-2 text-green-300">📱 Mobile Web Special Features</h4>
                      <ul className="text-green-200 space-y-1 text-sm">
                        <li>• Commands are optimized for mobile browser interactions</li>
                        <li>• Supports touch gestures like tap, swipe, and scroll</li>
                        <li>• Responsive design elements are automatically detected</li>
                      </ul>
                    </div>
                  </>
                )}

                {/* Mobile Android Commands */}
                {selectedProjectType === 'mobile-android' && (
                  <>
                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Navigation Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">open [app name]</code>
                          <p className="text-gray-300 mb-1">Open an installed app from the device (shows dropdown suggestions)</p>
                          <p className="text-sm text-gray-400 italic">Example: "open YouTube"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">search [text]</code>
                          <p className="text-gray-300 mb-1">Search the Text</p>
                          <p className="text-sm text-gray-400 italic">Example: "search Agent"</p>
                        </div>
                        {/* <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">go home</code>
                          <p className="text-gray-300 mb-1">Navigate to device home screen</p>
                          <p className="text-sm text-gray-400 italic">Example: "go home"</p>
                        </div>  */}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Interaction Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">click [element]</code>
                          <p className="text-gray-300 mb-1">Tap on buttons, icons, or any tappable element</p>
                          <p className="text-sm text-gray-400 italic">Example: "click the Search button"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">type [text] in [element]</code>
                          <p className="text-gray-300 mb-1">Enter text into input fields</p>
                          <p className="text-sm text-gray-400 italic">Example: "type test video in the search field"</p>
                        </div>
                        {/* <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe [direction]</code>
                          <p className="text-gray-300 mb-1">Swipe in specified direction on the screen</p>
                          <p className="text-sm text-gray-400 italic">Example: "Swipe up to scroll"</p>
                        </div>
                        <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">long press [element]</code>
                          <p className="text-gray-300 mb-1">Long press on an element for context menu</p>
                          <p className="text-sm text-gray-400 italic">Example: "Long press the video thumbnail"</p>
                        </div> */}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Verification Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">verify [element]</code>
                          <p className="text-gray-300 mb-1">Check if an element is displayed on the screen</p>
                          <p className="text-sm text-gray-400 italic">Example: "verify Search results"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">get [element]</code>
                          <p className="text-gray-300 mb-1">Get text content from an element</p>
                          <p className="text-sm text-gray-400 italic">Example: "get video title"</p>
                        </div>
                        <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">wait (element appear)</code>
                          <p className="text-gray-300 mb-1">Wait for an element to become visible</p>
                          <p className="text-sm text-gray-400 italic">Example: "wait for video to load"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">Scroll & Swipe Commands</h3>
                      <div className="space-y-4">
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">scroll up</code>
                          <p className="text-gray-300 mb-1">Scroll the page upward</p>
                          <p className="text-sm text-gray-400 italic">Example: "scroll up"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">scroll down</code>
                          <p className="text-gray-300 mb-1">Scroll the page downward</p>
                          <p className="text-sm text-gray-400 italic">Example: "scroll down"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe left</code>
                          <p className="text-gray-300 mb-1">Swipe left gesture</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe left"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe right</code>
                          <p className="text-gray-300 mb-1">Swipe right gesture</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe right"</p>
                        </div>
                        <div className="border-b border-gray-700 pb-3">
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe long left</code>
                          <p className="text-gray-300 mb-1">Perform a long swipe to the left</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe long left"</p>
                        </div>
                        <div>
                          <code className="bg-gray-700 px-3 py-2 rounded text-green-400 font-mono text-sm block mb-2">swipe long right</code>
                          <p className="text-gray-300 mb-1">Perform a long swipe to the right</p>
                          <p className="text-sm text-gray-400 italic">Example: "swipe long right"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-600">
                      <h4 className="text-lg font-semibold mb-2 text-blue-300">📱 Mobile App Special Features</h4>
                      <ul className="text-blue-200 space-y-1 text-sm">
                        <li>• When using "open [app name]", TesterAlly shows a dropdown with all installed apps on the connected device</li>
                        <li>• Device must be connected and have USB debugging enabled for Android testing</li>
                        <li>• Commands adapt to the mobile interface and touch interactions</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </>
          )
        },
        {
          key: 'examples',
          label: 'Examples',
          content: (
            <>
              <h2 className="text-4xl font-semibold mb-6 text-purple-500">Test Examples</h2>
              <p className="mb-6 text-lg text-gray-300">Here are practical examples showing how to write effective tests with TesterAlly.</p>

              <div className="space-y-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Example 1: User Login Flow</h3>
                  <p className="mb-4 text-gray-300">A complete test for user authentication:</p>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded border border-gray-700 overflow-x-auto">
  {`1. open https://app.testerally.com/login
  2. click Login
  3. type user@example.com in Your Email
  4. type password123 in Your Password
  5. click Login 
  6. verify Welcome back
  7. get user@example.com`}
                  </pre>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Test Execution Screenshot</h4>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                      <img 
                        src="pic1.png" 
                        alt="TesterAlly test execution showing browser automation"
                        className="w-full max-w-4xl mx-auto rounded border border-gray-600"
                      />
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Screenshot showing the test execution with browser automation and step-by-step progress
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Example 2: Mobile App Testing</h3>
                  <p className="mb-4 text-gray-300">Testing mobile application features:</p>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded border border-gray-700 overflow-x-auto">
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
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Test Execution Screenshot</h4>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                      <img 
                        src="pic2.png" 
                        alt="TesterAlly test execution showing browser automation"
                        className="w-full max-w-4xl mx-auto rounded border border-gray-600"
                      />
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Screenshot showing the test execution with browser automation and step-by-step progress
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-purple-600">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Example 3: E-commerce Purchase</h3>
                  <p className="mb-4 text-gray-300">Testing a complete purchase workflow:</p>
                  <pre className="bg-gray-900 text-green-300 p-4 rounded border border-gray-700 overflow-x-auto">
  {`1. open https://shop.example.com
  2. type laptop in the search box
  3. click Search
  4. click first product in the results
  5. click Add to Cart
  6. verify cart icon shows 1 item
  7. click cart icon`}
                  </pre>
                </div>
              </div>
            </>
          )
        }
      ]
    },
    {
      key: 'api',
      label: 'API Reference',
      content: (
        <>
          <h2 className="text-4xl font-semibold mb-6 text-purple-500">API Reference</h2>
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-purple-600">
            <p className="text-lg mb-4 text-gray-300">
              TesterAlly provides a comprehensive REST API for programmatic test management and execution.
            </p>
            <p className="mb-4 text-gray-300">
              The API documentation includes:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-300">
              <li>Authentication and authorization</li>
              <li>Test creation and management endpoints</li>
              <li>Test execution and scheduling</li>
              <li>Results and reporting APIs</li>
              <li>Webhook integrations</li>
              <li>SDK libraries for popular languages</li>
            </ul>
            <div className="mt-6 p-4 bg-purple-900 bg-opacity-30 rounded border border-purple-600">
              <p className="text-purple-300 font-semibold">📚 Complete API Documentation</p>
              <p className="text-gray-300 mt-2">
                Visit our comprehensive API documentation at{' '}
                <a href="https://docs.testerally.com/api" className="text-purple-400 hover:text-purple-300 underline">
                  docs.testerally.com/api
                </a>
              </p>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-700 text-gray-200" style={{ marginTop: '13px' }}>
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 border-r border-gray-700 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="mb-6">
          <h2 className="font-bold text-xl text-purple-400 mb-2">Resources</h2>
          {/* <p className="text-sm text-white-400">Resources</p> */}
        </div>
        
        <nav className="space-y-2">
          {sections.map(section => (
            <div key={section.key}>
              <button
                className={`w-full text-left px-3 py-2 rounded transition-colors font-medium ${
                  activeSection === section.key
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
                onClick={() => handleSectionClick(section.key)}
              >
                {section.label}
              </button>
              
              {/* Subsections */}
              {section.hasSubsections && activeSection === section.key && (
                <div className="ml-4 mt-2 space-y-1">
                  {section.subsections.map(subsection => (
                    <button
                      key={subsection.key}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        activeSubsection === subsection.key
                          ? 'bg-purple-500 text-white'
                          : 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                      }`}
                      onClick={() => setActiveSubsection(subsection.key)}
                    >
                      {subsection.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-64px)] bg-gray-700">
        <div className="max-w-4xl mx-auto">
          {getCurrentContent()}
        </div>
      </main>
    </div>
  );
}

export default TesterAllyDocs;