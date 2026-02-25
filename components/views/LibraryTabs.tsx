import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, Calendar, Tag, Library, Book, Heart, Clock, TrendingUp, Award, Target, BookOpen, Search, Plus, Trash2, CheckCircle, ChevronDown, ChevronRight, Copy, Share2, X, Play, Pause, RotateCcw } from 'lucide-react';
import { callClaude, explainVerse, getBibleChapter } from '../../services/claudeService';
import { COMPREHENSIVE_BIBLE_VERSIONS } from '../../constants';

// ─────────────────────────────────────────────────────────
// STUDY TAB
// ─────────────────────────────────────────────────────────
export const StudyTab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [verseInput, setVerseInput] = useState('John 3:16');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [compareVersions, setCompareVersions] = useState(['KJV', 'NIV', 'ESV']);
  const [compareResults, setCompareResults] = useState<Record<string, string>>({});
  const [wordInput, setWordInput] = useState('');
  const [concordanceRef, setConcordanceRef] = useState('');
  const [notes, setNotes] = useState<{id: string; verse: string; text: string; date: string}[]>([]);
  const [noteText, setNoteText] = useState('');
  const [studyStats, setStudyStats] = useState({ versesStudied: 0, notesWritten: 0, toolsUsed: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_study_notes');
    if (saved) setNotes(JSON.parse(saved));
    const stats = localStorage.getItem('ayumi_study_stats');
    if (stats) setStudyStats(JSON.parse(stats));
  }, []);

  const saveNote = () => {
    if (!noteText.trim() || !verseInput.trim()) return;
    const newNote = { id: Date.now().toString(), verse: verseInput, text: noteText, date: new Date().toISOString() };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('ayumi_study_notes', JSON.stringify(updated));
    setNoteText('');
    incrementStat('notesWritten');
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('ayumi_study_notes', JSON.stringify(updated));
  };

  const incrementStat = (key: string) => {
    const updated = { ...studyStats, [key]: (studyStats as any)[key] + 1 };
    setStudyStats(updated);
    localStorage.setItem('ayumi_study_stats', JSON.stringify(updated));
  };

  const runTool = async (tool: string) => {
    setActiveTool(tool);
    setIsLoading(true);
    setResult('');
    incrementStat('toolsUsed');

    try {
      let prompt = '';
      let sys = 'You are a biblical scholar. Be thorough and accurate.';

      if (tool === 'explain') {
        prompt = `Explain ${verseInput} in depth: historical context, original language insights (Hebrew/Greek key words), theological meaning, and practical application. Structure with clear sections.`;
      } else if (tool === 'crossref') {
        prompt = `List 10 cross-references for ${verseInput}. For each, give the reference and a one-sentence explanation of how it connects. Format as a numbered list.`;
      } else if (tool === 'original') {
        prompt = `For ${verseInput}, provide: 1) The key Hebrew or Greek words with transliteration, 2) Literal meaning of each key word, 3) How this changes understanding of the verse, 4) Relevant word usage elsewhere in Scripture.`;
      } else if (tool === 'commentary') {
        prompt = `Write a pastoral commentary on ${verseInput} suitable for preaching. Include: theological significance, gospel connection, application points, and an illustration. About 400 words.`;
      } else if (tool === 'context') {
        prompt = `Provide full historical and literary context for ${verseInput}: who wrote it, when, to whom, why, what came before/after, and how it fits the book's overall theme.`;
      } else if (tool === 'word') {
        prompt = `Do a word study on the word "${wordInput || 'love'}" in the Bible. Include: 1) Hebrew/Greek equivalents, 2) How many times it appears, 3) Different ways it's used, 4) Key passages, 5) Theological significance.`;
      } else if (tool === 'concordance') {
        prompt = `Search the Bible for the theme or word "${concordanceRef || verseInput}". List 12 key verses that address this topic, grouped by theme. Include brief notes on each.`;
      }

      const text = await callClaude(prompt, sys);
      setResult(text);
      incrementStat('versesStudied');
    } catch (e) {
      setResult('Study tool unavailable. Please check your connection and try again.');
    }
    setIsLoading(false);
  };

  const runCompare = async () => {
    setActiveTool('compare');
    setIsLoading(true);
    setCompareResults({});
    const results: Record<string, string> = {};
    for (const v of compareVersions.slice(0, 4)) {
      try {
        const parts = verseInput.match(/^(.+)\s+(\d+):(\d+)$/);
        if (parts) {
          const data = await getBibleChapter(parts[1], parseInt(parts[2]), v);
          const verseNum = parseInt(parts[3]);
          const versesArr = (data as any).verses;
          const verse = versesArr?.find((vv: any) => vv.verse === verseNum);
          results[v] = verse?.text || 'Not found';
        } else {
          results[v] = 'Invalid reference format (use Book Chapter:Verse)';
        }
      } catch { results[v] = 'Translation unavailable'; }
    }
    setCompareResults(results);
    setIsLoading(false);
  };

  const tools = [
    { id: 'explain', icon: BookOpen, label: 'Deep Explanation', color: 'text-blue-600 bg-blue-50', desc: 'Full verse analysis' },
    { id: 'crossref', icon: TrendingUp, label: 'Cross References', color: 'text-green-600 bg-green-50', desc: 'Related passages' },
    { id: 'original', icon: Tag, label: 'Original Language', color: 'text-purple-600 bg-purple-50', desc: 'Hebrew/Greek study' },
    { id: 'commentary', icon: Library, label: 'Commentary', color: 'text-amber-600 bg-amber-50', desc: 'Pastoral insights' },
    { id: 'context', icon: Clock, label: 'Historical Context', color: 'text-red-600 bg-red-50', desc: 'Background & setting' },
    { id: 'word', icon: Search, label: 'Word Study', color: 'text-indigo-600 bg-indigo-50', desc: 'Trace a word through Scripture' },
    { id: 'concordance', icon: Book, label: 'Concordance', color: 'text-teal-600 bg-teal-50', desc: 'Find topic verses' },
    { id: 'compare', icon: Target, label: 'Compare Versions', color: 'text-rose-600 bg-rose-50', desc: 'Side-by-side translations' },
  ];

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        <h2 className="text-xl font-bold font-serif text-stone-800 mb-1">Bible Study Tools</h2>
        <p className="text-sm text-stone-500 mb-4">AI-powered deep study for any verse</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[['Verses', studyStats.versesStudied], ['Notes', studyStats.notesWritten], ['Tools Used', studyStats.toolsUsed]].map(([label, val]) => (
            <div key={label as string} className="bg-white rounded-xl p-3 text-center border border-stone-100 shadow-sm">
              <div className="text-xl font-bold text-emerald-700">{val}</div>
              <div className="text-xs text-stone-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Verse Input */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 mb-4 shadow-sm">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">Verse Reference</label>
          <input
            value={verseInput}
            onChange={e => setVerseInput(e.target.value)}
            placeholder="e.g. John 3:16 or Romans 8:28"
            className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 font-serif"
          />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => tool.id === 'compare' ? runCompare() : (tool.id === 'word' ? setActiveTool('word-input') : runTool(tool.id))}
              className={`p-4 rounded-xl border border-stone-100 bg-white hover:shadow-md active:scale-95 transition-all text-left ${activeTool === tool.id ? 'ring-2 ring-emerald-400 shadow-md' : ''}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${tool.color}`}>
                <tool.icon size={18} />
              </div>
              <p className="text-sm font-bold text-stone-700">{tool.label}</p>
              <p className="text-xs text-stone-400 mt-0.5">{tool.desc}</p>
            </button>
          ))}
        </div>

        {/* Word Study input */}
        {activeTool === 'word-input' && (
          <div className="bg-white rounded-xl border border-stone-200 p-4 mb-4 shadow-sm">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">Word to Study</label>
            <div className="flex space-x-2">
              <input value={wordInput} onChange={e => setWordInput(e.target.value)} placeholder="e.g. grace, shalom, agape..." className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
              <button onClick={() => runTool('word')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Study</button>
            </div>
          </div>
        )}

        {/* Compare Versions */}
        {activeTool === 'compare' && (
          <div className="bg-white rounded-xl border border-stone-200 p-4 mb-4 shadow-sm">
            <h3 className="font-bold text-stone-700 mb-3">Compare Translations</h3>
            {isLoading ? (
              <div className="text-center py-6 text-stone-400">
                <div className="animate-spin w-6 h-6 border-2 border-stone-200 border-t-emerald-600 rounded-full mx-auto mb-2" />
                Comparing...
              </div>
            ) : Object.keys(compareResults).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(compareResults).map(([version, text]) => (
                  <div key={version} className="border-l-4 border-emerald-400 pl-3">
                    <p className="text-xs font-bold text-emerald-700 mb-1">{version}</p>
                    <p className="text-sm text-stone-700 font-serif italic">{text}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl border border-stone-200 p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-stone-700 capitalize">{tools.find(t => t.id === activeTool)?.label}</h3>
              <div className="flex space-x-2">
                <button onClick={() => navigator.clipboard.writeText(result)} className="text-stone-400 hover:text-stone-600 p-1"><Copy size={15} /></button>
                <button onClick={() => setResult('')} className="text-stone-400 hover:text-stone-600 p-1"><X size={15} /></button>
              </div>
            </div>
            {isLoading ? (
              <div className="text-center py-8 text-stone-400">
                <div className="animate-spin w-8 h-8 border-2 border-stone-200 border-t-emerald-600 rounded-full mx-auto mb-3" />
                Studying...
              </div>
            ) : (
              <div className="text-sm text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">{result}</div>
            )}
          </div>
        )}

        {/* Loading indicator when no result yet */}
        {isLoading && !result && activeTool !== 'compare' && (
          <div className="bg-white rounded-xl border border-stone-200 p-8 mb-4 text-center text-stone-400 shadow-sm">
            <div className="animate-spin w-8 h-8 border-2 border-stone-200 border-t-emerald-600 rounded-full mx-auto mb-3" />
            Studying the scriptures...
          </div>
        )}

        {/* Study Notes */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
          <h3 className="font-bold text-stone-700 mb-3 flex items-center">
            <Book size={16} className="mr-2 text-emerald-600" />
            Study Notes
          </h3>
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder={`Write notes about ${verseInput}...`}
            rows={3}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400/50 mb-2"
          />
          <button onClick={saveNote} disabled={!noteText.trim()} className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 disabled:bg-stone-200 text-white disabled:text-stone-400 rounded-lg text-sm font-bold transition-colors">
            Save Note
          </button>
          {notes.length > 0 && (
            <div className="mt-4 space-y-3">
              {notes.slice(0, 5).map(note => (
                <div key={note.id} className="border-l-2 border-emerald-300 pl-3">
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-bold text-emerald-700">{note.verse}</p>
                    <button onClick={() => deleteNote(note.id)} className="text-stone-300 hover:text-red-400 transition-colors ml-2"><Trash2 size={12} /></button>
                  </div>
                  <p className="text-sm text-stone-600 mt-0.5">{note.text}</p>
                  <p className="text-xs text-stone-300 mt-1">{new Date(note.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// PLANS TAB
// ─────────────────────────────────────────────────────────
const DEFAULT_PLANS = [
  { id: '1', name: 'Bible in a Year', duration: '365 days', daysTotal: 365, daysCompleted: 0, books: ['Genesis', 'Exodus', 'Matthew', 'Psalms', 'John', 'Romans'], active: false, description: 'Read through the entire Bible in 365 days.' },
  { id: '2', name: 'The Gospels in 90 Days', duration: '90 days', daysTotal: 90, daysCompleted: 0, books: ['Matthew', 'Mark', 'Luke', 'John'], active: false, description: 'An immersive journey through the life of Jesus.' },
  { id: '3', name: 'Psalms of Comfort', duration: '30 days', daysTotal: 30, daysCompleted: 0, books: ['Psalms'], active: false, description: 'Daily comfort from the Psalms.' },
  { id: '4', name: 'Wisdom Literature', duration: '60 days', daysTotal: 60, daysCompleted: 0, books: ['Proverbs', 'Ecclesiastes', 'Job'], active: false, description: "Explore God's wisdom for everyday life." },
  { id: '5', name: "Paul's Letters Journey", duration: '45 days', daysTotal: 45, daysCompleted: 0, books: ['Romans', '1 Corinthians', 'Ephesians', 'Philippians'], active: false, description: "Study Paul's letters to the early church." },
  { id: '6', name: 'Prophets & Kings', duration: '120 days', daysTotal: 120, daysCompleted: 0, books: ['Isaiah', 'Jeremiah', '1 Kings', 'Daniel'], active: false, description: "Journey through Israel's prophets and kings." },
  { id: '7', name: 'New Testament in 30 Days', duration: '30 days', daysTotal: 30, daysCompleted: 0, books: ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans'], active: false, description: 'A fast-paced journey through the New Testament.' },
  { id: '8', name: 'Sermon on the Mount', duration: '14 days', daysTotal: 14, daysCompleted: 0, books: ['Matthew 5-7'], active: false, description: "Deep study of Jesus' greatest sermon." },
];

export const PlansTab: React.FC = () => {
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [selectedPlan, setSelectedPlan] = useState<typeof DEFAULT_PLANS[0] | null>(null);
  const [todaysReading, setTodaysReading] = useState('');
  const [isLoadingReading, setIsLoadingReading] = useState(false);
  const [completedDays, setCompletedDays] = useState<Record<string, number[]>>({});

  useEffect(() => {
    const savedPlans = localStorage.getItem('ayumi_plans');
    if (savedPlans) setPlans(JSON.parse(savedPlans));
    const savedCompleted = localStorage.getItem('ayumi_plans_completed');
    if (savedCompleted) setCompletedDays(JSON.parse(savedCompleted));
  }, []);

  const savePlans = (updated: typeof plans) => {
    setPlans(updated);
    localStorage.setItem('ayumi_plans', JSON.stringify(updated));
  };

  const togglePlan = (planId: string) => {
    const updated = plans.map(p => p.id === planId ? { ...p, active: !p.active } : p);
    savePlans(updated);
  };

  const markDayComplete = (planId: string, day: number) => {
    const planDays = completedDays[planId] || [];
    const updated = planDays.includes(day) ? planDays.filter(d => d !== day) : [...planDays, day];
    const newCompleted = { ...completedDays, [planId]: updated };
    setCompletedDays(newCompleted);
    localStorage.setItem('ayumi_plans_completed', JSON.stringify(newCompleted));

    // Update plan progress
    const updatedPlans = plans.map(p => p.id === planId ? { ...p, daysCompleted: updated.length } : p);
    savePlans(updatedPlans);
  };

  const loadTodaysReading = async (plan: typeof DEFAULT_PLANS[0]) => {
    setIsLoadingReading(true);
    try {
      const text = await callClaude(
        `For the reading plan "${plan.name}" (${plan.books.join(', ')}), provide today's reading (day ${(completedDays[plan.id] || []).length + 1} of ${plan.daysTotal}). Give: 1) Specific passage to read, 2) A brief intro, 3) Three reflection questions. Format clearly.`,
        'You are a Bible reading plan guide. Be specific and encouraging.'
      );
      setTodaysReading(text);
    } catch (e) {
      setTodaysReading('Reading unavailable. Open your Bible and read from ' + plan.books[0] + '.');
    }
    setIsLoadingReading(false);
  };

  const activePlans = plans.filter(p => p.active);
  const inactivePlans = plans.filter(p => !p.active);

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        <h2 className="text-xl font-bold font-serif text-stone-800 mb-1">Reading Plans</h2>

        {/* Active Plans Overview */}
        {activePlans.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Active Plans</h3>
              <span className="text-xs text-emerald-600 font-bold">{activePlans.length} running</span>
            </div>
            {activePlans.map(plan => {
              const progress = plan.daysTotal > 0 ? Math.round((plan.daysCompleted / plan.daysTotal) * 100) : 0;
              const isSelected = selectedPlan?.id === plan.id;
              return (
                <div key={plan.id} className={`bg-white rounded-xl border shadow-sm mb-3 overflow-hidden transition-all ${isSelected ? 'border-emerald-400 shadow-emerald-100' : 'border-stone-200'}`}>
                  <div className="p-4" onClick={() => setSelectedPlan(isSelected ? null : plan)}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-stone-800">{plan.name}</h4>
                        <p className="text-xs text-stone-400">{plan.duration} · {plan.daysCompleted}/{plan.daysTotal} days</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-emerald-700">{progress}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {isSelected && (
                    <div className="border-t border-stone-100 p-4 bg-stone-50">
                      <div className="flex space-x-2 mb-4">
                        <button onClick={() => loadTodaysReading(plan)} className="flex-1 py-2 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors">
                          Today's Reading
                        </button>
                        <button onClick={() => markDayComplete(plan.id, plan.daysCompleted + 1)} className="flex-1 py-2 bg-stone-800 text-white rounded-lg text-sm font-bold hover:bg-stone-700 transition-colors flex items-center justify-center space-x-1">
                          <CheckCircle size={14} /><span>Mark Done</span>
                        </button>
                        <button onClick={() => togglePlan(plan.id)} className="py-2 px-3 border border-stone-300 rounded-lg text-sm text-stone-500 hover:bg-white">Pause</button>
                      </div>

                      {isLoadingReading ? (
                        <div className="text-center py-6 text-stone-400">
                          <div className="animate-spin w-6 h-6 border-2 border-stone-200 border-t-emerald-600 rounded-full mx-auto mb-2" />
                          Loading today's reading...
                        </div>
                      ) : todaysReading ? (
                        <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap font-serif">{todaysReading}</div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Available Plans */}
        <div>
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
            {activePlans.length === 0 ? 'Choose a Plan to Start' : 'More Plans'}
          </h3>
          <div className="grid gap-3">
            {inactivePlans.map(plan => (
              <div key={plan.id} className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm hover:border-stone-300 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 mr-3">
                    <h4 className="font-bold text-stone-800">{plan.name}</h4>
                    <p className="text-xs text-stone-400 mt-0.5">{plan.duration}</p>
                    <p className="text-xs text-stone-500 mt-1">{plan.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {plan.books.slice(0, 3).map(book => (
                        <span key={book} className="text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-600">{book}</span>
                      ))}
                      {plan.books.length > 3 && <span className="text-xs text-stone-400">+{plan.books.length - 3} more</span>}
                    </div>
                  </div>
                  <Calendar size={20} className="text-stone-300 flex-shrink-0 mt-1" />
                </div>
                <button onClick={() => togglePlan(plan.id)} className="w-full mt-3 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-sm font-bold transition-colors">
                  Start Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// TOPICS TAB
// ─────────────────────────────────────────────────────────
const TOPICS = [
  { name: 'Grace', verses: 342, color: 'bg-blue-50 text-blue-700 border-blue-200', emoji: '✨' },
  { name: 'Forgiveness', verses: 189, color: 'bg-green-50 text-green-700 border-green-200', emoji: '🕊️' },
  { name: 'Hope', verses: 267, color: 'bg-purple-50 text-purple-700 border-purple-200', emoji: '🌟' },
  { name: 'Love', verses: 551, color: 'bg-red-50 text-red-700 border-red-200', emoji: '❤️' },
  { name: 'Peace', verses: 234, color: 'bg-cyan-50 text-cyan-700 border-cyan-200', emoji: '☮️' },
  { name: 'Anxiety & Fear', verses: 127, color: 'bg-amber-50 text-amber-700 border-amber-200', emoji: '🛡️' },
  { name: 'Salvation', verses: 412, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', emoji: '🙌' },
  { name: 'Jesus Christ', verses: 1243, color: 'bg-rose-50 text-rose-700 border-rose-200', emoji: '✝️' },
  { name: 'Faith', verses: 623, color: 'bg-sky-50 text-sky-700 border-sky-200', emoji: '🏔️' },
  { name: 'Prayer', verses: 378, color: 'bg-teal-50 text-teal-700 border-teal-200', emoji: '🙏' },
  { name: 'Wisdom', verses: 445, color: 'bg-indigo-50 text-indigo-700 border-indigo-200', emoji: '📖' },
  { name: 'Worship', verses: 291, color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', emoji: '🎵' },
  { name: 'Marriage', verses: 156, color: 'bg-pink-50 text-pink-700 border-pink-200', emoji: '💍' },
  { name: 'Parenting', verses: 89, color: 'bg-orange-50 text-orange-700 border-orange-200', emoji: '👨‍👩‍👧' },
  { name: 'Suffering', verses: 203, color: 'bg-stone-50 text-stone-700 border-stone-300', emoji: '💧' },
  { name: 'Healing', verses: 167, color: 'bg-lime-50 text-lime-700 border-lime-200', emoji: '🌿' },
  { name: 'Holy Spirit', verses: 298, color: 'bg-violet-50 text-violet-700 border-violet-200', emoji: '🔥' },
  { name: 'Heaven', verses: 318, color: 'bg-blue-50 text-blue-800 border-blue-300', emoji: '☁️' },
  { name: 'Sin & Repentance', verses: 445, color: 'bg-stone-50 text-stone-800 border-stone-300', emoji: '🔄' },
  { name: 'Money & Wealth', verses: 214, color: 'bg-yellow-50 text-yellow-700 border-yellow-200', emoji: '💰' },
  { name: 'Identity in Christ', verses: 134, color: 'bg-emerald-50 text-emerald-800 border-emerald-200', emoji: '👑' },
  { name: 'Courage', verses: 98, color: 'bg-red-50 text-red-800 border-red-200', emoji: '⚔️' },
  { name: 'Grief & Loss', verses: 112, color: 'bg-gray-50 text-gray-700 border-gray-200', emoji: '🌧️' },
  { name: 'Work & Purpose', verses: 175, color: 'bg-amber-50 text-amber-800 border-amber-200', emoji: '⚙️' },
];

export const TopicsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[0] | null>(null);
  const [topicVerses, setTopicVerses] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customTopic, setCustomTopic] = useState('');

  const loadTopicVerses = async (topic: string) => {
    setIsLoading(true);
    setTopicVerses('');
    try {
      const text = await callClaude(
        `List 12 key Bible verses about "${topic}". For each: reference, the verse text (NASB or ESV), and a 1-sentence insight on how it relates to this topic. Group them by sub-theme if relevant. Format clearly.`,
        'You are a biblical scholar helping someone study Scripture.'
      );
      setTopicVerses(text);
    } catch (e) {
      setTopicVerses('Could not load verses. Please try again.');
    }
    setIsLoading(false);
  };

  const filteredTopics = searchQuery
    ? TOPICS.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : TOPICS;

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="flex-1 overflow-y-auto pb-24">
        {selectedTopic ? (
          <div>
            <div className={`p-5 ${selectedTopic.color} border-b`}>
              <button onClick={() => { setSelectedTopic(null); setTopicVerses(''); }} className="text-sm opacity-60 mb-2 flex items-center">← Back</button>
              <div className="text-3xl mb-1">{selectedTopic.emoji}</div>
              <h2 className="text-2xl font-bold font-serif">{selectedTopic.name}</h2>
              <p className="text-sm opacity-70">{selectedTopic.verses} verses</p>
              {!topicVerses && (
                <button onClick={() => loadTopicVerses(selectedTopic.name)} className="mt-3 px-4 py-2 bg-stone-800 text-white rounded-lg text-sm font-bold hover:bg-stone-700">
                  Load Key Verses
                </button>
              )}
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="text-center py-12 text-stone-400">
                  <div className="animate-spin w-8 h-8 border-2 border-stone-200 border-t-emerald-600 rounded-full mx-auto mb-3" />
                  Loading verses on {selectedTopic.name}...
                </div>
              ) : topicVerses ? (
                <div className="text-sm text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">{topicVerses}</div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-xl font-bold font-serif text-stone-800 mb-1">Biblical Topics</h2>
            <p className="text-sm text-stone-500 mb-4">Explore scripture by theme</p>

            <div className="relative mb-4">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search topics..." className="w-full pl-9 pr-3 py-2.5 border border-stone-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
            </div>

            {/* Custom topic search */}
            <div className="bg-white rounded-xl border border-stone-200 p-3 mb-4 flex space-x-2 shadow-sm">
              <input value={customTopic} onChange={e => setCustomTopic(e.target.value)} placeholder="Any topic (e.g. loneliness, pride, joy...)" className="flex-1 text-sm border-none focus:outline-none" />
              <button onClick={() => { if (customTopic) { setSelectedTopic({ name: customTopic, verses: 0, color: 'bg-stone-50 text-stone-700 border-stone-200', emoji: '🔍' }); loadTopicVerses(customTopic); } }} className="px-3 py-1.5 bg-stone-800 text-white text-xs rounded-lg font-bold">Search</button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredTopics.map(topic => (
                <button key={topic.name} onClick={() => { setSelectedTopic(topic); loadTopicVerses(topic.name); }} className={`px-3 py-3 ${topic.color} border rounded-xl text-left hover:shadow-md active:scale-95 transition-all`}>
                  <div className="text-lg mb-1">{topic.emoji}</div>
                  <div className="font-bold text-sm">{topic.name}</div>
                  <div className="text-xs opacity-60 mt-0.5">{topic.verses} verses</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SAVED TAB
// ─────────────────────────────────────────────────────────
interface SavedItem {
  id: string;
  type: 'verse' | 'devotional' | 'prayer' | 'note';
  title: string;
  content: string;
  reference?: string;
  category: string;
  dateAdded: string;
  isFavorite?: boolean;
}

const DEFAULT_SAVED: SavedItem[] = [
  { id: 's1', type: 'verse', title: 'Philippians 4:13', content: 'I can do all things through Christ who strengthens me.', reference: 'Philippians 4:13', category: 'Strength', dateAdded: new Date().toISOString(), isFavorite: true },
  { id: 's2', type: 'verse', title: 'Psalm 23:1', content: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1', category: 'Comfort', dateAdded: new Date().toISOString() },
  { id: 's3', type: 'verse', title: 'John 3:16', content: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.', reference: 'John 3:16', category: 'Gospel', dateAdded: new Date().toISOString(), isFavorite: true },
  { id: 's4', type: 'verse', title: 'Romans 8:28', content: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', reference: 'Romans 8:28', category: 'Providence', dateAdded: new Date().toISOString() },
];

export const SavedTab: React.FC = () => {
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('ayumi_saved_items');
    setSaved(stored ? JSON.parse(stored) : DEFAULT_SAVED);
  }, []);

  const deleteItem = (id: string) => {
    const updated = saved.filter(s => s.id !== id);
    setSaved(updated);
    localStorage.setItem('ayumi_saved_items', JSON.stringify(updated));
  };

  const toggleFavorite = (id: string) => {
    const updated = saved.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s);
    setSaved(updated);
    localStorage.setItem('ayumi_saved_items', JSON.stringify(updated));
  };

  const copyItem = (item: SavedItem) => {
    navigator.clipboard.writeText(`"${item.content}"${item.reference ? ` — ${item.reference}` : ''}`);
  };

  const shareItem = async (item: SavedItem) => {
    const text = `"${item.content}"${item.reference ? `\n— ${item.reference}` : ''}\n\nShared from Ayumi - Walking with God`;
    if (navigator.share) await navigator.share({ text });
    else navigator.clipboard.writeText(text);
  };

  const filtered = saved.filter(s => {
    const matchType = filterType === 'all' || s.type === filterType;
    const matchSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const types = ['all', 'verse', 'devotional', 'prayer', 'note'];
  const counts = { all: saved.length, verse: saved.filter(s => s.type === 'verse').length, devotional: saved.filter(s => s.type === 'devotional').length, prayer: saved.filter(s => s.type === 'prayer').length, note: saved.filter(s => s.type === 'note').length };

  const typeIcon: Record<string, string> = { verse: '📖', devotional: '☀️', prayer: '🙏', note: '✍️' };
  const typeColor: Record<string, string> = { verse: 'bg-blue-50 text-blue-700', devotional: 'bg-amber-50 text-amber-700', prayer: 'bg-pink-50 text-pink-700', note: 'bg-green-50 text-green-700' };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        <h2 className="text-xl font-bold font-serif text-stone-800 mb-1">Saved</h2>
        <p className="text-sm text-stone-500 mb-4">Your personal collection</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {types.slice(1).map(t => (
            <div key={t} className="bg-white rounded-xl p-2.5 text-center border border-stone-100 shadow-sm">
              <div className="text-lg">{typeIcon[t]}</div>
              <div className="text-base font-bold text-stone-700">{counts[t as keyof typeof counts]}</div>
              <div className="text-xs text-stone-400 capitalize">{t}s</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search saved items..." className="w-full pl-9 pr-3 py-2.5 border border-stone-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>

        {/* Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {types.map(t => (
            <button key={t} onClick={() => setFilterType(t)} className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full capitalize transition-colors ${filterType === t ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600'}`}>
              {t === 'all' ? 'All' : `${typeIcon[t]} ${t}s`}
            </button>
          ))}
        </div>

        {/* Items */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <Bookmark size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nothing saved yet</p>
            <p className="text-xs mt-1 text-stone-300">Bookmark verses and content from Read, Devotional, and Prayer tabs</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${typeColor[item.type] || 'bg-stone-50 text-stone-600'}`}>
                        {typeIcon[item.type]} {item.type}
                      </span>
                      <span className="text-xs text-stone-400">{item.category}</span>
                    </div>
                    <button onClick={() => toggleFavorite(item.id)} className="p-1">
                      <Heart size={15} className={item.isFavorite ? 'fill-pink-400 text-pink-400' : 'text-stone-200'} />
                    </button>
                  </div>
                  <h3 className="font-bold text-stone-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-600 font-serif leading-relaxed italic">"{item.content}"</p>
                </div>
                <div className="flex border-t border-stone-50 px-4 py-2 space-x-3 items-center">
                  <span className="text-xs text-stone-300 flex-1">{new Date(item.dateAdded).toLocaleDateString()}</span>
                  <button onClick={() => copyItem(item)} className="text-stone-300 hover:text-stone-600 transition-colors p-1"><Copy size={14} /></button>
                  <button onClick={() => shareItem(item)} className="text-stone-300 hover:text-stone-600 transition-colors p-1"><Share2 size={14} /></button>
                  <button onClick={() => deleteItem(item.id)} className="text-stone-200 hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
