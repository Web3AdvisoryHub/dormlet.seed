'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaEnvelope, FaPhone, FaHeart, FaLock } from 'react-icons/fa';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const [isDmOpen, setIsDmOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [supportAmount, setSupportAmount] = useState(0);

  const handleSendMessage = () => {
    // Handle message sending logic
    setMessage('');
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const handleSendSupport = () => {
    // Handle support sending logic
    setSupportAmount(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 100 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed right-0 top-0 h-full w-80 bg-surface p-4 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>
      </div>

      {/* Interaction Buttons */}
      <div className="space-y-4 mb-6">
        <button
          onClick={() => setIsDmOpen(true)}
          className="w-full flex items-center justify-between p-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span>Text Chat</span>
          <span className="text-sm">$1/min</span>
        </button>

        <button
          onClick={isCallActive ? handleEndCall : handleStartCall}
          className="w-full flex items-center justify-between p-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span>Voice Call</span>
          <span className="text-sm">$2/min</span>
        </button>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={supportAmount}
            onChange={(e) => setSupportAmount(Number(e.target.value))}
            className="flex-1 p-4 bg-gray-100 rounded-lg"
            placeholder="Support Amount"
          />
          <button
            onClick={handleSendSupport}
            className="p-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FaHeart />
          </button>
        </div>
      </div>

      {/* DM Interface */}
      {isDmOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col bg-gray-100 rounded-lg p-4"
        >
          <div className="flex-1 overflow-y-auto mb-4">
            {/* Messages will be displayed here */}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 rounded-lg"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <FaEnvelope />
            </button>
          </div>
        </motion.div>
      )}

      {/* Call Interface */}
      {isCallActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4"
        >
          <div className="text-2xl font-bold mb-4">
            {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Call in progress - $2/min
          </div>
          <button
            onClick={handleEndCall}
            className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <FaPhone className="rotate-90" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
} 