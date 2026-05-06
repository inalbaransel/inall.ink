import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-prod';

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı adı veya email zaten var mı kontrolü
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    });

    if (existingUser) {
      res.status(400).json({ error: 'Bu kullanıcı adı veya e-posta adresi zaten kullanılıyor.' });
      return;
    }

    // Şifreyi hashle
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Kullanıcıyı ve boş bir ProfileSettings oluştur (Transaction ile)
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        profileSettings: {
          create: {} // Default ayarlarla profili oluştur
        }
      }
    });

    // JWT oluştur
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });
      return;
    }

    // JWT oluştur
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Giriş başarılı',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
};
