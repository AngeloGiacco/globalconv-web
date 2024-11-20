"use client"
import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingPage() {
    useEffect(() => {
        (function (C, A, L) {
          // @ts-expect-error -- Cal any
          const p = function (a, ar) { a.q.push(ar); };
          const d = C.document;
          // @ts-expect-error -- Cal global namespace
          C.Cal = C.Cal || function (...args: unknown[]) {
            // @ts-expect-error -- Cal instance
            const cal = C.Cal;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (args[0] === L) {
              const api = (...apiArgs: unknown[]) => { p(api, apiArgs); };
              const namespace = args[1];
              // @ts-expect-error -- Cal instance
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = api;
                p(cal, ["initNamespace", namespace]);
              } else {
                p(cal, args);
              }
              return;
            }
            p(cal, args);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");
        
        // @ts-expect-error -- Cal instance
        Cal("init", "getconversational.ai-15-mins");
        // @ts-expect-error -- Cal instance
        Cal.ns["getconversational.ai-15-mins"]("inline", {
          elementOrSelector: "#sales-cal-inline",
          config: { "layout": "month_view" },
          calLink: "angelo-giacco/getconversational.ai-15-mins",
        });
        // @ts-expect-error -- Cal instance
        Cal.ns["getconversational.ai-15-mins"]("ui", {
          "styles": { "branding": { "brandColor": "#dc2626" } }, // Using red-600
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
    
        return () => {
          // Cleanup code
          // @ts-expect-error -- Cal instance
          if (window.Cal && window.Cal.ns && window.Cal.ns["getconversational.ai-15-mins"]) {
            try {
              const calendarElement = document.getElementById('sales-cal-inline');
              if (calendarElement) {
                calendarElement.innerHTML = '';
              }
              // @ts-expect-error -- Cal instance
              delete window.Cal.ns["getconversational.ai-15-mins"];
              const calScript = document.querySelector('script[src*="cal.com/embed/embed.js"]');
              if (calScript) {
                calScript.remove();
              }
            } catch (error) {
              console.error('Error cleaning up Cal.com widget:', error);
            }
          }
        };
      }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-50/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 supports-[backdrop-filter]:bg-white/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="ml-14 flex items-center space-x-3">
              <Link href="/">
                <img src="/logo.png" alt="Conversational Logo" className="h-16 w-auto" />
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
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Simplified Pricing Content */}
      <section className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            Talk to sales
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Connect with our sales team to explore how our solutions can benefit your business.
          </p>
          
          {/* Calendar Section */}
          <div id="sales-cal-inline" className="w-full mx-auto rounded-lg overflow-hidden shadow-2xl border border-gray-200" />
        </div>
      </section>
    </div>
  );
}
