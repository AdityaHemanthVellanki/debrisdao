import { useState } from 'react';
import { motion } from 'framer-motion';
import DebrisModal from '../../components/DebrisModal';

// Generate mock NFT data
const generateMockNFTs = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `debris-${i + 1000}`,
    name: `Debris #${i + 1000}`,
    image: `/debris-${(i % 5) + 1}.svg`,
    price: (0.1 + Math.random() * 2).toFixed(3),
    riskScore: Math.floor(Math.random() * 100),
    size: (0.1 + Math.random() * 10).toFixed(1),
    origin: ['USA', 'Russia', 'China', 'EU', 'India', 'Japan'][Math.floor(Math.random() * 6)],
    owner: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
    altitude: Math.floor(200 + Math.random() * 800),
    type: ['Defunct Satellite', 'Rocket Body', 'Fragment'][Math.floor(Math.random() * 3)],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

export default function Marketplace() {
  const debris = generateMockNFTs(12);
  
  return (
    <div className="min-h-screen pt-16 bg-space-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
            Debris <span className="text-neon-cyan">Marketplace</span>
          </h1>
          <p className="text-gray-400">
            Discover, collect, and trade tokenized space debris with verifiable orbital data
          </p>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="bg-space-navy/60 backdrop-blur-md p-4 rounded-xl border border-neon-cyan/20 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-1 flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-space-navy/80 border border-neon-cyan/30 rounded px-3 py-2 text-white text-sm pl-10"
                    placeholder="Search by ID, origin, or type..."
                  />
                  <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Risk filter */}
              <div className="sm:w-1/4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Risk Level</label>
                <select className="w-full bg-space-navy/80 border border-neon-cyan/30 rounded px-3 py-2 text-white text-sm">
                  <option value="">All Risk Levels</option>
                  <option value="low">Low Risk (0-40)</option>
                  <option value="medium">Medium Risk (41-70)</option>
                  <option value="high">High Risk (71-100)</option>
                </select>
              </div>
              
              {/* Price filter */}
              <div className="sm:w-1/4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Price Range</label>
                <select className="w-full bg-space-navy/80 border border-neon-cyan/30 rounded px-3 py-2 text-white text-sm">
                  <option value="">Any Price</option>
                  <option value="0-0.5">0 - 0.5 ETH</option>
                  <option value="0.5-1">0.5 - 1 ETH</option>
                  <option value="1-2">1 - 2 ETH</option>
                  <option value="2+">2+ ETH</option>
                </select>
              </div>
            </div>
            
            {/* Sort */}
            <div className="sm:w-1/5">
              <label className="block text-sm font-medium text-gray-300 mb-1">Sort By</label>
              <select className="w-full bg-space-navy/80 border border-neon-cyan/30 rounded px-3 py-2 text-white text-sm">
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="risk-asc">Risk: Low to High</option>
                <option value="risk-desc">Risk: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="text-xs text-gray-400 bg-space-navy/80 px-3 py-1 rounded-full border border-neon-cyan/20 flex items-center">
              <span>All Types</span>
              <svg className="h-3 w-3 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-xs text-gray-400 bg-space-navy/80 px-3 py-1 rounded-full border border-neon-cyan/20 flex items-center">
              <span>Price: Any</span>
              <svg className="h-3 w-3 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Results Stats */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300">Showing <span className="text-white font-medium">{debris.length}</span> results</p>
          <button className="text-neon-cyan text-sm flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        
        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {debris.map((item, index) => (
            <motion.div 
              key={item.id}
              className="card overflow-hidden hover:shadow-lg hover:shadow-neon-cyan/10 hover:border-neon-cyan/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* NFT Preview */}
              <div className="relative h-48 bg-gradient-to-br from-space-navy/60 to-space-navy flex items-center justify-center overflow-hidden">
                {/* Orbital path visualization */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="50" cy="50" rx="30" ry="20" fill="none" stroke={item.riskScore > 70 ? '#FF7F11' : item.riskScore > 40 ? '#FFC107' : '#00FFC6'} strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="5" fill="#0B1A2F" stroke={item.riskScore > 70 ? '#FF7F11' : item.riskScore > 40 ? '#FFC107' : '#00FFC6'} strokeWidth="0.5" />
                  <circle 
                    cx={`${50 + 30 * Math.cos(index)}`} 
                    cy={`${50 + 20 * Math.sin(index)}`} 
                    r="2" 
                    fill={item.riskScore > 70 ? '#FF7F11' : item.riskScore > 40 ? '#FFC107' : '#00FFC6'} 
                  />
                </svg>
                
                {/* Risk badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                  item.riskScore > 70 ? 'bg-solar-orange/20 text-solar-orange' : 
                  item.riskScore > 40 ? 'bg-yellow-400/20 text-yellow-400' : 
                  'bg-neon-cyan/20 text-neon-cyan'
                }`}>
                  Risk: {item.riskScore}
                </div>
                
                {/* NFT Type badge */}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-space-navy/80 backdrop-blur-sm rounded text-xs text-gray-300">
                  {item.type}
                </div>
              </div>
              
              {/* NFT Info */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-orbitron text-neon-cyan">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.origin} • {item.altitude} km</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-400">Current Price</p>
                    <p className="font-orbitron text-white">{item.price} ETH</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                  <div className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {item.owner}
                  </div>
                  <div>Size: {item.size} m</div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="btn-primary py-1.5 text-sm">View Details</button>
                  <button className="bg-solar-orange/10 text-solar-orange border border-solar-orange/30 rounded-md py-1.5 text-sm font-orbitron hover:bg-solar-orange/20 transition-colors">Buy Liability</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="flex justify-center pb-16">
          <button className="btn-secondary py-2 px-8">
            Load More
          </button>
        </div>
        
        {/* Debris Detail Modal - This would be shown when a debris is clicked */}
        {/* <DebrisModal debris={selectedDebris} onClose={() => setSelectedDebris(null)} /> */}
      </div>
    </div>
  );
}
