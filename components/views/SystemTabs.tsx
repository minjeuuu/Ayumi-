import React, { useState, useEffect } from 'react';
import { Search, User, Settings, Moon, Sun, Bell, Shield, Type, Languages, BookOpen, Volume2, Palette, Database, Coffee } from 'lucide-react';

const BACKEND_URL = window.location.origin;

export const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/worship/search/${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (e) {
      console.error('Search error:', e);
    } finally {
      setSearching(false);
    }
  };

  const recentSearches = ['Love', 'Romans 8', 'David', 'Grace', 'Hope'];
  const suggestedTopics = ['Salvation', 'Faith', 'Prayer', 'Peace', 'Joy', 'Forgiveness'];

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search scripture, songs, devotionals..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search className="absolute left-3 top-3.5 text-stone-400" size={20} />
        {searching && <div className="absolute right-3 top-3.5 animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>}
      </div>

      {searchResults.length > 0 && (
        <div className="mb-6">
          <h3 className="font-serif font-bold text-stone-700 mb-3">Results</h3>
          <div className="space-y-2">
            {searchResults.map((result, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 hover:border-primary/50 cursor-pointer">
                <h4 className="font-serif font-bold text-stone-700">{result.title}</h4>
                <p className="text-sm text-stone-500 mt-1">{result.artist_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">Recent Searches</h3>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map(term => (
            <button 
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-stone-600 hover:border-primary hover:text-primary text-sm"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">Suggested Topics</h3>
        <div className="grid grid-cols-2 gap-2">
          {suggestedTopics.map(topic => (
            <div key={topic} className="bg-gradient-to-br from-primary/5 to-primary/10 p-3 rounded-xl border border-primary/20 text-center cursor-pointer hover:shadow-md transition-all">
              <BookOpen size={20} className="mx-auto mb-2 text-primary" />
              <p className="font-serif text-sm text-stone-700">{topic}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProfileTab = () => {
  const [stats, setStats] = useState({
    dayStreak: 12,
    totalPrayers: 48,
    versesRead: 287,
    journalEntries: 15,
    devotionsCompleted: 23,
    studyHours: 18
  });

  const achievements = [
    { name: '7 Day Streak', icon: Coffee, earned: true },
    { name: '100 Verses', icon: BookOpen, earned: true },
    { name: '50 Prayers', icon: Shield, earned: false },
    { name: '30 Day Journey', icon: Moon, earned: false },
  ];

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border border-primary/20 text-center mb-6">
        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-primary shadow-lg">
          <User size={32} />
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-800">Pilgrim</h2>
        <p className="text-sm text-stone-600">Walking with God since 2024</p>
        <div className="mt-4 inline-block px-4 py-1 bg-primary/20 rounded-full text-primary text-xs font-bold">
          Level 5 - Devoted Seeker
        </div>
      </div>
    
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 text-center">
          <div className="text-2xl font-bold text-primary">{stats.dayStreak}</div>
          <div className="text-xs text-stone-500 mt-1">Day Streak</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalPrayers}</div>
          <div className="text-xs text-stone-500 mt-1">Prayers</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 text-center">
          <div className="text-2xl font-bold text-primary">{stats.versesRead}</div>
          <div className="text-xs text-stone-500 mt-1">Verses</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-stone-50 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-stone-700">{stats.journalEntries}</div>
          <div className="text-xs text-stone-500">Journals</div>
        </div>
        <div className="bg-stone-50 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-stone-700">{stats.devotionsCompleted}</div>
          <div className="text-xs text-stone-500">Devotions</div>
        </div>
        <div className="bg-stone-50 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-stone-700">{stats.studyHours}h</div>
          <div className="text-xs text-stone-500">Study Time</div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <h3 className="font-serif font-bold text-stone-700 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map(ach => (
            <div key={ach.name} className={`p-3 rounded-lg text-center ${ach.earned ? 'bg-primary/10 border-2 border-primary/30' : 'bg-stone-50 opacity-50'}`}>
              <ach.icon size={24} className={`mx-auto mb-2 ${ach.earned ? 'text-primary' : 'text-stone-400'}`} />
              <p className="text-xs font-bold text-stone-700">{ach.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SettingsTab = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    notificationTime: '07:00',
    fontSize: 'medium',
    bibleVersion: 'ESV',
    language: 'English',
    autoSave: true,
    offlineMode: false,
    readingReminders: true,
    prayerReminders: true,
    soundEffects: true,
    animations: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
    localStorage.setItem('ayumi_settings', JSON.stringify({ ...settings, [key]: value }));
  };

  return (
    <div className="pb-24 px-4 pt-6 fade-in space-y-4">
      <h1 className="text-2xl font-serif text-stone-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg">
                {settings.theme === 'light' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
              </div>
              <div>
                <p className="font-medium text-stone-700">Appearance</p>
                <p className="text-xs text-stone-400">Theme preference</p>
              </div>
            </div>
            <select 
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value)}
              className="px-3 py-1 border border-stone-200 rounded-lg text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><Bell size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Notifications</p>
                <p className="text-xs text-stone-400">Daily reminder at {settings.notificationTime}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.notifications}
                onChange={(e) => updateSetting('notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><Type size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Font Size</p>
                <p className="text-xs text-stone-400">Reading comfort</p>
              </div>
            </div>
            <select 
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value)}
              className="px-3 py-1 border border-stone-200 rounded-lg text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><BookOpen size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Default Bible Version</p>
                <p className="text-xs text-stone-400">Your preferred translation</p>
              </div>
            </div>
            <select 
              value={settings.bibleVersion}
              onChange={(e) => updateSetting('bibleVersion', e.target.value)}
              className="px-3 py-1 border border-stone-200 rounded-lg text-sm"
            >
              <option value="ESV">ESV</option>
              <option value="NIV">NIV</option>
              <option value="KJV">KJV</option>
              <option value="NKJV">NKJV</option>
              <option value="NLT">NLT</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><Languages size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Language</p>
                <p className="text-xs text-stone-400">App language</p>
              </div>
            </div>
            <select 
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="px-3 py-1 border border-stone-200 rounded-lg text-sm"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><Volume2 size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Sound Effects</p>
                <p className="text-xs text-stone-400">Audio feedback</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.soundEffects}
                onChange={(e) => updateSetting('soundEffects', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><Palette size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Animations</p>
                <p className="text-xs text-stone-400">Visual transitions</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.animations}
                onChange={(e) => updateSetting('animations', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><Database size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Auto-Save</p>
                <p className="text-xs text-stone-400">Automatic content saving</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.autoSave}
                onChange={(e) => updateSetting('autoSave', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><Shield size={20} /></div>
              <div>
                <p className="font-medium text-stone-700">Privacy</p>
                <p className="text-xs text-stone-400">All data stored locally</p>
              </div>
            </div>
            <span className="text-xs text-green-600 font-bold">Secure</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-stone-200 text-center space-y-2">
        <p className="text-xs text-stone-400 font-serif">Ayumi - Walking with God</p>
        <p className="text-xs text-stone-400">Version 2.0.0</p>
        <p className="text-xs text-stone-400">Powered by Claude Sonnet</p>
      </div>
    </div>
  );
};
