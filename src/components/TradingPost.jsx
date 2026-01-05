import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, TrendingUp, Users, Clock, Star, Zap, Coins, MessageCircle } from 'lucide-react';

const TradingPost = ({ playerMemes, playerCoins, onTrade }) => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [tradeOffers, setTradeOffers] = useState([]);

  // Simulated marketplace listings
  const marketplaceListings = [
    { 
      id: 1, 
      seller: 'CryptoKing', 
      meme: { name: 'Ultra Pepe', power: 85, rarity: 'epic', emoji: '🐸' }, 
      price: 800, 
      rating: 4.8,
      trades: 23,
      listed: '2 hours ago'
    },
    { 
      id: 2, 
      seller: 'MemeLord', 
      meme: { name: 'Golden Doge', power: 92, rarity: 'legendary', emoji: '🐕' }, 
      price: 1500, 
      rating: 4.9,
      trades: 45,
      listed: '5 hours ago'
    },
    { 
      id: 3, 
      seller: 'WhaleTrader', 
      meme: { name: 'Diamond HODL', power: 78, rarity: 'rare', emoji: '💎' }, 
      price: 450, 
      rating: 4.5,
      trades: 12,
      listed: '1 day ago'
    },
    { 
      id: 4, 
      seller: 'PepeMaster', 
      meme: { name: 'Super WAGMI', power: 88, rarity: 'epic', emoji: '🚀' }, 
      price: 950, 
      rating: 4.7,
      trades: 18,
      listed: '3 hours ago'
    },
    { 
      id: 5, 
      seller: 'QuickFlip', 
      meme: { name: 'Rare GM', power: 65, rarity: 'rare', emoji: '☀️' }, 
      price: 320, 
      rating: 4.3,
      trades: 8,
      listed: '6 hours ago'
    },
  ];

  // Simulated trade requests
  const tradeRequests = [
    {
      id: 1,
      trader: 'DiamondHands',
      offer: { name: 'Epic HODL', power: 80, rarity: 'epic', emoji: '💎' },
      request: { name: 'Rare Meme', power: '60+', rarity: 'rare' },
      message: 'Looking for a good rare meme to complete my collection!',
      time: '30 minutes ago'
    },
    {
      id: 2,
      trader: 'CryptoWhale',
      offer: { name: 'Legendary Pepe', power: 95, rarity: 'legendary', emoji: '🐸' },
      request: { name: 'Multiple Memes', power: '70+', rarity: 'epic' },
      message: 'Willing to trade my legendary for 2-3 epic memes',
      time: '2 hours ago'
    },
  ];

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const buyFromMarketplace = (listing) => {
    if (playerCoins >= listing.price) {
      onTrade('buy', listing.meme, listing.price);
      // Remove from marketplace
      setTradeOffers(prev => prev.filter(offer => offer.id !== listing.id));
    }
  };

  const createListing = () => {
    if (!selectedMeme) return;
    
    const price = prompt(`Enter asking price for ${selectedMeme.name}:`);
    if (price && !isNaN(price) && price > 0) {
      onTrade('sell', selectedMeme, parseInt(price));
      setSelectedMeme(null);
    }
  };

  const tabs = [
    { id: 'marketplace', name: 'Marketplace', icon: TrendingUp },
    { id: 'trade', name: 'Trade Requests', icon: ArrowLeftRight },
    { id: 'my_listings', name: 'My Listings', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Trading Post
        </h2>
        <p className="text-gray-300">Buy, sell, and trade memes with other players!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-4 border-2 border-purple-400"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 shadow-lg'
                    : 'bg-purple-700 text-white hover:bg-purple-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </motion.div>

      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Available Listings</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {marketplaceListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="battle-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{listing.meme.emoji}</div>
                      <div className="flex-1">
                        <h4 className="font-bold">{listing.meme.name}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(listing.meme.rarity)} text-white`}>
                            {listing.meme.rarity.toUpperCase()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            {listing.meme.power}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                          <span>Seller: {listing.seller}</span>
                          <span>⭐ {listing.rating}</span>
                          <span>🤝 {listing.trades} trades</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-400">
                          {listing.price} <Coins className="w-4 h-4 inline" />
                        </div>
                        <button
                          onClick={() => buyFromMarketplace(listing)}
                          disabled={playerCoins < listing.price}
                          className={`mt-2 px-3 py-1 rounded text-sm font-bold transition-all duration-200 ${
                            playerCoins >= listing.price
                              ? 'bg-green-600 hover:bg-green-500 text-white'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Create Listing</h3>
              <div className="bg-purple-800 bg-opacity-50 rounded-xl p-6 border-2 border-purple-400">
                {playerMemes.length === 0 ? (
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">📦</div>
                    <p>No memes available to sell</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Meme to Sell</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {playerMemes.map((meme) => (
                          <div
                            key={meme.id}
                            onClick={() => setSelectedMeme(meme)}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              selectedMeme?.id === meme.id
                                ? 'border-yellow-400 bg-yellow-400 bg-opacity-20'
                                : 'border-purple-400 hover:border-purple-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{meme.emoji}</div>
                              <div>
                                <div className="font-bold">{meme.name}</div>
                                <div className="text-sm text-gray-300">
                                  {meme.rarity} • {meme.power} power
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedMeme && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div className="bg-purple-700 bg-opacity-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span>Selected Meme:</span>
                            <span className="font-bold">{selectedMeme.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Estimated Value:</span>
                            <span className="text-yellow-400">{selectedMeme.price} coins</span>
                          </div>
                        </div>
                        <button
                          onClick={createListing}
                          className="w-full crypto-button"
                        >
                          List for Sale
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trade' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Trade Requests</h3>
          {tradeRequests.length === 0 ? (
            <div className="text-center py-8 bg-gray-800 rounded-xl">
              <ArrowLeftRight className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No active trade requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tradeRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="battle-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{request.offer.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold">{request.trader}</h4>
                        <span className="text-xs text-gray-300">{request.time}</span>
                      </div>
                      <div className="bg-purple-700 bg-opacity-30 rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium mb-1">Offering:</p>
                        <div className="flex items-center gap-2">
                          <span>{request.offer.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(request.offer.rarity)} text-white`}>
                            {request.offer.rarity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            {request.offer.power}
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-700 bg-opacity-30 rounded-lg p-3 mb-3">
                        <p className="text-sm font-medium mb-1">Looking For:</p>
                        <p>{request.request.name} ({request.request.rarity}+)</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MessageCircle className="w-4 h-4" />
                        <p>"{request.message}"</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm">
                        Negotiate
                      </button>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'my_listings' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">My Active Listings</h3>
          <div className="text-center py-8 bg-gray-800 rounded-xl">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">You haven't listed any memes for sale yet</p>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-4 border-2 border-purple-400"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="font-bold">Market Status:</span>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>📊 24h Volume: 15,420 coins</span>
            <span>🔥 Hot: Legendary Memes</span>
            <span>⚡ Active Traders: 234</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TradingPost;
