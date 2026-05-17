'use client';

import { Shield, ArrowRight, Zap, Globe, Lock, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  const features = [
    {
      icon: Shield,
      title: "On-Chain Reputation",
      description: "Immutable credit scores powered by Avalanche. Every transaction verified and stored permanently.",
      gradient: true,
    },
    {
      icon: Zap,
      title: "Real-Time Scoring",
      description: "Get instant PACTO scores with sub-second latency. Our algorithm analyzes 50+ data points instantly.",
      gradient: false,
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Zero-knowledge proofs ensure sensitive data stays private while maintaining complete auditability.",
      gradient: false,
    },
    {
      icon: Globe,
      title: "Cross-Border Ready",
      description: "Unified reputation across borders. A PYME's score in Mexico is valid in Colombia, Chile, and beyond.",
      gradient: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0C0C0E]">
      {/* Navigation */}
      <nav className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#E84142] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">PACTO</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="#features" className="nav-item">
                Features
              </Link>
              <Link href="#how-it-works" className="nav-item">
                How it Works
              </Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="nav-item">
                GitHub
              </Link>
            </div>

            <Link href="/institution/demo" className="core-btn text-sm">
              Launch Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E84142]/10 border border-[#E84142]/20 mb-8">
              <div className="w-1.5 h-1.5 bg-[#E84142] rounded-full animate-pulse" />
              <span className="text-[#E84142] text-sm font-medium">Avalanche CLP 2025</span>
            </div>

            {/* Headline */}
            <h1 className="section-title mb-6">
              See What Banks Miss.{" "}
              <span className="text-gradient">Lend with Confidence.</span>
            </h1>

            {/* Subheadline */}
            <p className="section-subtitle text-lg mb-10 max-w-xl leading-relaxed">
              65% of PYMEs in LATAM are financially invisible. PACTO turns their real 
              commercial reputation into bankable credit scores.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/institution/demo" className="core-btn">
                Try Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="core-btn-secondary">
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "$380B", label: "Unmet Credit Demand" },
              { value: "15M+", label: "PYMEs in LATAM" },
              { value: "65%", label: "Without Bank Access" },
              { value: "85%", label: "Loan Rejection Rate" },
            ].map((stat, idx) => (
              <div key={idx} className="core-card p-6">
                <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[#8E8E93] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-title mb-3">Built for Modern Finance</h2>
            <p className="section-subtitle">
              Enterprise-grade infrastructure that scales with your lending operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={feature.gradient ? "core-card-gradient p-6" : "core-card p-6"}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                  feature.gradient ? 'bg-white/10' : 'bg-[#24242A]'
                }`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#8E8E93] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-title mb-3">Three Steps to Smarter Lending</h2>
            <p className="section-subtitle">
              From integration to first loan decision in under 30 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Connect", description: "Integrate PACTO API in minutes with our developer-friendly documentation." },
              { step: "02", title: "Analyze", description: "Query any wallet to get instant PACTO Score and risk assessment." },
              { step: "03", title: "Lend", description: "Make data-driven decisions with confidence. Reduce default rates by 40%." },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl font-bold text-[#1C1C21] mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#8E8E93] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Preview */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-4">Simple, Powerful API</h2>
              <p className="section-subtitle mb-8">
                RESTful endpoints designed for developer productivity. Get started with just a few lines of code.
              </p>
              
              <div className="space-y-3">
                {[
                  "Sub-100ms response times",
                  "99.9% uptime SLA",
                  "Real-time webhooks",
                  "Comprehensive SDKs",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[#E84142]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E84142]" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="core-card p-5 font-mono text-xs overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-white/[0.06] pb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFC542]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3DD598]" />
                <span className="ml-3 text-[#636366]">example.js</span>
              </div>
              <pre className="text-[#8E8E93] overflow-x-auto leading-relaxed">
{`// Get PACTO Score
const response = await fetch(
  'https://api.pacto.io/v1/reputation/0x742d...',
  {
    headers: {
      'Authorization': 'Bearer sk_live_xxx'
    }
  }
);

const { data } = await response.json();

console.log(data);
// {
//   wallet: "0x742d...",
//   pactoScore: 847,
//   riskLevel: "low",
//   recommendedCredit: 180000
// }`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="core-card-elevated p-12">
            <h2 className="section-title mb-4">Ready to Transform Your Lending?</h2>
            <p className="section-subtitle mb-8">
              Join leading financial institutions using PACTO to expand their portfolios 
              into the $380B untapped PYME market.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/institution/demo" className="core-btn">
                Launch Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="core-btn-secondary">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#E84142] rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PACTO</span>
            </div>
            
            <div className="flex items-center gap-6 text-[#8E8E93] text-sm">
              <span>Powered by Avalanche</span>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="https://testnet.snowtrace.io/" className="hover:text-white transition-colors">
                Snowtrace
              </Link>
            </div>
            
            <div className="text-[#636366] text-sm">
              © 2026 PACTO
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
