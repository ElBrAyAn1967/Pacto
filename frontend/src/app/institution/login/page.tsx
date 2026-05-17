'use client';

import { useState } from "react";
import { Shield, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstitutionLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push("/institution/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-semibold text-white">PACTO</span>
          </Link>
          <p className="text-[#71717A] mt-2 text-sm">Institution Portal</p>
        </div>

        {/* Login Card */}
        <div className="card p-6">
          <div className="mb-6">
            <h1 className="title-md mb-1">Welcome back</h1>
            <p className="text-small">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-small mb-1.5">
                Institution Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@banco.com"
                className="input"
              />
            </div>

            <div>
              <label className="block text-small mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="input"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#71717A]">
                <input type="checkbox" className="rounded border-[#27272A] bg-[#18181B]" />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-white hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#27272A]">
            <p className="text-[#71717A] text-xs text-center">
              Demo mode: any credentials work
            </p>
          </div>
        </div>

        <p className="text-center text-[#71717A] text-xs mt-6">
          Don't have an account?{' '}
          <Link href="#" className="text-white hover:underline">
            Contact Sales
          </Link>
        </p>
      </div>
    </div>
  );
}
