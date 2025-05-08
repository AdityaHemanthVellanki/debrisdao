import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
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
                Over 500,000 pieces of debris currently orbit Earth, traveling at speeds 
                up to 28,000 km/h—fast enough for a tiny fragment to damage satellites 
                and spacecraft.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="h-12 w-12 mb-4 text-yellow-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-yellow-400">Kessler Syndrome</h3>
              <p className="text-gray-400">
                The risk of collisions creating more debris is growing. This
                cascading effect, known as Kessler Syndrome, could render entire
                orbital bands unusable for generations.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="h-12 w-12 mb-4 text-neon-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 15h0M12 15h0M17 15h0" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-3 text-neon-cyan">Unclear Liability</h3>
              <p className="text-gray-400">
                Current space law doesn't adequately address responsibility for 
                orbital debris, creating a lack of economic incentives for cleanup
                and sustainable practices.
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
          <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Our Solution</h2>
          
          <div className="bg-space-navy/60 backdrop-blur-md rounded-xl border border-neon-cyan/20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-orbitron font-semibold text-neon-cyan">Tokenization</h3>
                <p className="text-gray-300">
                  Each piece of trackable space debris becomes a unique NFT with
                  verifiable orbital data and risk assessment. This creates clear
                  ownership and responsibility frameworks.
                </p>
                
                <h3 className="text-xl font-orbitron font-semibold text-neon-cyan pt-4">Risk Marketplace</h3>
                <p className="text-gray-300">
                  Organizations can trade, insure, and manage their debris liability
                  portfolios, creating economic incentives for effective risk management
                  and debris reduction.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-orbitron font-semibold text-neon-cyan">Cleanup Bounties</h3>
                <p className="text-gray-300">
                  Token holders can post bounties for debris removal, creating
                  a decentralized funding mechanism for cleanup missions and
                  innovative removal technologies.
                </p>
                
                <h3 className="text-xl font-orbitron font-semibold text-neon-cyan pt-4">Governance</h3>
                <p className="text-gray-300">
                  DebrisDAO token holders collaborate on platform development,
                  protocol updates, and space sustainability policies through
                  decentralized voting and proposal mechanisms.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-neon-cyan/20">
              <h3 className="text-xl font-orbitron font-semibold text-white mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {['Blockchain', 'Smart Contracts', 'Orbital Data API', 'Machine Learning', 'Risk Modeling', 'DAO Governance', '3D Visualization'].map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-space-navy rounded-full border border-neon-cyan/30 text-neon-cyan text-sm">
                    {tech}
                  </span>
                ))}
              </div>
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
}
