'use client';

import { motion } from 'framer-motion';
import { FaPhone, FaComment, FaHeart, FaLink, FaTshirt } from 'react-icons/fa';

interface ProfileStackProps {
  showPhone: boolean;
  showText: boolean;
  showTribute: boolean;
  links: Array<{
    id: string;
    title: string;
    url: string;
    isActive: boolean;
  }>;
  onDressingRoomClick: () => void;
}

export default function ProfileStack({ 
  showPhone, 
  showText, 
  showTribute, 
  links,
  onDressingRoomClick 
}: ProfileStackProps) {
  const activeLinks = links.filter(link => link.isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed right-4 top-4 w-64 space-y-2"
    >
      <div className="bg-surface p-4 rounded-lg shadow-lg space-y-2">
        <button
          onClick={onDressingRoomClick}
          className="w-full flex items-center space-x-2 p-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          <FaTshirt />
          <span>Dressing Room</span>
        </button>
      </div>

      {(showPhone || showText || showTribute) && (
        <div className="bg-surface p-4 rounded-lg shadow-lg space-y-2">
          {showPhone && (
            <button className="w-full flex items-center space-x-2 p-2 bg-primary text-white rounded hover:bg-primary/90">
              <FaPhone />
              <span>Call Now</span>
            </button>
          )}
          {showText && (
            <button className="w-full flex items-center space-x-2 p-2 bg-primary text-white rounded hover:bg-primary/90">
              <FaComment />
              <span>Text Chat</span>
            </button>
          )}
          {showTribute && (
            <button className="w-full flex items-center space-x-2 p-2 bg-primary text-white rounded hover:bg-primary/90">
              <FaHeart />
              <span>Send Support</span>
            </button>
          )}
        </div>
      )}

      {activeLinks.length > 0 && (
        <div className="bg-surface p-4 rounded-lg shadow-lg space-y-2">
          {activeLinks.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-primary hover:bg-gray-100 rounded"
            >
              <FaLink />
              <span>{link.title}</span>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
} 