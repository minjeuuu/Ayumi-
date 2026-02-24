import React, { useState, useEffect } from 'react';
import { Lock, Bookmark, Calendar, Tag, Library, Book, Heart, Clock, TrendingUp, Award, Target } from 'lucide-react';

const BACKEND_URL = window.location.origin;

export const StudyTab = () => {
  const [bibleVersions, setBibleVersions] = useState<any[]>([]);
  const [selectedVersion, setSelectedVersion] = useState('ESV');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/bible/versions`)
      .then(r => r.json())
      .then(data => setBibleVersions(data.versions || []))
      .catch(e => console.error(e));
  }, []);

  const studyTools = [
    { name: 'Verse Comparison', description: 'Compare across translations', icon: Book },
    { name: 'Word Study', description: 'Original language insights', icon: Tag },
    { name: 'Cross References', description: 'Related passages', icon: TrendingUp },
    { name: 'Commentaries', description: 'Scholar perspectives', icon: Library },
    { name: 'Timeline', description: 'Historical context', icon: Clock },
    { name: 'Maps', description: 'Biblical geography', icon: Target },
  ];

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <h1 className="text-2xl font-serif text-stone-800 mb-6">Bible Study Tools</h1>
      
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl mb-6 border border-primary/20">
        <h3 className="font-serif text-lg text-stone-800 mb-2">Study with Depth</h3>
        <p className="text-sm text-stone-600 mb-4">Access {bibleVersions.length}+ Bible versions and powerful study tools</p>
        <select 
          className="w-full p-3 rounded-xl border border-stone-200 bg-white font-serif"
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
        >
          {bibleVersions.slice(0, 20).map(v => (
            <option key={v.id} value={v.abbreviation}>{v.name} ({v.abbreviation})</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {studyTools.map((tool, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 hover:border-primary/50 cursor-pointer transition-all hover:shadow-md">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 text-primary">
              <tool.icon size={20} />
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-700 mb-1">{tool.name}</h4>
            <p className="text-xs text-stone-500">{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-200">
        <div className="flex items-center gap-3 mb-3">
          <Award className="text-primary" size={20} />
          <h4 className="font-serif font-bold text-stone-700">Study Achievements</h4>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-600">Books Read</span>
            <span className="font-bold text-primary">4/66</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-600">Verses Studied</span>
            <span className="font-bold text-primary">287</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-600">Study Streak</span>
            <span className="font-bold text-primary">12 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlansTab = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Bible in a Year', duration: '365 days', progress: 12, books: ['Genesis', 'Exodus', 'Matthew', 'Psalms'], active: true },
    { id: 2, name: 'The Gospels in 90 Days', duration: '90 days', progress: 0, books: ['Matthew', 'Mark', 'Luke', 'John'], active: false },
    { id: 3, name: 'Psalms of Comfort', duration: '30 days', progress: 45, books: ['Psalms'], active: true },
    { id: 4, name: 'Wisdom Literature', duration: '60 days', progress: 0, books: ['Proverbs', 'Ecclesiastes', 'Job'], active: false },
    { id: 5, name: 'Paul Letters Journey', duration: '45 days', progress: 0, books: ['Romans', 'Corinthians', 'Ephesians'], active: false },
    { id: 6, name: 'Prophets and Kings', duration: '120 days', progress: 0, books: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'], active: false },
  ]);

  const startPlan = (planId: number) => {
    setPlans(plans.map(p => p.id === planId ? { ...p, active: true } : p));
  };

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <h1 className="text-2xl font-serif text-stone-800 mb-6">Reading Plans</h1>
      
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-5 rounded-2xl mb-6 border border-primary/20">
        <h3 className="font-serif text-lg text-stone-800 mb-2">Active Plans</h3>
        <p className="text-sm text-stone-600 mb-3">You have {plans.filter(p => p.active).length} active reading plans</p>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/80 p-3 rounded-lg">
            <div className="text-xs text-stone-500 mb-1">Total Progress</div>
            <div className="text-2xl font-bold text-primary">{Math.round(plans.filter(p => p.active).reduce((a, b) => a + b.progress, 0) / plans.filter(p => p.active).length)}%</div>
          </div>
          <div className="flex-1 bg-white/80 p-3 rounded-lg">
            <div className="text-xs text-stone-500 mb-1">Days Reading</div>
            <div className="text-2xl font-bold text-primary">45</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {plans.map(plan => (
          <div key={plan.id} className={`bg-white p-5 rounded-xl border ${plan.active ? 'border-primary/50 shadow-md' : 'border-stone-200'} transition-all`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-serif text-lg text-stone-700 mb-1">{plan.name}</h3>
                <p className="text-xs text-stone-400 mb-2">{plan.duration}</p>
                <div className="flex flex-wrap gap-1">
                  {plan.books.map(book => (
                    <span key={book} className="text-xs bg-stone-100 px-2 py-1 rounded">
                      {book}
                    </span>
                  ))}
                </div>
              </div>
              <Calendar className={`${plan.active ? 'text-primary' : 'text-stone-300'}`} size={20} />
            </div>

            {plan.active && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-stone-500 mb-1">
                  <span>Progress</span>
                  <span>{plan.progress}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${plan.progress}%` }}></div>
                </div>
              </div>
            )}

            {!plan.active && (
              <button 
                onClick={() => startPlan(plan.id)}
                className="mt-3 w-full py-2 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700 transition-colors"
              >
                Start Plan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TopicsTab = () => {
  const topics = [
    { name: 'Grace', verses: 342, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Forgiveness', verses: 189, color: 'bg-green-50 text-green-700 border-green-200' },
    { name: 'Hope', verses: 267, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Love', verses: 551, color: 'bg-red-50 text-red-700 border-red-200' },
    { name: 'Peace', verses: 234, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { name: 'Anxiety', verses: 127, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Salvation', verses: 412, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'Jesus Christ', verses: 1243, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { name: 'Creation', verses: 178, color: 'bg-lime-50 text-lime-700 border-lime-200' },
    { name: 'Prophecy', verses: 298, color: 'bg-violet-50 text-violet-700 border-violet-200' },
    { name: 'Marriage', verses: 156, color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { name: 'Parenting', verses: 89, color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { name: 'Wisdom', verses: 445, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'Faith', verses: 623, color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { name: 'Prayer', verses: 378, color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { name: 'Worship', verses: 291, color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
  ];

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <h1 className="text-2xl font-serif text-stone-800 mb-6">Biblical Topics</h1>
      
      <div className="bg-white p-5 rounded-xl border border-stone-200 mb-6">
        <input 
          type="text" 
          placeholder="Search topics..." 
          className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {topics.map(topic => (
          <div key={topic.name} className={`px-4 py-3 ${topic.color} border rounded-xl cursor-pointer hover:shadow-md transition-all`}>
            <div className="font-serif font-bold text-sm mb-1">{topic.name}</div>
            <div className="text-xs opacity-70">{topic.verses} verses</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-5 bg-stone-50 rounded-xl border border-stone-200">
        <h3 className="font-serif font-bold text-stone-700 mb-3 flex items-center gap-2">
          <Heart size={18} className="text-primary" />
          Popular This Week
        </h3>
        <div className="space-y-2">
          {['Love', 'Grace', 'Faith', 'Peace', 'Salvation'].map((topic, i) => (
            <div key={topic} className="flex justify-between items-center text-sm">
              <span className="text-stone-600">{i + 1}. {topic}</span>
              <span className="text-xs text-stone-400">Trending</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SavedTab = () => {
  const savedItems = [
    { type: 'verse', title: 'Philippians 4:13', content: 'I can do all things through Christ who strengthens me.', date: '2 days ago', category: 'Strength' },
    { type: 'devotional', title: 'Walking by Faith', content: 'A reflection on trusting God in uncertain times...', date: '1 week ago', category: 'Faith' },
    { type: 'verse', title: 'Psalm 23:1', content: 'The Lord is my shepherd; I shall not want.', date: '1 week ago', category: 'Comfort' },
    { type: 'prayer', title: 'Morning Prayer', content: 'Lord, guide my steps today and help me to walk in Your ways...', date: '2 weeks ago', category: 'Prayer' },
    { type: 'verse', title: 'John 3:16', content: 'For God so loved the world that He gave His only begotten Son...', date: '3 weeks ago', category: 'Love' },
  ];

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <h1 className="text-2xl font-serif text-stone-800 mb-6">Saved Content</h1>
      
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-white p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-xs text-stone-500">Verses</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-2xl font-bold text-primary">8</div>
          <div className="text-xs text-stone-500">Devotionals</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-stone-200 text-center">
          <div className="text-2xl font-bold text-primary">5</div>
          <div className="text-xs text-stone-500">Prayers</div>
        </div>
      </div>

      <div className="space-y-3">
        {savedItems.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif font-bold text-stone-700">{item.title}</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{item.category}</span>
            </div>
            <p className="text-sm text-stone-600 mb-2 line-clamp-2">{item.content}</p>
            <div className="flex justify-between items-center text-xs text-stone-400">
              <span>{item.date}</span>
              <Bookmark size={14} className="text-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
