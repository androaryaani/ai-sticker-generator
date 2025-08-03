import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import StyleSelector from '../components/StyleSelector';
import GeneratedResult from '../components/GeneratedResult';
import { GenerationSettings } from '../types';
import { ReplicateService } from '../services/replicate';
import { getApiKey, saveGeneratedImage } from '../utils/localStorage';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [settings, setSettings] = useState<GenerationSettings>({
    style: 'full-body',
    artStyle: 'chibi',
  });
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = getApiKey();

  const showOnboardingGuide = () => {
    localStorage.removeItem('arul-ai-onboarding-completed');
    window.location.reload();
  };
  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setError(null);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setGeneratedImageUrl(null);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    if (!apiKey) {
      setError('Please set your Replicate API key in Settings');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const service = new ReplicateService(apiKey);
      const resultUrl = await service.generateChibiSticker(uploadedImage, settings);
      
      setGeneratedImageUrl(resultUrl);
      
      // Save to local storage
      const generatedImage = {
        id: Date.now().toString(),
        url: resultUrl,
        timestamp: Date.now(),
        settings,
      };
      saveGeneratedImage(generatedImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Chibi Sticker Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your photos into adorable chibi-style cartoon stickers
          </p>
          <button
            onClick={showOnboardingGuide}
            className="mt-4 text-purple-600 hover:text-purple-700 text-sm underline"
          >
            Need help? View guide again
          </button>
        </div>

        {!apiKey && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-amber-800 font-medium">API Key Required</p>
                <p className="text-amber-700 text-sm">
                  Please set your Replicate API key in{' '}
                  <Link to="/settings" className="underline hover:text-amber-900">
                    Settings
                  </Link>{' '}
                  to start generating stickers.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Photo</h2>
              <ImageUpload
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                onRemoveImage={handleRemoveImage}
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Customize Style</h2>
              <StyleSelector settings={settings} onSettingsChange={setSettings} />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!uploadedImage || !apiKey || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isGenerating ? 'Generating...' : 'Generate Chibi Sticker'}</span>
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Sticker</h2>
              {isGenerating ? (
                <GeneratedResult imageUrl="" isLoading={true} />
              ) : generatedImageUrl ? (
                <GeneratedResult imageUrl={generatedImageUrl} />
              ) : (
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-gray-600">Your chibi sticker will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;