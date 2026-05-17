import { Router } from 'express';
import { z } from 'zod';
import { getReputation, checkReputationBatch } from '../services/reputation';
import { authenticateApiKey } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const checkReputationSchema = z.object({
  wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')
});

const batchCheckSchema = z.object({
  wallets: z.array(z.string().regex(/^0x[a-fA-F0-9]{40}$/)).max(100)
});

// Get reputation for a single wallet
router.get('/:wallet', authenticateApiKey, async (req, res, next) => {
  try {
    const { wallet } = req.params;
    const reputation = await getReputation(wallet);
    
    res.json({
      success: true,
      data: reputation
    });
  } catch (error) {
    next(error);
  }
});

// Batch check reputation
router.post('/check', authenticateApiKey, validateRequest(batchCheckSchema), async (req, res, next) => {
  try {
    const { wallets } = req.body;
    const results = await checkReputationBatch(wallets);
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    next(error);
  }
});

// Get reputation score only (lightweight)
router.get('/:wallet/score', authenticateApiKey, async (req, res, next) => {
  try {
    const { wallet } = req.params;
    const reputation = await getReputation(wallet);
    
    res.json({
      success: true,
      data: {
        wallet,
        pactoScore: reputation.pactoScore,
        riskLevel: reputation.riskLevel
      }
    });
  } catch (error) {
    next(error);
  }
});

export { router as reputationRouter };
