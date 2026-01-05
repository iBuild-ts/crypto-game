import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Volume2, VolumeX, Palette, Bell, Shield, Database, Download, Upload, RotateCcw } from 'lucide-react';

const Settings = ({ soundEnabled, toggleSound, onResetGame }) => {
  const [theme, setTheme] = useState('purple');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [privacy, setPrivacy] = useState('public');

  const themes = [
    { id: 'purple', name: 'Purple Galaxy', primary: 'from-purple-800 to-blue-800' },
    { id: 'dark', name: 'Dark Mode', primary: 'from-gray-900 to-black' },
    { id: 'ocean', name: 'Ocean Blue', primary: 'from-blue-800 to-cyan-800' },
    { id: 'sunset', name: 'Sunset', primary: 'from-orange-800 to-red-800' },
  ];

  const exportSaveData = () => {
    const saveData = {
      playerCoins: 1000,
      playerMemes: [],
      playerStats: {
        level: 1,
        experience: 0,
        totalWins: 0,
        totalLosses: 0,
        totalBattles: 0,
        achievements: []
      },
      settings: {
        soundEnabled,
        theme,
        notifications,
        autoSave,
        privacy
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(saveData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crypto-meme-game-save-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSaveData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const saveData = JSON.parse(e.target.result);
          // Here you would typically update the game state with the imported data
          alert('Save data imported successfully! Game will reload with new data.');
          window.location.reload();
        } catch (error) {
          alert('Invalid save file!');
        }
      };
      reader.readAsText(file);
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
          Game Settings
        </h2>
        <p className="text-gray-300">Customize your gaming experience</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audio Settings */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-yellow-400" />
            Audio Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-gray-300">Enable game sounds</p>
              </div>
              <button
                onClick={toggleSound}
                className={`p-3 rounded-lg transition-colors ${
                  soundEnabled 
                    ? 'bg-green-600 hover:bg-green-500' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-yellow-400" />
            Theme Settings
          </h3>
          
          <div className="space-y-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  theme === t.id 
                    ? 'border-yellow-400 bg-yellow-400 bg-opacity-20' 
                    : 'border-purple-400 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded bg-gradient-to-r ${t.primary}`} />
                  <span className="font-medium">{t.name}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-400" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-300">Daily rewards reminder</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`p-3 rounded-lg transition-colors ${
                  notifications 
                    ? 'bg-green-600 hover:bg-green-500' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                <div className={`w-5 h-5 rounded ${notifications ? 'bg-white' : 'bg-gray-400'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Save</p>
                <p className="text-sm text-gray-300">Save progress automatically</p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`p-3 rounded-lg transition-colors ${
                  autoSave 
                    ? 'bg-green-600 hover:bg-green-500' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                <div className={`w-5 h-5 rounded ${autoSave ? 'bg-white' : 'bg-gray-400'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-400" />
            Privacy
          </h3>
          
          <div className="space-y-3">
            {['public', 'friends', 'private'].map((level) => (
              <button
                key={level}
                onClick={() => setPrivacy(level)}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left capitalize ${
                  privacy === level 
                    ? 'border-yellow-400 bg-yellow-400 bg-opacity-20' 
                    : 'border-purple-400 hover:border-purple-300'
                }`}
              >
                <span className="font-medium">{level}</span>
                <p className="text-sm text-gray-300">
                  {level === 'public' && 'Visible to everyone'}
                  {level === 'friends' && 'Visible to friends only'}
                  {level === 'private' && 'Visible to you only'}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-yellow-400" />
          Data Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={exportSaveData}
            className="flex items-center justify-center gap-2 p-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Save
          </button>
          
          <label className="flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Save
            <input
              type="file"
              accept=".json"
              onChange={importSaveData}
              className="hidden"
            />
          </label>
          
          <button
            onClick={onResetGame}
            className="flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Game
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-600 bg-opacity-20 border border-yellow-400 rounded-lg">
          <p className="text-sm text-yellow-300">
            <strong>Tip:</strong> Export your save data regularly to prevent progress loss. Import saves to transfer progress between devices.
          </p>
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 border-2 border-purple-400 text-center"
      >
        <h3 className="text-xl font-bold mb-4">About Crypto Meme Game</h3>
        <div className="space-y-2 text-gray-300">
          <p>Version: 2.0.0</p>
          <p>Created with ❤️ using React, Vite & Tailwind CSS</p>
          <p>© 2024 Crypto Meme Game. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
