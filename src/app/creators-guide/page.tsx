'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DreamyLayout from '@/components/DreamyLayout';

export default function CreatorsGuidePage() {
  return (
    <DreamyLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Creator's Guide</h1>
          
          <div className="space-y-8">
            {/* Guide sections */}
            {[
              {
                title: "Getting Started",
                content: "Begin your journey as a creator in the Dormlit universe...",
                icon: "✨"
              },
              {
                title: "Creating Content",
                content: "Learn how to create and share your dreams with the community...",
                icon: "🎨"
              },
              {
                title: "Building Your Constellation",
                content: "Connect with other creators and build your network...",
                icon: "🌟"
              },
              {
                title: "Monetization",
                content: "Turn your creativity into a sustainable journey...",
                icon: "💫"
              }
            ].map((section, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{section.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                    <p className="text-white/80">{section.content}</p>
                    <button className="mt-4 btn-primary">Learn More</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DreamyLayout>
  );
} 