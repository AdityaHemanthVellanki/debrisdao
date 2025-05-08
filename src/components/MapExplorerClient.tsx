"use client";

import dynamic from 'next/dynamic';
import { motion } from '../utils/motion';

// Dynamic import without SSR for the map component
const MapGlobe = dynamic(() => import('./MapGlobe'), { ssr: false });

const MapExplorerClient = () => {
  return (
    <div className="min-h-screen pt-16 bg-space-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <motion.h1 
            className="text-3xl font-orbitron font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-neon-cyan">Map</span> Explorer
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Interactive 3D globe visualization of space debris with real-time tracking
          </motion.p>
        </div>
        
        <motion.div 
          className="h-[75vh] rounded-xl overflow-hidden border border-neon-cyan/20 shadow-glow mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MapGlobe />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-space-navy/40 p-6 rounded-xl border border-neon-cyan/20 shadow-glow">
            <h2 className="text-xl font-orbitron text-white mb-3">Debris Types</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-neon-cyan mr-3"></span>
                <span className="text-white">Active Satellites</span>
                <span className="ml-auto text-gray-400">2,787</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-solar-orange mr-3"></span>
                <span className="text-white">Defunct Satellites</span>
                <span className="ml-auto text-gray-400">3,524</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-red-500 mr-3"></span>
                <span className="text-white">Rocket Bodies</span>
                <span className="ml-auto text-gray-400">2,350</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-yellow-400 mr-3"></span>
                <span className="text-white">Debris Fragments</span>
                <span className="ml-auto text-gray-400">18,870</span>
              </div>
            </div>
          </div>
          
          <div className="bg-space-navy/40 p-6 rounded-xl border border-neon-cyan/20 shadow-glow">
            <h2 className="text-xl font-orbitron text-white mb-3">Orbital Regions</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-blue-400 mr-3"></span>
                <span className="text-white">LEO (Low Earth)</span>
                <span className="ml-auto text-gray-400">160-2,000 km</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-purple-400 mr-3"></span>
                <span className="text-white">MEO (Medium Earth)</span>
                <span className="ml-auto text-gray-400">2,000-35,786 km</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-neon-cyan mr-3"></span>
                <span className="text-white">GEO (Geostationary)</span>
                <span className="ml-auto text-gray-400">35,786 km</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-pink-400 mr-3"></span>
                <span className="text-white">HEO (High Earth)</span>
                <span className="ml-auto text-gray-400">35,786+ km</span>
              </div>
            </div>
          </div>
          
          <div className="bg-space-navy/40 p-6 rounded-xl border border-neon-cyan/20 shadow-glow">
            <h2 className="text-xl font-orbitron text-white mb-3">Current Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Total Tracked Objects</p>
                <p className="text-2xl font-orbitron text-neon-cyan">27,531</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Altitude</p>
                <p className="text-2xl font-orbitron text-neon-cyan">765 km</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Velocity</p>
                <p className="text-2xl font-orbitron text-neon-cyan">7.8 km/s</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapExplorerClient;
