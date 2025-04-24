'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const StarrySky: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const createStars = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();
      
      // Clear existing stars
      container.innerHTML = '';
      starsRef.current = [];

      // Create new stars
      const starCount = Math.floor((width * height) / 1000); // Adjust density as needed
      
      for (let i = 0; i < starCount; i++) {
        const star: Star = {
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1, // 1-3px
          duration: Math.random() * 2 + 1, // 1-3s
          delay: Math.random() * 2 // 0-2s
        };
        
        starsRef.current.push(star);
        
        const starElement = document.createElement('div');
        starElement.className = 'star';
        starElement.style.left = `${star.x}px`;
        starElement.style.top = `${star.y}px`;
        starElement.style.width = `${star.size}px`;
        starElement.style.height = `${star.size}px`;
        starElement.style.animationDuration = `${star.duration}s`;
        starElement.style.animationDelay = `${star.delay}s`;
        
        container.appendChild(starElement);
      }
    };

    createStars();
    
    // Recreate stars on window resize
    const handleResize = () => {
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="starry-sky fixed inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <style jsx>{`
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 2s infinite ease-in-out alternate;
        }

        @keyframes twinkle {
          from { opacity: 0.3; transform: scale(1); }
          to { opacity: 0.9; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}; 