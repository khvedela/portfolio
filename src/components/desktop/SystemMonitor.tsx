import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, HardDrive, Wifi } from "lucide-react";

export const SystemMonitor = () => {
  const [stats, setStats] = useState({
    cpu: 0,
    mem: 0,
    net: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 10,
        mem: Math.floor(Math.random() * 20) + 40,
        net: Math.floor(Math.random() * 500) + 50,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-20 right-6 w-64 bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl p-4 text-gray-200 font-mono text-xs shadow-lg pointer-events-none select-none">
      <h3 className="font-bold text-gray-400 mb-3 uppercase tracking-wider border-b border-white/10 pb-1">System Monitor</h3>
      
      <div className="space-y-4">
        {/* CPU */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center gap-2"><Cpu size={12} /> CPU</span>
            <span className="text-blue-400">{stats.cpu}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              animate={{ width: `${stats.cpu}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Memory */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center gap-2"><HardDrive size={12} /> MEM</span>
            <span className="text-purple-400">{stats.mem}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-500"
              animate={{ width: `${stats.mem}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Network */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center gap-2"><Wifi size={12} /> NET</span>
            <span className="text-green-400">{stats.net} KB/s</span>
          </div>
          <div className="flex items-end gap-0.5 h-8 mt-1 opacity-50">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-full bg-green-500/50"
                animate={{ height: `${Math.random() * 100}%` }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
