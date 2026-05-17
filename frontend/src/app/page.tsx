import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight, Shield, TrendingUp, Users, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-avalanche-red">PACTO</span>
              <span className="ml-2 text-sm text-gray-500 hidden sm:block">Red de Confianza Financiera</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-avalanche-red transition-colors hidden sm:block">
                Dashboard
              </Link>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-avalanche-red/10 text-avalanche-red text-sm font-medium mb-8">
            <Award className="w-4 h-4" />
            <span>Powered by Avalanche</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Construye tu <span className="text-avalanche-red">reputación</span>
            <br />
            financiera real
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            PACTO es una red de confianza donde las PYMEs acumulan reputación verificable 
            on-chain mediante transacciones comerciales validadas. Sin banco, sin papeleo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Comenzar ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Conocer más
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-avalanche-red mb-2">15M+</div>
              <div className="text-gray-600">PYMEs en LATAM</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-avalanche-red mb-2">$2.3T</div>
              <div className="text-gray-600">Facturación anual</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-avalanche-red mb-2">65%</div>
              <div className="text-gray-600">Sin acceso bancario</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona PACTO?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tres pasos simples para construir tu reputación financiera verificable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-8 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-avalanche-red rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Registra transacciones</h3>
              <p className="text-gray-600">
                Registra tus transacciones comerciales con proveedores y clientes. 
                Cada operación queda guardada de forma segura.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-avalanche-red rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Obtén validación</h3>
              <p className="text-gray-600">
                Tu contraparte valida la transacción con su firma digital. 
                Doble confirmación = mayor confianza.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-avalanche-red rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Accede a crédito</h3>
              <p className="text-gray-600">
                Con tu reputación construida, accede a ofertas de crédito 
                de instituciones financieras verificadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-avalanche-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Eres una PYME en LATAM?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a la red de confianza que está revolucionando el acceso al crédito 
            para pequeñas y medianas empresas en América Latina.
          </p>
          <Link 
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-avalanche-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Crear cuenta gratuita
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-avalanche-red">PACTO</span>
              <span className="ml-2 text-sm text-gray-500">Hackathon Avalanche x CLP 2025</span>
            </div>
            <div className="flex gap-6 text-gray-600">
              <Link href="https://github.com/ElBrAyAn1967/Pacto" className="hover:text-avalanche-red transition-colors">
                GitHub
              </Link>
              <Link href="https://testnet.snowtrace.io/" className="hover:text-avalanche-red transition-colors">
                Snowtrace
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
