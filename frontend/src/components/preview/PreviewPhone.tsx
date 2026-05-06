import React from 'react';
import { useStore, ButtonStyle } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Hash } from 'lucide-react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import clsx from 'clsx';

const getIcon = (type: string, url: string) => {
  if (type === 'HEADER') return null;
  if (type === 'SOCIAL') {
    if (url.includes('instagram')) return <FaInstagram className="w-5 h-5" />;
    if (url.includes('twitter') || url.includes('x.com')) return <FaTwitter className="w-5 h-5" />;
    if (url.includes('linkedin')) return <FaLinkedin className="w-5 h-5" />;
  }
  return <LinkIcon className="w-5 h-5" />;
};

const getButtonStyleClasses = (style: ButtonStyle, isHeader: boolean) => {
  if (isHeader) return 'bg-transparent text-current shadow-none justify-center font-bold text-lg';
  
  switch (style) {
    case 'SOLID':
      return 'bg-gray-900 text-white shadow-md hover:scale-[1.02] border border-transparent';
    case 'OUTLINE':
      return 'bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-50';
    case 'SOFT_GLASS':
      return 'bg-white/40 backdrop-blur-md text-gray-900 shadow-sm border border-white/50 hover:bg-white/50';
    default:
      return '';
  }
};

export const PreviewPhone = () => {
  const { appearance, links } = useStore();
  const activeLinks = links.filter((l) => l.isActive);

  // Determine if background is a hex color or gradient/image based on value. 
  // For simplicity, applying directly to style if it looks like a hex/rgb, 
  // but if user types tailwind classes or gradients, we handle it in style tag.
  const isGradient = appearance.backgroundColor.includes('gradient');

  return (
    <div className="relative w-[340px] h-[720px] rounded-[55px] border-[12px] border-black bg-black shadow-2xl overflow-hidden ring-4 ring-gray-200">
      {/* Notch / Dynamic Island */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20"></div>

      {/* Screen Area */}
      <div 
        className="relative w-full h-full overflow-y-auto scrollbar-hide flex flex-col items-center px-6 pt-16 pb-12 transition-colors duration-500"
        style={{ background: isGradient ? appearance.backgroundColor : appearance.backgroundColor }}
      >
        {/* Profile Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center mb-8 w-full"
        >
          <img 
            src={appearance.avatarUrl || 'https://i.pravatar.cc/150'} 
            alt="Profile Avatar" 
            className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white/20 mb-4"
          />
          <h1 className="text-xl font-bold tracking-tight text-center" style={{ color: appearance.buttonStyle === 'SOLID' ? '#000' : 'inherit' }}>
            {appearance.name || 'Your Name'}
          </h1>
          <p className="text-sm font-medium mt-2 text-center opacity-70">
            {appearance.bio || 'Your bio goes here...'}
          </p>
        </motion.div>

        {/* Links Section */}
        <div className="w-full flex flex-col space-y-4">
          <AnimatePresence>
            {activeLinks.map((link, index) => {
              const isHeader = link.type === 'HEADER';
              return (
                <motion.a
                  key={link.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                  href={isHeader ? '#' : link.url}
                  target={isHeader ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={clsx(
                    'flex items-center w-full p-4 rounded-2xl transition-all duration-300',
                    getButtonStyleClasses(appearance.buttonStyle, isHeader)
                  )}
                  style={{ pointerEvents: isHeader ? 'none' : 'auto' }}
                >
                  <div className="flex-shrink-0 mr-3">
                    {getIcon(link.type, link.url)}
                  </div>
                  <span className={clsx("flex-1 text-center font-medium", isHeader ? '' : 'pr-8')}>
                    {link.title || 'Untitled'}
                  </span>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
