"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-50/30">
      <section className="container mx-auto px-6 lg:pt-40 pb-24 relative">
        <div className="max-w-[85rem] mx-auto text-center">
          <Badge variant="secondary" className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 mb-6 select-none">
            <span className="flex w-2 h-2 rounded-full bg-blue-600 animate-pulse mr-2" />
            Documentation
          </Badge>

          <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl lg:leading-tight mt-2">
            Documentation
            <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Coming Soon
            </span>
          </h1>

          <div className="mt-8 max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              We're working hard to create comprehensive documentation for getconversational.ai. Check back soon!
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-blue-200/50 rounded-full px-8"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
