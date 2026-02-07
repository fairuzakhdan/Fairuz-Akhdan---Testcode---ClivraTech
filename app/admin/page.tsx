'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  createdAt: string;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('');
  const router = useRouter();

  // Check if already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchLeads();
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchLeads();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const fetchLeads = async (serviceType = '') => {
    const url = serviceType 
      ? `/api/leads?serviceType=${serviceType}`
      : '/api/leads';
    const res = await fetch(url);
    const data = await res.json();
    setLeads(data.leads);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads(filter);
    }
  }, [filter, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Sign in to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition shadow-lg"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-gray-400 text-center">
              Demo credentials:<br />
              <span className="text-purple-300 font-mono">admin / admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Lead Dashboard</h1>
            <p className="text-gray-300">Manage and track your business leads</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Stats & Filter */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-white">{leads.length}</div>
            <div className="text-gray-300 text-sm">Total Leads</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <div className="text-3xl mb-2">🌐</div>
            <div className="text-3xl font-bold text-white">
              {leads.filter(l => l.serviceType === 'Web Development').length}
            </div>
            <div className="text-gray-300 text-sm">Web Development</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <div className="text-3xl mb-2">📱</div>
            <div className="text-3xl font-bold text-white">
              {leads.filter(l => l.serviceType === 'App Development').length}
            </div>
            <div className="text-gray-300 text-sm">App Development</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-3xl font-bold text-white">
              {leads.filter(l => l.serviceType === 'IT Consulting').length}
            </div>
            <div className="text-gray-300 text-sm">IT Consulting</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 mb-6">
          <div className="flex gap-4 items-center flex-wrap">
            <label className="font-semibold text-white">Filter by Service:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="" className="bg-slate-800">All Services</option>
              <option value="Web Development" className="bg-slate-800">Web Development</option>
              <option value="App Development" className="bg-slate-800">App Development</option>
              <option value="IT Consulting" className="bg-slate-800">IT Consulting</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <div className="text-5xl mb-4">📭</div>
                      <div className="text-lg">No leads yet</div>
                      <div className="text-sm">Leads will appear here once submitted</div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-gray-300">{lead.email}</td>
                      <td className="px-6 py-4 text-gray-300">{lead.phone}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-semibold">
                          {lead.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
