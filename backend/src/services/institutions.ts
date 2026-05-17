import { logger } from '../utils/logger';
import { getReputation } from './reputation';

export interface InstitutionStats {
  totalPymes: number;
  activePymes: number;
  totalVolume: number;
  avgScore: number;
  totalTransactions: number;
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
}

export interface InstitutionPyme {
  id: string;
  name: string;
  wallet: string;
  score: number;
  risk: 'low' | 'medium' | 'high';
  volume: number;
  transactions: number;
  status: 'active' | 'pending';
}

// Mock institution data
const mockInstitutionPymes: InstitutionPyme[] = [
  { id: '1', name: 'Distribuidora López S.A.', wallet: '0x742d...Cc66', score: 847, risk: 'low', volume: 1200000, transactions: 47, status: 'active' },
  { id: '2', name: 'Comercial García', wallet: '0x891a...23Bb', score: 723, risk: 'low', volume: 850000, transactions: 32, status: 'active' },
  { id: '3', name: 'Importadora Martínez', wallet: '0x123b...45Aa', score: 654, risk: 'medium', volume: 650000, transactions: 28, status: 'pending' },
  { id: '4', name: 'Servicios Técnicos Ruiz', wallet: '0x456c...78Dd', score: 589, risk: 'medium', volume: 420000, transactions: 19, status: 'active' },
  { id: '5', name: 'Construcciones Hernández', wallet: '0x789d...90Ee', score: 912, risk: 'low', volume: 2100000, transactions: 89, status: 'active' },
];

export const getInstitutionStats = async (institutionId: string): Promise<InstitutionStats> => {
  // In production, fetch from database
  const pymes = mockInstitutionPymes;
  
  return {
    totalPymes: pymes.length,
    activePymes: pymes.filter(p => p.status === 'active').length,
    totalVolume: pymes.reduce((acc, p) => acc + p.volume, 0),
    avgScore: Math.round(pymes.reduce((acc, p) => acc + p.score, 0) / pymes.length),
    totalTransactions: pymes.reduce((acc, p) => acc + p.transactions, 0),
    lowRisk: pymes.filter(p => p.risk === 'low').length,
    mediumRisk: pymes.filter(p => p.risk === 'medium').length,
    highRisk: pymes.filter(p => p.risk === 'high').length,
  };
};

export const getInstitutionPymes = async (institutionId: string): Promise<InstitutionPyme[]> => {
  // In production, fetch from database
  return mockInstitutionPymes;
};
