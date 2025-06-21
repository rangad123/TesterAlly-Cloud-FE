import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Crown, 
  Zap, 
  Shield,
  CreditCard,
  Download,
  Star,
  Check,
  X
} from 'lucide-react';

const PlanConfirmationModal = ({ 
  isOpen, 
  onClose, 
  selectedPlan, 
  plans, 
  onConfirm, 
  loading 
}) => {
  if (!isOpen || !selectedPlan) return null;

  const plan = plans.find(p => p.id === selectedPlan);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Confirm Your Plan</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
              plan.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
            }`}>
              <plan.icon className={`w-6 h-6 ${
                plan.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{plan.name} Plan</h4>
              <p className="text-2xl font-bold text-purple-600">${plan.price}/{plan.period}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">What you'll get:</h5>
            <ul className="space-y-1">
              {plan.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
              {plan.features.length > 3 && (
                <li className="text-sm text-gray-500">
                  +{plan.features.length - 3} more features...
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Redirecting to Stripe...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with Stripe
              </>
            )}
          </button>
          
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors duration-300"
          >
            Cancel
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure payment processing by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

const BillingPage = () => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [billingHistory, setBillingHistory] = useState([]);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'Forever',
      color: 'gray',
      icon: Shield,
      features: [
        'Up to 10 test cases per month',
        'Basic GitHub integration',
        'Community support',
        'Standard test reports'
      ],
      limitations: [
        'Limited API calls',
        'No advanced analytics',
        'No priority support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 29,
      period: 'month',
      color: 'purple',
      icon: Zap,
      popular: true,
      stripePriceId: 'price_1QH123456789_standard',
      features: [
        'Up to 500 test cases per month',
        'Full GitHub integration',
        'Email support',
        'Advanced test reports',
        'CI/CD pipeline integration',
        'Custom test templates'
      ],
      limitations: [
        'Limited to 3 repositories',
        'Standard analytics only'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 79,
      period: 'month',
      color: 'purple',
      icon: Crown,
      stripePriceId: 'price_1QH123456789_pro',
      features: [
        'Unlimited test cases',
        'Advanced GitHub integration',
        'Priority support',
        'Premium analytics dashboard',
        'Multiple repository support',
        'Custom integrations',
        'Team collaboration tools',
        'Advanced AI suggestions',
        'Custom webhooks'
      ],
      limitations: []
    }
  ];

  useEffect(() => {
    setBillingHistory([
      {
        id: 'inv_001',
        date: '2024-11-15',
        amount: 29,
        plan: 'Standard',
        status: 'paid',
        downloadUrl: '#'
      },
      {
        id: 'inv_002',
        date: '2024-10-15',
        amount: 29,
        plan: 'Standard',
        status: 'paid',
        downloadUrl: '#'
      }
    ]);
    
    setCurrentPlan('standard');
  }, []);

  const handlePlanSelect = (planId) => {
    if (planId === 'free') return;
    
    setSelectedPlan(planId);
    setShowConfirmModal(true);
  };

  const handleConfirmPayment = async () => {
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    if (!selectedPlan) return;
    
    console.log('🚀 Starting Stripe Checkout for plan:', selectedPlan);
    setLoading(true);
    
    try {
      // Call your backend API to create checkout session
      const response = await fetch('https://api.testerally.ai/api/create-checkout-session/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          user_email:userEmail
        })
      });

      const data = await response.json();
      
      if (data.checkout_url) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('❌ Checkout error:', error);
      setLoading(false);
      // Show error message to user
      alert('Failed to start checkout. Please try again.');
    }
  };

  const handleCloseModal = () => {
    if (!loading) {
      setShowConfirmModal(false);
      setSelectedPlan(null);
    }
  };

  const PlanCard = ({ plan }) => {
    const isCurrentPlan = currentPlan === plan.id;
    const isPlanDisabled = plan.id === 'free' && currentPlan !== 'free';
    
    return (
      <div className={`relative bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 ${
        plan.popular 
          ? 'border-purple-600 ring-2 ring-purple-600 ring-opacity-50' 
          : isCurrentPlan 
            ? 'border-green-500' 
            : 'border-gray-200 hover:border-purple-300'
      }`}>
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Most Popular
            </span>
          </div>
        )}
        
        {isCurrentPlan && (
          <div className="absolute -top-3 right-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Current Plan
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
            plan.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
          }`}>
            <plan.icon className={`w-6 h-6 ${
              plan.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
            }`} />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          
          <div className="mb-4">
            <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
            {plan.price > 0 && <span className="text-gray-600">/{plan.period}</span>}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Features included:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {plan.limitations.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
              <ul className="space-y-2">
                {plan.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start">
                    <X className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={() => handlePlanSelect(plan.id)}
          disabled={isCurrentPlan || isPlanDisabled}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            isCurrentPlan
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : isPlanDisabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : plan.color === 'purple'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-800 hover:bg-gray-900 text-white'
          }`}
        >
          {isCurrentPlan ? (
            'Current Plan'
          ) : isPlanDisabled ? (
            'Downgrade Not Available'
          ) : plan.price === 0 ? (
            'Current Plan'
          ) : (
            `Upgrade to ${plan.name}`
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your TesterAlly Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower your testing with AI. Choose the plan that best fits your needs and scale your test automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Billing History</h2>
            <CreditCard className="w-6 h-6 text-purple-600" />
          </div>

          {billingHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-900">{invoice.plan}</td>
                      <td className="py-3 px-4 text-gray-900">${invoice.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          invoice.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status === 'paid' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-purple-600 hover:text-purple-800 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No billing history available</p>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        <PlanConfirmationModal
          isOpen={showConfirmModal}
          onClose={handleCloseModal}
          selectedPlan={selectedPlan}
          plans={plans}
          onConfirm={handleConfirmPayment}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BillingPage;