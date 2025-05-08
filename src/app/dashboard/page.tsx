import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the chart components to avoid server-side rendering issues
const RiskChart = dynamic(() => import('../../components/RiskChart'), { ssr: false });
const RiskHeatmap = dynamic(() => import('../../components/RiskHeatmap'), { ssr: false });

// Generate high-risk debris data
const generateHighRiskDebris = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `debris-${i + 1000}`,
    name: `Debris #${i + 1000}`,
    riskScore: Math.floor(75 + Math.random() * 25), // High risk only (75-100)
    origin: ['USA', 'Russia', 'China', 'EU', 'India', 'Japan'][Math.floor(Math.random() * 6)],
    altitude: 200 + Math.floor(Math.random() * 800),
    velocity: (7 + Math.random() * 4).toFixed(1),
    prioritized: Math.random() > 0.7, // Some are already prioritized
    collisionProbability: (Math.random() * 0.05).toFixed(4), // Up to 5% chance
    type: ['Defunct Satellite', 'Rocket Body', 'Fragment'][Math.floor(Math.random() * 3)],
  }));
};

export default function Dashboard() {
  const highRiskDebris = generateHighRiskDebris(10).sort((a, b) => b.riskScore - a.riskScore);
  
  return (
    <div className="min-h-screen pt-16 bg-space-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">
            Risk <span className="text-neon-cyan">Dashboard</span>
          </h1>
          <p className="text-gray-400">
            Real-time analytics on space debris collision risks and cleanup priorities
          </p>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { name: 'Total Active Debris', value: '27,531', change: '+1.2%', color: 'text-neon-cyan' },
            { name: 'High Risk Objects', value: '3,872', change: '+0.8%', color: 'text-solar-orange' },
            { name: 'Medium Risk Objects', value: '12,446', change: '-1.4%', color: 'text-yellow-400' },
            { name: 'Predicted Collisions', value: '14', change: '-2.3%', color: 'text-neon-cyan' },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-space-navy/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <p className="text-gray-400 text-sm">{stat.name}</p>
              <p className={`text-2xl font-orbitron ${stat.color} font-bold mt-2`}>{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-solar-orange' : 'text-neon-cyan'}`}>
                {stat.change} from last month
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left column - Risk chart */}
          <motion.div 
            className="lg:col-span-2 bg-space-navy/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-orbitron font-semibold text-white mb-4">
              High-Risk Debris Over Time
            </h2>
            <div className="h-80">
              <RiskChart />
            </div>
          </motion.div>
          
          {/* Right column - Top 10 highest risk debris */}
          <motion.div 
            className="bg-space-navy/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-xl font-orbitron font-semibold text-white mb-4">
              Top 10 Highest Risk
            </h2>
            <div className="space-y-3">
              {highRiskDebris.map((debris, index) => (
                <div 
                  key={debris.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-neon-cyan/10 bg-space-navy/40 hover:bg-space-navy/60 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-8 w-8 rounded-md flex items-center justify-center ${
                      index < 3 ? 'bg-solar-orange/20 text-solar-orange' : 'bg-space-navy/60 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{debris.name}</p>
                      <p className="text-xs text-gray-400">{debris.origin} • {debris.altitude} km</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-solar-orange font-orbitron font-medium">
                        {debris.riskScore}
                      </p>
                      <p className="text-xs text-gray-400">Risk Score</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        defaultChecked={debris.prioritized}
                      />
                      <div className="relative w-10 h-5 bg-space-navy/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-cyan/30"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full btn-primary py-2 mt-4">Prioritize All</button>
          </motion.div>
        </div>
        
        {/* Heatmap Section */}
        <motion.div 
          className="bg-space-navy/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-xl font-orbitron font-semibold text-white mb-4">
            Orbital Altitude vs. Collision Probability
          </h2>
          <div className="h-80">
            <RiskHeatmap />
          </div>
        </motion.div>
        
        {/* Mitigation Strategies Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="bg-space-navy/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20">
            <h2 className="text-xl font-orbitron font-semibold text-white mb-4">
              Active Mitigation Efforts
            </h2>
            <div className="space-y-4">
              <div className="border-b border-neon-cyan/10 pb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-300">Cleanup Campaign #2531</p>
                  <span className="px-2 py-0.5 text-xs bg-neon-cyan/20 text-neon-cyan rounded-full">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-400">Progress</p>
                  <p className="text-neon-cyan">67%</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-space-navy/60 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div className="border-b border-neon-cyan/10 pb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-300">Starlink Altitude Adjustment</p>
                  <span className="px-2 py-0.5 text-xs bg-yellow-400/20 text-yellow-400 rounded-full">Pending</span>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-400">Progress</p>
                  <p className="text-yellow-400">23%</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-space-navy/60 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              
              <div className="pb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-300">Laser Ablation Test</p>
                  <span className="px-2 py-0.5 text-xs bg-solar-orange/20 text-solar-orange rounded-full">Scheduled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-400">Progress</p>
                  <p className="text-solar-orange">5%</p>
                </div>
                <div className="mt-2 h-1.5 w-full bg-space-navy/60 rounded-full overflow-hidden">
                  <div className="h-full bg-solar-orange rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-space-navy/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20">
            <h2 className="text-xl font-orbitron font-semibold text-white mb-4">
              Upcoming Conjunction Events
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 4 }, (_, i) => {
                const riskScore = Math.floor(40 + Math.random() * 60);
                let riskClass = '';
                
                if (riskScore > 70) riskClass = 'text-solar-orange';
                else if (riskScore > 40) riskClass = 'text-yellow-400';
                else riskClass = 'text-neon-cyan';
                
                return (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-lg border border-neon-cyan/10 bg-space-navy/40">
                    <div className="text-center">
                      <p className="text-white font-medium font-orbitron">{Math.floor(Math.random() * 30) + 1}</p>
                      <p className="text-xs text-gray-400">May</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">Debris #{1000 + i}</span> and <span className="font-medium">Debris #{1020 + i}</span>
                      </p>
                      <p className="text-xs text-gray-400">Altitude: {300 + Math.floor(Math.random() * 500)} km</p>
                    </div>
                    <div className="text-right">
                      <p className={`${riskClass} font-medium`}>{riskScore}%</p>
                      <p className="text-xs text-gray-400">Risk Factor</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full py-2 mt-4 bg-space-navy/80 text-gray-300 border border-neon-cyan/20 rounded-md hover:bg-space-navy transition-colors">
              View All Events
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
