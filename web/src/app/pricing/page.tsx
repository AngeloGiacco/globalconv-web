"use client"
import React, { useEffect } from 'react';
import Nav from '../../components/Nav' 

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
      <Nav />

      {/* Simplified Pricing Content */}
      <section className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            Let's talk 
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Honestly, we just launched so we're still trying to figure out pricing! let's find something that works for both of us!
          </p>
          
          {/* Calendar Section */}
          <div id="sales-cal-inline" className="w-full mx-auto rounded-lg overflow-hidden shadow-2xl border border-gray-200" />
        </div>
      </section>
    </div>
  );
}

