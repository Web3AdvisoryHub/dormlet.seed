'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-center mb-8">Dormlit Policies</h1>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="text-white/80">
              Welcome to Dormlit! By using our platform, you agree to these terms. We're building a space for creators
              to share their dreams and connect with their audience in meaningful ways.
            </p>
            <p className="text-white/60 text-sm mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-white/80">
              Your privacy is important to us. We collect minimal data necessary to provide our services and ensure
              a safe, enjoyable experience for all users.
            </p>
            <p className="text-white/60 text-sm mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>

          <section className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Community Guidelines</h2>
            <p className="text-white/80">
              Be kind, be creative, be yourself. We're building a community where everyone can feel safe to express
              themselves and connect with others.
            </p>
            <p className="text-white/60 text-sm mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
} 