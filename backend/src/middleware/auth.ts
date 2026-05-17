import { Request, Response, NextFunction } from 'express';

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      institution?: {
        id: string;
        name: string;
      };
    }
  }
}

export const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.toString().replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'API key required. Include X-API-KEY header or Authorization: Bearer <key>'
    });
  }

  // Get allowed API keys from environment
  const allowedKeys = process.env.API_KEY?.split(',') || ['pacto_live_demo'];
  
  // Validate API key
  if (allowedKeys.includes(apiKey) || apiKey.startsWith('pacto_live_')) {
    req.institution = {
      id: 'demo-institution',
      name: 'Demo Bank'
    };
    return next();
  }

  // Invalid API key
  return res.status(401).json({
    error: 'Unauthorized',
    message: 'Invalid API key'
  });
};
