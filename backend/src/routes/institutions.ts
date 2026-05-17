import { Router } from 'express';
import { getInstitutionStats, getInstitutionPymes } from '../services/institutions';
import { authenticateApiKey } from '../middleware/auth';

const router = Router();

// Get institution stats
router.get('/stats', authenticateApiKey, async (req, res, next) => {
  try {
    const institutionId = req.institution?.id;
    const stats = await getInstitutionStats(institutionId || 'demo');
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// Get institution's PYMEs
router.get('/pymes', authenticateApiKey, async (req, res, next) => {
  try {
    const institutionId = req.institution?.id;
    const pymes = await getInstitutionPymes(institutionId || 'demo');
    
    res.json({
      success: true,
      data: pymes
    });
  } catch (error) {
    next(error);
  }
});

export { router as institutionRouter };
