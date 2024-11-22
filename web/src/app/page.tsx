"use client"
import React , {useEffect} from 'react';
import { ArrowRight, Sun, Moon, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Code2, Globe2 } from 'lucide-react';
import WebDemo from '../components/WebDemo';
import CliDemo from '../components/CliDemo';
import AnalyticsDemo from '../components/AnalyticsDemo';
import Link from 'next/link';
import { IntlConvAI } from '../components/IntlConv';


export default function Home() {
  const [mounted, setMounted] = React.useState(false);

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

  const scrollToCalendar = () => {
    const calendarElement = document.getElementById('demo-cal-inline');
    if (calendarElement) {
      calendarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/5 to-blue-100/10">
      {/* Updated Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Conversational Logo" className="h-12 w-auto" />
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-full px-4">
                  <Link href="pricing">Pricing</Link>
                </Button>
                <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-full px-4">
                  <Link href="docs">Documentation</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Link href="login"><Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all rounded-full px-8">
                  Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button></Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="container mx-auto px-6 pt-24 lg:pt-32 pb-16 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#e0f2fe,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#dbeafe,_transparent_60%)]" />
        </div>
        
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-7 lg:gap-x-12 xl:gap-x-16 lg:items-center">
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-6">
                <Badge variant="secondary" className="inline-flex items-center rounded-full px-5 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 mb-6 select-none border border-blue-100">
                  <span className="flex w-2 h-2 rounded-full bg-blue-600 animate-pulse mr-2" />
                  Now live
                </Badge>

                <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl lg:leading-tight">
                  Effortlessly deploy and manage conversational AI agents in
                  <span className="relative">
                    <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                      30+ languages
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600/30 rounded-full blur-sm" />
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Scale globally with AI agents embedded in your website. Work in your language, serve your customers in theirs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all rounded-full px-8 py-6 text-lg"
                  onClick={scrollToCalendar}
                >
                  Book Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-6 text-lg"
                >
                  View docs
                </Button>
              </div>
            </div>

            {/* Enhanced Demo Section */}
            <div className="lg:col-span-3 relative lg:sticky lg:top-28">
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-100/50 via-white to-blue-50/50 rounded-2xl blur-3xl transform -rotate-6" />
              <Tabs defaultValue="web" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 p-1 bg-gray-100/80 backdrop-blur rounded-full h-[42px]">
                  <TabsTrigger value="web" className="flex items-center gap-2 data-[state=active]:shadow-none rounded-full">
                    <Globe2 className="h-4 w-4" />
                    Manage via Web
                  </TabsTrigger>
                  <TabsTrigger value="dev" className="flex items-center gap-2 data-[state=active]:shadow-none rounded-full">
                    <Code2 className="h-4 w-4" />
                    Manage via CLI
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:shadow-none rounded-full">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>

                <div className="relative h-[600px] rounded-2xl shadow-2xl">
                  <TabsContent value="web" className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur">
                    <WebDemo />
                  </TabsContent>

                  <TabsContent value="dev" className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur">
                    <CliDemo />
                  </TabsContent>

                  <TabsContent value="analytics" className="absolute inset-0 rounded-2xl">
                    <AnalyticsDemo />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
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
      <section className="container mx-auto px-4 py-12 bg-transparent">
        <div id="demo-cal-inline" className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-white/95 backdrop-blur" />
      </section>

      <IntlConvAI orgKey='b72f0d77-57d0-4417-b998-62db58197b8e' locale='de' agentName='sales-agent' />
    </div>
  );
}
