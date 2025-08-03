import React from 'react';
import { GenerationSettings } from '../types';

interface StyleSelectorProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  settings,
  onSettingsChange,
}) => {
  const styleOptions = [
    { value: 'full-body', label: 'Full Body', description: 'Complete chibi character' },
    { value: 'face-only', label: 'Face Only', description: 'Portrait style' },
    { value: 'face-with-hands', label: 'Face + Hands', description: 'Face with expressive hands' },
  ] as const;

  const artStyleOptions = [
    { value: 'chibi', label: 'Chibi', description: 'Classic cute style' },
    { value: 'anime', label: 'Anime', description: 'Anime-inspired chibi' },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Character Style</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {styleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                onSettingsChange({ ...settings, style: option.value })
              }
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                settings.style === option.value
                  ? 'border-purple-400 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="font-medium text-gray-800">{option.label}</div>
              <div className="text-sm text-gray-600 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Art Style</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {artStyleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                onSettingsChange({ ...settings, artStyle: option.value })
              }
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                settings.artStyle === option.value
                  ? 'border-purple-400 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="font-medium text-gray-800">{option.label}</div>
              <div className="text-sm text-gray-600 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;