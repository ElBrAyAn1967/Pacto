'use client';

import { useState, useEffect } from "react";
import { 
  Users, TrendingUp, Wallet, Search, Filter, ArrowRight,
  CheckCircle, AlertCircle, Activity, BarChart3, PieChart,
  Shield, Loader2, ChevronDown, ExternalLink
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
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Input validation: max 100 chars to prevent ReDoS
  const MAX_SEARCH_LENGTH = 100;
  const sanitizedQuery = searchQuery.slice(0, MAX_SEARCH_LENGTH);
  
  const filteredPymes = pymes.filter(p => 
    p.name.toLowerCase().includes(sanitizedQuery.toLowerCase()) ||
    p.wallet.toLowerCase().includes(sanitizedQuery.toLowerCase())
  );

  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case "low": return <span className="badge-success">Low Risk</span>;
      case "medium": return <span className="badge-warning">Medium Risk</span>;
      case "high": return <span className="badge-error">High Risk</span>;
      default: return <span className="px-2 py-1 bg-surface-elevated text-text-secondary text-xs rounded-full">{risk}</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-[#22c55e]";
    if (score >= 600) return "text-[#f59e0b]";
    return "text-[#ef4444]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 core-card max-w-md">
          <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
          <p className="text-error font-medium mb-2">Error loading dashboard</p>
          <p className="text-text-secondary text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="core-btn mt-6"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white">PACTO</span>
              </Link>
              <div className="h-6 w-px bg-border mx-2" />
              <div className="flex items-center gap-2 text-text-secondary">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">Banco del Sur</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20">
                <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                <span className="text-[#22c55e] text-sm font-medium">API Connected</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-semibold">
                BS
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "pymes", label: "PYMEs", icon: Users },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 font-medium text-sm transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? "text-primary border-primary" 
                    : "text-text-secondary border-transparent hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="core-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Total PYMEs</p>
                    <p className="text-3xl font-bold text-white">{stats.totalPymes}</p>
                    <p className="text-[#22c55e] text-sm mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +12% this month
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>

              <div className="core-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Total Volume (12M)</p>
                    <p className="text-3xl font-bold text-white">${(stats.totalVolume / 1000000).toFixed(1)}M</p>
                    <p className="text-[#22c55e] text-sm mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +23% vs last period
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-[#22c55e]" />
                  </div>
                </div>
              </div>

              <div className="core-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Avg PACTO Score</p>
                    <p className="text-3xl font-bold text-white">{stats.avgScore}</p>
                    <p className="text-text-secondary text-sm mt-1">Stable</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </div>

              <div className="core-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Low Risk PYMEs</p>
                    <p className="text-3xl font-bold text-white">{stats.lowRisk}</p>
                    <p className="text-text-secondary text-sm mt-1">of {stats.totalPymes} total</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                  </div>
                </div>
              </div>
            </div>

            {/* PYMEs Table */}
            <div className="core-card overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Top PYMEs by Volume</h2>
                <button 
                  onClick={() => setActiveTab("pymes")}
                  className="text-primary hover:text-primary-hover text-sm font-medium flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase">PYME</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase">Score</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase">Risk</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pymes.slice(0, 5).map((pyme) => (
                      <tr key={pyme.id} className="hover:bg-surface-elevated/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-white">{pyme.name}</p>
                            <p className="text-sm text-text-muted font-mono">{pyme.wallet}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-2xl font-bold ${getScoreColor(pyme.score)}`}>
                            {pyme.score}
                          </span>
                        </td>
                        <td className="px-6 py-4">{getRiskBadge(pyme.risk)}</td>
                        <td className="px-6 py-4 text-right font-medium text-white">
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
          <div className="core-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-white">All PYMEs</h2>
                <div className="flex gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search PYMEs..."
                      value={searchQuery}
                      maxLength={100}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="core-input pl-10 w-full sm:w-64"
                    />
                  </div>
                  <button className="core-btn-secondary">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase">PYME</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase">Wallet</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase">Score</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase">Risk</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase">Volume</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-text-secondary uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPymes.map((pyme) => (
                    <tr key={pyme.id} className="hover:bg-surface-elevated/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{pyme.name}</td>
                      <td className="px-6 py-4 text-text-muted font-mono text-sm">{pyme.wallet}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xl font-bold ${getScoreColor(pyme.score)}`}>
                          {pyme.score}
                        </span>
                      </td>
                      <td className="px-6 py-4">{getRiskBadge(pyme.risk)}</td>
                      <td className="px-6 py-4 text-right font-medium text-white">
                        ${pyme.volume.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          pyme.status === "active" 
                            ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20" 
                            : "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20"
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
        )}

        {activeTab === "analytics" && stats && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="core-card p-6">
              <h3 className="text-lg font-bold text-white mb-6">Risk Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: "Low Risk", value: stats.lowRisk, total: stats.totalPymes, color: "bg-[#22c55e]" },
                  { label: "Medium Risk", value: stats.mediumRisk, total: stats.totalPymes, color: "bg-[#f59e0b]" },
                  { label: "High Risk", value: stats.highRisk, total: stats.totalPymes, color: "bg-[#ef4444]" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className="text-white font-medium">{item.value} ({Math.round((item.value / item.total) * 100)}%)</span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{width: `${(item.value / item.total) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="core-card p-6">
              <h3 className="text-lg font-bold text-white mb-6">Score Distribution</h3>
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
                      className="w-full bg-gradient-to-t from-primary to-primary-hover rounded-t-lg transition-all duration-500"
                      style={{height: `${bar.value * 40}px`}}
                    ></div>
                    <p className="text-text-secondary text-xs mt-2">{bar.label}</p>
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
