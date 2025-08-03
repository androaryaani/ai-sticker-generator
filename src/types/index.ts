export interface GenerationSettings {
  style: 'full-body' | 'face-only' | 'face-with-hands';
  artStyle: 'chibi' | 'anime';
}

export interface ApiSettings {
  replicateApiKey: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  timestamp: number;
  settings: GenerationSettings;
}