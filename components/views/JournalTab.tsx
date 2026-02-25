import React, { useState, useEffect, useRef } from 'react';
import { JournalEntry } from '../../types';
import { FONT_FAMILIES, HIGHLIGHT_COLORS } from '../../constants';
import { PenLine, Plus, X, Save, Tag, Trash2, Share2, Download, Book, Search, ChevronLeft, Palette, Type, Image, BookOpen, Heart, Star } from 'lucide-react';
import { callClaude } from '../../services/claudeService';

const JOURNAL_COVERS = [
  // Solid colors
  { id: 'linen', label: 'Linen', style: { background: '#f5f0eb' }, textColor: '#44403c', category: 'minimal' },
  { id: 'sage', label: 'Sage', style: { background: '#7c9a7e' }, textColor: '#fff', category: 'minimal' },
  { id: 'stone', label: 'Stone', style: { background: '#78716c' }, textColor: '#fff', category: 'minimal' },
  { id: 'midnight', label: 'Midnight', style: { background: '#1e293b' }, textColor: '#e2e8f0', category: 'minimal' },
  { id: 'rose', label: 'Rose', style: { background: '#fda4af' }, textColor: '#9f1239', category: 'minimal' },
  { id: 'sky', label: 'Sky', style: { background: '#bae6fd' }, textColor: '#0c4a6e', category: 'minimal' },
  { id: 'gold', label: 'Gold', style: { background: '#fde68a' }, textColor: '#78350f', category: 'minimal' },
  { id: 'lavender', label: 'Lavender', style: { background: '#ddd6fe' }, textColor: '#4c1d95', category: 'minimal' },
  // Gradients
  { id: 'sunrise', label: 'Sunrise', style: { background: 'linear-gradient(135deg, #ff9a8b 0%, #fecfef 50%, #ffecd2 100%)' }, textColor: '#7c2d12', category: 'gradient' },
  { id: 'ocean', label: 'Ocean', style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }, textColor: '#fff', category: 'gradient' },
  { id: 'forest', label: 'Forest', style: { background: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)' }, textColor: '#fff', category: 'gradient' },
  { id: 'dusk', label: 'Dusk', style: { background: 'linear-gradient(135deg, #2D3561 0%, #C05C7E 100%)' }, textColor: '#fff', category: 'gradient' },
  { id: 'golden-hour', label: 'Golden Hour', style: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fda085 100%)' }, textColor: '#fff', category: 'gradient' },
  { id: 'holy', label: 'Holy Light', style: { background: 'linear-gradient(135deg, #fff9c4 0%, #fff3e0 50%, #ffe082 100%)' }, textColor: '#5d4037', category: 'gradient' },
  { id: 'heavens', label: 'Heavens', style: { background: 'linear-gradient(180deg, #1a237e 0%, #283593 30%, #1565C0 60%, #87CEEB 100%)' }, textColor: '#fff', category: 'gradient' },
  { id: 'spring', label: 'Spring', style: { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }, textColor: '#1a1a1a', category: 'gradient' },
  // Patterned / Textured
  { id: 'paper', label: 'Paper', style: { background: '#f9f3e9', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #e8dcc8 28px)' }, textColor: '#44403c', category: 'pattern' },
  { id: 'linen-texture', label: 'Linen', style: { background: '#f3ede3', backgroundImage: 'repeating-linear-gradient(45deg, #e8dcc8 0px, #e8dcc8 1px, transparent 0px, transparent 50%)' }, textColor: '#44403c', category: 'pattern' },
  { id: 'cross', label: 'Faith', style: { background: '#1a237e', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }, textColor: '#fff', category: 'pattern' },
  // Anime/Illustration style (simulated with gradients + pseudo elements)
  { id: 'cherry', label: 'Cherry Blossom', style: { background: 'linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd6e7 100%)' }, textColor: '#7c2d6e', category: 'anime' },
  { id: 'starlight', label: 'Starlight', style: { background: 'linear-gradient(135deg, #0d0d2b 0%, #1a1a4e 50%, #2d2b7f 100%)' }, textColor: '#e0d7ff', category: 'anime' },
  { id: 'meadow', label: 'Meadow Walk', style: { background: 'linear-gradient(180deg, #87CEEB 0%, #90EE90 60%, #228B22 100%)' }, textColor: '#fff', category: 'anime' },
  { id: 'autumn', label: 'Autumn Path', style: { background: 'linear-gradient(135deg, #ff8c00 0%, #ff6347 50%, #8b4513 100%)' }, textColor: '#fff', category: 'anime' },
  // Scripture-themed
  { id: 'grace', label: 'Grace', style: { background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)' }, textColor: '#276749', category: 'faith' },
  { id: 'covenant', label: 'Covenant', style: { background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }, textColor: '#78350f', category: 'faith' },
  { id: 'glory', label: 'Glory', style: { background: 'linear-gradient(135deg, #fffde7 0%, #fff9c4 50%, #ffd54f 100%)' }, textColor: '#4a3500', category: 'faith' },
  { id: 'shepherd', label: 'The Shepherd', style: { background: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)' }, textColor: '#1b5e20', category: 'faith' },
];

const JOURNAL_MOODS = ['Grateful', 'Peaceful', 'Seeking', 'Joyful', 'Struggling', 'Hopeful', 'Reflective', 'Worshipful', 'Convicted', 'Restored', 'Anxious', 'Bold'];
const PAGE_STYLES = ['lined', 'grid', 'dot', 'blank', 'scripture'];

const JournalTab: React.FC<{ theme?: string }> = ({ theme = 'light' }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({});
  const [selectedCover, setSelectedCover] = useState(JOURNAL_COVERS[0]);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pageStyle, setPageStyle] = useState('lined');
  const [coverCategory, setCoverCategory] = useState('all');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200';
  const textColor = isDark ? 'text-stone-100' : 'text-stone-800';
  const mutedText = isDark ? 'text-stone-400' : 'text-stone-500';
  const bg = isDark ? 'bg-stone-950' : 'bg-stone-50';

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_journal');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const saveEntries = (e: JournalEntry[]) => {
    setEntries(e);
    localStorage.setItem('ayumi_journal', JSON.stringify(e));
  };

  const startNewEntry = () => {
    setCurrentEntry({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title: '',
      text: '',
      tags: [],
      mood: '',
      coverStyle: JOURNAL_COVERS[0].id,
      fontFamily: 'Lora, serif',
      fontSize: 16,
      textColor: '#44403c',
      backgroundColor: '#ffffff',
    });
    setSelectedCover(JOURNAL_COVERS[0]);
    setIsEditing(true);
  };

  const saveEntry = () => {
    if (!currentEntry.text?.trim()) return;
    const entry: JournalEntry = {
      id: currentEntry.id || Date.now().toString(),
      date: currentEntry.date || new Date().toISOString(),
      title: currentEntry.title || `Entry - ${new Date().toLocaleDateString()}`,
      text: currentEntry.text || '',
      tags: currentEntry.tags || [],
      linkedScripture: currentEntry.linkedScripture,
      mood: currentEntry.mood,
      coverStyle: selectedCover.id,
      fontFamily: currentEntry.fontFamily,
      fontSize: currentEntry.fontSize,
      textColor: currentEntry.textColor,
      backgroundColor: currentEntry.backgroundColor,
    };
    const existing = entries.findIndex(e => e.id === entry.id);
    let updated: JournalEntry[];
    if (existing >= 0) {
      updated = [...entries];
      updated[existing] = entry;
    } else {
      updated = [entry, ...entries];
    }
    saveEntries(updated);
    setIsEditing(false);
    setCurrentEntry({});
  };

  const deleteEntry = (id: string) => {
    if (confirm('Delete this entry?')) saveEntries(entries.filter(e => e.id !== id));
  };

  const editEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    const cover = JOURNAL_COVERS.find(c => c.id === entry.coverStyle) || JOURNAL_COVERS[0];
    setSelectedCover(cover);
    setIsEditing(true);
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const text = await callClaude(
        `Write a personal journal entry for a Christian${aiPrompt ? ` about: ${aiPrompt}` : ''}. Make it thoughtful, vulnerable, and scripture-connected. First person, 150-250 words.`,
        'You are a devotional writer helping someone journal their faith journey.'
      );
      setCurrentEntry(prev => ({ ...prev, text: (prev.text || '') + '\n\n' + text }));
    } catch (e) {
      alert('Could not generate. Please check your connection.');
    }
    setIsGenerating(false);
    setAiPrompt('');
  };

  const shareEntry = async (entry: JournalEntry) => {
    const text = `${entry.title}\n${new Date(entry.date).toLocaleDateString()}\n\n${entry.text}\n${entry.linkedScripture ? '\n- ' + entry.linkedScripture : ''}`;
    if (navigator.share) await navigator.share({ title: entry.title || 'Journal Entry', text });
    else { navigator.clipboard.writeText(text); alert('Copied to clipboard!'); }
  };

  const downloadEntry = (entry: JournalEntry, format: 'txt' | 'pdf' | 'html') => {
    const dateStr = new Date(entry.date).toLocaleDateString();
    const text = `${entry.title || 'Untitled'}\n${dateStr}\n\n${entry.text}${entry.linkedScripture ? '\n\n— ' + entry.linkedScripture : ''}`;
    
    if (format === 'txt') {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `${(entry.title || 'journal').replace(/\s+/g, '-')}.txt`; a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'html' || format === 'pdf') {
      const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>${entry.title || 'Journal Entry'}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Lora', Georgia, serif; background: #fafaf8; color: #3d3d3d; }
  .page { max-width: 680px; margin: 0 auto; padding: 60px 50px; min-height: 100vh; background: white; box-shadow: 0 0 30px rgba(0,0,0,0.08); }
  .header { border-bottom: 2px solid #e5e0d8; padding-bottom: 20px; margin-bottom: 30px; }
  .app-name { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #a09080; margin-bottom: 16px; }
  h1 { font-size: 26px; color: #2d2d2d; font-weight: 700; margin-bottom: 8px; }
  .meta { font-size: 13px; color: #888; }
  .mood { display: inline-block; font-size: 11px; background: #f0ede8; padding: 3px 10px; border-radius: 20px; margin-left: 10px; color: #6b6b6b; }
  .tags { margin-top: 10px; }
  .tag { display: inline-block; font-size: 10px; background: #e8f5f0; color: #4a7c6f; padding: 2px 8px; border-radius: 10px; margin-right: 5px; }
  .body { font-size: 16px; line-height: 1.9; color: #3d3d3d; white-space: pre-wrap; }
  .scripture { margin-top: 30px; padding: 16px 20px; background: #f0f7f4; border-left: 3px solid #5b8a7d; border-radius: 4px; font-style: italic; color: #4a7a6e; font-size: 14px; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e0d8; font-size: 11px; color: #bbb; text-align: center; letter-spacing: 2px; }
  @media print { body { background: white; } .page { box-shadow: none; padding: 40px; } }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="app-name">あゆみ · AYUMI · WALKING WITH GOD</div>
    <h1>${entry.title || 'Journal Entry'}</h1>
    <div class="meta">${dateStr}${entry.mood ? `<span class="mood">${entry.mood}</span>` : ''}</div>
    ${entry.tags && entry.tags.length > 0 ? `<div class="tags">${entry.tags.map((t: string) => `<span class="tag">#${t}</span>`).join('')}</div>` : ''}
  </div>
  <div class="body">${(entry.text || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
  ${entry.linkedScripture ? `<div class="scripture">${entry.linkedScripture}</div>` : ''}
  <div class="footer">AYUMI · Walking with God</div>
</div>
${format === 'pdf' ? '<script>window.onload=()=>{window.print();}</script>' : ''}
</body>
</html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      if (format === 'pdf') {
        const w = window.open(url, '_blank');
        if (w) w.focus();
      } else {
        const a = document.createElement('a'); a.href = url; a.download = `${(entry.title || 'journal').replace(/\s+/g, '-')}.html`; a.click();
      }
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    }
  };

  const filteredEntries = entries.filter(e => {
    if (searchQuery && !e.text.toLowerCase().includes(searchQuery.toLowerCase()) && !(e.title || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedTag && !e.tags.includes(selectedTag)) return false;
    return true;
  });

  const allTags = [...new Set(entries.flatMap(e => e.tags))];
  const filteredCovers = coverCategory === 'all' ? JOURNAL_COVERS : JOURNAL_COVERS.filter(c => c.category === coverCategory);

  const getPageStyle = () => {
    switch (pageStyle) {
      case 'lined': return { backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 31px, ${isDark ? '#374151' : '#e5e7eb'} 32px)` };
      case 'grid': return { backgroundImage: `linear-gradient(${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#374151' : '#e5e7eb'} 1px, transparent 1px)`, backgroundSize: '32px 32px' };
      case 'dot': return { backgroundImage: `radial-gradient(circle, ${isDark ? '#4b5563' : '#d1d5db'} 1px, transparent 1px)`, backgroundSize: '20px 20px' };
      case 'blank': return {};
      case 'scripture': return { backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, ${isDark ? '#374151' : '#d1fae5'} 40px)` };
      default: return {};
    }
  };

  if (isEditing) {
    return (
      <div className={`min-h-screen ${bg} pb-20 md:pl-20`}>
        {/* Journal Editor Header */}
        <div className="fixed top-16 left-0 right-0 md:left-20 z-20 bg-white border-b border-stone-200 px-4 py-2">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <button onClick={() => setIsEditing(false)} className="p-2 text-stone-400 hover:text-stone-700"><ChevronLeft size={20} /></button>
            <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
              <button onClick={() => setShowCoverPicker(!showCoverPicker)} className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 rounded-lg text-xs text-stone-600 whitespace-nowrap hover:bg-stone-200">
                <Palette size={14} /> Cover
              </button>
              <button onClick={() => setShowFontPicker(!showFontPicker)} className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 rounded-lg text-xs text-stone-600 whitespace-nowrap hover:bg-stone-200">
                <Type size={14} /> Font
              </button>
              {PAGE_STYLES.map(ps => (
                <button key={ps} onClick={() => setPageStyle(ps)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap capitalize ${pageStyle === ps ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
                  {ps}
                </button>
              ))}
            </div>
            <button onClick={saveEntry} className="flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">
              <Save size={16} /> Save
            </button>
          </div>
        </div>

        {/* Cover Picker */}
        {showCoverPicker && (
          <div className="fixed top-32 left-0 right-0 md:left-20 z-20 bg-white border-b border-stone-200 p-4 shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                {['all','minimal','gradient','pattern','anime','faith'].map(cat => (
                  <button key={cat} onClick={() => setCoverCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs capitalize whitespace-nowrap ${coverCategory === cat ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
                {filteredCovers.map(cover => (
                  <button key={cover.id} onClick={() => { setSelectedCover(cover); setCurrentEntry(p => ({ ...p, coverStyle: cover.id })); setShowCoverPicker(false); }}
                    className={`h-14 rounded-lg border-2 transition-transform hover:scale-105 ${selectedCover.id === cover.id ? 'border-emerald-600 scale-105' : 'border-transparent'}`}
                    style={{ ...cover.style }}>
                    <span className="text-xs" style={{ color: cover.textColor }}>{cover.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Font Picker */}
        {showFontPicker && (
          <div className="fixed top-32 left-0 right-0 md:left-20 z-20 bg-white border-b border-stone-200 p-4 shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {FONT_FAMILIES.map(f => (
                  <button key={f.name} onClick={() => { setCurrentEntry(p => ({ ...p, fontFamily: f.value })); setShowFontPicker(false); }}
                    className={`p-2 rounded-lg border text-sm text-left ${currentEntry.fontFamily === f.value ? 'border-emerald-600 bg-emerald-50' : 'border-stone-200'}`}
                    style={{ fontFamily: f.value }}>
                    {f.name}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-xs text-stone-500">Size:</label>
                <input type="range" min="12" max="28" value={currentEntry.fontSize || 16} onChange={e => setCurrentEntry(p => ({ ...p, fontSize: parseInt(e.target.value) }))} className="flex-1" />
                <span className="text-xs text-stone-500">{currentEntry.fontSize || 16}px</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <label className="text-xs text-stone-500">Color:</label>
                <input type="color" value={currentEntry.textColor || '#44403c'} onChange={e => setCurrentEntry(p => ({ ...p, textColor: e.target.value }))} className="w-8 h-8 rounded cursor-pointer" />
                <label className="text-xs text-stone-500">BG:</label>
                <input type="color" value={currentEntry.backgroundColor || '#ffffff'} onChange={e => setCurrentEntry(p => ({ ...p, backgroundColor: e.target.value }))} className="w-8 h-8 rounded cursor-pointer" />
              </div>
            </div>
          </div>
        )}

        <div className={`pt-28 ${showCoverPicker || showFontPicker ? 'pt-64' : 'pt-28'} px-4`}>
          <div className="max-w-2xl mx-auto">
            {/* Journal Cover Preview */}
            <div className="h-32 rounded-t-2xl flex flex-col items-center justify-center relative overflow-hidden"
              style={selectedCover.style}>
              <input value={currentEntry.title || ''} onChange={e => setCurrentEntry(p => ({ ...p, title: e.target.value }))}
                placeholder="Journal Title..." className="text-center bg-transparent border-none outline-none font-serif font-bold text-lg w-full px-4"
                style={{ color: selectedCover.textColor }} />
              <p className="text-xs mt-1" style={{ color: selectedCover.textColor, opacity: 0.8 }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              {/* Mood selector */}
              <div className="absolute bottom-2 right-2">
                <select value={currentEntry.mood || ''} onChange={e => setCurrentEntry(p => ({ ...p, mood: e.target.value }))}
                  className="text-xs bg-transparent border-none outline-none cursor-pointer" style={{ color: selectedCover.textColor }}>
                  <option value="">+ Mood</option>
                  {JOURNAL_MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* Writing Area */}
            <div className={`rounded-b-2xl border border-t-0 ${isDark ? 'border-stone-700' : 'border-stone-200'} shadow-sm overflow-hidden`}
              style={{ backgroundColor: currentEntry.backgroundColor || '#ffffff', ...getPageStyle() }}>
              <textarea ref={textareaRef}
                value={currentEntry.text || ''}
                onChange={e => setCurrentEntry(p => ({ ...p, text: e.target.value }))}
                placeholder="Begin writing your heart..."
                className="w-full min-h-96 p-6 bg-transparent resize-none focus:outline-none"
                style={{ fontFamily: currentEntry.fontFamily || 'Lora, serif', fontSize: `${currentEntry.fontSize || 16}px`, lineHeight: '2', color: currentEntry.textColor || '#44403c' }}
              />
            </div>

            {/* Scripture Link */}
            <div className={`mt-3 p-3 ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-200'} border rounded-xl`}>
              <input value={currentEntry.linkedScripture || ''} onChange={e => setCurrentEntry(p => ({ ...p, linkedScripture: e.target.value }))}
                placeholder="Link a scripture (e.g., John 3:16)..."
                className={`w-full bg-transparent text-sm focus:outline-none ${isDark ? 'text-stone-300' : 'text-stone-600'}`} />
            </div>

            {/* Tags */}
            <div className={`mt-3 p-3 ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-200'} border rounded-xl`}>
              <div className="flex flex-wrap gap-2 mb-2">
                {(currentEntry.tags || []).map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                    {tag}
                    <button onClick={() => setCurrentEntry(p => ({ ...p, tags: (p.tags || []).filter(t => t !== tag) }))}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <input placeholder="Add tags (press Enter)..."
                className={`bg-transparent text-sm focus:outline-none ${isDark ? 'text-stone-300' : 'text-stone-600'}`}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) { setCurrentEntry(p => ({ ...p, tags: [...(p.tags || []), val] })); (e.target as HTMLInputElement).value = ''; }
                  }
                }} />
            </div>

            {/* AI Writing Assistant */}
            <div className={`mt-3 p-4 ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-emerald-50 border-emerald-200'} border rounded-xl`}>
              <p className="text-xs font-bold text-emerald-700 mb-2">AI Writing Companion</p>
              <div className="flex gap-2">
                <input value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                  placeholder="Ask AI to help (e.g., 'reflect on forgiveness')..."
                  className={`flex-1 bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400`}
                  onKeyPress={e => e.key === 'Enter' && generateWithAI()} />
                <button onClick={generateWithAI} disabled={isGenerating}
                  className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm disabled:opacity-50">
                  {isGenerating ? '...' : 'Ask'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {['reflect on today', 'prayer for peace', 'gratitude list', 'what God is teaching me', 'confession and repentance'].map(p => (
                  <button key={p} onClick={() => setAiPrompt(p)} className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bg} pb-32 md:pl-20`}>
      <div className="max-w-2xl mx-auto px-4 pt-4">
        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className={`flex-1 flex items-center gap-2 px-3 py-2 ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200'} border rounded-xl`}>
            <Search size={16} className={mutedText} />
            <input placeholder="Search journal..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className={`flex-1 bg-transparent text-sm focus:outline-none ${textColor}`} />
          </div>
          <button onClick={startNewEntry} className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium">
            <Plus size={16} /> New
          </button>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            <button onClick={() => setSelectedTag('')} className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${!selectedTag ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>All</button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${selectedTag === tag ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>{tag}</button>
            ))}
          </div>
        )}

        {filteredEntries.length === 0 ? (
          <div className="text-center py-20">
            <PenLine size={48} className={`${mutedText} mx-auto mb-4`} />
            <h3 className={`font-serif text-xl font-bold ${textColor} mb-2`}>Your Journal Awaits</h3>
            <p className={`text-sm ${mutedText} mb-6`}>Record your walk of faith, prayers, and reflections.</p>
            <button onClick={startNewEntry} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-medium">Begin Your First Entry</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEntries.map(entry => {
              const cover = JOURNAL_COVERS.find(c => c.id === entry.coverStyle) || JOURNAL_COVERS[0];
              return (
                <div key={entry.id} className={`${isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200'} border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                  {/* Cover */}
                  <div className="h-20 flex items-center justify-center cursor-pointer" style={cover.style} onClick={() => editEntry(entry)}>
                    <div className="text-center">
                      <p className="font-serif font-bold text-sm" style={{ color: cover.textColor }}>{entry.title || 'Untitled'}</p>
                      <p className="text-xs mt-0.5" style={{ color: cover.textColor, opacity: 0.8 }}>{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {/* Preview */}
                  <div className="p-4">
                    {entry.mood && <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full mr-2">{entry.mood}</span>}
                    <p className={`text-sm ${textColor} mt-2 line-clamp-3`} style={{ fontFamily: entry.fontFamily }}>{entry.text}</p>
                    {entry.linkedScripture && (
                      <p className={`text-xs ${mutedText} mt-2 italic`}>— {entry.linkedScripture}</p>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {entry.tags.map(t => <span key={t} className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">{t}</span>)}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100">
                      <button onClick={() => editEntry(entry)} className={`flex-1 text-xs ${mutedText} hover:text-stone-700 text-left`}>Edit</button>
                      <button onClick={() => shareEntry(entry)} className={`p-1.5 ${mutedText} hover:text-emerald-600`}><Share2 size={14} /></button>
                      <button onClick={() => downloadEntry(entry, 'txt')} className={`p-1.5 ${mutedText} hover:text-emerald-600`}><Download size={14} /></button>
                      <button onClick={() => downloadEntry(entry, 'html')} className={`p-1.5 text-xs ${mutedText} hover:text-emerald-600`}>HTML</button>
                      <button onClick={() => downloadEntry(entry, 'pdf')} className={`p-1.5 text-xs ${mutedText} hover:text-red-500 font-bold`}>PDF</button>
                      <button onClick={() => deleteEntry(entry.id)} className={`p-1.5 ${mutedText} hover:text-red-500`}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalTab;
