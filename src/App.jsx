import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Trophy, Sword, Heart, Star, Zap, Shield, TrendingUp, User, Award, Gift, ArrowLeftRight } from 'lucide-react';
import GameHeader from './components/GameHeader';
import MemeCollection from './components/MemeCollection';
import BattleArena from './components/BattleArena';
import Leaderboard from './components/Leaderboard';
import Shop from './components/Shop';
import PlayerProfile from './components/PlayerProfile';
import Achievements from './components/Achievements';
import TournamentMode from './components/TournamentMode';
import MemeUpgrade from './components/MemeUpgrade';
import DailyRewards from './components/DailyRewards';
import TradingPost from './components/TradingPost';
import Settings from './components/Settings';
import AnimatedBattle from './components/AnimatedBattle';

const CryptoMemeGame = () => {
  const [gameState, setGameState] = useState('collection');
  const [playerCoins, setPlayerCoins] = useState(1000);
  const [playerMemes, setPlayerMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    totalWins: 0,
    totalLosses: 0,
    totalBattles: 0,
    achievements: []
  });
  const [lastClaimDate, setLastClaimDate] = useState(null);
  
  const resetGame = () => {
    if (confirm('Are you sure you want to reset all game progress? This cannot be undone!')) {
      setPlayerCoins(1000);
      setPlayerMemes([]);
      setPlayerStats({
        level: 1,
        experience: 0,
        totalWins: 0,
        totalLosses: 0,
        totalBattles: 0,
        achievements: []
      });
      setLastClaimDate(null);
      setSelectedMeme(null);
      setBattleResult(null);
      localStorage.clear();
      alert('Game has been reset!');
    }
  };

  const { playSound, soundEnabled, toggleSound } = useSound();

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
      setPlayerMemes([...playerMemes, { ...meme, id: Date.now(), level: 1 }]);
      setShowConfetti(true);
      playSound('coin');
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const upgradeMeme = (memeId, upgradedMeme, cost) => {
    if (playerCoins >= cost) {
      setPlayerCoins(playerCoins - cost);
      setPlayerMemes(playerMemes.map(meme => 
        meme.id === memeId ? upgradedMeme : meme
      ));
      playSound('achievement');
    }
  };

  const claimDailyReward = (reward) => {
    setPlayerCoins(playerCoins + reward.coins);
    setLastClaimDate(new Date().toDateString());
    playSound('achievement');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const performTrade = (type, meme, amount) => {
    if (type === 'buy') {
      setPlayerCoins(playerCoins - amount);
      setPlayerMemes([...playerMemes, { ...meme, id: Date.now(), level: 1 }]);
      playSound('coin');
    } else if (type === 'sell') {
      setPlayerCoins(playerCoins + amount);
      setPlayerMemes(playerMemes.filter(m => m.id !== meme.id));
      playSound('coin');
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
    
    // Update player stats
    setPlayerStats(prev => ({
      ...prev,
      totalBattles: prev.totalBattles + 1,
      totalWins: won ? prev.totalWins + 1 : prev.totalWins,
      totalLosses: won ? prev.totalLosses : prev.totalLosses + 1,
      experience: prev.experience + (won ? 50 : 10)
    }));
    
    if (won) {
      setPlayerCoins(playerCoins + coinsWon);
      setShowConfetti(true);
      playSound('victory');
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      playSound('defeat');
    }
    
    playSound('battle');
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
      case 'animated_battle':
        return (
          <AnimatedBattle 
            playerMeme={selectedMeme}
            opponentMeme={battleResult?.opponentMeme}
            onBattleComplete={(result) => {
              if (result.winner === 'player') {
                setPlayerCoins(prev => prev + 100);
                playSound('victory');
              } else {
                playSound('defeat');
              }
              setGameState('collection');
            }}
          />
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <PlayerProfile playerStats={playerStats} />;
      case 'achievements':
        return <Achievements playerAchievements={playerStats.achievements} />;
      case 'tournament':
        return (
          <TournamentMode 
            playerMemes={playerMemes}
            onEnterTournament={() => {
              playSound('battle');
            }}
          />
        );
      case 'upgrade':
        return (
          <MemeUpgrade 
            playerMemes={playerMemes}
            playerCoins={playerCoins}
            onUpgradeMeme={upgradeMeme}
          />
        );
      case 'daily':
        return (
          <DailyRewards 
            onClaimReward={claimDailyReward}
            lastClaimDate={lastClaimDate}
          />
        );
      case 'trading':
        return (
          <TradingPost 
            playerMemes={playerMemes}
            playerCoins={playerCoins}
            onTrade={performTrade}
          />
        );
      case 'settings':
        return (
          <Settings 
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
            onResetGame={resetGame}
          />
        );
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
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
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
