import React, { useState } from 'react';
import { Tab } from '../types';
import { 
  Home, BookOpen, Sun, HeartHandshake, PenLine, Music,
  Library, Calendar, Tag, Search, Bookmark, User, Settings, 
  Image, Highlighter, Globe, ChevronUp, X, Menu
} from 'lucide-react';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  theme?: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, theme = 'light' }) => {
  const [showMore, setShowMore] = useState(false);

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  
  const bg = isDark ? 'bg-stone-900 border-stone-700' : isSepia ? 'bg-amber-50 border-amber-200' : 'bg-white border-stone-200';
  const activeColor = isDark ? 'text-amber-400 bg-amber-400/10' : 'text-emerald-700 bg-emerald-50';
  const inactiveColor = isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-400 hover:text-stone-600';

  const primaryTabs = [
    { id: Tab.HOME, icon: Home, label: 'Home' },
    { id: Tab.READ, icon: BookOpen, label: 'Read' },
    { id: Tab.DEVOTIONAL, icon: Sun, label: 'Devote' },
    { id: Tab.PRAYER, icon: HeartHandshake, label: 'Prayer' },
    { id: Tab.JOURNAL, icon: PenLine, label: 'Journal' },
  ];

  const secondaryTabs = [
    { id: Tab.WORSHIP, icon: Music, label: 'Worship' },
    { id: Tab.STUDY, icon: Library, label: 'Study' },
    { id: Tab.PLANS, icon: Calendar, label: 'Plans' },
    { id: Tab.TOPICS, icon: Tag, label: 'Topics' },
    { id: Tab.SEARCH, icon: Search, label: 'Search' },
    { id: Tab.SAVED, icon: Bookmark, label: 'Saved' },
    { id: Tab.HIGHLIGHTS, icon: Highlighter, label: 'Highlights' },
    { id: Tab.VERSE_IMAGE, icon: Image, label: 'Art' },
    { id: Tab.HODOU, icon: Globe, label: 'Hodou' },
    { id: Tab.PROFILE, icon: User, label: 'Profile' },
    { id: Tab.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  const NavButton = ({ item, size = 'normal' }: { item: typeof primaryTabs[0], size?: 'normal' | 'small' }) => {
    const isActive = activeTab === item.id;
    return (
      <button
        key={item.id}
        onClick={() => { onTabChange(item.id); setShowMore(false); }}
        className={`flex flex-col items-center ${size === 'small' ? 'min-w-[56px] p-1.5' : 'min-w-[64px] p-2'} rounded-xl transition-all duration-200 ${
          isActive ? activeColor : inactiveColor
        }`}
      >
        <item.icon size={size === 'small' ? 20 : 22} strokeWidth={isActive ? 2 : 1.5} />
        <span className={`${size === 'small' ? 'text-[9px]' : 'text-[10px]'} mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* More Menu Overlay */}
      {showMore && (
        <div className="fixed inset-0 z-50" onClick={() => setShowMore(false)}>
          <div className={`absolute bottom-20 left-0 right-0 ${isDark ? 'bg-stone-900' : 'bg-white'} border-t ${isDark ? 'border-stone-700' : 'border-stone-200'} shadow-2xl rounded-t-2xl p-4`}
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <span className={`text-sm font-semibold ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>More</span>
              <button onClick={() => setShowMore(false)} className="text-stone-400 hover:text-stone-600">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {secondaryTabs.map(item => (
                <NavButton key={item.id} item={item} size="small" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav - Mobile */}
      <div className={`fixed bottom-0 left-0 right-0 ${bg} border-t shadow-lg z-40 md:hidden`}>
        <div className="flex items-center justify-around py-2 px-2">
          {primaryTabs.map(item => (
            <NavButton key={item.id} item={item} />
          ))}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center min-w-[64px] p-2 rounded-xl transition-all duration-200 ${
              showMore ? activeColor : inactiveColor
            }`}
          >
            {showMore ? <ChevronUp size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            <span className="text-[10px] mt-1 font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Sidebar Nav - Desktop */}
      <div className={`hidden md:flex fixed left-0 top-0 bottom-0 w-20 flex-col ${bg} border-r shadow-sm z-40 overflow-y-auto`}>
        <div className="flex flex-col items-center py-4 gap-1">
          {/* Logo */}
          <div className="mb-4 text-center">
            <span className={`text-xs font-bold ${isDark ? 'text-amber-400' : 'text-emerald-700'}`}>あゆみ</span>
          </div>
          {[...primaryTabs, ...secondaryTabs].map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center w-16 p-2 rounded-xl transition-all duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className={`text-[9px] mt-1 font-medium leading-tight text-center ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;
