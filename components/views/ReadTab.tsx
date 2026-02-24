import React, { useState, useEffect, useRef } from 'react';
import { getBibleChapter, getChapterContext } from '../../services/geminiService';
import { BibleVerse, BibleBookDef, ReadingMode, BibleContext } from '../../types';
import { 
  ChevronLeft, ChevronRight, Settings2, Book, List, AlignLeft, 
  Search, Bookmark, MoreHorizontal, X, Info, Type
} from 'lucide-react';

// --- Static Data for Book Selector ---
const BIBLE_BOOKS: BibleBookDef[] = [
  // OT
  { name: 'Genesis', category: 'Law', chapters: 50, testament: 'OT' },
  { name: 'Exodus', category: 'Law', chapters: 40, testament: 'OT' },
  { name: 'Leviticus', category: 'Law', chapters: 27, testament: 'OT' },
  { name: 'Numbers', category: 'Law', chapters: 36, testament: 'OT' },
  { name: 'Deuteronomy', category: 'Law', chapters: 34, testament: 'OT' },
  { name: 'Joshua', category: 'History', chapters: 24, testament: 'OT' },
  { name: 'Judges', category: 'History', chapters: 21, testament: 'OT' },
  { name: 'Ruth', category: 'History', chapters: 4, testament: 'OT' },
  { name: '1 Samuel', category: 'History', chapters: 31, testament: 'OT' },
  { name: '2 Samuel', category: 'History', chapters: 24, testament: 'OT' },
  { name: '1 Kings', category: 'History', chapters: 22, testament: 'OT' },
  { name: '2 Kings', category: 'History', chapters: 25, testament: 'OT' },
  { name: '1 Chronicles', category: 'History', chapters: 29, testament: 'OT' },
  { name: '2 Chronicles', category: 'History', chapters: 36, testament: 'OT' },
  { name: 'Ezra', category: 'History', chapters: 10, testament: 'OT' },
  { name: 'Nehemiah', category: 'History', chapters: 13, testament: 'OT' },
  { name: 'Esther', category: 'History', chapters: 10, testament: 'OT' },
  { name: 'Job', category: 'Poetry', chapters: 42, testament: 'OT' },
  { name: 'Psalms', category: 'Poetry', chapters: 150, testament: 'OT' },
  { name: 'Proverbs', category: 'Poetry', chapters: 31, testament: 'OT' },
  { name: 'Ecclesiastes', category: 'Poetry', chapters: 12, testament: 'OT' },
  { name: 'Song of Solomon', category: 'Poetry', chapters: 8, testament: 'OT' },
  { name: 'Isaiah', category: 'Major Prophets', chapters: 66, testament: 'OT' },
  { name: 'Jeremiah', category: 'Major Prophets', chapters: 52, testament: 'OT' },
  { name: 'Lamentations', category: 'Major Prophets', chapters: 5, testament: 'OT' },
  { name: 'Ezekiel', category: 'Major Prophets', chapters: 48, testament: 'OT' },
  { name: 'Daniel', category: 'Major Prophets', chapters: 12, testament: 'OT' },
  { name: 'Hosea', category: 'Minor Prophets', chapters: 14, testament: 'OT' },
  { name: 'Joel', category: 'Minor Prophets', chapters: 3, testament: 'OT' },
  { name: 'Amos', category: 'Minor Prophets', chapters: 9, testament: 'OT' },
  { name: 'Obadiah', category: 'Minor Prophets', chapters: 1, testament: 'OT' },
  { name: 'Jonah', category: 'Minor Prophets', chapters: 4, testament: 'OT' },
  { name: 'Micah', category: 'Minor Prophets', chapters: 7, testament: 'OT' },
  { name: 'Nahum', category: 'Minor Prophets', chapters: 3, testament: 'OT' },
  { name: 'Habakkuk', category: 'Minor Prophets', chapters: 3, testament: 'OT' },
  { name: 'Zephaniah', category: 'Minor Prophets', chapters: 3, testament: 'OT' },
  { name: 'Haggai', category: 'Minor Prophets', chapters: 2, testament: 'OT' },
  { name: 'Zechariah', category: 'Minor Prophets', chapters: 14, testament: 'OT' },
  { name: 'Malachi', category: 'Minor Prophets', chapters: 4, testament: 'OT' },
  // NT
  { name: 'Matthew', category: 'Gospels', chapters: 28, testament: 'NT' },
  { name: 'Mark', category: 'Gospels', chapters: 16, testament: 'NT' },
  { name: 'Luke', category: 'Gospels', chapters: 24, testament: 'NT' },
  { name: 'John', category: 'Gospels', chapters: 21, testament: 'NT' },
  { name: 'Acts', category: 'Acts', chapters: 28, testament: 'NT' },
  { name: 'Romans', category: 'Epistles', chapters: 16, testament: 'NT' },
  { name: '1 Corinthians', category: 'Epistles', chapters: 16, testament: 'NT' },
  { name: '2 Corinthians', category: 'Epistles', chapters: 13, testament: 'NT' },
  { name: 'Galatians', category: 'Epistles', chapters: 6, testament: 'NT' },
  { name: 'Ephesians', category: 'Epistles', chapters: 6, testament: 'NT' },
  { name: 'Philippians', category: 'Epistles', chapters: 4, testament: 'NT' },
  { name: 'Colossians', category: 'Epistles', chapters: 4, testament: 'NT' },
  { name: '1 Thessalonians', category: 'Epistles', chapters: 5, testament: 'NT' },
  { name: '2 Thessalonians', category: 'Epistles', chapters: 3, testament: 'NT' },
  { name: '1 Timothy', category: 'Epistles', chapters: 6, testament: 'NT' },
  { name: '2 Timothy', category: 'Epistles', chapters: 4, testament: 'NT' },
  { name: 'Titus', category: 'Epistles', chapters: 3, testament: 'NT' },
  { name: 'Philemon', category: 'Epistles', chapters: 1, testament: 'NT' },
  { name: 'Hebrews', category: 'General Epistles', chapters: 13, testament: 'NT' },
  { name: 'James', category: 'General Epistles', chapters: 5, testament: 'NT' },
  { name: '1 Peter', category: 'General Epistles', chapters: 5, testament: 'NT' },
  { name: '2 Peter', category: 'General Epistles', chapters: 3, testament: 'NT' },
  { name: '1 John', category: 'General Epistles', chapters: 5, testament: 'NT' },
  { name: '2 John', category: 'General Epistles', chapters: 1, testament: 'NT' },
  { name: '3 John', category: 'General Epistles', chapters: 1, testament: 'NT' },
  { name: 'Jude', category: 'General Epistles', chapters: 1, testament: 'NT' },
  { name: 'Revelation', category: 'Revelation', chapters: 22, testament: 'NT' },
];

const CATEGORIES_OT = ['Law', 'History', 'Poetry', 'Major Prophets', 'Minor Prophets'];
const CATEGORIES_NT = ['Gospels', 'Acts', 'Epistles', 'General Epistles', 'Revelation'];

const ReadTab: React.FC = () => {
  // State
  const [currentBook, setCurrentBook] = useState<BibleBookDef>(BIBLE_BOOKS.find(b => b.name === 'John')!);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readingMode, setReadingMode] = useState<ReadingMode>('normal');
  const [fontSize, setFontSize] = useState(18);
  const [contextData, setContextData] = useState<BibleContext | null>(null);
  
  // UI Toggles
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [activeTestament, setActiveTestament] = useState<'OT' | 'NT'>('NT');
  const [selectedBookForNav, setSelectedBookForNav] = useState<BibleBookDef | null>(null);

  // Load Content
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setContextData(null); // Clear context on chapter change
      
      const [vData, cData] = await Promise.all([
        getBibleChapter(currentBook.name, currentChapter),
        showContext ? getChapterContext(currentBook.name, currentChapter) : Promise.resolve(null)
      ]);
      
      setVerses(vData);
      if (cData) setContextData(cData);
      
      setIsLoading(false);
    };
    loadContent();
  }, [currentBook, currentChapter, showContext]);

  // Handlers
  const handleChapterSelect = (chapter: number) => {
    if (selectedBookForNav) {
      setCurrentBook(selectedBookForNav);
      setCurrentChapter(chapter);
      setShowBookSelector(false);
      setSelectedBookForNav(null);
    }
  };

  const handleNext = () => {
    if (currentChapter < currentBook.chapters) {
      setCurrentChapter(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 1) {
      setCurrentChapter(c => c - 1);
    }
  };

  // --- Components ---

  // Book Selector Modal
  const BookSelector = () => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fadeIn">
      {/* Selector Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-200">
        <h2 className="text-lg font-serif font-bold text-stone-800">Select Passage</h2>
        <button onClick={() => setShowBookSelector(false)} className="p-2 text-stone-400 hover:text-stone-800">
          <X size={24} />
        </button>
      </div>

      {/* Book Nav / Chapter Grid */}
      <div className="flex-1 overflow-y-auto">
        {selectedBookForNav ? (
           // Chapter Grid
           <div className="p-6">
             <button 
               onClick={() => setSelectedBookForNav(null)}
               className="mb-6 flex items-center text-stone-500 hover:text-primary font-bold text-sm"
             >
               <ChevronLeft size={16} className="mr-1" /> Back to Books
             </button>
             <h3 className="text-2xl font-serif text-stone-800 mb-6 text-center">{selectedBookForNav.name}</h3>
             <div className="grid grid-cols-5 gap-4">
               {Array.from({ length: selectedBookForNav.chapters }, (_, i) => i + 1).map(chap => (
                 <button
                   key={chap}
                   onClick={() => handleChapterSelect(chap)}
                   className={`p-3 rounded-lg border text-sm font-bold transition-colors ${
                     currentBook.name === selectedBookForNav.name && currentChapter === chap
                       ? 'bg-primary text-white border-primary'
                       : 'bg-white border-stone-200 text-stone-600 hover:border-primary/50'
                   }`}
                 >
                   {chap}
                 </button>
               ))}
             </div>
           </div>
        ) : (
          // Book List
          <div className="pb-20">
            {/* Testament Toggle */}
            <div className="sticky top-0 bg-white z-10 flex border-b border-stone-200">
              <button 
                onClick={() => setActiveTestament('OT')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest ${activeTestament === 'OT' ? 'text-primary border-b-2 border-primary' : 'text-stone-400'}`}
              >
                Old Testament
              </button>
              <button 
                onClick={() => setActiveTestament('NT')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest ${activeTestament === 'NT' ? 'text-primary border-b-2 border-primary' : 'text-stone-400'}`}
              >
                New Testament
              </button>
            </div>

            {/* Book Categories */}
            <div className="p-4 space-y-6">
              {(activeTestament === 'OT' ? CATEGORIES_OT : CATEGORIES_NT).map(cat => (
                <div key={cat}>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-2">{cat}</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {BIBLE_BOOKS.filter(b => b.testament === activeTestament && b.category === cat).map(book => (
                      <button
                        key={book.name}
                        onClick={() => setSelectedBookForNav(book)}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 text-left group"
                      >
                        <span className="font-serif text-lg text-stone-700 group-hover:text-primary transition-colors">{book.name}</span>
                        <span className="text-xs text-stone-300 font-medium">{book.chapters} ch</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Settings Panel
  const SettingsPanel = () => (
    <div className="absolute top-16 right-4 w-64 bg-white rounded-xl shadow-xl border border-stone-200 z-30 p-4 animate-fadeIn">
      <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">Reading Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-700 mb-2 block">Text Size</label>
          <div className="flex items-center space-x-2 bg-stone-50 rounded-lg p-1">
             <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-2 hover:bg-white rounded shadow-sm text-stone-600 w-full">A-</button>
             <span className="text-xs text-stone-400">{fontSize}</span>
             <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 hover:bg-white rounded shadow-sm text-stone-600 w-full">A+</button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700 mb-2 block">View Mode</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'normal', label: 'Normal', icon: AlignLeft },
              { id: 'verse-by-verse', label: 'Verses', icon: List },
              { id: 'reader', label: 'Reader', icon: Type },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setReadingMode(mode.id as ReadingMode)}
                className={`flex items-center justify-center space-x-1 p-2 rounded-lg text-xs ${
                  readingMode === mode.id ? 'bg-primary text-white' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <mode.icon size={14} />
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Context Sidebar
  const ContextSidebar = () => (
    <div className={`
      fixed inset-y-0 right-0 w-80 bg-stone-50 border-l border-stone-200 shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto
      ${showContext ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif font-bold text-xl text-stone-800">Context</h3>
          <button onClick={() => setShowContext(false)} className="text-stone-400 hover:text-stone-800"><X size={20} /></button>
        </div>

        {contextData ? (
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Author & Setting</h4>
              <p className="text-sm text-stone-700 mb-2"><span className="font-bold">Author:</span> {contextData.author}</p>
              <p className="text-sm text-stone-700"><span className="font-bold">Setting:</span> {contextData.historicalSetting}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Purpose</h4>
              <p className="text-sm text-stone-600 italic leading-relaxed border-l-2 border-primary pl-3">
                {contextData.purpose}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Chapter Outline</h4>
              <ul className="space-y-2">
                {contextData.outline.map((point, i) => (
                  <li key={i} className="text-sm text-stone-700 flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Cross References</h4>
              <div className="flex flex-wrap gap-2">
                {contextData.crossReferences.map((ref, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-stone-200 rounded text-xs text-stone-500 font-medium">
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-stone-400">
             {isLoading ? <div className="animate-spin w-6 h-6 border-2 border-stone-300 border-t-primary rounded-full mx-auto"></div> : 'Load context to see details.'}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-[#fafaf9] relative fade-in">
      
      {/* 1. TOP HEADER */}
      <header className={`
        sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-stone-200 transition-all duration-300 px-4 py-3 flex items-center justify-between
      `}>
        {/* Book/Chapter Selector Trigger */}
        <button 
          onClick={() => setShowBookSelector(true)}
          className="flex items-center space-x-2 text-stone-800 hover:bg-stone-50 px-3 py-1.5 rounded-lg transition-colors group"
        >
          <span className="font-serif text-xl font-bold">{currentBook.name}</span>
          <span className="font-sans text-xl font-light text-stone-400">{currentChapter}</span>
          <span className="bg-stone-100 text-[10px] font-bold text-stone-500 px-1.5 py-0.5 rounded ml-2 group-hover:bg-primary group-hover:text-white transition-colors">ESV</span>
        </button>

        {/* Tools */}
        <div className="flex items-center space-x-1">
          <button 
             onClick={() => setShowContext(!showContext)}
             className={`p-2 rounded-full transition-colors ${showContext ? 'bg-primary/10 text-primary' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'}`}
             title="Context"
          >
            <Info size={20} />
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-primary/10 text-primary' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'}`}
          >
            <Settings2 size={20} />
          </button>
        </div>
      </header>

      {/* 2. OVERLAYS */}
      {showBookSelector && <BookSelector />}
      {showSettings && <SettingsPanel />}
      <ContextSidebar />

      {/* 3. MAIN READER AREA */}
      <div 
        className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scroll-smooth"
        onClick={() => setShowSettings(false)}
      >
        <div className={`max-w-2xl mx-auto transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          
          {/* Chapter Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-200">{currentChapter}</h2>
          </div>

          {/* Text Rendering */}
          <div className={`font-serif text-stone-800 ${readingMode === 'verse-by-verse' ? 'space-y-4' : 'space-y-6'}`} style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}>
            {verses.length > 0 ? verses.map((v) => (
              readingMode === 'verse-by-verse' ? (
                // Verse by Verse Mode
                <div key={v.verse} className="flex gap-4 p-2 hover:bg-stone-100 rounded-lg transition-colors group cursor-pointer">
                  <span className="text-xs font-bold text-stone-300 w-6 pt-1.5 font-sans shrink-0">{v.verse}</span>
                  <p className="text-stone-800">{v.text}</p>
                </div>
              ) : (
                // Normal / Reader Mode (Simulating Paragraphs)
                <span key={v.verse} className="inline hover:bg-yellow-50/50 transition-colors cursor-pointer rounded px-0.5 group relative">
                  <sup className={`
                     mr-1 font-sans text-stone-400 select-none
                     ${readingMode === 'reader' ? 'text-[10px] opacity-50' : 'text-xs font-bold'}
                  `}>{v.verse}</sup>
                  <span className={readingMode === 'reader' ? 'text-stone-700' : 'text-stone-800'}>
                    {v.text}{' '}
                  </span>
                </span>
              )
            )) : (
              !isLoading && <p className="text-center text-stone-400 italic">Scripture text unavailable.</p>
            )}
          </div>
          
          {/* Footer Navigation */}
          <div className="mt-20 flex justify-between items-center border-t border-stone-200 pt-8 pb-32">
             <button 
               onClick={handlePrev}
               disabled={currentChapter === 1}
               className="flex items-center text-stone-500 hover:text-primary disabled:opacity-30 disabled:hover:text-stone-500"
             >
               <ChevronLeft size={20} className="mr-2" /> Previous
             </button>
             <button 
               onClick={handleNext}
               disabled={currentChapter === currentBook.chapters}
               className="flex items-center text-stone-500 hover:text-primary disabled:opacity-30 disabled:hover:text-stone-500"
             >
               Next <ChevronRight size={20} className="ml-2" />
             </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReadTab;