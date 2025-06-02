import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle, AlertCircle, Loader2, Github, Download, Settings } from 'lucide-react';
import "./style.css";

const UserDashboard = () => {
  const [gitStatus, setGitStatus] = useState('checking'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const userId = localStorage.getItem("userId");

  const checkGitHubStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`https://api.testerally.ai/integrate/git_status/?user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('GitHub status response:', data);
        
        const isConnected = data.connected || false;
        setGitStatus(isConnected ? 'connected' : 'disconnected');
      } else {
        console.error('Failed to check GitHub status:', response.status);
        setGitStatus('disconnected');
        if (response.status === 404) {
          setError('Unable to check GitHub connection status');
        }
      }
    } catch (err) {
      console.error('Error checking GitHub status:', err);
      setGitStatus('disconnected');
      setError('Network error while checking GitHub connection');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      checkGitHubStatus();
    } else {
      setGitStatus('disconnected');
      setLoading(false);
    }
  }, [checkGitHubStatus, userId]);

  const GitStatusCard = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="text-lg text-gray-700">Checking GitHub connection...</span>
          </div>
        </div>
      );
    }

    if (gitStatus === 'connected') {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8 border-l-4 border-green-500">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                🎉 GitHub Connected Successfully!
              </h3>
              <p className="text-green-700 mb-3">
                Your GitHub account is connected and ready to use. You can now access all TesterAlly features including:
              </p>
              <ul className="text-green-600 text-sm space-y-1 ml-4">
                <li>• Repository integration and management</li>
                <li>• Automated test generation from your code</li>
                <li>• CI/CD pipeline integration</li>
                <li>• Advanced testing workflows</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8 border-l-4 border-orange-500">
        <div className="flex items-start space-x-4">
          <div className="bg-orange-100 rounded-full p-2">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-orange-800 mb-2">
              GitHub Not Connected
            </h3>
            <p className="text-orange-700 mb-4">
              To unlock the full potential of TesterAlly, you need to connect with GitHub first.
            </p>
            
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Quick Setup Steps:
              </h4>
              <ol className="text-orange-700 text-sm space-y-2 ml-4">
                <li>1. Create your TesterAlly agent</li>
                <li>2. Download and install the agent</li>
                <li>3. Connect your GitHub account through the agent</li>
                <li>4. Start using all advanced features</li>
              </ol>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center text-orange-600">
                <Download className="w-4 h-4 mr-1" />
                <span>Agent setup required</span>
              </div>
              <div className="flex items-center text-orange-600">
                <Github className="w-4 h-4 mr-1" />
                <span>GitHub integration needed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="text-center space-y-5 mb-12">
          <h1 className="text-5xl font-bold">Welcome to TesterAlly</h1>
          <p className="text-xl text-gray-600">
            AI-based Test Automation Tool to simplify your testing process. Empower your testing with the power of AI.
          </p>
        </div>

        {/* GitHub Status Card */}
        <GitStatusCard />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Additional Dashboard Content */}
        {gitStatus === 'connected' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Github className="w-8 h-8 text-gray-700 mr-3" />
                <h3 className="text-lg font-semibold">Repository Manager</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Manage and integrate your GitHub repositories with TesterAlly's testing suite.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Settings className="w-8 h-8 text-gray-700 mr-3" />
                <h3 className="text-lg font-semibold">Test Automation</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Create and run automated tests with AI-powered suggestions and optimizations.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-gray-700 mr-3" />
                <h3 className="text-lg font-semibold">CI/CD Integration</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Seamlessly integrate testing workflows into your continuous deployment pipeline.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;