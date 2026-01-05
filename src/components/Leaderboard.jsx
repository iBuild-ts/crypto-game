import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Star, Zap } from 'lucide-react';

const Leaderboard = () => {
  const topPlayers = [
    { rank: 1, name: 'CryptoKing', coins: 15420, memes: 25, wins: 142, avatar: '👑' },
    { rank: 2, name: 'MemeLord', coins: 12300, memes: 22, wins: 128, avatar: '🐸' },
    { rank: 3, name: 'DiamondHands', coins: 10500, memes: 20, wins: 115, avatar: '💎' },
    { rank: 4, name: 'WAGMI_Warrior', coins: 8900, memes: 18, wins: 98, avatar: '🚀' },
    { rank: 5, name: 'HODL_Hero', coins: 7800, memes: 17, wins: 87, avatar: '💪' },
    { rank: 6, name: 'PepePower', coins: 6500, memes: 15, wins: 76, avatar: '🐸' },
    { rank: 7, name: 'MoonShot', coins: 5400, memes: 14, wins: 65, avatar: '🌙' },
    { rank: 8, name: 'ShillMaster', coins: 4800, memes: 13, wins: 58, avatar: '📢' },
    { rank: 9, name: 'FUD_Destroyer', coins: 4200, memes: 12, wins: 52, avatar: '⚔️' },
    { rank: 10, name: 'ToTheMoon', coins: 3600, memes: 11, wins: 45, avatar: '🌕' },
  ];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Medal className="w-6 h-6 text-orange-600" />;
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBackground = (rank) => {
    switch(rank) {
      case 1: return 'bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400';
      case 2: return 'bg-gradient-to-r from-gray-600 to-gray-700 border-gray-400';
      case 3: return 'bg-gradient-to-r from-orange-700 to-orange-800 border-orange-400';
      default: return 'bg-gradient-to-r from-purple-700 to-blue-700 border-purple-400';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Hall of Champions
        </h2>
        <p className="text-gray-300">Top players in the Crypto Meme Game</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
      >
        <div className="grid grid-cols-4 gap-4 mb-6 text-center">
          <div>
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Total Prize Pool</p>
            <p className="text-xl font-bold text-yellow-400">50,000</p>
          </div>
          <div>
            <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Active Players</p>
            <p className="text-xl font-bold text-purple-400">1,247</p>
          </div>
          <div>
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Battles Today</p>
            <p className="text-xl font-bold text-blue-400">3,892</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-sm text-gray-300">Season End</p>
            <p className="text-xl font-bold text-green-400">7 Days</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {topPlayers.map((player, index) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`battle-card ${getRankBackground(player.rank)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(player.rank)}
                </div>
                <div className="text-3xl">{player.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold">{player.name}</h3>
                  <div className="flex gap-4 text-sm text-gray-300">
                    <span>🎯 {player.wins} wins</span>
                    <span>🃏 {player.memes} memes</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-yellow-400">
                  <div className="text-2xl">💰</div>
                  <span className="text-2xl font-bold">{player.coins.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-300">coins</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl border-2 border-purple-400"
      >
        <h3 className="text-xl font-bold mb-4">Season Rewards</h3>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
            <p className="font-bold">1st Place</p>
            <p className="text-yellow-400">20,000 coins</p>
          </div>
          <div className="text-center">
            <Medal className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="font-bold">2nd Place</p>
            <p className="text-gray-300">15,000 coins</p>
          </div>
          <div className="text-center">
            <Medal className="w-12 h-12 text-orange-600 mx-auto mb-2" />
            <p className="font-bold">3rd Place</p>
            <p className="text-orange-400">10,000 coins</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
