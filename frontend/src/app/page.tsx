'use client';

import Link from "next/link";
import { Shield, ArrowRight, Menu, X, Globe, Network, Zap } from "lucide-react";
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E84142] to-[#FF6B6B] rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">PACTO</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-white/60 hover:text-white text-sm transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-white/60 hover:text-white text-sm transition-colors">How it works</Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="text-white/60 hover:text-white text-sm transition-colors">GitHub</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/institution/demo" 
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E84142] hover:bg-[#FF6B6B] text-white text-sm font-medium rounded-full transition-all"
              >
                Try Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-white/60 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <div className="flex flex-col gap-4">
                <Link href="#features" className="text-white/60 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                <Link href="#how-it-works" className="text-white/60 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>How it works</Link>
                <Link href="https://github.com/ElBrAyAn1967/Pacto" className="text-white/60 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>GitHub</Link>
                <Link href="/institution/demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E84142] text-white text-sm font-medium rounded-full w-fit" onClick={() => setMobileMenuOpen(false)}>
                  Try Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Full Height */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        {/* Background Gradient Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#E84142]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className={`max-w-2xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="w-2 h-2 bg-[#E84142] rounded-full animate-pulse" />
                <span className="text-white/70 text-sm">Avalanche CLP 2025</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Credit scoring{' '}
                <span className="italic font-serif text-[#E84142]">for the</span>{' '}
                <br className="hidden sm:block" />
                <span className="italic font-serif text-[#E84142]">financially</span>{' '}
                invisible
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-lg leading-relaxed">
                Turn real commercial reputation into bankable credit scores. 
                Unlock $380B in untapped PYME credit across LATAM.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/institution/demo" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E84142] hover:bg-[#FF6B6B] text-white font-semibold rounded-full transition-all text-base"
                >
                  Launch Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://github.com/ElBrAyAn1967/Pacto" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white/70 hover:text-white font-medium transition-colors text-base"
                >
                  View Documentation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: "$380B", label: "Market Size" },
                  { value: "15M+", label: "PYMEs" },
                  { value: "40%", label: "Lower Defaults" },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - Neural Network World */}
            <div className={`relative h-[400px] sm:h-[500px] lg:h-[600px] transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Main Globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
                  
                  {/* Middle Ring */}
                  <div className="absolute inset-8 border border-white/20 rounded-full" />
                  
                  {/* Inner Ring with Gradient */}
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-[#E84142]/20 via-purple-500/20 to-blue-500/20 blur-xl" />
                  
                  {/* Core */}
                  <div className="absolute inset-24 rounded-full bg-[#0A0A0B] border border-white/20 flex items-center justify-center">
                    <Globe className="w-16 h-16 sm:w-20 sm:h-20 text-white/80" />
                  </div>

                  {/* Orbiting Nodes */}
                  {[
                    { angle: 0, icon: Network, color: '#E84142' },
                    { angle: 90, icon: Zap, color: '#A855F7' },
                    { angle: 180, icon: Shield, color: '#3B82F6' },
                    { angle: 270, icon: Network, color: '#10B981' },
                  ].map((node, idx) => (
                    <div
                      key={idx}
                      className="absolute w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        top: `${50 + 45 * Math.sin((node.angle * Math.PI) / 180)}%`,
                        left: `${50 + 45 * Math.cos((node.angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                        background: `linear-gradient(135deg, ${node.color}40, ${node.color}20)`,
                        border: `1px solid ${node.color}60`,
                      }}
                    >
                      <node.icon className="w-6 h-6" style={{ color: node.color }} />
                    </div>
                  ))}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(0deg)' }}>
                    <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                    <line x1="50%" y1="50%" x2="50%" y2="95%" stroke="url(#gradient2)" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                    <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="url(#gradient3)" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                    <line x1="50%" y1="50%" x2="50%" y2="5%" stroke="url(#gradient4)" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E84142" stopOpacity="0" />
                        <stop offset="100%" stopColor="#E84142" stopOpacity="0.5" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
                        <stop offset="100%" stopColor="#A855F7" stopOpacity="0.5" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
                      </linearGradient>
                      <linearGradient id="gradient4" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white/20"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-5 h-5 text-white/30 rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              How <span className="italic font-serif text-[#E84142]">PACTO</span> works
            </h2>
            <p className="text-white/60 text-lg">
              Three steps to smarter lending decisions powered by blockchain
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Connect", 
                desc: "Integrate our API in minutes. Query any wallet address for instant credit assessment.",
                icon: Network
              },
              { 
                step: "02", 
                title: "Analyze", 
                desc: "Our algorithm processes 50+ on-chain and off-chain signals to generate your PACTO Score.",
                icon: Zap
              },
              { 
                step: "03", 
                title: "Lend", 
                desc: "Get risk assessment, recommended credit limits, and interest rates in milliseconds.",
                icon: Shield
              },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#E84142]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E84142]/20 to-[#E84142]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-[#E84142]" />
                </div>
                <p className="text-white/30 text-sm font-mono mb-2">{item.step}</p>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 sm:p-16 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to expand{' '}
              <span className="italic font-serif text-[#E84142]">your portfolio?</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Join financial institutions using PACTO to reach the $380B untapped PYME market across LATAM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/institution/demo" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E84142] hover:bg-[#FF6B6B] text-white font-semibold rounded-full transition-all text-base"
              >
                Try Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="https://github.com/ElBrAyAn1967/Pacto" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-all text-base border border-white/10"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-[#E84142] to-[#FF6B6B] rounded-md flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-bold">PACTO</span>
            </div>
            
            <div className="flex items-center gap-6 text-white/40 text-sm">
              <span>Built for Avalanche CLP 2025</span>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-white transition-colors">
                GitHub
              </Link>
            </div>
            
            <p className="text-white/40 text-sm">© 2026</p>
          </div>
        </div>
      </footer>

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}
