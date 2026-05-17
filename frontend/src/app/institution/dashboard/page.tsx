'use client';

import { useState, useEffect } from "react";
import { 
  Users, TrendingUp, Wallet, Search, Filter, ArrowRight,
  CheckCircle, AlertCircle, Activity, BarChart3, PieChart,
  Shield, Loader2, Menu, X, Download, ChevronDown
} from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api";

interface Pyme {
  id: string;
  name: string;
  wallet: string;
  score: number;
  risk: 'low' | 'medium' | 'high';
  volume: number;
  transactions: number;
  status: 'active' | 'pending';
}

interface InstitutionStats {
  totalPymes: number;
  activePymes: number;
  totalVolume: number;
  avgScore: number;
  totalTransactions: number;
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
}

export default function InstitutionDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [pymes, setPymes] = useState<Pyme[]>([]);
  const [stats, setStats] = useState<InstitutionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data for demo purposes
  const mockPymes: Pyme[] = [
    { id: "1", name: "Distribuidora del Norte", wallet: "0x742d35...", score: 847, risk: "low", volume: 1250000, transactions: 47, status: "active" },
    { id: "2", name: "Comercializadora Juárez", wallet: "0x8ba1f1...", score: 723, risk: "low", volume: 890000, transactions: 32, status: "active" },
    { id: "3", name: "Importadora García", wallet: "0x3f5CE5...", score: 654, risk: "medium", volume: 540000, transactions: 21, status: "active" },
    { id: "4", name: "Exportadora del Sur", wallet: "0x952222...", score: 521, risk: "high", volume: 280000, transactions: 12, status: "pending" },
    { id: "5", name: "Mayoreo Martínez", wallet: "0xAb5801...", score: 778, risk: "low", volume: 2100000, transactions: 68, status: "active" },
    { id: "6", name: "Distribuciones López", wallet: "0xdAC17F...", score: 612, risk: "medium", volume: 450000, transactions: 19, status: "active" },
    { id: "7", name: "Logística Hernández", wallet: "0x8f3470...", score: 698, risk: "medium", volume: 720000, transactions: 28, status: "active" },
    { id: "8", name: "Suministros Pérez", wallet: "0x0716a1...", score: 812, risk: "low", volume: 1560000, transactions: 54, status: "active" },
  ];

  const mockStats: InstitutionStats = {
    totalPymes: 247,
    activePymes: 198,
    totalVolume: 24500000,
    avgScore: 712,
    totalTransactions: 1247,
    lowRisk: 143,
    mediumRisk: 68,
    highRisk: 36
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pymesRes, statsRes] = await Promise.all([
          apiClient.getInstitutionPymes(),
          apiClient.getInstitutionStats()
        ]);
        
        if (pymesRes.success) setPymes(pymesRes.data);
        if (statsRes.success) setStats(statsRes.data);
      } catch (err: any) {
        console.log("Backend unavailable, using mock data");
        setPymes(mockPymes);
        setStats(mockStats);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const MAX_SEARCH_LENGTH = 100;
  const sanitizedQuery = searchQuery.slice(0, MAX_SEARCH_LENGTH);
  
  const filteredPymes = pymes.filter(p => 
    p.name.toLowerCase().includes(sanitizedQuery.toLowerCase()) ||
    p.wallet.toLowerCase().includes(sanitizedQuery.toLowerCase())
  );

  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case "low": return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">Low Risk</span>;
      case "medium": return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 border border-white/20">Medium</span>;
      case "high": return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/40 border border-white/20">High Risk</span>;
      default: return <span className="text-white/40 text-xs">{risk}</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-white";
    if (score >= 600) return "text-white/70";
    return "text-white/50";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-3" />
          <p className="text-white/40 text-sm">Loading PACTO Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && pymes.length === 0 && !stats) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center p-8 bg-white/[0.02] rounded-2xl border border-white/10 max-w-md mx-4">
          <AlertCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">Error loading dashboard</p>
          <p className="text-white/40 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-black" />
                </div>
                <span className="text-white font-bold text-lg">PACTO</span>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-white/10" />
              <div className="hidden sm:flex items-center gap-2 text-white/50">
                <Wallet className="w-4 h-4" />
                <span className="text-sm">Banco del Sur</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white/70 text-xs font-medium">Live Demo</span>
              </div>
              
              <button 
                className="md:hidden p-2 text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col gap-2">
                {[
                  { id: "overview", label: "Overview", icon: Activity },
                  { id: "pymes", label: "PYMEs", icon: Users },
                  { id: "analytics", label: "Analytics", icon: BarChart3 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? "text-white bg-white/5" 
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-40 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "pymes", label: "PYME Portfolio", icon: Users },
              { id: "analytics", label: "Risk Analytics", icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? "text-white border-white" 
                    : "text-white/50 border-transparent hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === "overview" && stats && (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <p className="text-white/40 text-sm font-mono mb-2">DASHBOARD OVERVIEW</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Welcome back, <span className="italic font-serif text-white/70">Banco del Sur</span>
              </h1>
              <p className="text-white/50">
                Here's what's happening with your PYME portfolio today.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total PYMEs", value: stats.totalPymes, change: "+12%", icon: Users },
                { label: "Portfolio Volume", value: `$${(stats.totalVolume / 1000000).toFixed(1)}M`, change: "+23%", icon: Wallet },
                { label: "Average Score", value: stats.avgScore, change: "Stable", icon: TrendingUp },
                { label: "Low Risk", value: stats.lowRisk, change: `of ${stats.totalPymes}`, icon: CheckCircle },
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-5 h-5 text-white/40" />
                    <span className="text-white/30 text-xs">{stat.change}</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Top PYMEs Section */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Top Performing PYMEs</h2>
                  <p className="text-white/50 text-sm">Highest volume businesses in your portfolio</p>
                </div>
                <button 
                  onClick={() => setActiveTab("pymes")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full transition-all border border-white/10"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/[0.02]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">Business</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">PACTO Score</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">Risk Level</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-white/40 uppercase">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pymes.slice(0, 5).map((pyme) => (
                      <tr key={pyme.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-white">{pyme.name}</p>
                            <p className="text-sm text-white/30 font-mono">{pyme.wallet}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-2xl font-bold ${getScoreColor(pyme.score)}`}>
                            {pyme.score}
                          </span>
                        </td>
                        <td className="px-6 py-4">{getRiskBadge(pyme.risk)}</td>
                        <td className="px-6 py-4 text-right">
                          <p className="font-medium text-white">${pyme.volume.toLocaleString()}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Export Report", desc: "Download portfolio analytics", icon: Download },
                { title: "New Assessment", desc: "Score a new business", icon: TrendingUp },
                { title: "API Documentation", desc: "Integrate with your systems", icon: Activity },
              ].map((action, idx) => (
                <button key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all text-left group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <action.icon className="w-5 h-5 text-white/60" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                  <p className="text-white/40 text-sm">{action.desc}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "pymes" && (
          <>
            <div className="mb-8">
              <p className="text-white/40 text-sm font-mono mb-2">PYME PORTFOLIO</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                All <span className="italic font-serif text-white/70">Businesses</span>
              </h1>
              <p className="text-white/50">
                Complete view of your PYME portfolio with PACTO Scores.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      placeholder="Search businesses..."
                      value={searchQuery}
                      maxLength={100}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all border border-white/10 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>
                    <button className="px-4 py-3 bg-white text-black text-sm font-medium rounded-xl hover:bg-white/90 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/[0.02]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">Business</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">Score</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/40 uppercase">Risk</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-white/40 uppercase">Volume</th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-white/40 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPymes.map((pyme) => (
                      <tr key={pyme.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-white">{pyme.name}</p>
                          <p className="text-sm text-white/30 font-mono">{pyme.wallet}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-2xl font-bold ${getScoreColor(pyme.score)}`}>
                            {pyme.score}
                          </span>
                        </td>
                        <td className="px-6 py-4">{getRiskBadge(pyme.risk)}</td>
                        <td className="px-6 py-4 text-right">
                          <p className="font-medium text-white">${pyme.volume.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            pyme.status === 'active' 
                              ? 'bg-white/10 text-white border border-white/20' 
                              : 'bg-white/5 text-white/60 border border-white/10'
                          }`}>
                            {pyme.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "analytics" && stats && (
          <>
            <div className="mb-8">
              <p className="text-white/40 text-sm font-mono mb-2">RISK ANALYTICS</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Portfolio <span className="italic font-serif text-white/70">Insights</span>
              </h1>
              <p className="text-white/50">
                Deep analytics on your PYME portfolio risk distribution.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Risk Distribution</h3>
                <div className="space-y-6">
                  {[
                    { label: "Low Risk", value: stats.lowRisk, total: stats.totalPymes },
                    { label: "Medium Risk", value: stats.mediumRisk, total: stats.totalPymes },
                    { label: "High Risk", value: stats.highRisk, total: stats.totalPymes },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white font-medium">{item.value} ({Math.round((item.value / item.total) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div className="h-full bg-white rounded-full transition-all" style={{width: `${(item.value / item.total) * 100}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Score Distribution</h3>
                <div className="flex items-end justify-between h-48 gap-4">
                  {[
                    { label: "500-600", value: pymes.filter(p => p.score >= 500 && p.score < 600).length },
                    { label: "600-700", value: pymes.filter(p => p.score >= 600 && p.score < 700).length },
                    { label: "700-800", value: pymes.filter(p => p.score >= 700 && p.score < 800).length },
                    { label: "800+", value: pymes.filter(p => p.score >= 800).length },
                  ].map((bar) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center">
                      <div className="text-white font-bold mb-2">{bar.value}</div>
                      <div 
                        className="w-full bg-white/20 rounded-t transition-all"
                        style={{height: `${Math.max(bar.value * 20, 8)}px`}}
                      ></div>
                      <p className="text-white/40 text-xs mt-2 text-center">{bar.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
