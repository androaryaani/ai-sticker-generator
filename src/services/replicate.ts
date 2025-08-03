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

    // Convert file to base64
    const base64Image = await this.fileToBase64(imageFile);

    try {
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json',
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
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const prediction = await response.json();
      
      // Poll for completion
      return await this.pollForCompletion(prediction.id);
    } catch (error) {
      console.error('Error generating chibi sticker:', error);
      throw error;
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