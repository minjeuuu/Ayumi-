import React, { useState, useRef, useEffect } from 'react';
import { callClaude, searchBible } from '../../services/claudeService';
import { FONT_FAMILIES } from '../../constants';
import { Download, Share2, Image, Plus, Shuffle, Type, Palette, Layout } from 'lucide-react';

const BACKGROUNDS = [
  { id: 'gradient1', label: 'Sunrise', style: 'linear-gradient(135deg, #f8b4a0 0%, #f9d8a8 100%)' },
  { id: 'gradient2', label: 'Ocean', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'gradient3', label: 'Forest', style: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)' },
  { id: 'gradient4', label: 'Evening', style: 'linear-gradient(135deg, #2D3561 0%, #C05C7E 100%)' },
  { id: 'gradient5', label: 'Dawn', style: 'linear-gradient(135deg, #FDDB92 0%, #D1FDFF 100%)' },
  { id: 'gradient6', label: 'Heaven', style: 'linear-gradient(180deg, #1a237e 0%, #87CEEB 100%)' },
  { id: 'gradient7', label: 'Holy', style: 'linear-gradient(135deg, #fff9c4 0%, #ffd54f 100%)' },
  { id: 'solid1', label: 'Dark', style: '#1c1917' },
  { id: 'solid2', label: 'Sage', style: '#5B7C75' },
  { id: 'solid3', label: 'Gold', style: '#92400e' },
  { id: 'solid4', label: 'Stone', style: '#44403c' },
  { id: 'pastel1', label: 'Blush', style: 'linear-gradient(135deg, #ffeef0 0%, #ffd6e0 100%)' },
  { id: 'pastel2', label: 'Mint', style: 'linear-gradient(135deg, #e8f8f5 0%, #a8d8c8 100%)' },
  { id: 'pastel3', label: 'Lavender', style: 'linear-gradient(135deg, #f3e8ff 0%, #c4b5fd 100%)' },
];

const SIZES = [
  { label: 'Instagram Square', width: 1080, height: 1080 },
  { label: 'Instagram Story', width: 1080, height: 1920 },
  { label: 'Facebook Post', width: 1200, height: 630 },
  { label: 'Twitter/X', width: 1200, height: 675 },
  { label: 'Wallpaper', width: 1920, height: 1080 },
  { label: 'Phone Wallpaper', width: 1080, height: 2340 },
  { label: 'Custom', width: 0, height: 0 },
];

const TEMPLATES = [
  { id: 'centered', label: 'Centered', description: 'Verse center, reference below' },
  { id: 'minimal', label: 'Minimal', description: 'Clean and simple' },
  { id: 'bold', label: 'Bold', description: 'Large impactful text' },
  { id: 'scripture-card', label: 'Scripture Card', description: 'Card with border' },
  { id: 'quote', label: 'Quote Style', description: 'Quotation mark styling' },
];

const VerseImageTab: React.FC<{ theme?: string }> = ({ theme = 'light' }) => {
  const [verseText, setVerseText] = useState('For we walk by faith, not by sight.');
  const [verseRef, setVerseRef] = useState('2 Corinthians 5:7');
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#ffffff');
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState('centered');
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(1080);
  const [searchVerse, setSearchVerse] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [notification, setNotification] = useState('');
  const [showTextOverlay, setShowTextOverlay] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200';
  const textColorClass = isDark ? 'text-stone-100' : 'text-stone-800';
  const mutedText = isDark ? 'text-stone-400' : 'text-stone-500';
  const bg = isDark ? 'bg-stone-950' : 'bg-stone-50';

  const showNotif = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 3000); };

  const handleSearch = async () => {
    if (!searchVerse.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchBible(searchVerse);
      if (results.length > 0) {
        setVerseText(results[0].text);
        setVerseRef(`${results[0].book} ${results[0].chapter}:${results[0].verse}`);
      }
    } catch (e) {}
    setIsSearching(false);
  };

  const getRandomVerse = async () => {
    const verses = [
      { text: "Trust in the LORD with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
      { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
      { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
      { text: "The LORD is my shepherd; I shall not want.", ref: "Psalm 23:1" },
      { text: "For God so loved the world that He gave His only begotten Son.", ref: "John 3:16" },
      { text: "Greater is He who is in you than he who is in the world.", ref: "1 John 4:4" },
      { text: "And we know that all things work together for good to those who love God.", ref: "Romans 8:28" },
      { text: "The name of the LORD is a strong tower; the righteous run to it and are safe.", ref: "Proverbs 18:10" },
    ];
    const v = verses[Math.floor(Math.random() * verses.length)];
    setVerseText(v.text);
    setVerseRef(v.ref);
  };

  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    const w = selectedSize.width || customWidth;
    const h = selectedSize.height || customHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    // Draw background
    if (selectedBg.style.startsWith('linear-gradient') || selectedBg.style.startsWith('#')) {
      if (selectedBg.style.startsWith('#')) {
        ctx.fillStyle = selectedBg.style;
        ctx.fillRect(0, 0, w, h);
      } else {
        // Parse and apply gradient
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#f8b4a0');
        grad.addColorStop(1, '#f9d8a8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    }

    // Draw text
    const padding = w * 0.1;
    const maxWidth = w - padding * 2;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.font = `${fontSize * (w / 400)}px ${selectedFont.name}`;
    
    // Word wrap
    const words = verseText.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = fontSize * 1.6 * (w / 400);
    const totalHeight = lines.length * lineHeight;
    const startY = (h - totalHeight) / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, w / 2, startY + i * lineHeight);
    });

    // Reference
    ctx.font = `${(fontSize * 0.6) * (w / 400)}px ${selectedFont.name}`;
    ctx.fillStyle = textColor;
    ctx.globalAlpha = 0.8;
    ctx.fillText(`- ${verseRef}`, w / 2, startY + totalHeight + lineHeight * 0.8);
    ctx.globalAlpha = 1;

    // Watermark
    ctx.font = `${14 * (w / 400)}px Inter`;
    ctx.fillStyle = textColor;
    ctx.globalAlpha = 0.3;
    ctx.fillText('ayumi | Walking with God', w / 2, h - 20 * (w / 400));

    // Download
    const link = document.createElement('a');
    link.download = `ayumi-verse-${verseRef.replace(/[\s:]/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showNotif('Image downloaded!');
  };

  const shareImage = async () => {
    const text = `"${verseText}" - ${verseRef}\n\nShared via ayumi`;
    if (navigator.share) {
      await navigator.share({ title: verseRef, text });
    } else {
      navigator.clipboard.writeText(text);
      showNotif('Copied to clipboard!');
    }
  };

  const getPreviewStyle = (): React.CSSProperties => {
    const bgVal = selectedBg.style;
    if (bgVal.startsWith('#')) return { backgroundColor: bgVal };
    return { background: bgVal };
  };

  return (
    <div className={`min-h-screen ${bg} pb-32 md:pl-20`}>
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
          {notification}
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 pt-4">
        {/* Preview */}
        <div className="relative mb-6">
          <div ref={previewRef} className="w-full aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 shadow-xl"
            style={getPreviewStyle()}>
            {selectedTemplate === 'scripture-card' && (
              <div className="absolute inset-4 border-2 border-white/30 rounded-xl pointer-events-none" />
            )}
            {selectedTemplate === 'quote' && (
              <div className="absolute top-8 left-8 text-white/20 font-serif" style={{ fontSize: '120px', lineHeight: 1, fontFamily: 'Georgia' }}>"</div>
            )}
            <p className="text-center font-serif leading-relaxed" style={{ fontFamily: selectedFont.value, fontSize: `${fontSize / 2}px`, color: textColor, lineHeight: '1.8', textShadow: '0 2px 8px rgba(0,0,0,0.3)', maxWidth: '85%' }}>
              {verseText}
            </p>
            <p className="mt-4 text-center" style={{ fontFamily: selectedFont.value, fontSize: `${fontSize / 3}px`, color: textColor, opacity: 0.8, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              — {verseRef}
            </p>
            <p className="absolute bottom-3 right-4 text-xs" style={{ color: textColor, opacity: 0.4, fontFamily: 'Inter, sans-serif' }}>ayumi</p>
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={downloadImage} className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"><Download size={18} /></button>
            <button onClick={shareImage} className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"><Share2 size={18} /></button>
          </div>
        </div>

        {/* Verse Input */}
        <div className={`${cardBg} border rounded-2xl p-4 mb-4`}>
          <div className="flex gap-2 mb-3">
            <input value={searchVerse} onChange={e => setSearchVerse(e.target.value)} placeholder="Search a verse..."
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
              className={`flex-1 text-sm px-3 py-2 rounded-lg border ${cardBg} ${textColorClass} focus:outline-none focus:ring-2 focus:ring-emerald-400`} />
            <button onClick={handleSearch} className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">Find</button>
            <button onClick={getRandomVerse} className="px-3 py-2 bg-stone-100 text-stone-600 rounded-lg text-sm"><Shuffle size={16} /></button>
          </div>
          <textarea value={verseText} onChange={e => setVerseText(e.target.value)}
            className={`w-full text-sm p-3 rounded-lg border ${cardBg} ${textColorClass} resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400`}
            rows={3} placeholder="Verse text..." />
          <input value={verseRef} onChange={e => setVerseRef(e.target.value)}
            className={`w-full mt-2 text-sm px-3 py-2 rounded-lg border ${cardBg} ${textColorClass} focus:outline-none`}
            placeholder="Reference (e.g., John 3:16)" />
        </div>

        {/* Backgrounds */}
        <div className={`${cardBg} border rounded-2xl p-4 mb-4`}>
          <h3 className={`text-sm font-bold ${textColorClass} mb-3 flex items-center gap-2`}><Palette size={16} /> Background</h3>
          <div className="grid grid-cols-7 gap-2">
            {BACKGROUNDS.map(bg => (
              <button key={bg.id} onClick={() => setSelectedBg(bg)}
                className={`h-10 rounded-lg border-2 transition-all ${selectedBg.id === bg.id ? 'border-emerald-500 scale-110' : 'border-transparent'}`}
                style={{ background: bg.style }} title={bg.label} />
            ))}
          </div>
        </div>

        {/* Font */}
        <div className={`${cardBg} border rounded-2xl p-4 mb-4`}>
          <h3 className={`text-sm font-bold ${textColorClass} mb-3 flex items-center gap-2`}><Type size={16} /> Typography</h3>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {FONT_FAMILIES.slice(0, 9).map(f => (
              <button key={f.name} onClick={() => setSelectedFont(f)}
                className={`p-2 rounded-lg border text-xs text-left ${selectedFont.name === f.name ? 'border-emerald-500 bg-emerald-50' : `border-stone-200 ${cardBg}`}`}
                style={{ fontFamily: f.value }}>{f.name}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className={`text-xs ${mutedText}`}>Size: {fontSize}</label>
            <input type="range" min="16" max="64" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="flex-1" />
            <label className={`text-xs ${mutedText}`}>Color:</label>
            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
          </div>
        </div>

        {/* Template */}
        <div className={`${cardBg} border rounded-2xl p-4 mb-4`}>
          <h3 className={`text-sm font-bold ${textColorClass} mb-3 flex items-center gap-2`}><Layout size={16} /> Template</h3>
          <div className="grid grid-cols-3 gap-2">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                className={`p-2 rounded-lg border text-xs text-left ${selectedTemplate === t.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : `border-stone-200 ${textColorClass}`}`}>
                <span className="font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size & Download */}
        <div className={`${cardBg} border rounded-2xl p-4 mb-4`}>
          <h3 className={`text-sm font-bold ${textColorClass} mb-3 flex items-center gap-2`}><Download size={16} /> Export</h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {SIZES.map(s => (
              <button key={s.label} onClick={() => setSelectedSize(s)}
                className={`p-2 rounded-lg border text-xs text-left ${selectedSize.label === s.label ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : `border-stone-200 ${textColorClass}`}`}>
                {s.label}<br /><span className={mutedText}>{s.width && s.height ? `${s.width}x${s.height}` : 'Custom'}</span>
              </button>
            ))}
          </div>
          {selectedSize.label === 'Custom' && (
            <div className="flex gap-2">
              <input type="number" value={customWidth} onChange={e => setCustomWidth(parseInt(e.target.value))} className={`flex-1 px-2 py-1 text-sm rounded border ${cardBg} ${textColorClass}`} placeholder="Width" />
              <span className={mutedText}>x</span>
              <input type="number" value={customHeight} onChange={e => setCustomHeight(parseInt(e.target.value))} className={`flex-1 px-2 py-1 text-sm rounded border ${cardBg} ${textColorClass}`} placeholder="Height" />
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <button onClick={downloadImage} className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-medium">
              <Download size={18} /> Download PNG
            </button>
            <button onClick={shareImage} className={`flex-1 flex items-center justify-center gap-2 py-3 ${cardBg} border rounded-xl ${textColorClass}`}>
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseImageTab;
