import React from 'react';
import { Download, Share2, Heart } from 'lucide-react';

interface GeneratedResultProps {
  imageUrl: string;
  isLoading?: boolean;
}

const GeneratedResult: React.FC<GeneratedResultProps> = ({
  imageUrl,
  isLoading = false,
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chibi-sticker-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Chibi Sticker',
          text: 'Check out my awesome chibi sticker created with Arul-Ai!',
          url: imageUrl,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(imageUrl);
      alert('Image URL copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Generating your chibi sticker...</p>
          <p className="text-sm text-gray-500">This may take a few minutes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="aspect-square bg-gray-100">
        <img
          src={imageUrl}
          alt="Generated Chibi Sticker"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Chibi Sticker</h3>
        <div className="flex space-x-3">
          <button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedResult;