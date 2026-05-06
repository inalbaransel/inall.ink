import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/links/reorder (Auth Protected)
export const reorderLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Yetkisiz erişim.' });
      return;
    }

    const { links } = req.body; // { id: string, orderIndex: number }[] (Validated via Zod)

    // Authorization & Veri Bütünlüğü Kontrolü:
    // Sadece kullanıcının kendine ait olan linkleri güncellediğinden emin olmak için
    // linklerin bu kullanıcıya ait olduğunu doğrulayalım.
    const linkIds = links.map((l: any) => l.id);
    const existingLinks = await prisma.linkItem.findMany({
      where: {
        id: { in: linkIds },
        userId: userId
      },
      select: { id: true }
    });

    if (existingLinks.length !== linkIds.length) {
      res.status(403).json({ error: 'Bazı linkler bulunamadı veya bunları güncelleme yetkiniz yok.' });
      return;
    }

    // Toplu Güncelleme İşlemi (Prisma Transaction)
    // Eğer transaction'da tek bir işlem bile patlarsa hiçbir şey değişmez.
    await prisma.$transaction(
      links.map((link: { id: string; orderIndex: number }) => 
        prisma.linkItem.update({
          where: { id: link.id },
          data: { orderIndex: link.orderIndex }
        })
      )
    );

    res.json({ message: 'Link sıralaması başarıyla güncellendi.' });
  } catch (error) {
    console.error('reorderLinks Error:', error);
    res.status(500).json({ error: 'Sunucu hatası oluştu.' });
  }
};
