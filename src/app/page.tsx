import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 font-bold text-2xl text-blue-600">
                HRM Pro
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                
                <Link href="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2">Features</Link>
                <a href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2">Pricing</a>
                <a href="/testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2">Testimonials</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Rental Property Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional tools for landlords to manage properties, tenants, and payments—all in one platform. 
            Save time, reduce hassle, and grow your rental business.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <a
              href="/signup"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              Start 30-Day Free Trial
            </a>
            <a
              href="#demo"
              className="px-8 py-4 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg"
            >
              Watch Demo
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Properties Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">On-Time Payments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Properties
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools designed specifically for professional landlords
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Simplify Your Property Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of landlords who trust HRM Pro to manage their rental properties
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg"
          >
            Get Started Today
          </a>
          <p className="text-blue-200 mt-4">
            No credit card required • Free 30-day trial
          </p>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🏠",
    title: "Property Portfolio",
    description: "Manage multiple properties with detailed records, documents, and maintenance history in one centralized dashboard."
  },
  {
    icon: "👥",
    title: "Tenant Management",
    description: "Screen tenants, track leases, and communicate efficiently with automated reminders and messaging."
  },
  {
    icon: "💰",
    title: "Rent Collection",
    description: "Automated rent collection, late fee tracking, and financial reporting for seamless cash flow management."
  },
  {
    icon: "🔧",
    title: "Maintenance Tracking",
    description: "Coordinate repairs, track maintenance requests, and manage vendor relationships with ease."
  },
  {
    icon: "📊",
    title: "Financial Reporting",
    description: "Generate detailed income statements, expense tracking, and tax-ready financial reports."
  },
  {
    icon: "📱",
    title: "Mobile Access",
    description: "Manage your properties on-the-go with our dedicated mobile app for iOS and Android."
  }
];