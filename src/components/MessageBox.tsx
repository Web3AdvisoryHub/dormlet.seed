'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface MessageBoxProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  setMessage: (message: string) => void;
}

export default function MessageBox({ isOpen, onClose, message, setMessage }: MessageBoxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-surface p-4 rounded-lg shadow-lg max-w-md"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Message</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Type your message..."
          />
          <button
            onClick={onClose}
            className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Send
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 