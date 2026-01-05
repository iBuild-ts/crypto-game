import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sword, Users, Clock, Zap, Medal, Crown, Star } from 'lucide-react';

const TournamentMode = ({ playerMemes, onEnterTournament }) => {
  const [tournamentState, setTournamentState] = useState('lobby');
  const [currentRound, setCurrentRound] = useState(0);
  const [bracket, setBracket] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [tournamentWinner, setTournamentWinner] = useState(null);

  const generateTournamentBracket = () => {
    const participants = [
      { id: 1, name: 'You', meme: playerMemes[0] || null, isPlayer: true },
      { id: 2, name: 'CryptoKing', meme: { name: 'Diamond Hands', power: 90, emoji: '💪' }, isPlayer: false },
      { id: 3, name: 'MemeLord', meme: { name: 'Pepe Frog', power: 70, emoji: '🐸' }, isPlayer: false },
      { id: 4, name: 'WAGMI_Warrior', meme: { name: 'WAGMI', power: 60, emoji: '🚀' }, isPlayer: false },
      { id: 5, name: 'HODL_Hero', meme: { name: 'HODL', power: 75, emoji: '💎' }, isPlayer: false },
      { id: 6, name: 'PepePower', meme: { name: 'Pepe Frog', power: 65, emoji: '🐸' }, isPlayer: false },
      { id: 7, name: 'MoonShot', meme: { name: 'GM', power: 50, emoji: '☀️' }, isPlayer: false },
      { id: 8, name: 'ShillMaster', meme: { name: 'NGMI', power: 40, emoji: '😢' }, isPlayer: false },
    ];

    // Shuffle participants for random bracket
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    
    // Create first round matches
    const rounds = [];
    const quarterFinals = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      quarterFinals.push({
        match: i / 2 + 1,
        round: 1,
        participant1: shuffled[i],
        participant2: shuffled[i + 1],
        winner: null,
      });
    }
    rounds.push(quarterFinals);

    // Create subsequent rounds
    let currentParticipants = quarterFinals.length;
    let roundNum = 2;
    while (currentParticipants > 1) {
      const nextRound = [];
      for (let i = 0; i < currentParticipants; i += 2) {
        nextRound.push({
          match: i / 2 + 1,
          round: roundNum,
          participant1: null, // Will be filled after previous round
          participant2: null,
          winner: null,
        });
      }
      rounds.push(nextRound);
      currentParticipants = nextRound.length;
      roundNum++;
    }

    return rounds;
  };

  const startTournament = () => {
    if (!playerMemes || playerMemes.length === 0) {
      alert('You need at least one meme to enter the tournament!');
      return;
    }

    const newBracket = generateTournamentBracket();
    setBracket(newBracket);
    setCurrentRound(0);
    setTournamentState('bracket');
    simulateTournament(newBracket);
  };

  const simulateTournament = (bracketData) => {
    let currentBracket = [...bracketData];
    let roundIndex = 0;

    const simulateRound = () => {
      if (roundIndex >= currentBracket.length) {
        // Tournament complete
        setTournamentWinner(currentBracket[currentBracket.length - 1][0].winner);
        setTournamentState('complete');
        return;
      }

      const currentRoundMatches = currentBracket[roundIndex];
      const nextRoundMatches = currentBracket[roundIndex + 1] || [];

      currentRoundMatches.forEach((match, matchIndex) => {
        setTimeout(() => {
          const winner = simulateMatch(match);
          match.winner = winner;

          // Update next round bracket
          if (nextRoundMatches.length > 0) {
            const nextMatchIndex = Math.floor(matchIndex / 2);
            if (matchIndex % 2 === 0) {
              nextRoundMatches[nextMatchIndex].participant1 = winner;
            } else {
              nextRoundMatches[nextMatchIndex].participant2 = winner;
            }
          }

          setCurrentMatch(match);
          setBracket([...currentBracket]);

          if (matchIndex === currentRoundMatches.length - 1) {
            setTimeout(() => {
              roundIndex++;
              setCurrentRound(roundIndex);
              simulateRound();
            }, 1500);
          }
        }, matchIndex * 2000);
      });
    };

    simulateRound();
  };

  const simulateMatch = (match) => {
    const power1 = match.participant1.meme.power + Math.floor(Math.random() * 20);
    const power2 = match.participant2.meme.power + Math.floor(Math.random() * 20);
    
    return power1 > power2 ? match.participant1 : match.participant2;
  };

  const getRoundName = (round) => {
    switch(round) {
      case 1: return 'Quarter Finals';
      case 2: return 'Semi Finals';
      case 3: return 'Finals';
      default: return 'Round ' + round;
    }
  };

  const getPrizeForPosition = (position) => {
    switch(position) {
      case 1: return { coins: 5000, title: 'Tournament Champion' };
      case 2: return { coins: 3000, title: 'Runner Up' };
      case 3: return { coins: 1500, title: '3rd Place' };
      case 4: return { coins: 500, title: '4th Place' };
      default: return { coins: 100, title: 'Participant' };
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
          Tournament Mode
        </h2>
        <p className="text-gray-300">Compete in 8-player brackets for epic prizes!</p>
      </motion.div>

      {tournamentState === 'lobby' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-8 border-2 border-purple-400 text-center"
        >
          <div className="text-6xl mb-6">🏆</div>
          <h3 className="text-2xl font-bold mb-4">8-Player Tournament</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
            <div className="text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="font-bold">1st Place</p>
              <p className="text-yellow-400">5,000 coins</p>
            </div>
            <div className="text-center">
              <Medal className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="font-bold">2nd Place</p>
              <p className="text-gray-300">3,000 coins</p>
            </div>
            <div className="text-center">
              <Medal className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="font-bold">3rd Place</p>
              <p className="text-orange-400">1,500 coins</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="font-bold">4th Place</p>
              <p className="text-purple-400">500 coins</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg mb-2">Entry Requirements:</p>
            <div className="flex justify-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                At least 1 meme
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ~5 minutes
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                8 players
              </span>
            </div>
          </div>

          <button
            onClick={startTournament}
            className="crypto-button text-lg px-8 py-4"
          >
            <Trophy className="w-6 h-6 inline mr-2" />
            Enter Tournament
          </button>
        </motion.div>
      )}

      {tournamentState === 'bracket' && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-4 border-2 border-purple-400"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentRound < bracket.length ? getRoundName(currentRound) : 'Tournament Complete'}
              </h3>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Live</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bracket.map((round, roundIndex) => (
              <motion.div
                key={roundIndex}
                initial={{ opacity: 0, x: roundIndex === 0 ? -50 : roundIndex === 1 ? 0 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: roundIndex * 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold text-center mb-4">
                  {getRoundName(roundIndex + 1)}
                </h4>
                {round.map((match) => (
                  <motion.div
                    key={match.match}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`battle-card ${
                      currentMatch?.match === match.match && currentMatch?.round === match.round
                        ? 'ring-4 ring-yellow-400'
                        : ''
                    }`}
                  >
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 p-2 rounded ${
                        match.winner?.id === match.participant1?.id
                          ? 'bg-green-600 bg-opacity-30'
                          : 'bg-gray-700 bg-opacity-30'
                      }`}>
                        <span className="text-2xl">{match.participant1?.meme?.emoji || '❓'}</span>
                        <span className="flex-1 font-bold">{match.participant1?.name}</span>
                        {match.winner?.id === match.participant1?.id && (
                          <Trophy className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      
                      <div className="text-center text-gray-400">VS</div>
                      
                      <div className={`flex items-center gap-2 p-2 rounded ${
                        match.winner?.id === match.participant2?.id
                          ? 'bg-green-600 bg-opacity-30'
                          : 'bg-gray-700 bg-opacity-30'
                      }`}>
                        <span className="text-2xl">{match.participant2?.meme?.emoji || '❓'}</span>
                        <span className="flex-1 font-bold">{match.participant2?.name}</span>
                        {match.winner?.id === match.participant2?.id && (
                          <Trophy className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tournamentState === 'complete' && tournamentWinner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-8 border-2 border-purple-400 text-center"
        >
          <div className="text-6xl mb-6">
            {tournamentWinner.isPlayer ? '🏆' : '😢'}
          </div>
          
          <h3 className="text-3xl font-bold mb-4">
            {tournamentWinner.isPlayer ? 'Victory!' : 'Tournament Complete'}
          </h3>
          
          <div className="text-xl mb-6">
            Winner: <span className="font-bold text-yellow-400">{tournamentWinner.name}</span>
          </div>
          
          <div className="text-4xl mb-6">{tournamentWinner.meme?.emoji}</div>
          
          <div className="bg-gray-700 bg-opacity-50 rounded-xl p-4 mb-6">
            <p className="text-lg">Final Prize:</p>
            <p className="text-2xl font-bold text-yellow-400">
              {tournamentWinner.isPlayer ? '5,000' : '0'} coins
            </p>
          </div>
          
          <button
            onClick={() => setTournamentState('lobby')}
            className="crypto-button"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TournamentMode;
