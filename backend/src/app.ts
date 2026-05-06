import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { authenticateToken } from './middlewares/auth.middleware';
import { validate } from './middlewares/validate.middleware';
import { registerSchema, loginSchema, updateProfileSettingsSchema, reorderLinksSchema } from './validators/schema.validator';
import { registerController, loginController } from './controllers/auth.controller';
import { getPublicProfile, getProfileSettings, updateProfileSettings } from './controllers/profile.controller';
import { reorderLinks } from './controllers/link.controller';

const app = express();

// Security Middlewares
app.use(helmet());

// CORS configuration explicitly configured
app.use(cors({
  origin: '*', // Production'da bunu process.env.FRONTEND_URL veya spesifik domain(ler) ile değiştirmelisin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Rate Limiter for Auth Routes (Brute-Force Protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { error: 'Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// -- Public Routes --
app.post('/api/auth/register', authLimiter, validate(registerSchema), registerController);
app.post('/api/auth/login', authLimiter, validate(loginSchema), loginController);
app.get('/api/users/:username', getPublicProfile);

// -- Protected Routes (Requires JWT) --
app.use('/api/profile', authenticateToken);
app.use('/api/links', authenticateToken);

// Profile Settings
app.get('/api/profile/settings', getProfileSettings);
app.put('/api/profile/settings', validate(updateProfileSettingsSchema), updateProfileSettings);

// Links
app.put('/api/links/reorder', validate(reorderLinksSchema), reorderLinks);
// app.post('/api/links', validate(createLinkSchema), createLink);
// app.put('/api/links/:id', validate(createLinkSchema), updateLink);
// app.delete('/api/links/:id', deleteLink);

export default app;
