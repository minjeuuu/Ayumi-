import React, { useState, useRef, useCallback } from 'react';
import { callClaude, searchBible } from '../../services/claudeService';
import { FONT_FAMILIES, VERSE_IMAGE_BACKGROUNDS } from '../../constants';
import { 
  Download, Share2, Image, Shuffle, Type, Palette, Layout, 
  Search, Wand2, ChevronDown, ChevronUp, AlignCenter, AlignLeft, 
  AlignRight, Bold, Italic, RotateCcw, Eye, EyeOff, Layers,
  Sun, Moon, Droplets, Sparkles, Grid, List, Filter, X, Check
} from 'lucide-react';

const SIZES = [
  { label: 'Instagram Square', w: 1080, h: 1080, aspect: '1/1' },
  { label: 'Instagram Story',  w: 1080, h: 1920, aspect: '9/16' },
  { label: 'Instagram Reel',   w: 1080, h: 1920, aspect: '9/16' },
  { label: 'Facebook Post',    w: 1200, h:  630, aspect: '40/21' },
  { label: 'Facebook Story',   w: 1080, h: 1920, aspect: '9/16' },
  { label: 'Twitter/X Post',   w: 1200, h:  675, aspect: '16/9' },
  { label: 'Twitter/X Header', w: 1500, h:  500, aspect: '3/1' },
  { label: 'LinkedIn Post',    w: 1200, h:  627, aspect: '1.91/1' },
  { label: 'Pinterest',        w:  736, h: 1102, aspect: '2/3' },
  { label: 'YouTube Thumbnail',w: 1280, h:  720, aspect: '16/9' },
  { label: 'Desktop Wallpaper',w: 1920, h: 1080, aspect: '16/9' },
  { label: 'Phone Wallpaper',  w: 1080, h: 2340, aspect: '9/19.5' },
  { label: 'Tablet Wallpaper', w: 2048, h: 2732, aspect: '3/4' },
  { label: 'Print 4×6"',       w: 1800, h: 1200, aspect: '3/2' },
  { label: 'Print 5×7"',       w: 2100, h: 1500, aspect: '7/5' },
  { label: 'Print 8×10"',      w: 2400, h: 3000, aspect: '4/5' },
  { label: 'Sermon Slide',     w: 1920, h: 1080, aspect: '16/9' },
  { label: 'Church Banner',    w: 2000, h:  750, aspect: '8/3' },
  { label: 'Custom',           w:    0, h:    0, aspect: '1/1' },
];

const TEMPLATES = [
  { id: 'centered',     label: 'Centered',    desc: 'Classic centered layout' },
  { id: 'minimal',      label: 'Minimal',     desc: 'Clean and airy' },
  { id: 'bold',         label: 'Bold',        desc: 'Large impactful text' },
  { id: 'card',         label: 'Scripture Card', desc: 'Framed card style' },
  { id: 'quote',        label: 'Quote',       desc: 'With quotation marks' },
  { id: 'top-left',     label: 'Top Left',    desc: 'Text anchored top-left' },
  { id: 'bottom',       label: 'Bottom Bar',  desc: 'Dark bar at bottom' },
  { id: 'overlap',      label: 'Overlap',     desc: 'Verse overlaps reference' },
  { id: 'split',        label: 'Split',       desc: 'Two-tone split' },
  { id: 'frame',        label: 'Framed',      desc: 'Elegant border frame' },
  { id: 'banner',       label: 'Banner',      desc: 'Wide banner layout' },
  { id: 'watermark',    label: 'Watermark',   desc: 'Subtle text overlay' },
];

const TEXT_EFFECTS = [
  { id: 'none',        label: 'None' },
  { id: 'shadow',      label: 'Drop Shadow' },
  { id: 'glow',        label: 'Glow' },
  { id: 'outline',     label: 'Outline' },
  { id: 'raised',      label: 'Raised' },
  { id: 'emboss',      label: 'Embossed' },
];

const OVERLAY_STYLES = [
  { id: 'none',           label: 'None' },
  { id: 'dark-30',        label: 'Dark 30%' },
  { id: 'dark-50',        label: 'Dark 50%' },
  { id: 'dark-70',        label: 'Dark 70%' },
  { id: 'light-30',       label: 'Light 30%' },
  { id: 'vignette',       label: 'Vignette' },
  { id: 'top-fade',       label: 'Top Fade' },
  { id: 'bottom-fade',    label: 'Bottom Fade' },
  { id: 'gradient-dark',  label: 'Gradient Dark' },
  { id: 'gradient-light', label: 'Gradient Light' },
];

const BG_CATEGORIES = ['All', 'Gradients', 'Solids', 'Unsplash'];

const VerseImageTab: React.FC<{ theme?: string }> = ({ theme = 'light' }) => {
  const [verseText, setVerseText] = useState('For we walk by faith, not by sight.');
  const [verseRef, setVerseRef] = useState('2 Corinthians 5:7');
  const [selectedBg, setSelectedBg] = useState(VERSE_IMAGE_BACKGROUNDS[0]);
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [fontSize, setFontSize] = useState(32);
  const [refFontSize, setRefFontSize] = useState(18);
  const [textColor, setTextColor] = useState('#ffffff');
  const [refColor, setRefColor] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState<'left'|'center'|'right'>('center');
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState('centered');
  const [textEffect, setTextEffect] = useState('shadow');
  const [overlay, setOverlay] = useState('dark-30');
  const [customW, setCustomW] = useState(1080);
  const [customH, setCustomH] = useState(1080);
  const [searchVerse, setSearchVerse] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState('');
  const [showTextOverlay, setShowTextOverlay] = useState(true);
  const [showRefText, setShowRefText] = useState(true);
  const [bgCategory, setBgCategory] = useState('All');
  const [bgSearch, setBgSearch] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [padding, setPadding] = useState(40);
  const [activePanel, setActivePanel] = useState<'background'|'text'|'layout'|'effects'>('background');
  const [unsplashKeyword, setUnsplashKeyword] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const bg = isDark ? 'bg-stone-950' : isSepia ? 'bg-amber-50' : 'bg-stone-50';
  const card = isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200';
  const text = isDark ? 'text-stone-100' : 'text-stone-800';
  const muted = isDark ? 'text-stone-400' : 'text-stone-500';
  const input = isDark ? 'bg-stone-800 border-stone-700 text-stone-200 placeholder-stone-500' : 'bg-white border-stone-200 text-stone-800 placeholder-stone-400';
  const btn = isDark ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700' : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200';

  const notify = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 2500); };

  // Filter backgrounds
  const filteredBgs = VERSE_IMAGE_BACKGROUNDS.filter(b => {
    const catMatch = bgCategory === 'All'
      || (bgCategory === 'Gradients' && b.type === 'gradient')
      || (bgCategory === 'Solids' && b.type === 'solid')
      || (bgCategory === 'Unsplash' && b.type === 'unsplash');
    const searchMatch = !bgSearch || b.label.toLowerCase().includes(bgSearch.toLowerCase());
    return catMatch && searchMatch;
  });

  const handleSearch = async () => {
    if (!searchVerse.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchBible(searchVerse);
      if (results.length > 0) {
        setVerseText(results[0].text);
        setVerseRef(`${results[0].book} ${results[0].chapter}:${results[0].verse}`);
      }
    } catch {}
    setIsSearching(false);
  };

  const getRandomVerse = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Give me one beautiful Bible verse. Respond ONLY in JSON: {"text":"verse text here","reference":"Book Chapter:Verse"}`;
      const result = await callClaude(prompt, 200);
      const clean = result.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setVerseText(parsed.text);
      setVerseRef(parsed.reference);
      notify('New verse generated!');
    } catch {}
    setIsGenerating(false);
  };

  const generateVerseForTheme = async (themeWord: string) => {
    setIsGenerating(true);
    try {
      const prompt = `Give me a Bible verse about "${themeWord}". Respond ONLY in JSON: {"text":"verse text","reference":"Book Chapter:Verse"}`;
      const result = await callClaude(prompt, 200);
      const clean = result.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setVerseText(parsed.text);
      setVerseRef(parsed.reference);
      notify(`Verse about "${themeWord}" found!`);
    } catch {}
    setIsGenerating(false);
  };

  const getUnsplashUrl = (keyword: string) =>
    `https://source.unsplash.com/featured/1200x1200/?${encodeURIComponent(keyword)},christian,faith`;

  const getBgStyle = (): React.CSSProperties => {
    if (selectedBg.type === 'unsplash') {
      const kw = unsplashKeyword || selectedBg.value;
      return { backgroundImage: `url(${getUnsplashUrl(kw)})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (selectedBg.type === 'gradient') return { background: selectedBg.value };
    return { backgroundColor: selectedBg.value };
  };

  const getOverlayStyle = (): React.CSSProperties => {
    if (overlay === 'none') return {};
    if (overlay === 'dark-30') return { backgroundColor: 'rgba(0,0,0,0.3)' };
    if (overlay === 'dark-50') return { backgroundColor: 'rgba(0,0,0,0.5)' };
    if (overlay === 'dark-70') return { backgroundColor: 'rgba(0,0,0,0.7)' };
    if (overlay === 'light-30') return { backgroundColor: 'rgba(255,255,255,0.3)' };
    if (overlay === 'vignette') return { background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' };
    if (overlay === 'top-fade') return { background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 50%)' };
    if (overlay === 'bottom-fade') return { background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' };
    if (overlay === 'gradient-dark') return { background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)' };
    if (overlay === 'gradient-light') return { background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 100%)' };
    return {};
  };

  const getTextStyle = (): React.CSSProperties => ({
    color: textColor,
    fontFamily: selectedFont.value,
    fontSize: `${fontSize}px`,
    fontWeight: isBold ? '700' : '400',
    fontStyle: isItalic ? 'italic' : 'normal',
    textAlign: textAlign,
    letterSpacing: `${letterSpacing}px`,
    lineHeight: lineHeight,
    textShadow: textEffect === 'shadow' ? '2px 2px 8px rgba(0,0,0,0.7)' 
      : textEffect === 'glow' ? `0 0 20px ${textColor}80, 0 0 40px ${textColor}40`
      : textEffect === 'outline' ? `-1px -1px 0 rgba(0,0,0,0.5), 1px 1px 0 rgba(0,0,0,0.5)`
      : 'none',
  });

  const getRefStyle = (): React.CSSProperties => ({
    color: refColor,
    fontFamily: selectedFont.value,
    fontSize: `${refFontSize}px`,
    textAlign: textAlign,
    textShadow: textEffect === 'shadow' ? '1px 1px 4px rgba(0,0,0,0.7)' : 'none',
    letterSpacing: '0.1em',
    opacity: 0.9,
  });

  const getContentAlign = () => {
    if (selectedTemplate === 'top-left') return 'justify-start items-start pt-8 pl-8';
    if (selectedTemplate === 'bottom' || selectedTemplate === 'bottom-fade') return 'justify-end items-center pb-10';
    return 'justify-center items-center';
  };

  const w = selectedSize.label === 'Custom' ? customW : selectedSize.w;
  const h = selectedSize.label === 'Custom' ? customH : selectedSize.h;

  // Preview aspect ratio
  const previewAspect = selectedSize.label === 'Custom'
    ? customH / customW
    : h / w;

  const QUICK_THEMES = ['faith','hope','love','peace','strength','grace','mercy','joy','trust','light','prayer','redemption'];

  return (
    <div className={`${bg} min-h-full`}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2 rounded-full text-sm shadow-lg">
          {notification}
        </div>
      )}

      <div className="p-4 space-y-4 pb-6">

        {/* ── VERSE INPUT ─────────────────────────── */}
        <div className={`${card} border rounded-2xl p-4`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${muted}`}>Verse</span>
            <div className="flex gap-1">
              <button onClick={getRandomVerse} disabled={isGenerating}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${isDark ? 'bg-emerald-900/50 text-emerald-400 hover:bg-emerald-900' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                <Shuffle size={12} /> Random
              </button>
              <button onClick={() => generateVerseForTheme('today')} disabled={isGenerating}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${isDark ? 'bg-violet-900/50 text-violet-400 hover:bg-violet-900' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>
                <Wand2 size={12} /> AI Pick
              </button>
            </div>
          </div>

          {/* Quick theme tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {QUICK_THEMES.map(t => (
              <button key={t} onClick={() => generateVerseForTheme(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize transition-all ${isDark ? 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200' : 'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700'}`}>
                {t}
              </button>
            ))}
          </div>

          <textarea
            value={verseText}
            onChange={e => setVerseText(e.target.value)}
            rows={3}
            className={`w-full rounded-xl border px-3 py-2 text-sm resize-none mb-2 ${input}`}
            placeholder="Enter verse text..." />
          <input
            value={verseRef}
            onChange={e => setVerseRef(e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-sm mb-3 ${input}`}
            placeholder="Reference (e.g. John 3:16)" />

          {/* Search */}
          <div className="flex gap-2">
            <input
              value={searchVerse}
              onChange={e => setSearchVerse(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className={`flex-1 rounded-xl border px-3 py-2 text-sm ${input}`}
              placeholder="Search any verse..." />
            <button onClick={handleSearch} disabled={isSearching}
              className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${btn}`}>
              <Search size={15} />
            </button>
          </div>
        </div>

        {/* ── PREVIEW ─────────────────────────────── */}
        <div className={`${card} border rounded-2xl overflow-hidden`}>
          <div className="p-3 flex items-center justify-between border-b" style={{ borderColor: isDark ? '#292524' : '#f3f0eb' }}>
            <span className={`text-xs font-bold uppercase tracking-wider ${muted}`}>Preview</span>
            <div className="flex gap-2">
              <button onClick={() => setShowTextOverlay(!showTextOverlay)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg ${btn} border`}>
                {showTextOverlay ? <EyeOff size={12} /> : <Eye size={12} />}
                {showTextOverlay ? 'Hide' : 'Show'} Text
              </button>
              <button className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-semibold`}
                      style={{ backgroundColor: '#5B7C75', color: 'white' }}>
                <Download size={12} /> Save
              </button>
            </div>
          </div>

          {/* Preview canvas */}
          <div className="p-4">
            <div
              ref={previewRef}
              className="relative mx-auto overflow-hidden rounded-xl"
              style={{ ...getBgStyle(), aspectRatio: selectedSize.label === 'Custom' ? `${customW}/${customH}` : selectedSize.aspect, maxWidth: '100%' }}>
              {/* Overlay */}
              <div className="absolute inset-0" style={getOverlayStyle()} />

              {/* Card template */}
              {selectedTemplate === 'card' && (
                <div className="absolute inset-4 border-2 border-white/30 rounded-xl" />
              )}
              {selectedTemplate === 'frame' && (
                <>
                  <div className="absolute top-3 left-3 right-3 bottom-3 border border-white/25 rounded-lg" />
                  <div className="absolute top-5 left-5 right-5 bottom-5 border border-white/15 rounded-md" />
                </>
              )}

              {/* Text */}
              {showTextOverlay && (
                <div className={`absolute inset-0 flex flex-col ${getContentAlign()}`}
                     style={{ padding: `${padding}px` }}>
                  {selectedTemplate === 'quote' && (
                    <div style={{ color: textColor, fontSize: '5em', lineHeight: 0.8, opacity: 0.4, fontFamily: 'serif' }}>"</div>
                  )}
                  <div style={{ ...getTextStyle(), maxWidth: '90%' }}>{verseText}</div>
                  {showRefText && (
                    <div style={{ ...getRefStyle(), marginTop: '0.6em' }}>— {verseRef}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── PANEL TABS ──────────────────────────── */}
        <div className={`${card} border rounded-2xl overflow-hidden`}>
          <div className="flex border-b" style={{ borderColor: isDark ? '#292524' : '#f3f0eb' }}>
            {(['background','text','layout','effects'] as const).map(panel => (
              <button key={panel} onClick={() => setActivePanel(panel)}
                className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider capitalize transition-all ${
                  activePanel === panel 
                    ? isDark ? 'bg-stone-800 text-stone-100' : 'bg-stone-50 text-stone-800'
                    : muted
                }`}>
                {panel}
              </button>
            ))}
          </div>

          {/* ── BACKGROUND PANEL ─── */}
          {activePanel === 'background' && (
            <div className="p-4 space-y-4">
              {/* Category filter */}
              <div className="flex gap-1.5 flex-wrap">
                {BG_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setBgCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      bgCategory === cat
                        ? 'bg-stone-800 text-white'
                        : isDark ? 'bg-stone-800 text-stone-400 hover:text-stone-200' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}>{cat}</button>
                ))}
                <input value={bgSearch} onChange={e => setBgSearch(e.target.value)} placeholder="Search..."
                  className={`flex-1 min-w-[100px] rounded-full border px-3 py-1 text-xs ${input}`} />
              </div>

              {/* Unsplash custom keyword */}
              {(bgCategory === 'All' || bgCategory === 'Unsplash') && (
                <div className="flex gap-2">
                  <input value={unsplashKeyword} onChange={e => setUnsplashKeyword(e.target.value)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm ${input}`}
                    placeholder="Custom Unsplash keyword (e.g. 'sunrise mountains')" />
                </div>
              )}

              {/* Background grid */}
              <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto">
                {filteredBgs.map(bg => (
                  <button key={bg.id} onClick={() => setSelectedBg(bg)}
                    className={`relative rounded-xl overflow-hidden transition-all ${
                      selectedBg.id === bg.id ? 'ring-2 ring-offset-2 ring-stone-800 scale-95' : 'hover:scale-95'
                    }`}
                    style={{ aspectRatio: '1/1' }}>
                    {bg.type === 'unsplash' ? (
                      <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-white text-center p-1"
                           style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)' }}>
                        <div>
                          <Image size={14} className="mx-auto mb-0.5" />
                          {bg.label}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full" style={{ background: bg.value }} />
                    )}
                    {selectedBg.id === bg.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check size={16} color="white" strokeWidth={3} />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-1 py-0.5">
                      <p className="text-[7px] text-white font-medium truncate text-center">{bg.label}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Overlay */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-2`}>Overlay</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {OVERLAY_STYLES.map(o => (
                    <button key={o.id} onClick={() => setOverlay(o.id)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-medium border transition-all ${
                        overlay === o.id
                          ? isDark ? 'bg-stone-600 text-white border-stone-500' : 'bg-stone-800 text-white border-stone-700'
                          : `${btn} border`
                      }`}>{o.label}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TEXT PANEL ─── */}
          {activePanel === 'text' && (
            <div className="p-4 space-y-4">
              {/* Font */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-2`}>Font Family</label>
                <select value={selectedFont.name}
                  onChange={e => setSelectedFont(FONT_FAMILIES.find(f => f.name === e.target.value) || FONT_FAMILIES[0])}
                  className={`w-full rounded-xl border px-3 py-2 text-sm ${input}`}>
                  {['Serif','Sans-Serif','Script','Handwriting','Display','Accessibility'].map(cat => (
                    <optgroup key={cat} label={cat}>
                      {FONT_FAMILIES.filter(f => f.category === cat).map(f => (
                        <option key={f.name} value={f.name}>{f.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Verse text controls */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-1.5`}>Verse Size: {fontSize}px</label>
                  <input type="range" min={16} max={80} value={fontSize} onChange={e => setFontSize(+e.target.value)}
                    className="w-full accent-stone-700" />
                </div>
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-1.5`}>Ref Size: {refFontSize}px</label>
                  <input type="range" min={10} max={40} value={refFontSize} onChange={e => setRefFontSize(+e.target.value)}
                    className="w-full accent-stone-700" />
                </div>
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-1.5`}>Line Height: {lineHeight}</label>
                  <input type="range" min={1} max={2.5} step={0.1} value={lineHeight} onChange={e => setLineHeight(+e.target.value)}
                    className="w-full accent-stone-700" />
                </div>
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-1.5`}>Letter Spacing: {letterSpacing}px</label>
                  <input type="range" min={-2} max={10} step={0.5} value={letterSpacing} onChange={e => setLetterSpacing(+e.target.value)}
                    className="w-full accent-stone-700" />
                </div>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-1.5`}>Verse Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                      className="w-10 h-9 rounded-lg border-none cursor-pointer" />
                    <input value={textColor} onChange={e => setTextColor(e.target.value)}
                      className={`flex-1 rounded-xl border px-2 py-2 text-sm font-mono ${input}`} />
                  </div>
                </div>
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-1.5`}>Reference Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={refColor} onChange={e => setRefColor(e.target.value)}
                      className="w-10 h-9 rounded-lg border-none cursor-pointer" />
                    <input value={refColor} onChange={e => setRefColor(e.target.value)}
                      className={`flex-1 rounded-xl border px-2 py-2 text-sm font-mono ${input}`} />
                  </div>
                </div>
              </div>

              {/* Style toggles */}
              <div className="flex gap-2">
                <button onClick={() => setIsBold(!isBold)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                    isBold ? 'bg-stone-800 text-white border-stone-700' : `${btn} border`
                  }`}><Bold size={14} /> Bold</button>
                <button onClick={() => setIsItalic(!isItalic)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                    isItalic ? 'bg-stone-800 text-white border-stone-700' : `${btn} border`
                  }`}><Italic size={14} /> Italic</button>
                {(['left','center','right'] as const).map(a => (
                  <button key={a} onClick={() => setTextAlign(a)}
                    className={`p-2 rounded-xl border transition-all ${
                      textAlign === a ? 'bg-stone-800 text-white border-stone-700' : `${btn} border`
                    }`}>
                    {a === 'left' ? <AlignLeft size={14} /> : a === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                  </button>
                ))}
                <button onClick={() => setShowRefText(!showRefText)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ml-auto ${
                    !showRefText ? 'bg-stone-800 text-white border-stone-700' : `${btn} border`
                  }`}>
                  {showRefText ? <Eye size={14} /> : <EyeOff size={14} />} Ref
                </button>
              </div>

              {/* Quick color presets */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-2`}>Quick Colors</label>
                <div className="flex gap-2 flex-wrap">
                  {['#ffffff','#000000','#fef3c7','#fce7f3','#dbeafe','#d1fae5','#f3e8ff','#ffedd5','#fee2e2','#e2e8f0'].map(c => (
                    <button key={c} onClick={() => { setTextColor(c); setRefColor(c); }}
                      className="w-7 h-7 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── LAYOUT PANEL ─── */}
          {activePanel === 'layout' && (
            <div className="p-4 space-y-4">
              {/* Canvas size */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-2`}>Canvas Size</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SIZES.map(size => (
                    <button key={size.label} onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                        selectedSize.label === size.label
                          ? 'bg-stone-800 text-white border-stone-700'
                          : `${btn} border`
                      }`}>
                      <div>{size.label}</div>
                      {size.w > 0 && <div className={`text-[9px] opacity-60 ${selectedSize.label === size.label ? 'text-stone-300' : muted}`}>{size.w}×{size.h}</div>}
                    </button>
                  ))}
                </div>
                {selectedSize.label === 'Custom' && (
                  <div className="flex gap-2 mt-2">
                    <input type="number" value={customW} onChange={e => setCustomW(+e.target.value)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm ${input}`} placeholder="Width" />
                    <input type="number" value={customH} onChange={e => setCustomH(+e.target.value)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm ${input}`} placeholder="Height" />
                  </div>
                )}
              </div>

              {/* Templates */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-2`}>Text Layout</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
                      className={`px-2 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        selectedTemplate === t.id
                          ? 'bg-stone-800 text-white border-stone-700'
                          : `${btn} border`
                      }`}>
                      <div className="font-semibold">{t.label}</div>
                      <div className={`text-[9px] opacity-60 mt-0.5 ${selectedTemplate === t.id ? 'text-stone-300' : muted}`}>{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Padding */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-1.5`}>Padding: {padding}px</label>
                <input type="range" min={16} max={120} value={padding} onChange={e => setPadding(+e.target.value)}
                  className="w-full accent-stone-700" />
              </div>
            </div>
          )}

          {/* ── EFFECTS PANEL ─── */}
          {activePanel === 'effects' && (
            <div className="p-4 space-y-4">
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider ${muted} block mb-2`}>Text Effect</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TEXT_EFFECTS.map(e => (
                    <button key={e.id} onClick={() => setTextEffect(e.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        textEffect === e.id
                          ? 'bg-stone-800 text-white border-stone-700'
                          : `${btn} border`
                      }`}>{e.label}</button>
                  ))}
                </div>
              </div>

              {/* AI Generate entire design */}
              <div className={`rounded-2xl p-4 ${isDark ? 'bg-violet-900/20 border border-violet-800' : 'bg-violet-50 border border-violet-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 size={16} className={isDark ? 'text-violet-400' : 'text-violet-600'} />
                  <span className={`text-sm font-bold ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>AI Design Assistant</span>
                </div>
                <p className={`text-xs mb-3 ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>Let Claude pick the perfect verse, background, and colors for a theme.</p>
                <div className="flex gap-2">
                  <input className={`flex-1 rounded-xl border px-3 py-2 text-sm ${input}`} placeholder="Enter theme (e.g. 'hope', 'marriage')" />
                  <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                          style={{ background: 'linear-gradient(135deg,#7c3aed,#9333ea)' }}>
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>

              {/* Reset */}
              <button onClick={() => {
                setTextEffect('shadow'); setOverlay('dark-30'); setSelectedTemplate('centered');
                setFontSize(32); setRefFontSize(18); setTextColor('#ffffff'); setRefColor('#ffffff');
                setIsBold(false); setIsItalic(false); setLetterSpacing(0); setLineHeight(1.4); setPadding(40);
                notify('Reset to defaults');
              }} className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium ${btn} border`}>
                <RotateCcw size={14} /> Reset All Effects
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerseImageTab;
