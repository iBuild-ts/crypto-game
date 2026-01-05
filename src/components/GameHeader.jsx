import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Trophy, Sword, Store, Home, TrendingUp, User, Award, Gift, ArrowLeftRight, Zap, Volume2, VolumeX, Settings } from 'lucide-react';

const GameHeader = ({ gameState, setGameState, playerCoins, playerMemes, soundEnabled, toggleSound }) => {
  const navItems = [
    { id: 'collection', label: 'Collection', icon: Home },
    { id: 'shop', label: 'Shop', icon: Store },
    { id: 'battle', label: 'Battle', icon: Sword },
    { id: 'tournament', label: 'Tournament', icon: Trophy },
    { id: 'upgrade', label: 'Upgrade', icon: Zap },
    { id: 'trading', label: 'Trading', icon: ArrowLeftRight },
    { id: 'daily', label: 'Daily', icon: Gift },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-2xl p-6 shadow-2xl border-2 border-purple-400"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Crypto Meme Game
          </div>
          <div className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold">
            <Coins className="w-5 h-5" />
            {playerCoins}
          </div>
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
        
        <nav className="flex flex-wrap gap-2 max-w-3xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = gameState === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameState(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all duration-200 text-sm ${
                  isActive 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg' 
                    : 'bg-purple-700 text-white hover:bg-purple-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </motion.button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-green-400">Memes Collected: {playerMemes.length}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GameHeader;
