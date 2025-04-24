'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StickerVault } from '@/components/StickerVault';
import { StarrySky } from '@/components/StarrySky';
import { useRouter } from 'next/navigation';

const MAX_LINKS = 20;

// Enhanced Avatar component with sticker support
const Avatar = ({ stickerUrl, onStickerClick }: { stickerUrl?: string; onStickerClick?: () => void }) => (
  <motion.div 
    className="relative w-32 h-32 bg-white/10 rounded-full border-4 border-white cursor-pointer"
    onClick={onStickerClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {stickerUrl ? (
      <img 
        src={stickerUrl} 
        alt="Profile Sticker" 
        className="w-full h-full object-contain rounded-full"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-white/60">
        Add Sticker
      </div>
    )}
  </motion.div>
);

// Enhanced DracoBox with sticker vault integration
const DracoBox = ({ onOpenVault }: { onOpenVault: () => void }) => (
  <motion.div 
    className="w-full p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onOpenVault}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-white/80">DracoBox</h3>
        <p className="text-white/40">Click to view your sticker collection</p>
      </div>
      <div className="text-2xl">✨</div>
    </div>
  </motion.div>
);

const UserProfilePage = () => {
  const router = useRouter();
  const [handle, setHandle] = useState('@cosmic.seed');
  const [bio, setBio] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState('');
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isDmEnabled, setIsDmEnabled] = useState(true);

  const handleAddLink = () => {
    if (links.length >= MAX_LINKS) {
      alert('You can only add up to 20 links.');
      return;
    }
    if (newLink.trim()) {
      setLinks([...links, newLink.trim()]);
      setNewLink('');
    }
  };

  const handleStickerSelect = (sticker: any) => {
    setSelectedSticker(sticker.imageUrl);
    setIsVaultOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white p-6 relative">
      <StarrySky />
      
      {/* Avatar with Sticker Support */}
      <motion.div 
        className="mt-16 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar 
          stickerUrl={selectedSticker || undefined}
          onStickerClick={() => handleNavigation('/stickers')}
        />
      </motion.div>

      {/* Handle */}
      <motion.h2 
        className="text-lg font-medium mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        @cosmic.seed
      </motion.h2>

      {/* Bio Section */}
      <motion.div 
        className="w-full max-w-2xl h-48 overflow-y-auto bg-white/5 p-4 rounded-md mb-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <textarea
          placeholder="Write your bio..."
          maxLength={8000}
          className="w-full h-full bg-transparent resize-none focus:outline-none text-white placeholder-white/40"
        />
      </motion.div>

      {/* Link Stack */}
      <motion.div 
        className="w-full max-w-2xl mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Add a link..."
            className="flex-1 p-2 rounded bg-white/10 text-white placeholder-white/40 border border-white/20"
          />
          <button
            onClick={handleAddLink}
            disabled={links.length >= MAX_LINKS}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 disabled:opacity-50"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-white/10 rounded hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* DM Toggle */}
      <motion.div 
        className="w-full max-w-2xl mb-6 flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
          <h3 className="text-lg font-medium">Direct Messages</h3>
          <p className="text-white/60">Allow others to contact you</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isDmEnabled}
            onChange={() => setIsDmEnabled(!isDmEnabled)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </motion.div>

      {/* DracoBox with Vault Integration */}
      <div className="w-full max-w-2xl mb-6">
        <DracoBox onOpenVault={() => handleNavigation('/dracobox')} />
      </div>

      {/* Footer */}
      <motion.footer 
        className="w-full text-center py-4 border-t border-white/10 text-sm mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <a 
          href="/home" 
          className="text-white hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/home');
          }}
        >
          Join dormlet.gro
        </a>
      </motion.footer>

      {/* Sticker Vault Modal */}
      <StickerVault
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onSelectSticker={handleStickerSelect}
      />
    </div>
  );
};

export default UserProfilePage; 