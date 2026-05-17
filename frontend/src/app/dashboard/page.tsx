'use client';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { TrendingUp, Users, FileText, Award, Plus, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Conecta tu wallet</h1>
          <p className="text-gray-600 mb-6">
            Para acceder a tu dashboard de reputación, necesitas conectar tu wallet de Avalanche.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-avalanche-red">
              PACTO
            </Link>
            <ConnectButton />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Gestiona tu reputación financiera</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Score de Reputación</p>
                <p className="text-3xl font-bold text-avalanche-red">750</p>
              </div>
              <Award className="w-8 h-8 text-avalanche-red" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Transacciones</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Validadas</p>
                <p className="text-3xl font-bold text-green-600">18</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Contrapartes</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  href="/transactions/new"
                  className="flex items-center gap-4 p-4 bg-avalanche-red/5 rounded-lg hover:bg-avalanche-red/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-avalanche-red rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Nueva transacción</p>
                    <p className="text-sm text-gray-600">Registrar operación comercial</p>
                  </div>
                </Link>

                <Link 
                  href="/reputation"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ver reputación</p>
                    <p className="text-sm text-gray-600">Análisis detallado</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Transacciones recientes</h2>
                <Link href="/transactions" className="text-avalanche-red hover:underline text-sm">
                  Ver todas
                </Link>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        i === 1 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {i === 1 ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Venta de insumos #{100 + i}</p>
                        <p className="text-sm text-gray-600">{i === 1 ? 'Validada' : 'Pendiente de validación'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${(1500 * i).toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Hace {i} días</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reputation Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Tu Reputación</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={351.86}
                      strokeDashoffset={87.97}
                      className="text-avalanche-red"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">75%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                Excelente reputación. Sigue validando transacciones para mejorar.
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-avalanche-dark rounded-xl p-6 text-white">
              <h3 className="font-bold mb-4">¿Sabías que?</h3>
              <p className="text-sm text-gray-300 mb-4">
                Las PYMEs con score mayor a 700 tienen 40% más probabilidades de obtener crédito aprobado.
              </p>
              <Link 
                href="/tips"
                className="text-avalanche-red hover:underline text-sm"
              >
                Consejos para mejorar tu score →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
