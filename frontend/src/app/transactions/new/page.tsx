'use client';

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ArrowLeft, FileText, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTransactions } from "@/hooks/useTransactions";

export default function NewTransaction() {
  const { isConnected } = useAccount();
  const { registerTransaction, isRegistering, contractAddress } = useTransactions();
  
  const [formData, setFormData] = useState({
    counterparty: "",
    amount: "",
    currency: "MXN",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [txHash, setTxHash] = useState<string>("");
  const [error, setError] = useState<string>("");

  const isContractDeployed = contractAddress && contractAddress !== "0x0000000000000000000000000000000000000000";

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Conecta tu wallet</h1>
          <p className="text-gray-600 mb-6">
            Para registrar transacciones, necesitas conectar tu wallet.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isContractDeployed) {
      // Demo mode - simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTxHash("0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(""));
      setSubmitted(true);
      return;
    }

    try {
      await registerTransaction(
        formData.counterparty,
        formData.amount,
        formData.currency,
        formData.description
      );
      
      // Transaction submitted successfully
      // Note: Actual tx hash comes from useWriteContract's data property
      // For now, we show success without the hash (will be improved)
      setSubmitted(true);
    } catch (err) {
      setError("Error al registrar la transacción. Intenta de nuevo.");
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
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

        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {!isContractDeployed ? "¡Transacción simulada!" : "¡Transacción registrada!"}
            </h1>
            <p className="text-gray-600 mb-6">
              {isContractDeployed 
                ? "Tu transacción ha sido registrada en la blockchain de Avalanche. Ahora espera la validación de tu contraparte."
                : "Modo demo: Los contratos aún no están desplegados. En producción, esta transacción se registraría en la blockchain."
              }
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600">Hash de transacción:</p>
              <p className="font-mono text-sm text-gray-900 break-all">
                {txHash}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="px-6 py-3 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Ir al dashboard
              </Link>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setTxHash("");
                  setFormData({ counterparty: "", amount: "", currency: "MXN", description: "" });
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Registrar otra
              </button>
            </div>
          </div>
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Registrar nueva transacción
          </h1>
          <p className="text-gray-600 mb-8">
            Completa los datos de tu operación comercial para registrarla en la blockchain.
          </p>

          {!isContractDeployed && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-800 font-medium">Modo demostración</p>
                <p className="text-yellow-700 text-sm">
                  Los contratos no están desplegados aún. Esta transacción se simulará localmente.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contraparte */}
            <div>
              <label htmlFor="counterparty" className="block text-sm font-medium text-gray-700 mb-2">
                Dirección wallet de la contraparte *
              </label>
              <input
                type="text"
                id="counterparty"
                required
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all font-mono text-sm"
                value={formData.counterparty}
                onChange={(e) => setFormData({ ...formData, counterparty: e.target.value })}
              />
              <p className="mt-1 text-sm text-gray-500">
                Dirección de wallet del proveedor o cliente
              </p>
            </div>

            {/* Monto y Moneda */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Monto *
                </label>
                <input
                  type="number"
                  id="amount"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Moneda *
                </label>
                <select
                  id="currency"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all bg-white"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option value="MXN">MXN - Peso mexicano</option>
                  <option value="USD">USD - Dólar estadounidense</option>
                  <option value="ARS">ARS - Peso argentino</option>
                  <option value="COP">COP - Peso colombiano</option>
                  <option value="CLP">CLP - Peso chileno</option>
                  <option value="BRL">BRL - Real brasileño</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción de la transacción *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                placeholder="Describe los bienes o servicios intercambiados..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-red focus:border-avalanche-red outline-none transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Importante</p>
                <p className="text-sm text-blue-700">
                  Una vez registrada, la transacción quedará pendiente de validación por tu contraparte. 
                  Ambas partes deben confirmar para que se compute en tu reputación.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Link 
                href="/dashboard"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isRegistering}
                className="flex-1 px-6 py-3 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isRegistering ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Registrando...
                  </>
                ) : (
                  isContractDeployed ? "Registrar transacción" : "Simular transacción"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
