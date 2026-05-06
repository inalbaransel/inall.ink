import { z } from 'zod';
import { AvatarStyle, ButtonStyle } from '@prisma/client';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Sadece harf, rakam ve alt çizgi kullanılabilir'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: z.string().min(1, 'Şifre zorunludur'),
  }),
});

export const updateProfileSettingsSchema = z.object({
  body: z.object({
    avatarUrl: z.string().url('Geçerli bir URL olmalıdır').optional().nullable(),
    avatarStyle: z.nativeEnum(AvatarStyle).optional(),
    backgroundColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'Geçerli bir HEX kodu olmalıdır').optional(),
    buttonStyle: z.nativeEnum(ButtonStyle).optional(),
    buttonColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'Geçerli bir HEX kodu olmalıdır').optional(),
    fontColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'Geçerli bir HEX kodu olmalıdır').optional(),
  }),
});

export const createLinkSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Başlık zorunludur').max(100, 'Başlık çok uzun'),
    url: z.string().url('Geçerli bir URL giriniz'),
    isActive: z.boolean().optional(),
  }),
});

export const reorderLinksSchema = z.object({
  body: z.object({
    links: z.array(
      z.object({
        id: z.string().uuid(),
        orderIndex: z.number().int().min(0),
      })
    ).min(2, 'Sıralama için en az 2 link gönderilmelidir'),
  }),
});
