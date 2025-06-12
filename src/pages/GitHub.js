import React, { useState, useEffect, useCallback } from 'react';
import { Github, CheckCircle, AlertCircle, Loader2, User, ExternalLink } from 'lucide-react';

function GitHubIntegration() {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const userId = localStorage.getItem("userId");

  const checkGitHubStatus = useCallback(async () => {
    try {
      setConnectionStatus('checking');
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
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
        
        if (isConnected && data.user_info) {
          // Store user info if available
          console.log('User info:', data.user_info);
        }
      } else {
        console.error('Failed to check GitHub status:', response.status);
        setConnectionStatus('disconnected');
        if (response.status === 404) {
          setError('GitHub status endpoint not found');
        } else {
          setError(`Failed to check connection status: ${response.status}`);
        }
      }
    } catch (err) {
      console.error('Error checking GitHub status:', err);
      setConnectionStatus('disconnected');
      setError('Network error while checking GitHub connection');
    }
  }, [userId]);

  useEffect(() => {
    checkGitHubStatus();
  }, [checkGitHubStatus]);

  useEffect(() => {
    // Check for success callback from GitHub OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const connected = urlParams.get('connected');
    const error = urlParams.get('error');
    
    if (success === 'true' && connected === 'github') {
      setShowSuccessModal(true);
      setConnectionStatus('connected');
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      // Recheck status after successful connection
      setTimeout(() => {
        checkGitHubStatus();
      }, 1000);
    } else if (error) {
      setError(`Authentication failed: ${decodeURIComponent(error)}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [checkGitHubStatus]);

  const connectToGitHub = async () => {
    if (!userId) {
      setError("User ID not found in localStorage");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Redirect to GitHub login API
      const loginUrl = `https://api.testerally.ai/integrate/github_login/?user_id=${userId}`;
      console.log('Redirecting to:', loginUrl);
      window.location.href = loginUrl;
    } catch (err) {
      console.error('Error connecting to GitHub:', err);
      setError('Failed to initiate GitHub connection');
      setLoading(false);
    }
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Connected Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Your GitHub account has been connected to TesterAlly.
          </p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        {showSuccessModal && <SuccessModal />}
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gray-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Github className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">GitHub Integration</h1>
            <p className="text-gray-600 mt-2">Connect your GitHub account to TesterAlly</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-700 font-medium text-sm">Connection Error</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Connection Status */}
          <div className="mb-8">
            {connectionStatus === 'checking' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                  <span className="text-blue-700 font-medium">Checking connection status...</span>
                </div>
              </div>
            )}

            {connectionStatus === 'connected' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-700 font-semibold">Connected to GitHub</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600 text-sm">
                  <User className="w-4 h-4" />
                  <span>Your GitHub account is successfully linked</span>
                </div>
              </div>
            )}

            {connectionStatus === 'disconnected' && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <Github className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-600 font-medium">Not connected to GitHub</span>
                  <p className="text-gray-500 text-sm mt-1">
                    Connect your GitHub account to access your repositories
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {connectionStatus === 'disconnected' && (
              <button
                onClick={connectToGitHub}
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-4 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 text-lg group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Github className="w-6 h-6" />
                    <span>Connect with GitHub</span>
                    <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>
            )}

            {connectionStatus === 'connected' && (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-700 font-medium">GitHub Integration Active</p>
                  <p className="text-blue-600 text-sm mt-1">
                    You can now use GitHub features in TesterAlly
                  </p>
                </div>
                
                <button
                  onClick={checkGitHubStatus}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Github className="w-5 h-5" />
                      <span>Refresh Status</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {connectionStatus === 'checking' && (
              <button
                disabled
                className="w-full bg-gray-400 text-white font-semibold py-4 px-4 rounded-lg cursor-not-allowed"
              >
                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
              </button>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-gray-500 text-sm space-y-1">
              <p>User ID: {userId}</p>
              <p>API: api.testerally.ai</p>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">About GitHub Integration</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Connect your GitHub account securely</p>
            <p>• Access your repositories through TesterAlly</p>
            <p>• Streamline your development workflow</p>
            <p>• Maintain full control of your GitHub data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitHubIntegration;