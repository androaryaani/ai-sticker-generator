import React, { useState } from 'react';
import { Sparkles, AlertCircle, Grid } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import StyleSelector from '../components/StyleSelector';
import EmotionSelector from '../components/EmotionSelector';
import ChibiGallery from '../components/ChibiGallery';
import { GenerationSettings } from '../types';
import { MockChibiGenerator } from '../services/mockGenerator';
import { getApiKey, saveGeneratedImage } from '../utils/localStorage';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [settings, setSettings] = useState<GenerationSettings>({
    style: 'full-body',
    artStyle: 'chibi',
  });
  const [selectedEmotion, setSelectedEmotion] = useState('happy');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationMode, setGenerationMode] = useState<'single' | 'emotion-set'>('emotion-set');

  const mockGenerator = new MockChibiGenerator();

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
    setGeneratedImages([]);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      if (generationMode === 'emotion-set') {
        const emotionImages = await mockGenerator.generateEmotionSet(uploadedImage, {
          ...settings,
          emotion: selectedEmotion as any
        });
        setGeneratedImages(emotionImages);
        
        // Save all images to local storage
        emotionImages.forEach((url, index) => {
          const generatedImage = {
            id: `${Date.now()}-${index}`,
            url,
            timestamp: Date.now(),
            settings: { ...settings, emotion: ['happy', 'angry', 'sad', 'surprised', 'sleepy', 'love'][index] },
          };
          saveGeneratedImage(generatedImage);
        });
      } else {
        const singleImage = await mockGenerator.generateChibiSticker(uploadedImage, settings);
        setGeneratedImages([singleImage]);
      }
    } catch (err) {
      console.error('Generation error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during generation');
      }
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
            Transform your photos into adorable chibi-style emotion stickers
          </p>
          <button
            onClick={showOnboardingGuide}
            className="mt-4 text-purple-600 hover:text-purple-700 text-sm underline"
          >
            Need help? View guide again
          </button>
        </div>

        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">Fast Generation Mode Active!</p>
              <p className="text-green-700 text-sm">
                Generate 6 different emotion stickers in just 2-3 seconds! Perfect for creating sticker packs.
              </p>
            </div>
          </div>
        </div>

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

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Generation Mode</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setGenerationMode('emotion-set')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      generationMode === 'emotion-set'
                        ? 'border-purple-400 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Grid className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-800">Emotion Set</span>
                    </div>
                    <div className="text-sm text-gray-600">Generate 6 different emotions</div>
                  </button>
                  <button
                    onClick={() => setGenerationMode('single')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      generationMode === 'single'
                        ? 'border-purple-400 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-800">Single Sticker</span>
                    </div>
                    <div className="text-sm text-gray-600">Generate one custom emotion</div>
                  </button>
                </div>
              </div>
              
              {generationMode === 'single' && (
                <EmotionSelector 
                  selectedEmotion={selectedEmotion}
                  onEmotionChange={setSelectedEmotion}
                />
              )}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!uploadedImage || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              {generationMode === 'emotion-set' ? <Grid className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              <span>
                {isGenerating 
                  ? 'Generating...' 
                  : generationMode === 'emotion-set' 
                    ? 'Generate Emotion Set (6 Stickers)' 
                    : 'Generate Single Sticker'
                }
              </span>
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <p className="text-red-800 font-medium mb-2">{error}</p>
                    {error.includes('Network error') && (
                      <div className="text-red-700 text-sm space-y-1">
                        <p className="font-medium">Troubleshooting steps:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Check your internet connection</li>
                          <li>Disable ad-blockers or browser extensions temporarily</li>
                          <li>Try a different web browser</li>
                          <li>Check if you're on a restricted network (corporate/school)</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {generationMode === 'emotion-set' ? 'Generated Emotion Set' : 'Generated Sticker'}
              </h2>
              <ChibiGallery 
                images={generatedImages}
                isLoading={isGenerating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;