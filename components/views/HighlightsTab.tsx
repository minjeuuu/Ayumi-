import React, { useState, useEffect } from 'react';
import { Highlighter, Trash2, BookOpen, Search, Filter, Copy, Share2, X } from 'lucide-react';
import { Highlight } from '../../types';
import { HIGHLIGHT_COLORS } from '../../constants';

const STORAGE_KEY = 'ayumi_highlights';

const HighlightsTab: React.FC<{ theme?: string }> = ({ theme = "light" }) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedBook, setSelectedBook] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'by-book' | 'by-color'>('list');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setHighlights(JSON.parse(stored));
  }, []);

  const deleteHighlight = (id: string) => {
    const updated = highlights.filter(h => h.id !== id);
    setHighlights(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const filteredHighlights = highlights.filter(h => {
    const matchSearch = !searchQuery || 
      h.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.verseRef.toLowerCase().includes(searchQuery.toLowerCase());
    const matchColor = selectedColor === 'all' || h.color === selectedColor;
    const matchBook = selectedBook === 'all' || h.book === selectedBook;
    return matchSearch && matchColor && matchBook;
  });

  const books = [...new Set(highlights.map(h => h.book))].sort();
  const colorMap: Record<string, string> = {
    yellow: '#fef08a', orange: '#fed7aa', pink: '#fbcfe8',
    blue: '#bfdbfe', green: '#bbf7d0', purple: '#e9d5ff',
    red: '#fecaca', teal: '#99f6e4'
  };

  const copyHighlight = (h: Highlight) => {
    navigator.clipboard.writeText(`"${h.text}" — ${h.verseRef}`);
  };

  const shareHighlight = async (h: Highlight) => {
    const text = `"${h.text}" — ${h.verseRef}\n\nShared from Ayumi - Walking with God`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const groupedByBook = books.reduce<Record<string, Highlight[]>>((acc, book) => {
    acc[book] = filteredHighlights.filter(h => h.book === book);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Highlighter size={18} className="text-yellow-500" />
          <h2 className="font-bold text-stone-800">Highlights</h2>
          <span className="ml-auto text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {highlights.length} total
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search highlights..."
            className="w-full pl-9 pr-8 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-stone-400" />
            </button>
          )}
        </div>

        {/* Color filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedColor('all')}
            className={`flex-shrink-0 text-xs px-3 py-1 rounded-full border transition-colors ${
              selectedColor === 'all' ? 'bg-stone-800 text-white border-stone-800' : 'border-stone-200 text-stone-600'
            }`}
          >All</button>
          {Object.entries(colorMap).map(([color, hex]) => (
            <button
              key={color}
              onClick={() => setSelectedColor(selectedColor === color ? 'all' : color)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor === color ? 'border-stone-600 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>

        {/* View mode */}
        <div className="flex space-x-1 mt-3">
          {(['list', 'by-book', 'by-color'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                viewMode === mode ? 'bg-yellow-400 text-stone-800' : 'bg-stone-100 text-stone-600'
              }`}
            >
              {mode === 'list' ? 'List' : mode === 'by-book' ? 'By Book' : 'By Color'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {filteredHighlights.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <Highlighter size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No highlights yet</p>
            <p className="text-xs mt-1">Highlight verses in the Read tab</p>
          </div>
        ) : viewMode === 'by-book' ? (
          Object.entries(groupedByBook).map(([book, items]) => items.length > 0 && (
            <div key={book} className="mb-5">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen size={14} className="text-stone-400" />
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{book}</span>
                <span className="text-xs text-stone-400">({items.length})</span>
              </div>
              {items.map(h => <HighlightCard key={h.id} highlight={h} colorMap={colorMap} onDelete={deleteHighlight} onCopy={copyHighlight} onShare={shareHighlight} />)}
            </div>
          ))
        ) : (
          filteredHighlights.map(h => (
            <HighlightCard key={h.id} highlight={h} colorMap={colorMap} onDelete={deleteHighlight} onCopy={copyHighlight} onShare={shareHighlight} />
          ))
        )}
      </div>
    </div>
  );
};

const HighlightCard: React.FC<{
  highlight: Highlight;
  colorMap: Record<string, string>;
  onDelete: (id: string) => void;
  onCopy: (h: Highlight) => void;
  onShare: (h: Highlight) => void;
}> = ({ highlight, colorMap, onDelete, onCopy, onShare }) => {
  const bgColor = (colorMap as Record<string, string>)[highlight.color] || '#fef08a';

  return (
    <div className="mb-3 bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="p-4" style={{ borderLeft: `4px solid ${bgColor}` }}>
        <p className="text-sm text-stone-700 leading-relaxed font-serif mb-2" style={{ backgroundColor: bgColor + '40', padding: '8px', borderRadius: '6px' }}>
          "{highlight.text}"
        </p>
        <p className="text-xs font-semibold text-stone-500">{highlight.verseRef}</p>
        {highlight.note && (
          <p className="text-xs text-stone-400 mt-1 italic">Note: {highlight.note}</p>
        )}
      </div>
      <div className="flex items-center border-t border-stone-50 px-4 py-2 space-x-3">
        <span className="text-xs text-stone-300 flex-1">{new Date(highlight.dateAdded).toLocaleDateString()}</span>
        <button onClick={() => onCopy(highlight)} className="text-stone-400 hover:text-stone-600 transition-colors">
          <Copy size={14} />
        </button>
        <button onClick={() => onShare(highlight)} className="text-stone-400 hover:text-stone-600 transition-colors">
          <Share2 size={14} />
        </button>
        <button onClick={() => onDelete(highlight.id)} className="text-red-300 hover:text-red-500 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default HighlightsTab;
