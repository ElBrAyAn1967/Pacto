# 🏛️ PACTO - Infrastructure White-Label

[![Avalanche](https://img.shields.io/badge/Avalanche-Fuji%20Testnet-red?logo=avalanche)](https://testnet.snowtrace.io/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-blue?logo=solidity)](https://soliditylang.org/)
[![Foundry](https://img.shields.io/badge/Foundry-1.5.1-black?logo=ethereum)](https://book.getfoundry.sh/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **White-Label Reputation Infrastructure for Financial Institutions**
> 
> *Banks, accounting software, and lenders use PACTO to offer alternative credit scoring to their PYME customers.*

---

## 🎯 The Real Problem

**65% of PYMEs in LATAM are "financially invisible"** - they exist, operate, trade millions, but traditional banks see nothing.

**Why banks don't lend to PYMEs:**
- ❌ No 2-year fiscal history
- ❌ No collateral
- ❌ "I don't trust their data"

**Why PYMEs can't prove creditworthiness:**
- ❌ Their transaction history lives in WhatsApp, Excel, accounting software
- ❌ No unified, verifiable record
- ❌ Each bank asks for the same documents again

---

## 💡 PACTO Solution: B2B2B Infrastructure

**We don't sell to PYMEs directly.**

**We sell to:**
1. **Regional Banks** → White-label reputation scoring
2. **Accounting Software** (CONTPAQi, Aspel, QuickBooks) → Auto-ingest transaction data
3. **Lenders/Fintechs** → Alternative credit scoring API

**Their PYME customers get:**
- Reputation score inside their banking app (familiar UI)
- Zero crypto knowledge required
- Access to credit without traditional requirements

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FINANCIAL INSTITUTIONS                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Regional     │  │ Accounting   │  │ Fintech      │      │
│  │ Bank         │  │ Software     │  │ Lenders      │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼─────────────────┼─────────────────┼──────────────┘
          │                 │                 │
          │   WHITE-LABEL   │   API ACCESS    │
          │   DASHBOARD     │   SCORING API   │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      PACTO PLATFORM                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Reputation   │  │ Transaction  │  │ Scoring      │      │
│  │ Engine       │  │ Pipeline     │  │ Algorithm    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼─────────────────┼─────────────────┼──────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    BLOCKCHAIN (Avalanche)                    │
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │ ReputationNFT.sol   │  │ TransactionRegistry │           │
│  │ (Soulbound Token)   │  │ (Immutable Record)  │           │
│  └─────────────────────┘  └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 For Institutions: White-Label Dashboard

**What banks see:**
```
┌─────────────────────────────────────────┐
│  Banco del Sur - PYME Credit Platform   │
├─────────────────────────────────────────┤
│                                         │
│  Cliente: Distribuidora López S.A.      │
│  PACTO Score: 742/1000 ⭐⭐⭐⭐           │
│                                         │
│  📊 Transaction History:                │
│     - 47 validated transactions         │
│     - $1.2M total volume (12 months)    │
│     - 94% validation rate               │
│                                         │
│  💰 Credit Recommendation: $150,000     │
│     Interest Rate: 18% (vs 32% market)  │
│                                         │
└─────────────────────────────────────────┘
```

**Zero blockchain visible.** Just data banks trust and understand.

---

## 📦 Business Model

### Revenue Streams

| Stream | Model | Est. Revenue |
|--------|-------|--------------|
| **API Calls** | $0.50-2.00 per credit check | $50K-200K/month at scale |
| **White-Label Setup** | $5K-20K per institution | Upfront + monthly |
| **Data Verification** | $1-5 per validated transaction | High margin |

### Unit Economics
- **CAC:** ~$5K (enterprise sales cycle)
- **LTV:** $50K+ (institutional contracts)
- **Gross Margin:** 80%+ (software margins)

---

## 🚀 Go-To-Market Strategy

### Phase 1: Anchor Partners (0-6 months)
- 2-3 regional banks in Mexico
- 1 accounting software integration (CONTPAQi)
- Prove the model with 500+ PYMEs

### Phase 2: Expansion (6-12 months)
- License to banks across LATAM
- API marketplace for fintechs
- 10K+ PYMEs on platform

### Phase 3: Scale (12-24 months)
- Dominant reputation infrastructure in LATAM
- 100K+ PYMEs
- Expansion to other emerging markets

---

## 🔐 Technical Highlights

- **Soulbound NFTs:** Non-transferable reputation (can't be bought/sold)
- **Multi-party validation:** Both sides confirm transaction (prevents fraud)
- **Immutable audit trail:** Every transaction forever verifiable
- **Privacy-preserving:** Institutions see score, not raw transaction details
- **Interoperable:** Standard API, works with any banking system

---

## 📁 Project Structure

```
pacto/
├── 📄 README.md                    ← This file
├── 📄 PROPUESTA-B2B2B.md           ← Business model detailed
├── 📄 TECHNICAL-ARCHITECTURE.md    ← Technical deep-dive
│
├── 🎨 frontend/                    ← White-Label Dashboard (Next.js)
│   ├── src/app/institution/        ← Bank/lender interface
│   ├── src/app/pyme/               ← End-user view (branded)
│   └── src/components/widgets/     ← Embeddable components
│
├── 📜 contracts/                   ← Smart Contracts (Foundry)
│   └── Infrastructure layer
│
└── 🔧 backend-api/                 ← REST API for institutions
    └── Authentication, scoring, webhooks
```

---

## 🎯 Competitive Advantage

| Competitor | Model | Weakness | PACTO Advantage |
|------------|-------|----------|-----------------|
| **Credit bureaus** | Traditional data | Exclude informal economy | Use real commercial transactions |
| **Fintech lenders** | Proprietary scoring | Single lender, siloed data | Cross-institutional reputation |
| **Blockchain projects** | Direct-to-consumer | High friction, low adoption | B2B2B distribution |
| **Open Banking** | Account aggregation | Limited in LATAM | Works with or without bank APIs |

---

## 🏆 Hackathon Context

**Avalanche x CLP 2025**
- **Track:** Digital Identity & On-Chain KYC
- **Vision:** Infrastructure layer for financial inclusion
- **Demo:** White-label dashboard + backend API
- **Team:** Brian (ElBrAyAn1967)

**What judges see:**
- Working infrastructure (contracts + API + dashboard)
- Clear business model with real revenue potential
- Solves a genuine $50B+ problem in LATAM
- Scalable B2B2B distribution model

---

## 📊 TAM / SAM / SOM

- **TAM (Total):** $2.3T - All PYME lending in LATAM
- **SAM (Serviceable):** $50B - Credit scoring & verification market
- **SOM (Obtainable):** $500M - 1% market share in 5 years

---

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

<p align="center">
  <strong>Infrastructure for the next billion financially included</strong>
  <br />
  <sub>White-Label • B2B2B • Avalanche Powered</sub>
</p>
