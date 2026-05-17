import { logger } from '../utils/logger';

export interface Transaction {
  id: string;
  txHash: string;
  pyme: string;
  counterparty: string;
  amount: number;
  currency: string;
  description: string;
  status: 'validated' | 'pending';
  timestamp: string;
  type: 'sale' | 'purchase' | 'service';
}

// Mock transactions for demo
const mockTransactions: Transaction[] = [
  {
    id: '1',
    txHash: '0x7f8d9e2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e',
    pyme: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    counterparty: 'Agrícola del Norte',
    amount: 25000,
    currency: 'MXN',
    description: 'Venta de insumos agrícolas',
    status: 'validated',
    timestamp: '2026-05-15T10:30:00Z',
    type: 'sale'
  },
  {
    id: '2',
    txHash: '0x8a9e3f4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f',
    pyme: '0x891a23Bb4538d5f8e78d2Bc454e4438f44eCc66',
    counterparty: 'Mayoreo Central',
    amount: 18000,
    currency: 'MXN',
    description: 'Compra de mercancía',
    status: 'pending',
    timestamp: '2026-05-14T14:20:00Z',
    type: 'purchase'
  },
  {
    id: '3',
    txHash: '0x9b0f4a5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a',
    pyme: '0x123b45Aa789d0e12f34a56Bc454e4438f44e90Ee',
    counterparty: 'Distribuidora Sur',
    amount: 45000,
    currency: 'MXN',
    description: 'Venta mayorista productos',
    status: 'validated',
    timestamp: '2026-05-13T09:15:00Z',
    type: 'sale'
  },
  {
    id: '4',
    txHash: '0x0c1a5b6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    pyme: '0x456c78Dd012b34a56Bc454e4438f44e123b45Aa',
    counterparty: 'Industrias Unidas',
    amount: 8500,
    currency: 'MXN',
    description: 'Servicios de mantenimiento',
    status: 'validated',
    timestamp: '2026-05-12T16:45:00Z',
    type: 'service'
  }
];

export const getTransaction = async (txHash: string): Promise<Transaction | null> => {
  return mockTransactions.find(tx => tx.txHash === txHash) || null;
};

export const getPymeTransactions = async (wallet: string): Promise<Transaction[]> => {
  const normalizedWallet = wallet.toLowerCase();
  return mockTransactions.filter(tx => tx.pyme.toLowerCase() === normalizedWallet);
};

export const registerTransaction = async (
  pyme: string,
  counterparty: string,
  amount: number,
  currency: string,
  description: string
): Promise<Transaction> => {
  // In production, this would call the smart contract
  const newTx: Transaction = {
    id: Date.now().toString(),
    txHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
    pyme,
    counterparty,
    amount,
    currency,
    description,
    status: 'pending',
    timestamp: new Date().toISOString(),
    type: 'sale'
  };
  
  mockTransactions.push(newTx);
  logger.info(`New transaction registered: ${newTx.txHash}`);
  
  return newTx;
};
