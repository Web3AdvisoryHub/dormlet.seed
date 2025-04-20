'use client';

import { motion } from 'framer-motion';

export default function PricingPage() {
  return (
    <main 
      className="min-h-screen bg-gradient-to-b from-indigo-100 via-violet-200 to-white p-8"
      style={{
        backgroundImage: 'url(/dream-bg.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center">DormLit Tiers</h1>
        
        {/* Pricing Tiers */}
        <div className="space-y-6">
          {/* Dream Trial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 rounded-xl p-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">Dream Trial</h2>
            <p className="text-indigo-600 font-medium mb-2">Free for 14 Days</p>
            <p className="text-gray-600">
              Begin your DormLit journey with 14 days of open access. All features unlocked.
            </p>
          </motion.div>

          {/* DormLit Core */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 rounded-xl p-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">DormLit Core</h2>
            <p className="text-indigo-600 font-medium mb-2">Free Forever</p>
            <p className="text-gray-600">
              After your trial, continue exploring with access to your profile, Dressing Room, and basic themes.
            </p>
          </motion.div>

          {/* DormLit Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 rounded-xl p-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-semibold text-indigo-800 mb-2">DormLit Premium</h2>
            <p className="text-indigo-600 font-medium mb-2">Coming Soon</p>
            <p className="text-gray-600 mb-2">
              Unlock secret rooms, avatar expansions, animated sticker loops, and more.
            </p>
            <p className="text-gray-600 italic">
              Early dreamers may be gifted permanent access...
            </p>
          </motion.div>
        </div>

        {/* TODO: Connect to real billing logic in Round Two. */}
      </motion.div>
    </main>
  );
} 