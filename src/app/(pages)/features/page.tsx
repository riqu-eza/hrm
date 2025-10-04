"use client";
import Link from "next/link";
import React from "react";
export default function FeaturesPage() {

    const featureCategories = [
  {
    icon: "💰",
    title: "Financial Management",
    features: [
      { name: "Automated Rent Collection", description: "Set up automatic payments and track rent history" },
      { name: "Late Fee Management", description: "Automatically calculate and track late payments" },
      { name: "Expense Tracking", description: "Monitor maintenance costs and other property expenses" },
      { name: "Tax Reporting", description: "Generate detailed financial reports for tax purposes" },
      { name: "Online Payment Processing", description: "Accept payments via M-Pesa, bank transfer, and cards" }
    ]
  },
  {
    icon: "🏠",
    title: "Property & Tenant Management",
    features: [
      { name: "Tenant Screening", description: "Background checks and rental history verification" },
      { name: "Lease Management", description: "Digital lease agreements and automated renewals" },
      { name: "Maintenance Requests", description: "Tenant-submitted requests with photo attachments" },
      { name: "Property Database", description: "Complete records for all your properties" },
      { name: "Document Storage", description: "Secure cloud storage for all property documents" }
    ]
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    features: [
      { name: "Portfolio Dashboard", description: "Real-time overview of all your properties" },
      { name: "Vacancy Tracking", description: "Monitor and analyze vacancy rates and costs" },
      { name: "Performance Metrics", description: "ROI calculations and property performance" },
      { name: "Custom Reports", description: "Create tailored reports for your specific needs" },
      { name: "Market Analysis", description: "Compare your performance with local market rates" }
    ]
  },
  {
    icon: "🔧",
    title: "Automation & Tools",
    features: [
      { name: "Automated Reminders", description: "Payment due dates and maintenance follow-ups" },
      { name: "Mobile App", description: "Manage properties on iOS and Android devices" },
      { name: "Bulk Messaging", description: "Communicate with multiple tenants at once" },
      { name: "Maintenance Scheduling", description: "Coordinate with service providers efficiently" },
      { name: "Rent Increase Automation", description: "Schedule and manage rent adjustments" }
    ]
  }
];

const integrations = [
  { icon: "📱", name: "M-Pesa" },
  { icon: "🏦", name: "Bank APIs" },
  { icon: "📧", name: "Email" },
  { icon: "💬", name: "SMS" },
  { icon: "📄", name: "PDF Export" },
  { icon: "☁️", name: "Cloud Storage" }
];

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
                <a href="/features" className="text-blue-600 px-3 py-2 font-medium">Features</a>
                <a href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2">Pricing</a>
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
            Powerful Features for Property Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to efficiently manage your rental properties and grow your business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {featureCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl">{category.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              <ul className="space-y-4">
                {category.features.map((feature, featIndex) => (
                  <li key={featIndex} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-gray-900">{feature.name}:</span>
                      <span className="text-gray-600 ml-1">{feature.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integration Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Connect with your favorite tools and services
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">{integration.icon}</span>
                </div>
                <span className="text-gray-700 font-medium">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

