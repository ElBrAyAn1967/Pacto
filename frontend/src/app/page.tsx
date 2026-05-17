'use client';

import Link from "next/link";
import { Shield, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0F0F10]">
      {/* Header */}
      <header className="border-b border-[#27272A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <Shield className="w-4 h-4 text-black" />
              </div>
              <span className="text-white font-semibold text-sm">PACTO</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="#features" className="nav-link">Features</Link>
              <Link href="#how-it-works" className="nav-link">How it works</Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="nav-link">GitHub</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/institution/demo" className="btn text-xs hidden sm:inline-flex">
                Try Demo
              </Link>
              
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
                <Link href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                <Link href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How it works</Link>
                <Link href="https://github.com/ElBrAyAn1967/Pacto" className="nav-link" onClick={() => setMobileMenuOpen(false)}>GitHub</Link>
                <Link href="/institution/demo" className="btn text-xs mt-2 w-fit" onClick={() => setMobileMenuOpen(false)}>
                  Try Demo
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-small mb-4">Avalanche CLP 2025</p>
            
            <h1 className="title-xl mb-4 text-3xl sm:text-4xl lg:text-[32px] leading-tight">
              Credit scoring for the financially invisible
            </h1>
            
            <p className="text-body mb-6 sm:mb-8 max-w-lg text-sm sm:text-base">
              PACTO turns real commercial reputation into bankable credit scores for 15M+ PYMEs in LATAM. No bank account required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/institution/demo" className="btn justify-center">
                Try Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="btn-secondary justify-center">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-12 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#27272A] rounded-lg overflow-hidden">
            {[
              { value: "$380B", label: "Unmet credit demand" },
              { value: "15M+", label: "PYMEs in LATAM" },
              { value: "65%", label: "Without bank access" },
              { value: "40%", label: "Lower default rates" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0F0F10] p-4 sm:p-6">
                <p className="text-xl sm:text-2xl font-semibold text-white mb-1">{stat.value}</p>
                <p className="text-small text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 sm:py-20 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="title-lg mb-6 sm:mb-8 text-xl sm:text-2xl">How it works</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="card p-5 sm:p-6">
              <p className="text-[#71717A] text-xs mb-2">01</p>
              <h3 className="title-md mb-2 text-base sm:text-lg">Connect</h3>
              <p className="text-small text-xs sm:text-sm">
                Integrate PACTO API in minutes. Query any wallet address for instant credit assessment.
              </p>
            </div>
            
            <div className="card p-5 sm:p-6">
              <p className="text-[#71717A] text-xs mb-2">02</p>
              <h3 className="title-md mb-2 text-base sm:text-lg">Analyze</h3>
              <p className="text-small text-xs sm:text-sm">
                Our algorithm analyzes 50+ on-chain and off-chain signals to generate a PACTO Score.
              </p>
            </div>
            
            <div className="card p-5 sm:p-6 sm:col-span-2 lg:col-span-1">
              <p className="text-[#71717A] text-xs mb-2">03</p>
              <h3 className="title-md mb-2 text-base sm:text-lg">Lend</h3>
              <p className="text-small text-xs sm:text-sm">
                Get risk assessment, recommended credit limit, and interest rate in milliseconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-12 sm:py-20 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="title-lg mb-3 text-xl sm:text-2xl">Simple API</h2>
              <p className="text-body mb-6 text-sm sm:text-base">
                RESTful endpoints designed for developer productivity. Get started with a single API call.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Sub-100ms response times",
                  "99.9% uptime SLA", 
                  "Real-time webhooks",
                  "SDKs for Python, Node.js, Go"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-small text-white text-xs sm:text-sm">
                    <span className="w-1 h-1 rounded-full bg-[#A1A1AA] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-4 font-mono text-xs overflow-x-auto">
              <div className="flex items-center gap-1.5 mb-3 text-[#71717A]">
                <span>JavaScript</span>
              </div>
              <pre className="text-[#A1A1AA] overflow-x-auto whitespace-pre-wrap sm:whitespace-pre">
{`// Get PACTO Score
const response = await fetch(
  'https://api.pacto.io/v1/score/0x742d...',
  {
    headers: {
      'Authorization': 'Bearer sk_live_xxx'
    }
  }
);

const { score, risk } = await response.json();
console.log(score); // 847`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="card p-6 sm:p-8 lg:p-12">
            <div className="max-w-xl">
              <h2 className="title-lg mb-3 text-xl sm:text-2xl">
                Ready to expand your lending portfolio?
              </h2>
              <p className="text-body mb-6 text-sm sm:text-base">
                Join financial institutions using PACTO to reach the $380B untapped PYME market.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/institution/demo" className="btn justify-center">
                  Launch Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="https://github.com/ElBrAyAn1967/Pacto" className="btn-secondary justify-center">
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <Shield className="w-3 h-3 text-black" />
              </div>
              <span className="text-white font-medium text-sm">PACTO</span>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6 text-small">
              <span className="text-xs sm:text-sm">Built for Avalanche</span>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-white transition-colors text-xs sm:text-sm">
                GitHub
              </Link>
            </div>
            
            <p className="text-small text-xs sm:text-sm">© 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
