'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('✅ Thank you! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', serviceType: '' });
      } else {
        const data = await res.json();
        setStatus(`❌ ${data.error}`);
      }
    } catch {
      setStatus('❌ Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ClivraTech</h1>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition"
            >
              Get Started
            </button>
            <a href="/admin" className="text-purple-300 hover:text-white transition">Admin</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-extrabold text-white mb-6 leading-tight">
            Transform Your Business<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              With Expert Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We help businesses scale with professional web development, mobile app solutions, and strategic IT consulting services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🌐</div>
            <h3 className="text-2xl font-bold text-white mb-3">Web Development</h3>
            <p className="text-gray-300 mb-4">Custom websites and web applications built with modern technologies</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Responsive Design
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> SEO Optimized
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Fast Performance
              </li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📱</div>
            <h3 className="text-2xl font-bold text-white mb-3">App Development</h3>
            <p className="text-gray-300 mb-4">Native and cross-platform mobile applications for iOS and Android</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span> iOS & Android
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span> Cross-Platform
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span> Native Performance
              </li>
            </ul>
          </div>

          <div className="group bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-lg p-8 rounded-2xl border border-orange-500/20 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">💼</div>
            <h3 className="text-2xl font-bold text-white mb-3">IT Consulting</h3>
            <p className="text-gray-300 mb-4">Strategic technology consulting to optimize your business operations</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✓</span> Tech Strategy
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✓</span> System Architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✓</span> Digital Transformation
              </li>
            </ul>
          </div>
        </div>

        {/* Lead Form */}
        <div id="contact-form" className="max-w-xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Ready to Get Started?</h2>
            <p className="text-gray-300 text-center mb-8">Fill out the form and we'll contact you within 24 hours</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Service Interest</label>
                <select
                  required
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                >
                  <option value="" className="bg-slate-800">Select a service</option>
                  <option value="Web Development" className="bg-slate-800">Web Development</option>
                  <option value="App Development" className="bg-slate-800">App Development</option>
                  <option value="IT Consulting" className="bg-slate-800">IT Consulting</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition shadow-lg"
              >
                Submit Request
              </button>
            </form>

            {status && (
              <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
                status.includes('✅') 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {status}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-white/10">
        <p>© 2026 ClivraTech. All rights reserved.</p>
      </footer>
    </div>
  );
}
