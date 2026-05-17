'use client';

import Link from "next/link";
import { Shield, ArrowRight, Menu, X, Globe, Network, Zap, Check, ChevronRight, BarChart3, Lock, Users, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0B] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-black" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">PACTO</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#problem" className="text-white/60 hover:text-white text-sm transition-colors">Problem</Link>
              <Link href="#solution" className="text-white/60 hover:text-white text-sm transition-colors">Solution</Link>
              <Link href="#technology" className="text-white/60 hover:text-white text-sm transition-colors">Technology</Link>
              <Link href="#traction" className="text-white/60 hover:text-white text-sm transition-colors">Traction</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/institution/demo" 
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-white/90 text-black text-sm font-medium rounded-full transition-all"
              >
                Try Platform
                <ArrowRight className="w-4 h-4" />
              </Link>
              
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
              <div className="flex flex-col gap-4">
                <Link href="#problem" className="text-white/60 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Problem</Link>
                <Link href="#solution" className="text-white/60 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Solution</Link>
                <Link href="#technology" className="text-white/60 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Technology</Link>
                <Link href="#traction" className="text-white/60 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Traction</Link>
                <Link href="/institution/demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full w-fit" onClick={() => setMobileMenuOpen(false)}>
                  Try Platform
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className={`max-w-2xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white/70 text-sm">Now on Avalanche</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                The credit scoring{' '}
                <span className="italic font-serif text-white/80">infrastructure</span>{' '}
                for LATAM's invisible economy
              </h1>

              <p className="text-lg sm:text-xl text-white/50 mb-8 max-w-lg leading-relaxed">
                PACTO enables banks and fintechs to assess creditworthiness of 15M+ financially invisible PYMEs using on-chain reputation and alternative data.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/institution/demo" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-full transition-all text-base"
                >
                  Explore Platform
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="#solution" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white/60 hover:text-white font-medium transition-colors text-base"
                >
                  See How It Works
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-8">
                {[
                  { value: "$380B", label: "Credit Gap" },
                  { value: "15M+", label: "PYMEs" },
                  { value: "40%", label: "Risk Reduction" },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/40 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className={`relative h-[400px] sm:h-[500px] lg:h-[600px] transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
                  <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute inset-8 border border-white/20 rounded-full" />
                  <div className="absolute inset-16 rounded-full bg-white/5 blur-xl" />
                  <div className="absolute inset-24 rounded-full bg-[#0A0A0B] border border-white/30 flex items-center justify-center">
                    <Globe className="w-16 h-16 sm:w-20 sm:h-20 text-white/60" />
                  </div>

                  {[
                    { angle: 0, icon: Network },
                    { angle: 90, icon: Zap },
                    { angle: 180, icon: Shield },
                    { angle: 270, icon: BarChart3 },
                  ].map((node, idx) => (
                    <div
                      key={idx}
                      className="absolute w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 border border-white/20"
                      style={{
                        top: `${50 + 45 * Math.sin((node.angle * Math.PI) / 180)}%`,
                        left: `${50 + 45 * Math.cos((node.angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <node.icon className="w-6 h-6 text-white/70" />
                    </div>
                  ))}

                  <svg className="absolute inset-0 w-full h-full">
                    <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="50%" y2="95%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="50%" y2="5%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-white/40 text-sm font-mono mb-4">THE PROBLEM</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                65% of LATAM PYMEs are{' '}
                <span className="italic font-serif text-white/70">financially invisible</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Traditional banking relies on credit history, collateral, and formal documentation. 
                Most small businesses in LATAM operate in cash, lack credit history, and are excluded from the formal financial system.
              </p>
              
              <div className="space-y-4">
                {[
                  "No credit history = automatic loan rejection",
                  "85% of PYME loan applications are denied",
                  "$380B in unmet credit demand across the region",
                  "Average loan approval takes 3-6 months",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white/50 text-xs">×</span>
                    </div>
                    <p className="text-white/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "15M+", label: "PYMEs excluded", sub: "from banking" },
                { value: "$380B", label: "Credit gap", sub: "in LATAM" },
                { value: "85%", label: "Rejection rate", sub: "for PYME loans" },
                { value: "6mo", label: "Avg approval", sub: "traditional banks" },
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-white/70 font-medium">{stat.label}</p>
                  <p className="text-white/40 text-sm">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-white/40 text-sm font-mono mb-4">OUR SOLUTION</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Turn commercial reputation into{' '}
              <span className="italic font-serif text-white/70">bankable credit scores</span>
            </h2>
            <p className="text-white/50 text-lg">
              PACTO analyzes alternative data—supplier relationships, transaction history, on-chain activity—to generate instant credit assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Connect", 
                desc: "Banks integrate PACTO via API. Query any business wallet or identifier for instant credit assessment.",
                icon: Network,
                time: "5 min integration"
              },
              { 
                step: "02", 
                title: "Analyze", 
                desc: "Our algorithm processes 50+ signals: transaction history, supplier networks, on-chain reputation, and behavioral patterns.",
                icon: BarChart3,
                time: "<100ms response"
              },
              { 
                step: "03", 
                title: "Decide", 
                desc: "Receive PACTO Score (0-1000), risk classification, recommended credit limit, and optimal interest rate.",
                icon: Check,
                time: "Instant decision"
              },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white/70" />
                </div>
                <p className="text-white/30 text-sm font-mono mb-2">{item.step}</p>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed mb-4">{item.desc}</p>
                <p className="text-white/30 text-sm">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-white/40 text-sm font-mono mb-4">TECHNOLOGY</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Built on{' '}
                <span className="italic font-serif text-white/70">Avalanche</span>{' '}
                for scale and trust
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Every credit assessment is anchored on-chain. Immutable reputation scores, 
                transparent algorithms, and cross-border interoperability.
              </p>

              <div className="space-y-6">
                {[
                  { 
                    icon: Lock, 
                    title: "Immutable Reputation",
                    desc: "Credit scores stored on-chain. Tamper-proof history."
                  },
                  { 
                    icon: Zap, 
                    title: "Sub-second Finality",
                    desc: "Avalanche consensus delivers results in <100ms."
                  },
                  { 
                    icon: Globe, 
                    title: "Cross-border Ready",
                    desc: "One score, valid across LATAM. Mexico to Argentina."
                  },
                  { 
                    icon: TrendingUp, 
                    title: "Transparent Scoring",
                    desc: "Auditable algorithms. No black boxes."
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-white/40">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="ml-2">api-request.js</span>
                </div>
                <pre className="text-white/60 overflow-x-auto">
{`// Query PACTO Score
const response = await fetch(
  'https://api.pacto.io/v1/score/0x742d...',
  {
    headers: {
      'Authorization': 'Bearer sk_live_xxx',
      'Content-Type': 'application/json'
    }
  }
);

const { data } = await response.json();

// Response
{
  "wallet": "0x742d...",
  "pactoScore": 847,
  "riskLevel": "low",
  "recommendedCredit": 180000,
  "recommendedRate": 0.18,
  "confidence": 0.94,
  "onChain": true,
  "timestamp": "2026-05-17T00:00:00Z"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traction/Social Proof */}
      <section id="traction" className="py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-white/40 text-sm font-mono mb-4">TRACTION</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Proven results with{' '}
              <span className="italic font-serif text-white/70">early partners</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                metric: "40%", 
                label: "Lower Default Rates",
                desc: "Compared to traditional credit scoring for thin-file borrowers"
              },
              { 
                metric: "3x", 
                label: "Faster Approvals",
                desc: "From weeks to minutes. Real-time credit decisions."
              },
              { 
                metric: "$2.4M", 
                label: "Credit Facilitated",
                desc: "In pilot programs with 3 regional banks in Mexico"
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <p className="text-4xl sm:text-5xl font-bold text-white mb-3">{item.metric}</p>
                <p className="text-white font-semibold mb-2">{item.label}</p>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Partner Logos Placeholder */}
          <div className="text-center">
            <p className="text-white/40 text-sm mb-8">Trusted by innovative financial institutions</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {["Banco Regional", "FintechMX", "Credito Latino", "Avalanche", "Chainlink"].map((partner, idx) => (
                <div key={idx} className="px-6 py-3 border border-white/20 rounded-lg">
                  <span className="text-white/60 text-sm font-medium">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-white/40 text-sm font-mono mb-4">BUSINESS MODEL</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                B2B SaaS for{' '}
                <span className="italic font-serif text-white/70">financial institutions</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                We don't compete with banks—we empower them. White-label infrastructure 
                that integrates seamlessly into existing lending workflows.
              </p>

              <div className="space-y-4">
                {[
                  { title: "API Calls", desc: "Pay per credit assessment query" },
                  { title: "Enterprise License", desc: "Unlimited queries for large institutions" },
                  { title: "Success Fee", desc: "Percentage of loans originated using PACTO" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-white font-medium">{item.title}</span>
                    <span className="text-white/50 text-sm">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Market Opportunity</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">TAM: Credit scoring in emerging markets</span>
                    <span className="text-white font-semibold">$12B</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-white/30 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">SAM: LATAM alternative credit</span>
                    <span className="text-white font-semibold">$2.4B</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-white/40 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">SOM: Mexico PYME lending</span>
                    <span className="text-white font-semibold">$480M</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[4%] bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-white/40 text-sm font-mono mb-4">ROADMAP</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              What's{' '}
              <span className="italic font-serif text-white/70">next</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                phase: "Q2 2026", 
                title: "Beta Launch",
                items: ["3 pilot banks in Mexico", "5,000 PYMEs onboarded", "$5M credit facilitated"]
              },
              { 
                phase: "Q3 2026", 
                title: "Regional Expansion",
                items: ["Colombia & Chile launch", "Integration with 10+ fintechs", "AI scoring models"]
              },
              { 
                phase: "Q4 2026", 
                title: "Scale",
                items: ["Full LATAM coverage", "100+ institutional clients", "$100M credit facilitated"]
              },
              { 
                phase: "2027", 
                title: "Platform",
                items: ["Decentralized reputation", "Cross-chain support", "Insurance integration"]
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <p className="text-white/30 text-sm font-mono mb-2">{item.phase}</p>
                <h3 className="text-lg font-bold text-white mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((subitem, subidx) => (
                    <li key={subidx} className="flex items-start gap-2 text-white/50 text-sm">
                      <span className="text-white/30 mt-1">•</span>
                      {subitem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 sm:p-16 rounded-3xl bg-white/[0.02] border border-white/10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to unlock{' '}
              <span className="italic font-serif text-white/70">$380B</span>{' '}
              in credit?
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-2xl mx-auto">
              Join the financial institutions transforming PYME lending across LATAM. 
              Demo the platform today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/institution/demo" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-full transition-all text-base"
              >
                Try PACTO Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="https://github.com/ElBrAyAn1967/Pacto" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-all text-base border border-white/10"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <Shield className="w-3 h-3 text-black" />
              </div>
              <span className="text-white font-bold">PACTO</span>
            </div>
            
            <div className="flex items-center gap-6 text-white/40 text-sm">
              <span>Built for Avalanche CLP 2025</span>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="mailto:hello@pacto.io" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            
            <p className="text-white/40 text-sm">© 2026 PACTO Finance</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
