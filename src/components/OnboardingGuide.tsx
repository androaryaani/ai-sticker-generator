import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Upload, Settings, Sparkles, Key, Download } from 'lucide-react';

interface OnboardingGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Arul-Ai! 🎉",
      description: "Transform your photos into adorable chibi-style cartoon stickers with AI technology.",
      icon: <Sparkles className="w-12 h-12 text-purple-600" />,
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-gray-600">
            Let's get you started with creating amazing chibi stickers in just a few simple steps!
          </p>
        </div>
      )
    },
    {
      title: "Step 1: Get Your API Key 🔑",
      description: "First, you'll need a Replicate API key to generate stickers.",
      icon: <Key className="w-12 h-12 text-blue-600" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">How to get your API Key:</h4>
            <ol className="text-blue-700 space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                <span>Visit <a href="https://replicate.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">replicate.com</a> and create an account</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                <span>Go to your account settings → API section</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <span>Generate a new API token</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                <span>Copy the token and paste it in Settings</span>
              </li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: Configure Settings ⚙️",
      description: "Add your API key in the Settings page to enable sticker generation.",
      icon: <Settings className="w-12 h-12 text-green-600" />,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Settings className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-800">Settings Page</span>
            </div>
            <p className="text-green-700 text-sm mb-3">
              Navigate to the Settings page using the top navigation menu.
            </p>
            <div className="bg-white rounded border p-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">API Key Input</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="password" 
                  placeholder="r8_..." 
                  className="flex-1 px-3 py-2 border rounded text-sm"
                  disabled
                />
                <button className="px-3 py-2 bg-purple-600 text-white rounded text-sm">Save</button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Upload Your Photo 📸",
      description: "Choose a clear photo of yourself or someone else to transform into a chibi sticker.",
      icon: <Upload className="w-12 h-12 text-orange-600" />,
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Upload className="w-6 h-6 text-orange-600" />
              <span className="font-semibold text-orange-800">Photo Upload</span>
            </div>
            <div className="bg-white border-2 border-dashed border-orange-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-orange-700 text-sm">Drag & drop or click to browse</p>
              <p className="text-orange-600 text-xs mt-1">Supports JPG, PNG, WebP</p>
            </div>
            <div className="mt-3 text-orange-700 text-sm">
              <p className="font-medium mb-1">💡 Tips for best results:</p>
              <ul className="space-y-1 text-xs">
                <li>• Use clear, well-lit photos</li>
                <li>• Face should be clearly visible</li>
                <li>• Avoid blurry or low-quality images</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: Choose Your Style 🎨",
      description: "Select the perfect chibi style and art type for your sticker.",
      icon: <Sparkles className="w-12 h-12 text-pink-600" />,
      content: (
        <div className="space-y-4">
          <div className="bg-pink-50 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-pink-800 mb-2">Character Style Options:</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-white border border-pink-200 rounded p-2 text-sm">
                    <span className="font-medium text-pink-700">Full Body:</span>
                    <span className="text-pink-600 ml-2">Complete chibi character</span>
                  </div>
                  <div className="bg-white border border-pink-200 rounded p-2 text-sm">
                    <span className="font-medium text-pink-700">Face Only:</span>
                    <span className="text-pink-600 ml-2">Portrait style</span>
                  </div>
                  <div className="bg-white border border-pink-200 rounded p-2 text-sm">
                    <span className="font-medium text-pink-700">Face + Hands:</span>
                    <span className="text-pink-600 ml-2">Face with expressive hands</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-pink-800 mb-2">Art Style:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-pink-200 rounded p-2 text-sm text-center">
                    <span className="font-medium text-pink-700">Chibi</span>
                  </div>
                  <div className="bg-white border border-pink-200 rounded p-2 text-sm text-center">
                    <span className="font-medium text-pink-700">Anime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 5: Generate & Download 🚀",
      description: "Click generate and download your amazing chibi sticker!",
      icon: <Download className="w-12 h-12 text-purple-600" />,
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Chibi Sticker</span>
                </button>
              </div>
              <div className="text-purple-700 text-sm">
                <p className="font-medium mb-2">After generation:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Your sticker will appear on the right side</li>
                  <li>• Click the Download button to save it</li>
                  <li>• Share it with friends and family!</li>
                  <li>• Generation may take 1-3 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem('arul-ai-onboarding-completed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              {steps[currentStep].icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
              <p className="text-purple-100">{steps[currentStep].description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            {steps[currentStep].content}
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold"
              >
                Get Started!
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide;