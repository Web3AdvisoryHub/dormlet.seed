'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DreamyLayout from '@/components/DreamyLayout';

export default function DreamJournalPage() {
  return (
    <DreamyLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Dream Journal</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for dream entries */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="card"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">Dream #{i}</h3>
                <p className="text-white/80">
                  A beautiful dream about stars and constellations...
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Last night</span>
                  <button className="btn-primary">Read More</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DreamyLayout>
  );
} 