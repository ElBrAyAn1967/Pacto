'use client';

import { useState } from "react";
import { Building2, Lock, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstitutionLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate login - in production this would validate against backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, always succeed
    router.push("/institution/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl font-bold text-avalanche-red">PACTO</span>
          </Link>
          <p className="text-slate-600 mt-2">Institution Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-avalanche-red/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-avalanche-red" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Institution Login</h1>
              <p className="text-sm text-slate-600">Access your dashboard</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Institution Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="admin@banco.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all"
                />
                <Lock className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="#" className="text-avalanche-red hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              For demo purposes, click Sign In with any credentials
            </p>
            <Link 
              href="/institution/demo"
              className="mt-3 block text-center text-avalanche-red hover:underline text-sm"
            >
              Or view demo without login →
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link href="#" className="text-avalanche-red hover:underline">
            Contact Sales
          </Link>
        </p>
      </div>
    </div>
  );
}
