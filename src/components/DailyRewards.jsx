import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Calendar, Clock, Check, Lock, Coins, Zap, Trophy } from 'lucide-react';

const DailyRewards = ({ onClaimReward, lastClaimDate }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  const rewards = [
    { day: 1, coins: 100, bonus: null, icon: '🪙' },
    { day: 2, coins: 150, bonus: null, icon: '💰' },
    { day: 3, coins: 200, bonus: null, icon: '💎' },
    { day: 4, coins: 250, bonus: 'Rare Meme Chest', icon: '📦' },
    { day: 5, coins: 300, bonus: null, icon: '🏆' },
    { day: 6, coins: 400, bonus: 'Epic Meme Chest', icon: '🌟' },
    { day: 7, coins: 500, bonus: 'Legendary Meme Chest', icon: '👑' },
  ];

  useEffect(() => {
    checkClaimStatus();
    const timer = setInterval(updateTimeUntilNext, 1000);
    return () => clearInterval(timer);
  }, [lastClaimDate]);

  const checkClaimStatus = () => {
    const now = new Date();
    const today = now.toDateString();
    
    if (lastClaimDate === today) {
      setClaimedToday(true);
      setCanClaim(false);
    } else {
      setClaimedToday(false);
      setCanClaim(true);
      
      // Calculate streak
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastClaimDate === yesterday.toDateString()) {
        setCurrentStreak(prev => prev + 1);
      } else if (lastClaimDate) {
        // Streak broken
        setCurrentStreak(0);
      }
    }
    
    updateTimeUntilNext();
  };

  const updateTimeUntilNext = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
  };

  const claimReward = () => {
    if (!canClaim) return;
    
    const dayIndex = currentStreak % 7;
    const reward = rewards[dayIndex];
    
    onClaimReward(reward);
    setClaimedToday(true);
    setCanClaim(false);
    setCurrentStreak(prev => prev + 1);
    
    // Save claim date
    localStorage.setItem('lastClaimDate', new Date().toDateString());
  };

  const getDayStatus = (dayIndex) => {
    const actualDay = (currentStreak % 7) + 1;
    
    if (dayIndex < actualDay) {
      return 'claimed';
    } else if (dayIndex === actualDay && canClaim) {
      return 'available';
    } else {
      return 'locked';
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
          Daily Rewards
        </h2>
        <p className="text-gray-300">Login every day to claim amazing prizes!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🔥</div>
            <p className="text-sm text-gray-300">Current Streak</p>
            <p className="text-2xl font-bold text-orange-400">{currentStreak} days</p>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Next Reward In</p>
            <p className="text-lg font-bold">{timeUntilNext}</p>
          </div>
          <div className="text-center">
            <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Status</p>
            <p className="text-lg font-bold">
              {claimedToday ? (
                <span className="text-green-400">Claimed Today ✓</span>
              ) : canClaim ? (
                <span className="text-yellow-400">Available!</span>
              ) : (
                <span className="text-gray-400">Wait for tomorrow</span>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">7-Day Reward Calendar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {rewards.map((reward, index) => {
            const status = getDayStatus(index);
            const isAvailable = status === 'available';
            const isClaimed = status === 'claimed';
            
            return (
              <motion.div
                key={reward.day}
                whileHover={isAvailable ? { scale: 1.05 } : {}}
                className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
                  isClaimed 
                    ? 'bg-gradient-to-br from-green-600 to-green-700 border-green-400'
                    : isAvailable
                    ? 'bg-gradient-to-br from-yellow-600 to-orange-600 border-yellow-400 ring-4 ring-yellow-300 ring-opacity-50'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 opacity-60'
                }`}
              >
                {isClaimed && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-5 h-5 text-green-300" />
                  </div>
                )}
                
                {!isAvailable && !isClaimed && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                <div className="text-center">
                  <div className="text-2xl mb-2">{reward.icon}</div>
                  <h4 className="font-bold mb-1">Day {reward.day}</h4>
                  <div className="text-lg font-bold text-yellow-300">
                    {reward.coins} <Coins className="w-4 h-4 inline" />
                  </div>
                  
                  {reward.bonus && (
                    <div className="text-xs mt-2 text-purple-300">
                      {reward.bonus}
                    </div>
                  )}

                  {isAvailable && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={claimReward}
                      className="mt-3 w-full py-2 px-3 bg-white text-gray-900 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
                    >
                      Claim!
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-yellow-400" />
          Milestone Rewards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">7 Day Streak</h4>
                <p className="text-sm text-gray-300">Legendary Meme Pack</p>
              </div>
              <div className="text-2xl">👑</div>
            </div>
          </div>
          
          <div className="bg-purple-700 bg-opacity-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">30 Day Streak</h4>
                <p className="text-sm text-gray-300">10,000 Coins</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-600 bg-opacity-20 border border-yellow-400 rounded-lg">
          <p className="text-sm text-yellow-300">
            <strong>Pro Tip:</strong> Maintaining your daily streak multiplies your rewards! Missing a day resets your progress.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyRewards;
