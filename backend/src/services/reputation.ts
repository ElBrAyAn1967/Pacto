import { logger } from '../utils/logger';

export interface ReputationData {
  wallet: string;
  pactoScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendedCredit: number;
  recommendedRate: number;
  metrics: {
    totalTransactions: number;
    validatedRate: number;
    volume12m: number;
    avgTransaction: number;
  };
  timestamp: string;
}

// Mock data for hackathon demo
const mockReputations: Record<string, ReputationData> = {
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e': {
    wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    pactoScore: 847,
    riskLevel: 'low',
    recommendedCredit: 180000,
    recommendedRate: 0.18,
    metrics: {
      totalTransactions: 47,
      validatedRate: 0.94,
      volume12m: 1200000,
      avgTransaction: 25532
    },
    timestamp: new Date().toISOString()
  },
  '0x891a23Bb4538d5f8e78d2Bc454e4438f44eCc66': {
    wallet: '0x891a23Bb4538d5f8e78d2Bc454e4438f44eCc66',
    pactoScore: 723,
    riskLevel: 'low',
    recommendedCredit: 120000,
    recommendedRate: 0.22,
    metrics: {
      totalTransactions: 32,
      validatedRate: 0.88,
      volume12m: 850000,
      avgTransaction: 26562
    },
    timestamp: new Date().toISOString()
  },
  '0x123b45Aa789d0e12f34a56Bc454e4438f44e90Ee': {
    wallet: '0x123b45Aa789d0e12f34a56Bc454e4438f44e90Ee',
    pactoScore: 654,
    riskLevel: 'medium',
    recommendedCredit: 80000,
    recommendedRate: 0.28,
    metrics: {
      totalTransactions: 28,
      validatedRate: 0.75,
      volume12m: 650000,
      avgTransaction: 23214
    },
    timestamp: new Date().toISOString()
  },
  '0x456c78Dd012b34a56Bc454e4438f44e123b45Aa': {
    wallet: '0x456c78Dd012b34a56Bc454e4438f44e123b45Aa',
    pactoScore: 589,
    riskLevel: 'medium',
    recommendedCredit: 45000,
    recommendedRate: 0.32,
    metrics: {
      totalTransactions: 19,
      validatedRate: 0.68,
      volume12m: 420000,
      avgTransaction: 22105
    },
    timestamp: new Date().toISOString()
  },
  '0x789d90Ee345c78Dd012b34a56Bc454e4438f44e': {
    wallet: '0x789d90Ee345c78Dd012b34a56Bc454e4438f44e',
    pactoScore: 912,
    riskLevel: 'low',
    recommendedCredit: 250000,
    recommendedRate: 0.15,
    metrics: {
      totalTransactions: 89,
      validatedRate: 0.97,
      volume12m: 2100000,
      avgTransaction: 23595
    },
    timestamp: new Date().toISOString()
  }
};

export const getReputation = async (wallet: string): Promise<ReputationData> => {
  const normalizedWallet = wallet.toLowerCase();
  
  // Check if we have mock data for this wallet
  const mockData = Object.values(mockReputations).find(
    r => r.wallet.toLowerCase() === normalizedWallet
  );
  
  if (mockData) {
    return {
      ...mockData,
      timestamp: new Date().toISOString()
    };
  }

  // Generate pseudo-random but consistent data for unknown wallets
  const seed = normalizedWallet.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const score = 500 + (seed % 450); // 500-950 range
  
  return {
    wallet,
    pactoScore: score,
    riskLevel: score > 750 ? 'low' : score > 600 ? 'medium' : 'high',
    recommendedCredit: Math.floor(score * 200),
    recommendedRate: score > 750 ? 0.18 : score > 600 ? 0.24 : 0.32,
    metrics: {
      totalTransactions: 10 + (seed % 90),
      validatedRate: 0.5 + (seed % 50) / 100,
      volume12m: 100000 + (seed % 900000),
      avgTransaction: 15000 + (seed % 35000)
    },
    timestamp: new Date().toISOString()
  };
};

export const checkReputationBatch = async (wallets: string[]): Promise<ReputationData[]> => {
  return Promise.all(wallets.map(wallet => getReputation(wallet)));
};

// In production, this would interact with the smart contract
export const calculateScore = (
  totalTransactions: number,
  validatedRate: number,
  volume12m: number,
  monthsActive: number
): number => {
  const base = 300;
  const volumeFactor = Math.min(300, (volume12m / 10000) * 10);
  const validationFactor = Math.min(250, totalTransactions * 5);
  const timeFactor = Math.min(150, monthsActive * 12);
  
  let score = base + volumeFactor + validationFactor + timeFactor;
  
  // Bonus points
  if (validatedRate >= 1) score += 50;
  if (totalTransactions >= 100) score += 50;
  if (volume12m >= 1000000) score += 50;
  
  return Math.min(1000, score);
};
