import React from 'react';
import { Tab } from '../types';
import { 
  Home, BookOpen, Sun, HeartHandshake, PenLine, 
  Library, Calendar, Tag, Search, Bookmark, User, Settings 
} from 'lucide-react';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  // We group tabs for mobile into a bottom bar, and maybe a "More" menu,
  // but for simplicity in this view, we'll do a scrollable bottom bar.
  
  const navItems = [
    { id: Tab.HOME, icon: Home, label: 'Home' },
    { id: Tab.READ, icon: BookOpen, label: 'Read' },
    { id: Tab.DEVOTIONAL, icon: Sun, label: 'Devote' },
    { id: Tab.PRAYER, icon: HeartHandshake, label: 'Prayer' },
    { id: Tab.JOURNAL, icon: PenLine, label: 'Journal' },
    { id: Tab.STUDY, icon: Library, label: 'Study' },
    { id: Tab.PLANS, icon: Calendar, label: 'Plans' },
    { id: Tab.TOPICS, icon: Tag, label: 'Topics' },
    { id: Tab.SEARCH, icon: Search, label: 'Search' },
    { id: Tab.SAVED, icon: Bookmark, label: 'Saved' },
    { id: Tab.PROFILE, icon: User, label: 'Profile' },
    { id: Tab.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50 pb-safe">
      <div className="flex overflow-x-auto no-scrollbar py-2 px-2 gap-4 md:justify-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center min-w-[64px] p-2 rounded-xl transition-all duration-200 ${
                isActive ? 'text-primary bg-primary/10' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;