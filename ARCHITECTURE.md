# 🏗️ PACTO System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                     USERS                                           │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ┌─────────────────────────┐         ┌─────────────────────────┐                  │
│   │   FINANCIAL             │         │   PYMEs                 │                  │
│   │   INSTITUTIONS          │         │   (End Users)           │                  │
│   │                         │         │                         │                  │
│   │ • Regional Banks        │         │ • Small Businesses      │                  │
│   │ • Fintech Lenders       │         │ • Medium Enterprises    │                  │
│   │ • Accounting Software   │         │ • Entrepreneurs         │                  │
│   │                         │         │                         │                  │
│   │ Use: White-Label Portal │         │ Use: Bank's App         │                  │
│   │        & Dashboard      │         │ (PACTO Score visible)   │                  │
│   └──────────┬──────────────┘         └─────────────────────────┘                  │
│              │                                                                      │
│              │ HTTPS                                                                │
│              ▼                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              PRESENTATION LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │                    NEXT.JS 14 APPLICATION                                    │  │
│   │                   (Frontend - Port 3000)                                     │  │
│   │                                                                              │  │
│   │  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │  │
│   │  │  Institution        │  │  Public             │  │  PYME               │  │  │
│   │  │  Portal             │  │  Landing            │  │  Widget             │  │  │
│   │  │                     │  │                     │  │  (Embedded)         │  │  │
│   │  │ • Login Page        │  │ • Hero Section      │  │                     │  │  │
│   │  │ • Dashboard         │  │ • Features          │  │ • Score Display     │  │  │
│   │  │ • PYMEs List        │  │ • API Docs          │  │ • Mini Dashboard    │  │  │
│   │  │ • Analytics         │  │ • Pricing           │  │ • Transaction Form  │  │  │
│   │  │ • Transactions      │  │ • Contact           │  │                     │  │  │
│   │  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │  │
│   │                                                                              │  │
│   │  Tech Stack:                                                                 │  │
│   │  • React 18 + TypeScript                                                     │  │
│   │  • Next.js 14 App Router                                                     │  │
│   │  • TailwindCSS + Custom Theme                                                │  │
│   │  • RainbowKit (Wallet Connection)                                            │  │
│   │  • Wagmi/Viem (Blockchain Interactions)                                      │  │
│   │                                                                              │  │
│   └──────────────────────────────────┬───────────────────────────────────────────┘  │
│                                      │                                               │
│                                      │ API Calls (REST)                              │
│                                      │ /api/v1/*                                     │
│                                      ▼                                               │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                API GATEWAY LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │                    EXPRESS.JS API SERVER                                     │  │
│   │                    (Backend - Port 3001)                                     │  │
│   │                                                                              │  │
│   │  ┌─────────────────────────────────────────────────────────────────────┐    │  │
│   │  │                         MIDDLEWARE                                   │    │  │
│   │  │                                                                      │    │  │
│   │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │    │  │
│   │  │  │ Rate Limiter │  │ API Key Auth │  │ Request      │              │    │  │
│   │  │  │ (1000/min)   │  │ (JWT/Bearer) │  │ Validator    │              │    │  │
│   │  │  └──────────────┘  └──────────────┘  └──────────────┘              │    │  │
│   │  │                                                                      │    │  │
│   │  │  Security: Helmet, CORS, Input Sanitization                         │    │  │
│   │  └─────────────────────────────────────────────────────────────────────┘    │  │
│   │                                                                              │  │
│   │  ┌─────────────────────────────────────────────────────────────────────┐    │  │
│   │  │                           ROUTES                                     │    │  │
│   │  │                                                                      │    │  │
│   │  │  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────┐  │    │  │
│   │  │  │ /api/v1/reputation │  │ /api/v1/transactions│  │ /api/v1/inst │  │    │  │
│   │  │  │                    │  │                    │  │ itutions     │  │    │  │
│   │  │  │ GET /:wallet       │  │ GET /:txHash       │  │              │  │    │  │
│   │  │  │ POST /check        │  │ GET /pyme/:wallet  │  │ GET /stats   │  │    │  │
│   │  │  │ GET /:wallet/score │  │                    │  │ GET /pymes   │  │    │  │
│   │  │  └────────────────────┘  └────────────────────┘  └──────────────┘  │    │  │
│   │  └─────────────────────────────────────────────────────────────────────┘    │  │
│   │                                                                              │  │
│   └──────────────────────────────────┬───────────────────────────────────────────┘  │
│                                      │                                               │
│                                      │ Business Logic / Service Calls                │
│                                      ▼                                               │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            BUSINESS LOGIC LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────┐│
│   │  REPUTATION SERVICE     │  │  TRANSACTION SERVICE    │  │  INSTITUTION SVC    ││
│   │                         │  │                         │  │                     ││
│   │ • Calculate Score       │  │ • Create Transaction    │  │ • Calculate Stats   ││
│   │ • Assess Risk Level     │  │ • Validate Transaction  │  │ • Aggregate Data    ││
│   │ • Recommend Credit      │  │ • Get History           │  │ • Generate Reports  ││
│   │ • Batch Processing      │  │ • Counterparty Verify   │  │ • Manage PYMEs      ││
│   │                         │  │                         │  │                     ││
│   │ Algorithm:              │  │ Status:                 │  │ Analytics:          ││
│   │ Score = Base + Volume   │  │ • pending               │  │ • Volume Trends     ││
│   │   + Validation + Time   │  │ • validated             │  │ • Risk Distribution ││
│   │                         │  │ • rejected              │  │ • Score Ranges      ││
│   └───────────┬─────────────┘  └───────────┬─────────────┘  └──────────┬──────────┘│
│               │                            │                          │           │
│               │                            │                          │           │
│   ┌───────────▼────────────────────────────▼──────────────────────────▼──────────┐│
│   │                                                                              ││
│   │                         DATA SOURCES                                         ││
│   │                                                                              ││
│   │  ┌─────────────────────────────────────────────────────────────────────┐    ││
│   │  │  MOCK DATA (Hackathon)                                              │    ││
│   │  │  • 5 PYME profiles with scores 500-950                              │    ││
│   │  │  • 4 sample transactions                                            │    ││
│   │  │  • Institution stats                                                │    ││
│   │  └─────────────────────────────────────────────────────────────────────┘    ││
│   │                                                                              ││
│   │  ┌─────────────────────────────────────────────────────────────────────┐    ││
│   │  │  BLOCKCHAIN (Production)                                            │    ││
│   │  │  • Smart Contract Reads                                             │    ││
│   │  │  • Transaction Events                                               │    ││
│   │  │  • ReputationNFT State                                              │    ││
│   │  └─────────────────────────────────────────────────────────────────────┘    ││
│   │                                                                              ││
│   └──────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ JSON-RPC / HTTP
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         BLOCKCHAIN LAYER (AVALANCHE)                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │                    SMART CONTRACTS (Solidity)                                │  │
│   │                                                                              │  │
│   │  ┌─────────────────────────────┐      ┌─────────────────────────────┐      │  │
│   │  │   REPUTATION NFT            │      │   TRANSACTION REGISTRY      │      │  │
│   │  │   (Soulbound Token)         │      │   (Immutable Ledger)        │      │  │
│   │  │                             │      │                             │      │  │
│   │  │  • createReputation()       │      │  • registerTransaction()    │      │  │
│   │  │  • updateScore()            │      │  • validateTransaction()    │      │  │
│   │  │  • getReputation()          │      │  • getTransaction()         │      │  │
│   │  │  • hasReputation()          │      │  • getPymeTransactions()    │      │  │
│   │  │                             │      │  • isFullyValidated()       │      │  │
│   │  │  Data:                      │      │  Data:                      │      │  │
│   │  │  • score (0-1000)           │      │  • txHash                   │      │  │
│   │  │  • transactionCount         │      │  • pyme/counterparty        │      │  │
│   │  │  • validationRate           │      │  • amount/currency          │      │  │
│   │  │  • timestamps               │      │  • validation status        │      │  │
│   │  │  • metadataURI              │      │  • description              │      │  │
│   │  │                             │      │                             │      │  │
│   │  │  Features:                  │      │  Features:                  │      │  │
│   │  │  ✅ Non-transferable        │      │  ✅ Double validation       │      │  │
│   │  │  ✅ Soulbound               │      │  ✅ Immutable record        │      │  │
│   │  │  ✅ On-chain reputation     │      │  ✅ Event emissions         │      │  │
│   │  └─────────────────────────────┘      └─────────────────────────────┘      │  │
│   │                                                                              │  │
│   └──────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
│   Network: Avalanche Fuji Testnet (Production: Avalanche C-Chain Mainnet)          │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. Institution Checking PYME Reputation

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Bank       │────▶│   Frontend   │────▶│   Backend    │────▶│  Blockchain  │
│   User       │     │   Dashboard  │     │   API        │     │  Contract    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
      │                     │                     │                     │
      │ Click "View PYME"   │ GET /reputation/:id │ Forward request     │
      │────────────────────▶│────────────────────▶│────────────────────▶│
      │                     │                     │                     │
      │                     │                     │ Query ReputationNFT │
      │                     │                     │                     │
      │ Display Score       │ Return JSON         │ Return struct       │ Read storage
      │◀────────────────────│◀────────────────────│◀────────────────────│
      │                     │                     │                     │
```

### 2. PYME Registering Transaction

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   PYME       │────▶│   Frontend   │────▶│   Backend    │────▶│  Blockchain  │
│   (Wallet)   │     │   Form       │     │   API        │     │  Contract    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
      │                     │                     │                     │
      │ Fill form + Sign    │ POST /transactions  │ Forward + Add Meta  │
      │────────────────────▶│────────────────────▶│────────────────────▶│
      │                     │                     │                     │
      │                     │                     │ Call registerTx()   │
      │                     │                     │                     │
      │ Show txHash         │ Return confirmation │ Return receipt      │ Write block
      │◀────────────────────│◀────────────────────│◀────────────────────│
      │                     │                     │                     │
```

### 3. Counterparty Validation

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Counterparty │────▶│   Frontend   │────▶│   Backend    │────▶│  Blockchain  │
│   (Wallet)   │     │   Validation │     │   API        │     │  Contract    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
      │                     │                     │                     │
      │ Review & Confirm    │ POST /validate/:tx  │ Forward + Verify    │
      │────────────────────▶│────────────────────▶│────────────────────▶│
      │                     │                     │                     │
      │                     │                     │ Call validateTx()   │
      │                     │                     │ Check both parties  │ Update state
      │ Show validated      │ Return status       │ Return receipt      │
      │◀────────────────────│◀────────────────────│◀────────────────────│
      │                     │                     │                     │
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 + React 18 | SSR, App Router, UI |
| **Styling** | TailwindCSS | Utility-first CSS |
| **Web3** | RainbowKit + Wagmi/Viem | Wallet connection, blockchain |
| **Backend** | Express.js + TypeScript | REST API |
| **Validation** | Zod | Runtime type checking |
| **Auth** | JWT + API Keys | Institution authentication |
| **Security** | Helmet, Rate Limiting | API protection |
| **Contracts** | Solidity 0.8.19 | Smart contracts |
| **Testing** | Foundry | Contract testing |
| **Blockchain** | Avalanche Fuji/C-Chain | Production network |

## Security Architecture

```
Request Flow:
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Client  │──▶│  WAF/   │──▶│  Rate   │──▶│  Auth   │──▶│ Handler │
│         │   │  CDN    │   │  Limit  │   │  Check  │   │         │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                              │               │
                              ▼               ▼
                         ┌─────────┐    ┌─────────┐
                         │ Redis   │    │ JWT     │
                         │ Store   │    │ Verify  │
                         └─────────┘    └─────────┘

Smart Contract Security:
┌─────────────────────────────────────────────────────────────┐
│ • Soulbound tokens (non-transferable)                       │
│ • Only owner can update scores                              │
│ • Double-validation required                                │
│ • Reentrancy protection                                     │
│ • Input validation                                          │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
Production Environment:

┌─────────────────────────────────────────────────────────────┐
│                     CLOUDFLARE CDN                          │
│              (DDoS Protection + Caching)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                 AWS / GCP / AZURE                           │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  Frontend (Next.js) │  │  Backend (Express)  │          │
│  │  - Vercel/Netlify   │  │  - ECS/Fargate      │          │
│  │  - Static + SSR     │  │  - Auto-scaling     │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │  PostgreSQL         │  │  Redis              │          │
│  │  - Primary Data     │  │  - Cache            │          │
│  │  - Encrypted at Rest│  │  - Sessions         │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              AVALANCHE BLOCKCHAIN                           │
│         (C-Chain Mainnet / Fuji Testnet)                    │
└─────────────────────────────────────────────────────────────┘
```

## Scalability Considerations

### Current (Hackathon MVP)
- Single server instance
- In-memory mock data
- Rate limited to 1000 req/min
- Suitable for demo/pilot

### Phase 2 (Growth)
- Horizontal scaling with load balancer
- PostgreSQL database
- Redis caching layer
- CDN for static assets
- Target: 10K requests/min

### Phase 3 (Scale)
- Microservices architecture
- Kubernetes orchestration
- Multi-region deployment
- GraphQL API gateway
- Target: 100K+ requests/min

---

**Document Version:** 1.0  
**Last Updated:** May 2026  
**Author:** PACTO Engineering Team
