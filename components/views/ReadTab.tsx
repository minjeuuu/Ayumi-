import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getBibleChapter, getChapterContext, explainVerse, searchBible } from '../../services/claudeService';
import { BibleVerse, BibleBookDef, BibleContext, Highlight, SavedBookmark } from '../../types';
import { BIBLE_BOOKS_FULL, COMPREHENSIVE_BIBLE_VERSIONS, HIGHLIGHT_COLORS, FONT_FAMILIES } from '../../constants';
import { 
  ChevronLeft, ChevronRight, BookOpen, List, Search, Bookmark, X, Info, Type,
  Highlighter, Share2, Download, Copy, ChevronDown, Columns, Shuffle, Star,
  MessageSquare, Play, Volume2, Settings2, Plus, Check, ArrowLeft, Filter
} from 'lucide-react';

const ReadTab: React.FC<{ theme?: string; settings?: any }> = ({ theme = 'light', settings }) => {
  const [currentBook, setCurrentBook] = useState<BibleBookDef>(BIBLE_BOOKS_FULL.find(b => b.name === 'John')!);
  const [currentChapter, setCurrentChapter] = useState(3);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(settings?.defaultBibleVersion || 'KJV');
  const [parallelVersion, setParallelVersion] = useState('NIV');
  const [parallelVerses, setParallelVerses] = useState<BibleVerse[]>([]);
  const [contextData, setContextData] = useState<BibleContext | null>(null);
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showVersionPicker, setShowVersionPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showParallel, setShowParallel] = useState(false);
  const [activeTestament, setActiveTestament] = useState<'OT' | 'NT'>('NT');
  const [selectedBookForNav, setSelectedBookForNav] = useState<BibleBookDef | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([]);
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [showVerseActions, setShowVerseActions] = useState(false);
  const [fontSize, setFontSize] = useState(settings?.fontSize || 18);
  const [fontFamily, setFontFamily] = useState(settings?.fontFamily || 'Lora, serif');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightColor, setHighlightColor] = useState(HIGHLIGHT_COLORS[0].value);
  const [showVerseNumbers, setShowVerseNumbers] = useState(true);
  const [readingMode, setReadingMode] = useState<'normal' | 'reader' | 'verse-by-verse'>('normal');
  const [notification, setNotification] = useState('');
  const [versionSearch, setVersionSearch] = useState('');
  const [explainLevel, setExplainLevel] = useState('adult');

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const bg = isDark ? 'bg-stone-950' : isSepia ? 'bg-amber-50' : 'bg-stone-50';
  const cardBg = isDark ? 'bg-stone-800 border-stone-700' : isSepia ? 'bg-amber-50 border-amber-200' : 'bg-white border-stone-200';
  const textColor = isDark ? 'text-stone-100' : isSepia ? 'text-amber-900' : 'text-stone-800';
  const mutedText = isDark ? 'text-stone-400' : isSepia ? 'text-amber-700' : 'text-stone-500';
  const accent = isDark ? 'text-amber-400' : 'text-emerald-700';
  const accentBg = isDark ? 'bg-amber-400/10 border-amber-400/20' : 'bg-emerald-50 border-emerald-200';

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_highlights');
    if (saved) setHighlights(JSON.parse(saved));
    const savedBM = localStorage.getItem('ayumi_bookmarks');
    if (savedBM) setBookmarks(JSON.parse(savedBM));
  }, []);

  useEffect(() => {
    loadChapter();
  }, [currentBook, currentChapter, selectedVersion]);

  useEffect(() => {
    if (showParallel) loadParallel();
  }, [showParallel, currentBook, currentChapter, parallelVersion]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const loadChapter = async () => {
    setIsLoading(true);
    setVerses([]);
    setSelectedVerses([]);
    setShowVerseActions(false);
    try {
      const v = await getBibleChapter(currentBook.name, currentChapter, selectedVersion);
      setVerses(v);
    } catch (e) {
      setVerses([{ book: currentBook.name, chapter: currentChapter, verse: 1, text: 'Loading...', version: selectedVersion }]);
    }
    setIsLoading(false);
  };

  const loadParallel = async () => {
    try {
      const v = await getBibleChapter(currentBook.name, currentChapter, parallelVersion);
      setParallelVerses(v);
    } catch (e) {}
  };

  const loadContext = async () => {
    if (!contextData) {
      const ctx = await getChapterContext(currentBook.name, currentChapter);
      setContextData(ctx);
    }
    setShowContext(true);
  };

  const handleVerseClick = (verseNum: number) => {
    setSelectedVerses(prev => {
      if (prev.includes(verseNum)) return prev.filter(v => v !== verseNum);
      return [...prev, verseNum];
    });
    setShowVerseActions(true);
  };

  const getVerseRef = (v: number) => `${currentBook.name} ${currentChapter}:${v}`;

  const handleHighlight = () => {
    const newHighlights: Highlight[] = selectedVerses.map(v => {
      const verse = verses.find(vv => vv.verse === v);
      return {
        id: Date.now().toString() + v,
        verseRef: getVerseRef(v),
        text: verse?.text || '',
        color: highlightColor,
        dateAdded: new Date().toISOString(),
        book: currentBook.name,
        chapter: currentChapter,
        verse: v,
        version: selectedVersion,
      };
    });
    const updated = [...highlights.filter(h => !selectedVerses.includes(h.verse) || h.book !== currentBook.name || h.chapter !== currentChapter), ...newHighlights];
    setHighlights(updated);
    localStorage.setItem('ayumi_highlights', JSON.stringify(updated));
    showNotification('Highlighted!');
    setSelectedVerses([]);
    setShowVerseActions(false);
  };

  const handleBookmark = () => {
    const firstVerse = Math.min(...selectedVerses);
    const bm: SavedBookmark = {
      id: Date.now().toString(),
      book: currentBook.name,
      chapter: currentChapter,
      verse: firstVerse,
      version: selectedVersion,
      dateAdded: new Date().toISOString(),
      color: '#5B7C75',
    };
    const updated = [...bookmarks, bm];
    setBookmarks(updated);
    localStorage.setItem('ayumi_bookmarks', JSON.stringify(updated));
    showNotification('Bookmarked!');
  };

  const handleShare = () => {
    const text = selectedVerses.map(v => {
      const verse = verses.find(vv => vv.verse === v);
      return `"${verse?.text}" - ${getVerseRef(v)} (${selectedVersion})`;
    }).join('\n');
    if (navigator.share) {
      navigator.share({ title: 'ayumi', text });
    } else {
      navigator.clipboard.writeText(text);
      showNotification('Copied to clipboard!');
    }
  };

  const handleCopy = () => {
    const text = selectedVerses.map(v => {
      const verse = verses.find(vv => vv.verse === v);
      return `${showVerseNumbers ? v + ' ' : ''}${verse?.text}`;
    }).join(' ');
    navigator.clipboard.writeText(text + `\n- ${currentBook.name} ${currentChapter} (${selectedVersion})`);
    showNotification('Copied!');
  };

  const handleExplain = async () => {
    const verseNums = selectedVerses.sort((a, b) => a - b);
    const combined = verseNums.map(v => {
      const verse = verses.find(vv => vv.verse === v);
      return verse?.text || '';
    }).join(' ');
    const ref = verseNums.length === 1 ? getVerseRef(verseNums[0]) : `${currentBook.name} ${currentChapter}:${verseNums[0]}-${verseNums[verseNums.length-1]}`;
    setShowExplanation(true);
    setExplanation('Generating explanation...');
    const exp = await explainVerse(combined, ref, explainLevel);
    setExplanation(exp);
  };

  const getHighlightColor = (verseNum: number) => {
    const h = highlights.find(h => h.book === currentBook.name && h.chapter === currentChapter && h.verse === verseNum);
    return h?.color || null;
  };

  const prevChapter = () => {
    if (currentChapter > 1) setCurrentChapter(c => c - 1);
    else {
      const idx = BIBLE_BOOKS_FULL.findIndex(b => b.name === currentBook.name);
      if (idx > 0) { setCurrentBook(BIBLE_BOOKS_FULL[idx - 1]); setCurrentChapter(BIBLE_BOOKS_FULL[idx - 1].chapters); }
    }
  };

  const nextChapter = () => {
    if (currentChapter < currentBook.chapters) setCurrentChapter(c => c + 1);
    else {
      const idx = BIBLE_BOOKS_FULL.findIndex(b => b.name === currentBook.name);
      if (idx < BIBLE_BOOKS_FULL.length - 1) { setCurrentBook(BIBLE_BOOKS_FULL[idx + 1]); setCurrentChapter(1); }
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchBible(searchQuery, selectedVersion);
    setSearchResults(results);
    setIsSearching(false);
  };

  const filteredVersions = COMPREHENSIVE_BIBLE_VERSIONS.filter(v =>
    v.name.toLowerCase().includes(versionSearch.toLowerCase()) ||
    v.abbreviation.toLowerCase().includes(versionSearch.toLowerCase()) ||
    v.language.toLowerCase().includes(versionSearch.toLowerCase())
  );

  const categoriesByTestament = (testament: 'OT' | 'NT') => {
    const books = BIBLE_BOOKS_FULL.filter(b => b.testament === testament);
    const cats = [...new Set(books.map(b => b.category))];
    return cats.map(cat => ({ cat, books: books.filter(b => b.category === cat) }));
  };

  const isBookmarked = bookmarks.some(b => b.book === currentBook.name && b.chapter === currentChapter);

  return (
    <div className={`min-h-screen ${bg} pb-32 md:pl-20`}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-bounce">
          {notification}
        </div>
      )}

      {/* Top Bar */}
      <div className={`sticky top-16 z-20 ${cardBg} border-b px-4 py-2`}>
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          {/* Book/Chapter Selector */}
          <button
            onClick={() => setShowBookSelector(true)}
            className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg ${cardBg} border font-serif text-sm ${textColor} hover:border-emerald-400 transition-colors`}
          >
            <BookOpen size={16} className={accent} />
            <span className="font-semibold">{currentBook.name}</span>
            <span className={mutedText}>{currentChapter}</span>
            <ChevronDown size={14} className={mutedText} />
          </button>

          {/* Version Selector */}
          <button
            onClick={() => setShowVersionPicker(true)}
            className={`px-3 py-2 rounded-lg border text-xs font-bold ${accent} ${accentBg} hover:opacity-80 transition-opacity`}
          >
            {selectedVersion}
          </button>

          {/* Actions */}
          <button onClick={() => setShowSearch(true)} className={`p-2 rounded-lg ${mutedText} hover:text-stone-700`}><Search size={18} /></button>
          <button onClick={() => setShowParallel(!showParallel)} className={`p-2 rounded-lg ${showParallel ? accent : mutedText}`}><Columns size={18} /></button>
          <button onClick={loadContext} className={`p-2 rounded-lg ${mutedText} hover:text-stone-700`}><Info size={18} /></button>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg ${mutedText} hover:text-stone-700`}><Settings2 size={18} /></button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`${cardBg} border-b px-4 py-3 max-w-2xl mx-auto`}>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className={`text-xs ${mutedText} block mb-1`}>Font Size</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(s => Math.max(12, s - 2))} className={`p-1 rounded ${cardBg} border`}>-</button>
                <span className={`text-sm ${textColor} w-8 text-center`}>{fontSize}</span>
                <button onClick={() => setFontSize(s => Math.min(32, s + 2))} className={`p-1 rounded ${cardBg} border`}>+</button>
              </div>
            </div>
            <div>
              <label className={`text-xs ${mutedText} block mb-1`}>Font</label>
              <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className={`text-xs p-1 rounded border ${cardBg} ${textColor}`}>
                {FONT_FAMILIES.slice(0, 10).map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs ${mutedText} block mb-1`}>Mode</label>
              <select value={readingMode} onChange={e => setReadingMode(e.target.value as any)} className={`text-xs p-1 rounded border ${cardBg} ${textColor}`}>
                <option value="normal">Normal</option>
                <option value="reader">Reader</option>
                <option value="verse-by-verse">Verse by Verse</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <label className={`text-xs ${mutedText}`}>Verse #</label>
              <button
                onClick={() => setShowVerseNumbers(!showVerseNumbers)}
                className={`w-8 h-5 rounded-full transition-colors ${showVerseNumbers ? 'bg-emerald-500' : 'bg-stone-300'}`}
              />
            </div>
            <div>
              <label className={`text-xs ${mutedText} block mb-1`}>Explain level</label>
              <select value={explainLevel} onChange={e => setExplainLevel(e.target.value)} className={`text-xs p-1 rounded border ${cardBg} ${textColor}`}>
                <option value="child">Child</option>
                <option value="teen">Teen</option>
                <option value="adult">Adult</option>
                <option value="scholar">Scholar</option>
              </select>
            </div>
          </div>
          {/* Highlight Colors */}
          <div className="mt-3">
            <label className={`text-xs ${mutedText} block mb-2`}>Highlight Color</label>
            <div className="flex gap-2">
              {HIGHLIGHT_COLORS.map(c => (
                <button
                  key={c.value}
                  onClick={() => setHighlightColor(c.value)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${highlightColor === c.value ? 'border-stone-600 scale-125' : 'border-transparent'}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Verse Actions Bar */}
      {showVerseActions && selectedVerses.length > 0 && (
        <div className={`fixed top-32 left-0 right-0 z-30 ${isDark ? 'bg-stone-800' : 'bg-emerald-700'} text-white px-4 py-2`}>
          <div className="max-w-2xl mx-auto flex items-center gap-2 overflow-x-auto">
            <span className="text-xs mr-2 whitespace-nowrap">{selectedVerses.length} verse{selectedVerses.length > 1 ? 's' : ''}</span>
            <div className="flex gap-1 flex-1">
              {HIGHLIGHT_COLORS.slice(0, 5).map(c => (
                <button key={c.value} onClick={() => { setHighlightColor(c.value); handleHighlight(); }}
                  className="w-6 h-6 rounded-full border-2 border-white/50" style={{ backgroundColor: c.value }} />
              ))}
            </div>
            <button onClick={handleBookmark} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/20 whitespace-nowrap"><Bookmark size={14} /> Save</button>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/20"><Copy size={14} /></button>
            <button onClick={handleShare} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/20"><Share2 size={14} /></button>
            <button onClick={handleExplain} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/20 whitespace-nowrap"><MessageSquare size={14} /> Explain</button>
            <button onClick={() => { setSelectedVerses([]); setShowVerseActions(false); }} className="ml-auto"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        {/* Chapter Nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevChapter} className={`p-2 rounded-lg ${cardBg} border ${mutedText} hover:text-stone-700`}>
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <h2 className={`font-serif text-lg font-bold ${textColor}`}>{currentBook.name} {currentChapter}</h2>
            <p className={`text-xs ${mutedText}`}>{selectedVersion}</p>
          </div>
          <button onClick={nextChapter} className={`p-2 rounded-lg ${cardBg} border ${mutedText} hover:text-stone-700`}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className={`text-sm ${mutedText}`}>Loading {currentBook.name} {currentChapter}...</p>
          </div>
        )}

        {/* Verses */}
        {!isLoading && (
          <div className={showParallel ? 'grid grid-cols-2 gap-4' : ''}>
            {/* Primary Translation */}
            <div className={`${cardBg} border rounded-2xl p-5 shadow-sm`}>
              {showParallel && <div className={`text-xs font-bold ${accent} mb-3 pb-2 border-b ${isDark ? 'border-stone-700' : 'border-stone-200'}`}>{selectedVersion}</div>}
              {readingMode === 'verse-by-verse' ? (
                <div className="space-y-4">
                  {verses.map(v => {
                    const hColor = getHighlightColor(v.verse);
                    const isSelected = selectedVerses.includes(v.verse);
                    return (
                      <div key={v.verse} onClick={() => handleVerseClick(v.verse)}
                        className={`p-3 rounded-xl cursor-pointer transition-all ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}
                        style={{ backgroundColor: hColor ? hColor + '40' : 'transparent' }}>
                        <span className={`text-xs font-bold ${accent} mr-2`}>{v.verse}</span>
                        <span style={{ fontFamily, fontSize: `${fontSize}px`, lineHeight: '1.8', color: hColor ? '#1a1a1a' : undefined }} className={textColor}>{v.text}</span>
                      </div>
                    );
                  })}
                </div>
              ) : readingMode === 'reader' ? (
                <p style={{ fontFamily, fontSize: `${fontSize}px`, lineHeight: '2' }} className={`${textColor} leading-loose`}>
                  {verses.map((v, i) => (
                    <span key={v.verse} onClick={() => handleVerseClick(v.verse)} className="cursor-pointer hover:bg-yellow-100/40"
                      style={{ backgroundColor: getHighlightColor(v.verse) ? getHighlightColor(v.verse)! + '40' : undefined }}>
                      {i > 0 && ' '}{v.text}
                    </span>
                  ))}
                </p>
              ) : (
                <div>
                  {verses.map(v => {
                    const hColor = getHighlightColor(v.verse);
                    const isSelected = selectedVerses.includes(v.verse);
                    return (
                      <span key={v.verse} onClick={() => handleVerseClick(v.verse)}
                        className={`inline cursor-pointer leading-relaxed transition-colors ${isSelected ? 'bg-emerald-200' : ''}`}
                        style={{ backgroundColor: hColor ? hColor + '60' : undefined }}>
                        {showVerseNumbers && <sup className={`text-xs font-bold ${accent} mr-0.5 select-none`}>{v.verse}</sup>}
                        <span style={{ fontFamily, fontSize: `${fontSize}px`, lineHeight: '1.9' }} className={textColor}>{v.text} </span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Parallel Translation */}
            {showParallel && (
              <div className={`${cardBg} border rounded-2xl p-5 shadow-sm`}>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-200">
                  <div className={`text-xs font-bold ${accent}`}>{parallelVersion}</div>
                  <select value={parallelVersion} onChange={e => setParallelVersion(e.target.value)} className={`text-xs p-1 rounded ${cardBg} border ${textColor}`}>
                    {COMPREHENSIVE_BIBLE_VERSIONS.slice(0, 30).map(v => <option key={v.id} value={v.abbreviation}>{v.abbreviation}</option>)}
                  </select>
                </div>
                {parallelVerses.map(v => (
                  <span key={v.verse} className="inline leading-relaxed">
                    {showVerseNumbers && <sup className={`text-xs font-bold ${accent} mr-0.5`}>{v.verse}</sup>}
                    <span style={{ fontFamily, fontSize: `${fontSize - 1}px`, lineHeight: '1.9' }} className={textColor}>{v.text} </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explanation Panel */}
        {showExplanation && (
          <div className={`mt-4 ${cardBg} border rounded-2xl p-5`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-serif font-bold ${textColor}`}>Verse Explanation</h3>
              <button onClick={() => setShowExplanation(false)}><X size={18} className={mutedText} /></button>
            </div>
            <p className={`text-sm ${textColor} leading-relaxed whitespace-pre-wrap`}>{explanation}</p>
          </div>
        )}

        {/* Chapter Navigation */}
        <div className="flex gap-3 mt-6">
          <button onClick={prevChapter} className={`flex-1 flex items-center justify-center gap-2 py-3 ${cardBg} border rounded-xl ${mutedText} hover:border-emerald-400 transition-colors`}>
            <ChevronLeft size={16} /> Previous
          </button>
          <button
            onClick={handleBookmark}
            className={`px-4 py-3 ${isBookmarked ? 'bg-emerald-600 text-white' : `${cardBg} border ${mutedText}`} rounded-xl transition-colors`}
          >
            <Bookmark size={16} />
          </button>
          <button onClick={nextChapter} className={`flex-1 flex items-center justify-center gap-2 py-3 ${cardBg} border rounded-xl ${mutedText} hover:border-emerald-400 transition-colors`}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Book Selector Modal */}
      {showBookSelector && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowBookSelector(false)}>
          <div className={`absolute inset-x-0 bottom-0 top-20 ${isDark ? 'bg-stone-900' : 'bg-white'} rounded-t-2xl flex flex-col overflow-hidden`}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <h2 className={`font-serif font-bold text-lg ${textColor}`}>Select Book</h2>
              <button onClick={() => setShowBookSelector(false)}><X size={22} className={mutedText} /></button>
            </div>
            {/* Testament Tabs */}
            <div className="flex gap-1 p-3 border-b border-stone-200">
              {(['OT', 'NT'] as const).map(t => (
                <button key={t} onClick={() => { setActiveTestament(t); setSelectedBookForNav(null); }}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${activeTestament === t ? 'bg-emerald-600 text-white' : `${mutedText} hover:text-stone-700`}`}>
                  {t === 'OT' ? 'Old Testament' : 'New Testament'}
                </button>
              ))}
            </div>
            <div className="flex flex-1 overflow-hidden">
              {/* Categories */}
              <div className={`w-1/3 border-r ${isDark ? 'border-stone-700' : 'border-stone-200'} overflow-y-auto py-2`}>
                {categoriesByTestament(activeTestament).map(({ cat }) => (
                  <button key={cat} onClick={() => setSelectedBookForNav({ name: cat } as any)}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${selectedBookForNav?.name === cat ? `${accent} font-bold` : mutedText}`}>
                    {cat}
                  </button>
                ))}
              </div>
              {/* Books */}
              <div className="flex-1 overflow-y-auto">
                {categoriesByTestament(activeTestament).map(({ cat, books }) => (
                  <div key={cat}>
                    <div className={`px-3 py-1 text-xs font-bold ${mutedText} sticky top-0 ${isDark ? 'bg-stone-900' : 'bg-white'}`}>{cat}</div>
                    {books.map(book => (
                      <button key={book.name} onClick={() => { setSelectedBookForNav(book); setCurrentBook(book); setCurrentChapter(1); setShowBookSelector(false); }}
                        className={`w-full text-left px-3 py-2 transition-colors ${currentBook.name === book.name ? `${accent} font-bold bg-emerald-50` : `${textColor} hover:bg-stone-50`}`}>
                        <span className="text-sm">{book.name}</span>
                        <span className={`text-xs ml-2 ${mutedText}`}>{book.chapters} ch</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Chapter Selector */}
            {currentBook && (
              <div className={`border-t ${isDark ? 'border-stone-700' : 'border-stone-200'} p-3`}>
                <p className={`text-xs ${mutedText} mb-2`}>Chapter</p>
                <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
                  {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(ch => (
                    <button key={ch} onClick={() => { setCurrentChapter(ch); setShowBookSelector(false); }}
                      className={`py-1 text-xs rounded ${currentChapter === ch ? 'bg-emerald-600 text-white' : `${cardBg} border ${textColor}`}`}>
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Version Picker Modal */}
      {showVersionPicker && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowVersionPicker(false)}>
          <div className={`absolute inset-x-0 bottom-0 top-16 ${isDark ? 'bg-stone-900' : 'bg-white'} rounded-t-2xl flex flex-col overflow-hidden`}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <h2 className={`font-serif font-bold text-lg ${textColor}`}>Bible Version</h2>
              <button onClick={() => setShowVersionPicker(false)}><X size={22} className={mutedText} /></button>
            </div>
            <div className="p-3">
              <input placeholder="Search versions..." value={versionSearch} onChange={e => setVersionSearch(e.target.value)}
                className={`w-full p-2 rounded-lg border text-sm ${cardBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-emerald-400`} />
            </div>
            <div className="flex-1 overflow-y-auto">
              {['English', 'Spanish', 'Portuguese', 'French', 'German', 'Japanese', 'Korean', 'Chinese', 'Tagalog', 'Hindi', 'Indonesian', 'Arabic', 'Russian', 'Original Languages'].map(lang => {
                const langVersions = filteredVersions.filter(v => v.language === lang || (lang === 'Original Languages' && ['Biblical Hebrew', 'Koine Greek', 'Greek', 'Latin'].includes(v.language)));
                if (langVersions.length === 0) return null;
                return (
                  <div key={lang}>
                    <div className={`px-4 py-2 text-xs font-bold ${mutedText} sticky top-0 ${isDark ? 'bg-stone-900' : 'bg-white'} border-b ${isDark ? 'border-stone-700' : 'border-stone-100'}`}>{lang}</div>
                    {langVersions.map(v => (
                      <button key={v.id} onClick={() => { setSelectedVersion(v.abbreviation); setShowVersionPicker(false); }}
                        className={`w-full text-left px-4 py-3 hover:bg-emerald-50 flex items-center justify-between ${textColor}`}>
                        <div>
                          <span className="text-sm font-semibold">{v.name}</span>
                          <span className={`text-xs ml-2 ${accent} font-bold`}>{v.abbreviation}</span>
                          {v.year && <span className={`text-xs ml-2 ${mutedText}`}>{v.year}</span>}
                        </div>
                        {selectedVersion === v.abbreviation && <Check size={16} className="text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Context Modal */}
      {showContext && contextData && (
        <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowContext(false)}>
          <div className={`absolute inset-x-4 top-24 bottom-24 ${isDark ? 'bg-stone-900' : 'bg-white'} rounded-2xl flex flex-col overflow-hidden`}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <h2 className={`font-serif font-bold ${textColor}`}>{contextData.reference}</h2>
              <button onClick={() => setShowContext(false)}><X size={22} className={mutedText} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <h3 className={`text-xs font-bold ${accent} uppercase mb-1`}>Author</h3>
                <p className={`text-sm ${textColor}`}>{contextData.author}</p>
              </div>
              <div>
                <h3 className={`text-xs font-bold ${accent} uppercase mb-1`}>Historical Setting</h3>
                <p className={`text-sm ${textColor}`}>{contextData.historicalSetting}</p>
              </div>
              <div>
                <h3 className={`text-xs font-bold ${accent} uppercase mb-1`}>Purpose</h3>
                <p className={`text-sm ${textColor}`}>{contextData.purpose}</p>
              </div>
              <div>
                <h3 className={`text-xs font-bold ${accent} uppercase mb-1`}>Chapter Outline</h3>
                {contextData.outline.map((o, i) => (
                  <p key={i} className={`text-sm ${textColor} py-1 border-b border-stone-100`}>{i + 1}. {o}</p>
                ))}
              </div>
              <div>
                <h3 className={`text-xs font-bold ${accent} uppercase mb-1`}>Cross References</h3>
                <div className="flex flex-wrap gap-2">
                  {contextData.crossReferences.map((r, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded ${accentBg} ${accent} font-medium`}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowSearch(false)}>
          <div className={`absolute inset-x-0 bottom-0 top-16 ${isDark ? 'bg-stone-900' : 'bg-white'} rounded-t-2xl flex flex-col`}
            onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Search size={18} className={mutedText} />
                <input autoFocus placeholder="Search the Bible..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  className={`flex-1 bg-transparent text-sm ${textColor} focus:outline-none`} />
                {isSearching && <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />}
                <button onClick={() => setShowSearch(false)}><X size={20} className={mutedText} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((v, i) => (
                    <div key={i} onClick={() => {
                      const book = BIBLE_BOOKS_FULL.find(b => b.name === v.book);
                      if (book) { setCurrentBook(book); setCurrentChapter(v.chapter); setShowSearch(false); }
                    }} className={`p-4 ${cardBg} border rounded-xl cursor-pointer hover:border-emerald-400`}>
                      <p className={`text-xs font-bold ${accent} mb-1`}>{v.book} {v.chapter}:{v.verse} ({selectedVersion})</p>
                      <p className={`text-sm ${textColor}`}>{v.text}</p>
                    </div>
                  ))}
                </div>
              ) : searchQuery && !isSearching ? (
                <p className={`text-sm ${mutedText} text-center py-8`}>No results. Try a verse reference like "John 3:16" or a word/phrase.</p>
              ) : (
                <div>
                  <p className={`text-xs font-bold ${mutedText} uppercase mb-3`}>Quick Search</p>
                  {['John 3:16', 'Psalm 23', 'Romans 8:28', 'Isaiah 40:31', 'Philippians 4:13', 'Jeremiah 29:11'].map(q => (
                    <button key={q} onClick={() => { setSearchQuery(q); handleSearch(); }}
                      className={`block w-full text-left px-3 py-2 rounded-lg ${textColor} text-sm hover:bg-stone-50 mb-1`}>{q}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadTab;
