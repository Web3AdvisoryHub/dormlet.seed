'use client';

import { useState } from 'react';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import ProfilePanel from '@/components/ProfilePanel';
import DracoBox from '@/components/DracoBox';
import ProfileStack from '@/components/ProfileStack';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [showDracoBox, setShowDracoBox] = useState(true);
  const [showLinks, setShowLinks] = useState(true);
  const [showFriendBox, setShowFriendBox] = useState(false); // Future use

  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 bg-gradient-to-b from-indigo-100 to-white">
      {/* Avatar Section */}
      <motion.div 
        className="mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedAvatar />
      </motion.div>
      
      {/* Profile Panel */}
      <motion.div 
        className="mb-6 max-w-md w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProfilePanel />
      </motion.div>

      {/* Stackable Sections */}
      <motion.div 
        className="space-y-6 w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {showLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileStack />
          </motion.div>
        )}
        
        {/* DracoBox Container */}
        {showDracoBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="bg-white/60 rounded-xl shadow-lg p-4 backdrop-blur-sm">
              {/* TODO: In future releases, DracoBox becomes a portal to Dormlit Dream. */}
              <DracoBox />
            </div>
          </motion.div>
        )}
        
        {/* Future: Friend Highlight Section */}
        {showFriendBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* <FriendHighlight /> */}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
} 