import React from 'react';
import { useStore, ButtonStyle } from '@/store/useStore';
import clsx from 'clsx';

export const AppearanceSettings = () => {
  const { appearance, updateAppearance } = useStore();

  const predefinedColors = [
    '#f3f4f6', // Gray
    '#000000', // Black
    '#ffffff', // White
    '#fecaca', // Yellow/Red soft
    '#bfdbfe', // Red soft
    '#bbf7d0', // Blue soft
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Gradient 1
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Gradient 2
  ];

  return (
    <div className="max-w-2xl mx-auto w-full space-y-12 pb-32">
      {/* Profile Info Section */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>
        
        <div className="flex items-center space-x-6 mb-8">
          <img 
            src={appearance.avatarUrl} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
          />
          <div className="flex-1">
            <label className="block w-full cursor-pointer bg-gray-900 hover:bg-gray-800 text-white text-center py-2.5 rounded-xl font-medium transition-colors">
              Fotoğraf Yükle
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">İsim</label>
            <input 
              type="text" 
              value={appearance.name}
              onChange={(e) => updateAppearance({ name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Biyografi</label>
            <textarea 
              value={appearance.bio}
              onChange={(e) => updateAppearance({ bio: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all resize-none"
            />
          </div>
        </div>
      </section>

      {/* Theme Settings Section */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Tema ve Renkler</h2>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">Arka Plan Rengi</label>
          <div className="flex flex-wrap gap-3">
            {predefinedColors.map((color, i) => (
              <button
                key={i}
                onClick={() => updateAppearance({ backgroundColor: color })}
                className={clsx(
                  "w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                  appearance.backgroundColor === color ? "border-gray-900 scale-110" : "border-transparent"
                )}
                style={{ background: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Buton Stili</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => updateAppearance({ buttonStyle: 'SOLID' })}
              className={clsx(
                "p-4 rounded-xl border-2 transition-all flex flex-col items-center",
                appearance.buttonStyle === 'SOLID' ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="w-full h-8 bg-gray-900 rounded-lg mb-2 shadow-sm"></div>
              <span className="text-xs font-semibold text-gray-700">İçi Dolu</span>
            </button>

            <button
              onClick={() => updateAppearance({ buttonStyle: 'OUTLINE' })}
              className={clsx(
                "p-4 rounded-xl border-2 transition-all flex flex-col items-center",
                appearance.buttonStyle === 'OUTLINE' ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="w-full h-8 border-2 border-gray-900 rounded-lg mb-2"></div>
              <span className="text-xs font-semibold text-gray-700">Çizgili</span>
            </button>

            <button
              onClick={() => updateAppearance({ buttonStyle: 'SOFT_GLASS' })}
              className={clsx(
                "p-4 rounded-xl border-2 transition-all flex flex-col items-center",
                appearance.buttonStyle === 'SOFT_GLASS' ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="w-full h-8 bg-gray-200/50 backdrop-blur border border-gray-300 rounded-lg mb-2"></div>
              <span className="text-xs font-semibold text-gray-700">Soft Cam</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
