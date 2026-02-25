import React, { useState, useEffect } from 'react';
import {
  Search, Settings, BookOpen, Highlighter, PenLine, Bookmark,
  ChevronRight, Check, Palette, Eye, Star, Award, Edit3,
  X, Loader, BookMarked, AlignLeft, Accessibility
} from 'lucide-react';
import { callClaude } from '../../services/claudeService';
import { COMPREHENSIVE_BIBLE_VERSIONS, FONT_FAMILIES } from '../../constants';
import { AppSettings } from '../../types';

const SETTINGS_KEY = 'ayumi_app_settings';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  fontSize: 16,
  fontFamily: 'Georgia',
  defaultBibleVersion: 'KJV',
  language: 'en',
  animationsEnabled: true,
  footstepAnimation: true,
  showVerseNumbers: true,
  dyslexiaFriendly: false,
  highContrast: false,
  largeText: false,
};

// ─────────────────────────────────────────────────────────
// SEARCH TAB
// ─────────────────────────────────────────────────────────
export const SearchTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ reference: string; text: string; relevance?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<'verse' | 'topic' | 'word'>('topic');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveSearch = (q: string) => {
    const updated = [q, ...recentSearches.filter(s => s !== q)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('ayumi_recent_searches', JSON.stringify(updated));
  };

  const doSearch = async (q: string = query) => {
    if (!q.trim()) return;
    setIsLoading(true);
    setResults([]);
    saveSearch(q);
    try {
      const prompt = searchType === 'verse'
        ? `Search the Bible for verses matching: "${q}". Return 8 relevant verses. For each: REFERENCE: [ref]\nTEXT: [full verse text]\n---`
        : searchType === 'topic'
        ? `Find 8 Bible verses about: "${q}". Mix Old and New Testament. For each: REFERENCE: [ref]\nTEXT: [full verse text]\nWHY: [one sentence relevance]\n---`
        : `Find 8 Bible verses containing "${q}". For each: REFERENCE: [ref]\nTEXT: [full verse text]\n---`;

      const response = await callClaude(prompt);
      const blocks = response.split('---').filter(b => b.trim());
      const parsed = blocks.map(block => {
        const refMatch = block.match(/REFERENCE:\s*(.+)/);
        const textMatch = block.match(/TEXT:\s*([\s\S]+?)(?=WHY:|REFERENCE:|$)/);
        const whyMatch = block.match(/WHY:\s*(.+)/);
        return {
          reference: refMatch?.[1]?.trim() || '',
          text: textMatch?.[1]?.trim() || '',
          relevance: whyMatch?.[1]?.trim(),
        };
      }).filter(r => r.reference && r.text);
      setResults(parsed);
    } catch {
      setResults([{ reference: 'Error', text: 'Search failed. Please try again.' }]);
    }
    setIsLoading(false);
  };

  const copyVerse = (r: { reference: string; text: string }) => {
    navigator.clipboard.writeText(`"${r.text}" — ${r.reference}`);
    setCopiedId(r.reference);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const POPULAR_TOPICS = ['Faith', 'Peace', 'Love', 'Hope', 'Strength', 'Forgiveness', 'Joy', 'Wisdom', 'Healing', 'Purpose', 'Anxiety', 'Trust'];

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="bg-white border-b border-stone-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Search size={18} className="text-stone-500" />
          <h2 className="font-bold text-stone-800">Bible Search</h2>
        </div>
        <div className="flex space-x-1 mb-3">
          {(['topic', 'verse', 'word'] as const).map(t => (
            <button key={t} onClick={() => setSearchType(t)}
              className={`flex-1 py-1.5 text-xs rounded-lg transition-colors capitalize ${searchType === t ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'}`}
            >{t}</button>
          ))}
        </div>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
              placeholder={searchType === 'topic' ? 'e.g. forgiveness, anxiety...' : searchType === 'verse' ? 'e.g. John 3:16 or "do not fear"' : 'e.g. grace, shepherd...'}
              className="w-full pl-9 pr-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
          <button onClick={() => doSearch()} disabled={isLoading || !query.trim()}
            className="px-4 py-2 bg-stone-800 text-white text-sm rounded-lg disabled:opacity-40 flex items-center">
            {isLoading ? <Loader size={14} className="animate-spin" /> : 'Go'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {results.length === 0 && !isLoading && (
          <div>
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Recent</p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(s => (
                    <button key={s} onClick={() => { setQuery(s); doSearch(s); }}
                      className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full hover:bg-stone-200 transition-colors">{s}</button>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Popular Topics</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOPICS.map(t => (
                <button key={t} onClick={() => { setQuery(t); setSearchType('topic'); doSearch(t); }}
                  className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors">{t}</button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <Loader size={24} className="animate-spin mx-auto text-stone-400 mb-3" />
            <p className="text-sm text-stone-400">Searching the Scriptures...</p>
          </div>
        )}

        {results.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-100 shadow-sm p-4 mb-3">
            <p className="text-xs font-bold text-emerald-700 mb-2">{r.reference}</p>
            <p className="text-sm text-stone-700 leading-relaxed font-serif">{r.text}</p>
            {r.relevance && <p className="text-xs text-stone-400 mt-2 italic">{r.relevance}</p>}
            <div className="flex space-x-3 mt-3 pt-2 border-t border-stone-50">
              <button onClick={() => copyVerse(r)} className="flex items-center space-x-1 text-xs text-stone-400 hover:text-stone-600 transition-colors">
                {copiedId === r.reference ? <Check size={12} className="text-green-500" /> : <BookMarked size={12} />}
                <span>{copiedId === r.reference ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// PROFILE TAB
// ─────────────────────────────────────────────────────────
export const ProfileTab: React.FC = () => {
  const [name, setName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_profile_name');
    if (saved) setName(saved);
  }, []);

  const saveName = () => {
    setName(tempName);
    localStorage.setItem('ayumi_profile_name', tempName);
    setEditingName(false);
  };

  const highlights = JSON.parse(localStorage.getItem('ayumi_highlights') || '[]').length;
  const journalEntries = JSON.parse(localStorage.getItem('ayumi_journal') || '[]').length;
  const bookmarks = JSON.parse(localStorage.getItem('ayumi_bookmarks') || '[]').length;
  const hodou = JSON.parse(localStorage.getItem('ayumi_hodou_progress') || '{}');
  const studyNotes = JSON.parse(localStorage.getItem('ayumi_study_notes') || '[]').length;

  const stats = [
    { label: 'Journal', value: journalEntries, icon: PenLine, color: '#60a5fa' },
    { label: 'Highlights', value: highlights, icon: Highlighter, color: '#fbbf24' },
    { label: 'Bookmarks', value: bookmarks, icon: Bookmark, color: '#34d399' },
    { label: 'Notes', value: studyNotes, icon: BookOpen, color: '#a78bfa' },
    { label: 'Level', value: hodou.level || 1, icon: Award, color: '#fb923c' },
    { label: 'XP', value: hodou.xp || 0, icon: Star, color: '#f472b6' },
  ];

  const clearAllData = () => {
    if (window.confirm('Clear ALL app data? This cannot be undone.')) {
      Object.keys(localStorage).filter(k => k.startsWith('ayumi_')).forEach(k => localStorage.removeItem(k));
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="bg-gradient-to-b from-stone-800 to-stone-700 text-white p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-stone-600 border-2 border-stone-400 flex items-center justify-center mx-auto mb-4 text-3xl">🙏</div>
          {editingName ? (
            <div className="flex items-center justify-center space-x-2">
              <input value={tempName} onChange={e => setTempName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                className="bg-stone-600 text-white text-center rounded-lg px-3 py-1 text-sm border border-stone-500 focus:outline-none"
                placeholder="Your name" autoFocus />
              <button onClick={saveName} className="text-green-400"><Check size={16} /></button>
              <button onClick={() => setEditingName(false)} className="text-stone-400"><X size={16} /></button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <h2 className="text-lg font-bold">{name || 'Pilgrim'}</h2>
              <button onClick={() => { setTempName(name); setEditingName(true); }} className="text-stone-400 hover:text-white">
                <Edit3 size={14} />
              </button>
            </div>
          )}
          <p className="text-stone-400 text-xs mt-1">Walking with God · あゆみ</p>
          <div className="mt-3 inline-flex items-center space-x-1 bg-stone-600/50 px-3 py-1 rounded-full">
            <Star size={12} className="text-yellow-400" />
            <span className="text-xs text-stone-300">Level {hodou.level || 1} · {hodou.xp || 0} XP</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xs text-stone-400 uppercase tracking-wider mb-3">Journey Stats</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-stone-100 p-3 text-center shadow-sm">
                <stat.icon size={18} className="mx-auto mb-1" style={{ color: stat.color }} />
                <div className="text-xl font-bold text-stone-800">{stat.value}</div>
                <div className="text-xs text-stone-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden mb-3">
            <div className="p-4 border-b border-stone-50">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">App Info</p>
            </div>
            {[
              { label: 'Version', value: '2.0.0' },
              { label: 'AI Model', value: 'Claude 4' },
              { label: 'Bible Versions', value: '100+' },
              { label: 'Worship Artists', value: '50+' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between px-4 py-3 border-b border-stone-50 last:border-0">
                <span className="text-sm text-stone-600">{item.label}</span>
                <span className="text-sm text-stone-400">{item.value}</span>
              </div>
            ))}
          </div>

          <button onClick={clearAllData}
            className="w-full bg-red-50 text-red-500 border border-red-100 rounded-xl p-4 text-sm font-medium hover:bg-red-100 transition-colors">
            Clear All App Data
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SETTINGS TAB
// ─────────────────────────────────────────────────────────
export const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [activeSection, setActiveSection] = useState<string | null>('appearance');

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try { setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) }); } catch {}
    }
  }, []);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  };

  const Section: React.FC<{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ id, title, icon, children }) => (
    <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden mb-3">
      <button onClick={() => setActiveSection(activeSection === id ? null : id)}
        className="w-full flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="text-stone-500">{icon}</div>
          <span className="font-medium text-stone-800 text-sm">{title}</span>
        </div>
        <ChevronRight size={16} className={`text-stone-400 transition-transform duration-200 ${activeSection === id ? 'rotate-90' : ''}`} />
      </button>
      {activeSection === id && <div className="border-t border-stone-50 p-4 space-y-4">{children}</div>}
    </div>
  );

  const Toggle: React.FC<{ label: string; value: boolean; onChange: (v: boolean) => void; description?: string }> = ({ label, value, onChange, description }) => (
    <div className="flex items-center justify-between">
      <div className="flex-1 pr-4">
        <p className="text-sm text-stone-700">{label}</p>
        {description && <p className="text-xs text-stone-400 mt-0.5">{description}</p>}
      </div>
      <button onClick={() => onChange(!value)}
        className={`flex-shrink-0 w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-emerald-500' : 'bg-stone-200'}`}>
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  const THEMES = [
    { id: 'light' as const, label: 'Light', bg: '#ffffff', dot: '#1c1917' },
    { id: 'dark' as const, label: 'Dark', bg: '#1c1917', dot: '#fafaf9' },
    { id: 'sepia' as const, label: 'Sepia', bg: '#fdf6e3', dot: '#5c4b3b' },
    { id: 'forest' as const, label: 'Forest', bg: '#f0fdf4', dot: '#14532d' },
    { id: 'ocean' as const, label: 'Ocean', bg: '#eff6ff', dot: '#1e3a5f' },
  ];

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="bg-white border-b border-stone-200 p-4">
        <div className="flex items-center space-x-2">
          <Settings size={18} className="text-stone-500" />
          <h2 className="font-bold text-stone-800">Settings</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <Section id="appearance" title="Appearance" icon={<Palette size={18} />}>
          <div>
            <p className="text-xs text-stone-400 mb-2 uppercase tracking-wider">Theme</p>
            <div className="grid grid-cols-5 gap-2">
              {THEMES.map(t => (
                <button key={t.id} onClick={() => updateSetting('theme', t.id)}
                  className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${settings.theme === t.id ? 'border-emerald-500' : 'border-stone-100'}`}
                  style={{ backgroundColor: t.bg }}>
                  <div className="w-4 h-4 rounded-full mb-1" style={{ backgroundColor: t.dot }} />
                  <span className="text-xs" style={{ color: t.dot }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-2 uppercase tracking-wider">Font Size: {settings.fontSize}px</p>
            <input type="range" min={12} max={24} value={settings.fontSize}
              onChange={e => updateSetting('fontSize', Number(e.target.value))}
              className="w-full accent-emerald-500" />
            <div className="flex justify-between text-xs text-stone-400 mt-1"><span>Small</span><span>Large</span></div>
          </div>
          <div>
            <p className="text-xs text-stone-400 mb-2 uppercase tracking-wider">Font Family</p>
            <select value={settings.fontFamily} onChange={e => updateSetting('fontFamily', e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-stone-400">
              {FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </Section>

        <Section id="bible" title="Bible & Reading" icon={<BookOpen size={18} />}>
          <div>
            <p className="text-xs text-stone-400 mb-2 uppercase tracking-wider">Default Bible Version</p>
            <select value={settings.defaultBibleVersion} onChange={e => updateSetting('defaultBibleVersion', e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-stone-400">
              {COMPREHENSIVE_BIBLE_VERSIONS.map(v => (
                <option key={v.id} value={v.id}>{v.abbreviation} — {v.name}</option>
              ))}
            </select>
          </div>
          <Toggle label="Show Verse Numbers" value={settings.showVerseNumbers} onChange={v => updateSetting('showVerseNumbers', v)} />
        </Section>

        <Section id="accessibility" title="Accessibility" icon={<Accessibility size={18} />}>
          <Toggle label="Dyslexia-Friendly Font" value={settings.dyslexiaFriendly} onChange={v => updateSetting('dyslexiaFriendly', v)}
            description="Uses OpenDyslexic font for easier reading" />
          <Toggle label="High Contrast" value={settings.highContrast} onChange={v => updateSetting('highContrast', v)}
            description="Increases contrast for better visibility" />
          <Toggle label="Large Text Mode" value={settings.largeText} onChange={v => updateSetting('largeText', v)} />
        </Section>

        <Section id="animations" title="Animations & Effects" icon={<Eye size={18} />}>
          <Toggle label="Enable Animations" value={settings.animationsEnabled} onChange={v => updateSetting('animationsEnabled', v)} />
          <Toggle label="Footstep Animation" value={settings.footstepAnimation} onChange={v => updateSetting('footstepAnimation', v)}
            description="Footsteps appear as you walk with God" />
        </Section>

        <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-5 text-center">
          <div className="text-3xl mb-2">🐾</div>
          <h3 className="font-bold text-stone-800">あゆみ · Ayumi</h3>
          <p className="text-xs text-stone-400 mt-1">Walking with God</p>
          <p className="text-xs text-stone-300 mt-3">Version 2.0.0 · Powered by Claude AI</p>
          <p className="text-xs text-stone-300">Built with love for God's people 🙏</p>
        </div>
      </div>
    </div>
  );
};
