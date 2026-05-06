import React from 'react';
import { useStore } from '@/store/useStore';
import { LinkList } from '../links/LinkList';
import { AppearanceSettings } from '../appearance/AppearanceSettings';
import { PreviewPhone } from '../preview/PreviewPhone';
import { Smartphone, LayoutDashboard, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout = () => {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar / Left Panel (60%) */}
      <div className="flex-1 max-w-[60%] flex flex-col border-r border-gray-200 bg-white shadow-sm z-10">
        
        {/* Header Tabs */}
        <div className="flex items-center space-x-8 px-8 h-20 border-b border-gray-100">
          <div className="flex items-center space-x-2 text-xl font-bold tracking-tight text-gray-900">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
              <Smartphone className="text-white w-4 h-4" />
            </div>
            <span>inallink</span>
          </div>

          <div className="flex space-x-1 ml-10 p-1 bg-gray-100 rounded-2xl">
            <button
              onClick={() => setActiveTab('LINKS')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'LINKS'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Linkler</span>
            </button>
            <button
              onClick={() => setActiveTab('APPEARANCE')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'APPEARANCE'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Görünüm</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'LINKS' ? <LinkList /> : <AppearanceSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Preview (40%) */}
      <div className="w-[40%] bg-gray-50 flex items-center justify-center relative overflow-hidden">
        {/* Decorative background blurs for Apple aesthetic */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <PreviewPhone />
      </div>
    </div>
  );
};
