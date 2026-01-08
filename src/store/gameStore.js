import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGameStore = create(
  persist(
    (set, get) => ({
      // Game State
      gameState: 'collection',
      playerCoins: 1000,
      playerMemes: [],
      selectedMeme: null,
      battleResult: null,
      showConfetti: false,
      
      // Player Stats
      playerStats: {
        level: 1,
        experience: 0,
        totalWins: 0,
        totalLosses: 0,
        totalBattles: 0,
        achievements: [],
        rank: 'Bronze',
        winStreak: 0,
        maxWinStreak: 0,
      },
      
      // Daily Rewards
      lastClaimDate: null,
      dailyStreak: 0,
      
      // Shop & Trading
      shopInventory: [],
      tradeHistory: [],
      
      // Guild System
      guild: null,
      guildContributions: 0,
      
      // Settings
      settings: {
        soundEnabled: true,
        animationsEnabled: true,
        theme: 'dark',
        autoSave: true,
      },
      
      // Actions
      setGameState: (newState) => set({ gameState: newState }),
      
      setPlayerCoins: (amount) => set({ playerCoins: amount }),
      
      addCoins: (amount) => set((state) => ({ playerCoins: state.playerCoins + amount })),
      
      spendCoins: (amount) => set((state) => ({ 
        playerCoins: Math.max(0, state.playerCoins - amount) 
      })),
      
      setPlayerMemes: (memes) => set({ playerMemes: memes }),
      
      addMeme: (meme) => set((state) => ({
        playerMemes: [...state.playerMemes, { ...meme, id: Date.now(), level: 1 }]
      })),
      
      removeMeme: (memeId) => set((state) => ({
        playerMemes: state.playerMemes.filter(m => m.id !== memeId)
      })),
      
      upgradeMeme: (memeId, upgradedMeme) => set((state) => ({
        playerMemes: state.playerMemes.map(meme => 
          meme.id === memeId ? upgradedMeme : meme
        )
      })),
      
      setSelectedMeme: (meme) => set({ selectedMeme: meme }),
      
      setBattleResult: (result) => set({ battleResult: result }),
      
      triggerConfetti: () => {
        set({ showConfetti: true });
        setTimeout(() => set({ showConfetti: false }), 2000);
      },
      
      updatePlayerStats: (statsUpdate) => set((state) => ({
        playerStats: { ...state.playerStats, ...statsUpdate }
      })),
      
      addExperience: (exp) => set((state) => {
        const newExp = state.playerStats.experience + exp;
        const newLevel = Math.floor(newExp / 500) + 1;
        const leveledUp = newLevel > state.playerStats.level;
        
        return {
          playerStats: {
            ...state.playerStats,
            experience: newExp,
            level: newLevel,
            rank: newLevel >= 10 ? 'Diamond' : newLevel >= 7 ? 'Platinum' : newLevel >= 5 ? 'Gold' : newLevel >= 3 ? 'Silver' : 'Bronze'
          }
        };
      }),
      
      recordBattle: (won, coinsWon) => set((state) => {
        const newWinStreak = won ? state.playerStats.winStreak + 1 : 0;
        const newMaxWinStreak = Math.max(newWinStreak, state.playerStats.maxWinStreak);
        
        return {
          playerStats: {
            ...state.playerStats,
            totalBattles: state.playerStats.totalBattles + 1,
            totalWins: won ? state.playerStats.totalWins + 1 : state.playerStats.totalWins,
            totalLosses: won ? state.playerStats.totalLosses : state.playerStats.totalLosses + 1,
            winStreak: newWinStreak,
            maxWinStreak: newMaxWinStreak,
            experience: state.playerStats.experience + (won ? 50 : 10)
          },
          playerCoins: won ? state.playerCoins + coinsWon : state.playerCoins
        };
      }),
      
      claimDailyReward: (reward) => set((state) => ({
        playerCoins: state.playerCoins + reward.coins,
        lastClaimDate: new Date().toDateString(),
        dailyStreak: state.dailyStreak + 1,
        playerStats: {
          ...state.playerStats,
          experience: state.playerStats.experience + reward.experience
        }
      })),
      
      addToTradeHistory: (trade) => set((state) => ({
        tradeHistory: [trade, ...state.tradeHistory].slice(0, 50) // Keep last 50 trades
      })),
      
      joinGuild: (guild) => set({ guild }),
      
      leaveGuild: () => set({ guild: null, guildContributions: 0 }),
      
      contributeToGuild: (amount) => set((state) => ({
        guildContributions: state.guildContributions + amount,
        playerCoins: Math.max(0, state.playerCoins - amount)
      })),
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      
      resetGame: () => set({
        gameState: 'collection',
        playerCoins: 1000,
        playerMemes: [],
        selectedMeme: null,
        battleResult: null,
        showConfetti: false,
        playerStats: {
          level: 1,
          experience: 0,
          totalWins: 0,
          totalLosses: 0,
          totalBattles: 0,
          achievements: [],
          rank: 'Bronze',
          winStreak: 0,
          maxWinStreak: 0,
        },
        lastClaimDate: null,
        dailyStreak: 0,
        shopInventory: [],
        tradeHistory: [],
        guild: null,
        guildContributions: 0,
      }),
      
      // Getters
      getWinRate: () => {
        const state = get();
        return state.playerStats.totalBattles > 0 
          ? ((state.playerStats.totalWins / state.playerStats.totalBattles) * 100).toFixed(1)
          : '0.0';
      },
      
      getTotalValue: () => {
        const state = get();
        return state.playerMemes.reduce((total, meme) => total + (meme.price || 0), 0) + state.playerCoins;
      },
      
      canAfford: (amount) => {
        const state = get();
        return state.playerCoins >= amount;
      },
      
      getMemeById: (id) => {
        const state = get();
        return state.playerMemes.find(meme => meme.id === id);
      },
    }),
    {
      name: 'crypto-meme-game-storage',
      version: 1,
    }
  )
);

export default useGameStore;
