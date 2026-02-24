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
import { StudyTab, PlansTab, TopicsTab, SavedTab } from './components/views/LibraryTabs';
import { SearchTab, ProfileTab, SettingsTab } from './components/views/SystemTabs';

const STORAGE_KEY_CONTENT = 'ayumi_home_dashboard_v2';
const STORAGE_KEY_DATE = 'ayumi_last_fetch_date';

// Instant fallback content so app never blocks
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

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const loadDailyContent = useCallback(async (forceRefresh = false) => {
    const today = getTodayString();
    
    try {
      // Check localStorage first for instant loading
      const cachedContent = localStorage.getItem(STORAGE_KEY_CONTENT);
      const lastDate = localStorage.getItem(STORAGE_KEY_DATE);

      if (!forceRefresh && cachedContent && lastDate === today) {
        setContent(JSON.parse(cachedContent));
        setAppState(AppState.READY);
        return;
      }

      // Show instant fallback while fetching
      if (!content) {
        setContent(INSTANT_FALLBACK);
        setAppState(AppState.READY);
      }

      // Fetch fresh content in background
      const newContent = await generateHomeDashboard();
      
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(newContent));
      localStorage.setItem(STORAGE_KEY_DATE, today);
      
      setContent(newContent);
      setAppState(AppState.READY);
    } catch (error) {
      console.error("Failed to load dashboard", error);
      // Even on error, show fallback instead of error screen
      if (!content) {
        setContent(INSTANT_FALLBACK);
        setAppState(AppState.READY);
      }
    }
  }, []);

  useEffect(() => {
    loadDailyContent();
  }, []);

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
      case Tab.SAVED: return <SavedTab />;
      case Tab.PROFILE: return <ProfileTab />;
      case Tab.SETTINGS: return <SettingsTab />;
      default: return <HomeTab content={content} onNavigate={setActiveTab} />;
    }
  };

  // Show loading only for max 1.5 seconds, then show fallback
  useEffect(() => {
    if (appState === AppState.LOADING) {
      const timer = setTimeout(() => {
        if (appState === AppState.LOADING) {
          setContent(INSTANT_FALLBACK);
          setAppState(AppState.READY);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  if (appState === AppState.LOADING) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col font-sans selection:bg-primary/20 selection:text-stone-900">
      <div className="container max-w-md mx-auto flex-grow bg-white min-h-screen shadow-2xl overflow-hidden relative">
        
        {activeTab === Tab.HOME && <Header onReset={() => loadDailyContent(true)} />}
        
        <main className="w-full h-full">
          {appState === AppState.ERROR ? (
            <div className="text-center py-20 px-6">
              <p className="text-stone-500 mb-4">The path is momentarily obscured.</p>
              <button onClick={() => loadDailyContent(true)} className="px-6 py-2 bg-stone-800 text-white rounded-full">Retry</button>
            </div>
          ) : (
            renderContent()
          )}
        </main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
