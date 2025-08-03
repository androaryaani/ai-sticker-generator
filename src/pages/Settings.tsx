import React, { useState, useEffect } from 'react';
import { Key, Save, Trash2, Shield, Info } from 'lucide-react';
import { saveApiKey, getApiKey, clearApiKey } from '../utils/localStorage';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const existingKey = getApiKey();
    setSavedApiKey(existingKey);
    if (existingKey) {
      setApiKey(existingKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setSavedApiKey(apiKey.trim());
      setSaveMessage('API key saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleClear = () => {
    clearApiKey();
    setApiKey('');
    setSavedApiKey(null);
    setSaveMessage('API key cleared!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const maskedApiKey = savedApiKey ? 
    `${savedApiKey.substring(0, 8)}${'*'.repeat(Math.max(0, savedApiKey.length - 12))}${savedApiKey.substring(savedApiKey.length - 4)}` 
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Configure your API settings for image generation
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Replicate API Key</h2>
                <p className="text-gray-600 text-sm">Required for generating chibi stickers</p>
              </div>
            </div>

            {savedApiKey && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-800 font-medium">API Key Configured</p>
                    <p className="text-green-700 text-sm font-mono">{maskedApiKey}</p>
                  </div>
                  <button
                    onClick={handleClear}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your Replicate API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="r8_..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showApiKey ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save API Key</span>
                </button>
              </div>

              {saveMessage && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">{saveMessage}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Privacy & Security</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Your API key is stored locally on your device only</span>
              </p>
              <p className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>No data is sent to external servers except for image generation</span>
              </p>
              <p className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Generated images are temporarily stored for your convenience</span>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">How to get your API Key</h3>
            </div>
            <div className="space-y-3 text-blue-700">
              <p>1. Visit <a href="https://replicate.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">replicate.com</a> and create an account</p>
              <p>2. Go to your account settings and navigate to the API section</p>
              <p>3. Generate a new API token</p>
              <p>4. Copy and paste it here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;