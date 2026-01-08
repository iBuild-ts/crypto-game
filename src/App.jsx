import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Trophy, Sword, Heart, Star, Zap, Shield, TrendingUp, User, Award, Gift, ArrowLeftRight } from 'lucide-react';
import useSound from './hooks/useSound';
import useGameStore from './store/gameStore';
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
import MultiplayerBattle from './components/MultiplayerBattle';
import AIBattleArena from './components/AIBattleArena';
import GuildSystem from './components/GuildSystem';

const CryptoMemeGame = () => {
  const { playSound, soundEnabled, toggleSound } = useSound();
  
  // Use Zustand store
  const {
    gameState,
    setGameState,
    playerCoins,
    playerMemes,
    selectedMeme,
    setSelectedMeme,
    battleResult,
    setBattleResult,
    showConfetti,
    triggerConfetti,
    playerStats,
    lastClaimDate,
    claimDailyReward,
    addMeme,
    spendCoins,
    recordBattle,
    resetGame,
    settings,
    updateSettings,
  } = useGameStore();

  const cryptoMemes = [
    { id: 1, name: 'Doge To The Moon', power: 85, rarity: 'legendary', emoji: '🐕', price: 500 },
    { id: 2, name: 'Pepe Frog', power: 70, rarity: 'epic', emoji: '🐸', price: 300 },
    { id: 3, name: 'WAGMI', power: 60, rarity: 'rare', emoji: '🚀', price: 200 },
    { id: 4, name: 'HODL', power: 75, rarity: 'epic', emoji: '💎', price: 350 },
    { id: 5, name: 'GM', power: 50, rarity: 'common', emoji: '☀️', price: 100 },
    { id: 6, name: 'NGMI', power: 40, rarity: 'common', emoji: '😢', price: 80 },
    { id: 7, name: 'Diamond Hands', power: 90, rarity: 'legendary', emoji: '💪', price: 600 },
    { id: 8, name: 'Paper Hands', power: 30, rarity: 'common', emoji: '🧻', price: 50 },
    { id: 9, name: 'Laser Eyes', power: 95, rarity: 'legendary', emoji: '👁️', price: 750 },
    { id: 10, name: 'To The Moon', power: 88, rarity: 'epic', emoji: '🌙', price: 450 },
  ];

  // Initialize with starter meme
  useEffect(() => {
    if (playerMemes.length === 0) {
      const starterMeme = cryptoMemes.find(meme => meme.name === 'Doge To The Moon');
      if (starterMeme) {
        addMeme(starterMeme);
      }
    }
  }, [playerMemes.length, addMeme]);

  const buyMeme = (meme) => {
    if (playerCoins >= meme.price) {
      spendCoins(meme.price);
      addMeme(meme);
      triggerConfetti();
      playSound('coin');
    }
  };

  const upgradeMeme = (memeId, upgradedMeme, cost) => {
    if (playerCoins >= cost) {
      spendCoins(cost);
      const { upgradeMeme } = useGameStore.getState();
      upgradeMeme(memeId, upgradedMeme);
      playSound('achievement');
    }
  };

  const handleClaimDailyReward = (reward) => {
    claimDailyReward(reward);
    playSound('achievement');
    triggerConfetti();
  };

  const performTrade = (type, meme, amount) => {
    if (type === 'buy') {
      spendCoins(amount);
      addMeme(meme);
      playSound('trade');
    } else if (type === 'sell') {
      const { addCoins, removeMeme } = useGameStore.getState();
      addCoins(amount);
      removeMeme(meme.id);
      playSound('trade');
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
    
    recordBattle(won, coinsWon);
    
    if (won) {
      triggerConfetti();
      playSound('victory');
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
                const { addCoins } = useGameStore.getState();
                addCoins(100);
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
            onClaimReward={handleClaimDailyReward}
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
            settings={settings}
            updateSettings={updateSettings}
          />
        );
      case 'multiplayer':
        return (
          <MultiplayerBattle 
            playerMemes={playerMemes}
            playerCoins={playerCoins}
            setPlayerCoins={useGameStore.getState().setPlayerCoins}
            playSound={playSound}
          />
        );
      case 'ai-battle':
        return (
          <AIBattleArena 
            playerMemes={playerMemes}
            playerCoins={playerCoins}
            setPlayerCoins={useGameStore.getState().setPlayerCoins}
            playSound={playSound}
          />
        );
      case 'guilds':
        return (
          <GuildSystem 
            playerCoins={playerCoins}
            setPlayerCoins={useGameStore.getState().setPlayerCoins}
            playSound={playSound}
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
