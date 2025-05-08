import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the MapGlobe component with no SSR
const MapGlobe = dynamic(() => import('../../components/MapGlobe'), { ssr: false });

export default function MapExplorer() {
  return (
    <div className="min-h-screen pt-16 bg-space-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
            Orbital <span className="text-neon-cyan">Map Explorer</span>
          </h1>
          <p className="text-gray-400">
            Interactive visualization of tokenized space debris in orbit
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 pb-12">
          {/* Sidebar Filters */}
          <motion.div 
            className="lg:w-1/4 bg-space-navy/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-orbitron font-semibold text-neon-cyan mb-6">Filters</h2>
            
            <div className="space-y-6">
              {/* Risk Score filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Risk Score</label>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-400">0</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100"
                    className="w-full h-2 bg-space-navy rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                  />
                  <span className="text-neon-cyan">100</span>
                </div>
              </div>
              
              {/* Orbit altitude filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Orbit Altitude (km)</label>
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Min</label>
                    <input 
                      type="number" 
                      className="w-full bg-space-navy/80 border border-neon-cyan/30 rounded px-2 py-1 text-white text-sm"
                      min="0"
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Max</label>
                    <input 
                      type="number" 
                      className="w-full bg-space-navy/80 border border-neon-cyan/30 rounded px-2 py-1 text-white text-sm"
                      min="0"
                      placeholder="36000"
                    />
                  </div>
                </div>
              </div>
              
              {/* Origin filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Origin</label>
                <select className="w-full bg-space-navy/80 border border-neon-cyan/30 rounded px-2 py-2 text-white text-sm">
                  <option value="">All Origins</option>
                  <option value="usa">USA</option>
                  <option value="china">China</option>
                  <option value="russia">Russia</option>
                  <option value="eu">European Union</option>
                  <option value="japan">Japan</option>
                  <option value="india">India</option>
                </select>
              </div>
              
              {/* Type filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input 
                      id="type-all" 
                      type="checkbox" 
                      className="h-4 w-4 accent-neon-cyan bg-space-navy/60 border-gray-500 rounded"
                      defaultChecked
                    />
                    <label htmlFor="type-all" className="ml-2 text-sm text-gray-300">All Types</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="type-satellite" 
                      type="checkbox" 
                      className="h-4 w-4 accent-neon-cyan bg-space-navy/60 border-gray-500 rounded"
                    />
                    <label htmlFor="type-satellite" className="ml-2 text-sm text-gray-300">Defunct Satellites</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="type-rocket" 
                      type="checkbox" 
                      className="h-4 w-4 accent-neon-cyan bg-space-navy/60 border-gray-500 rounded"
                    />
                    <label htmlFor="type-rocket" className="ml-2 text-sm text-gray-300">Rocket Bodies</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="type-fragment" 
                      type="checkbox" 
                      className="h-4 w-4 accent-neon-cyan bg-space-navy/60 border-gray-500 rounded"
                    />
                    <label htmlFor="type-fragment" className="ml-2 text-sm text-gray-300">Fragments</label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="w-full btn-primary py-2">Apply Filters</button>
              </div>
            </div>
          </motion.div>
          
          {/* Main Globe View */}
          <motion.div 
            className="lg:w-3/4 h-[600px] relative bg-space-navy/30 backdrop-blur-md rounded-xl border border-neon-cyan/20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <MapGlobe />
            
            {/* Stats overlay */}
            <div className="absolute top-4 right-4 bg-space-navy/70 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between space-x-8">
                <div>
                  <p className="text-gray-400">Visible Debris</p>
                  <p className="font-orbitron text-neon-cyan text-lg">478</p>
                </div>
                <div>
                  <p className="text-gray-400">Selected</p>
                  <p className="font-orbitron text-white text-lg">2</p>
                </div>
                <div>
                  <p className="text-gray-400">High Risk</p>
                  <p className="font-orbitron text-solar-orange text-lg">87</p>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-space-navy/70 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-3 text-xs">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-neon-cyan"></div>
                  <span className="text-gray-300">Low Risk (0-40)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300">Medium Risk (41-70)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-solar-orange"></div>
                  <span className="text-gray-300">High Risk (71-100)</span>
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button className="bg-space-navy/70 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-2 text-neon-cyan hover:bg-space-navy/90">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="bg-space-navy/70 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-2 text-neon-cyan hover:bg-space-navy/90">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="bg-space-navy/70 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-2 text-neon-cyan hover:bg-space-navy/90">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
