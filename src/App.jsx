import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Trophy, Sword, Heart, Star, Zap, Shield, TrendingUp } from 'lucide-react';
import GameHeader from './components/GameHeader';
import MemeCollection from './components/MemeCollection';
import BattleArena from './components/BattleArena';
import Leaderboard from './components/Leaderboard';
import Shop from './components/Shop';

const CryptoMemeGame = () => {
  const [gameState, setGameState] = useState('collection');
  const [playerCoins, setPlayerCoins] = useState(1000);
  const [playerMemes, setPlayerMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const cryptoMemes = [
    { id: 1, name: 'Doge To The Moon', power: 85, rarity: 'legendary', emoji: '🐕', price: 500 },
    { id: 2, name: 'Pepe Frog', power: 70, rarity: 'epic', emoji: '🐸', price: 300 },
    { id: 3, name: 'WAGMI', power: 60, rarity: 'rare', emoji: '🚀', price: 200 },
    { id: 4, name: 'HODL', power: 75, rarity: 'epic', emoji: '💎', price: 350 },
    { id: 5, name: 'GM', power: 50, rarity: 'common', emoji: '☀️', price: 100 },
    { id: 6, name: 'NGMI', power: 40, rarity: 'common', emoji: '😢', price: 80 },
    { id: 7, name: 'Diamond Hands', power: 90, rarity: 'legendary', emoji: '💪', price: 600 },
    { id: 8, name: 'Paper Hands', power: 30, rarity: 'common', emoji: '🧻', price: 50 },
  ];

  useEffect(() => {
    const starterMeme = cryptoMemes.find(meme => meme.name === 'Doge To The Moon');
    if (starterMeme) {
      setPlayerMemes([starterMeme]);
    }
  }, []);

  const buyMeme = (meme) => {
    if (playerCoins >= meme.price) {
      setPlayerCoins(playerCoins - meme.price);
      setPlayerMemes([...playerMemes, { ...meme, id: Date.now() }]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const battle = (playerMeme, opponentMeme) => {
    const playerPower = playerMeme.power + Math.floor(Math.random() * 20);
    const opponentPower = opponentMeme.power + Math.floor(Math.random() * 20);
    
    const won = playerPower > opponentPower;
    const coinsWon = won ? Math.floor(opponentMeme.price * 0.5) : 0;
    
    setBattleResult({
      won,
      playerPower,
      opponentPower,
      coinsWon,
      playerMeme,
      opponentMeme
    });
    
    if (won) {
      setPlayerCoins(playerCoins + coinsWon);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    
    setGameState('battle');
  };

  const renderGameContent = () => {
    switch(gameState) {
      case 'collection':
        return (
          <MemeCollection 
            memes={playerMemes}
            selectedMeme={selectedMeme}
            onSelectMeme={setSelectedMeme}
            onBattle={() => setGameState('battle')}
          />
        );
      case 'shop':
        return (
          <Shop 
            cryptoMemes={cryptoMemes}
            playerCoins={playerCoins}
            onBuyMeme={buyMeme}
          />
        );
      case 'battle':
        return (
          <BattleArena 
            playerMeme={selectedMeme}
            battleResult={battleResult}
            onBackToCollection={() => setGameState('collection')}
          />
        );
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="animate-bounce text-6xl text-center mt-20">🎉</div>
        </div>
      )}
      
      <GameHeader 
        gameState={gameState}
        setGameState={setGameState}
        playerCoins={playerCoins}
        playerMemes={playerMemes}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={gameState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto mt-8"
        >
          {renderGameContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CryptoMemeGame;
