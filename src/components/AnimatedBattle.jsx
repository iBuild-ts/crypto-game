import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Heart, Star, Swords, Trophy, Skull, Sparkles } from 'lucide-react';

const AnimatedBattle = ({ playerMeme, opponentMeme, onBattleComplete }) => {
  const [battlePhase, setBattlePhase] = useState('intro');
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (battlePhase === 'intro') {
      setTimeout(() => setBattlePhase('ready'), 2000);
    }
  }, [battlePhase]);

  const startBattle = () => {
    setBattlePhase('battle');
    simulateBattle();
  };

  const simulateBattle = () => {
    let currentTurn = 0;
    let pHealth = 100;
    let oHealth = 100;
    const log = [];

    const battleInterval = setInterval(() => {
      currentTurn++;
      
      // Calculate damage
      const playerDamage = Math.floor(Math.random() * 20) + 10;
      const opponentDamage = Math.floor(Math.random() * 20) + 10;
      
      // Apply damage with some randomness
      if (currentTurn % 2 === 1) {
        // Player attacks
        oHealth = Math.max(0, oHealth - playerDamage);
        log.push({
          type: 'player',
          message: `${playerMeme.name} deals ${playerDamage} damage!`,
          damage: playerDamage
        });
      } else {
        // Opponent attacks
        pHealth = Math.max(0, pHealth - opponentDamage);
        log.push({
          type: 'opponent',
          message: `${opponentMeme.name} deals ${opponentDamage} damage!`,
          damage: opponentDamage
        });
      }

      setPlayerHealth(pHealth);
      setOpponentHealth(oHealth);
      setBattleLog([...log]);

      // Check for winner
      if (pHealth <= 0 || oHealth <= 0) {
        clearInterval(battleInterval);
        const battleWinner = pHealth > 0 ? 'player' : 'opponent';
        setWinner(battleWinner);
        setBattlePhase('complete');
        
        setTimeout(() => {
          onBattleComplete({
            winner: battleWinner,
            playerHealth: pHealth,
            opponentHealth: oHealth
          });
        }, 3000);
      }
    }, 1500);
  };

  const getHealthBarColor = (health) => {
    if (health > 60) return 'bg-green-500';
    if (health > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Battle Arena */}
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute top-40 right-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-20 left-1/2 w-48 h-48 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
          </div>

          {/* Battle Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8 relative z-10"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-2">
              MEME BATTLE
            </h1>
            <p className="text-gray-300 text-lg">
              {battlePhase === 'intro' && 'Get ready for battle!'}
              {battlePhase === 'ready' && 'Click Start Battle to begin!'}
              {battlePhase === 'battle' && 'Battle in progress...'}
              {battlePhase === 'complete' && (
                winner === 'player' ? '🎉 Victory!' : '💀 Defeat!'
              )}
            </p>
          </motion.div>

          {/* Battle Field */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {/* Player Side */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="battle-card"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: battlePhase === 'battle' && battleLog[battleLog.length - 1]?.type === 'player' ? [1, 1.2, 1] : 1,
                    rotate: battlePhase === 'battle' ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-8xl mb-4"
                >
                  {playerMeme?.emoji || '❓'}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2">{playerMeme?.name || 'Player'}</h3>
                
                {/* Health Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>HP</span>
                    <span>{playerHealth}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${playerHealth}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${getHealthBarColor(playerHealth)} transition-colors duration-300`}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {playerMeme?.power || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Defense
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Battle Center */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center"
            >
              <div className="text-center">
                {battlePhase === 'intro' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl"
                  >
                    ⚔️
                  </motion.div>
                )}
                
                {battlePhase === 'ready' && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={startBattle}
                    className="crypto-button text-lg px-8 py-4"
                  >
                    <Swords className="w-6 h-6 inline mr-2" />
                    Start Battle!
                  </motion.button>
                )}
                
                {battlePhase === 'battle' && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-6xl"
                  >
                    ⚡
                  </motion.div>
                )}
                
                {battlePhase === 'complete' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl"
                  >
                    {winner === 'player' ? '🏆' : '💀'}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Opponent Side */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="battle-card"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: battlePhase === 'battle' && battleLog[battleLog.length - 1]?.type === 'opponent' ? [1, 1.2, 1] : 1,
                    rotate: battlePhase === 'battle' ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-8xl mb-4"
                >
                  {opponentMeme?.emoji || '❓'}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2">{opponentMeme?.name || 'Opponent'}</h3>
                
                {/* Health Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>HP</span>
                    <span>{opponentHealth}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${opponentHealth}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${getHealthBarColor(opponentHealth)} transition-colors duration-300`}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {opponentMeme?.power || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Defense
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Battle Log */}
          <AnimatePresence>
            {battleLog.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400 relative z-10"
              >
                <h3 className="text-xl font-bold mb-4">Battle Log</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {battleLog.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: log.type === 'player' ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-sm p-2 rounded ${
                        log.type === 'player' 
                          ? 'bg-green-600 bg-opacity-30 text-green-300' 
                          : 'bg-red-600 bg-opacity-30 text-red-300'
                      }`}
                    >
                      {log.message}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Damage Effects */}
          <AnimatePresence>
            {battleLog[battleLog.length - 1] && battlePhase === 'battle' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className={`absolute top-1/2 text-4xl font-bold z-20 ${
                  battleLog[battleLog.length - 1].type === 'player' ? 'left-1/4' : 'right-1/4'
                }`}
              >
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
                  -{battleLog[battleLog.length - 1].damage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Victory Effects */}
          {battlePhase === 'complete' && winner === 'player' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none z-30"
            >
              <div className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-8xl"
                >
                  🎉
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBattle;
