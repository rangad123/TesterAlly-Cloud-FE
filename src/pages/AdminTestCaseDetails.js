import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clipboard,
  CheckCircle,
  AlertCircle,
  Clock3,
  XCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const AdminTestCaseDetails = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testCases, setTestCases] = useState([]);
  const [testSuites, setTestSuites] = useState([]);
  const [activeTab, setActiveTab] = useState("test-cases"); // Default to test-cases tab
  const [expandedTestCase, setExpandedTestCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    const savedProjectKey = `selectedProject_${userId}`;
    const savedProject = localStorage.getItem(savedProjectKey);

    if (savedProject) {
      try {
        const project = JSON.parse(savedProject);
        setSelectedProject(project);
        fetchTestCases(project.id);
        fetchTestSuites(project.id);
      } catch (error) {
        console.error("Error parsing saved project:", error);
        navigate("/admin-dashboard");
      }
    }

    setLoading(false);

    const handleProjectChange = (event) => {
      const newProject = event.detail;
      if (newProject) {
        setSelectedProject(newProject);
        localStorage.setItem(`selectedProject_${userId}`, JSON.stringify(newProject));
        fetchTestCases(newProject.id);
        fetchTestSuites(newProject.id);
      }
    };

    window.addEventListener("projectChanged", handleProjectChange);
    return () => window.removeEventListener("projectChanged", handleProjectChange);
  }, [navigate]);

  const fetchTestCases = async (projectId) => {
    try {
      const response = await fetch(
        `https://api.testerally.ai/api/testcases/?project_id=${projectId}`
      );
      const data = await response.json();
      if (response.ok) {
        setTestCases(data);
        console.log("Test cases", data);
      }
    } catch (err) {
      console.error("Error fetching test cases:", err);
    }
  };

  const fetchTestSuites = async (projectId) => {
    try {
      const response = await fetch(
        `https://api.testerally.ai/api/testsuites/?project_id=${projectId}`
      );
      const data = await response.json();
      if (response.ok) {
        setTestSuites(data);
        console.log("Test suites", data);
      }
    } catch (err) {
      console.error("Error fetching test suites:", err);
    }
  };

  const toggleTestCaseExpansion = (testCaseId) => {
    if (expandedTestCase === testCaseId) {
      setExpandedTestCase(null);
    } else {
      setExpandedTestCase(testCaseId);
    }
  };

  const getStatusIcon = (status) => {
    switch (status && status.toLowerCase()) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in progress':
        return <Clock3 className="w-5 h-5 text-yellow-500" />;
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <Clipboard className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status && status.toLowerCase()) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority && priority.toLowerCase()) {
      case 'high':
      case 'major':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'minor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTestCases = testCases.filter(testCase => {
    const statusMatch = filterStatus === 'all' || 
      (testCase.status && testCase.status.toLowerCase() === filterStatus.toLowerCase());
    const priorityMatch = filterPriority === 'all' || 
      (testCase.testcase_priority && testCase.testcase_priority.toLowerCase() === filterPriority.toLowerCase());
    return statusMatch && priorityMatch;
  });

  const renderTestCasesTab = () => {
    return (
      <div className="bg-white rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Test Cases ({filteredTestCases.length})
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="px-3 py-2 border rounded-md text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="in progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="not started">Not Started</option>
            </select>
            
            <select 
              className="px-3 py-2 border rounded-md text-sm"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="Major">Major</option>
              <option value="medium">Medium</option>
              <option value="minor">Minor</option>
            </select>
          </div>
        </div>

        {filteredTestCases.length === 0 ? (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-gray-500">No test cases available with the selected filters</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTestCases.map((testCase) => (
              <div
                key={testCase.id}
                className="border rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleTestCaseExpansion(testCase.id)}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(testCase.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {testCase.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(testCase.status)}`}>
                          {testCase.status || "Not Started"}
                        </span>
                        {testCase.testcase_priority && (
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(testCase.testcase_priority)}`}>
                            Priority: {testCase.testcase_priority}
                          </span>
                        )}
                        {testCase.testcase_type && (
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Type: {testCase.testcase_type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedTestCase === testCase.id ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </div>
                
                {expandedTestCase === testCase.id && (
                  <div className="px-4 pb-4 pt-2 border-t">
                    
                    {testCase.steps && testCase.steps.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-700 mb-2">Test Steps</h5>
                        <div className="overflow-hidden border rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  #
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Description
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {testCase.steps.map((step) => (
                                <tr key={step.id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {step.step_number}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-800">
                                    {step.step_description}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-800">
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                      step.teststep_result === "passed" ? "bg-green-100 text-green-800" :
                                      step.teststep_result === "failed" ? "bg-red-100 text-red-800" :
                                      "bg-gray-100 text-gray-800"
                                    }`}>
                                      {step.teststep_result === "not_executed" ? "not executed" : step.teststep_result || "not executed"}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTestSuitesTab = () => {
    return (
      <div className="bg-white rounded-lg">
        {testSuites.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No test suites available</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {testSuites.map((suite) => (
              <div
                key={suite.id}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <h4 className="font-medium text-gray-900">
                  {suite.title}
                </h4>
                <p className="text-gray-600 mt-1">
                  <span className="text-gray-900">Description:</span>{" "}
                  {suite.description || "N/A"}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="text-gray-900">Pre-Requisite:</span>{" "}
                  {suite.pre_requisite || "N/A"}
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  Test Cases: {suite.test_cases_count || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderHeader = () => {
    if (!selectedProject) return null;

    return (
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Test Case Details
          </h1>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
          >
            Back to Dashboard
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Project: {selectedProject.name || "Unknown Project"}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 transition-all duration-300 sm:ml-[60px] sm:max-w-full">
        <div className="p-4 md:p-6">
          {loading ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">Loading test cases...</p>
            </div>
          ) : selectedProject ? (
            <>
              {renderHeader()}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex space-x-4 mb-6 overflow-x-auto border-b">
                  {["test-cases", "test-suites"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </button>
                  ))}
                </div>

                {activeTab === "test-cases" && renderTestCasesTab()}
                {activeTab === "test-suites" && renderTestSuitesTab()}
              </div>
            </>
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">No project selected</p>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTestCaseDetails;