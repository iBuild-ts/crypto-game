import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUp, TrendingUp, Star, Coins, Sparkles } from 'lucide-react';

const MemeUpgrade = ({ playerMemes, playerCoins, onUpgradeMeme }) => {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [upgradeResult, setUpgradeResult] = useState(null);

  const upgradeCosts = {
    common: { power: 100, rarity: 500 },
    rare: { power: 200, rarity: 1000 },
    epic: { power: 400, rarity: 2000 },
    legendary: { power: 800, rarity: 5000 },
  };

  const calculateUpgrade = (meme, type) => {
    const cost = upgradeCosts[meme.rarity][type];
    const canAfford = playerCoins >= cost;

    if (!canAfford) return null;

    let upgradedMeme = { ...meme };
    
    if (type === 'power') {
      upgradedMeme.power = Math.min(meme.power + 10, 100);
      upgradedMeme.level = (meme.level || 1) + 1;
    } else if (type === 'rarity') {
      const rarityMap = ['common', 'rare', 'epic', 'legendary'];
      const currentIndex = rarityMap.indexOf(meme.rarity);
      if (currentIndex < rarityMap.length - 1) {
        upgradedMeme.rarity = rarityMap[currentIndex + 1];
        upgradedMeme.power = Math.min(meme.power + 15, 100);
      }
    }

    return {
      meme: upgradedMeme,
      cost,
      type,
    };
  };

  const performUpgrade = (type) => {
    if (!selectedMeme) return;

    const upgrade = calculateUpgrade(selectedMeme, type);
    if (!upgrade) return;

    setUpgradeResult(upgrade);
    onUpgradeMeme(selectedMeme.id, upgrade.meme, upgrade.cost);
  };

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

  const canUpgradePower = (meme) => {
    return meme.power < 100 && playerCoins >= upgradeCosts[meme.rarity].power;
  };

  const canUpgradeRarity = (meme) => {
    const rarityMap = ['common', 'rare', 'epic', 'legendary'];
    const currentIndex = rarityMap.indexOf(meme.rarity);
    return currentIndex < rarityMap.length - 1 && playerCoins >= upgradeCosts[meme.rarity].rarity;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Meme Upgrade Lab
        </h2>
        <p className="text-gray-300">Enhance your memes with power and rarity upgrades!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold">Select a Meme to Upgrade</h3>
          
          {playerMemes.length === 0 ? (
            <div className="text-center py-8 bg-gray-800 rounded-xl">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-gray-400">No memes to upgrade</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {playerMemes.map((meme) => (
                <motion.div
                  key={meme.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedMeme(meme)}
                  className={`meme-card cursor-pointer ${
                    selectedMeme?.id === meme.id ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{meme.emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-bold">{meme.name}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(meme.rarity)} text-white`}>
                          {meme.rarity.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          Power: {meme.power}
                        </span>
                        {meme.level && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-purple-400" />
                            Lv.{meme.level}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold">Upgrade Options</h3>
          
          {!selectedMeme ? (
            <div className="text-center py-8 bg-gray-800 rounded-xl">
              <div className="text-4xl mb-2">⚡</div>
              <p className="text-gray-400">Select a meme to see upgrade options</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{selectedMeme.emoji}</div>
                  <div>
                    <h4 className="text-lg font-bold">{selectedMeme.name}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(selectedMeme.rarity)} text-white`}>
                        {selectedMeme.rarity.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        {selectedMeme.power} Power
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Current Level</span>
                    <span className="font-bold">Lv.{selectedMeme.level || 1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Max Power</span>
                    <span className="font-bold">100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold">Available Upgrades:</h4>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`battle-card ${
                    !canUpgradePower(selectedMeme) ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-400" />
                        Power Upgrade
                      </h5>
                      <p className="text-sm text-gray-300">
                        +10 Power (Max: 100)
                      </p>
                    </div>
                    <button
                      onClick={() => performUpgrade('power')}
                      disabled={!canUpgradePower(selectedMeme)}
                      className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                        canUpgradePower(selectedMeme)
                          ? 'bg-green-600 hover:bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-4 h-4 inline mr-1" />
                      {upgradeCosts[selectedMeme.rarity].power}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`battle-card ${
                    !canUpgradeRarity(selectedMeme) ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Rarity Evolution
                      </h5>
                      <p className="text-sm text-gray-300">
                        {selectedMeme.rarity === 'common' && 'Common → Rare (+15 Power)'}
                        {selectedMeme.rarity === 'rare' && 'Rare → Epic (+15 Power)'}
                        {selectedMeme.rarity === 'epic' && 'Epic → Legendary (+15 Power)'}
                        {selectedMeme.rarity === 'legendary' && 'Max rarity reached'}
                      </p>
                    </div>
                    <button
                      onClick={() => performUpgrade('rarity')}
                      disabled={!canUpgradeRarity(selectedMeme)}
                      className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                        canUpgradeRarity(selectedMeme)
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-4 h-4 inline mr-1" />
                      {upgradeCosts[selectedMeme.rarity].rarity}
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="bg-yellow-600 bg-opacity-20 border border-yellow-400 rounded-lg p-3">
                <p className="text-sm text-yellow-300">
                  <strong>Tip:</strong> Upgrading power increases battle performance, while rarity evolution provides permanent stat boosts and better visual effects!
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {upgradeResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 border-2 border-green-400 text-center"
        >
          <div className="text-4xl mb-3">✨</div>
          <h4 className="text-xl font-bold mb-2">Upgrade Successful!</h4>
          <p className="text-lg">
            {upgradeResult.type === 'power' 
              ? `Power increased to ${upgradeResult.meme.power}!` 
              : `Evolved to ${upgradeResult.meme.rarity.toUpperCase()}!`
            }
          </p>
          <p className="text-sm text-gray-200 mt-2">
            Cost: {upgradeResult.cost} coins
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MemeUpgrade;
