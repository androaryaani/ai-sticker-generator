export interface MockChibiOptions {
  style: 'full-body' | 'face-only' | 'face-with-hands';
  artStyle: 'chibi' | 'anime';
  emotion?: 'happy' | 'angry' | 'sad' | 'surprised' | 'sleepy' | 'love' | 'confused' | 'thinking';
}

export class MockChibiGenerator {
  private sampleImages = [
    // Happy expressions
    'https://images.pexels.com/photos/8923533/pexels-photo-8923533.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8923534/pexels-photo-8923534.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8923535/pexels-photo-8923535.jpeg?auto=compress&cs=tinysrgb&w=400',
    
    // Different emotions
    'https://images.pexels.com/photos/8923536/pexels-photo-8923536.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8923537/pexels-photo-8923537.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8923538/pexels-photo-8923538.jpeg?auto=compress&cs=tinysrgb&w=400',
    
    // More variations
    'https://images.pexels.com/photos/8923539/pexels-photo-8923539.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8923540/pexels-photo-8923540.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8923541/pexels-photo-8923541.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  async generateChibiSticker(imageFile: File, options: MockChibiOptions): Promise<string> {
    // Simulate processing time (much faster than real API)
    await this.delay(1500 + Math.random() * 1000); // 1.5-2.5 seconds

    // Select a random sample image based on style
    const randomIndex = Math.floor(Math.random() * this.sampleImages.length);
    return this.sampleImages[randomIndex];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate multiple emotion variations
  async generateEmotionSet(imageFile: File, options: MockChibiOptions): Promise<string[]> {
    await this.delay(2000);
    
    // Return 6 different emotion variations like in your samples
    return [
      this.sampleImages[0], // Happy
      this.sampleImages[1], // Angry  
      this.sampleImages[2], // Sad
      this.sampleImages[3], // Surprised
      this.sampleImages[4], // Sleepy
      this.sampleImages[5], // Love
    ];
  }
}