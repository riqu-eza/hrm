import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 font-bold text-2xl text-blue-600">
                HRM Pro
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2">Features</a>
                <a href="/pricing" className="text-blue-600 px-3 py-2 font-medium">Pricing</a>
                <a href="/testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2">Testimonials</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Sign In</a>
              <a href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Start Free Trial</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save up to 50% compared to traditional rental agents. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`rounded-2xl shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-blue-600 transform scale-105' : 'border border-gray-200'
            }`}>
              {plan.popular && (
                <div className="bg-blue-600 text-white text-center py-2">
                  <span className="font-semibold">MOST POPULAR</span>
                </div>
              )}
              <div className="bg-white p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">KSh {plan.priceMonthly}</span>
                  <span className="text-gray-600">/month</span>
                  {plan.yearlyDiscount && (
                    <div className="text-green-600 font-semibold mt-2">
                      Save {plan.yearlyDiscount}% with annual billing
                    </div>
                  )}
                </div>

                <a
                  href="/signup"
                  className={`w-full block text-center py-3 px-4 rounded-lg font-semibold ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featIndex) => (
                    <li key={featIndex} className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Annual Savings Calculator */}
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            See How Much You#&39;ll Save
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 border-2 border-red-200 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Traditional Agent</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">10%</div>
              <div className="text-gray-600">of monthly rent per property</div>
              <div className="mt-4 text-sm text-gray-500">
                Average cost: KSh 5,000 - 15,000 per property/month
              </div>
            </div>
            <div className="text-center p-6 border-2 border-green-200 rounded-xl bg-green-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">HRM Pro</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">Save 50-70%</div>
              <div className="text-gray-600">compared to traditional agents</div>
              <div className="mt-4 text-sm text-gray-500">
                Flat fee starting from KSh 1,500 per property/month
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individual landlords",
    priceMonthly: "1,500",
    yearlyDiscount: 20,
    cta: "Start Free Trial",
    popular: false,
    features: [
      "Up to 5 properties",
      "Basic tenant management",
      "Rent collection via M-Pesa",
      "Maintenance request tracking",
      "Email support",
      "Basic reporting"
    ]
  },
  {
    name: "Professional",
    description: "Ideal for growing property portfolios",
    priceMonthly: "3,500",
    yearlyDiscount: 25,
    cta: "Start Free Trial",
    popular: true,
    features: [
      "Up to 20 properties",
      "Advanced tenant screening",
      "Automated rent collection",
      "Maintenance coordination",
      "Financial reporting",
      "Priority support",
      "Mobile app access",
      "Bulk messaging"
    ]
  },
  {
    name: "Enterprise",
    description: "For large property management companies",
    priceMonthly: "7,500",
    yearlyDiscount: 30,
    cta: "Contact Sales",
    popular: false,
    features: [
      "Unlimited properties",
      "Custom tenant portal",
      "Advanced analytics",
      "API access",
      "Dedicated account manager",
      "White-label options",
      "Custom integrations",
      "24/7 phone support"
    ]
  }
];

const faqs = [
  {
    question: "How does the annual billing discount work?",
    answer: "When you choose annual billing, you get a significant discount—20-30% off the monthly rate. You're billed once per year instead of monthly, saving you money while getting full access to all features."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in billing."
  },
  {
    question: "Is there a setup fee or hidden costs?",
    answer: "No setup fees and no hidden costs. What you see is what you pay. The only additional costs would be payment processing fees for M-Pesa transactions (typically 1-1.5%)."
  },
  {
    question: "How does HRM Pro compare to traditional rental agents?",
    answer: "Traditional agents charge 8-10% of monthly rent per property. With HRM Pro, you pay a flat fee starting at KSh 1,500 per property, saving you 50-70% while giving you more control and better tools."
  }
];