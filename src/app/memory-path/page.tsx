'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DreamyLayout from '@/components/DreamyLayout';

export default function MemoryPathPage() {
  return (
    <DreamyLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Memory Path</h1>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20" />
            
            {/* Memory entries */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="relative mb-8"
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`card ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-5/6`}>
                  <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white"
                    style={{ [i % 2 === 0 ? 'left' : 'right']: '-2px' }} />
                  <h3 className="text-xl font-semibold text-white mb-2">Memory #{i}</h3>
                  <p className="text-white/80">
                    A cherished moment in the constellation of memories...
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-white/60 text-sm">2 days ago</span>
                    <button className="btn-primary">View Details</button>
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