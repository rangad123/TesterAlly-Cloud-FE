import React, { useState, useEffect, useCallback, useRef } from "react";
import { CheckCircle, AlertCircle, Loader2, Github, Download, Settings, X, Sparkles, Crown, Zap } from 'lucide-react';

const UserDashboard = () => {
  const [gitStatus, setGitStatus] = useState('checking'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const hasShownModal = useRef(false);
  
  const userId = localStorage.getItem("userId");

  const showPaymentSuccessModal = useCallback((planType, sessionId) => {
    setShowPaymentSuccess(true);
    
    const planDetails = {
      standard: {
        name: 'Standard Plan',
        price: 29,
        period: 'month',
        icon: Zap,
        color: 'purple'
      },
      pro: {
        name: 'Professional Plan', 
        price: 79,
        period: 'month',
        icon: Crown,
        color: 'purple'
      }
    };
    
    setPaymentDetails({
      ...planDetails[planType],
      sessionId,
      date: new Date().toLocaleDateString(),
      transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });
  }, []);

useEffect(() => {
  if (hasShownModal.current) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('payment_success');
  const sessionId = urlParams.get('session_id');
  
  // 🔍 Debug logging
  console.log('Current URL:', window.location.href);
  console.log('Payment success:', paymentSuccess);
  console.log('Session ID:', sessionId);
  
  if (paymentSuccess === 'true' && sessionId) {
    console.log('Showing payment modal'); // 🔍 Debug
    showPaymentSuccessModal('standard', sessionId);
    hasShownModal.current = true;
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}, [showPaymentSuccessModal]);

  const checkGitHubStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in real app, make actual API call
      const mockConnected = Math.random() > 0.5; // Random for demo
      setGitStatus(mockConnected ? 'connected' : 'disconnected');
      
    } catch (err) {
      console.error('Error checking GitHub status:', err);
      setGitStatus('disconnected');
      setError('Network error while checking GitHub connection');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      checkGitHubStatus();
    } else {
      setGitStatus('disconnected');
      setLoading(false);
    }
  }, [checkGitHubStatus, userId]);

  const handlePaymentSuccessClose = () => {
    setShowPaymentSuccess(false);
  };

  const PaymentSuccessModal = () => {
    if (!showPaymentSuccess || !paymentDetails) return null;

    // const PlanIcon = paymentDetails.icon;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
          {/* Header with confetti effect */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white relative overflow-hidden">
            <button
              onClick={handlePaymentSuccessClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>

            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">🎉 Payment Successful!</h2>
              <p className="text-purple-100">Welcome to TesterAlly {paymentDetails.name.split(' ')[0]}!</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* <div className="text-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <PlanIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{paymentDetails.name}</h3>
              <p className="text-purple-600 font-medium">${paymentDetails.price}/{paymentDetails.period}</p>
            </div> */}

            {/* <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="text-gray-900 font-mono">{paymentDetails.transactionId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900">{paymentDetails.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div> */}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">✨ Subscription Activated</h4>
                  <p className="text-blue-700 text-sm">
                    Your account has been upgraded and all features are now available.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handlePaymentSuccessClose}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Continue to Dashboard
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    <div className="min-h-screen">
      {/* Payment Success Modal */}
      <PaymentSuccessModal />

      <div className="dashboard-container">
        <div className="main-content p-8">
          <div className="text-center space-y-5 mb-12">
            <h1 className="text-5xl font-bold text-gray-900">Welcome to TesterAlly</h1>
            <p className="text-xl text-gray-600">
              AI-based Test Automation Tool to simplify your testing process. Empower your testing with the power of AI.
            </p>
          </div>
{/* <button 
  onClick={() => showPaymentSuccessModal('standard', 'test_session')}
  className="bg-purple-600 text-white px-4 py-2 rounded"
>
  Test Payment Success Modal
</button> */}

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
    </div>
  );
};

export default UserDashboard;