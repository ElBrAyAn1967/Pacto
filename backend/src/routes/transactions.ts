import { Router } from 'express';
import { z } from 'zod';
import { getTransaction, getPymeTransactions } from '../services/transactions';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

// Get transaction by hash
router.get('/:txHash', authenticateApiKey, async (req, res, next) => {
  try {
    const { txHash } = req.params;
    const transaction = await getTransaction(txHash);
    
    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
});

// Get all transactions for a PYME
router.get('/pyme/:wallet', authenticateApiKey, async (req, res, next) => {
  try {
    const { wallet } = req.params;
    const transactions = await getPymeTransactions(wallet);
    
    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
});

export { router as transactionRouter };
