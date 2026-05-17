'use client';

import { useState } from "react";
import { Building2, Users, TrendingUp, Shield, ArrowRight, CheckCircle, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-avalanche-red">PACTO</span>
              <span className="ml-3 text-sm text-slate-500 hidden sm:block border-l border-slate-300 pl-3">
                Infrastructure for Financial Institutions
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#features" className="text-slate-600 hover:text-slate-900 hidden md:block">
                Features
              </Link>
              <Link href="#api" className="text-slate-600 hover:text-slate-900 hidden md:block">
                API
              </Link>
              <Link 
                href="/institution/login"
                className="px-5 py-2 bg-avalanche-red text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Institution Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-avalanche-red/10 text-avalanche-red text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                <span>White-Label Reputation Infrastructure</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Lend to the <span className="text-avalanche-red">invisible</span> economy
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                PACTO enables banks, fintechs, and lenders to assess creditworthiness 
                of "invisible" PYMEs using alternative data and blockchain-verified 
                reputation scores.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/institution/demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  See Demo Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="#api"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  API Documentation
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-500">PACTO Score</p>
                    <p className="text-3xl font-bold text-slate-900">847/1000</p>
                  </div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Validation Rate</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">12-Month Volume</span>
                    <span className="font-semibold">$1.2M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Recommended Credit</span>
                    <span className="font-semibold text-green-600">$180,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-avalanche-red mb-2">$380B</div>
              <div className="text-slate-400">Unmet Credit Demand</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-avalanche-red mb-2">15M+</div>
              <div className="text-slate-400">PYMEs in LATAM</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-avalanche-red mb-2">65%</div>
              <div className="text-slate-400">Without Bank Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-avalanche-red mb-2">85%</div>
              <div className="text-slate-400">Loan Rejection Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How PACTO Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to assess creditworthiness of previously invisible businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-avalanche-red rounded-lg flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Integrate</h3>
              <p className="text-slate-600">
                Connect PACTO to your existing systems via our REST API or use our 
                white-label dashboard with your branding.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-avalanche-red rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Analyze</h3>
              <p className="text-slate-600">
                Our algorithm analyzes verified commercial transactions on-chain to 
                generate a PACTO Score (0-1000) and risk assessment.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-avalanche-red rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Lend</h3>
              <p className="text-slate-600">
                Make informed lending decisions with data you can trust. 
                Recommended credit limits and interest rates included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Simple REST API
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Integrate PACTO reputation scoring into your existing lending workflow 
                with just a few API calls.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Check Reputation</p>
                    <p className="text-slate-600">GET /api/v1/reputation/:wallet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Batch Processing</p>
                    <p className="text-slate-600">POST /api/v1/reputation/batch</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Real-time Webhooks</p>
                    <p className="text-slate-600">Instant notifications on score changes</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm text-green-400 overflow-x-auto">
                <code>{`// Request
POST /api/v1/reputation/check
Headers: {
  "Authorization": "Bearer sk_live_xxx",
  "Content-Type": "application/json"
}
Body: {
  "wallet": "0x742d35Cc6634C..."
}

// Response
{
  "wallet": "0x742d35Cc6634C...",
  "pacto_score": 847,
  "risk_level": "low",
  "recommended_credit": 180000,
  "recommended_rate": 0.18,
  "metrics": {
    "total_transactions": 47,
    "validated_rate": 0.94,
    "volume_12m": 1200000,
    "avg_transaction": 25532
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Ready to lend to the invisible economy?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join leading financial institutions using PACTO to expand their 
            lending portfolios with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/institution/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Try Demo Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="https://github.com/ElBrAyAn1967/Pacto"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-avalanche-red">PACTO</span>
              <span className="ml-3 text-sm text-slate-400">Avalanche x CLP Hackathon 2025</span>
            </div>
            <div className="flex gap-6 text-slate-400">
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="https://testnet.snowtrace.io/" className="hover:text-white transition-colors">
                Snowtrace
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
