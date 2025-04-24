'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutDormlitPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-center mb-8">About Dormlit</h1>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-white/80">
              Dormlit is a space where creators can share their dreams and connect with their audience in meaningful ways.
              We believe in the power of community and the magic of shared experiences.
            </p>
          </section>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">The Team</h2>
            <p className="text-white/80">
              We're a constellation of dreamers, builders, and creators working together to make Dormlit a special place
              for everyone. Our team is growing, and we're always looking for new stars to join our journey.
            </p>
          </section>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">The Lore</h2>
            <p className="text-white/80">
              In the vast cosmos of digital spaces, Dormlit emerged as a beacon of creativity and connection.
              Each user's profile is a unique constellation, and every interaction adds a new star to our shared universe.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
} 