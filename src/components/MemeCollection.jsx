import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Shield, Sword, Coins } from 'lucide-react';

const MemeCollection = ({ memes, selectedMeme, onSelectMeme, onBattle }) => {
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Your Meme Collection
        </h2>
        <p className="text-gray-300">Select a meme to battle with!</p>
      </motion.div>

      {memes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-purple-800 bg-opacity-50 rounded-xl"
        >
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-300">No memes yet! Visit the shop to buy your first meme.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelectMeme(meme)}
              className={`meme-card cursor-pointer ${
                selectedMeme?.id === meme.id ? 'ring-4 ring-yellow-400' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-4xl">{meme.emoji}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(meme.rarity)} text-white`}>
                  {meme.rarity.toUpperCase()}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{meme.name}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">Power: {meme.power}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Value: {meme.price} coins</span>
                </div>
              </div>
              
              {selectedMeme?.id === meme.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 pt-3 border-t border-purple-400"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBattle();
                    }}
                    className="w-full crypto-button text-sm"
                  >
                    <Sword className="w-4 h-4 inline mr-2" />
                    Battle With This Meme
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {selectedMeme && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h3 className="text-xl font-bold mb-4">Selected Meme Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">{selectedMeme.emoji}</div>
              <div className="font-bold">{selectedMeme.name}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-yellow-400 mb-1">⚡</div>
              <div className="text-sm text-gray-300">Power</div>
              <div className="font-bold">{selectedMeme.power}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-400 mb-1">💰</div>
              <div className="text-sm text-gray-300">Value</div>
              <div className="font-bold">{selectedMeme.price}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-purple-400 mb-1">✨</div>
              <div className="text-sm text-gray-300">Rarity</div>
              <div className="font-bold capitalize">{selectedMeme.rarity}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MemeCollection;
