'use client';

import { useState } from "react";
import { 
  Building2, Users, TrendingUp, DollarSign, Search, Filter, 
  Download, ArrowUpRight, ArrowDownRight, MoreHorizontal, CheckCircle,
  Clock, AlertCircle, CreditCard, BarChart3, PieChart, Activity
} from "lucide-react";
import Link from "next/link";

// Mock data for demo
const mockPymes = [
  { id: 1, name: "Distribuidora López S.A.", wallet: "0x742d...Cc66", score: 847, risk: "low", volume: 1200000, transactions: 47, status: "active" },
  { id: 2, name: "Comercial García", wallet: "0x891a...23Bb", score: 723, risk: "low", volume: 850000, transactions: 32, status: "active" },
  { id: 3, name: "Importadora Martínez", wallet: "0x123b...45Aa", score: 654, risk: "medium", volume: 650000, transactions: 28, status: "pending" },
  { id: 4, name: "Servicios Técnicos Ruiz", wallet: "0x456c...78Dd", score: 589, risk: "medium", volume: 420000, transactions: 19, status: "active" },
  { id: 5, name: "Construcciones Hernández", wallet: "0x789d...90Ee", score: 912, risk: "low", volume: 2100000, transactions: 89, status: "active" },
];

const mockTransactions = [
  { id: 1, pyme: "Distribuidora López S.A.", amount: 25000, type: "sale", status: "validated", date: "2026-05-15", counterparty: "Agrícola del Norte" },
  { id: 2, pyme: "Comercial García", amount: 18000, type: "purchase", status: "pending", date: "2026-05-14", counterparty: "Mayoreo Central" },
  { id: 3, pyme: "Importadora Martínez", amount: 45000, type: "sale", status: "validated", date: "2026-05-13", counterparty: "Distribuidora Sur" },
  { id: 4, pyme: "Servicios Técnicos Ruiz", amount: 8500, type: "service", status: "validated", date: "2026-05-12", counterparty: "Industrias Unidas" },
];

export default function InstitutionDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPymes = mockPymes.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.wallet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalPymes: mockPymes.length,
    activePymes: mockPymes.filter(p => p.status === "active").length,
    totalVolume: mockPymes.reduce((acc, p) => acc + p.volume, 0),
    avgScore: Math.round(mockPymes.reduce((acc, p) => acc + p.score, 0) / mockPymes.length),
    totalTransactions: mockPymes.reduce((acc, p) => acc + p.transactions, 0),
    lowRisk: mockPymes.filter(p => p.risk === "low").length,
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "low": return "bg-green-100 text-green-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "high": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    if (score >= 600) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-avalanche-red">PACTO</Link>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-400" />
                <span className="font-medium text-slate-700">Banco del Sur</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <AlertCircle className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-avalanche-red rounded-full flex items-center justify-center text-white font-medium">
                BS
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "pymes", label: "PYMEs", icon: Users },
              { id: "transactions", label: "Transactions", icon: CreditCard },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id 
                    ? "border-avalanche-red text-avalanche-red" 
                    : "border-transparent text-slate-600 hover:text-slate-900"
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
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total PYMEs</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalPymes}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3" />
                      +12% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Volume (12M)</p>
                    <p className="text-2xl font-bold text-slate-900">${(stats.totalVolume / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3" />
                      +23% vs last period
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Avg PACTO Score</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.avgScore}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      Stable
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <PieChart className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Low Risk PYMEs</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.lowRisk}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      of {stats.totalPymes} total
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* PYMEs Table */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900">Top PYMEs by Volume</h2>
                    <Link href="#" className="text-avalanche-red hover:underline text-sm">
                      View all
                    </Link>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">PYME</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Risk</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Volume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {mockPymes.slice(0, 5).map((pyme) => (
                        <tr key={pyme.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-slate-900">{pyme.name}</p>
                              <p className="text-sm text-slate-500 font-mono">{pyme.wallet}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-bold ${getScoreColor(pyme.score)}`}>
                              {pyme.score}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getRiskColor(pyme.risk)}`}>
                              {pyme.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium">
                            ${pyme.volume.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mockTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          tx.status === "validated" ? "bg-green-100" : "bg-yellow-100"
                        }`}>
                          {tx.status === "validated" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 text-sm">{tx.pyme}</p>
                          <p className="text-xs text-slate-500">{tx.type} • {tx.date}</p>
                        </div>
                        <p className="font-medium text-slate-900">${tx.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="#" className="block text-center text-avalanche-red hover:underline text-sm mt-6">
                    View all transactions
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "pymes" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-slate-900">All PYMEs</h2>
                <div className="flex gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search PYMEs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none w-full sm:w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">PYME</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Wallet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">PACTO Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Risk</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Volume</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredPymes.map((pyme) => (
                    <tr key={pyme.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{pyme.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-500 font-mono">{pyme.wallet}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${getScoreColor(pyme.score)}`}>
                          {pyme.score}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getRiskColor(pyme.risk)}`}>
                          {pyme.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        ${pyme.volume.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          pyme.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {pyme.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <MoreHorizontal className="w-5 h-5 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Transaction History</h2>
            <p className="text-slate-600">View and manage all transactions from your onboarded PYMEs.</p>
            
            <div className="mt-6 space-y-4">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.status === "validated" ? "bg-green-100" : "bg-yellow-100"
                    }`}>
                      {tx.status === "validated" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{tx.pyme}</p>
                      <p className="text-sm text-slate-500">{tx.type} with {tx.counterparty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${tx.amount.toLocaleString()}</p>
                    <p className="text-sm text-slate-500">{tx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Risk Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Low Risk</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Medium Risk</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">High Risk</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Score Distribution</h3>
              <div className="flex items-end justify-between h-40 gap-2">
                {[
                  { label: "500-600", value: 20 },
                  { label: "600-700", value: 35 },
                  { label: "700-800", value: 30 },
                  { label: "800+", value: 15 },
                ].map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-avalanche-red rounded-t"
                      style={{height: `${bar.value * 2}px`}}
                    ></div>
                    <p className="text-xs text-slate-500 mt-2 text-center">{bar.label}</p>
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
