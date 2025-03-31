import React from 'react';

export default function MustockLandingPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <header className="bg-yellow-100 py-20 px-6 text-center border-b border-yellow-300">
        <h1 className="text-4xl font-bold mb-4">Warehouse Intelligence. Simplified.</h1>
        <p className="text-lg max-w-xl mx-auto text-slate-600 mb-6">
          Streamline your warehouse operations with real-time stock management, AI-driven insights, and smooth integrations.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-md transition duration-200"
        >
          Get Started
        </a>
      </header>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">What Mustock AI Brings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard title="Real-time Stock Management" emoji="📦" text="Monitor inventory levels at a glance with accurate, up-to-date stock data." />
          <FeatureCard title="Barcode-powered Input" emoji="📡" text="Quickly scan items into your system and reduce manual entry errors." />
          <FeatureCard title="AI Assistant" emoji="🧠" text="Let your team ask for product locations or availability using natural language." />
          <FeatureCard title="Warehouse & Showroom Sync" emoji="🔗" text="Maintain clarity between your warehouse and front-facing inventory levels." />
          <FeatureCard title="Built for Scale" emoji="🚀" text="Mustock grows with your business — whether you run one warehouse or ten." />
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <PricingCard title="Starter" price="$49/mo" features={["1 warehouse", "Barcode input", "Basic AI assistant"]} />
          <PricingCard title="Pro" price="$99/mo" features={["Multi-warehouse", "AI restocking", "Advanced assistant"]} highlight />
          <PricingCard title="Enterprise" price="Custom" features={["Unlimited warehouses", "Full API access", "Onboarding support"]} />
        </div>
      </section>

      <section className="bg-yellow-100 text-center py-20 px-6">
        <h2 className="text-3xl font-semibold mb-4">Ready to let AI run your warehouse?</h2>
        <p className="text-lg text-slate-600 mb-8">Mustock AI helps you simplify logistics, reduce errors, and scale faster — all in one smart system.</p>
        <a
          href="/dashboard"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-md transition duration-200"
        >
          Get Started
        </a>

        {/* Netlify Signup Form */}
        <form
  name="beta-signup"
  method="POST"
  data-netlify="true"
  action="/thank-you"   // 👈 Add this line
  className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md"
>
          <input type="hidden" name="form-name" value="beta-signup" />
          <label className="block mb-2 font-medium">Your email:</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Sign Me Up
          </button>
        </form>
      </section>

      <footer className="bg-slate-900 text-white text-center py-10 text-sm">
        <p><strong>Mustock AI</strong> — © 2025 All rights reserved</p>
      </footer>
    </div>
  );
}

function FeatureCard({ emoji, title, text }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow hover:shadow-md transition duration-200 transform hover:scale-105">
      <h3 className="text-lg font-semibold mb-2">{emoji} {title}</h3>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}

function PricingCard({ title, price, features, highlight }) {
  return (
    <div
      className={`rounded-xl border p-6 text-center shadow-md transition duration-200 transform hover:scale-105 ${
        highlight ? 'bg-yellow-100 border-yellow-300' : 'bg-white border-slate-200'
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-4">{price}</div>
      <ul className="text-sm text-slate-600 space-y-1 mb-6">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <a
        href="#"
        className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-5 rounded-md transition duration-200"
      >
        {title === 'Enterprise' ? 'Contact Us' : 'Get Started'}
      </a>
    </div>
  );
}
