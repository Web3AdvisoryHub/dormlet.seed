'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';

const navLinks = [
  { href: '/profile', label: 'Profile' },
  { href: '/dream-journal', label: 'Dream Journal' },
  { href: '/memory-path', label: 'Memory Path' },
  { href: '/constellation-map', label: 'Constellation Map' },
  { href: '/store', label: 'Store' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-white text-2xl font-semibold tracking-wide hover:text-pink-200 transition-colors duration-500"
          >
            Dormlit
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-white/80 hover:text-white transition-all duration-500 ${
                  pathname === link.href ? 'text-white' : ''
                } group`}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-full bg-pink-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors duration-500"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="md:hidden"
            >
              <div className="card mt-4 py-4 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-6 py-3 text-white/80 hover:text-white transition-all duration-500 ${
                      pathname === link.href ? 'text-white' : ''
                    } group`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-0 rounded-full bg-pink-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 