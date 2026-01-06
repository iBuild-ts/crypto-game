import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, Sword, Trophy, Star, Target, AlertCircle } from 'lucide-react';

const AIBattleArena = ({ playerMemes, playerCoins, setPlayerCoins, playSound }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [aiMeme, setAiMeme] = useState(null);
  const [battleState, setBattleState] = useState('selecting'); // selecting, battling, results
  const [battleLog, setBattleLog] = useState([]);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [aiHealth, setAiHealth] = useState(100);
  const [playerStats, setPlayerStats] = useState({ wins: 0, losses: 0, totalBattles: 0 });

  const difficulties = {
    easy: {
      name: 'Rookie Bot',
      color: 'green',
      icon: '🤖',
      powerMultiplier: 0.7,
      rewardMultiplier: 0.5,
      description: 'Perfect for beginners'
    },
    medium: {
      name: 'Challenger AI',
      color: 'yellow',
      icon: '🎯',
      powerMultiplier: 1.0,
      rewardMultiplier: 1.0,
      description: 'Balanced challenge'
    },
    hard: {
      name: 'Master AI',
      color: 'red',
      icon: '🔥',
      powerMultiplier: 1.3,
      rewardMultiplier: 2.0,
      description: 'For experienced players'
    },
    insane: {
      name: 'Legendary AI',
      color: 'purple',
      icon: '💀',
      powerMultiplier: 1.6,
      rewardMultiplier: 3.0,
      description: 'Nearly unbeatable'
    }
  };

  const aiMemePool = {
    easy: [
      { id: 'ai1', name: 'Basic Pepe', power: 40, emoji: '🐸', rarity: 'common' },
      { id: 'ai2', name: 'Simple Doge', power: 45, emoji: '🐕', rarity: 'common' },
      { id: 'ai3', name: 'Noob Wojak', power: 35, emoji: '😢', rarity: 'common' }
    ],
    medium: [
      { id: 'ai4', name: 'Tactical Pepe', power: 65, emoji: '🐸', rarity: 'rare' },
      { id: 'ai5', name: 'Strategic Doge', power: 70, emoji: '🐕', rarity: 'rare' },
      { id: 'ai6', name: 'Smart Wojak', power: 60, emoji: '😎', rarity: 'rare' }
    ],
    hard: [
      { id: 'ai7', name: 'Elite Pepe', power: 85, emoji: '🐸', rarity: 'epic' },
      { id: 'ai8', name: 'Alpha Doge', power: 90, emoji: '🐕', rarity: 'epic' },
      { id: 'ai9', name: 'Pro Wojak', power: 80, emoji: '😤', rarity: 'epic' }
    ],
    insane: [
      { id: 'ai10', name: 'Legendary Pepe', power: 95, emoji: '👑', rarity: 'legendary' },
      { id: 'ai11', name: 'Mythic Doge', power: 100, emoji: '🌟', rarity: 'legendary' },
      { id: 'ai12', name: 'God Mode Wojak', power: 98, emoji: '🔥', rarity: 'legendary' }
    ]
  };

  const selectAIMeme = () => {
    const pool = aiMemePool[selectedDifficulty];
    const meme = pool[Math.floor(Math.random() * pool.length)];
    const difficulty = difficulties[selectedDifficulty];
    return {
      ...meme,
      power: Math.round(meme.power * difficulty.powerMultiplier)
    };
  };

  const startBattle = () => {
    if (!selectedMeme) return;
    
    const ai = selectAIMeme();
    setAiMeme(ai);
    setBattleState('battling');
    setPlayerHealth(100);
    setAiHealth(100);
    setBattleLog([`Battle started! ${selectedMeme.name} vs ${ai.name}`]);
    playSound('battle');
    
    simulateBattle();
  };

  const simulateBattle = () => {
    let pH = 100;
    let aH = 100;
    let round = 1;
    
    const battleInterval = setInterval(() => {
      // Player attack
      const playerDamage = Math.random() * selectedMeme.power * 0.25 + 15;
      aH -= playerDamage;
      
      // AI attack (smarter AI based on difficulty)
      let aiDamage;
      if (selectedDifficulty === 'easy') {
        aiDamage = Math.random() * aiMeme.power * 0.2 + 10;
      } else if (selectedDifficulty === 'medium') {
        aiDamage = Math.random() * aiMeme.power * 0.25 + 12;
      } else if (selectedDifficulty === 'hard') {
        aiDamage = Math.random() * aiMeme.power * 0.3 + 15;
        // Hard AI gets critical hits sometimes
        if (Math.random() < 0.2) aiDamage *= 1.5;
      } else {
        // Insane AI is very strategic
        aiDamage = Math.random() * aiMeme.power * 0.35 + 18;
        if (Math.random() < 0.3) aiDamage *= 1.8;
      }
      
      pH -= aiDamage;
      
      setPlayerHealth(Math.max(0, pH));
      setAiHealth(Math.max(0, aH));
      
      setBattleLog(prev => [
        ...prev,
        `Round ${round}: ${selectedMeme.name} deals ${Math.round(playerDamage)} damage!`,
        `Round ${round}: ${aiMeme.name} deals ${Math.round(aiDamage)} damage!`
      ]);
      
      if (pH <= 0 || aH <= 0) {
        clearInterval(battleInterval);
        endBattle(pH > 0);
      }
      
      round++;
    }, 1200);
  };

  const endBattle = (playerWon) => {
    setBattleState('results');
    const difficulty = difficulties[selectedDifficulty];
    
    setPlayerStats(prev => ({
      wins: prev.wins + (playerWon ? 1 : 0),
      losses: prev.losses + (playerWon ? 0 : 1),
      totalBattles: prev.totalBattles + 1
    }));
    
    if (playerWon) {
      const baseReward = 50;
      const reward = Math.round(baseReward * difficulty.rewardMultiplier);
      setPlayerCoins(prev => prev + reward);
      setBattleLog(prev => [...prev, `🎉 Victory! +${reward} coins earned!`]);
      playSound('victory');
    } else {
      setBattleLog(prev => [...prev, '💀 Defeat! The AI was too strong!']);
      playSound('defeat');
    }
  };

  const resetBattle = () => {
    setBattleState('selecting');
    setSelectedMeme(null);
    setAiMeme(null);
    setBattleLog([]);
    setPlayerHealth(100);
    setAiHealth(100);
  };

  const winRate = playerStats.totalBattles > 0 
    ? Math.round((playerStats.wins / playerStats.totalBattles) * 100) 
    : 0;

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-2xl border-2 border-indigo-400">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-cyan-400" />
          AI Battle Arena
        </h2>
        <p className="text-gray-300">Challenge artificial intelligence opponents of varying difficulty!</p>
      </div>

      {/* Player Stats */}
      <div className="bg-black/30 rounded-xl p-4 mb-6 grid grid-cols-4 gap-4">
        <div className="text-center">
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{playerStats.wins}</div>
          <div className="text-xs text-gray-300">Wins</div>
        </div>
        <div className="text-center">
          <Shield className="w-6 h-6 text-red-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{playerStats.losses}</div>
          <div className="text-xs text-gray-300">Losses</div>
        </div>
        <div className="text-center">
          <Target className="w-6 h-6 text-blue-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{playerStats.totalBattles}</div>
          <div className="text-xs text-gray-300">Total</div>
        </div>
        <div className="text-center">
          <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{winRate}%</div>
          <div className="text-xs text-gray-300">Win Rate</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {battleState === 'selecting' && (
          <motion.div
            key="selecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Difficulty Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-400" />
                Select Difficulty
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(difficulties).map(([key, diff]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDifficulty(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedDifficulty === key 
                        ? `border-${diff.color}-400 bg-${diff.color}-400/20` 
                        : 'border-gray-400 bg-gray-400/10 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{diff.icon}</div>
                    <div className="text-white font-semibold">{diff.name}</div>
                    <div className="text-xs text-gray-300">{diff.description}</div>
                    <div className="text-sm text-yellow-400 mt-1">×{diff.rewardMultiplier} Rewards</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Meme Selection */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Choose Your Meme:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {playerMemes.map((meme) => (
                  <motion.button
                    key={meme.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMeme(meme)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMeme?.id === meme.id 
                        ? 'border-cyan-400 bg-cyan-400/20' 
                        : 'border-purple-400 bg-purple-400/10 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{meme.emoji}</div>
                    <div className="text-white font-semibold">{meme.name}</div>
                    <div className="text-sm text-gray-300">Power: {meme.power}</div>
                    <div className="text-xs text-purple-300">{meme.rarity}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Start Battle Button */}
            {selectedMeme && (
              <motion.div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startBattle}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-3 mx-auto"
                >
                  <Sword className="w-6 h-6" />
                  Start Battle vs {difficulties[selectedDifficulty].name}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {battleState === 'battling' && (
          <motion.div
            key="battling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-white font-bold mb-2">Your Meme</h4>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{selectedMeme?.emoji}</span>
                    <span className="text-white font-bold">{selectedMeme?.name}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: `${playerHealth}%` }}
                      className="bg-green-500 h-4 rounded-full"
                    />
                  </div>
                  <div className="text-white text-sm mt-1">{Math.round(playerHealth)} HP</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  {difficulties[selectedDifficulty].icon} {difficulties[selectedDifficulty].name}
                </h4>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{aiMeme?.emoji}</span>
                    <span className="text-white font-bold">{aiMeme?.name}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: `${aiHealth}%` }}
                      className="bg-red-500 h-4 rounded-full"
                    />
                  </div>
                  <div className="text-white text-sm mt-1">{Math.round(aiHealth)} HP</div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 h-32 overflow-y-auto">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Battle Log
              </h4>
              {battleLog.map((log, index) => (
                <div key={index} className="text-gray-300 text-sm">{log}</div>
              ))}
            </div>
          </motion.div>
        )}

        {battleState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="mb-6">
              {playerHealth > 0 ? (
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              ) : (
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              )}
              <h3 className="text-3xl font-bold text-white">
                {playerHealth > 0 ? 'Victory!' : 'Defeat!'}
              </h3>
              <p className="text-gray-300 mt-2">
                vs {difficulties[selectedDifficulty].name}
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <h4 className="text-white font-bold mb-2">Battle Summary</h4>
              {battleLog.slice(-3).map((log, index) => (
                <div key={index} className="text-gray-300 text-sm">{log}</div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetBattle}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Battle Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIBattleArena;
