import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, ShoppingCart, Star, Zap } from 'lucide-react';

const Shop = ({ cryptoMemes, playerCoins, onBuyMeme }) => {
  const [filter, setFilter] = useState('all');

  const filteredMemes = filter === 'all' 
    ? cryptoMemes 
    : cryptoMemes.filter(meme => meme.rarity === filter);

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'border-yellow-400';
      case 'epic': return 'border-purple-400';
      case 'rare': return 'border-blue-400';
      default: return 'border-gray-400';
    }
  };

  const canAfford = (price) => playerCoins >= price;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Meme Shop
        </h2>
        <p className="text-gray-300">Buy powerful memes to build your collection!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-4 border-2 border-purple-400"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold">Your Coins: {playerCoins}</span>
          </div>
          
          <div className="flex gap-2">
            {['all', 'legendary', 'epic', 'rare', 'common'].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setFilter(rarity)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filter === rarity
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
                    : 'bg-purple-700 text-white hover:bg-purple-600'
                }`}
              >
                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMemes.map((meme, index) => (
          <motion.div
            key={meme.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`meme-card ${!canAfford(meme.price) ? 'opacity-50' : ''}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="text-3xl">{meme.emoji}</div>
              <div className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(meme.rarity)} text-white`}>
                {meme.rarity.toUpperCase()}
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-2">{meme.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Power: {meme.power}</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-green-400" />
                <span className="text-sm font-bold">Price: {meme.price}</span>
              </div>
            </div>
            
            <button
              onClick={() => onBuyMeme(meme)}
              disabled={!canAfford(meme.price)}
              className={`w-full py-2 px-4 rounded-lg font-bold transition-all duration-200 ${
                canAfford(meme.price)
                  ? 'crypto-button text-sm'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canAfford(meme.price) ? (
                <>
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  Buy
                </>
              ) : (
                'Insufficient Coins'
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {filteredMemes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-purple-800 bg-opacity-50 rounded-xl"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-300">No memes found for this filter.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Shop;
