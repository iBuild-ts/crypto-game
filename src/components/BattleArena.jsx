import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Heart, Zap, Trophy, Coins, Skull, Crown } from 'lucide-react';

const BattleArena = ({ playerMeme, battleResult, onBackToCollection }) => {
  const [opponentMeme, setOpponentMeme] = useState(null);
  const [isBattling, setIsBattling] = useState(false);
  const [battlePhase, setBattlePhase] = useState('ready');

  const generateOpponent = () => {
    const opponents = [
      { id: 'opp1', name: 'FUD Master', power: 45, rarity: 'common', emoji: '😱', price: 150 },
      { id: 'opp2', name: 'Shill Bot', power: 55, rarity: 'rare', emoji: '🤖', price: 250 },
      { id: 'opp3', name: 'Whale', power: 80, rarity: 'epic', emoji: '🐋', price: 400 },
      { id: 'opp4', name: 'Diamond Hand Chad', power: 95, rarity: 'legendary', emoji: '💎', price: 650 },
      { id: 'opp5', name: 'Paper Hand Peter', power: 35, rarity: 'common', emoji: '📉', price: 100 },
    ];
    
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    setOpponentMeme(randomOpponent);
    setBattlePhase('opponent-ready');
  };

  const startBattle = () => {
    if (!playerMeme || !opponentMeme) return;
    
    setIsBattling(true);
    setBattlePhase('battle');
    
    setTimeout(() => {
      setBattlePhase('result');
      setIsBattling(false);
    }, 3000);
  };

  useEffect(() => {
    if (battleResult) {
      setBattlePhase('result');
    }
  }, [battleResult]);

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          Battle Arena
        </h2>
        <p className="text-gray-300">Challenge opponents to earn coins!</p>
      </motion.div>

      {!playerMeme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-red-800 bg-opacity-50 rounded-xl"
        >
          <div className="text-6xl mb-4">⚔️</div>
          <p className="text-xl text-gray-300">Select a meme from your collection to battle!</p>
          <button
            onClick={onBackToCollection}
            className="mt-4 crypto-button"
          >
            Go to Collection
          </button>
        </motion.div>
      )}

      {playerMeme && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="battle-card"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Your Meme</h3>
            <div className="text-center">
              <div className="text-6xl mb-3">{playerMeme.emoji}</div>
              <h4 className="text-lg font-bold mb-2">{playerMeme.name}</h4>
              <div className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getRarityColor(playerMeme.rarity)} text-white inline-block mb-3`}>
                {playerMeme.rarity.toUpperCase()}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">Power: {playerMeme.power}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center"
          >
            <div className="text-center">
              {battlePhase === 'ready' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="space-y-4"
                >
                  <div className="text-6xl">⚔️</div>
                  <button
                    onClick={generateOpponent}
                    className="crypto-button"
                  >
                    Find Opponent
                  </button>
                </motion.div>
              )}

              {battlePhase === 'opponent-ready' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="space-y-4"
                >
                  <div className="text-4xl animate-pulse">⚡</div>
                  <button
                    onClick={startBattle}
                    className="crypto-button"
                    disabled={isBattling}
                  >
                    {isBattling ? 'Battling...' : 'Start Battle!'}
                  </button>
                </motion.div>
              )}

              {battlePhase === 'battle' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-6xl"
                >
                  ⚔️
                </motion.div>
              )}

              {battlePhase === 'result' && battleResult && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="space-y-4"
                >
                  <div className="text-6xl">
                    {battleResult.won ? '🏆' : '💀'}
                  </div>
                  <div className={`text-2xl font-bold ${battleResult.won ? 'text-green-400' : 'text-red-400'}`}>
                    {battleResult.won ? 'Victory!' : 'Defeat!'}
                  </div>
                  {battleResult.won && (
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                      <Coins className="w-5 h-5" />
                      <span className="font-bold">+{battleResult.coinsWon} coins</span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setBattlePhase('ready');
                      setOpponentMeme(null);
                    }}
                    className="crypto-button text-sm"
                  >
                    Battle Again
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="battle-card"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Opponent</h3>
            {opponentMeme ? (
              <div className="text-center">
                <div className="text-6xl mb-3">{opponentMeme.emoji}</div>
                <h4 className="text-lg font-bold mb-2">{opponentMeme.name}</h4>
                <div className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getRarityColor(opponentMeme.rarity)} text-white inline-block mb-3`}>
                  {opponentMeme.rarity.toUpperCase()}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">Power: {opponentMeme.power}</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-3">❓</div>
                <p>Waiting for opponent...</p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {battleResult && battlePhase === 'result' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h3 className="text-xl font-bold mb-4 text-center">Battle Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-1">Your Power</p>
              <p className="text-2xl font-bold text-green-400">{battleResult.playerPower}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-1">Opponent Power</p>
              <p className="text-2xl font-bold text-red-400">{battleResult.opponentPower}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="text-center">
        <button
          onClick={onBackToCollection}
          className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
        >
          Back to Collection
        </button>
      </div>
    </div>
  );
};

export default BattleArena;
