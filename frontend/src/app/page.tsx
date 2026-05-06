'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/register?username=${encodeURIComponent(username.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="w-full px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight text-gray-900">
          inallink
        </div>
        <div className="space-x-4">
          <Link 
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Giriş Yap
          </Link>
          <Link 
            href="/register"
            className="text-sm font-medium px-5 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors shadow-sm"
          >
            Üye Ol
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Her Şeyiniz Tek Bir Linkte
          </h1>
          <p className="text-xl text-gray-500 mb-12">
            Dijital kimliğinizi oluşturun, yönetin ve tüm dünyayla paylaşın.
          </p>

          {/* Username Claim Form */}
          <form onSubmit={handleClaim} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <div className="flex items-center w-full bg-white rounded-full pl-6 pr-2 py-2 shadow-lg border border-gray-100 focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-transparent transition-all">
              <span className="text-gray-400 font-medium text-lg">inall.ink/</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="kullaniciadi"
                className="w-full bg-transparent border-none outline-none text-lg text-gray-900 font-medium placeholder-gray-300 ml-1 py-2"
                required
              />
              <button
                type="submit"
                className="whitespace-nowrap bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Hemen Al
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
