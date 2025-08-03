const API_KEY_STORAGE_KEY = 'arul-ai-api-key';
const GENERATED_IMAGES_KEY = 'arul-ai-generated-images';

export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const clearApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

export const saveGeneratedImage = (image: any): void => {
  const existing = getGeneratedImages();
  const updated = [image, ...existing.slice(0, 9)]; // Keep last 10 images
  localStorage.setItem(GENERATED_IMAGES_KEY, JSON.stringify(updated));
};

export const getGeneratedImages = (): any[] => {
  const stored = localStorage.getItem(GENERATED_IMAGES_KEY);
  return stored ? JSON.parse(stored) : [];
};