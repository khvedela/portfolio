import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, ArrowRight, Power } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[20000] bg-black flex flex-col items-center justify-center text-white font-sans overflow-hidden"
    >
      {/* Abstract Background - Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-black opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Clock */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-thin tracking-tight mb-2">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </h1>
          <p className="text-xl text-gray-300 font-light">
            {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* User Profile */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] mb-4 shadow-lg">
              <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                <User size={48} className="text-gray-300" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Guest User</h2>
            <p className="text-sm text-gray-400 mt-1">DK_OS Session</p>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex gap-6 text-gray-400">
          <button className="hover:text-white transition-colors flex flex-col items-center gap-1 group">
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <Power size={20} />
            </div>
            <span className="text-xs">Shut Down</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
