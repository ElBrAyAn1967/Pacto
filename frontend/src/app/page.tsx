'use client';

import { useState } from "react";
import { 
  Shield, ArrowRight, Zap, Globe, Lock, BarChart3, 
  ChevronRight, CheckCircle, Wallet, Building2, TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function Landing() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const stats = [
    { value: "$380B", label: "Unmet Credit Demand" },
    { value: "15M+", label: "PYMEs in LATAM" },
    { value: "65%", label: "Without Bank Access" },
    { value: "85%", label: "Loan Rejection Rate" },
  ];

  const features = [
    {
      icon: Shield,
      title: "On-Chain Reputation",
      description: "Immutable credit scores powered by Avalanche blockchain. Every transaction verified and stored permanently.",
    },
    {
      icon: Zap,
      title: "Real-Time Scoring",
      description: "Get instant PACTO scores with sub-second latency. Our algorithm analyzes 50+ data points instantly.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Zero-knowledge proofs ensure sensitive data stays private while maintaining complete auditability.",
    },
    {
      icon: Globe,
      title: "Cross-Border Ready",
      description: "Unified reputation across borders. A PYME's score in Mexico is valid in Colombia, Chile, and beyond.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Connect",
      description: "Integrate PACTO API in minutes with our developer-friendly documentation and SDKs.",
    },
    {
      step: "02",
      title: "Analyze",
      description: "Query any wallet address to get instant PACTO Score, risk assessment, and credit recommendations.",
    },
    {
      step: "03",
      title: "Lend",
      description: "Make data-driven lending decisions with confidence. Reduce default rates by up to 40%.",
    },
  ];

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">PACTO</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-text-secondary hover:text-white transition-colors text-sm">
                Features
              </Link>
              <Link href="#how-it-works" className="text-text-secondary hover:text-white transition-colors text-sm">
                How it Works
              </Link>
              <Link href="#api" className="text-text-secondary hover:text-white transition-colors text-sm">
                API
              </Link>
              <Link href="/institution/demo" className="core-btn text-sm">
                Launch Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="absolute inset-0 bg-hero-glow" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-muted border border-primary/20 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-medium">Now on Avalanche Fuji Testnet</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              See What Banks Miss.{" "}
              <span className="gradient-text">Lend with Confidence.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              65% of PYMEs in LATAM are financially invisible. PACTO turns their real 
              commercial reputation into bankable credit scores—powered by Avalanche.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/institution/demo" className="core-btn text-lg px-8 py-4">
                Try Demo Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="core-btn-secondary text-lg px-8 py-4">
                View Documentation
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="core-card p-6 text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for Modern Finance
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Enterprise-grade infrastructure that scales with your lending operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="core-card-elevated p-8 group cursor-pointer"
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  hoveredFeature === idx ? 'bg-primary' : 'bg-primary-muted'
                }`}>
                  <feature.icon className={`w-7 h-7 transition-colors ${
                    hoveredFeature === idx ? 'text-black' : 'text-primary'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Three Steps to Smarter Lending
            </h2>
            <p className="text-text-secondary text-lg">
              From integration to first loan decision in under 30 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-surface-elevated mb-4">{step.step}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                    <ChevronRight className="w-8 h-8 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Preview */}
      <section id="api" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Simple, Powerful API
              </h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                RESTful endpoints designed for developer productivity. Get started with just a few lines of code.
              </p>
              
              <div className="space-y-4">
                {[
                  "Sub-100ms response times",
                  "99.9% uptime SLA",
                  "Real-time webhooks",
                  "Comprehensive SDKs",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="core-card p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-text-muted">example.js</span>
              </div>
              <pre className="text-text-secondary overflow-x-auto">
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
//   recommendedCredit: 180000,
//   recommendedRate: 0.18
// }`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="core-card-elevated p-12 glow-card">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Lending?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Join leading financial institutions using PACTO to expand their portfolios 
              into the $380B untapped PYME market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/institution/demo" className="core-btn text-lg px-8 py-4">
                Launch Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="core-btn-secondary text-lg px-8 py-4">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-bold text-white">PACTO</span>
            </div>
            
            <div className="flex items-center gap-6 text-text-secondary text-sm">
              <span>Powered by Avalanche</span>
              <span className="text-border">|</span>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="https://testnet.snowtrace.io/" className="hover:text-white transition-colors">
                Snowtrace
              </Link>
            </div>
            
            <div className="text-text-muted text-sm">
              © 2026 PACTO. Built for Avalanche x CLP Hackathon.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
