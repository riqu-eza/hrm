import Link from "next/link";

export default function TestimonialsPage() {
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
                <a href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2">Pricing</a>
                <a href="/testimonials" className="text-blue-600 px-3 py-2 font-medium">Testimonials</a>
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
            What Our Customers Say
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of landlords in Kenya who have transformed their property management with HRM Pro
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">&quot;{testimonial.quote}&quot;</p>
              <div className="text-sm text-gray-500">
                Saved: <span className="font-semibold text-green-600">{testimonial.savings}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                  <p className="text-gray-600 mb-6">{study.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {study.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{result.value}</div>
                        <div className="text-sm text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <span className="text-gray-500">Property Image</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Join Them?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start saving time and money on your property management today
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
          >
            Start Your Free Trial
          </a>
          <p className="text-gray-500 mt-4">No credit card required • 30-day free trial</p>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { value: "500+", label: "Properties Managed" },
  { value: "KSh 25M+", label: "Rent Processed" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "50-70%", label: "Cost Savings" }
];

const testimonials = [
  {
    name: "John Kamau",
    role: "Property Owner, Nairobi",
    rating: 5,
    quote: "HRM Pro cut my management time by 70%. The automated rent collection alone is worth every shilling.",
    savings: "KSh 45,000/month"
  },
  {
    name: "Sarah Wanjiku",
    role: "Real Estate Investor",
    rating: 5,
    quote: "From 8 apartments to 25 in two years. HRM Pro scaled with my business effortlessly.",
    savings: "KSh 120,000/year"
  },
  {
    name: "David Ochieng",
    role: "Property Manager, Mombasa",
    rating: 5,
    quote: "The maintenance tracking feature has eliminated tenant complaints. Everything is organized and timely.",
    savings: "KSh 60,000/month"
  },
  {
    name: "Grace Mwende",
    role: "Landlord, Kisumu",
    rating: 5,
    quote: "Switched from a traditional agent and saved KSh 400,000 in the first year. Incredible value!",
    savings: "KSh 400,000/year"
  },
  {
    name: "Mike Otieno",
    role: "Commercial Property Owner",
    rating: 5,
    quote: "The financial reporting made tax season stress-free. All my documents in one place.",
    savings: "KSh 85,000/month"
  },
  {
    name: "Lucy Akinyi",
    role: "Real Estate Developer",
    rating: 5,
    quote: "Managing multiple properties across different cities is now seamless with HRM Pro's mobile app.",
    savings: "KSh 200,000/year"
  }
];

const caseStudies = [
  {
    title: "From Agent Dependency to Full Control",
    description: "How John transitioned from paying 10% monthly commissions to managing 15 properties himself with HRM Pro, increasing his ROI significantly.",
    results: [
      { value: "KSh 75K/m", label: "Agent Fees Saved" },
      { value: "15", label: "Properties Managed" },
      { value: "3 hrs/wk", label: "Time Spent" },
      { value: "40%", label: "ROI Increase" }
    ]
  },
  {
    title: "Scaling Portfolio Management",
    description: "Sarah's journey from managing 8 apartments manually to efficiently handling 25 properties with automated systems and better tenant relationships.",
    results: [
      { value: "25", label: "Properties" },
      { value: "KSh 120K", label: "Annual Savings" },
      { value: "95%", label: "On-time Payments" },
      { value: "2x", label: "Portfolio Growth" }
    ]
  }
];