# PACTO - Project Context

> White-Label Reputation Infrastructure for Financial Institutions on Avalanche

## 🎯 Project Overview

**What:** PACTO enables banks and fintechs to assess creditworthiness of "invisible" PYMEs using alternative data and blockchain-verified reputation scores.

**Stack:**
- **Frontend:** Next.js 14 + TypeScript + TailwindCSS (Core.app dark theme)
- **Backend:** Express.js + TypeScript + Node.js
- **Blockchain:** Solidity + Foundry (Avalanche C-Chain/Fuji)
- **API:** REST with API Key authentication

**GitHub:** https://github.com/ElBrAyAn1967/Pacto

---

## 📊 Phase Status

| Phase | Status | Description | Key Deliverables |
|-------|--------|-------------|------------------|
| **Phase 1: Core Infrastructure** | ✅ DONE | Backend, contracts, frontend scaffold | API working, contracts written, UI scaffolded |
| **Phase 2: Integration** | ✅ DONE | Frontend-backend connection, UI polish | API client, dark theme, dashboard functional |
| **Phase 3: Production** | ⏳ IN PROGRESS | Deploy contracts, video demo, documentation | Fuji deployment pending, video pending |

### Current Tickets
- [x] Backend Express API with routes
- [x] Smart contracts (ReputationNFT, TransactionRegistry)
- [x] Frontend Next.js with Core.app theme
- [x] API integration frontend-backend
- [ ] Deploy contracts to Fuji Testnet
- [ ] Record video demo
- [ ] Final push to GitHub

---

## 🏗️ Architecture Rules

### ⚠️ CRITICAL - Do NOT Violate

1. **NEVER push node_modules**
   - Always use .gitignore
   - Run `npm install` locally

2. **Backend port MUST be 3001**
   - Frontend expects API at localhost:3001
   - CORS configured for this port

3. **Frontend port MUST be 3000**
   - Default Next.js dev port
   - Backend CORS allows this origin

4. **API_KEY required for all /api/v1/* endpoints**
   - Header: `X-API-KEY` or `Authorization: Bearer <key>`
   - Demo key: `pacto_live_demo` (for development only)

5. **Contract addresses in .env files only**
   - Never hardcode addresses in components
   - Use NEXT_PUBLIC_ prefix for frontend env vars

### 🔧 Best Practices

- Use conventional commits: `type(scope): description`
- One feature = one commit (atomic)
- Update this file before pushing
- Test API endpoints before committing

---

## 🛠️ Commands

### Backend
```bash
cd backend
npm install
npm run dev          # Starts on http://localhost:3001
npm run build        # Compile TypeScript
npm start            # Production mode
```

### Frontend
```bash
cd frontend
npm install
npm run dev          # Starts on http://localhost:3000
npm run build        # Production build
```

### Testing API
```bash
# Health check
curl http://localhost:3001/health

# Get institution stats
curl -H "X-API-KEY: pacto_live_demo" \
  http://localhost:3001/api/v1/institutions/stats

# Get PYMEs list
curl -H "X-API-KEY: pacto_live_demo" \
  http://localhost:3001/api/v1/institutions/pymes

# Get reputation
curl -H "X-API-KEY: pacto_live_demo" \
  http://localhost:3001/api/v1/reputation/0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

---

## 📁 File Structure

```
pacto/
├── backend/                    # Express API
│   ├── src/
│   │   ├── server.ts          # Entry point
│   │   ├── routes/            # API routes
│   │   │   ├── reputation.ts
│   │   │   ├── transactions.ts
│   │   │   └── institutions.ts
│   │   ├── services/          # Business logic
│   │   │   ├── reputation.ts
│   │   │   ├── transactions.ts
│   │   │   └── institutions.ts
│   │   ├── middleware/        # Auth, validation, errors
│   │   │   ├── auth.ts
│   │   │   ├── validateRequest.ts
│   │   │   └── errorHandler.ts
│   │   └── utils/
│   │       └── logger.ts
│   ├── .env                   # Environment variables (NOT in git)
│   └── package.json
│
├── frontend/                   # Next.js 14
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css    # Core.app theme styles
│   │   │   ├── institution/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── dashboard/
│   │   │   │       └── page.tsx
│   │   │   └── providers.tsx  # Wagmi/RainbowKit config
│   │   ├── lib/
│   │   │   ├── api.ts         # API client
│   │   │   └── contracts.ts   # Smart contract ABIs
│   │   └── hooks/
│   │       ├── useReputation.ts
│   │       └── useTransactions.ts
│   ├── .env.local             # Frontend env vars (NOT in git)
│   └── package.json
│
├── contracts/                  # Foundry/Solidity
│   ├── src/
│   │   ├── ReputationNFT.sol
│   │   └── TransactionRegistry.sol
│   ├── script/
│   │   └── Deploy.s.sol
│   └── foundry.toml
│
└── docs/                       # Documentation
    ├── PROPUESTA-NEGOCIO-PACTO.md
    ├── TECHNICAL-ARCHITECTURE.md
    └── ARCHITECTURE.md
```

---

## ⚠️ Known Issues

### CRITICAL
- ⚠️ **Git push fails** - node_modules in git history
  - Fix: `git rm -r --cached frontend/node_modules backend/node_modules`
  - Then: `git add .gitignore && git commit -m "Remove node_modules"`

- ⚠️ **API key hardcoded** - `pacto_live_demo` in auth.ts
  - Should be in .env only
  - Risk: Low (demo purposes only)

- ⚠️ **CORS permissive** - allows localhost origins
  - Should restrict to specific domains in production

### MEDIUM
- ⚠️ **No input sanitization** on search queries
  - Could be vulnerable to ReDoS with very long strings
  - Fix: Add max length validation

- ⚠️ **No caching** - every request hits backend
  - Stats could be cached 5 min
  - Consider Redis for production

### LOW
- ⚠️ **Frontend npm install slow** - many dependencies
  - Use `npm install --prefer-offline` for faster installs
  - Or use yarn/pnpm

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Update .env with production API keys
- [ ] Set proper CORS origins
- [ ] Enable rate limiting
- [ ] Add error monitoring (Sentry)
- [ ] Add analytics

### Backend Deployment
- [ ] Deploy to Railway/Render/AWS
- [ ] Set environment variables
- [ ] Verify health endpoint
- [ ] Test all API endpoints

### Frontend Deployment
- [ ] Deploy to Vercel/Netlify
- [ ] Set NEXT_PUBLIC_API_URL
- [ ] Verify build succeeds
- [ ] Test all routes

### Blockchain Deployment
- [ ] Get Fuji testnet AVAX from faucet
- [ ] Deploy contracts: `forge script script/Deploy.s.sol --rpc-url fuji --broadcast`
- [ ] Verify contracts on Snowtrace
- [ ] Update contract addresses in .env

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview, quick start |
| `PROPUESTA-NEGOCIO-PACTO.md` | Business model, GTM strategy |
| `TECHNICAL-ARCHITECTURE.md` | System design, API specs |
| `ARCHITECTURE.md` | Visual diagrams, data flows |
| `CLAUDE.md` | This file - project context |
| `TOOLS.md` | Environment setup, credentials |

---

## 🔗 External Resources

- **Avalanche Docs:** https://build.avax.network/docs
- **Fuji Faucet:** https://faucet.avax.network/
- **Snowtrace (Testnet):** https://subnets-test.avax.network/c-chain
- **Foundry Book:** https://book.getfoundry.sh/
- **Next.js Docs:** https://nextjs.org/docs

---

## 📝 Last Commit Log

**Latest Commit:** `ce4b5e3`
**Branch:** main
**Status:** Frontend redesign with Core.app dark theme done
**Changes:**
- Complete UI redesign (globals.css, tailwind.config)
- Landing page, login, dashboard dark theme
- API integration working
- Push pending due to node_modules

**Next Actions:**
1. Fix git push (remove node_modules)
2. Deploy contracts to Fuji
3. Record video demo
4. Submit to hackathon

---

*Last updated: May 16, 2026*
*Maintained by: PACTO Engineering Team*
