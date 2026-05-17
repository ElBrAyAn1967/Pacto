'use client';

import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#0F0F10]">
      {/* Header */}
      <header className="border-b border-[#27272A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-md" />
              <span className="text-white font-semibold text-sm">PACTO</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              <Link href="#features" className="nav-link">Features</Link>
              <Link href="#how-it-works" className="nav-link">How it works</Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="nav-link">GitHub</Link>
            </nav>

            <Link href="/institution/demo" className="btn text-xs">
              Try Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-small mb-4">Avalanche CLP 2025</p>
            
            <h1 className="title-xl mb-4">
              Credit scoring for the financially invisible
            </h1>
            
            <p className="text-body mb-8 max-w-lg">
              PACTO turns real commercial reputation into bankable credit scores for 15M+ PYMEs in LATAM. No bank account required.
            </p>

            <div className="flex gap-3">
              <Link href="/institution/demo" className="btn">
                Try Demo
              </Link>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="btn-secondary">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#27272A] rounded-lg overflow-hidden">
            {[
              { value: "$380B", label: "Unmet credit demand" },
              { value: "15M+", label: "PYMEs in LATAM" },
              { value: "65%", label: "Without bank access" },
              { value: "40%", label: "Lower default rates" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0F0F10] p-6">
                <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
                <p className="text-small">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="title-lg mb-8">How it works</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <p className="text-[#71717A] text-xs mb-2">01</p>
              <h3 className="title-md mb-2">Connect</h3>
              <p className="text-small">
                Integrate PACTO API in minutes. Query any wallet address for instant credit assessment.
              </p>
            </div>
            
            <div className="card p-6">
              <p className="text-[#71717A] text-xs mb-2">02</p>
              <h3 className="title-md mb-2">Analyze</h3>
              <p className="text-small">
                Our algorithm analyzes 50+ on-chain and off-chain signals to generate a PACTO Score.
              </p>
            </div>
            
            <div className="card p-6">
              <p className="text-[#71717A] text-xs mb-2">03</p>
              <h3 className="title-md mb-2">Lend</h3>
              <p className="text-small">
                Get risk assessment, recommended credit limit, and interest rate in milliseconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="title-lg mb-3">Simple API</h2>
              <p className="text-body mb-6">
                RESTful endpoints designed for developer productivity. Get started with a single API call.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Sub-100ms response times",
                  "99.9% uptime SLA", 
                  "Real-time webhooks",
                  "SDKs for Python, Node.js, Go"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-small text-white">
                    <span className="w-1 h-1 rounded-full bg-[#A1A1AA]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-4 font-mono text-xs">
              <div className="flex items-center gap-1.5 mb-3 text-[#71717A]">
                <span>JavaScript</span>
              </div>
              <pre className="text-[#A1A1AA] overflow-x-auto">
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
      <section className="py-20 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="card p-8 md:p-12">
            <div className="max-w-xl">
              <h2 className="title-lg mb-3">
                Ready to expand your lending portfolio?
              </h2>
              <p className="text-body mb-6">
                Join financial institutions using PACTO to reach the $380B untapped PYME market.
              </p>
              <div className="flex gap-3">
                <Link href="/institution/demo" className="btn">
                  Launch Demo
                </Link>
                <Link href="https://github.com/ElBrAyAn1967/Pacto" className="btn-secondary">
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#27272A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded" />
              <span className="text-white font-medium text-sm">PACTO</span>
            </div>
            
            <div className="flex items-center gap-6 text-small">
              <span>Built for Avalanche</span>
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-white transition-colors">
                GitHub
              </Link>
            </div>
            
            <p className="text-small">© 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
