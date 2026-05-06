import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { LinkIcon, Share2, Type } from 'lucide-react';

interface AddWidgetMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWidgetMenu: React.FC<AddWidgetMenuProps> = ({ isOpen, onClose }) => {
  const { addLink } = useStore();

  const handleAdd = (type: 'CUSTOM' | 'SOCIAL' | 'HEADER') => {
    let title = 'Yeni Bağlantı';
    let url = 'https://';
    
    if (type === 'HEADER') {
      title = 'Yeni Başlık';
      url = '';
    } else if (type === 'SOCIAL') {
      title = 'Sosyal Medya';
    }

    addLink({
      type,
      title,
      url,
      isActive: true,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 grid grid-cols-3 gap-2"
        >
          <button
            onClick={() => handleAdd('CUSTOM')}
            className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center shadow-sm mb-2 transition-colors">
              <LinkIcon className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Bağlantı</span>
          </button>

          <button
            onClick={() => handleAdd('SOCIAL')}
            className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-blue-50 group-hover:bg-white rounded-full flex items-center justify-center shadow-sm mb-2 transition-colors">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Sosyal</span>
          </button>

          <button
            onClick={() => handleAdd('HEADER')}
            className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-purple-50 group-hover:bg-white rounded-full flex items-center justify-center shadow-sm mb-2 transition-colors">
              <Type className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Başlık</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
