'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WalletConnectionProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

export default function WalletConnection({ onConnect, onDisconnect }: WalletConnectionProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [placeholderAssets, setPlaceholderAssets] = useState<Array<{ id: string; name: string }>>([]);

  // Simulate wallet detection
  const detectWallet = async () => {
    // Placeholder for actual wallet detection
    return typeof window !== 'undefined' && window.ethereum;
  };

  // Simulate wallet connection
  const connectWallet = async () => {
    try {
      // Placeholder for actual wallet connection
      const hasWallet = await detectWallet();
      
      if (hasWallet) {
        // Simulate getting address
        const mockAddress = '0x1234...5678';
        setWalletAddress(mockAddress);
        setIsConnected(true);
        
        // Simulate loading placeholder assets
        setPlaceholderAssets([
          { id: '1', name: 'Placeholder NFT 1' },
          { id: '2', name: 'Placeholder NFT 2' },
        ]);
        
        onConnect?.(mockAddress);
      } else {
        // Fallback to Web2
        setIsConnected(false);
        setWalletAddress(null);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setIsConnected(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    setPlaceholderAssets([]);
    onDisconnect?.();
  };

  return (
    <div className="space-y-4">
      {!isConnected ? (
        <motion.button
          onClick={connectWallet}
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Connect Wallet
        </motion.button>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {walletAddress}
            </span>
            <motion.button
              onClick={disconnectWallet}
              className="p-2 text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              Disconnect
            </motion.button>
          </div>

          {placeholderAssets.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Your Assets</h3>
              <div className="grid grid-cols-2 gap-2">
                {placeholderAssets.map(asset => (
                  <div
                    key={asset.id}
                    className="p-2 bg-gray-100 rounded-lg text-sm"
                  >
                    {asset.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 