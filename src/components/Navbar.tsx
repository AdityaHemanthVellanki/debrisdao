"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from '../utils/motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = () => {
    // Mock wallet connection
    setIsWalletConnected(true);
    setWalletAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-space-navy/90 border-b border-neon-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-neon-cyan text-3xl font-bold mr-2">∞</span>
              <span className="font-orbitron text-neon-cyan text-xl font-bold">DebrisDAO</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/map-explorer" className="nav-link">Map Explorer</Link>
              <Link href="/marketplace" className="nav-link">Debris Marketplace</Link>
              <Link href="/dashboard" className="nav-link">Risk Dashboard</Link>
              <Link href="/about" className="nav-link">About</Link>
              
              {isWalletConnected ? (
                <div className="flex items-center space-x-2 bg-space-navy/60 border border-neon-cyan rounded-full px-4 py-1">
                  <div className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse"></div>
                  <span className="text-neon-cyan font-medium font-mono text-sm">
                    {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 rounded-full px-4 py-1 font-orbitron text-sm hover:bg-neon-cyan/20 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neon-cyan hover:text-white hover:bg-space-navy"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-space-navy border-t border-neon-cyan/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="nav-link block px-3 py-2">Home</Link>
            <Link href="/map-explorer" className="nav-link block px-3 py-2">Map Explorer</Link>
            <Link href="/marketplace" className="nav-link block px-3 py-2">Debris Marketplace</Link>
            <Link href="/dashboard" className="nav-link block px-3 py-2">Risk Dashboard</Link>
            <Link href="/about" className="nav-link block px-3 py-2">About</Link>
            
            {isWalletConnected ? (
              <div className="flex items-center space-x-2 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse"></div>
                <span className="text-neon-cyan font-medium font-mono text-sm">
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </span>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="w-full text-left px-3 py-2 text-neon-cyan hover:bg-space-navy/60 rounded-md"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
