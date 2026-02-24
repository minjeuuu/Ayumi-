import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import { HomeDashboardContent, AppState, Tab } from './types';
import { generateHomeDashboard } from './services/geminiService';

// Views
import HomeTab from './components/views/HomeTab';
import ReadTab from './components/views/ReadTab';
import DevotionalTab from './components/views/DevotionalTab';
import PrayerTab from './components/views/PrayerTab';
import JournalTab from './components/views/JournalTab';
import { StudyTab, PlansTab, TopicsTab, SavedTab } from './components/views/LibraryTabs';
import { SearchTab, ProfileTab, SettingsTab } from './components/views/SystemTabs';

const STORAGE_KEY_CONTENT = 'ayumi_home_dashboard_v2';
const STORAGE_KEY_DATE = 'ayumi_last_fetch_date';

const App: React.FC = () => {
  const [content, setContent] = useState<HomeDashboardContent | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const loadDailyContent = useCallback(async (forceRefresh = false) => {
    // Only block UI with loading on initial load, not tab switches
    if (!content) setAppState(AppState.LOADING);
    
    const today = getTodayString();
    
    try {
      const cachedContent = localStorage.getItem(STORAGE_KEY_CONTENT);
      const lastDate = localStorage.getItem(STORAGE_KEY_DATE);

      if (!forceRefresh && cachedContent && lastDate === today) {
        setContent(JSON.parse(cachedContent));
        setAppState(AppState.READY);
        return;
      }

      const newContent = await generateHomeDashboard();
      
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(newContent));
      localStorage.setItem(STORAGE_KEY_DATE, today);
      
      setContent(newContent);
      setAppState(AppState.READY);
    } catch (error) {
      console.error("Failed to load dashboard", error);
      setAppState(AppState.ERROR);
    }
  }, [content]);

  useEffect(() => {
    loadDailyContent();
  }, [loadDailyContent]);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME: return <HomeTab content={content} onNavigate={setActiveTab} />;
      case Tab.READ: return <ReadTab />;
      // Pass the devotional part of the dashboard to the Devotional Tab
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

  if (appState === AppState.LOADING) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col font-sans selection:bg-primary/20 selection:text-stone-900">
      <div className="container max-w-md mx-auto flex-grow bg-white min-h-screen shadow-2xl overflow-hidden relative">
        
        {/* Only show header on Home tab for cleanliness, or keep small */}
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