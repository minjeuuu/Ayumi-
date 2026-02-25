import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import { HomeDashboardContent, AppState, Tab } from './types';
import { generateHomeDashboard } from './services/geminiService';
import { FALLBACK_DEVOTIONAL } from './constants';

// Views
import HomeTab from './components/views/HomeTab';
import ReadTab from './components/views/ReadTab';
import DevotionalTab from './components/views/DevotionalTab';
import PrayerTab from './components/views/PrayerTab';
import JournalTab from './components/views/JournalTab';
import WorshipMusicTab from './components/views/WorshipMusicTab';
import VerseImageTab from './components/views/VerseImageTab';
import HighlightsTab from './components/views/HighlightsTab';
import HodouTab from './components/views/HodouTab';
import { StudyTab, PlansTab, TopicsTab, SavedTab } from './components/views/LibraryTabs';
import { SearchTab, ProfileTab, SettingsTab } from './components/views/SystemTabs';

const STORAGE_KEY_CONTENT = 'ayumi_home_dashboard_v2';
const STORAGE_KEY_DATE = 'ayumi_last_fetch_date';

const INSTANT_FALLBACK: HomeDashboardContent = {
  date: new Date().toISOString(),
  verse: {
    text: "For we walk by faith, not by sight.",
    reference: "2 Corinthians 5:7",
    context: "Paul encourages believers to live by faith.",
    crossReferences: ["Hebrews 11:1", "Romans 8:24"],
    gospelConnection: "Our faith is anchored in the finished work of Christ."
  },
  passage: {
    reference: "Psalm 23",
    text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul. He leads me in paths of righteousness for his name's sake. Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me. You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows. Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the Lord forever.",
    outline: ["The Shepherd's Provision", "The Shepherd's Protection", "The Shepherd's Presence"],
    author: "David",
    historicalSetting: "Written from David's experience as a shepherd and king."
  },
  devotional: {
    title: "The Steady Walk",
    scriptureQuote: "For we walk by faith, not by sight.",
    shortReflection: "Our journey with Christ is often less about the destination and more about the daily rhythm of trust.",
    longReflection: "Our journey with Christ is often less about the destination and more about the daily rhythm of trust. Each step we take in faith draws us closer to His heart, and closer to the people He has placed in our path. Walking by faith means trusting God even when the way ahead is unclear, knowing that His plans are perfect and His timing is sure.",
    application: "Take a 10-minute prayer walk today, asking God to guide your steps.",
    prayerGuide: "Lord, help me to walk by faith today. Guide my steps and keep my eyes on You."
  },
  questions: {
    heartCheck: "Is my heart at rest in God today?",
    beliefCheck: "Do I believe God is sufficient for every need?",
    obedienceCheck: "What step of obedience is the Spirit calling me to?"
  },
  prayer: {
    focusTheme: "Trust and Surrender",
    scripture: "Proverbs 3:5-6",
    guidedPrayer: "Lord, I choose to trust You with all my heart. Direct my paths today."
  },
  theme: {
    theme: "God's Faithfulness",
    keyVerse: "Great is Your faithfulness. - Lamentations 3:23",
    supportingVerses: ["Psalm 89:1", "1 Thessalonians 5:24"]
  },
  attribute: {
    attribute: "Immutable",
    definition: "God is unchanging in His character and promises.",
    scriptureProof: "I the Lord do not change. - Malachi 3:6",
    worshipResponse: "I praise You for being my unchanging Rock."
  },
  gospel: {
    truth: "Christ died for the ungodly",
    reference: "Romans 5:6-8",
    explanation: "While we were still sinners, Christ died for us."
  },
  history: {
    event: "David Anointed as King",
    reference: "1 Samuel 16",
    description: "God sends Samuel to anoint David as the future king.",
    timeline: {
      before: "Saul rejected by God",
      during: "Samuel anoints David",
      after: "David begins his journey to the throne"
    }
  }
};

const App: React.FC = () => {
  const [content, setContent] = useState<HomeDashboardContent | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [theme, setTheme] = useState<string>('light');

  // Load theme from settings
  useEffect(() => {
    const loadTheme = () => {
      const settings = localStorage.getItem('ayumi_app_settings');
      if (settings) {
        try { const p = JSON.parse(settings); if (p.theme) setTheme(p.theme); } catch {}
      }
    };
    loadTheme();
    window.addEventListener('storage', loadTheme);
    return () => window.removeEventListener('storage', loadTheme);
  }, []);

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const loadDailyContent = useCallback(async (forceRefresh = false) => {
    const today = getTodayString();
    try {
      const cachedContent = localStorage.getItem(STORAGE_KEY_CONTENT);
      const lastDate = localStorage.getItem(STORAGE_KEY_DATE);
      if (!forceRefresh && cachedContent && lastDate === today) {
        setContent(JSON.parse(cachedContent));
        setAppState(AppState.READY);
        return;
      }
      if (!content) { setContent(INSTANT_FALLBACK); setAppState(AppState.READY); }
      const newContent = await generateHomeDashboard();
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(newContent));
      localStorage.setItem(STORAGE_KEY_DATE, today);
      setContent(newContent);
      setAppState(AppState.READY);
    } catch (error) {
      console.error("Failed to load dashboard", error);
      if (!content) { setContent(INSTANT_FALLBACK); setAppState(AppState.READY); }
    }
  }, []);

  useEffect(() => { loadDailyContent(); }, []);

  useEffect(() => {
    if (appState === AppState.LOADING) {
      const timer = setTimeout(() => {
        setContent(INSTANT_FALLBACK);
        setAppState(AppState.READY);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME: return <HomeTab content={content} onNavigate={setActiveTab} />;
      case Tab.READ: return <ReadTab />;
      case Tab.DEVOTIONAL:
        return <DevotionalTab initialContent={content ? {
          title: content.devotional.title,
          scripture: { text: content.devotional.scriptureQuote, reference: "Daily Verse" },
          reflection: content.devotional.longReflection,
          prayer: content.devotional.prayerGuide,
          stepOfFaith: content.devotional.application,
          tags: []
        } : null} />;
      case Tab.PRAYER: return <PrayerTab />;
      case Tab.JOURNAL: return <JournalTab />;
      case Tab.WORSHIP: return <WorshipMusicTab />;
      case Tab.STUDY: return <StudyTab />;
      case Tab.PLANS: return <PlansTab />;
      case Tab.TOPICS: return <TopicsTab />;
      case Tab.SEARCH: return <SearchTab />;
      case Tab.HIGHLIGHTS: return <HighlightsTab />;
      case Tab.VERSE_IMAGE: return <VerseImageTab />;
      case Tab.HODOU: return <HodouTab />;
      case Tab.SAVED: return <SavedTab />;
      case Tab.PROFILE: return <ProfileTab />;
      case Tab.SETTINGS: return <SettingsTab />;
      default: return <HomeTab content={content} onNavigate={setActiveTab} />;
    }
  };

  // Theme classes
  const themeBg = theme === 'dark'    ? 'bg-stone-900 text-stone-100'
               : theme === 'sepia'   ? 'bg-amber-100 text-stone-800'
               : theme === 'forest'  ? 'bg-green-50 text-stone-800'
               : theme === 'ocean'   ? 'bg-sky-50 text-stone-800'
               : theme === 'midnight'? 'bg-slate-950 text-slate-100'
               :                       'bg-stone-100 text-stone-900';

  const cardBg = theme === 'dark'    ? 'bg-stone-950 border-stone-800'
              : theme === 'sepia'   ? 'bg-amber-50 border-amber-200'
              : theme === 'forest'  ? 'bg-green-50 border-green-200'
              : theme === 'ocean'   ? 'bg-sky-50 border-sky-100'
              : theme === 'midnight'? 'bg-slate-900 border-slate-800'
              :                       'bg-white border-stone-200';

  if (appState === AppState.LOADING) return <LoadingScreen />;

  return (
    <div className={`min-h-screen ${themeBg} font-sans`}>
      {/* ── DESKTOP SIDEBAR ── shifted content right by sidebar width */}
      <div className="hidden md:block">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} theme={theme} />
      </div>

      {/* ── MAIN LAYOUT ─────────────────────────────── */}
      <div className="md:pl-20 min-h-screen flex justify-center">
        {/* The beautiful centered card */}
        <div className={`w-full max-w-2xl ${cardBg} border-l border-r min-h-screen flex flex-col shadow-xl`}>

          {/* Header — only on Home */}
          {activeTab === Tab.HOME && (
            <Header onReset={() => loadDailyContent(true)} theme={theme} />
          )}

          {/* Tab-specific header for non-home tabs */}
          {activeTab !== Tab.HOME && (
            <TabHeader activeTab={activeTab} theme={theme} />
          )}

          {/* Content area */}
          <main className="flex-1 overflow-y-auto" style={{ paddingBottom: 88 }}>
            {appState === AppState.ERROR ? (
              <div className="text-center py-20 px-6">
                <p className="text-stone-400 mb-4">The path is momentarily obscured.</p>
                <button onClick={() => loadDailyContent(true)}
                  className="px-6 py-2 bg-stone-800 text-white rounded-full text-sm">Retry</button>
              </div>
            ) : renderContent()}
          </main>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="md:hidden">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} theme={theme} />
      </div>
    </div>
  );
};

// Sub-header for non-home tabs
const TAB_META: Record<Tab, { en: string; ja: string; color: string }> = {
  [Tab.HOME]:        { en: 'ayumi',       ja: 'あゆみ',         color: '#5B7C75' },
  [Tab.READ]:        { en: 'Read',        ja: '聖書',           color: '#5B7C75' },
  [Tab.DEVOTIONAL]:  { en: 'Devotional',  ja: '黙想',           color: '#c2610f' },
  [Tab.PRAYER]:      { en: 'Prayer',      ja: '祈り',           color: '#be185d' },
  [Tab.JOURNAL]:     { en: 'Journal',     ja: '日記',           color: '#7c3aed' },
  [Tab.WORSHIP]:     { en: 'Worship',     ja: '礼拝',           color: '#0369a1' },
  [Tab.STUDY]:       { en: 'Study',       ja: '学習',           color: '#065f46' },
  [Tab.PLANS]:       { en: 'Plans',       ja: '計画',           color: '#92400e' },
  [Tab.TOPICS]:      { en: 'Topics',      ja: 'トピック',        color: '#1e3a5f' },
  [Tab.SEARCH]:      { en: 'Search',      ja: '検索',           color: '#374151' },
  [Tab.SAVED]:       { en: 'Saved',       ja: '保存',           color: '#064e3b' },
  [Tab.HIGHLIGHTS]:  { en: 'Highlights',  ja: 'ハイライト',      color: '#d97706' },
  [Tab.VERSE_IMAGE]: { en: 'Verse Art',   ja: '聖句アート',      color: '#9333ea' },
  [Tab.HODOU]:       { en: 'Hodou',       ja: 'ほどう',         color: '#0f766e' },
  [Tab.PROFILE]:     { en: 'Profile',     ja: 'プロフィール',    color: '#374151' },
  [Tab.SETTINGS]:    { en: 'Settings',    ja: '設定',           color: '#374151' },
};

const TabHeader: React.FC<{ activeTab: Tab; theme?: string }> = ({ activeTab, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const bg = isDark ? 'bg-stone-950/95 border-stone-800' : isSepia ? 'bg-amber-50/95 border-amber-200' : 'bg-white/95 border-stone-100';
  const meta = TAB_META[activeTab] || TAB_META[Tab.HOME];

  return (
    <div className={`sticky top-0 z-30 ${bg} border-b backdrop-blur-xl px-5 py-3`}>
      <div className="flex items-center gap-2">
        <div className="w-1 h-7 rounded-full" style={{ backgroundColor: meta.color }} />
        <div>
          <h1 className={`text-base font-bold leading-tight ${isDark ? 'text-stone-100' : 'text-stone-900'}`}
              style={{ fontFamily: "'Lora', serif" }}>{meta.en}</h1>
          <p className={`text-[10px] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{meta.ja}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
