'use client';

import { useState, useEffect } from "react";
import { 
  Users, TrendingUp, Wallet, Search, Filter, ArrowRight,
  CheckCircle, AlertCircle, Activity, BarChart3, PieChart,
  Shield, Loader2, Menu, X
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

  // Mock data for demo purposes when backend is not available
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
      case "low": return <span className="badge-green text-xs">Low Risk</span>;
      case "medium": return <span className="badge-yellow text-xs">Medium</span>;
      case "high": return <span className="badge-red text-xs">High Risk</span>;
      default: return <span className="text-[#71717A] text-xs">{risk}</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-[#3DD598]";
    if (score >= 600) return "text-[#FFC542]";
    return "text-[#FF6B6B]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-3" />
          <p className="text-[#71717A] text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && pymes.length === 0 && !stats) {
    return (
      <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center">
        <div className="text-center p-8 bg-[#18181B] rounded-lg border border-[#27272A] max-w-md mx-4">
          <AlertCircle className="w-12 h-12 text-[#FF6B6B] mx-auto mb-4" />
          <p className="text-white font-medium mb-2">Error loading dashboard</p>
          <p className="text-[#71717A] text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn mt-6"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Header */}
      <header className="border-b border-[#27272A] sticky top-0 z-50 bg-[#0F0F10]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <Shield className="w-4 h-4 text-black" />
                </div>
                <span className="text-white font-semibold text-sm">PACTO</span>
              </Link>
              <div className="hidden sm:block h-4 w-px bg-[#27272A]" />
              <div className="hidden sm:flex items-center gap-2 text-[#71717A]">
                <Wallet className="w-4 h-4" />
                <span className="text-xs">Banco del Sur</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DD598]/10 border border-[#3DD598]/20">
                <div className="w-1.5 h-1.5 bg-[#3DD598] rounded-full animate-pulse" />
                <span className="text-[#3DD598] text-xs font-medium">Demo Mode</span>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-[#A1A1AA] hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#27272A]">
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
                        ? "text-white bg-[#18181B]" 
                        : "text-[#71717A] hover:text-white"
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
      <nav className="hidden md:block border-b border-[#27272A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "pymes", label: "PYMEs", icon: Users },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? "text-white border-white" 
                    : "text-[#71717A] border-transparent hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "overview" && stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#27272A] rounded-lg overflow-hidden mb-6">
              <div className="bg-[#0F0F10] p-4 sm:p-5">
                <p className="text-small mb-1">Total PYMEs</p>
                <p className="text-xl sm:text-2xl font-semibold text-white">{stats.totalPymes}</p>
                <p className="text-[#3DD598] text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12%
                </p>
              </div>

              <div className="bg-[#0F0F10] p-4 sm:p-5">
                <p className="text-small mb-1">Total Volume</p>
                <p className="text-xl sm:text-2xl font-semibold text-white">${(stats.totalVolume / 1000000).toFixed(1)}M</p>
                <p className="text-[#3DD598] text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +23%
                </p>
              </div>

              <div className="bg-[#0F0F10] p-4 sm:p-5">
                <p className="text-small mb-1">Avg Score</p>
                <p className="text-xl sm:text-2xl font-semibold text-white">{stats.avgScore}</p>
                <p className="text-[#71717A] text-xs mt-1">Stable</p>
              </div>

              <div className="bg-[#0F0F10] p-4 sm:p-5">
                <p className="text-small mb-1">Low Risk</p>
                <p className="text-xl sm:text-2xl font-semibold text-white">{stats.lowRisk}</p>
                <p className="text-[#71717A] text-xs mt-1">of {stats.totalPymes}</p>
              </div>
            </div>

            {/* PYMEs Table */}
            <div className="card overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-[#27272A] flex justify-between items-center">
                <h2 className="title-md text-base">Top PYMEs by Volume</h2>
                <button 
                  onClick={() => setActiveTab("pymes")}
                  className="text-white hover:underline text-xs sm:text-sm flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead className="bg-[#18181B]">
                    <tr>
                      <th className="px-4 sm:px-5 py-3 text-left text-xs font-medium text-[#71717A] uppercase">PYME</th>
                      <th className="px-4 sm:px-5 py-3 text-left text-xs font-medium text-[#71717A] uppercase">Score</th>
                      <th className="px-4 sm:px-5 py-3 text-left text-xs font-medium text-[#71717A] uppercase">Risk</th>
                      <th className="px-4 sm:px-5 py-3 text-right text-xs font-medium text-[#71717A] uppercase">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272A]">
                    {pymes.slice(0, 5).map((pyme) => (
                      <tr key={pyme.id} className="hover:bg-[#18181B]/50 transition-colors">
                        <td className="px-4 sm:px-5 py-3">
                          <div>
                            <p className="font-medium text-white text-sm">{pyme.name}</p>
                            <p className="text-xs text-[#71717A] font-mono">{pyme.wallet}</p>
                          </div>
                        </td>
                        <td className="px-4 sm:px-5 py-3">
                          <span className={`text-lg sm:text-xl font-semibold ${getScoreColor(pyme.score)}`}>
                            {pyme.score}
                          </span>
                        </td>
                        <td className="px-4 sm:px-5 py-3">{getRiskBadge(pyme.risk)}</td>
                        <td className="px-4 sm:px-5 py-3 text-right font-medium text-white text-sm">
                          ${pyme.volume.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "pymes" && (
          <div className="card overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#27272A]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="title-md text-base">All PYMEs</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      maxLength={100}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-9 w-full sm:w-48 text-sm"
                    />
                  </div>
                  <button className="btn-secondary px-3">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-[#18181B]">
                  <tr>
                    <th className="px-4 sm:px-5 py-3 text-left text-xs font-medium text-[#71717A] uppercase">PYME</th>
                    <th className="px-4 sm:px-5 py-3 text-left text-xs font-medium text-[#71717A] uppercase">Score</th>
                    <th className="px-4 sm:px-5 py-3 text-left text-xs font-medium text-[#71717A] uppercase">Risk</th>
                    <th className="px-4 sm:px-5 py-3 text-right text-xs font-medium text-[#71717A] uppercase">Volume</th>
                    <th className="px-4 sm:px-5 py-3 text-center text-xs font-medium text-[#71717A] uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A]">
                  {filteredPymes.map((pyme) => (
                    <tr key={pyme.id} className="hover:bg-[#18181B]/50 transition-colors">
                      <td className="px-4 sm:px-5 py-3">
                        <p className="font-medium text-white text-sm">{pyme.name}</p>
                        <p className="text-xs text-[#71717A] font-mono">{pyme.wallet}</p>
                      </td>
                      <td className="px-4 sm:px-5 py-3">
                        <span className={`text-lg font-semibold ${getScoreColor(pyme.score)}`}>
                          {pyme.score}
                        </span>
                      </td>
                      <td className="px-4 sm:px-5 py-3">{getRiskBadge(pyme.risk)}</td>
                      <td className="px-4 sm:px-5 py-3 text-right font-medium text-white text-sm">
                        ${pyme.volume.toLocaleString()}
                      </td>
                      <td className="px-4 sm:px-5 py-3 text-center">
                        <span className={`badge-${pyme.status === 'active' ? 'green' : 'yellow'} text-xs`}>
                          {pyme.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && stats && (
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="card p-5 sm:p-6">
              <h3 className="title-md mb-5 text-base">Risk Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: "Low Risk", value: stats.lowRisk, total: stats.totalPymes, color: "bg-[#3DD598]" },
                  { label: "Medium Risk", value: stats.mediumRisk, total: stats.totalPymes, color: "bg-[#FFC542]" },
                  { label: "High Risk", value: stats.highRisk, total: stats.totalPymes, color: "bg-[#FF6B6B]" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#71717A] text-xs">{item.label}</span>
                      <span className="text-white text-xs font-medium">{item.value} ({Math.round((item.value / item.total) * 100)}%)</span>
                    </div>
                    <div className="w-full bg-[#18181B] rounded-full h-1.5">
                      <div className={`${item.color} h-1.5 rounded-full`} style={{width: `${(item.value / item.total) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5 sm:p-6">
              <h3 className="title-md mb-5 text-base">Score Distribution</h3>
              <div className="flex items-end justify-between h-40 gap-2 sm:gap-3">
                {[
                  { label: "500-600", value: pymes.filter(p => p.score >= 500 && p.score < 600).length },
                  { label: "600-700", value: pymes.filter(p => p.score >= 600 && p.score < 700).length },
                  { label: "700-800", value: pymes.filter(p => p.score >= 700 && p.score < 800).length },
                  { label: "800+", value: pymes.filter(p => p.score >= 800).length },
                ].map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center">
                    <div className="text-white font-semibold mb-1 text-sm">{bar.value}</div>
                    <div 
                      className="w-full bg-white rounded-t transition-all"
                      style={{height: `${Math.max(bar.value * 10, 4)}px`}}
                    ></div>
                    <p className="text-[#71717A] text-xs mt-2 text-center">{bar.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
