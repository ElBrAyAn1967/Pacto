'use client';

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Building2, User, Mail, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const { isConnected } = useAccount();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a PACTO!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido creada exitosamente. Ahora puedes empezar a construir tu reputación financiera.
          </p>
          <Link 
            href="/dashboard"
            className="block w-full px-6 py-3 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Ir a mi dashboard
          </Link>
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Progress */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step >= 1 ? 'bg-avalanche-red text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 rounded ${
              step >= 2 ? 'bg-avalanche-red' : 'bg-gray-200'
            }`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step >= 2 ? 'bg-avalanche-red text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>

          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Conecta tu wallet
              </h1>
              <p className="text-gray-600 mb-8">
                Para crear tu cuenta en PACTO, primero necesitas conectar tu wallet de Avalanche.
              </p>

              <div className="bg-gray-50 rounded-xl p-8 text-center">
                {!isConnected ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-avalanche-red/10 rounded-full flex items-center justify-center mx-auto">
                      <Building2 className="w-8 h-8 text-avalanche-red" />
                    </div>
                    <p className="text-gray-600">
                      Haz clic en el botón para conectar tu wallet
                    </p>
                    <div className="flex justify-center">
                      <ConnectButton />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-green-600 font-medium">
                      ¡Wallet conectada exitosamente!
                    </p>
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Continuar
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Completa tu perfil
              </h1>
              <p className="text-gray-600 mb-8">
                Cuéntanos sobre tu negocio para completar tu registro.
              </p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nombre del representante legal
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Nombre de la empresa
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all"
                    placeholder="Mi Empresa S.A. de C.V."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all"
                    placeholder="contacto@miempresa.com"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitting(true);
                      setTimeout(() => {
                        setIsSubmitting(false);
                        setRegistered(true);
                      }, 1500);
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Al registrarte, aceptas los términos de servicio y política de privacidad de PACTO.
        </p>
      </div>
    </div>
  );
}
