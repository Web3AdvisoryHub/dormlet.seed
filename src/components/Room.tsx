'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface RoomProps {
  children: ReactNode;
}

export default function Room({ children }: RoomProps) {
  const roomRef = useRef<HTMLDivElement>(null);

  // Optimize for mobile viewport
  useEffect(() => {
    const setViewportHeight = () => {
      if (typeof window !== 'undefined') {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <motion.div
      ref={roomRef}
      className="relative w-full h-[100vh] h-[calc(var(--vh,1vh)*100)] bg-surface overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
} 