import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Zap, TrendingUp, Calendar, Target, Star, Award } from 'lucide-react';

const PlayerProfile = ({ playerStats }) => {
  const stats = {
    username: 'CryptoMemeMaster',
    level: 12,
    experience: 2450,
    nextLevelExp: 3000,
    totalWins: 47,
    totalLosses: 23,
    totalBattles: 70,
    winRate: 67,
    coinsEarned: 15420,
    memesCollected: 15,
    rareMemes: 6,
    epicMemes: 3,
    legendaryMemes: 1,
    joinDate: '2024-01-01',
    currentStreak: 5,
    bestStreak: 12,
    achievements: 8,
    rank: 42,
  };

  const expPercentage = (stats.experience / stats.nextLevelExp) * 100;

  const getRankColor = (rank) => {
    if (rank <= 10) return 'text-yellow-400';
    if (rank <= 50) return 'text-purple-400';
    if (rank <= 100) return 'text-blue-400';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Player Profile
        </h2>
        <p className="text-gray-300">Your crypto meme journey</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="text-6xl">👨‍🚀</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{stats.username}</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className={`font-bold ${getRankColor(stats.rank)}`}>
                  Rank #{stats.rank}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">Level {stats.level}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Experience</span>
            <span>{stats.experience}/{stats.nextLevelExp}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${expPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl text-green-400 mb-1">🏆</div>
            <div className="text-xl font-bold">{stats.totalWins}</div>
            <div className="text-sm text-gray-300">Wins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-red-400 mb-1">💀</div>
            <div className="text-xl font-bold">{stats.totalLosses}</div>
            <div className="text-sm text-gray-300">Losses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-yellow-400 mb-1">💰</div>
            <div className="text-xl font-bold">{stats.coinsEarned.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Coins Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-purple-400 mb-1">🃏</div>
            <div className="text-xl font-bold">{stats.memesCollected}</div>
            <div className="text-sm text-gray-300">Memes</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-400" />
            Battle Statistics
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Win Rate</span>
              <span className="font-bold text-green-400">{stats.winRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Total Battles</span>
              <span className="font-bold">{stats.totalBattles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Current Streak</span>
              <span className="font-bold text-orange-400">{stats.currentStreak} 🔥</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Best Streak</span>
              <span className="font-bold text-purple-400">{stats.bestStreak}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Collection Stats
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Common Memes</span>
              <span className="font-bold text-gray-400">{stats.memesCollected - stats.rareMemes - stats.epicMemes - stats.legendaryMemes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Rare Memes</span>
              <span className="font-bold text-blue-400">{stats.rareMemes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Epic Memes</span>
              <span className="font-bold text-purple-400">{stats.epicMemes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Legendary Memes</span>
              <span className="font-bold text-yellow-400">{stats.legendaryMemes}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
      >
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-yellow-400" />
          Player Info
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm text-gray-300">Join Date</div>
            <div className="font-bold">{stats.joinDate}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🏅</div>
            <div className="text-sm text-gray-300">Achievements</div>
            <div className="font-bold text-yellow-400">{stats.achievements}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm text-gray-300">Power Level</div>
            <div className="font-bold text-purple-400">{stats.level * 100}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerProfile;
