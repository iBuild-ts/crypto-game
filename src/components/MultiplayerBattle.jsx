import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Swords, Shield, Zap, Trophy, Clock, Star, Target, Gamepad2 } from 'lucide-react';

const MultiplayerBattle = ({ playerMemes, playerCoins, setPlayerCoins, playSound }) => {
  const [battleState, setBattleState] = useState('matching'); // matching, found, battling, results
  const [opponent, setOpponent] = useState(null);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [countdown, setCountdown] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [streak, setStreak] = useState(0);

  // Simulate matchmaking
  const startMatchmaking = useCallback(() => {
    setBattleState('matching');
    setSearchTime(0);
    setBattleLog([]);
    
    const searchInterval = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);

    // Simulate finding opponent after 3-8 seconds
    const matchTime = Math.random() * 5000 + 3000;
    setTimeout(() => {
      clearInterval(searchInterval);
      findOpponent();
    }, matchTime);
  }, []);

  const findOpponent = () => {
    const opponents = [
      { name: 'CryptoKing', level: 15, wins: 142, losses: 23, avatar: '👑', memes: [
        { id: 101, name: 'Golden Doge', power: 95, rarity: 'legendary', emoji: '🐕' },
        { id: 102, name: 'Diamond Pepe', power: 88, rarity: 'epic', emoji: '🐸' }
      ]},
      { name: 'MemeMaster', level: 22, wins: 289, losses: 67, avatar: '🎮', memes: [
        { id: 201, name: 'Ultra Chad', power: 92, rarity: 'legendary', emoji: '💪' },
        { id: 202, name: 'Super Wojak', power: 85, rarity: 'epic', emoji: '😎' }
      ]},
      { name: 'DiamondHands', level: 18, wins: 198, losses: 45, avatar: '💎', memes: [
        { id: 301, name: 'Moon Rocket', power: 90, rarity: 'legendary', emoji: '🚀' },
        { id: 302, name: 'Laser Eyes', power: 87, rarity: 'epic', emoji: '👁️' }
      ]},
      { name: 'WhaleTrader', level: 25, wins: 412, losses: 89, avatar: '🐋', memes: [
        { id: 401, name: 'Bitcoin Maxi', power: 96, rarity: 'legendary', emoji: '₿' },
        { id: 402, name: 'Ethereum Lord', power: 93, rarity: 'legendary', emoji: 'Ξ' }
      ]}
    ];

    const selectedOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    setOpponent(selectedOpponent);
    setBattleState('found');
    playSound('achievement');
    
    // Auto-start battle after 3 seconds
    setTimeout(() => {
      startBattle();
    }, 3000);
  };

  const startBattle = () => {
    if (!selectedMeme || !opponent) return;
    
    setBattleState('battling');
    setPlayerHealth(100);
    setOpponentHealth(100);
    setBattleLog([`${selectedMeme.name} vs ${opponent.memes[0].name}!`]);
    playSound('battle');
    
    simulateBattle();
  };

  const simulateBattle = () => {
    let pH = 100;
    let oH = 100;
    let round = 1;
    
    const battleInterval = setInterval(() => {
      const playerDamage = Math.random() * selectedMeme.power * 0.3 + 10;
      const opponentDamage = Math.random() * opponent.memes[0].power * 0.3 + 8;
      
      oH -= playerDamage;
      pH -= opponentDamage;
      
      setPlayerHealth(Math.max(0, pH));
      setOpponentHealth(Math.max(0, oH));
      
      setBattleLog(prev => [
        ...prev,
        `Round ${round}: ${selectedMeme.name} deals ${Math.round(playerDamage)} damage!`,
        `Round ${round}: ${opponent.memes[0].name} deals ${Math.round(opponentDamage)} damage!`
      ]);
      
      if (pH <= 0 || oH <= 0) {
        clearInterval(battleInterval);
        endBattle(pH > 0);
      }
      
      round++;
    }, 1500);
  };

  const endBattle = (playerWon) => {
    setBattleState('results');
    
    if (playerWon) {
      setWins(prev => prev + 1);
      setStreak(prev => prev + 1);
      const reward = Math.floor(Math.random() * 200 + 100);
      setPlayerCoins(prev => prev + reward);
      setBattleLog(prev => [...prev, `🎉 Victory! +${reward} coins earned!`]);
      playSound('victory');
    } else {
      setLosses(prev => prev + 1);
      setStreak(0);
      setBattleLog(prev => [...prev, '💀 Defeat! Try again!']);
      playSound('defeat');
    }
  };

  const playAgain = () => {
    setSelectedMeme(null);
    setOpponent(null);
    setBattleState('matching');
    startMatchmaking();
  };

  const returnToLobby = () => {
    setBattleState('matching');
    setSelectedMeme(null);
    setOpponent(null);
    setBattleLog([]);
  };

  useEffect(() => {
    startMatchmaking();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 shadow-2xl border-2 border-purple-400">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-yellow-400" />
          Multiplayer Battle Arena
        </h2>
        <p className="text-gray-300">Challenge players worldwide in real-time battles!</p>
      </div>

      {/* Stats Bar */}
      <div className="bg-black/30 rounded-xl p-4 mb-6 grid grid-cols-4 gap-4">
        <div className="text-center">
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{wins}</div>
          <div className="text-xs text-gray-300">Wins</div>
        </div>
        <div className="text-center">
          <Shield className="w-6 h-6 text-red-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{losses}</div>
          <div className="text-xs text-gray-300">Losses</div>
        </div>
        <div className="text-center">
          <Zap className="w-6 h-6 text-orange-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{streak}</div>
          <div className="text-xs text-gray-300">Streak</div>
        </div>
        <div className="text-center">
          <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{wins > 0 ? Math.round((wins/(wins+losses))*100) : 0}%</div>
          <div className="text-xs text-gray-300">Win Rate</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {battleState === 'matching' && (
          <motion.div
            key="matching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <Users className="w-16 h-16 text-blue-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mt-4">Finding Opponent...</h3>
              <p className="text-gray-300 mt-2">Search time: {searchTime}s</p>
            </div>
            
            {/* Meme Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Select Your Meme:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {playerMemes.map((meme) => (
                  <motion.button
                    key={meme.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMeme(meme)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMeme?.id === meme.id 
                        ? 'border-yellow-400 bg-yellow-400/20' 
                        : 'border-purple-400 bg-purple-400/10 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{meme.emoji}</div>
                    <div className="text-white font-semibold">{meme.name}</div>
                    <div className="text-sm text-gray-300">Power: {meme.power}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {battleState === 'found' && (
          <motion.div
            key="found"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="mb-6">
              <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">Opponent Found!</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="bg-black/30 rounded-xl p-6">
                <div className="text-6xl mb-4">{selectedMeme?.emoji}</div>
                <div className="text-white font-bold">{selectedMeme?.name}</div>
                <div className="text-gray-300">Power: {selectedMeme?.power}</div>
              </div>
              
              <div className="bg-black/30 rounded-xl p-6">
                <div className="text-6xl mb-4">{opponent.avatar}</div>
                <div className="text-white font-bold">{opponent.name}</div>
                <div className="text-gray-300">Level {opponent.level} • {opponent.wins}W/{opponent.losses}L</div>
              </div>
            </div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-white text-lg"
            >
              Battle starting in 3...
            </motion.div>
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
                <h4 className="text-white font-bold mb-2">Opponent</h4>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{opponent.memes[0].emoji}</span>
                    <span className="text-white font-bold">{opponent.memes[0].name}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: `${opponentHealth}%` }}
                      className="bg-red-500 h-4 rounded-full"
                    />
                  </div>
                  <div className="text-white text-sm mt-1">{Math.round(opponentHealth)} HP</div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 h-32 overflow-y-auto">
              <h4 className="text-white font-bold mb-2">Battle Log</h4>
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
                <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
              )}
              <h3 className="text-3xl font-bold text-white">
                {playerHealth > 0 ? 'Victory!' : 'Defeat!'}
              </h3>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <h4 className="text-white font-bold mb-2">Battle Summary</h4>
              {battleLog.slice(-4).map((log, index) => (
                <div key={index} className="text-gray-300 text-sm">{log}</div>
              ))}
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={playAgain}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={returnToLobby}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Return to Lobby
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiplayerBattle;
