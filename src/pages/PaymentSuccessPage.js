import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  Crown, 
  Zap, 
  Download,
  Star,
  Check,
  ArrowRight,
  Mail,
  CreditCard,
  Sparkles,
  Rocket
} from 'lucide-react';

const PaymentSuccessPage = () => {
  const [planDetails, setPlanDetails] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [confettiVisible, setConfettiVisible] = useState(true);

  useEffect(() => {
    const plans = {
      standard: {
        id: 'standard',
        name: 'Standard',
        price: 29,
        period: 'month',
        color: 'purple',
        icon: Zap,
        features: [
          'Up to 500 test cases per month',
          'Full GitHub integration',
          'Email support',
          'Advanced test reports',
          'CI/CD pipeline integration',
          'Custom test templates'
        ]
      },
      pro: {
        id: 'pro',
        name: 'Professional',
        price: 79,
        period: 'month',
        color: 'purple',
        icon: Crown,
        features: [
          'Unlimited test cases',
          'Advanced GitHub integration',
          'Priority support',
          'Premium analytics dashboard',
          'Multiple repository support',
          'Custom integrations',
          'Team collaboration tools',
          'Advanced AI suggestions'
        ]
      }
    };
    // Simulate fetching payment details from URL params or API
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan') || 'standard';
    const email = urlParams.get('email') || 'user@example.com';
    
    setTimeout(() => {
      setPlanDetails(plans[planId]);
      setUserEmail(email);
      setLoading(false);
    }, 1000);

    // Hide confetti after animation
    setTimeout(() => {
      setConfettiVisible(false);
    }, 3000);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/dashboard';
  };

  const handleDownloadInvoice = () => {
    // Simulate invoice download
    alert('Invoice download will be available in your billing history.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {confettiVisible && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full opacity-70"></div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto relative">
              <CheckCircle className="w-12 h-12 text-green-600" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute -inset-4 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Welcome to TesterAlly {planDetails?.name}!
          </p>
          <p className="text-gray-500">
            Your subscription is now active and ready to use.
          </p>
        </div>

        {/* Payment Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <planDetails.icon className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{planDetails?.name} Plan</h3>
                <p className="text-purple-600 font-semibold text-lg">
                  ${planDetails?.price}/{planDetails?.period}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Active
              </div>
              <p className="text-sm text-gray-500">
                Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="w-4 h-4 text-purple-600 mr-2" />
                Plan Features
              </h4>
              <ul className="space-y-2">
                {planDetails?.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
                {planDetails?.features.length > 4 && (
                  <li className="text-sm text-purple-600 font-medium">
                    +{planDetails.features.length - 4} more features
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Mail className="w-4 h-4 text-purple-600 mr-2" />
                Confirmation Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900 font-medium">{userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900 font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="text-gray-900 font-medium">
                    #TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center justify-center px-6 py-3 border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </button>
            <button className="flex items-center justify-center px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Billing
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Rocket className="w-6 h-6 text-purple-600 mr-2" />
            What's Next?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Started</h4>
              <p className="text-sm text-gray-600 mb-4">
                Set up your first test project and connect your GitHub repository.
              </p>
              <button
                onClick={handleGetStarted}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Go to Dashboard
              </button>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Learn More</h4>
              <p className="text-sm text-gray-600 mb-4">
                Explore our documentation and best practices guide.
              </p>
              <button className="border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Docs
              </button>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Support</h4>
              <p className="text-sm text-gray-600 mb-4">
                Need help? Our support team is here for you.
              </p>
              <button className="border border-orange-500 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Email Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-blue-900 mb-2">Confirmation Email Sent</h4>
          <p className="text-blue-700 text-sm mb-4">
            We've sent a confirmation email to <strong>{userEmail}</strong> with your receipt and account details.
          </p>
          <p className="text-blue-600 text-xs">
            Don't see it? Check your spam folder or contact support.
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mt-12">
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
          >
            Start Testing with AI
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Ready to revolutionize your testing workflow? Let's get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;