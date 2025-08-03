import { GenerationSettings } from '../types';

export class ReplicateService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateChibiSticker(imageFile: File, settings: GenerationSettings): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API key is required');
    }

    // Check if API key format is valid
    if (!this.apiKey.startsWith('r8_')) {
      throw new Error('Invalid API key format. Replicate API keys should start with "r8_"');
    }

    // Convert file to base64
    const base64Image = await this.fileToBase64(imageFile);

    // Check file size (Replicate has limits)
    if (imageFile.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('Image file is too large. Please use an image smaller than 10MB');
    }

    try {
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Chibi-Sticker-Generator/1.0',
        },
        body: JSON.stringify({
          version: "fofr/chibi-character:latest",
          input: {
            image: base64Image,
            style: this.getStylePrompt(settings),
            negative_prompt: "blurry, low quality, distorted, text, watermark"
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `API request failed (${response.status}): ${response.statusText}`;
        
        if (response.status === 401) {
          errorMessage = 'Invalid API key. Please check your Replicate API key in Settings';
        } else if (response.status === 402) {
          errorMessage = 'Insufficient credits. Please add credits to your Replicate account';
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again';
        } else if (errorText) {
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.detail || errorMessage;
          } catch {
            // If parsing fails, use the original error message
          }
        }
        
        throw new Error(errorMessage);
      }

      const prediction = await response.json();
      
      // Poll for completion
      return await this.pollForCompletion(prediction.id);
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Network error: Unable to connect to Replicate API. Please check your internet connection and try again. If the problem persists, this may be due to browser security restrictions - consider using a different browser or disabling ad-blockers temporarily.');
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('An unexpected error occurred while generating the sticker');
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private getStylePrompt(settings: GenerationSettings): string {
    const styleMap = {
      'full-body': 'full body chibi character',
      'face-only': 'chibi face portrait',
      'face-with-hands': 'chibi character with visible hands and face'
    };

    const artStyleMap = {
      'chibi': 'cute chibi style',
      'anime': 'anime chibi style'
    };

    return `${styleMap[settings.style]}, ${artStyleMap[settings.artStyle]}, sticker style, clean background`;
  }

  private async pollForCompletion(predictionId: string): Promise<string> {
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    while (attempts < maxAttempts) {
      const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
        },
      });

      const prediction = await response.json();

      if (prediction.status === 'succeeded') {
        return prediction.output[0];
      }

      if (prediction.status === 'failed') {
        throw new Error('Image generation failed');
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }

    throw new Error('Generation timeout');
  }
}