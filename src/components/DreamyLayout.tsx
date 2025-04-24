'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StarrySky } from './StarrySky';

interface DreamyLayoutProps {
  children: React.ReactNode;
}

export default function DreamyLayout({ children }: DreamyLayoutProps) {
  return (
    <div className="min-h-screen relative">
      <StarrySky />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
} 