# 🏛️ PACTO - Red de Confianza Financiera para PYMEs

[![Avalanche](https://img.shields.io/badge/Avalanche-Fuji%20Testnet-red?logo=avalanche)](https://testnet.snowtrace.io/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-blue?logo=solidity)](https://soliditylang.org/)
[![Foundry](https://img.shields.io/badge/Foundry-1.5.1-black?logo=ethereum)](https://book.getfoundry.sh/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Construye tu reputación financiera, no solo tu historial bancario.**

PACTO es una red de confianza descentralizada donde las PYMEs latinoamericanas acumulan reputación verificable on-chain mediante sus transacciones comerciales diarias, validadas por su red de proveedores y clientes.

---

## 🎯 El Problema

- **65% de PYMEs** en LATAM están "invisibles" financieramente
- **85% de préstamos bancarios** son para grandes empresas
- Las PYMEs no acceden a crédito porque los bancos **no confían** en la información disponible
- Los sistemas tradicionales requieren **2+ años de historial fiscal**

## 💡 La Solución

PACTO permite a las PYMEs:
1. **Registrar transacciones** comerciales con proveedores/clientes
2. **Obtener validación** de ambas partes (mecanismo de doble firma)
3. **Construir reputación** verificable on-chain (Soulbound NFT)
4. **Acceder a crédito** con scoring alternativo basado en comportamiento real

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Dashboard    │  │ Registro     │  │ Validación   │      │
│  │ PYME         │  │ Transacción  │  │ Transacción  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Consulta     │  │ Scoring      │                        │
│  │ Institución  │  │ Reputación   │                        │
│  └──────────────┘  └──────────────┘                        │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    BLOCKCHAIN (Avalanche)                    │
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │ ReputationNFT.sol   │  │ TransactionRegistry │           │
│  │ (Soulbound Token)   │  │ (Registro On-Chain) │           │
│  └─────────────────────┘  └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
pacto/
├── 📄 README.md                    ← Este archivo
├── 📄 HACKATHON.md                 ← Info del hackathon
├── 📄 CLAUDE.md                    ← Contexto para desarrollo
│
├── 🎨 frontend/                    ← Next.js 14 + TypeScript
│   ├── src/app/                    ← App Router (Next.js 14)
│   ├── package.json
│   └── ...
│
├── 📜 contracts/                   ← Smart Contracts (Foundry)
│   ├── src/
│   │   ├── ReputationNFT.sol
│   │   └── TransactionRegistry.sol
│   ├── test/
│   └── script/
│
└── 🔧 backend/                     ← API (por desarrollar)
    └── ...
```

---

## 🚀 Quick Start

### Requisitos
- Node.js 18+
- npm o yarn
- Wallet con AVAX de Fuji Testnet

### 1. Instalar dependencias

```bash
# Frontend
cd frontend
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Visita: http://localhost:3000

---

## 📝 Smart Contracts

### Contratos Implementados

| Contrato | Dirección (Fuji) | Descripción |
|----------|------------------|-------------|
| ReputationNFT | `TBD` | Soulbound NFT de reputación |
| TransactionRegistry | `TBD` | Registro de transacciones |

### Desplegar contratos

```bash
cd contracts
forge script script/Deploy.s.sol --rpc-url fuji --broadcast
```

---

## 🎨 Funcionalidades

### Para PYMEs
- ✅ Registro de cuenta con wallet
- ✅ Registro de transacciones comerciales
- ✅ Validación de doble parte
- ✅ Visualización de score de reputación
- ✅ Historial de transacciones

### Para Instituciones Financieras (futuro)
- 🔍 Consulta de reputación por wallet
- 📊 Scoring basado en comportamiento
- 🎯 Ofertas de crédito personalizadas

---

## 🔐 Seguridad

- **Soulbound NFTs**: No transferibles, vinculados a identidad
- **Validación doble**: Ambas partes deben confirmar
- **Datos enmascarados**: Información sensible protegida
- **Auditoría completa**: Toda transacción es trazable

---

## 🌐 Tecnologías

- **Blockchain**: Avalanche Fuji Testnet
- **Smart Contracts**: Solidity 0.8.19 + Foundry
- **Frontend**: Next.js 14 + TypeScript + TailwindCSS
- **Web3**: RainbowKit + Wagmi + Viem
- **Wallet**: EVM compatible (MetaMask, etc.)

---

## 🏆 Hackathon

**Avalanche x CLP 2025**
- Track: Identidad Digital y KYC On-Chain
- Equipo: Brian (ElBrAyAn1967)
- Fecha: Mayo 2026

---

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

<p align="center">
  <strong>Construido con ❤️ para las PYMEs de LATAM</strong>
  <br />
  <sub>Powered by Avalanche</sub>
</p>
