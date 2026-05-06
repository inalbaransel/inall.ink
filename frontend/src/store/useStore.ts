import { create } from 'zustand';

export type ButtonStyle = 'SOLID' | 'OUTLINE' | 'SOFT_GLASS';

export interface LinkItem {
  id: string;
  type: 'CUSTOM' | 'SOCIAL' | 'HEADER';
  title: string;
  url: string;
  isActive: boolean;
  icon?: string;
}

export interface AppearanceSettings {
  avatarUrl: string;
  name: string;
  bio: string;
  backgroundColor: string;
  buttonStyle: ButtonStyle;
}

interface AppState {
  // Tabs: 'LINKS' or 'APPEARANCE'
  activeTab: 'LINKS' | 'APPEARANCE';
  setActiveTab: (tab: 'LINKS' | 'APPEARANCE') => void;

  // Appearance
  appearance: AppearanceSettings;
  updateAppearance: (settings: Partial<AppearanceSettings>) => void;

  // Links
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, 'id'>) => void;
  updateLink: (id: string, data: Partial<LinkItem>) => void;
  removeLink: (id: string) => void;
  reorderLinks: (startIndex: number, endIndex: number) => void;
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'LINKS',
  setActiveTab: (tab) => set({ activeTab: tab }),

  appearance: {
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    name: 'John Doe',
    bio: 'Digital Creator | Minimalist',
    backgroundColor: '#f3f4f6', // soft gray
    buttonStyle: 'SOFT_GLASS',
  },
  updateAppearance: (settings) => 
    set((state) => ({ appearance: { ...state.appearance, ...settings } })),

  links: [
    { id: '1', type: 'CUSTOM', title: 'My Portfolio', url: 'https://example.com', isActive: true },
    { id: '2', type: 'SOCIAL', title: 'Instagram', url: 'https://instagram.com', isActive: true, icon: 'instagram' },
  ],
  addLink: (link) =>
    set((state) => ({
      links: [...state.links, { ...link, id: crypto.randomUUID() }],
    })),
  updateLink: (id, data) =>
    set((state) => ({
      links: state.links.map((l) => (l.id === id ? { ...l, ...data } : l)),
    })),
  removeLink: (id) =>
    set((state) => ({
      links: state.links.filter((l) => l.id !== id),
    })),
  reorderLinks: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.links);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { links: result };
    }),
}));
