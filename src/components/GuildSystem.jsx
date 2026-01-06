import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Crown, Shield, Sword, Trophy, Star, Zap, Flag, Heart, Target, Award, Coins } from 'lucide-react';

const GuildSystem = ({ playerCoins, setPlayerCoins, playSound }) => {
  const [activeTab, setActiveTab] = useState('guilds'); // guilds, myGuild, wars
  const [playerGuild, setPlayerGuild] = useState(null);
  const [guilds, setGuilds] = useState([
    {
      id: 1,
      name: 'Crypto Kings',
      tag: 'KING',
      emblem: '👑',
      description: 'Elite traders and meme lords',
      members: 45,
      maxMembers: 50,
      power: 12500,
      level: 8,
      trophies: 892,
      requirements: { level: 10, coins: 1000 },
      color: 'yellow'
    },
    {
      id: 2,
      name: 'Meme Warriors',
      tag: 'WAR',
      emblem: '⚔️',
      description: 'Battle-ready meme collectors',
      members: 38,
      maxMembers: 50,
      power: 9800,
      level: 6,
      trophies: 654,
      requirements: { level: 5, coins: 500 },
      color: 'red'
    },
    {
      id: 3,
      name: 'Diamond Hands',
      tag: 'DH',
      emblem: '💎',
      description: 'HODL strong, never sell',
      members: 42,
      maxMembers: 50,
      power: 11200,
      level: 7,
      trophies: 743,
      requirements: { level: 8, coins: 800 },
      color: 'blue'
    },
    {
      id: 4,
      name: 'Lunar Collective',
      tag: 'MOON',
      emblem: '🚀',
      description: 'To the moon and beyond!',
      members: 28,
      maxMembers: 40,
      power: 8500,
      level: 5,
      trophies: 521,
      requirements: { level: 5, coins: 300 },
      color: 'purple'
    }
  ]);

  const [guildWars, setGuildWars] = useState([
    {
      id: 1,
      attacker: 'Crypto Kings',
      defender: 'Meme Warriors',
      startTime: new Date(Date.now() + 3600000), // 1 hour from now
      duration: 24, // hours
      prizePool: 5000,
      participants: 83,
      status: 'upcoming'
    },
    {
      id: 2,
      attacker: 'Diamond Hands',
      defender: 'Lunar Collective',
      startTime: new Date(Date.now() - 7200000), // 2 hours ago
      duration: 24,
      prizePool: 3000,
      participants: 70,
      status: 'active',
      attackerScore: 1250,
      defenderScore: 980
    }
  ]);

  const [guildMembers, setGuildMembers] = useState([
    { id: 1, name: 'CryptoKing', role: 'Leader', power: 2850, trophies: 142, online: true },
    { id: 2, name: 'MemeMaster', role: 'Co-Leader', power: 2340, trophies: 98, online: true },
    { id: 3, name: 'DiamondDave', role: 'Elder', power: 1980, trophies: 76, online: false },
    { id: 4, name: 'LunarLarry', role: 'Member', power: 1650, trophies: 54, online: true },
    { id: 5, name: 'RookieRandy', role: 'Member', power: 890, trophies: 23, online: false }
  ]);

  const joinGuild = (guild) => {
    if (playerCoins < guild.requirements.coins) {
      alert(`You need ${guild.requirements.coins} coins to join this guild!`);
      return;
    }
    
    setPlayerCoins(prev => prev - guild.requirements.coins);
    setPlayerGuild(guild);
    setActiveTab('myGuild');
    playSound('achievement');
    
    // Add player to members list
    setGuildMembers(prev => [...prev, {
      id: Date.now(),
      name: 'You',
      role: 'Member',
      power: 750,
      trophies: 12,
      online: true
    }]);
  };

  const leaveGuild = () => {
    setPlayerGuild(null);
    setActiveTab('guilds');
    playSound('coin');
    
    // Remove player from members
    setGuildMembers(prev => prev.filter(m => m.name !== 'You'));
  };

  const donateToGuild = (amount) => {
    if (playerCoins < amount) {
      alert('Not enough coins!');
      return;
    }
    
    setPlayerCoins(prev => prev - amount);
    playSound('coin');
    
    // Update guild power
    setGuilds(prev => prev.map(g => 
      g.id === playerGuild.id 
        ? { ...g, power: g.power + Math.floor(amount / 10) }
        : g
    ));
  };

  const participateInWar = (war) => {
    if (war.status !== 'active') {
      alert('This war has not started yet!');
      return;
    }
    
    playSound('battle');
    alert('You joined the guild war! Battle for glory and rewards!');
  };

  const formatTimeRemaining = (date) => {
    const now = new Date();
    const diff = date - now;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Leader': return 'text-yellow-400';
      case 'Co-Leader': return 'text-orange-400';
      case 'Elder': return 'text-purple-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 shadow-2xl border-2 border-purple-400">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Flag className="w-8 h-8 text-red-400" />
          Guild System
        </h2>
        <p className="text-gray-300">Join forces with other players and dominate in clan wars!</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 justify-center">
        {['guilds', 'myGuild', 'wars'].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab === 'guilds' && 'Browse Guilds'}
            {tab === 'myGuild' && 'My Guild'}
            {tab === 'wars' && 'Clan Wars'}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'guilds' && (
          <motion.div
            key="guilds"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guilds.map((guild) => (
                <motion.div
                  key={guild.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/30 rounded-xl p-6 border border-purple-400/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{guild.emblem}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {guild.name}
                          <span className="text-sm bg-purple-600 px-2 py-1 rounded">
                            [{guild.tag}]
                          </span>
                        </h3>
                        <p className="text-gray-300 text-sm">{guild.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">Lv.{guild.level}</div>
                      <div className="text-gray-300 text-sm">{guild.trophies} 🏆</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>{guild.members}/{guild.maxMembers} members</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Zap className="w-4 h-4" />
                      <span>{guild.power.toLocaleString()} power</span>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-3 mb-4">
                    <div className="text-sm text-gray-300 mb-2">Requirements:</div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-white">Level {guild.requirements.level}</span>
                      <span className="text-yellow-400">{guild.requirements.coins} 🪙</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => joinGuild(guild)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Join Guild
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'myGuild' && (
          <motion.div
            key="myGuild"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {playerGuild ? (
              <div>
                {/* Guild Header */}
                <div className="bg-black/30 rounded-xl p-6 mb-6 border border-purple-400/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{playerGuild.emblem}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{playerGuild.name}</h3>
                        <p className="text-gray-300">{playerGuild.description}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={leaveGuild}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      Leave Guild
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Members List */}
                  <div className="bg-black/30 rounded-xl p-6 border border-purple-400/30">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      Guild Members
                    </h4>
                    <div className="space-y-3">
                      {guildMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${member.online ? 'bg-green-400' : 'bg-gray-500'}`} />
                            <div>
                              <div className="text-white font-semibold">{member.name}</div>
                              <div className={`text-sm ${getRoleColor(member.role)}`}>{member.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-300 text-sm">{member.power} power</div>
                            <div className="text-yellow-400 text-sm">{member.trophies} 🏆</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guild Actions */}
                  <div className="space-y-4">
                    <div className="bg-black/30 rounded-xl p-6 border border-purple-400/30">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        Donate to Guild
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[100, 500, 1000].map((amount) => (
                          <motion.button
                            key={amount}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => donateToGuild(amount)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-1"
                          >
                            <Coins className="w-4 h-4" />
                            {amount}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-6 border border-purple-400/30">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-400" />
                        Guild Stats
                      </h4>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex justify-between">
                          <span>Total Power:</span>
                          <span className="text-white font-bold">{playerGuild.power.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span> Guild Level:</span>
                          <span className="text-white font-bold">{playerGuild.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trophies:</span>
                          <span className="text-yellow-400 font-bold">{playerGuild.trophies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Guild Joined</h3>
                <p className="text-gray-300 mb-4">Join a guild to participate in clan wars and get exclusive rewards!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('guilds')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Browse Guilds
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'wars' && (
          <motion.div
            key="wars"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="space-y-6">
              {guildWars.map((war) => (
                <motion.div
                  key={war.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/30 rounded-xl p-6 border border-purple-400/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Sword className="w-8 h-8 text-red-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {war.attacker} vs {war.defender}
                        </h3>
                        <p className="text-gray-300">
                          {war.status === 'upcoming' ? 'Starts in' : 'Ends in'} {formatTimeRemaining(war.startTime)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">{war.prizePool} 🪙</div>
                      <div className="text-gray-300 text-sm">{war.participants} participants</div>
                    </div>
                  </div>

                  {war.status === 'active' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-white mb-2">
                        <span>{war.attacker}: {war.attackerScore}</span>
                        <span>{war.defender}: {war.defenderScore}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-4">
                        <div className="flex h-4 rounded-full overflow-hidden">
                          <div 
                            className="bg-red-500"
                            style={{ width: `${(war.attackerScore / (war.attackerScore + war.defenderScore)) * 100}%` }}
                          />
                          <div 
                            className="bg-blue-500"
                            style={{ width: `${(war.defenderScore / (war.attackerScore + war.defenderScore)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => participateInWar(war)}
                      className={`px-6 py-2 rounded-lg font-semibold ${
                        war.status === 'active' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                      disabled={war.status !== 'active'}
                    >
                      {war.status === 'active' ? 'Join War' : 'Upcoming'}
                    </motion.button>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Award className="w-4 h-4" />
                      <span>Duration: {war.duration}h</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuildSystem;
