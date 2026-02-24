import React, { useState, useEffect, useRef } from 'react';
import { PenLine, Plus, Trash2, ChevronLeft, Calendar, Tag, Save, X, Search, BookOpen } from 'lucide-react';

const BACKEND_URL = window.location.origin;
const STORAGE_KEY = 'ayumi_journal_entries';

interface JournalEntryData {
  id: string;
  date: string;
  title: string;
  text: string;
  tags: string[];
  linkedScripture?: string;
  mood?: string;
}

const JournalTab: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntryData[]>([]);
  const [view, setView] = useState<'list' | 'write' | 'read'>('list');
  const [currentEntry, setCurrentEntry] = useState<JournalEntryData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editMood, setEditMood] = useState('');
  const [editScripture, setEditScripture] = useState('');
  const [tagInput, setTagInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const moods = ['Grateful', 'Peaceful', 'Joyful', 'Reflective', 'Hopeful', 'Burdened', 'Seeking', 'Praising'];
  const quickTags = ['Prayer', 'Devotional', 'Insight', 'Testimony', 'Promise', 'Confession', 'Worship', 'Growth'];

  // Load entries from localStorage + backend
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    // Load from localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse journal entries');
      }
    }

    // Also try backend
    try {
      const res = await fetch(`${BACKEND_URL}/api/journal/entries`);
      if (res.ok) {
        const data = await res.json();
        if (data.entries && data.entries.length > 0) {
          setEntries(prev => {
            const merged = [...prev];
            data.entries.forEach((entry: JournalEntryData) => {
              if (!merged.find(e => e.id === entry.id)) {
                merged.push(entry);
              }
            });
            return merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          });
        }
      }
    } catch (e) {
      // Backend not available, use localStorage only
    }
  };

  const saveEntries = (updatedEntries: JournalEntryData[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  const startNewEntry = () => {
    setEditTitle('');
    setEditText('');
    setEditTags([]);
    setEditMood('');
    setEditScripture('');
    setCurrentEntry(null);
    setView('write');
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const editExistingEntry = (entry: JournalEntryData) => {
    setEditTitle(entry.title);
    setEditText(entry.text);
    setEditTags(entry.tags);
    setEditMood(entry.mood || '');
    setEditScripture(entry.linkedScripture || '');
    setCurrentEntry(entry);
    setView('write');
  };

  const saveEntry = async () => {
    if (!editText.trim() && !editTitle.trim()) return;

    setIsSaving(true);
    const entry: JournalEntryData = {
      id: currentEntry?.id || `j_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: currentEntry?.date || new Date().toISOString(),
      title: editTitle || `Journal Entry - ${new Date().toLocaleDateString()}`,
      text: editText,
      tags: editTags,
      linkedScripture: editScripture || undefined,
      mood: editMood || undefined,
    };

    let updated: JournalEntryData[];
    if (currentEntry) {
      updated = entries.map(e => e.id === currentEntry.id ? entry : e);
    } else {
      updated = [entry, ...entries];
    }

    saveEntries(updated);

    // Try to save to backend
    try {
      await fetch(`${BACKEND_URL}/api/journal/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (e) {
      // Backend save failed, localStorage is our backup
    }

    setIsSaving(false);
    setView('list');
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    saveEntries(updated);

    // Try backend delete
    try {
      fetch(`${BACKEND_URL}/api/journal/entries/${id}`, { method: 'DELETE' });
    } catch (e) {}

    if (view === 'write' || view === 'read') {
      setView('list');
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !editTags.includes(tag.trim())) {
      setEditTags([...editTags, tag.trim()]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setEditTags(editTags.filter(t => t !== tag));
  };

  const filteredEntries = searchQuery
    ? entries.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : entries;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  };

  // WRITE VIEW
  if (view === 'write') {
    return (
      <div className="pb-24 px-4 pt-4 fade-in flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setView('list')} className="flex items-center text-stone-500 hover:text-primary">
            <ChevronLeft size={20} className="mr-1" /> Back
          </button>
          <button
            onClick={saveEntry}
            disabled={isSaving || (!editText.trim() && !editTitle.trim())}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {isSaving ? (
              <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full mr-2"></div>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            Save
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Entry title..."
          className="text-xl font-serif font-bold text-stone-800 bg-transparent border-none focus:outline-none mb-2 w-full placeholder-stone-300"
        />

        {/* Date & Mood */}
        <div className="flex items-center gap-2 mb-4 text-xs text-stone-400">
          <Calendar size={14} />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Mood selector */}
        <div className="mb-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">How is your heart today?</p>
          <div className="flex flex-wrap gap-2">
            {moods.map(mood => (
              <button
                key={mood}
                onClick={() => setEditMood(editMood === mood ? '' : mood)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  editMood === mood
                    ? 'bg-primary text-white'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Scripture link */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={14} className="text-stone-400" />
            <input
              type="text"
              value={editScripture}
              onChange={(e) => setEditScripture(e.target.value)}
              placeholder="Link a scripture (e.g. Psalm 23:1)..."
              className="flex-1 text-sm bg-transparent border-none focus:outline-none text-stone-600 placeholder-stone-300"
            />
          </div>
        </div>

        {/* Main text area */}
        <textarea
          ref={textareaRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          placeholder="Pour out your heart before the Lord..."
          className="flex-1 min-h-[200px] w-full p-4 bg-white border border-stone-200 rounded-xl text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none font-serif leading-relaxed shadow-sm"
        />

        {/* Tags */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={14} className="text-stone-400" />
            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Tags</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {editTags.map(tag => (
              <span key={tag} className="flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500"><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { addTag(tagInput); e.preventDefault(); } }}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {quickTags.filter(t => !editTags.includes(t)).map(tag => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="px-2 py-1 text-xs text-stone-400 bg-stone-50 rounded hover:bg-stone-100 hover:text-stone-600"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">Journal</h1>
          <p className="text-sm text-stone-500">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</p>
        </div>
        <button
          onClick={startNewEntry}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} className="mr-2" /> New Entry
        </button>
      </div>

      {/* Quote */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-200 mb-6">
        <p className="text-stone-500 font-serif italic text-center text-sm">
          "Journaling is a way of listening to the life God has given you."
        </p>
      </div>

      {/* Search */}
      {entries.length > 0 && (
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search your journal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-stone-400" size={18} />
        </div>
      )}

      {/* Stats */}
      {entries.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-lg border border-stone-200 text-center">
            <div className="text-xl font-bold text-primary">{entries.length}</div>
            <div className="text-xs text-stone-500">Entries</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200 text-center">
            <div className="text-xl font-bold text-primary">
              {entries.filter(e => {
                const d = new Date(e.date);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <div className="text-xs text-stone-500">This Month</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200 text-center">
            <div className="text-xl font-bold text-primary">
              {entries.reduce((acc, e) => acc + e.text.split(/\s+/).length, 0)}
            </div>
            <div className="text-xs text-stone-500">Words</div>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 && entries.length === 0 ? (
          <div className="text-center py-12">
            <PenLine className="mx-auto mb-4 text-stone-300" size={48} />
            <p className="text-stone-500 font-serif mb-2">No journal entries yet</p>
            <p className="text-sm text-stone-400 mb-4">Start writing to capture your walk with God</p>
            <button
              onClick={startNewEntry}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            >
              Write Your First Entry
            </button>
          </div>
        ) : filteredEntries.length === 0 ? (
          <p className="text-center text-stone-400 py-8">No entries match your search</p>
        ) : (
          filteredEntries.map(entry => (
            <div
              key={entry.id}
              className="bg-white p-4 rounded-xl border border-stone-200 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => editExistingEntry(entry)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-stone-700 truncate">{entry.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                    <span>{formatDate(entry.date)}</span>
                    {entry.mood && <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">{entry.mood}</span>}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteEntry(entry.id); }}
                  className="p-1.5 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-sm text-stone-600 line-clamp-2 font-serif">{entry.text}</p>
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              )}
              {entry.linkedScripture && (
                <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                  <BookOpen size={12} /> {entry.linkedScripture}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalTab;
