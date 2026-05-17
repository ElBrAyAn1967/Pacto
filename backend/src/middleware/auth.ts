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

  // Demo mode - accept any key starting with pacto_live_
  if (apiKey.startsWith('pacto_live_') || apiKey === 'demo') {
    req.institution = {
      id: 'demo-institution',
      name: 'Demo Bank'
    };
    return next();
  }

  // In production, validate against database
  // For hackathon, we accept demo keys
  req.institution = {
    id: 'demo-institution',
    name: 'Demo Bank'
  };
  next();
};
