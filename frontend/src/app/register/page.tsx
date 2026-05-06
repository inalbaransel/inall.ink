'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/api.service';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [username, setUsername] = useState(searchParams.get('username') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.register({ username, email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/admin');
      } else {
        setError('Kayıt başarılı ancak giriş yapılamadı. Lütfen giriş yapınız.');
      }
    } catch (err: any) {
      if (err.response?.data?.details) {
        setError(err.response.data.details[0].message);
      } else {
        setError(err.response?.data?.error || 'Bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-xl text-sm text-center font-medium">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</label>
        <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-gray-900 px-4 py-3">
          <span className="text-gray-400 font-medium mr-1">inall.ink/</span>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-900"
            placeholder="kullaniciadi"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="ornek@email.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="••••••••"
          required
        />
      </div>
      
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-4 disabled:opacity-50"
      >
        {loading ? 'Kaydediliyor...' : 'Ücretsiz Üye Ol'}
      </button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            inallink
          </Link>
          <h2 className="text-2xl font-bold mt-6 mb-2">Aramıza Katılın</h2>
          <p className="text-gray-500">Kendi dijital alanınızı oluşturun</p>
        </div>

        <Suspense fallback={<div className="text-center text-gray-500">Yükleniyor...</div>}>
          <RegisterForm />
        </Suspense>

        <p className="text-center mt-6 text-gray-500 text-sm">
          Zaten hesabınız var mı?{' '}
          <Link href="/login" className="text-gray-900 font-semibold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
