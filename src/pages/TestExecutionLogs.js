import React, { useState, useEffect, useCallback } from 'react';
import { Search, Eye, Clock, CheckCircle, XCircle, RefreshCw, AlertTriangle } from 'lucide-react';

const TestExecutionLogs = () => {
  const [testData, setTestData] = useState(null);
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    status: 'all',
    nodeType: 'all'
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTraceId = () => {
    const path = window.location.pathname;
    const traceIdMatch = path.match(/\/([a-f0-9]+)\/?$/);
    return traceIdMatch ? traceIdMatch[1] : '113e7793';
  };

  const traceId = getTraceId();

  const fetchTestData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://127.0.0.1:8000/AI/test-execution/${traceId}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Test-Logs:", result)

      if (result.success) {
        setTestData(result.data);
        setFilteredNodes(result.data.nodes || []);
      } else {
        throw new Error('API returned success: false');
      }
    } catch (err) {
      setError(`Failed to fetch test data: ${err.message}`);
      console.error('Error fetching test data:', err);
    } finally {
      setLoading(false);
    }
  }, [traceId]);

  useEffect(() => {
    fetchTestData();
  }, [traceId, fetchTestData]);

  useEffect(() => {
    if (!testData?.nodes) return;

    let filtered = testData.nodes.filter(node => {
      const matchesSearch = !filters.search || 
        node.node_type.toLowerCase().includes(filters.search.toLowerCase()) ||
        node.input_status?.toLowerCase().includes(filters.search.toLowerCase()) ||
        node.output_status?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'success' && node.success) ||
        (filters.status === 'failed' && !node.success);

      const matchesNodeType = filters.nodeType === 'all' || 
        node.node_type === filters.nodeType;

      const nodeDate = new Date(node.start_time);
      const matchesDateFrom = !filters.dateFrom || 
        nodeDate >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || 
        nodeDate <= new Date(filters.dateTo);

      return matchesSearch && matchesStatus && matchesNodeType && 
             matchesDateFrom && matchesDateTo;
    });

    setFilteredNodes(filtered);
  }, [filters, testData]);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds.toFixed(2)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
  };

  const getStatusBadge = (success) => {
    return success ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Success
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="w-3 h-3 mr-1" />
        Failed
      </span>
    );
  };

  const getUniqueNodeTypes = () => {
    if (!testData?.nodes) return [];
    return [...new Set(testData.nodes.map(node => node.node_type))];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test execution data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchTestData}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Test Execution Logs</h1>
              <p className="text-gray-600 mt-1">Trace ID: {testData?.trace_id}</p>
            </div>
            <button
              onClick={fetchTestData}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Test Summary */}
      {testData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                    <p className="text-xs text-gray-600">Scenario</p>
                    <p className="font-medium text-sm text-gray-900 truncate">{testData.test_scenarios}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600">Duration</p>
                    <p className="font-medium text-sm text-gray-900">{formatDuration(testData.duration_seconds)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600">Success Rate</p>
                    <p className="font-medium text-sm text-gray-900">{testData.success_rate}%</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600">Status</p>
                    {getStatusBadge(testData.final_status === 'completed')}
                </div>
                <div>
                    <p className="text-xs text-gray-600">Test URL</p>
                    <p className="font-medium text-sm text-gray-900 truncate">{testData.url}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600">Steps</p>
                    <p className="font-medium text-sm text-gray-900">{testData.steps_completed}</p>
                </div>
            </div>
            {/* <div className="mt-4">
              <p className="text-sm text-gray-600">Test URL</p>
              <p className="font-medium text-gray-900">{testData.url}</p>
            </div> */}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search nodes..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                </select>
                <select
                    value={filters.nodeType}
                    onChange={(e) => setFilters(prev => ({ ...prev, nodeType: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                    <option value="all">All Node Types</option>
                    {getUniqueNodeTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="datetime-local"
                    placeholder="From Date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
                <input
                    type="datetime-local"
                    placeholder="To Date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
            </div>
          </div>

          {/* Nodes Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Execution Nodes ({filteredNodes.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Node Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Input Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Output Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNodes.map((node) => (
                    <tr key={node.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {node.node_order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {node.node_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(node.success)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-1" />
                          {formatDuration(node.duration_seconds)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDateTime(node.start_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-gray-600">{node.input_status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="text-gray-600">{node.output_status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setSelectedNode(node)}
                          className="text-purple-600 hover:text-purple-900 mr-3"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredNodes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No nodes found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Node Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Node Details - {selectedNode.node_type}
              </h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Info</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">ID:</span> {selectedNode.id}</div>
                    <div><span className="font-medium">Order:</span> {selectedNode.node_order}</div>
                    <div><span className="font-medium">Type:</span> {selectedNode.node_type}</div>
                    <div><span className="font-medium">Duration:</span> {formatDuration(selectedNode.duration_seconds)}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Success:</span> {selectedNode.success ? 'Yes' : 'No'}</div>
                    <div><span className="font-medium">Input Status:</span> {selectedNode.input_status}</div>
                    <div><span className="font-medium">Output Status:</span> {selectedNode.output_status}</div>
                    {selectedNode.error_message && (
                      <div><span className="font-medium text-red-600">Error:</span> {selectedNode.error_message}</div>
                    )}
                  </div>
                </div>
              </div>

              {selectedNode.input_summary && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Input Summary</h4>
                  <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(selectedNode.input_summary, null, 2)}
                  </pre>
                </div>
              )}

              {selectedNode.output_summary && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Output Summary</h4>
                  <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(selectedNode.output_summary, null, 2)}
                  </pre>
                </div>
              )}

              {selectedNode.llm_interactions && selectedNode.llm_interactions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">LLM Interactions</h4>
                  <div className="space-y-3">
                    {selectedNode.llm_interactions.map((interaction, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                          <div><span className="font-medium">Model:</span> {interaction.model_name}</div>
                          <div><span className="font-medium">Latency:</span> {interaction.latency_seconds?.toFixed(3)}s</div>
                        </div>
                        <div className="text-sm">
                          <div className="mb-2"><span className="font-medium">Input:</span> {interaction.input_preview}</div>
                          <div><span className="font-medium">Output:</span> {interaction.output_preview}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.steps && selectedNode.steps.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Steps</h4>
                  <div className="space-y-3">
                    {selectedNode.steps.map((step, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div><span className="font-medium">Action:</span> {step.action}</div>
                          <div><span className="font-medium">Element:</span> {step.element_name}</div>
                          <div><span className="font-medium">Result:</span> {step.execution_result}</div>
                        </div>
                        {step.text_input && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Input:</span> {step.text_input}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestExecutionLogs;