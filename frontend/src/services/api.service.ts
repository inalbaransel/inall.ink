import { api } from '@/lib/axios';

export const authService = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
};

export const profileService = {
  getPublicProfile: (username: string) => api.get(`/users/${username}`),
  getSettings: () => api.get('/profile/settings'),
  updateSettings: (data: any) => api.put('/profile/settings', data),
};

export const linkService = {
  reorder: (links: { id: string; orderIndex: number }[]) => api.put('/links/reorder', { links }),
  create: (data: any) => api.post('/links', data),
  update: (id: string, data: any) => api.put(`/links/${id}`, data),
  delete: (id: string) => api.delete(`/links/${id}`),
};
