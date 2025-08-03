import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
  onRemoveImage,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  if (uploadedImage) {
    return (
      <div className="relative">
        <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={onRemoveImage}
          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
        isDragOver
          ? 'border-purple-400 bg-purple-50'
          : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-purple-600" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Upload your photo</p>
          <p className="text-sm text-gray-500 mt-1">Drag & drop or click to browse</p>
          <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, WebP</p>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;