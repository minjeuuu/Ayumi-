import React, { useState, useEffect } from 'react';
import { Footprints, Star, Trophy, Flame, BookOpen, Heart, PenTool, Music, Target, ChevronRight, Lock, CheckCircle } from 'lucide-react';

interface HodouProgress {
  totalSteps: number;
  currentStreak: number;
  longestStreak: number;
  versesRead: number;
  prayerSessions: number;
  journalEntries: number;
  worshipSessions: number;
  completedMilestones: string[];
  level: number;
  xp: number;
  lastActiveDate: string;
}

const STORAGE_KEY = 'ayumi_hodou_progress';

const DEFAULT_PROGRESS: HodouProgress = {
  totalSteps: 0,
  currentStreak: 0,
  longestStreak: 0,
  versesRead: 0,
  prayerSessions: 0,
  journalEntries: 0,
  worshipSessions: 0,
  completedMilestones: [],
  level: 1,
  xp: 0,
  lastActiveDate: '',
};

const MILESTONES = [
  { id: 'first_verse', label: 'First Steps', description: 'Read your first verse', icon: BookOpen, xp: 50, requiredXp: 0 },
  { id: 'first_prayer', label: 'First Prayer', description: 'Complete a prayer session', icon: Heart, xp: 50, requiredXp: 0 },
  { id: 'first_journal', label: 'First Entry', description: 'Write your first journal entry', icon: PenTool, xp: 50, requiredXp: 0 },
  { id: 'first_worship', label: 'First Worship', description: 'Listen to worship music', icon: Music, xp: 50, requiredXp: 0 },
  { id: 'streak_3', label: '3-Day Streak', description: 'Walk with God 3 days in a row', icon: Flame, xp: 100, requiredXp: 100 },
  { id: 'streak_7', label: 'Week Walker', description: '7-day devotional streak', icon: Flame, xp: 200, requiredXp: 300 },
  { id: 'verses_10', label: 'Scripture Seeker', description: 'Read 10 Bible chapters', icon: BookOpen, xp: 150, requiredXp: 200 },
  { id: 'prayers_10', label: 'Prayer Warrior', description: 'Complete 10 prayer sessions', icon: Heart, xp: 150, requiredXp: 200 },
  { id: 'journal_5', label: 'Faithful Scribe', description: 'Write 5 journal entries', icon: PenTool, xp: 150, requiredXp: 200 },
  { id: 'streak_30', label: 'Faithful Pilgrim', description: '30-day devotional streak', icon: Trophy, xp: 500, requiredXp: 1000 },
  { id: 'all_tabs', label: 'Explorer', description: 'Use every feature of Ayumi', icon: Star, xp: 300, requiredXp: 500 },
  { id: 'level_5', label: 'Seasoned Walker', description: 'Reach Level 5', icon: Trophy, xp: 400, requiredXp: 800 },
];

const LEVELS = [
  { level: 1, name: 'Seeker', minXp: 0, color: '#a8a29e' },
  { level: 2, name: 'Learner', minXp: 200, color: '#84cc16' },
  { level: 3, name: 'Disciple', minXp: 500, color: '#3b82f6' },
  { level: 4, name: 'Servant', minXp: 900, color: '#8b5cf6' },
  { level: 5, name: 'Faithful Walker', minXp: 1500, color: '#f59e0b' },
  { level: 6, name: 'Shepherd', minXp: 2500, color: '#ef4444' },
  { level: 7, name: 'Pilgrim', minXp: 4000, color: '#06b6d4' },
  { level: 8, name: 'Elder', minXp: 6000, color: '#ec4899' },
  { level: 9, name: 'Apostle', minXp: 9000, color: '#f97316' },
  { level: 10, name: 'Saint', minXp: 13000, color: '#eab308' },
];

const HodouTab: React.FC<{ theme?: string }> = ({ theme = "light" }) => {
  const [progress, setProgress] = useState<HodouProgress>(DEFAULT_PROGRESS);
  const [activeView, setActiveView] = useState<'journey' | 'milestones' | 'stats'>('journey');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setProgress(JSON.parse(stored));
  }, []);

  const saveProgress = (p: HodouProgress) => {
    setProgress(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  };

  const addXp = (amount: number, action: string) => {
    const updated = { ...progress, xp: progress.xp + amount, totalSteps: progress.totalSteps + 1 };
    
    // Level up check
    const nextLevel = LEVELS.find(l => l.minXp > updated.xp);
    const newLevel = nextLevel ? nextLevel.level - 1 : LEVELS.length;
    updated.level = Math.max(newLevel, 1);

    // Track action
    if (action === 'verse') updated.versesRead += 1;
    if (action === 'prayer') updated.prayerSessions += 1;
    if (action === 'journal') updated.journalEntries += 1;
    if (action === 'worship') updated.worshipSessions += 1;

    // Check milestones
    const toCheck = [
      { id: 'verses_10', met: updated.versesRead >= 10 },
      { id: 'prayers_10', met: updated.prayerSessions >= 10 },
      { id: 'journal_5', met: updated.journalEntries >= 5 },
    ];
    toCheck.forEach(({ id, met }) => {
      if (met && !updated.completedMilestones.includes(id)) {
        updated.completedMilestones = [...updated.completedMilestones, id];
        const ms = MILESTONES.find(m => m.id === id);
        if (ms) updated.xp += ms.xp;
      }
    });

    saveProgress(updated);
  };

  const currentLevel = LEVELS.find(l => l.level === progress.level) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.level === progress.level + 1);
  const xpToNext = nextLevel ? nextLevel.minXp - progress.xp : 0;
  const xpProgress = nextLevel 
    ? ((progress.xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100
    : 100;

  const completedMilestones = MILESTONES.filter(m => progress.completedMilestones.includes(m.id));
  const availableMilestones = MILESTONES.filter(m => !progress.completedMilestones.includes(m.id) && progress.xp >= m.requiredXp);
  const lockedMilestones = MILESTONES.filter(m => !progress.completedMilestones.includes(m.id) && progress.xp < m.requiredXp);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-stone-900 to-stone-800 text-white">
      {/* Header */}
      <div className="p-5 text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1 mx-auto" style={{background:"linear-gradient(135deg,#5B7C75,#3A524D)"}}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></div>
        <h2 className="font-bold text-lg">歩道 · Hodou</h2>
        <p className="text-stone-400 text-xs">Your Journey with God</p>
      </div>

      {/* Level Card */}
      <div className="mx-4 mb-4 bg-gradient-to-r from-stone-700 to-stone-600 rounded-2xl p-4 shadow-xl border border-stone-500">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-stone-400 uppercase tracking-wider">Level {progress.level}</div>
            <div className="text-xl font-bold" style={{ color: currentLevel.color }}>{currentLevel.name}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{progress.xp}</div>
            <div className="text-xs text-stone-400">total XP</div>
          </div>
        </div>
        {nextLevel && (
          <>
            <div className="h-2 bg-stone-800 rounded-full overflow-hidden mb-1">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%`, backgroundColor: currentLevel.color }}
              />
            </div>
            <div className="text-xs text-stone-400 text-right">{xpToNext} XP to Level {progress.level + 1}</div>
          </>
        )}
        <div className="flex space-x-4 mt-3 pt-3 border-t border-stone-600">
          <div className="text-center flex-1">
            <div className="text-lg font-bold text-orange-400">{progress.currentStreak}</div>
            <div className="text-xs text-stone-400">Streak</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-lg font-bold text-blue-400">{progress.versesRead}</div>
            <div className="text-xs text-stone-400">Verses</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-lg font-bold text-pink-400">{progress.prayerSessions}</div>
            <div className="text-xs text-stone-400">Prayers</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-lg font-bold text-green-400">{progress.journalEntries}</div>
            <div className="text-xs text-stone-400">Journal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex mx-4 space-x-1 mb-3">
        {(['journey', 'milestones', 'stats'] as const).map(v => (
          <button
            key={v}
            onClick={() => setActiveView(v)}
            className={`flex-1 py-2 text-xs rounded-lg transition-colors capitalize ${
              activeView === v ? 'bg-stone-600 text-white' : 'text-stone-400'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {activeView === 'journey' && (
          <div>
            <p className="text-stone-400 text-sm mb-4 text-center">Record your spiritual activities to earn XP</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Read Bible', icon: BookOpen, color: '#84cc16', action: 'verse', xp: 20 },
                { label: 'Pray', icon: Heart, color: '#f472b6', action: 'prayer', xp: 25 },
                { label: 'Journal', icon: PenTool, color: '#60a5fa', action: 'journal', xp: 30 },
                { label: 'Worship', icon: Music, color: '#c084fc', action: 'worship', xp: 20 },
              ].map(item => (
                <button
                  key={item.action}
                  onClick={() => addXp(item.xp, item.action)}
                  className="bg-stone-700 rounded-xl p-4 text-center hover:bg-stone-600 active:scale-95 transition-all border border-stone-600"
                >
                  <item.icon size={28} className="mx-auto mb-2" style={{ color: item.color }} />
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs mt-1" style={{ color: item.color }}>+{item.xp} XP</div>
                </button>
              ))}
            </div>

            {/* Path visualization */}
            <div className="mt-6">
              <h3 className="text-xs text-stone-400 uppercase tracking-wider mb-3">Your Path</h3>
              <div className="relative">
                {[...Array(10)].map((_, i) => {
                  const stepXp = (i + 1) * 100;
                  const reached = progress.xp >= stepXp;
                  return (
                    <div key={i} className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                        reached ? 'bg-yellow-400 border-yellow-300 text-stone-800' : 'bg-stone-700 border-stone-600 text-stone-400'
                      }`}>
                        {reached ? '✓' : i + 1}
                      </div>
                      <div className="flex-1 h-0.5 mx-2" style={{ backgroundColor: reached ? '#fbbf24' : '#44403c' }} />
                      <span className="text-xs text-stone-500">{stepXp} XP</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeView === 'milestones' && (
          <div>
            {completedMilestones.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs text-stone-400 uppercase tracking-wider mb-2">Achieved</h3>
                {completedMilestones.map(m => (
                  <div key={m.id} className="flex items-center bg-stone-700/50 rounded-xl p-3 mb-2 border border-green-500/30">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                      <CheckCircle size={16} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-300">{m.label}</div>
                      <div className="text-xs text-stone-400">{m.description}</div>
                    </div>
                    <div className="text-xs text-yellow-400">+{m.xp} XP</div>
                  </div>
                ))}
              </div>
            )}

            {availableMilestones.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs text-stone-400 uppercase tracking-wider mb-2">Available</h3>
                {availableMilestones.map(m => (
                  <div key={m.id} className="flex items-center bg-stone-700 rounded-xl p-3 mb-2 border border-stone-600">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                      <m.icon size={16} className="text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{m.label}</div>
                      <div className="text-xs text-stone-400">{m.description}</div>
                    </div>
                    <div className="text-xs text-yellow-400">+{m.xp} XP</div>
                  </div>
                ))}
              </div>
            )}

            {lockedMilestones.length > 0 && (
              <div>
                <h3 className="text-xs text-stone-400 uppercase tracking-wider mb-2">Locked</h3>
                {lockedMilestones.map(m => (
                  <div key={m.id} className="flex items-center bg-stone-800 rounded-xl p-3 mb-2 opacity-50 border border-stone-700">
                    <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center mr-3">
                      <Lock size={14} className="text-stone-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-stone-500">{m.label}</div>
                      <div className="text-xs text-stone-600">Requires {m.requiredXp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'stats' && (
          <div className="space-y-3">
            <h3 className="text-xs text-stone-400 uppercase tracking-wider">Your Journey Statistics</h3>
            {[
              { label: 'Total XP Earned', value: progress.xp.toString(), icon: Star, color: '#fbbf24' },
              { label: 'Current Streak', value: `${progress.currentStreak} days`, icon: Flame, color: '#f97316' },
              { label: 'Longest Streak', value: `${progress.longestStreak} days`, icon: Trophy, color: '#8b5cf6' },
              { label: 'Bible Chapters Read', value: progress.versesRead.toString(), icon: BookOpen, color: '#84cc16' },
              { label: 'Prayer Sessions', value: progress.prayerSessions.toString(), icon: Heart, color: '#f472b6' },
              { label: 'Journal Entries', value: progress.journalEntries.toString(), icon: PenTool, color: '#60a5fa' },
              { label: 'Worship Sessions', value: progress.worshipSessions.toString(), icon: Music, color: '#c084fc' },
              { label: 'Milestones Achieved', value: `${progress.completedMilestones.length}/${MILESTONES.length}`, icon: Target, color: '#34d399' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center bg-stone-700 rounded-xl p-3 border border-stone-600">
                <stat.icon size={18} className="mr-3" style={{ color: stat.color }} />
                <span className="flex-1 text-sm text-stone-300">{stat.label}</span>
                <span className="font-bold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
            ))}

            {/* Level progression */}
            <h3 className="text-xs text-stone-400 uppercase tracking-wider mt-4 mb-2">Level Progression</h3>
            {LEVELS.map(l => (
              <div key={l.level} className={`flex items-center p-2 rounded-lg mb-1 ${progress.level >= l.level ? 'opacity-100' : 'opacity-40'}`}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 border" style={{ borderColor: l.color, color: l.color }}>
                  {l.level}
                </div>
                <span className="flex-1 text-sm" style={{ color: progress.level >= l.level ? l.color : '#78716c' }}>{l.name}</span>
                <span className="text-xs text-stone-500">{l.minXp} XP</span>
                {progress.level >= l.level && <CheckCircle size={14} className="ml-2 text-green-400" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HodouTab;
