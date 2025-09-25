import { useState } from 'react';

interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

interface BillingPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: PlanFeature[];
  isPopular?: boolean;
}

function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: BillingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? 9.99 : 99.99,
      period: billingCycle,
      features: [
        { id: 'users', name: 'Up to 5 users', included: true },
        { id: 'storage', name: '10GB storage', included: true },
        { id: 'support', name: 'Email support', included: true },
        { id: 'analytics', name: 'Basic analytics', included: true },
        { id: 'api', name: 'API access', included: false },
        { id: 'priority', name: 'Priority support', included: false },
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: billingCycle === 'monthly' ? 19.99 : 199.99,
      period: billingCycle,
      isPopular: true,
      features: [
        { id: 'users', name: 'Up to 20 users', included: true },
        { id: 'storage', name: '50GB storage', included: true },
        { id: 'support', name: 'Email & chat support', included: true },
        { id: 'analytics', name: 'Advanced analytics', included: true },
        { id: 'api', name: 'API access', included: true },
        { id: 'priority', name: 'Priority support', included: false },
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 49.99 : 499.99,
      period: billingCycle,
      features: [
        { id: 'users', name: 'Unlimited users', included: true },
        { id: 'storage', name: 'Unlimited storage', included: true },
        { id: 'support', name: 'Email, chat & phone support', included: true },
        { id: 'analytics', name: 'Enterprise analytics', included: true },
        { id: 'api', name: 'API access with higher limits', included: true },
        { id: 'priority', name: '24/7 Priority support', included: true },
      ]
    }
  ];

  const handleSubscribe = (planId: string) => {
    // 在实际应用中，这里应该跳转到支付页面或调用支付API
    console.log(`Subscribing to plan: ${planId} with ${billingCycle} billing cycle`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Billing & Plans</h1>
        <p className="text-gray-600 mb-8">Choose the plan that works best for your team</p>

        {/* Billing cycle toggle */}
        <div className="flex items-center justify-center mb-12">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>Monthly</span>
          <div className="mx-4">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={billingCycle === 'yearly'}
                onChange={(e) => setBillingCycle(e.target.checked ? 'yearly' : 'monthly')}
              />
              <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative transition-all duration-300"></div>
            </label>
          </div>
          <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>Yearly (Save 15%)</span>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative rounded-lg border-2 p-6 transition-all ${plan.isPopular ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300'}
                ${selectedPlan === plan.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
              `}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/{plan.period === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start">
                    <svg className={`h-5 w-5 mr-2 mt-0.5 ${feature.included ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {feature.included ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setSelectedPlan(plan.id);
                  handleSubscribe(plan.id);
                }}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${plan.isPopular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {selectedPlan === plan.id ? 'Current Plan' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>

        {/* Additional information */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Method</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Credit Card</span>
                </div>
                <p className="text-sm text-gray-600">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires: 04/2025</p>
              </div>
              <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                Update Payment Method
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Billing Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Eric Frusciante</p>
                <p className="text-sm text-gray-600">1234 Main Street</p>
                <p className="text-sm text-gray-600">New York, NY 10001</p>
                <p className="text-sm text-gray-600">United States</p>
              </div>
              <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                Update Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;