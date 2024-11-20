"use client"
import React , {useEffect} from 'react';
import { Bot, Languages, Menu, X, Sparkles, ArrowRight, Sun, Moon, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Code2, Globe2 } from 'lucide-react';

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

  const codeExample = `# convai/customer-service/agent.yml
name: "Customer Service"
system_prompt: "You are a helpful customer service agent..."
first_message: "Hi! How can I help you today?"
languages: ["es", "fr", "de", "it", "ja"]
tools:
  - name: check_order
    description: "Check order status"
    # ...

# Usage in React:
import { ConvAI } from '@conversational/react'

function App() {
  return (
    <ConvAI 
      agent="customer-service" 
      locale="es" 
    />
  )
}`;

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
      <section className="container mx-auto px-6 pt-32 lg:pt-40 pb-24 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(37,99,235,0.02),transparent_30%)]" />
        </div>
        
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
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

            <div className="lg:col-span-3 relative">
              <Tabs defaultValue="web" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="web" className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    Web Interface
                  </TabsTrigger>
                  <TabsTrigger value="dev" className="flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    Developer CLI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="web" className="border rounded-lg p-4 bg-white/80 backdrop-blur">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">System Prompt</label>
                      <textarea 
                        className="w-full p-2 border rounded-md h-24"
                        defaultValue="You are a helpful customer service agent..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Message</label>
                      <input 
                        type="text"
                        className="w-full p-2 border rounded-md"
                        defaultValue="Hi! How can I help you today?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Languages</label>
                      <div className="flex flex-wrap gap-2">
                        {["🇪🇸 ES", "🇫🇷 FR", "🇩🇪 DE", "🇮🇹 IT", "🇯🇵 JA"].map((lang) => (
                          <Badge key={lang} variant="secondary">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dev" className="border rounded-lg p-4 bg-white/80 backdrop-blur">
                  <div className="space-y-4">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <code>{codeExample}</code>
                    </pre>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">$ convAI sync</span>
                        <span className="text-gray-600">→ Sync changes across all languages</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">$ convAI deploy</span>
                        <span className="text-gray-600">→ Deploy agents to production</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-12 text-center relative overflow-hidden">
          {/* CTA content */}
        </div>
      </section>
    </div>
  );
}
