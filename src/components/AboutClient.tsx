"use client";

import { motion } from '../utils/motion';
import Link from 'next/link';

const AboutClient = () => {
  return (
    <div className="min-h-screen pt-16 bg-space-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
            About <span className="text-neon-cyan">DebrisDAO</span>
          </h1>
          <p className="text-gray-400">
            Pioneering decentralized solutions for space debris management
          </p>
        </div>
        
        {/* Mission Section */}
        <motion.section 
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-orbitron font-bold text-neon-cyan">Our Mission</h2>
              <p className="text-gray-300">
                DebrisDAO is revolutionizing space debris management through blockchain 
                technology, creating the first decentralized marketplace for tokenizing, 
                tracking, and trading orbital debris liabilities.
              </p>
              <p className="text-gray-300">
                Our platform transforms the growing problem of space junk into an
                opportunity for collaborative cleanup, sustainable space 
                operations, and incentivized risk reduction.
              </p>
              <div className="pt-4">
                <Link href="/map-explorer" className="btn-primary">
                  Explore Our Platform
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-space-navy to-space-navy/60 rounded-xl overflow-hidden border border-neon-cyan/20 p-4">
              <div className="aspect-video bg-space-navy/40 rounded-lg relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full absolute opacity-10" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="100" cy="50" rx="80" ry="40" fill="none" stroke="#00FFC6" strokeWidth="0.5" />
                  <ellipse cx="100" cy="50" rx="60" ry="20" fill="none" stroke="#FF7F11" strokeWidth="0.5" strokeDasharray="5,3" />
                  <circle cx="100" cy="50" r="10" fill="#0B1A2F" stroke="#00FFC6" strokeWidth="0.5" />
                </svg>
                <div className="text-center relative z-10">
                  <span className="text-neon-cyan text-5xl font-bold font-orbitron">∞</span>
                  <h3 className="font-orbitron text-neon-cyan text-2xl mt-2">DebrisDAO</h3>
                  <p className="text-gray-400 mt-2">Tokenizing Space Debris Since 2025</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Problem Section */}
        <motion.section 
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-orbitron font-bold text-white mb-6">The Space Debris Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="h-12 w-12 mb-4 text-solar-orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-solar-orange">Growing Problem</h3>
              <p className="text-gray-400">
                Over 36,500 objects larger than 10cm are currently in orbit, creating collision risks that threaten operational satellites and future launches.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="h-12 w-12 mb-4 text-neon-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-neon-cyan">Kessler Syndrome</h3>
              <p className="text-gray-400">
                Each collision generates thousands of new debris fragments, creating a cascade effect that could render entire orbital shells unusable for generations.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="h-12 w-12 mb-4 text-solar-orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-solar-orange">Liability Gap</h3>
              <p className="text-gray-400">
                Current international frameworks lack effective mechanisms for assigning responsibility, tracking debris, and incentivizing cleanup operations.
              </p>
            </div>
          </div>
        </motion.section>
        
        {/* Solution Section */}
        <motion.section 
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-orbitron font-bold text-white mb-6">The DebrisDAO Solution</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-neon-cyan">Tokenized Debris Registry</h3>
              <p className="text-gray-400 mb-4">
                We create unique non-fungible tokens (NFTs) that represent specific debris objects,
                each with verifiable on-chain orbital parameters, risk assessments, and ownership history.
              </p>
              <ul className="space-y-2">
                {['Transparent ownership', 'Verified orbital data', 'Risk assessment scores', 'Historical tracking'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-neon-cyan" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-neon-cyan">Decentralized Liability Market</h3>
              <p className="text-gray-400 mb-4">
                Our marketplace allows entities to trade, insure, and offset debris liabilities
                while creating financial incentives for debris removal operations.
              </p>
              <ul className="space-y-2">
                {['Transparent pricing', 'Liability transfer contracts', 'Cleanup bounties', 'Insurance protocols'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-neon-cyan" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
        
        {/* Team Section */}
        <motion.section 
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Alex Chen', role: 'Founder & CEO', bg: 'from-neon-cyan/20 to-space-navy/60' },
              { name: 'Dr. Sarah Miller', role: 'Orbital Mechanics Lead', bg: 'from-neon-cyan/20 to-space-navy/60' },
              { name: 'Marcus Johnson', role: 'Blockchain Architect', bg: 'from-neon-cyan/20 to-space-navy/60' },
              { name: 'Elena Kowalski', role: 'Risk Modeling Specialist', bg: 'from-neon-cyan/20 to-space-navy/60' },
            ].map((member, index) => (
              <div 
                key={index}
                className="card overflow-hidden hover:shadow-neon-cyan/10 hover:shadow-lg transition-all duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${member.bg} flex items-center justify-center`}>
                  <div className="h-24 w-24 rounded-full bg-space-navy/80 border-2 border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-orbitron text-white font-medium">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
        
        {/* Partners Section */}
        <motion.section 
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Partners & Collaborators</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['SpaceX', 'ESA', 'NASA', 'Blockchain Alliance'].map((partner, index) => (
              <div 
                key={index}
                className="aspect-video bg-space-navy/40 rounded-lg border border-neon-cyan/10 flex items-center justify-center hover:border-neon-cyan/30 transition-colors"
              >
                <p className="font-orbitron text-gray-300">{partner}</p>
              </div>
            ))}
          </div>
        </motion.section>
        
        {/* CTA Section */}
        <motion.section 
          className="py-16 my-10 bg-gradient-to-r from-space-navy/80 via-space-navy to-space-navy/80 rounded-2xl border border-neon-cyan/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-6">
              Join the <span className="text-neon-cyan">DebrisDAO</span> Movement
            </h2>
            <p className="text-gray-300 mb-8">
              Be part of the solution to one of the most pressing challenges in space exploration.
              Together, we can create a sustainable future for orbital operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary">Connect Wallet</button>
              <Link href="/whitepaper.pdf" className="btn-secondary">
                Read Whitepaper
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutClient;
