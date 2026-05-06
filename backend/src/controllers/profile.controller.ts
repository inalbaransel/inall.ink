import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/users/:username (Public Endpoint)
export const getPublicProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        profileSettings: true,
        links: {
          where: { isActive: true },
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            title: true,
            url: true,
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('getPublicProfile Error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
};

// GET /api/profile/settings (Auth Protected)
export const getProfileSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
       res.status(401).json({ error: 'Yetkisiz erişim.' });
       return;
    }

    const settings = await prisma.profileSettings.findUnique({
      where: { userId }
    });

    res.json(settings || {});
  } catch (error) {
    console.error('getProfileSettings Error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
};

// PUT /api/profile/settings (Auth Protected)
export const updateProfileSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
       res.status(401).json({ error: 'Yetkisiz erişim.' });
       return;
    }

    const updateData = req.body; // Validation middleware ile zaten kontrol ediliyor.

    const settings = await prisma.profileSettings.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        ...updateData
      }
    });

    res.json(settings);
  } catch (error) {
    console.error('updateProfileSettings Error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
};
