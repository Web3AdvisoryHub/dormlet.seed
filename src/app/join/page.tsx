'use client';

import React from 'react';
import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

export default function JoinPage() {
  return (
    <PageLayout 
      title="Join Our Team"
      description="Be part of something special"
    >
      <div className="space-y-8">
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Why Join Us?</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            This is where the Join page will live. We're building something amazing and we want you to be part of it.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3">For Creators</h3>
            <p className="text-white/80">
              Share your unique perspective and connect with an engaged audience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3">For Developers</h3>
            <p className="text-white/80">
              Help us build the next generation of interactive experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3">For Designers</h3>
            <p className="text-white/80">
              Shape the future of digital storytelling and user experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3">For Everyone</h3>
            <p className="text-white/80">
              Be part of a community that values creativity and innovation.
            </p>
          </motion.div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Get Started</h2>
          <p className="text-white/80 mb-6">
            Ready to join us? Create an account and start your journey.
          </p>
          <a 
            href="/signup"
            className="btn-primary inline-block"
          >
            Sign Up Now
          </a>
        </section>
      </div>
    </PageLayout>
  );
} 