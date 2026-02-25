import React, { useState } from 'react';
import { Tab } from '../types';
import {
  Home, BookOpen, Flame, HeartHandshake, PenLine, Music,
  Library, Calendar, Tag, Search, Bookmark, User, Settings,
  Image, Highlighter, Map, X, Grid3X3, Sparkles
} from 'lucide-react';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  theme?: string;
}

const ALL_TABS = [
  { id: Tab.HOME,        icon: Home,          label: 'Home',      group: 'main',    color: '#5B7C75' },
  { id: Tab.READ,        icon: BookOpen,       label: 'Read',      group: 'main',    color: '#5B7C75' },
  { id: Tab.DEVOTIONAL,  icon: Flame,          label: 'Devote',    group: 'main',    color: '#c2610f' },
  { id: Tab.PRAYER,      icon: HeartHandshake, label: 'Prayer',    group: 'main',    color: '#be185d' },
  { id: Tab.JOURNAL,     icon: PenLine,        label: 'Journal',   group: 'main',    color: '#7c3aed' },
  { id: Tab.WORSHIP,     icon: Music,          label: 'Worship',   group: 'explore', color: '#0369a1' },
  { id: Tab.STUDY,       icon: Library,        label: 'Study',     group: 'explore', color: '#065f46' },
  { id: Tab.PLANS,       icon: Calendar,       label: 'Plans',     group: 'explore', color: '#92400e' },
  { id: Tab.TOPICS,      icon: Tag,            label: 'Topics',    group: 'explore', color: '#1e3a5f' },
  { id: Tab.SEARCH,      icon: Search,         label: 'Search',    group: 'explore', color: '#374151' },
  { id: Tab.SAVED,       icon: Bookmark,       label: 'Saved',     group: 'explore', color: '#064e3b' },
  { id: Tab.HIGHLIGHTS,  icon: Highlighter,    label: 'Highlights',group: 'create',  color: '#d97706' },
  { id: Tab.VERSE_IMAGE, icon: Image,          label: 'Verse Art', group: 'create',  color: '#9333ea' },
  { id: Tab.HODOU,       icon: Map,            label: 'Hodou',     group: 'create',  color: '#0f766e' },
  { id: Tab.PROFILE,     icon: User,           label: 'Profile',   group: 'me',      color: '#374151' },
  { id: Tab.SETTINGS,    icon: Settings,       label: 'Settings',  group: 'me',      color: '#374151' },
];

const PRIMARY_IDS = [Tab.HOME, Tab.READ, Tab.DEVOTIONAL, Tab.PRAYER, Tab.JOURNAL];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, theme = 'light' }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';

  const navBg = isDark ? 'bg-stone-900/96 border-stone-800' : isSepia ? 'bg-amber-50/96 border-amber-200' : 'bg-white/96 border-stone-100';
  const sidebarBg = isDark ? 'bg-stone-950 border-stone-800' : isSepia ? 'bg-amber-50 border-amber-200' : 'bg-stone-50 border-stone-200';
  const drawerBg = isDark ? 'bg-stone-900' : isSepia ? 'bg-amber-50' : 'bg-white';
  const divider = isDark ? 'bg-stone-800' : 'bg-stone-200';
  const inactiveColor = isDark ? '#57534e' : '#a8a29e';

  const primaryTabs = ALL_TABS.filter(t => PRIMARY_IDS.includes(t.id));
  const secondaryTabs = ALL_TABS.filter(t => !PRIMARY_IDS.includes(t.id));
  const isSecondaryActive = secondaryTabs.some(t => t.id === activeTab);
  const grouped: Record<string, typeof ALL_TABS> = {};
  secondaryTabs.forEach(t => { if (!grouped[t.group]) grouped[t.group] = []; grouped[t.group].push(t); });
  const groupLabels: Record<string,string> = { explore: 'Explore', create: 'Create', me: 'You' };

  return (
    <>
      {/* ─── MOBILE BOTTOM NAV ─────────────────────────────── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-xl ${navBg} border-t`}
           style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-center justify-around px-2 py-2">
          {primaryTabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button key={tab.id}
                onClick={() => { onTabChange(tab.id); setShowDrawer(false); }}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-150 active:scale-95 min-w-[48px]"
                style={active ? { backgroundColor: tab.color + '18' } : {}}>
                <tab.icon size={21} strokeWidth={active ? 2.2 : 1.5}
                  style={{ color: active ? tab.color : inactiveColor }} />
                <span className="text-[9px] font-semibold leading-tight"
                      style={{ color: active ? tab.color : inactiveColor }}>{tab.label}</span>
              </button>
            );
          })}
          <button onClick={() => setShowDrawer(!showDrawer)}
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-150 active:scale-95 min-w-[48px]"
            style={isSecondaryActive ? { backgroundColor: '#5B7C7515' } : {}}>
            <Grid3X3 size={21} strokeWidth={isSecondaryActive ? 2.2 : 1.5}
              style={{ color: isSecondaryActive ? '#5B7C75' : inactiveColor }} />
            <span className="text-[9px] font-semibold leading-tight"
                  style={{ color: isSecondaryActive ? '#5B7C75' : inactiveColor }}>More</span>
          </button>
        </div>
      </div>

      {/* ─── MOBILE DRAWER ─────────────────────────────────── */}
      {showDrawer && (
        <div className="fixed inset-0 z-[60] md:hidden" onClick={() => setShowDrawer(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl ${drawerBg} border-t shadow-2xl`}
               style={{ borderColor: isDark ? '#292524' : '#f0ede8' }}
               onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1">
              <div className={`w-10 h-1 rounded-full ${divider}`} />
            </div>
            <div className="flex justify-between items-center px-5 pb-2 pt-1">
              <span className={`text-sm font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>All Sections</span>
              <button onClick={() => setShowDrawer(false)}
                className={`p-1.5 rounded-full ${isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-500'}`}>
                <X size={16} />
              </button>
            </div>
            {Object.entries(grouped).map(([group, tabs]) => (
              <div key={group} className="px-4 pb-4">
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 px-1 ${isDark ? 'text-stone-600' : 'text-stone-400'}`}>
                  {groupLabels[group]}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {tabs.map(tab => {
                    const active = activeTab === tab.id;
                    return (
                      <button key={tab.id}
                        onClick={() => { onTabChange(tab.id); setShowDrawer(false); }}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-150 active:scale-95"
                        style={{ backgroundColor: active ? tab.color + '20' : isDark ? '#1c1917' : '#f5f5f4' }}>
                        <tab.icon size={22} strokeWidth={active ? 2.2 : 1.5}
                          style={{ color: active ? tab.color : isDark ? '#a8a29e' : '#78716c' }} />
                        <span className="text-[9px] font-semibold leading-tight text-center"
                              style={{ color: active ? tab.color : isDark ? '#a8a29e' : '#78716c' }}>
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ height: 'calc(env(safe-area-inset-bottom) + 80px)' }} />
          </div>
        </div>
      )}

      {/* ─── DESKTOP SIDEBAR ──────────────────────────────── */}
      <div className={`hidden md:flex fixed left-0 top-0 bottom-0 w-20 flex-col ${sidebarBg} border-r z-40`}>
        {/* Logo */}
        <div className="flex flex-col items-center pt-5 pb-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #5B7C75 0%, #3A524D 100%)' }}>
            <Sparkles size={18} color="white" strokeWidth={1.8} />
          </div>
          <span className="text-[8px] font-bold tracking-widest mt-1.5"
                style={{ color: isDark ? '#57534e' : '#c7c3be' }}>あゆみ</span>
        </div>
        <div className={`mx-3 h-px ${divider} flex-shrink-0 mb-1`} />

        {/* Tab list */}
        <div className="flex-1 overflow-y-auto py-1 px-2" style={{ scrollbarWidth: 'none' }}>
          {ALL_TABS.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => onTabChange(tab.id)} title={tab.label}
                className="w-full flex flex-col items-center gap-1 py-2.5 rounded-2xl transition-all duration-150 mb-0.5"
                style={{ backgroundColor: active ? tab.color + '15' : 'transparent' }}>
                <tab.icon size={19} strokeWidth={active ? 2.2 : 1.5}
                  style={{ color: active ? tab.color : inactiveColor }} />
                <span className="text-[8px] font-semibold leading-tight text-center"
                      style={{ color: active ? tab.color : inactiveColor }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className={`mx-3 h-px ${divider} flex-shrink-0`} />
        <div className="flex justify-center py-2.5 flex-shrink-0">
          <span className="text-[7px] font-bold tracking-widest"
                style={{ color: isDark ? '#44403c' : '#d6d3d1' }}>歩み</span>
        </div>
      </div>
    </>
  );
};

export default Navigation;
