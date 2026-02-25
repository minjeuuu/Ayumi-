export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  style: {
    background: string;
    fontFamily: string;
    fontSize: number;
    textColor: string;
    textAlign: 'left' | 'center' | 'right';
    padding: number;
  };
}

export const designPresets: DesignPreset[] = [
  {
    id: 'calm',
    name: 'Calm',
    description: 'Peaceful and serene design',
    style: {
      background: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)',
      fontFamily: 'Lora',
      fontSize: 42,
      textColor: '#2C3E50',
      textAlign: 'center',
      padding: 80,
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Bold and dramatic',
    style: {
      background: '#1F2937',
      fontFamily: 'Inter',
      fontSize: 48,
      textColor: '#F9FAFB',
      textAlign: 'center',
      padding: 60,
    }
  },
  {
    id: 'pastel',
    name: 'Pastel',
    description: 'Soft and gentle',
    style: {
      background: 'linear-gradient(135deg, #FFC3A0 0%, #FFAFBD 100%)',
      fontFamily: 'Quicksand',
      fontSize: 44,
      textColor: '#4A5568',
      textAlign: 'center',
      padding: 90,
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple',
    style: {
      background: '#FFFFFF',
      fontFamily: 'Inter',
      fontSize: 40,
      textColor: '#111827',
      textAlign: 'left',
      padding: 100,
    }
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Classic and timeless',
    style: {
      background: '#F5F5DC',
      fontFamily: 'Playfair Display',
      fontSize: 46,
      textColor: '#5D4037',
      textAlign: 'center',
      padding: 70,
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary and sleek',
    style: {
      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
      fontFamily: 'Montserrat',
      fontSize: 50,
      textColor: '#FFFFFF',
      textAlign: 'center',
      padding: 60,
    }
  },
  {
    id: 'anime-soft',
    name: 'Anime Soft',
    description: 'Japanese-inspired aesthetic',
    style: {
      background: 'linear-gradient(135deg, #FBD3E9 0%, #BB377D 100%)',
      fontFamily: 'Kosugi Maru',
      fontSize: 38,
      textColor: '#2D3748',
      textAlign: 'center',
      padding: 85,
    }
  },
  {
    id: 'handwritten',
    name: 'Handwritten Note',
    description: 'Personal and warm',
    style: {
      background: '#FFFEF0',
      fontFamily: 'Caveat',
      fontSize: 52,
      textColor: '#374151',
      textAlign: 'left',
      padding: 75,
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and refined',
    style: {
      background: 'linear-gradient(135deg, #F5F7FA 0%, #C3CFE2 100%)',
      fontFamily: 'Cormorant',
      fontSize: 48,
      textColor: '#1A202C',
      textAlign: 'center',
      padding: 90,
    }
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Strong and impactful',
    style: {
      background: 'linear-gradient(135deg, #FF0844 0%, #FFB199 100%)',
      fontFamily: 'Bebas Neue',
      fontSize: 56,
      textColor: '#FFFFFF',
      textAlign: 'center',
      padding: 50,
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Earth tones and organic',
    style: {
      background: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
      fontFamily: 'Lora',
      fontSize: 44,
      textColor: '#F7FAFC',
      textAlign: 'center',
      padding: 80,
    }
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    description: 'Warm and hopeful',
    style: {
      background: 'linear-gradient(135deg, #FFE259 0%, #FFA751 100%)',
      fontFamily: 'Raleway',
      fontSize: 46,
      textColor: '#2D3748',
      textAlign: 'center',
      padding: 70,
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep and calming',
    style: {
      background: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
      fontFamily: 'Nunito',
      fontSize: 42,
      textColor: '#FFFFFF',
      textAlign: 'center',
      padding: 85,
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm and vibrant',
    style: {
      background: 'linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)',
      fontFamily: 'Poppins',
      fontSize: 45,
      textColor: '#1A202C',
      textAlign: 'center',
      padding: 75,
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Black and white classic',
    style: {
      background: '#000000',
      fontFamily: 'Cinzel',
      fontSize: 44,
      textColor: '#FFFFFF',
      textAlign: 'center',
      padding: 90,
    }
  },
  {
    id: 'gradient-rainbow',
    name: 'Rainbow',
    description: 'Colorful and joyful',
    style: {
      background: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 50%, #2BFF88 100%)',
      fontFamily: 'Fredoka',
      fontSize: 48,
      textColor: '#FFFFFF',
      textAlign: 'center',
      padding: 65,
    }
  },
  {
    id: 'parchment',
    name: 'Parchment',
    description: 'Ancient manuscript style',
    style: {
      background: '#E8DCC8',
      fontFamily: 'Crimson Text',
      fontSize: 40,
      textColor: '#3E2723',
      textAlign: 'center',
      padding: 95,
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Electric and modern',
    style: {
      background: '#0F0F0F',
      fontFamily: 'Orbitron',
      fontSize: 50,
      textColor: '#00FFFF',
      textAlign: 'center',
      padding: 55,
    }
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Artistic and flowing',
    style: {
      background: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)',
      fontFamily: 'Dancing Script',
      fontSize: 54,
      textColor: '#4A5568',
      textAlign: 'center',
      padding: 70,
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural and grounded',
    style: {
      background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
      fontFamily: 'Merriweather',
      fontSize: 42,
      textColor: '#E8F5E9',
      textAlign: 'center',
      padding: 80,
    }
  },
  {
    id: 'sakura',
    name: 'Sakura',
    description: 'Cherry blossom inspired',
    style: {
      background: 'linear-gradient(135deg, #FBC2EB 0%, #A6C1EE 100%)',
      fontFamily: 'Zen Kaku Gothic New',
      fontSize: 40,
      textColor: '#4A5568',
      textAlign: 'center',
      padding: 88,
    }
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep night sky',
    style: {
      background: 'linear-gradient(135deg, #000428 0%, #004E92 100%)',
      fontFamily: 'Lato',
      fontSize: 46,
      textColor: '#F0F4F8',
      textAlign: 'center',
      padding: 75,
    }
  },
  {
    id: 'autumn',
    name: 'Autumn',
    description: 'Fall colors',
    style: {
      background: 'linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)',
      fontFamily: 'Libre Baskerville',
      fontSize: 44,
      textColor: '#2D3748',
      textAlign: 'center',
      padding: 82,
    }
  },
  {
    id: 'spring',
    name: 'Spring',
    description: 'Fresh and blooming',
    style: {
      background: 'linear-gradient(135deg, #7DE2FC 0%, #B9FFFE 100%)',
      fontFamily: 'Nunito',
      fontSize: 43,
      textColor: '#2C5282',
      textAlign: 'center',
      padding: 78,
    }
  },
  {
    id: 'gothic',
    name: 'Gothic',
    description: 'Medieval and ornate',
    style: {
      background: '#1A1A1A',
      fontFamily: 'UnifrakturMaguntia',
      fontSize: 42,
      textColor: '#D4AF37',
      textAlign: 'center',
      padding: 85,
    }
  },
  {
    id: 'minimalist-dark',
    name: 'Minimalist Dark',
    description: 'Simple dark theme',
    style: {
      background: '#111827',
      fontFamily: 'Inter',
      fontSize: 38,
      textColor: '#F3F4F6',
      textAlign: 'left',
      padding: 100,
    }
  },
  {
    id: 'cream-elegant',
    name: 'Cream Elegant',
    description: 'Soft elegant cream',
    style: {
      background: '#FAF0E6',
      fontFamily: 'Cormorant Garamond',
      fontSize: 47,
      textColor: '#4A4A4A',
      textAlign: 'center',
      padding: 85,
    }
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    description: 'Vibrant underwater',
    style: {
      background: 'linear-gradient(135deg, #FD746C 0%, #FF9068 100%)',
      fontFamily: 'Quicksand',
      fontSize: 45,
      textColor: '#FFFFFF',
      textAlign: 'center',
      padding: 72,
    }
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    description: 'Soft purple tones',
    style: {
      background: 'linear-gradient(135deg, #DDD6F3 0%, #FAACA8 100%)',
      fontFamily: 'Lora',
      fontSize: 44,
      textColor: '#4C51BF',
      textAlign: 'center',
      padding: 80,
    }
  },
  {
    id: 'arctic',
    name: 'Arctic',
    description: 'Cool icy blue',
    style: {
      background: 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)',
      fontFamily: 'Open Sans',
      fontSize: 41,
      textColor: '#F7FAFC',
      textAlign: 'center',
      padding: 87,
    }
  },
];

export const versePresetThemes = [
  'Comfort', 'Strength', 'Hope', 'Faith', 'Love', 'Lament',
  'Joy', 'Peace', 'Wisdom', 'Courage', 'Gratitude', 'Mercy',
  'Grace', 'Redemption', 'Salvation', 'Trust', 'Protection',
  'Guidance', 'Healing', 'Forgiveness', 'Praise', 'Worship'
];

export const artElements = [
  { id: 'line-thin', name: 'Thin Line', type: 'line' },
  { id: 'line-thick', name: 'Thick Line', type: 'line' },
  { id: 'line-dashed', name: 'Dashed Line', type: 'line' },
  { id: 'line-dotted', name: 'Dotted Line', type: 'line' },
  { id: 'divider-simple', name: 'Simple Divider', type: 'divider' },
  { id: 'divider-ornate', name: 'Ornate Divider', type: 'divider' },
  { id: 'divider-floral', name: 'Floral Divider', type: 'divider' },
  { id: 'frame-square', name: 'Square Frame', type: 'frame' },
  { id: 'frame-round', name: 'Round Frame', type: 'frame' },
  { id: 'frame-ornate', name: 'Ornate Frame', type: 'frame' },
  { id: 'frame-minimal', name: 'Minimal Frame', type: 'frame' },
  { id: 'shape-circle', name: 'Circle', type: 'shape' },
  { id: 'shape-square', name: 'Square', type: 'shape' },
  { id: 'shape-triangle', name: 'Triangle', type: 'shape' },
  { id: 'shape-hexagon', name: 'Hexagon', type: 'shape' },
  { id: 'shape-star', name: 'Star', type: 'shape' },
  { id: 'shape-heart', name: 'Heart', type: 'shape' },
  { id: 'shape-cross', name: 'Cross', type: 'shape' },
  { id: 'icon-star', name: 'Star Icon', type: 'icon' },
  { id: 'icon-flower', name: 'Flower Icon', type: 'icon' },
  { id: 'icon-leaf', name: 'Leaf Icon', type: 'icon' },
  { id: 'icon-sun', name: 'Sun Icon', type: 'icon' },
  { id: 'icon-moon', name: 'Moon Icon', type: 'icon' },
  { id: 'icon-cloud', name: 'Cloud Icon', type: 'icon' },
  { id: 'icon-dove', name: 'Dove Icon', type: 'icon' },
  { id: 'icon-anchor', name: 'Anchor Icon', type: 'icon' },
  { id: 'particle-sparkle', name: 'Sparkle', type: 'particle' },
  { id: 'particle-glow', name: 'Glow', type: 'particle' },
  { id: 'particle-shine', name: 'Shine', type: 'particle' },
  { id: 'flower-cherry', name: 'Cherry Blossom', type: 'flower' },
  { id: 'flower-rose', name: 'Rose', type: 'flower' },
  { id: 'flower-lily', name: 'Lily', type: 'flower' },
  { id: 'flower-lotus', name: 'Lotus', type: 'flower' },
  { id: 'flower-daisy', name: 'Daisy', type: 'flower' },
  { id: 'accent-tape', name: 'Paper Tape', type: 'accent' },
  { id: 'accent-washi', name: 'Washi Tape', type: 'accent' },
  { id: 'accent-ribbon', name: 'Ribbon', type: 'accent' },
  { id: 'accent-bookmark', name: 'Bookmark', type: 'accent' },
  { id: 'accent-corner', name: 'Corner Accent', type: 'accent' },
];
