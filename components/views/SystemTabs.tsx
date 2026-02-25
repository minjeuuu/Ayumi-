import React, { useState, useEffect } from 'react';
import { Search, User, Settings, Moon, Sun, Bell, Shield, Type, Languages, BookOpen, Volume2, Palette, Database, Star, ChevronRight, X, Copy, Download, Trash2, Award, Flame, Heart, PenLine, Music, Check, AlertCircle } from 'lucide-react';
import { callClaude } from '../../services/claudeService';

// ─────────────────────────────────────────────────────────
// SEARCH TAB
// ─────────────────────────────────────────────────────────
export const SearchTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<'bible' | 'topics' | 'all'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const addToRecent = (q: string) => {
    const updated = [q, ...recentSearches.filter(s => s !== q)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('ayumi_recent_searches', JSON.stringify(updated));
  };

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;
    setIsSearching(true);
    setResults([]);
    addToRecent(q);

    try {
      let prompt = '';
      if (searchType === 'bible' || searchType === 'all') {
        prompt = `Search the Bible for "${q}". Return 10 relevant verses. Include: reference, verse text (ESV), and why it's relevant. Format as JSON array: [{"reference":"John 3:16","text":"...","relevance":"...","book":"John","chapter":3,"verse":16,"type":"verse"}]`;
      } else {
        prompt = `Find biblical content about "${q}". Return 8 results as JSON: [{"title":"...","content":"...","type":"topic","reference":"..."}]`;
      }

      const text = await callClaude(prompt, 'Return ONLY a raw JSON array, no markdown, no explanation.');
      const m = text.match(/\[[\s\S]*?\]/);
      if (m) {
        try { setResults(JSON.parse(m[0])); } catch {}
      }
    } catch (e) {
      setResults([]);
    }
    setIsSearching(false);
  };

  const copyVerse = (item: any) => {
    navigator.clipboard.writeText(`"${item.text || item.content}" — ${item.reference || item.title}`);
  };

  const suggestedTopics = ['Grace', 'Faith', 'Love', 'Peace', 'Hope', 'Salvation', 'Prayer', 'Forgiveness', 'Joy', 'Trust', 'Healing', 'Courage'];

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="bg-white border-b border-stone-200 p-4">
        <h2 className="font-bold text-stone-800 mb-3 flex items-center space-x-2">
          <Search size={18} className="text-emerald-600" />
          <span>Search Scripture</span>
        </h2>
        <div className="relative mb-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search verses, topics, people..."
            className="w-full pl-4 pr-16 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
            autoFocus
          />
          {query && (
            <button onClick={() => { setQuery(''); setResults([]); }} className="absolute right-14 top-1/2 -translate-y-1/2 text-stone-300">
              <X size={16} />
            </button>
          )}
          <button onClick={() => handleSearch()} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-700 text-white text-xs rounded-lg font-bold hover:bg-emerald-600">
            {isSearching ? '...' : 'Go'}
          </button>
        </div>
        <div className="flex space-x-2">
          {(['all', 'bible', 'topics'] as const).map(t => (
            <button key={t} onClick={() => setSearchType(t)} className={`text-xs px-3 py-1.5 rounded-full capitalize ${searchType === t ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 p-4">
        {isSearching && (
          <div className="text-center py-12 text-stone-400">
            <div className="animate-spin w-8 h-8 border-2 border-stone-200 border-t-emerald-600 rounded-full mx-auto mb-3" />
            Searching scripture...
          </div>
        )}

        {results.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Results for "{query}"</h3>
            {results.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-100 shadow-sm p-4 mb-2">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700">{item.reference || item.title}</span>
                  <button onClick={() => copyVerse(item)} className="text-stone-300 hover:text-stone-600 transition-colors p-1">
                    <Copy size={14} />
                  </button>
                </div>
                <p className="text-sm text-stone-700 font-serif italic leading-relaxed">"{item.text || item.content}"</p>
                {item.relevance && <p className="text-xs text-stone-400 mt-2">{item.relevance}</p>}
              </div>
            ))}
          </div>
        )}

        {!isSearching && results.length === 0 && (
          <>
            {recentSearches.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Recent</h3>
                  <button onClick={() => { setRecentSearches([]); localStorage.removeItem('ayumi_recent_searches'); }} className="text-xs text-stone-400">Clear</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(s => (
                    <button key={s} onClick={() => { setQuery(s); handleSearch(s); }} className="text-sm px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-stone-600 hover:border-stone-400 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Explore Topics</h3>
              <div className="grid grid-cols-3 gap-2">
                {suggestedTopics.map(t => (
                  <button key={t} onClick={() => { setQuery(t); handleSearch(t); }} className="p-3 bg-white border border-stone-100 rounded-xl text-sm text-stone-700 hover:border-stone-300 hover:shadow-sm transition-all font-medium">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// PROFILE TAB
// ─────────────────────────────────────────────────────────
export const ProfileTab: React.FC = () => {
  const [hodouProgress, setHodouProgress] = useState<any>(null);
  const [journalCount, setJournalCount] = useState(0);
  const [highlightCount, setHighlightCount] = useState(0);
  const [userName, setUserName] = useState('Pilgrim');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const hodou = localStorage.getItem('ayumi_hodou_progress');
    if (hodou) setHodouProgress(JSON.parse(hodou));

    const journals = localStorage.getItem('ayumi_journal_entries');
    if (journals) setJournalCount(JSON.parse(journals).length);

    const highlights = localStorage.getItem('ayumi_highlights');
    if (highlights) setHighlightCount(JSON.parse(highlights).length);

    const name = localStorage.getItem('ayumi_user_name');
    if (name) setUserName(name);
  }, []);

  const saveName = () => {
    const name = tempName.trim() || 'Pilgrim';
    setUserName(name);
    localStorage.setItem('ayumi_user_name', name);
    setEditingName(false);
  };

  const xp = hodouProgress?.xp || 0;
  const level = hodouProgress?.level || 1;
  const streak = hodouProgress?.currentStreak || 0;
  const prayers = hodouProgress?.prayerSessions || 0;
  const versesRead = hodouProgress?.versesRead || 0;

  const LEVEL_NAMES: Record<number, string> = {
    1: 'Seeker', 2: 'Learner', 3: 'Disciple', 4: 'Servant',
    5: 'Faithful Walker', 6: 'Shepherd', 7: 'Pilgrim', 8: 'Elder',
    9: 'Apostle', 10: 'Saint'
  };
  const levelName = LEVEL_NAMES[level] || 'Seeker';

  const achievements = [
    { name: 'First Steps', icon: '👣', earned: xp >= 50 },
    { name: 'Prayer Warrior', icon: '🙏', earned: prayers >= 10 },
    { name: '7-Day Streak', icon: '🔥', earned: streak >= 7 },
    { name: 'Scripture Seeker', icon: '📖', earned: versesRead >= 10 },
    { name: 'Faithful Writer', icon: '✍️', earned: journalCount >= 5 },
    { name: 'Level 5', icon: '⭐', earned: level >= 5 },
    { name: 'Highlighting Heart', icon: '✨', earned: highlightCount >= 5 },
    { name: 'Saint', icon: '👑', earned: level >= 10 },
  ];

  const stats = [
    { label: 'Total XP', value: xp, icon: Star, color: 'text-yellow-500' },
    { label: 'Day Streak', value: streak, icon: Flame, color: 'text-orange-500' },
    { label: 'Prayers', value: prayers, icon: Heart, color: 'text-pink-500' },
    { label: 'Verses Read', value: versesRead, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Journal Entries', value: journalCount, icon: PenLine, color: 'text-green-500' },
    { label: 'Highlights', value: highlightCount, icon: Star, color: 'text-amber-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero */}
        <div className="bg-gradient-to-br from-stone-800 to-stone-700 text-white p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center text-stone-900 text-3xl font-bold shadow-xl">
            {userName.charAt(0).toUpperCase()}
          </div>
          {editingName ? (
            <div className="flex items-center justify-center space-x-2 mb-2">
              <input
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                className="bg-stone-700 text-white px-3 py-1 rounded-lg text-center text-lg font-bold border border-amber-400 focus:outline-none"
                autoFocus
                placeholder="Your name"
              />
              <button onClick={saveName} className="p-1 text-amber-400"><Check size={20} /></button>
              <button onClick={() => setEditingName(false)} className="p-1 text-stone-400"><X size={18} /></button>
            </div>
          ) : (
            <button onClick={() => { setTempName(userName); setEditingName(true); }} className="mb-1">
              <h2 className="text-2xl font-bold hover:text-amber-300 transition-colors">{userName}</h2>
            </button>
          )}
          <p className="text-stone-400 text-sm mb-2">Walking with God</p>
          <div className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-bold">
            Level {level} · {levelName}
          </div>
        </div>

        <div className="p-4">
          {/* Stats */}
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Your Journey</h3>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-stone-100 shadow-sm">
                <s.icon size={18} className={`mx-auto mb-1 ${s.color}`} />
                <div className="text-xl font-bold text-stone-800">{s.value}</div>
                <div className="text-xs text-stone-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Achievements</h3>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {achievements.map(a => (
              <div key={a.name} className={`p-3 rounded-xl text-center transition-all ${a.earned ? 'bg-amber-50 border-2 border-amber-300 shadow-sm' : 'bg-stone-100 opacity-40'}`}>
                <div className="text-2xl mb-1">{a.icon}</div>
                <p className="text-xs text-stone-700 font-medium leading-tight">{a.name}</p>
              </div>
            ))}
          </div>

          {/* Verse of the day */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200 p-4">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Memory Verse</p>
            <p className="text-sm text-stone-700 font-serif italic leading-relaxed">"For I am confident of this very thing, that He who began a good work in you will perfect it until the day of Christ Jesus."</p>
            <p className="text-xs text-emerald-600 mt-2 font-bold">— Philippians 1:6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SETTINGS TAB
// ─────────────────────────────────────────────────────────
interface AyumiSettings {
  theme: 'light' | 'dark' | 'sepia';
  notifications: boolean;
  notificationTime: string;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  bibleVersion: string;
  language: string;
  autoSave: boolean;
  soundEffects: boolean;
  animations: boolean;
  readingReminders: boolean;
  prayerReminders: boolean;
  defaultFont: string;
  verseNumbers: boolean;
  crossReferences: boolean;
  readingLevel: string;
}

const DEFAULTS: AyumiSettings = {
  theme: 'light',
  notifications: true,
  notificationTime: '07:00',
  fontSize: 'medium',
  bibleVersion: 'ESV',
  language: 'English',
  autoSave: true,
  soundEffects: false,
  animations: true,
  readingReminders: true,
  prayerReminders: true,
  defaultFont: 'Georgia',
  verseNumbers: true,
  crossReferences: true,
  readingLevel: 'adult',
};

export const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<AyumiSettings>(DEFAULTS);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('ayumi_settings');
    if (s) setSettings({ ...DEFAULTS, ...JSON.parse(s) });
  }, []);

  const update = (key: keyof AyumiSettings, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem('ayumi_settings', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearAllData = () => {
    const keys = ['ayumi_journal_entries', 'ayumi_highlights', 'ayumi_saved_items', 'ayumi_hodou_progress', 'ayumi_worship_favorites', 'ayumi_plans', 'ayumi_study_notes', 'ayumi_recent_searches', 'ayumi_home_dashboard_v2', 'ayumi_last_fetch_date'];
    keys.forEach(k => localStorage.removeItem(k));
    setShowClearConfirm(false);
  };

  const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-stone-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
    </label>
  );

  const Row: React.FC<{ icon: React.ReactNode; label: string; sub?: string; right: React.ReactNode }> = ({ icon, label, sub, right }) => (
    <div className="flex items-center p-4 border-b border-stone-50 last:border-0">
      <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-stone-700">{label}</p>
        {sub && <p className="text-xs text-stone-400">{sub}</p>}
      </div>
      <div className="flex-shrink-0">{right}</div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-serif text-stone-800">Settings</h2>
          {saved && (
            <div className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
              <Check size={14} /><span>Saved</span>
            </div>
          )}
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm mb-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider px-4 pt-3 pb-1">Appearance</p>
          <Row
            icon={settings.theme === 'dark' ? <Moon size={18} className="text-indigo-500" /> : settings.theme === 'sepia' ? <span className="text-amber-600 text-base">🟡</span> : <Sun size={18} className="text-amber-500" />}
            label="Theme"
            sub="App appearance"
            right={
              <div className="flex space-x-1">
                {(['light', 'dark', 'sepia'] as const).map(t => (
                  <button key={t} onClick={() => update('theme', t)} className={`px-2 py-1 text-xs rounded-lg capitalize transition-colors ${settings.theme === t ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-500'}`}>{t}</button>
                ))}
              </div>
            }
          />
          <Row
            icon={<Type size={18} className="text-stone-500" />}
            label="Font Size"
            sub="Reading comfort"
            right={
              <select value={settings.fontSize} onChange={e => update('fontSize', e.target.value)} className="text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Extra Large</option>
              </select>
            }
          />
          <Row
            icon={<Palette size={18} className="text-purple-500" />}
            label="Animations"
            sub="Visual transitions"
            right={<Toggle value={settings.animations} onChange={v => update('animations', v)} />}
          />
        </div>

        {/* Bible */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm mb-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider px-4 pt-3 pb-1">Bible Reading</p>
          <Row
            icon={<BookOpen size={18} className="text-blue-500" />}
            label="Default Version"
            sub="Your preferred translation"
            right={
              <select value={settings.bibleVersion} onChange={e => update('bibleVersion', e.target.value)} className="text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none">
                {['KJV', 'NKJV', 'ESV', 'NIV', 'NLT', 'NASB', 'CSB', 'AMP', 'MSG'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            }
          />
          <Row
            icon={<span className="text-stone-500 font-bold text-sm">#</span>}
            label="Verse Numbers"
            sub="Show verse numbers while reading"
            right={<Toggle value={settings.verseNumbers} onChange={v => update('verseNumbers', v)} />}
          />
          <Row
            icon={<ChevronRight size={18} className="text-stone-500" />}
            label="Cross References"
            sub="Show related verses"
            right={<Toggle value={settings.crossReferences} onChange={v => update('crossReferences', v)} />}
          />
          <Row
            icon={<span className="text-stone-500 text-sm font-serif">A</span>}
            label="AI Reading Level"
            sub="How AI explains verses"
            right={
              <select value={settings.readingLevel} onChange={e => update('readingLevel', e.target.value)} className="text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none">
                {['child', 'teen', 'adult', 'scholar'].map(l => <option key={l} value={l} className="capitalize">{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
              </select>
            }
          />
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm mb-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider px-4 pt-3 pb-1">Notifications</p>
          <Row
            icon={<Bell size={18} className="text-amber-500" />}
            label="Daily Reminders"
            sub="Morning devotional reminder"
            right={<Toggle value={settings.notifications} onChange={v => update('notifications', v)} />}
          />
          {settings.notifications && (
            <Row
              icon={<span className="text-stone-400 text-xs font-bold">⏰</span>}
              label="Reminder Time"
              sub="When to receive daily reminder"
              right={
                <input type="time" value={settings.notificationTime} onChange={e => update('notificationTime', e.target.value)} className="text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none" />
              }
            />
          )}
          <Row
            icon={<Heart size={18} className="text-pink-500" />}
            label="Prayer Reminders"
            sub="Regular prayer nudges"
            right={<Toggle value={settings.prayerReminders} onChange={v => update('prayerReminders', v)} />}
          />
        </div>

        {/* Language */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm mb-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider px-4 pt-3 pb-1">Language & Region</p>
          <Row
            icon={<Languages size={18} className="text-teal-500" />}
            label="App Language"
            sub="Interface language"
            right={
              <select value={settings.language} onChange={e => update('language', e.target.value)} className="text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none">
                {['English', 'Spanish', 'French', 'Japanese', 'Korean', 'Chinese', 'Portuguese', 'German'].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            }
          />
        </div>

        {/* Data */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm mb-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider px-4 pt-3 pb-1">Data & Storage</p>
          <Row
            icon={<Database size={18} className="text-stone-500" />}
            label="Auto-Save"
            sub="Automatically save content"
            right={<Toggle value={settings.autoSave} onChange={v => update('autoSave', v)} />}
          />
          <Row
            icon={<Shield size={18} className="text-green-500" />}
            label="Privacy"
            sub="All data stored locally on your device"
            right={<span className="text-xs text-green-600 font-bold">Local</span>}
          />
          <div className="p-4">
            {showClearConfirm ? (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-center space-x-2 mb-3 text-red-600">
                  <AlertCircle size={16} />
                  <p className="text-sm font-bold">Clear all data?</p>
                </div>
                <p className="text-xs text-red-500 mb-3">This will delete all your journal entries, highlights, progress, and saved content. This cannot be undone.</p>
                <div className="flex space-x-2">
                  <button onClick={clearAllData} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-500">Yes, Clear All</button>
                  <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2 bg-stone-200 text-stone-700 rounded-lg text-sm font-bold">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowClearConfirm(true)} className="w-full py-2 border-2 border-red-200 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
                <Trash2 size={15} /><span>Clear All Data</span>
              </button>
            )}
          </div>
        </div>

        {/* About */}
        <div className="text-center py-4 space-y-1">
          <p className="text-sm font-bold text-stone-700 font-serif">あゆみ · Ayumi</p>
          <p className="text-xs text-stone-400">Walking with God · Version 2.0.0</p>
          <p className="text-xs text-stone-400">Powered by Claude Sonnet (Anthropic)</p>
          <p className="text-xs text-stone-300 mt-2">All data stored locally on your device</p>
        </div>
      </div>
    </div>
  );
};
