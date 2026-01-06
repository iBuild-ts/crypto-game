import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';

const GameStats = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-yellow-400" />
        Live Game Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm text-gray-300">Active Players</div>
        </div>
        <div className="text-center">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">3,892</div>
          <div className="text-sm text-gray-300">Battles Today</div>
        </div>
        <div className="text-center">
          <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">89%</div>
          <div className="text-sm text-gray-300">Win Rate</div>
        </div>
        <div className="text-center">
          <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-gray-300">New Memes</div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
