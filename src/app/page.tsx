export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to HRM (House Rental Management)
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        A SaaS platform to manage your rental properties, tenants, and payments with ease.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/signup"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Login
        </a>
      </div>
    </div>
  );
}
