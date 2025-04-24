'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DreamyLayout from './DreamyLayout';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <DreamyLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">{title}</h1>
            {description && (
              <p className="text-white/80 text-center mb-8">{description}</p>
            )}
            <div className="prose prose-invert max-w-none">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </DreamyLayout>
  );
} 