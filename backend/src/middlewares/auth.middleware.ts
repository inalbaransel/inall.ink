import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Request tipini genişletiyoruz
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  
  // Authorization başlığı "Bearer <token>" formatında olmalıdır.
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Yetkilendirme hatası: Token bulunamadı.' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET || 'super-secret-key-change-in-prod';

  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string; username: string };
    
    // Doğrulanan kullanıcı bilgilerini request nesnesine ekliyoruz
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Geçersiz veya süresi dolmuş token.' });
  }
};
