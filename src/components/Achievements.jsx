import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, Check, Star, Zap, Target, Crown, Gift } from 'lucide-react';

const Achievements = ({ playerAchievements }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = {
    battle: [
      { id: 1, name: 'First Victory', description: 'Win your first battle', icon: '🏆', rarity: 'common', unlocked: true, progress: 1, target: 1 },
      { id: 2, name: 'Battle Hardened', description: 'Win 10 battles', icon: '⚔️', rarity: 'common', unlocked: true, progress: 10, target: 10 },
      { id: 3, name: 'Warrior', description: 'Win 50 battles', icon: '🗡️', rarity: 'rare', unlocked: true, progress: 47, target: 50 },
      { id: 4, name: 'Legendary Fighter', description: 'Win 100 battles', icon: '👑', rarity: 'epic', unlocked: false, progress: 47, target: 100 },
      { id: 5, name: 'Unstoppable', description: 'Win 10 battles in a row', icon: '🔥', rarity: 'epic', unlocked: false, progress: 5, target: 10 },
    ],
    collection: [
      { id: 6, name: 'Collector', description: 'Collect 5 different memes', icon: '📚', rarity: 'common', unlocked: true, progress: 8, target: 5 },
      { id: 7, name: 'Meme Hoarder', description: 'Collect 15 different memes', icon: '📦', rarity: 'rare', unlocked: false, progress: 8, target: 15 },
      { id: 8, name: 'Rare Hunter', description: 'Collect 5 rare memes', icon: '💎', rarity: 'rare', unlocked: true, progress: 6, target: 5 },
      { id: 9, name: 'Epic Collector', description: 'Collect 3 epic memes', icon: '🌟', rarity: 'epic', unlocked: true, progress: 3, target: 3 },
      { id: 10, name: 'Legendary Owner', description: 'Collect a legendary meme', icon: '👑', rarity: 'legendary', unlocked: true, progress: 1, target: 1 },
    ],
    wealth: [
      { id: 11, name: 'First Coins', description: 'Earn 1,000 coins', icon: '🪙', rarity: 'common', unlocked: true, progress: 15420, target: 1000 },
      { id: 12, name: 'Coin Collector', description: 'Earn 10,000 coins', icon: '💰', rarity: 'rare', unlocked: true, progress: 15420, target: 10000 },
      { id: 13, name: 'Crypto Rich', description: 'Earn 50,000 coins', icon: '💎', rarity: 'epic', unlocked: false, progress: 15420, target: 50000 },
      { id: 14, name: 'Meme Millionaire', description: 'Earn 100,000 coins', icon: '🏦', rarity: 'legendary', unlocked: false, progress: 15420, target: 100000 },
      { id: 15, name: 'Big Spender', description: 'Spend 10,000 coins in shop', icon: '🛍️', rarity: 'rare', unlocked: false, progress: 3500, target: 10000 },
    ],
    special: [
      { id: 16, name: 'Welcome Aboard', description: 'Join the game', icon: '🎮', rarity: 'common', unlocked: true, progress: 1, target: 1 },
      { id: 17, name: 'Daily Player', description: 'Login 7 days in a row', icon: '📅', rarity: 'rare', unlocked: false, progress: 3, target: 7 },
      { id: 18, name: 'Lucky Day', description: 'Win 5 battles in one day', icon: '🍀', rarity: 'rare', unlocked: false, progress: 2, target: 5 },
      { id: 19, name: 'Speed Demon', description: 'Win a battle in under 10 seconds', icon: '⚡', rarity: 'epic', unlocked: false, progress: 0, target: 1 },
      { id: 20, name: 'Perfectionist', description: 'Reach 100% win rate with 10+ battles', icon: '🎯', rarity: 'legendary', unlocked: false, progress: 67, target: 100 },
    ],
  };

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'battle', name: 'Battle', icon: Zap },
    { id: 'collection', name: 'Collection', icon: Star },
    { id: 'wealth', name: 'Wealth', icon: Crown },
    { id: 'special', name: 'Special', icon: Gift },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? Object.values(achievements).flat()
    : achievements[selectedCategory] || [];

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500 border-yellow-400';
      case 'epic': return 'from-purple-400 to-pink-500 border-purple-400';
      case 'rare': return 'from-blue-400 to-cyan-500 border-blue-400';
      default: return 'from-gray-400 to-gray-600 border-gray-400';
    }
  };

  const getRarityBg = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'bg-gradient-to-br from-yellow-600 to-orange-600';
      case 'epic': return 'bg-gradient-to-br from-purple-600 to-pink-600';
      case 'rare': return 'bg-gradient-to-br from-blue-600 to-cyan-600';
      default: return 'bg-gradient-to-br from-gray-600 to-gray-700';
    }
  };

  const unlockedCount = Object.values(achievements).flat().filter(a => a.unlocked).length;
  const totalCount = Object.values(achievements).flat().length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Achievements
        </h2>
        <p className="text-gray-300">Complete challenges to earn rewards</p>
        <div className="mt-4 text-lg">
          <span className="text-yellow-400 font-bold">{unlockedCount}</span>
          <span className="text-gray-300"> / {totalCount} Unlocked</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-4 border-2 border-purple-400"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg'
                    : 'bg-purple-700 text-white hover:bg-purple-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
              achievement.unlocked
                ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} shadow-lg`
                : 'bg-gray-800 border-gray-600 opacity-60'
            }`}
          >
            <div className="absolute top-2 right-2">
              {achievement.unlocked ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Lock className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <div className="flex items-start gap-3">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                <p className="text-sm opacity-80 mb-3">{achievement.description}</p>
                
                {!achievement.unlocked && achievement.progress < achievement.target && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-800 rounded-xl"
        >
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-400">No achievements in this category yet.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Achievements;
