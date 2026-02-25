export interface JournalCover {
  id: string;
  name: string;
  type: 'color' | 'gradient' | 'pattern' | 'image';
  value: string;
  category: string;
}

export const journalCovers: JournalCover[] = [
  { id: 'pastel-pink', name: 'Pastel Pink', type: 'color', value: '#FFB3BA', category: 'Pastels' },
  { id: 'pastel-blue', name: 'Pastel Blue', type: 'color', value: '#BAE1FF', category: 'Pastels' },
  { id: 'pastel-green', name: 'Pastel Green', type: 'color', value: '#BAFFC9', category: 'Pastels' },
  { id: 'pastel-yellow', name: 'Pastel Yellow', type: 'color', value: '#FFFFBA', category: 'Pastels' },
  { id: 'pastel-purple', name: 'Pastel Purple', type: 'color', value: '#E0BBE4', category: 'Pastels' },
  { id: 'pastel-peach', name: 'Pastel Peach', type: 'color', value: '#FFDAB9', category: 'Pastels' },
  { id: 'pastel-mint', name: 'Pastel Mint', type: 'color', value: '#C1FFC1', category: 'Pastels' },
  { id: 'pastel-lavender', name: 'Pastel Lavender', type: 'color', value: '#E6E6FA', category: 'Pastels' },
  
  { id: 'deep-navy', name: 'Deep Navy', type: 'color', value: '#1A237E', category: 'Deep' },
  { id: 'deep-burgundy', name: 'Deep Burgundy', type: 'color', value: '#6D1B4D', category: 'Deep' },
  { id: 'deep-forest', name: 'Deep Forest', type: 'color', value: '#1B5E20', category: 'Deep' },
  { id: 'deep-plum', name: 'Deep Plum', type: 'color', value: '#4A148C', category: 'Deep' },
  { id: 'deep-teal', name: 'Deep Teal', type: 'color', value: '#004D40', category: 'Deep' },
  { id: 'deep-brown', name: 'Deep Brown', type: 'color', value: '#3E2723', category: 'Deep' },
  
  { id: 'grad-sunrise', name: 'Sunrise', type: 'gradient', value: 'linear-gradient(135deg, #FFE259 0%, #FFA751 100%)', category: 'Nature' },
  { id: 'grad-sunset', name: 'Sunset', type: 'gradient', value: 'linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%)', category: 'Nature' },
  { id: 'grad-ocean', name: 'Ocean', type: 'gradient', value: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)', category: 'Nature' },
  { id: 'grad-forest', name: 'Forest', type: 'gradient', value: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)', category: 'Nature' },
  { id: 'grad-sky', name: 'Sky', type: 'gradient', value: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', category: 'Nature' },
  { id: 'grad-cherry', name: 'Cherry Blossom', type: 'gradient', value: 'linear-gradient(135deg, #FBC2EB 0%, #A6C1EE 100%)', category: 'Nature' },
  { id: 'grad-aurora', name: 'Aurora', type: 'gradient', value: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)', category: 'Nature' },
  { id: 'grad-lavender', name: 'Lavender Field', type: 'gradient', value: 'linear-gradient(135deg, #DDD6F3 0%, #FAACA8 100%)', category: 'Nature' },
  
  { id: 'anime-sakura', name: 'Anime Sakura', type: 'gradient', value: 'linear-gradient(135deg, #FFB7D5 0%, #C298D8 100%)', category: 'Anime' },
  { id: 'anime-pastel', name: 'Anime Pastel', type: 'gradient', value: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)', category: 'Anime' },
  { id: 'anime-soft', name: 'Anime Soft', type: 'gradient', value: 'linear-gradient(135deg, #FBD3E9 0%, #BB377D 100%)', category: 'Anime' },
  { id: 'anime-dream', name: 'Anime Dream', type: 'gradient', value: 'linear-gradient(135deg, #A8C0FF 0%, #3F2B96 100%)', category: 'Anime' },
  
  { id: 'minimal-white', name: 'Clean White', type: 'color', value: '#FFFFFF', category: 'Minimal' },
  { id: 'minimal-cream', name: 'Warm Cream', type: 'color', value: '#FFFEF0', category: 'Minimal' },
  { id: 'minimal-gray', name: 'Soft Gray', type: 'color', value: '#F5F5F5', category: 'Minimal' },
  { id: 'minimal-beige', name: 'Natural Beige', type: 'color', value: '#F5F5DC', category: 'Minimal' },
  
  { id: 'vintage-paper', name: 'Vintage Paper', type: 'color', value: '#F4E8D0', category: 'Vintage' },
  { id: 'vintage-sepia', name: 'Sepia', type: 'color', value: '#E8D5C4', category: 'Vintage' },
  { id: 'vintage-parchment', name: 'Parchment', type: 'color', value: '#F0E68C', category: 'Vintage' },
  { id: 'vintage-aged', name: 'Aged Paper', type: 'color', value: '#D2B48C', category: 'Vintage' },
  
  { id: 'leather-brown', name: 'Leather Brown', type: 'color', value: '#8B4513', category: 'Classic' },
  { id: 'leather-black', name: 'Leather Black', type: 'color', value: '#1C1C1C', category: 'Classic' },
  { id: 'leather-burgundy', name: 'Leather Burgundy', type: 'color', value: '#800020', category: 'Classic' },
  { id: 'leather-navy', name: 'Leather Navy', type: 'color', value: '#000080', category: 'Classic' },
  
  { id: 'floral-rose', name: 'Rose Garden', type: 'pattern', value: 'floral-rose', category: 'Floral' },
  { id: 'floral-cherry', name: 'Cherry Blossoms', type: 'pattern', value: 'floral-cherry', category: 'Floral' },
  { id: 'floral-lavender', name: 'Lavender', type: 'pattern', value: 'floral-lavender', category: 'Floral' },
  { id: 'floral-daisy', name: 'Daisy Field', type: 'pattern', value: 'floral-daisy', category: 'Floral' },
  { id: 'floral-lotus', name: 'Lotus', type: 'pattern', value: 'floral-lotus', category: 'Floral' },
  
  { id: 'geo-dots', name: 'Polka Dots', type: 'pattern', value: 'geo-dots', category: 'Geometric' },
  { id: 'geo-stripes', name: 'Stripes', type: 'pattern', value: 'geo-stripes', category: 'Geometric' },
  { id: 'geo-chevron', name: 'Chevron', type: 'pattern', value: 'geo-chevron', category: 'Geometric' },
  { id: 'geo-grid', name: 'Grid', type: 'pattern', value: 'geo-grid', category: 'Geometric' },
  { id: 'geo-hexagon', name: 'Hexagon', type: 'pattern', value: 'geo-hexagon', category: 'Geometric' },
  
  { id: 'texture-linen', name: 'Linen', type: 'pattern', value: 'texture-linen', category: 'Texture' },
  { id: 'texture-canvas', name: 'Canvas', type: 'pattern', value: 'texture-canvas', category: 'Texture' },
  { id: 'texture-paper', name: 'Paper', type: 'pattern', value: 'texture-paper', category: 'Texture' },
  { id: 'texture-fabric', name: 'Fabric', type: 'pattern', value: 'texture-fabric', category: 'Texture' },
  { id: 'texture-wood', name: 'Wood Grain', type: 'pattern', value: 'texture-wood', category: 'Texture' },
  
  { id: 'season-spring', name: 'Spring', type: 'gradient', value: 'linear-gradient(135deg, #7DE2FC 0%, #B9FFFE 100%)', category: 'Seasonal' },
  { id: 'season-summer', name: 'Summer', type: 'gradient', value: 'linear-gradient(135deg, #FFE985 0%, #FA742B 100%)', category: 'Seasonal' },
  { id: 'season-autumn', name: 'Autumn', type: 'gradient', value: 'linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)', category: 'Seasonal' },
  { id: 'season-winter', name: 'Winter', type: 'gradient', value: 'linear-gradient(135deg, #E6E9F0 0%, #EEF1F5 100%)', category: 'Seasonal' },
  
  { id: 'mood-peaceful', name: 'Peaceful', type: 'gradient', value: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)', category: 'Mood' },
  { id: 'mood-joyful', name: 'Joyful', type: 'gradient', value: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)', category: 'Mood' },
  { id: 'mood-hopeful', name: 'Hopeful', type: 'gradient', value: 'linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)', category: 'Mood' },
  { id: 'mood-grateful', name: 'Grateful', type: 'gradient', value: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)', category: 'Mood' },
  
  { id: 'faith-cross', name: 'Cross Pattern', type: 'pattern', value: 'faith-cross', category: 'Faith' },
  { id: 'faith-dove', name: 'Dove', type: 'pattern', value: 'faith-dove', category: 'Faith' },
  { id: 'faith-light', name: 'Light Rays', type: 'pattern', value: 'faith-light', category: 'Faith' },
  { id: 'faith-path', name: 'Walking Path', type: 'pattern', value: 'faith-path', category: 'Faith' },
  
  { id: 'japanese-washi-1', name: 'Washi Pink', type: 'pattern', value: 'washi-pink', category: 'Japanese' },
  { id: 'japanese-washi-2', name: 'Washi Blue', type: 'pattern', value: 'washi-blue', category: 'Japanese' },
  { id: 'japanese-wave', name: 'Wave Pattern', type: 'pattern', value: 'japanese-wave', category: 'Japanese' },
  { id: 'japanese-sakura-pattern', name: 'Sakura Pattern', type: 'pattern', value: 'sakura-pattern', category: 'Japanese' },
  
  { id: 'notebook-lined', name: 'Lined Paper', type: 'pattern', value: 'lined', category: 'Notebook' },
  { id: 'notebook-grid', name: 'Grid Paper', type: 'pattern', value: 'grid', category: 'Notebook' },
  { id: 'notebook-dot', name: 'Dot Grid', type: 'pattern', value: 'dot-grid', category: 'Notebook' },
  { id: 'notebook-music', name: 'Music Staff', type: 'pattern', value: 'music-staff', category: 'Notebook' },
];

export const pageStyles = [
  { id: 'lined', name: 'Lined', description: 'Classic lined paper' },
  { id: 'grid', name: 'Grid', description: 'Square grid pattern' },
  { id: 'dot', name: 'Dot Grid', description: 'Bullet journal style' },
  { id: 'blank', name: 'Blank', description: 'Empty canvas' },
  { id: 'scripture-split', name: 'Scripture Split', description: 'Verse on left, notes on right' },
  { id: 'cornell', name: 'Cornell Notes', description: 'Cornell method layout' },
  { id: 'prayer-sections', name: 'Prayer Sections', description: 'Structured prayer template' },
  { id: 'gratitude', name: 'Gratitude', description: 'Gratitude journal layout' },
];

export const journalCategories = [
  'All',
  'Pastels',
  'Deep',
  'Nature',
  'Anime',
  'Minimal',
  'Vintage',
  'Classic',
  'Floral',
  'Geometric',
  'Texture',
  'Seasonal',
  'Mood',
  'Faith',
  'Japanese',
  'Notebook',
];
