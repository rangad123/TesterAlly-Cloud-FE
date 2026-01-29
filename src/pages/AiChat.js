import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Send, Loader2, Plus, Trash2, Sparkles, History, X } from "lucide-react";

function AiChat() {
  const location = useLocation();
  const testCaseInfo = location.state?.testCaseInfo;

  const [projectData, setProjectData] = useState(null);
  const [isTestDataLoading, setIsTestDataLoading] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioType, setScenarioType] = useState('');
  const [scenarioPriority, setScenarioPriority] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [isSavingUrl, setIsSavingUrl] = useState(false);
  const [apiKey, setApiKey] = useState(null);  
  const [gptVersion, setGptVersion] = useState(null);
  const [useClaude, setUseClaude] = useState(false);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  const navigate = useNavigate();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  const handleTextareaChange = (e) => {
    setInputMessage(e.target.value);
    
    // Auto-resize logic
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  // Reset textarea height when message is sent
  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const saveTestUrl = async () => {
    if (!projectData?.id || !tempUrl.trim()) return;
    
    const formatAndValidateUrl = (url) => {
      let formattedUrl = url.trim();
      formattedUrl = formattedUrl.replace(/^https?:\/\//, '');
      
      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})(\/.*)*/;
      const localhostPattern = /^(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/;
      
      if (!domainPattern.test(formattedUrl) && !localhostPattern.test(formattedUrl)) {
        throw new Error('Please enter a valid URL format (e.g., example.com, www.example.com)');
      }
      
      return `https://${formattedUrl}`;
    };
    
    try {
      const validatedUrl = formatAndValidateUrl(tempUrl);
      
      setIsSavingUrl(true);
      const response = await fetch(`https://api.testerally.ai/api/testdata/${projectData.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: validatedUrl
        })
      });
      
      if (response.ok) {
        setTestUrl(validatedUrl);
        setIsEditingUrl(false);
        setTempUrl('');
        console.log('URL saved successfully:', validatedUrl);
      }
    } catch (error) {
      if (error.message.includes('valid URL format')) {
        alert(error.message);
      } else {
        console.error('Error saving URL:', error);
        alert('Failed to save URL');
      }
    } finally {
      setIsSavingUrl(false);
    }
  };

  const detectProvider = (apiKey, gptVersion) => {
    let isClaude = false;

    if (apiKey?.startsWith("sk-ant-")) {
      isClaude = true;
    } else if (apiKey?.startsWith("sk-")) {
      isClaude = false;
    }

    if (gptVersion?.toLowerCase().includes("claude")) isClaude = true;
    if (gptVersion?.toLowerCase().includes("sonnet")) isClaude = true;
    if (gptVersion?.toLowerCase().includes("opus")) isClaude = true;
    if (gptVersion?.toLowerCase().includes("haiku")) isClaude = true;
    if (gptVersion?.toLowerCase().includes("gpt")) isClaude = false;
    if (gptVersion?.toLowerCase().includes("o1")) isClaude = false;

    return isClaude;  
  };

  useEffect(() => {
    if (testCaseInfo) {
      setScenarioName(testCaseInfo.testcase_name || 'testing');
      setScenarioType(testCaseInfo.testcase_type || '');
      setScenarioPriority(testCaseInfo.testcase_priority || '');
    }
  }, [testCaseInfo]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/dashboard-user");
      return;
    }

    const savedProjectKey = `selectedProject_${userId}`;
    const savedProject = localStorage.getItem(savedProjectKey);

    if (savedProject) {
      try {
        const parsedProject = JSON.parse(savedProject);
        setProjectData(parsedProject);
      } catch (err) {
        console.error("Error parsing saved project:", err);
        localStorage.removeItem(savedProjectKey);
      }
    }

    const handleProjectChange = () => {
      navigate("/test-cases");
    };

    window.addEventListener("projectChanged", handleProjectChange);
    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, [navigate]);

  useEffect(() => {
    if (projectData?.id) {
      setIsTestDataLoading(true);
      fetch(`https://api.testerally.ai/api/testdata/${projectData.id}/`)
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Test data loaded:", data);
          setTestUrl(data?.url || '');
          setApiKey(data?.openai_api_key || null); 
          setGptVersion(data?.gpt_version || null); 
          
          const isClaude = detectProvider(data?.openai_api_key, data?.gpt_version);
          setUseClaude(isClaude); 
        })
        .catch((err) => {
          console.warn("⚠️ Error fetching test data:", err.message);
        })
        .finally(() => setIsTestDataLoading(false));
    }
  }, [projectData?.id]);

  // Call Planner Agent API
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentPrompt = inputMessage;
    setInputMessage('');
    resetTextareaHeight();
    setIsLoading(true);

    try {
      const requestBody = {
        prompt: currentPrompt,
        system_url: testUrl,
        project_id: projectData?.id, 
      };

      // Only add optional fields if they have valid values
      if (apiKey) {
        requestBody.api_key = apiKey;
      }
      
      if (gptVersion) {
        requestBody.gpt_version = gptVersion;
      }
      
      // Only add use_claude if it's explicitly true
      if (useClaude === true) {
        requestBody.use_claude = true;
      }

      console.log('Sending request:', requestBody); 

      const response = await fetch('http://127.0.0.1:8000/agentic/test/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      console.log('Response of Testing:', data);

      if (response.ok) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, assistantMessage]);
        updateChatHistory(userMessage, assistantMessage);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error calling planner API:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: { error: true, message: error.message },
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Update chat history
  const updateChatHistory = (userMsg, assistantMsg) => {
    if (currentChatId) {
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, userMsg, assistantMsg], updatedAt: new Date() }
          : chat
      ));
    } else {
      const newChat = {
        id: Date.now(),
        title: userMsg.content.slice(0, 50) + (userMsg.content.length > 50 ? '...' : ''),
        messages: [userMsg, assistantMsg],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
    }
  };

  // Start new chat
  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setShowHistory(false);
    resetTextareaHeight();
    inputRef.current?.focus();
  };

  // Load chat from history
  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setShowHistory(false);
    }
  };

  // Delete chat
  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // // Format planner output - UPDATED to handle new response format
  // const formatPlannerOutput = (data) => {
  //   if (data.error) {
  //     return (
  //       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
  //         <p className="text-red-800 font-medium">Error: {data.message}</p>
  //       </div>
  //     );
  //   }

  //   // ✅ NEW: Handle both old and new response formats
  //   const metadata = data.metadata || {};
  //   const testStrategy = data.test_strategy || data.planner_output || {};
  //   const explorationSummary = data.exploration_summary || {};
  //   const summary = data.summary || {};

  //   return (
  //     <div className="space-y-4">
  //       {/* Metadata */}
  //       {metadata && Object.keys(metadata).length > 0 && (
  //         <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
  //           <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
  //             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
  //             </svg>
  //             Test Strategy Overview
  //           </h3>
  //           <div className="grid grid-cols-2 gap-4 text-sm">
  //             <div>
  //               <span className="text-gray-600">Model:</span>
  //               <span className="ml-2 font-medium text-gray-900">{metadata.model_used || 'Unknown'}</span>
  //             </div>
  //             <div>
  //               <span className="text-gray-600">Total Scenarios:</span>
  //               <span className="ml-2 font-medium text-gray-900">{testStrategy.total_scenarios || testStrategy.test_scenarios?.length || 0}</span>
  //             </div>
  //             {(data.test_objective || metadata.test_objective) && (
  //               <div className="col-span-2">
  //                 <span className="text-gray-600">Objective:</span>
  //                 <span className="ml-2 font-medium text-gray-900">{data.test_objective || metadata.test_objective}</span>
  //               </div>
  //             )}
  //             <div>
  //               <span className="text-gray-600">Execution Time:</span>
  //               <span className="ml-2 font-medium text-gray-900">{(metadata.pipeline_time_ms || metadata.execution_time_ms || 0)}ms</span>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Exploration Summary */}
  //       {explorationSummary && Object.keys(explorationSummary).length > 0 && (
  //         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  //           <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
  //             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  //             </svg>
  //             Exploration Summary
  //           </h3>
  //           <div className="space-y-2 text-sm">
  //             {explorationSummary.pages_explored && explorationSummary.pages_explored.length > 0 && (
  //               <div>
  //                 <span className="text-gray-600">Pages Explored:</span>
  //                 <div className="mt-1">
  //                   {explorationSummary.pages_explored.map((page, idx) => (
  //                     <div key={idx} className="ml-2 text-blue-700 font-mono text-xs">
  //                       • {page}
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             )}
  //             {explorationSummary.key_findings && explorationSummary.key_findings.length > 0 && (
  //               <div>
  //                 <span className="text-gray-600">Key Findings:</span>
  //                 <ul className="mt-1 ml-2 space-y-1">
  //                   {explorationSummary.key_findings.map((finding, idx) => (
  //                     <li key={idx} className="text-gray-800 text-xs">
  //                       • {finding}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             )}
  //             {explorationSummary.exploration_iterations && (
  //               <div>
  //                 <span className="text-gray-600">Iterations:</span>
  //                 <span className="ml-2 font-medium text-gray-900">{explorationSummary.exploration_iterations}</span>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       )}

  //       {/* Test Scenarios */}
  //       {testStrategy.test_scenarios && testStrategy.test_scenarios.length > 0 && (
  //         <div className="bg-white border border-gray-200 rounded-lg p-4">
  //           <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
  //             <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
  //             </svg>
  //             Test Scenarios ({testStrategy.test_scenarios.length})
  //           </h3>
  //           <div className="space-y-3">
  //             {testStrategy.test_scenarios.map((scenario, idx) => (
  //               <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors">
  //                 <div className="flex items-start justify-between mb-3">
  //                   <div className="flex items-start gap-3">
  //                     <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
  //                       {idx + 1}
  //                     </div>
  //                     <div>
  //                       <h4 className="font-medium text-gray-900 text-lg">{scenario.name || `Scenario ${idx + 1}`}</h4>
  //                       {scenario.scenario_id && (
  //                         <span className="text-xs text-gray-500 font-mono">{scenario.scenario_id}</span>
  //                       )}
  //                     </div>
  //                   </div>
  //                   <div className="flex gap-2">
  //                     {scenario.priority && (
  //                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
  //                         scenario.priority.toLowerCase() === 'critical' ? 'bg-red-100 text-red-800' :
  //                         scenario.priority.toLowerCase() === 'high' ? 'bg-orange-100 text-orange-800' :
  //                         scenario.priority.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
  //                         'bg-green-100 text-green-800'
  //                       }`}>
  //                         {scenario.priority}
  //                       </span>
  //                     )}
  //                     {scenario.type && (
  //                       <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
  //                         {scenario.type.replace(/_/g, ' ')}
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
                  
  //                 {scenario.description && (
  //                   <p className="text-sm text-gray-700 mb-3 pl-11">{scenario.description}</p>
  //                 )}

  //                 {/* Test Steps */}
  //                 {scenario.test_steps && scenario.test_steps.length > 0 && (
  //                   <div className="mb-3 pl-11">
  //                     <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Test Steps:</h5>
  //                     <ol className="space-y-1">
  //                       {scenario.test_steps.map((step, stepIdx) => {
  //                         // Handle both string and object formats
  //                         const stepText = typeof step === 'string' ? step : step.action;
  //                         const element = typeof step === 'object' ? step.element : null;
  //                         const expectedResult = typeof step === 'object' ? step.expected_result : null;
  //                         const testData = typeof step === 'object' ? step.test_data : null;
                          
  //                         return (
  //                           <li key={stepIdx} className="text-sm text-gray-600">
  //                             <div className="flex">
  //                               <span className="font-medium text-purple-600 mr-2">{stepIdx + 1}.</span>
  //                               <div className="flex-1">
  //                                 <span>{stepText}</span>
  //                                 {element && (
  //                                   <span className="ml-2 text-xs font-mono text-blue-600">
  //                                     [{element}]
  //                                   </span>
  //                                 )}
  //                                 {testData && (
  //                                   <div className="text-xs text-gray-500 mt-1">
  //                                     Data: <span className="font-mono">{testData}</span>
  //                                   </div>
  //                                 )}
  //                                 {expectedResult && (
  //                                   <div className="text-xs text-green-600 mt-1">
  //                                     Expected: {expectedResult}
  //                                   </div>
  //                                 )}
  //                               </div>
  //                             </div>
  //                           </li>
  //                         );
  //                       })}
  //                     </ol>
  //                   </div>
  //                 )}

  //                 {/* Test Data */}
  //                 {scenario.test_data && Object.keys(scenario.test_data).length > 0 && (
  //                   <div className="mb-3 pl-11">
  //                     <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Test Data:</h5>
  //                     <div className="bg-gray-100 rounded p-2 font-mono text-xs">
  //                       {Object.entries(scenario.test_data).map(([key, value]) => (
  //                         <div key={key} className="flex">
  //                           <span className="text-blue-600 font-semibold mr-2">{key}:</span>
  //                           <span className="text-gray-700">{value}</span>
  //                         </div>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 )}

  //                 {/* Expected Outcome */}
  //                 {scenario.expected_outcome && (
  //                   <div className="mb-3 pl-11">
  //                     <h5 className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">Expected Outcome:</h5>
  //                     <p className="text-sm text-green-700 bg-green-50 rounded px-3 py-2 border border-green-200">
  //                       {scenario.expected_outcome}
  //                     </p>
  //                   </div>
  //                 )}

  //                 {/* Verification Points */}
  //                 {scenario.verification_points && scenario.verification_points.length > 0 && (
  //                   <div className="pl-11">
  //                     <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Verification Points:</h5>
  //                     <ul className="space-y-1">
  //                       {scenario.verification_points.map((point, pointIdx) => (
  //                         <li key={pointIdx} className="text-sm text-gray-600 flex items-start">
  //                           <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  //                           </svg>
  //                           <span>{point}</span>
  //                         </li>
  //                       ))}
  //                     </ul>
  //                   </div>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       )}

  //       {/* Summary */}
  //       {summary && Object.keys(summary).length > 0 && (
  //         <div className="bg-green-50 border border-green-200 rounded-lg p-4">
  //           <h3 className="font-semibold text-green-900 mb-3 flex items-center">
  //             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  //             </svg>
  //             Summary
  //           </h3>
  //           <div className="space-y-2 text-sm">
  //             {summary.overall_status && (
  //               <div>
  //                 <span className="text-gray-600">Status:</span>
  //                 <span className={`ml-2 font-semibold ${
  //                   summary.overall_status === 'COMPLETED' ? 'text-green-700' : 'text-orange-700'
  //                 }`}>
  //                   {summary.overall_status}
  //                 </span>
  //               </div>
  //             )}
  //             {summary.success_rate && (
  //               <div>
  //                 <span className="text-gray-600">Success Rate:</span>
  //                 <span className="ml-2 font-semibold text-green-700">{summary.success_rate}</span>
  //               </div>
  //             )}
  //             {summary.recommendations && summary.recommendations.length > 0 && (
  //               <div>
  //                 <span className="text-gray-600">Recommendations:</span>
  //                 <ul className="mt-1 ml-2 space-y-1">
  //                   {summary.recommendations.map((rec, idx) => (
  //                     <li key={idx} className="text-gray-800 text-xs">
  //                       • {rec}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             )}
  //             {summary.critical_issues && summary.critical_issues.length > 0 && (
  //               <div>
  //                 <span className="text-red-600 font-semibold">Critical Issues:</span>
  //                 <ul className="mt-1 ml-2 space-y-1">
  //                   {summary.critical_issues.map((issue, idx) => (
  //                     <li key={idx} className="text-red-700 text-xs">
  //                       • {issue}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       )}

  //       {/* Raw Output */}
  //       <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
  //         <summary className="font-medium text-gray-900 cursor-pointer hover:text-purple-600 transition-colors">
  //           View Raw Output
  //         </summary>
  //         <pre className="mt-3 text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
  //           {JSON.stringify(data, null, 2)}
  //         </pre>
  //       </details>
  //     </div>
  //   );
  // };

  // Format planner output - Clean and user-friendly version
  const formatPlannerOutput = (data) => {
    if (data.error || data.status === 'error') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Error: {data.message}</p>
        </div>
      );
    }

    const metadata = data.metadata || {};
    const testStrategy = data.test_strategy || {};
    const explorationSummary = data.exploration_summary || {};
    const summary = data.summary || {};

    return (
      <div className="space-y-6 max-w-7xl mx-auto p-4">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            {data.test_objective || 'Test Strategy'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Test Cases</p>
              <p className="text-2xl font-bold text-purple-600">
                {summary.total_test_cases || testStrategy.total_scenarios || testStrategy.test_scenarios?.length || 0}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Target URL</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {data.target_url || metadata.system_url || 'N/A'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                summary.overall_status === 'READY_FOR_EXECUTION' || summary.overall_status === 'COMPLETED'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {summary.overall_status || 'READY'}
              </span>
            </div>
          </div>

          {/* Scenario Breakdown */}
          {testStrategy.scenario_breakdown && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {testStrategy.scenario_breakdown.positive_flows > 0 && (
                <div className="bg-green-50 rounded px-3 py-2 text-center">
                  <p className="text-lg font-bold text-green-700">{testStrategy.scenario_breakdown.positive_flows}</p>
                  <p className="text-xs text-green-600">Positive Flows</p>
                </div>
              )}
              {testStrategy.scenario_breakdown.negative_cases > 0 && (
                <div className="bg-red-50 rounded px-3 py-2 text-center">
                  <p className="text-lg font-bold text-red-700">{testStrategy.scenario_breakdown.negative_cases}</p>
                  <p className="text-xs text-red-600">Negative Cases</p>
                </div>
              )}
              {testStrategy.scenario_breakdown.edge_cases > 0 && (
                <div className="bg-yellow-50 rounded px-3 py-2 text-center">
                  <p className="text-lg font-bold text-yellow-700">{testStrategy.scenario_breakdown.edge_cases}</p>
                  <p className="text-xs text-yellow-600">Edge Cases</p>
                </div>
              )}
              {testStrategy.scenario_breakdown.ui_validations > 0 && (
                <div className="bg-blue-50 rounded px-3 py-2 text-center">
                  <p className="text-lg font-bold text-blue-700">{testStrategy.scenario_breakdown.ui_validations}</p>
                  <p className="text-xs text-blue-600">UI Validations</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Exploration Summary - Compact */}
        {explorationSummary && explorationSummary.key_findings?.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm uppercase tracking-wide">
              Key Findings
            </h3>
            <ul className="space-y-1">
              {explorationSummary.key_findings.map((finding, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Test Scenarios - Main Content */}
        {testStrategy.test_scenarios && testStrategy.test_scenarios.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
              Test Scenarios
            </h3>
            
            {testStrategy.test_scenarios.map((scenario, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
                {/* Scenario Header */}
                <div className="bg-gradient-to-r from-purple-50 to-white p-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center text-lg font-bold shadow">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-base md:text-lg">
                          {scenario.scenario_name || scenario.name || `Test Case ${idx + 1}`}
                        </h4>
                        {scenario.scenario_id && (
                          <p className="text-xs text-gray-500 font-mono mt-1">{scenario.scenario_id}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {scenario.priority && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          scenario.priority.toLowerCase() === 'critical' || scenario.priority.toLowerCase() === 'high'
                            ? 'bg-red-100 text-red-800'
                            : scenario.priority.toLowerCase() === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {scenario.priority.toUpperCase()}
                        </span>
                      )}
                      {(scenario.scenario_type || scenario.type) && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          scenario.scenario_type === 'positive' ? 'bg-green-100 text-green-800' :
                          scenario.scenario_type === 'negative' ? 'bg-red-100 text-red-800' :
                          scenario.scenario_type === 'edge' ? 'bg-yellow-100 text-yellow-800' :
                          scenario.scenario_type === 'ui_validation' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {(scenario.scenario_type || scenario.type).replace(/_/g, ' ').toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {scenario.description && (
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{scenario.description}</p>
                  )}
                </div>

                {/* Scenario Content */}
                <div className="p-4 space-y-4">
                  {/* Prerequisites */}
                  {scenario.prerequisites && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                      <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-1">
                        Prerequisites
                      </p>
                      <p className="text-sm text-blue-800">{scenario.prerequisites}</p>
                    </div>
                  )}

                  {/* Test Steps */}
                  {scenario.test_steps && scenario.test_steps.length > 0 && (
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                        Test Steps
                      </h5>
                      <div className="space-y-3">
                        {scenario.test_steps.map((step, stepIdx) => {
                          // Handle both string and object formats
                          const stepAction = typeof step === 'string' ? step : step.action;
                          const stepNumber = typeof step === 'object' ? step.step_number : stepIdx + 1;
                          const target = typeof step === 'object' ? step.target : null;
                          const inputData = typeof step === 'object' ? step.input_data : null;
                          const expectedResult = typeof step === 'object' ? step.expected_result : null;
                          const element = typeof step === 'object' ? step.element : null;
                          
                          return (
                            <div key={stepIdx} className="flex gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {stepNumber}
                                </div>
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                {/* Action */}
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {stepAction}
                                    {(target || element) && (
                                      <span className="ml-2 text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        {target || element}
                                      </span>
                                    )}
                                  </span>
                                </div>
                                
                                {/* Input Data (for fill actions) */}
                                {inputData && inputData !== 'null' && (
                                  <div className="bg-white border border-purple-200 rounded px-3 py-2">
                                    <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                                      Fill with:
                                    </span>
                                    <p className="text-sm font-mono text-purple-900 mt-1">
                                      "{inputData}"
                                    </p>
                                  </div>
                                )}
                                
                                {/* Expected Result */}
                                {expectedResult && (
                                  <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded">
                                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span><strong>Expected:</strong> {expectedResult}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Verification Criteria */}
                  {(scenario.verification_criteria || scenario.expected_outcome) && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                      <p className="text-xs font-semibold text-green-900 uppercase tracking-wide mb-1">
                        Verification Criteria
                      </p>
                      <p className="text-sm text-green-800">
                        {scenario.verification_criteria || scenario.expected_outcome}
                      </p>
                    </div>
                  )}

                  {/* Verification Points */}
                  {scenario.verification_points && scenario.verification_points.length > 0 && (
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Verification Points
                      </h5>
                      <ul className="space-y-1">
                        {scenario.verification_points.map((point, pointIdx) => (
                          <li key={pointIdx} className="text-sm text-gray-600 flex items-start">
                            <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {summary.recommendations && summary.recommendations.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              Recommendations
            </h3>
            <ul className="space-y-1">
              {summary.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Critical Issues */}
        {summary.critical_issues && summary.critical_issues.length > 0 && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Critical Issues
            </h3>
            <ul className="space-y-1">
              {summary.critical_issues.map((issue, idx) => (
                <li key={idx} className="text-sm text-red-700 flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 lg:ml-[300px] transition-all duration-300 lg:max-w-[calc(100%-300px)] sm:ml-[60px] sm:max-w-full">
      <div className="p-6">
        <div className="min-h-screen p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    AI-Powered Test Scenario Creation
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base">
                    Enter your test requirements and let AI generate detailed test steps for you
                  </p>
                </div>
                
                {/* Project Info - Top Right */}
                {projectData && (
                  <div className="text-right bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-gray-700 mb-1">
                      <span className="text-gray-500">Type:</span> 
                      <span className="font-medium text-blue-700 ml-1">{projectData.project_type}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="text-gray-500">Platform:</span> 
                      <span className="font-medium text-green-700 ml-1">{projectData.platform}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Test Case Details */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Case Details</h2>
              
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">
                    {scenarioName || testCaseInfo?.testcase_name || 'Not specified'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">
                    {scenarioType || testCaseInfo?.testcase_type || 'Not specified'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">
                    {scenarioPriority || testCaseInfo?.testcase_priority || 'Not specified'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test URL</label>
                  {!isEditingUrl ? (
                    <>
                      {isTestDataLoading ? (
                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center">
                          <svg className="animate-spin h-4 w-4 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm text-gray-500">Loading URL...</span>
                        </div>
                      ) : testUrl ? (
                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center">
                          <span className="text-sm text-gray-700 font-mono truncate flex-1 mr-2">{testUrl}</span>
                          <button
                            onClick={() => {
                              setIsEditingUrl(true);
                              setTempUrl(testUrl);
                            }}
                            className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                            title="Edit URL"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsEditingUrl(true)}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Add URL
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={tempUrl}
                        onChange={(e) => setTempUrl(e.target.value)}
                        placeholder="Enter test URL"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        autoFocus
                      />
                      <button
                        onClick={saveTestUrl}
                        disabled={!tempUrl.trim() || isSavingUrl}
                        className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                      >
                        {isSavingUrl ? '...' : 'Save'}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingUrl(false);
                          setTempUrl('');
                        }}
                        className="px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Messages */}
              <div className="p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-2xl">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">Start Testing with AI</h2>
                      <p className="text-gray-600 mb-8">
                        Describe what you want to test, and I'll create a comprehensive test strategy for you.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          "Test login functionality to access the studio",
                          "First, log the studio and generate testcases for studio agents ",
                          "Test project creation functionality"
                        ].map((example, idx) => (
                          <button
                            key={idx}
                            onClick={() => setInputMessage(example)}
                            className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
                          >
                            <p className="text-gray-700">{example}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-50 border border-gray-200'} rounded-lg px-5 py-4`}>
                          {message.role === 'user' ? (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          ) : (
                            <div>
                              {formatPlannerOutput(message.content)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generating test strategy...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={handleTextareaChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what you want to test..."
                    rows="1"
                    className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none overflow-y-auto"
                    style={{ minHeight: '52px', maxHeight: '200px' }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="absolute right-3 bottom-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-lg p-2.5 transition-colors disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                {/* History Toggle & New Chat */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 text-sm"
                  >
                    <History className="w-4 h-4" />
                    {showHistory ? 'Hide Chat History' : 'Show Chat History'}
                  </button>
                  
                  <button
                    onClick={startNewChat}
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    New Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Chat History Panel (Below input) */}
            {showHistory && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Chat History
                  </h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {chatHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No chat history yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chatHistory.map(chat => (
                      <div
                        key={chat.id}
                        onClick={() => loadChat(chat.id)}
                        className={`group relative p-4 rounded-lg cursor-pointer transition-all border ${
                          currentChatId === chat.id
                            ? 'bg-purple-50 border-purple-300'
                            : 'bg-gray-50 border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate mb-2">{chat.title}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(chat.updatedAt).toLocaleDateString()} at {new Date(chat.updatedAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => deleteChat(chat.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
