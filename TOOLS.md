# PACTO - Developer Tools & Environment

Quick reference for all tools, URLs, and configuration needed to work on PACTO.

---

## 🔗 Repository

```bash
# Clone
git clone https://github.com/ElBrAyAn1967/Pacto.git
cd Pacto

# Remotes
git remote -v
# origin  https://github.com/ElBrAyAn1967/Pacto.git (fetch)
# origin  https://github.com/ElBrAyAn1967/Pacto.git (push)
```

---

## 🌐 Local Development URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Next.js dev server |
| Backend API | http://localhost:3001 | Express API server |
| API Health | http://localhost:3001/health | Status check |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=3001
NODE_ENV=development

# Avalanche
AVALANCHE_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
REPUTATION_NFT_ADDRESS=0x0000000000000000000000000000000000000000
TRANSACTION_REGISTRY_ADDRESS=0x0000000000000000000000000000000000000000

# Security
JWT_SECRET=your-jwt-secret-here-min-32-chars
API_KEY=pacto_live_demo  # Change in production!

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=1000
```

### Frontend (`frontend/.env.local`)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=pacto_live_demo

# Blockchain
NEXT_PUBLIC_REPUTATION_NFT_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_TRANSACTION_REGISTRY_ADDRESS=0x0000000000000000000000000000000000000000
```

---

## 🧪 API Testing

### Quick Tests (curl)

```bash
# 1. Health Check
curl http://localhost:3001/health

# 2. Get Institution Stats
curl -H "X-API-KEY: pacto_live_demo" \
  http://localhost:3001/api/v1/institutions/stats

# 3. Get PYMEs List
curl -H "X-API-KEY: pacto_live_demo" \
  http://localhost:3001/api/v1/institutions/pymes

# 4. Get Reputation (single wallet)
curl -H "X-API-KEY: pacto_live_demo" \
  http://localhost:3001/api/v1/reputation/0x742d35Cc6634C0532925a3b844Bc454e4438f44e

# 5. Get Reputation Score only
curl -H "X-API-KEY: pacto_live_demo" \
  http://localhost:3001/api/v1/reputation/0x742d35Cc6634C0532925a3b844Bc454e4438f44e/score

# 6. Batch Check (POST)
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: pacto_live_demo" \
  -d '{"wallets": ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e", "0x891a23Bb4538d5f8e78d2Bc454e4438f44eCc66"]}' \
  http://localhost:3001/api/v1/reputation/check
```

### API Endpoints Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Health check |
| GET | `/api/v1/reputation/:wallet` | API Key | Full reputation data |
| GET | `/api/v1/reputation/:wallet/score` | API Key | Score only |
| POST | `/api/v1/reputation/check` | API Key | Batch check (max 100) |
| GET | `/api/v1/transactions/:txHash` | API Key | Transaction details |
| GET | `/api/v1/transactions/pyme/:wallet` | API Key | PYME transactions |
| GET | `/api/v1/institutions/stats` | API Key | Institution stats |
| GET | `/api/v1/institutions/pymes` | API Key | List of PYMEs |

---

## ⛓️ Blockchain

### Avalanche Networks

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| **Fuji (Testnet)** | 43113 | https://api.avax-test.network/ext/bc/C/rpc | https://subnets-test.avax.network/c-chain |
| **Mainnet** | 43114 | https://api.avax.network/ext/bc/C/rpc | https://subnets.avax.network/c-chain |

### Wallets

**Development Wallet:**
- Address: `0xEFa70602653Fd2d57b148910a9a2170f492FD59c`
- Used for: Contract deployment, testing

**Get Test AVAX:**
- https://faucet.avax.network/
- Request 10 AVAX for Fuji Testnet

### Contract Deployment

```bash
cd contracts

# Build
forge build

# Test
forge test

# Deploy to Fuji
forge script script/Deploy.s.sol --rpc-url fuji --broadcast

# Verify on Snowtrace
forge verify-contract \
  --chain-id 43113 \
  --num-of-optimizations 200 \
  --watch \
  <CONTRACT_ADDRESS> \
  src/ReputationNFT.sol:ReputationNFT
```

---

## 🚀 Deployment

### Backend (Railway/Render)

```bash
# Environment variables to set:
NODE_ENV=production
PORT=3001
AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc
REPUTATION_NFT_ADDRESS=<deployed_address>
TRANSACTION_REGISTRY_ADDRESS=<deployed_address>
JWT_SECRET=<strong_random_string>
API_KEY=<strong_api_key>
```

### Frontend (Vercel)

```bash
# Build command
npm run build

# Output directory
.next

# Environment variables
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_API_KEY=<production_api_key>
NEXT_PUBLIC_REPUTATION_NFT_ADDRESS=<deployed_address>
NEXT_PUBLIC_TRANSACTION_REGISTRY_ADDRESS=<deployed_address>
```

---

## 🐛 Debugging

### Backend Issues

```bash
# Check if running
lsof -i :3001

# Kill process if needed
kill -9 <PID>

# View logs
npm run dev 2>&1 | tee backend.log

# Test specific endpoint
curl -v http://localhost:3001/api/v1/institutions/stats \
  -H "X-API-KEY: pacto_live_demo"
```

### Frontend Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Build locally (catches production errors)
npm run build
```

### Common Errors

**CORS Error:**
- Check backend CORS origins include frontend URL
- Verify frontend is making requests to correct API URL

**API 401 Unauthorized:**
- Ensure X-API-KEY header is present
- Check API key matches backend configuration

**Module not found:**
- Run `npm install` in both frontend and backend
- Check Node.js version (18+)

---

## 📦 Dependencies

### System Requirements
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **Git:** Latest

### Backend Stack
- express: ^4.18.2
- cors: ^2.8.5
- helmet: ^7.1.0
- express-rate-limit: ^7.1.5
- viem: ^2.7.0
- zod: ^3.22.4
- winston: ^3.11.0

### Frontend Stack
- next: 14.2.0
- react: ^18.2.0
- typescript: ^5.3.0
- tailwindcss: ^3.4.0
- @rainbow-me/rainbowkit: ^2.0.0
- wagmi: ^2.5.0
- viem: ^2.7.0

---

## 🔧 Useful Commands

### Git
```bash
# Check status
git status

# View commit history
git log --oneline -10

# Create feature branch
git checkout -b feat/new-feature

# Push to origin
git push origin main

# Force push (careful!)
git push origin main --force-with-lease

# Remove node_modules from git
git rm -r --cached frontend/node_modules backend/node_modules
git add .gitignore
git commit -m "Remove node_modules from tracking"
```

### Database (Future)
```bash
# When PostgreSQL is added:
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

---

## 📞 Support

### Documentation
- **Avalanche Docs:** https://build.avax.network/docs
- **Foundry Book:** https://book.getfoundry.sh/
- **Next.js Docs:** https://nextjs.org/docs

### Communities
- **Avalanche Discord:** https://chat.avalabs.org/
- **Foundry Support:** https://github.com/foundry-rs/foundry
- **Next.js Discussions:** https://github.com/vercel/next.js/discussions

---

*Last updated: May 16, 2026*
