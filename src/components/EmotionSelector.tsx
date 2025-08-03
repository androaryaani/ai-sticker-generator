import React from 'react';
import { Smile, Frown, Heart, Zap, Moon, HelpCircle } from 'lucide-react';

interface EmotionSelectorProps {
  selectedEmotion: string;
  onEmotionChange: (emotion: string) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selectedEmotion,
  onEmotionChange,
}) => {
  const emotions = [
    { value: 'happy', label: 'Happy', icon: <Smile className="w-5 h-5" />, color: 'text-yellow-500' },
    { value: 'angry', label: 'Angry', icon: <Zap className="w-5 h-5" />, color: 'text-red-500' },
    { value: 'sad', label: 'Sad', icon: <Frown className="w-5 h-5" />, color: 'text-blue-500' },
    { value: 'love', label: 'Love', icon: <Heart className="w-5 h-5" />, color: 'text-pink-500' },
    { value: 'sleepy', label: 'Sleepy', icon: <Moon className="w-5 h-5" />, color: 'text-purple-500' },
    { value: 'confused', label: 'Confused', icon: <HelpCircle className="w-5 h-5" />, color: 'text-gray-500' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Choose Emotion</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {emotions.map((emotion) => (
          <button
            key={emotion.value}
            onClick={() => onEmotionChange(emotion.value)}
            className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
              selectedEmotion === emotion.value
                ? 'border-purple-400 bg-purple-50 shadow-md'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <div className={emotion.color}>
              {emotion.icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{emotion.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelector;