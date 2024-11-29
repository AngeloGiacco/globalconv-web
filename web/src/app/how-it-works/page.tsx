"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import { Badge } from '@/components/ui/badge';

export default function HowItWorks() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/5 to-blue-100/10 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full mix-blend-multiply animate-drift" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-purple-100/40 to-transparent rounded-full mix-blend-multiply animate-drift-slow" />
      </div>

      <Nav />

      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="container mx-auto px-6 pt-32 lg:pt-40 pb-16 relative"
      >
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-6">
            <Badge 
              variant="secondary" 
              className="inline-flex items-center rounded-full px-5 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-600 mb-6 select-none border border-blue-100/50 backdrop-blur-sm"
            >
              How It Works
            </Badge>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              Multilingual Conversational AI Agents Made Easy
            </h1>

            <div className="space-y-8">
              <motion.div 
                variants={fadeInUp} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What's great</h2>
                <p className="text-gray-600 leading-relaxed">
                  You can now create conversational AI agents in seconds in 30+ languages that can help your company with sales, customer success, coaching and lots more. This will bring a level of dynamism to companies that we have not seen before.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What sucks</h2>
                <p className="text-gray-600 leading-relaxed">
                  Enhancing the performance of these conversational AI agents in 30+ languages requires understanding the nuances of each langauge to prompt better performance from the model. In addition, there's no infrastructure to easily run analytics over a specific agent (which we define as a combination of prompt + tools) across languages, particularly if you only speak one of them.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How we make it less sucky</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our platform streamlines the creation and management of multilingual AI agents. Define an agent once in your native language, either in the web app or from command line, and we'll generate the same agent across 30+ languages, already prompt engineered for performance. We also provide out of the box analytics, so you can analyse an agent's performance across languages and for each language. Want to see how the Hindi-speaking sales agent is performing or how all the customer success agents are performing? Its only a natural language prompt away. 
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why we're doing this</h2>
                <p className="text-gray-600 leading-relaxed">
                  Multilingual conversational AI will make the world more dynamic and decentralised. Facilitating the use of multilingual conversational AI agents  increases competition between global corporations but also helps democratise access to quality education, coaching, customer service etc, all of which we think are wins for humanity.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
