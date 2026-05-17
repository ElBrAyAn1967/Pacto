# 🏗️ TECHNICAL ARCHITECTURE
## PACTO White-Label Infrastructure

**Version:** 1.0  
**Last Updated:** May 2026  
**Status:** Hackathon MVP

---

## 📐 System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ Institution      │  │ PYME Portal      │  │ Admin Dashboard  │          │
│  │ Dashboard        │  │ (White-Label)    │  │ (Internal)       │          │
│  │ (Next.js 14)     │  │ (Embeddable)     │  │ (Next.js 14)     │          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │                      │
└───────────┼─────────────────────┼─────────────────────┼──────────────────────┘
            │                     │                     │
            └─────────────────────┼─────────────────────┘
                                  │
┌─────────────────────────────────▼─────────────────────────────────────────────┐
│                         API GATEWAY LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                      REST API (Node.js/Express)                       │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │  │
│  │  │ Auth         │ │ Reputation   │ │ Transactions │ │ Webhooks     │ │  │
│  │  │ Middleware   │ │ Endpoints    │ │ Endpoints    │ │ & Events     │ │  │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │  │
│  └────────────────────────────────────────┬─────────────────────────────┘  │
│                                           │                                  │
└───────────────────────────────────────────┼──────────────────────────────────┘
                                            │
┌───────────────────────────────────────────▼──────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ Scoring Engine   │  │ Data Ingestion   │  │ Validation       │          │
│  │ (Algorithm)      │  │ Pipeline         │  │ Service          │          │
│  │                  │  │                  │  │                  │          │
│  │ - ML Model       │  │ - File parsers   │  │ - Double-sig     │          │
│  │ - Risk calc      │  │ - API connectors │  │ - Fraud detect   │          │
│  │ - Recommend      │  │ - Data transform │  │ - Notifications  │          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │                      │
└───────────┼─────────────────────┼─────────────────────┼──────────────────────┘
            │                     │                     │
            └─────────────────────┼─────────────────────┘
                                  │
┌─────────────────────────────────▼─────────────────────────────────────────────┐
│                      BLOCKCHAIN LAYER (Avalanche)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         SMART CONTRACTS                               │  │
│  │                                                                        │  │
│  │  ┌─────────────────────────┐    ┌─────────────────────────┐          │  │
│  │  │ ReputationNFT.sol       │    │ TransactionRegistry.sol │          │  │
│  │  │                         │    │                         │          │  │
│  │  │ - Soulbound token       │    │ - Transaction storage   │          │  │
│  │  │ - Score tracking        │    │ - Validation logic      │          │  │
│  │  │ - Metadata URI          │    │ - Multi-party confirm   │          │  │
│  │  │ - Non-transferable      │    │ - Immutable record      │          │  │
│  │  └─────────────────────────┘    └─────────────────────────┘          │  │
│  │                                                                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Network: Avalanche Fuji Testnet (Production: Avalanche C-Chain)            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Component Details

### 1. Smart Contracts

#### ReputationNFT.sol
```solidity
// Core functionality
- createReputation(address pyme) → uint256 tokenId
- updateScore(uint256 tokenId, uint256 newScore)
- getReputation(address pyme) → Reputation struct
- hasReputation(address pyme) → bool

// Soulbound implementation
- _beforeTokenTransfer() override (blocks transfers)
- approve() override (reverts)
- setApprovalForAll() override (reverts)
```

**Key Features:**
- Soulbound (non-transferable) reputation token
- Score 0-1000 scale
- Tracks transaction count, validation rate, timestamps
- Only owner (PACTO protocol) can update scores

#### TransactionRegistry.sol
```solidity
// Core functionality
- registerTransaction(address counterparty, uint256 amount, string currency, string description) → bytes32 txHash
- validateTransaction(bytes32 txHash)
- getTransaction(bytes32 txHash) → Transaction struct
- getPymeTransactions(address pyme) → bytes32[]
- isFullyValidated(bytes32 txHash) → bool
```

**Key Features:**
- Double-validation required (both parties)
- Immutable on-chain record
- Efficient storage with struct packing
- Event emissions for indexing

---

### 2. Backend API

#### Authentication
```typescript
// JWT-based auth for institutions
POST /api/v1/auth/login
Headers: { "X-Institution-Key": "inst_xxx" }

// Rate limiting: 1000 req/min per institution
// API key validation
```

#### Core Endpoints

**Reputation API:**
```typescript
// Check reputation score
GET /api/v1/reputation/:walletAddress
Response: {
  wallet: string,
  score: number,
  riskLevel: "low" | "medium" | "high",
  metrics: {
    totalTransactions: number,
    validatedRate: number,
    volume12m: number,
    avgTransaction: number
  },
  timestamp: string
}

// Batch check (for institution dashboards)
POST /api/v1/reputation/batch
Body: { wallets: string[] }
```

**Transaction API:**
```typescript
// Register new transaction
POST /api/v1/transactions
Body: {
  counterparty: string,
  amount: string,
  currency: string,
  description: string,
  institutionId: string
}

// Get transaction details
GET /api/v1/transactions/:txHash

// Get institution's transactions
GET /api/v1/transactions?institutionId=xxx&status=pending
```

**Institution API:**
```typescript
// Onboard new institution (admin only)
POST /api/v1/institutions
Body: {
  name: string,
  type: "bank" | "fintech" | "accounting",
  branding: {
    logo: string,
    colors: { primary: string, secondary: string }
  },
  webhookUrl: string
}

// Get institution stats
GET /api/v1/institutions/:id/stats
Response: {
  totalPymes: number,
  totalTransactions: number,
  totalVolume: number,
  avgCreditScore: number
}
```

---

### 3. Scoring Algorithm

#### Reputation Score Formula (v1)

```
PACTO Score = Base + Volume Factor + Validation Factor + Time Factor

Where:
Base = 300 (minimum score)

Volume Factor = min(300, (totalVolume / 10000) * 10)
- Max 300 points for $30K+ monthly volume

Validation Factor = min(250, validatedTransactions * 5)
- Max 250 points for 50+ validated transactions
- Penalty for low validation rate (<70%)

Time Factor = min(150, monthsActive * 12)
- Max 150 points for 12+ months

Bonus Points:
+50 for 100% validation rate
+50 for 100+ transactions
+50 for $100K+ total volume

Max Score: 1000
```

#### Risk Assessment

```
Risk Level:
- LOW: Score >= 700, validation rate >= 90%, 6+ months
- MEDIUM: Score 500-699, validation rate >= 70%, 3+ months
- HIGH: Score < 500 OR validation rate < 70% OR < 3 months

Credit Recommendation:
- LOW risk: Up to 30% of annual volume
- MEDIUM risk: Up to 15% of annual volume
- HIGH risk: Decline or require collateral
```

---

### 4. Data Ingestion Pipeline

#### Supported Formats

**Accounting Software:**
- CONTPAQi: XML export parser
- Aspel: Database connector
- QuickBooks: REST API integration
- Xero: OAuth + API

**File Uploads:**
- CSV (transactions)
- PDF (invoices - OCR)
- Excel (financial statements)

**Banking APIs:**
- Open Banking (where available)
- Screen scraping (fallback)
- PDF statement parsing

#### Pipeline Flow

```
Raw Data → Validation → Normalization → Enrichment → Blockchain Storage
                ↓              ↓              ↓
          Schema check    Unit conversion   Counterparty lookup
          Data quality    Currency convert  Duplicate detection
```

---

### 5. Frontend Components

#### Institution Dashboard

**Pages:**
- `/dashboard` - Overview, stats, recent activity
- `/pymes` - List of onboarded PYMEs with scores
- `/transactions` - All transactions with filters
- `/analytics` - Charts, trends, reports
- `/settings` - Branding, API keys, webhooks

**Key Features:**
- White-label branding (colors, logo)
- Real-time score updates via WebSocket
- Export to PDF/Excel
- Role-based access (admin, analyst, viewer)

#### PYME Portal (White-Label)

**Embedded Widget:**
```html
<!-- Institution embeds this in their app -->
<div id="pacto-widget" 
     data-institution="banco_del_sur"
     data-wallet="0x..."
     data-theme="light">
</div>
<script src="https://cdn.pacto.io/widget.js"></script>
```

**Displays:**
- PACTO Score (large, prominent)
- Progress to next level
- Recent transactions
- Tips to improve score
- Credit offers (from institution)

---

## 🔐 Security Architecture

### 1. Smart Contract Security

**Access Control:**
- Only owner can update reputation scores
- Only transaction parties can validate
- Soulbound prevents reputation trading

**Upgradeability:**
- Proxy pattern for contract upgrades
- Timelock for critical changes
- Emergency pause functionality

### 2. API Security

```
Request Flow:
Client → Rate Limiter → Auth Middleware → Validator → Handler → Response
            ↓                ↓                ↓
        Redis (IP)      JWT verify      Input sanitize
```

**Measures:**
- API key + JWT authentication
- Rate limiting per institution
- Input validation (Zod schemas)
- SQL injection prevention (parameterized queries)
- XSS protection (output encoding)

### 3. Data Privacy

**On-Chain:**
- Only hashes and scores stored
- No PII on blockchain
- Transaction amounts public but pseudonymous

**Off-Chain:**
- Encrypted at rest (AES-256)
- TLS 1.3 in transit
- PII in separate, encrypted DB
- GDPR/CCPA compliant

---

## 📊 Infrastructure

### Deployment Architecture

```
Production (AWS/GCP):
┌─────────────────────────────────────────────────────────────┐
│  CDN (CloudFront)                                           │
│  ├── Static assets (Next.js)                                │
│  └── Widget.js                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Load Balancer (ALB)                                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  ECS/EKS Cluster                                            │
│  ├── Frontend (Next.js) - 3 replicas                        │
│  ├── API (Node.js) - 3 replicas                             │
│  └── Workers (ingestion) - 2 replicas                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Data Layer                                                 │
│  ├── PostgreSQL (primary DB)                                │
│  ├── Redis (cache + sessions)                               │
│  └── S3 (file storage)                                      │
└─────────────────────────────────────────────────────────────┘

Blockchain:
├── Avalanche C-Chain (production)
└── Avalanche Fuji (testnet/staging)
```

### Monitoring

**Tools:**
- Datadog / New Relic (APM)
- PagerDuty (alerts)
- CloudWatch (AWS metrics)
- Blocknative (blockchain monitoring)

**Key Metrics:**
- API response times (p50, p95, p99)
- Blockchain gas costs
- Transaction confirmation times
- Error rates by endpoint
- Institution usage patterns

---

## 🚀 Deployment Guide

### Local Development

```bash
# 1. Clone and install
git clone https://github.com/ElBrAyAn1967/Pacto.git
cd Pacto

# 2. Start local blockchain (anvil)
cd contracts
anvil --fork-url https://api.avax-test.network/ext/bc/C/rpc

# 3. Deploy contracts
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast

# 4. Start backend
cd ../backend
npm install
cp .env.example .env
npm run dev

# 5. Start frontend
cd ../frontend
npm install
cp .env.example .env.local
npm run dev
```

### Production Deployment

```bash
# 1. Deploy contracts to Avalanche C-Chain
forge script script/Deploy.s.sol --rpc-url $AVAX_MAINNET_RPC --broadcast

# 2. Update contract addresses in backend/frontend configs

# 3. Build and deploy backend
cd backend
docker build -t pacto-api .
docker push $ECR_REPO/pacto-api:latest
kubectl apply -f k8s/

# 4. Build and deploy frontend
cd ../frontend
npm run build
aws s3 sync out/ s3://pacto-dashboard-bucket
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
```

---

## 📚 API Documentation

See `API.md` for complete endpoint documentation with examples.

---

## 🔄 Future Roadmap

### Phase 2 (Q3 2026)
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Advanced ML scoring models
- [ ] Mobile SDK (iOS/Android)
- [ ] Insurance integration

### Phase 3 (Q1 2027)
- [ ] Cross-border reputation
- [ ] DAO governance for protocol
- [ ] Tokenized credit (NFT loans)
- [ ] Prediction markets for default risk

---

**Maintained by:** PACTO Engineering Team  
**Last Review:** May 2026  
**Next Review:** August 2026
