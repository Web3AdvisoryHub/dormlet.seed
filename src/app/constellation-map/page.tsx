'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DreamyLayout from '@/components/DreamyLayout';

export default function ConstellationMapPage() {
  return (
    <DreamyLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Constellation Map</h1>
          
          <div className="relative aspect-square bg-black/30 rounded-xl overflow-hidden">
            {/* Interactive constellation map will go here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/60 text-lg">Interactive constellation map coming soon...</p>
            </div>
            
            {/* Constellation points */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Constellation info cards */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">Constellation #{i}</h3>
                <p className="text-white/80">
                  A beautiful pattern of stars in the night sky...
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Discovered recently</span>
                  <button className="btn-primary">Explore</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DreamyLayout>
  );
} 