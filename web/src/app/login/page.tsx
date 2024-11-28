"use client"
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import Nav from '../../components/Nav';

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
      <Nav />
      
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
