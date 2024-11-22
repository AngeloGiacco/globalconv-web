"use client"
import React, { useState } from 'react';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-50/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 supports-[backdrop-filter]:bg-white/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="ml-14 flex items-center space-x-3">
              <Link href="/">
                <Image 
                  src="/logo.png"
                  alt="Logo" 
                  width={150}
                  height={150}
                  priority
                />
              </Link>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-full px-4">
                  <Link href="pricing">Pricing</Link>
                </Button>
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-full px-4">
                  <Link href="docs">Docs</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow transition-all rounded-full px-6">
                  Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Section */}
      <section className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow transition-all rounded-full px-6">
              Login
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
