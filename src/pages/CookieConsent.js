import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white border-t-4 border-purple-600 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-gray-900">
            This website uses cookies
          </h2>
          
          <p className="mb-4 text-gray-700 leading-relaxed">
            We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. 
            We also share information about your use of our site with our social media, advertising and analytics partners 
            who may combine it with other information that you've provided to them or that they've collected from your use 
            of their services.
          </p>
          
          {showDetails && (
            <div className="mt-4 mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600">
              <h4 className="font-semibold mb-3 text-gray-900">Cookie Types:</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-medium">•</span>
                  <span><strong>Essential cookies:</strong> Required for basic site functionality</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-medium">•</span>
                  <span><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-medium">•</span>
                  <span><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-medium">•</span>
                  <span><strong>Social media cookies:</strong> Enable social sharing and tracking</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="px-5 py-2 border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all duration-200 font-medium"
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
            
            <div className="flex gap-3 sm:ml-auto">
              <button 
                onClick={handleDeny}
                className="px-6 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
              >
                Deny
              </button>
              <button 
                onClick={handleAccept}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-lg"
              >
                Allow all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;