import React from 'react';
import { Download, Share2, Heart, Grid } from 'lucide-react';

interface ChibiGalleryProps {
  images: string[];
  isLoading?: boolean;
}

const ChibiGallery: React.FC<ChibiGalleryProps> = ({
  images,
  isLoading = false,
}) => {
  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chibi-sticker-${index + 1}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async (imageUrl: string) => {
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
      navigator.clipboard.writeText(imageUrl);
      alert('Image URL copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Creating your chibi emotion set...</p>
          <p className="text-sm text-gray-500">This will take just a moment!</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-gray-600">Your chibi emotion stickers will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Grid className="w-5 h-5 text-purple-600" />
          <span>Your Chibi Emotion Set</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Chibi Sticker ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(imageUrl, index)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleShare(imageUrl)}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => {
              images.forEach((url, index) => handleDownload(url, index));
            }}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download All</span>
          </button>
          <button className="px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChibiGallery;