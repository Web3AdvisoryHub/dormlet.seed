'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ClaimedStarsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-center mb-8">Claimed Stars</h1>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Public Constellations</h2>
            <p className="text-white/80 mb-4">
              Explore the constellations created by our community. Each star represents a unique moment or connection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Placeholder for constellation cards */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="h-32 bg-white/10 rounded-lg mb-2"></div>
                  <h3 className="font-medium">Constellation {i}</h3>
                  <p className="text-sm text-white/60">Created by @user{i}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Featured Stars</h2>
            <p className="text-white/80">
              These are the most recent and popular constellations in our community.
              Each one tells a unique story of connection and creativity.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
} 