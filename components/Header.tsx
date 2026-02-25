import React from 'react';
import { Tab } from '../types';

interface HeaderProps {
  activeTab: Tab;
  theme?: string;
}

const TAB_TITLES: Record<Tab, { en: string; ja: string }> = {
  [Tab.HOME]: { en: 'ayumi', ja: 'あゆみ' },
  [Tab.READ]: { en: 'Read', ja: '聖書' },
  [Tab.DEVOTIONAL]: { en: 'Devotional', ja: '黙想' },
  [Tab.PRAYER]: { en: 'Prayer', ja: '祈り' },
  [Tab.JOURNAL]: { en: 'Journal', ja: '日記' },
  [Tab.WORSHIP]: { en: 'Worship', ja: '礼拝' },
  [Tab.STUDY]: { en: 'Study', ja: '学習' },
  [Tab.PLANS]: { en: 'Plans', ja: '計画' },
  [Tab.TOPICS]: { en: 'Topics', ja: 'トピック' },
  [Tab.SEARCH]: { en: 'Search', ja: '検索' },
  [Tab.SAVED]: { en: 'Saved', ja: '保存' },
  [Tab.HIGHLIGHTS]: { en: 'Highlights', ja: 'ハイライト' },
  [Tab.VERSE_IMAGE]: { en: 'Verse Art', ja: '聖句アート' },
  [Tab.HODOU]: { en: 'Hodou', ja: 'ほどう' },
  [Tab.PROFILE]: { en: 'Profile', ja: 'プロフィール' },
  [Tab.SETTINGS]: { en: 'Settings', ja: '設定' },
};

const Header: React.FC<HeaderProps> = ({ activeTab, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  
  const bg = isDark ? 'bg-stone-900 border-stone-700' : isSepia ? 'bg-amber-50 border-amber-200' : 'bg-white border-stone-200';
  const textColor = isDark ? 'text-stone-100' : 'text-stone-800';
  const subtextColor = isDark ? 'text-stone-400' : 'text-stone-500';

  const titles = TAB_TITLES[activeTab] || { en: 'ayumi', ja: 'あゆみ' };
  const isHome = activeTab === Tab.HOME;

  return (
    <div className={`fixed top-0 left-0 right-0 md:left-20 ${bg} border-b z-30 px-4 py-3`}>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          {isHome ? (
            <div>
              <h1 className={`text-xl font-serif font-bold ${textColor}`}>ayumi</h1>
              <p className={`text-xs ${subtextColor}`}>歩み - Walking with God</p>
            </div>
          ) : (
            <div>
              <h1 className={`text-lg font-serif font-semibold ${textColor}`}>{titles.en}</h1>
              <p className={`text-xs ${subtextColor}`}>{titles.ja}</p>
            </div>
          )}
        </div>
        {isHome && (
          <div className="text-right">
            <p className={`text-xs ${subtextColor}`}>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
