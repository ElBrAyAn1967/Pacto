'use client';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { TrendingUp, Users, FileText, Award, Plus, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useReputation } from "@/hooks/useReputation";
import { useTransactions } from "@/hooks/useTransactions";

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const { reputation, hasReputation, isLoading: isLoadingReputation, contractAddress } = useReputation();
  const { totalTransactions, transactionHashes, isLoading: isLoadingTransactions } = useTransactions();

  const isContractDeployed = contractAddress && contractAddress !== "0x0000000000000000000000000000000000000000";

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center">
        <div className="text-center p-8 bg-[#18181B] rounded-lg border border-[#27272A] max-w-md">
          <h1 className="title-md mb-4">Connect your wallet</h1>
          <p className="text-body mb-6">
            To access your reputation dashboard, connect your Avalanche wallet.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Navbar */}
      <nav className="border-b border-[#27272A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="text-white font-semibold">
              PACTO
            </Link>
            <ConnectButton />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="title-lg mb-1">Dashboard</h1>
          <p className="text-body">Manage your financial reputation</p>
          {address && (
            <p className="text-small mt-2 font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          )}
        </div>

        {/* Contract Not Deployed Warning */}
        {!isContractDeployed && (
          <div className="mb-6 p-4 bg-[#1C1C21] border border-[#27272A] rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#FFC542] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Demo Mode</p>
              <p className="text-[#71717A] text-sm">
                Smart contracts not deployed yet. Dashboard shows demonstration data.
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#27272A] rounded-lg overflow-hidden mb-8">
          <div className="bg-[#0F0F10] p-5">
            <p className="text-small mb-1">Reputation Score</p>
            <p className="text-2xl font-semibold text-white">
              {isLoadingReputation ? "..." : (reputation?.score || 742)}
            </p>
            {!hasReputation && !isLoadingReputation && (
              <p className="text-[#71717A] text-xs mt-1">Not registered</p>
            )}
          </div>

          <div className="bg-[#0F0F10] p-5">
            <p className="text-small mb-1">Transactions</p>
            <p className="text-2xl font-semibold text-white">
              {isLoadingTransactions ? "..." : (isContractDeployed ? transactionHashes.length : 24)}
            </p>
          </div>

          <div className="bg-[#0F0F10] p-5">
            <p className="text-small mb-1">Validated</p>
            <p className="text-2xl font-semibold text-[#3DD598]">
              {isLoadingTransactions ? "..." : 18}
            </p>
          </div>

          <div className="bg-[#0F0F10] p-5">
            <p className="text-small mb-1">Counterparties</p>
            <p className="text-2xl font-semibold text-white">12</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="title-md mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link 
                  href="/transactions/new"
                  className="flex items-center gap-4 p-4 bg-[#27272A] rounded-lg hover:bg-[#3F3F46] transition-colors"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">New Transaction</p>
                    <p className="text-[#71717A] text-xs">Register a commercial operation</p>
                  </div>
                </Link>

                <div className="flex items-center gap-4 p-4 bg-[#27272A] rounded-lg">
                  <div className="w-10 h-10 bg-[#18181B] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#A1A1AA]" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">View Reputation</p>
                    <p className="text-[#71717A] text-xs">Detailed analysis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="title-md">Recent Transactions</h2>
                <span className="text-[#71717A] text-sm cursor-pointer hover:text-white">View all</span>
              </div>
              
              <div className="space-y-2">
                {[
                  { id: 1, name: "Supply Purchase #101", status: "validated", amount: 1500, days: 1 },
                  { id: 2, name: "Equipment Sale #102", status: "pending", amount: 3000, days: 2 },
                  { id: 3, name: "Raw Materials #103", status: "pending", amount: 4500, days: 3 },
                ].map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-[#18181B] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.status === 'validated' ? 'bg-[#3DD598]/10 text-[#3DD598]' : 'bg-[#FFC542]/10 text-[#FFC542]'
                      }`}>
                        {tx.status === 'validated' ? <CheckCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{tx.name}</p>
                        <p className="text-[#71717A] text-xs">
                          {tx.status === 'validated' ? 'Validated' : 'Pending validation'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white text-sm">${tx.amount.toLocaleString()}</p>
                      <p className="text-[#71717A] text-xs">{tx.days} days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Reputation Card */}
            <div className="card p-5">
              <h3 className="font-medium text-white mb-4 text-sm">Your Reputation</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="#27272A"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="white"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={301.59}
                      strokeDashoffset={75.4}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-white">
                      {reputation ? Math.round((reputation.score / 1000) * 100) : 74}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-small">
                {hasReputation 
                  ? "Great reputation. Keep validating transactions to improve."
                  : "No reputation yet. Register your first transaction."
                }
              </p>
            </div>

            {/* Quick Info */}
            <div className="card p-5 bg-[#1C1C21]">
              <h3 className="font-medium text-white mb-3 text-sm">Did you know?</h3>
              <p className="text-small mb-3">
                PYMEs with scores above 700 have 40% higher chances of getting approved credit.
              </p>
              <span className="text-white text-xs hover:underline cursor-pointer">
                Tips to improve your score →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
