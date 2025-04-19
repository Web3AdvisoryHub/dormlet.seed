'use client';

import { motion } from 'framer-motion';

interface AvatarProps {
  position: {
    x: number;
    y: number;
  };
}

export default function Avatar({ position }: AvatarProps) {
  return (
    <motion.div
      className="w-16 h-16 bg-secondary rounded-full"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
} 