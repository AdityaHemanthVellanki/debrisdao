"use client";

import OrbitalHero from '../components/OrbitalHero';
import Link from 'next/link';
import { motion } from '../utils/motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <OrbitalHero />
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-space-navy to-space-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-orbitron text-center font-bold mb-16">
            Revolutionizing Space Debris <span className="text-neon-cyan">Management</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="card flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-20 w-20 mb-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 text-neon-cyan" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 4.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-neon-cyan">Identify & Track</h3>
              <p className="text-gray-400">Advanced algorithms track over 500,000 debris pieces in real-time orbital location and trajectory data.</p>
            </motion.div>
            
            <motion.div 
              className="card flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-20 w-20 mb-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 text-solar-orange" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-solar-orange">Tokenize & Secure</h3>
              <p className="text-gray-400">Each piece of debris becomes a unique NFT with verifiable on-chain metadata and risk assessment.</p>
            </motion.div>
            
            <motion.div 
              className="card flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-20 w-20 mb-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 text-neon-cyan" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-neon-cyan">Trade & Mitigate</h3>
              <p className="text-gray-400">Create a decentralized marketplace for liability trading, cleanup bounties, and insurance.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Marketplace Preview */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-space-navy opacity-80"></div>
          <div className="h-full w-full bg-[url('/stars-bg.png')] bg-repeat opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
                <span className="text-solar-orange">Marketplace</span> for Space Debris NFTs
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Buy, sell, and trade tokenized space debris with real orbital data. Each token represents actual space junk with unique characteristics and risk profiles.
              </p>
              <Link href="/marketplace" className="btn-secondary">
                Explore Marketplace
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <motion.div 
                    key={item}
                    className="card p-4 hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-32 bg-gradient-to-br from-space-navy to-space-navy/60 rounded-md flex items-center justify-center mb-3 overflow-hidden relative">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 text-neon-cyan opacity-50">
                        <path d="M50,20 a30,30 0 1,0 0,60 a30,30 0 1,0 0,-60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="3" fill="currentColor" />
                        <circle cx={`${50 + 30 * Math.cos(item)}`} cy={`${50 + 30 * Math.sin(item)}`} r="2" fill="#FF7F11" />
                      </svg>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-orbitron text-neon-cyan text-sm">Debris #{1000 + item}</h3>
                        <p className="text-xs text-gray-400">Origin: Soyuz-2</p>
                      </div>
                      <span className="bg-solar-orange/20 text-solar-orange text-xs px-2 py-1 rounded-full">
                        Risk: {Math.floor(Math.random() * 60 + 40)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">Current Bid:</span>
                      <span className="font-orbitron text-white">{(Math.random() * 2).toFixed(3)} ETH</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Risk Dashboard Preview */}
      <section className="py-20 bg-gradient-to-t from-space-navy to-space-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
                Real-time <span className="text-neon-cyan">Risk Analysis</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Advanced analytics model collision probabilities, orbital decay, and potential damage scenarios based on real-time data and predictive algorithms.
              </p>
              <Link href="/dashboard" className="btn-primary">
                View Dashboard
              </Link>
            </div>
            
            <div className="md:w-1/2 border border-neon-cyan/30 rounded-lg overflow-hidden bg-space-navy/60 backdrop-blur-sm">
              <div className="p-4 border-b border-neon-cyan/20">
                <h3 className="font-orbitron text-neon-cyan">Risk Analysis</h3>
              </div>
              <div className="p-4">
                <div className="h-64 bg-gradient-to-b from-space-navy/40 to-space-navy/10 rounded-md flex items-center justify-center relative">
                  <svg viewBox="0 0 100 50" className="w-full h-full p-4">
                    <path d="M0,40 C10,35 20,20 30,25 C40,30 50,10 60,15 C70,20 80,30 90,15 L90,50 L0,50 Z" fill="url(#gradient)" fillOpacity="0.5" />
                    <path d="M0,40 C10,35 20,20 30,25 C40,30 50,10 60,15 C70,20 80,30 90,15" fill="none" stroke="#00FFC6" strokeWidth="0.5" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00FFC6" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#00FFC6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 py-2 text-xs text-gray-400">
                    <span>Jan</span>
                    <span>Apr</span>
                    <span>Jul</span>
                    <span>Oct</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Active Debris', value: '27,531', change: '+1.2%' },
                    { label: 'High Risk Objects', value: '3,872', change: '+0.8%' },
                    { label: 'Predicted Collisions', value: '14', change: '-2.3%' },
                  ].map((stat, i) => (
                    <div key={i} className="p-2 bg-space-navy/40 rounded border border-neon-cyan/10">
                      <p className="text-xs text-gray-400">{stat.label}</p>
                      <p className="font-orbitron text-lg text-white">{stat.value}</p>
                      <p className={`text-xs ${stat.change.startsWith('+') ? 'text-solar-orange' : 'text-neon-cyan'}`}>
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-space-navy/80 to-space-navy"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Ready to Participate in the Space <span className="text-neon-cyan">Economy</span>?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Connect your wallet to start exploring the orbital map, purchase debris tokens, and contribute to a cleaner space environment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">Connect Wallet</button>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
