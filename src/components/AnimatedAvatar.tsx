'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { AvatarStyle } from '@/types/avatar';

interface AnimatedAvatarProps {
  style: AvatarStyle;
  onDracoBoxHover?: (isHovered: boolean) => void;
  onProfileButtonHover?: (isHovered: boolean) => void;
}

export default function AnimatedAvatar({ 
  style,
  onDracoBoxHover,
  onProfileButtonHover
}: AnimatedAvatarProps) {
  const [hasWaved, setHasWaved] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollY = useMotionValue(0);

  // Optimized breathing animation
  const breathingAnimation = useCallback(() => {
    if (!isInteracting) {
      controls.start({
        scale: [1, 1.02, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    }
  }, [controls, isInteracting]);

  // Optimized wave animation
  const waveAnimation = useCallback(() => {
    if (!hasWaved) {
      controls.start({
        rotate: [0, 15, -15, 0],
        transition: {
          duration: 1,
          ease: "easeInOut"
        }
      });
      setHasWaved(true);
    }
  }, [controls, hasWaved]);

  // Optimized scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        scrollY.set(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Optimized eye tracking
  const eyeY = useTransform(
    scrollY,
    [0, typeof window !== 'undefined' ? window.innerHeight : 0],
    [0, 20]
  );

  // Initialize animations
  useEffect(() => {
    breathingAnimation();
    waveAnimation();
  }, [breathingAnimation, waveAnimation]);

  // Handle interaction effects
  useEffect(() => {
    if (onDracoBoxHover) {
      onDracoBoxHover(isInteracting);
    }
  }, [isInteracting, onDracoBoxHover]);

  useEffect(() => {
    if (onProfileButtonHover) {
      onProfileButtonHover(isInteracting);
    }
  }, [isInteracting, onProfileButtonHover]);

  return (
    <motion.div
      ref={avatarRef}
      animate={controls}
      className="relative w-64 h-96 flex items-center justify-center"
      onHoverStart={() => setIsInteracting(true)}
      onHoverEnd={() => setIsInteracting(false)}
      style={{ willChange: 'transform' }}
    >
      {/* Base Avatar Container */}
      <div className="relative w-full h-full">
        {/* Head (Large and Expressive) */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gray-200 rounded-full"
          style={{
            transform: `scale(${style.hair.scale || 1}) translate(${style.hair.position?.x || 0}px, ${style.hair.position?.y || 0}px)`,
            willChange: 'transform',
          }}
        >
          {/* Face Features */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full" /> {/* Left Eye */}
          <motion.div 
            className="absolute top-1/4 right-1/2 translate-x-1/2 w-4 h-4 bg-black rounded-full"
            style={{ y: eyeY, willChange: 'transform' }}
          /> {/* Right Eye */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-16 h-4 bg-pink-200 rounded-full" /> {/* Mouth */}
        </motion.div>

        {/* Hair */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
          style={{
            backgroundColor: style.hair.color,
            transform: `scale(${style.hair.scale || 1}) translate(${style.hair.position?.x || 0}px, ${style.hair.position?.y || 0}px)`,
            willChange: 'transform',
          }}
        />

        {/* Body */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-24 h-40 flex flex-col items-center">
          {/* Top */}
          <motion.div
            className="w-full h-20 rounded-t-lg"
            style={{
              backgroundColor: style.top.color,
              transform: `scale(${style.top.scale || 1}) translate(${style.top.position?.x || 0}px, ${style.top.position?.y || 0}px)`,
              willChange: 'transform',
            }}
          />
          
          {/* Pants */}
          <motion.div
            className="w-full h-20 rounded-b-lg"
            style={{
              backgroundColor: style.pants.color,
              transform: `scale(${style.pants.scale || 1}) translate(${style.pants.position?.x || 0}px, ${style.pants.position?.y || 0}px)`,
              willChange: 'transform',
            }}
          />
        </div>
        
        {/* Shoes */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 flex justify-between"
          style={{
            transform: `scale(${style.shoes.scale || 1}) translate(${style.shoes.position?.x || 0}px, ${style.shoes.position?.y || 0}px)`,
            willChange: 'transform',
          }}
        >
          <div
            className="w-12 h-6 rounded-full"
            style={{ backgroundColor: style.shoes.color }}
          />
          <div
            className="w-12 h-6 rounded-full"
            style={{ backgroundColor: style.shoes.color }}
          />
        </motion.div>

        {/* Accessories */}
        {style.accessories.map((accessory, index) => (
          <motion.div
            key={accessory.id}
            className="absolute"
            style={{
              backgroundColor: accessory.color,
              transform: `scale(${accessory.scale || 1}) translate(${accessory.position?.x || 0}px, ${accessory.position?.y || 0}px)`,
              zIndex: index + 1,
              willChange: 'transform',
            }}
          >
            {accessory.name === 'Glasses' && (
              <div className="w-16 h-4 bg-transparent border-2 border-black rounded-full" />
            )}
            {accessory.name === 'Hat' && (
              <div className="w-20 h-8 rounded-t-full" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 