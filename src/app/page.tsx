"use client"
import React , {useEffect} from 'react';
import { ArrowRight, Sun, Moon} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Code2, Globe2 } from 'lucide-react';
import WebDemo from '@/components/WebDemo';
import CliDemo from '@/components/CliDemo';


export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

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
      elementOrSelector: "#demo-cal-inline",
      config: { "layout": "month_view" },
      calLink: "angelo-giacco/getconversational.ai-15-mins", // Replace with your actual calendar link
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
          const calendarElement = document.getElementById('demo-cal-inline');
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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-50/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 supports-[backdrop-filter]:bg-white/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="ml-10 flex items-center space-x-3">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
                Conversational
              </span>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-full px-4">
                  How it Works
                </Button>
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-full px-4">
                  Pricing
                </Button>
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-full px-4">
                  Docs
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
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 lg:pt-40 pb-24 relative">
        
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-start">
            <div className="lg:col-span-4">
              <Badge variant="secondary" className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 mb-6 select-none">
                <span className="flex w-2 h-2 rounded-full bg-blue-600 animate-pulse mr-2" />
                YC W24
              </Badge>

              <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl lg:leading-tight">
                Effortlessly deploy and manage conversational AI agents in
                <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                  30+ languages
                </span>
              </h1>

              <div className="mt-8 space-y-5 lg:space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Scale globally with AI agents embedded in your website that speak your customers' language while you manage everything in your native language.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-blue-200/50 rounded-full px-8"
                >
                  Try Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8"
                >
                  Book Demo
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3 relative lg:sticky lg:top-24">
              <Tabs defaultValue="web" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="web" className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    Web
                  </TabsTrigger>
                  <TabsTrigger value="dev" className="flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    CLI
                  </TabsTrigger>
                </TabsList>

                <div className="relative h-[600px]">
                  <TabsContent value="web" className="absolute inset-0 border rounded-lg bg-white/80 backdrop-blur">
                    <WebDemo />
                  </TabsContent>

                  <TabsContent value="dev" className="absolute inset-0 border rounded-lg bg-white/80 backdrop-blur">
                    <CliDemo />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">60 seconds</div>
              <div className="text-sm text-gray-600">Deploy new agents in all languages in &lt;1 minute</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">30+</div>
              <div className="text-sm text-gray-600">Languages Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">Fully customisable</div>
              <div className="text-sm text-gray-600">Add your knowledge base, tools etc</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-4 bg-gradient-to-b from-white to-blue-50/30">
        <div id="demo-cal-inline" className="w-full rounded-lg overflow-hidden" />
      </section>
    </div>
  );
}
