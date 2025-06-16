import React, { useState } from 'react'; 

const sections = [
  {
    key: 'intro',
    label: 'Getting Started Guide',
    content: (
      <>
        <h1 className="text-5xl font-bold mb-5 text-blue-600">Introduction</h1>
        <h3 className='text-2xl font-bold mb-4  text-blue-500'> Getting started with TesterAlly</h3>
        <p className='ml-2 mb-4'>
          TesterAlly is an AI-powered testing agent that empowers anyone—technical or not—to build full end-to-end tests simply by describing user actions in plain English. By focusing on the end user's perspective, TesterAlly dramatically reduces the need for ongoing maintenance caused by frequent UI or locator changes.
        </p>
        <h3 className='text-2xl font-bold mb-4 text-blue-500'> Platform Support</h3>
        <p className="mt-2">
          TesterAlly seamlessly supports test automation across a variety of platforms, including:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Web applications</li>
          <li>Mobile applications (iOS and Android)</li>
          <li>Desktop applications</li>
          <li>REST APIs and microservices</li>
          <li>Third-party integrations</li>
        </ul>
        <h3 className='text-2xl font-bold mb-4 mt-6 text-blue-500'> No-Code Simplicity</h3>
        <p className="ml-2 mb-4">
          Write tests in plain English—no coding required. With intelligent language interpretation, TesterAlly turns your instructions into robust, reliable test cases that adapt as your UI evolves.
        </p>
        <h3 className='text-2xl font-bold mb-4 mt-6 text-blue-500'> Smart Maintenance</h3>
        <p className="ml-2 mb-4">
          Say goodbye to brittle locators. TesterAlly uses semantic analysis to detect changes in UI and auto-adjust your test steps accordingly.
        </p>
      </>
    ),
  },
  {
    key:'doc',
    label: 'Documentation',
    content: (
      <>
        <h2 className="text-4xl font-semibold mb-4 text-blue-400">Documentation</h2>
        <p>
          The TesterAlly documentation provides detailed information on how to use the platform effectively. It includes:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Getting started guides</li>
          <li>API references</li>
          <li>Command structure and syntax</li>
          <li>Best practices for writing test cases</li>
          <li>Troubleshooting tips</li>
        </ul>
        <p className="mt-4">
          Visit our full documentation site at <a href="https://docs.testerally.com" className="text-blue-300 hover:underline">docs.testerally.com</a>
        </p>
      </>
    ),
  },
  {
    key:'commands',
    label: 'Supported Commands',
    content: (
      <>
        <h2 className="text-4xl font-semibold mb-4 text-blue-400">Supported Commands</h2>
        <p>
          TesterAlly supports a wide range of commands for interacting with your application. Common actions include:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Go to:</strong> Navigate to a specific URL (e.g., "Go to https://example.com").</li>
          <li><strong>Click:</strong> Click a button or link (e.g., "Click the login button").</li>
          <li><strong>Type:</strong> Enter text in input fields (e.g., "Type 'admin' into the username field").</li>
          <li><strong>Select:</strong> Choose an option from a dropdown (e.g., "Select 'India' from the country list").</li>
          <li><strong>Verify:</strong> Ensure UI elements are visible or contain expected values.</li>
        </ul>
        <p className="mt-4">These commands form the building blocks of readable, maintainable tests that align with real user behavior.</p>
      </>
    ),

  },
  {
    key: 'examples',
    label: 'Examples',
    content: (
      <>
        <h2 className="text-4xl font-semibold mb-4 text-blue-400">Examples</h2>
        <pre className="bg-gray-800 text-green-300 p-4 rounded">
          {`1. Go to "https://app.testerally.com"
2. Type "user@example.com" into the "Email" field
3. Type "password123" into the "Password" field
4. Click the "Login" button
5. Verify the dashboard is visible`}
        </pre>
      </>
    ),
  },
];

function ResourceLinks() {
  const [activeSection, setActiveSection] = useState(sections[0].key);
  const currentSection = sections.find(sec => sec.key === activeSection);

  return (
    <div
      className="flex min-h-screen bg-gray-900 text-gray-200"
      style={{ marginTop: '13px' }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 sticky top-16 h-[calc(100vh-64px)]">
        <h2 className="font-bold mb-6 text-purple-300 text-lg">Resources</h2>
        <ul className="space-y-2">
          {sections.map(section => (
            <li key={section.key}>
              <button
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  activeSection === section.key
                    ? 'bg-purple-700 text-white font-semibold'
                    : 'hover:bg-gray-700 text-purple-200'
                }`}
                onClick={() => setActiveSection(section.key)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-64px)]">
        <div className="max-w-3xl mx-auto">
          {currentSection.content}
        </div>
      </main>
    </div>
  );
}

export default ResourceLinks;
