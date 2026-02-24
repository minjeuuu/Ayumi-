import React from 'react';
import { Lock, Bookmark, Calendar, Tag, Library } from 'lucide-react';

const PlaceholderView: React.FC<{ title: string, icon: any, desc: string }> = ({ title, icon: Icon, desc }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 text-center fade-in pb-24 pt-20">
    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-400">
      <Icon size={32} />
    </div>
    <h2 className="text-2xl font-serif text-stone-700 mb-3">{title}</h2>
    <p className="text-stone-500 mb-8 font-light max-w-xs">{desc}</p>
    <button className="px-6 py-2 bg-stone-800 text-white rounded-full text-sm hover:bg-stone-700 transition-colors">
      Coming Soon
    </button>
  </div>
);

export const StudyTab = () => (
  <PlaceholderView 
    title="Bible Study" 
    icon={Library} 
    desc="Deep dive tools, commentaries, and original language references are being prepared."
  />
);

export const PlansTab = () => (
  <div className="pb-24 px-4 pt-6 fade-in">
    <h1 className="text-2xl font-serif text-stone-800 mb-6">Reading Plans</h1>
    <div className="grid gap-4">
      {['Bible in a Year', 'The Gospels in 90 Days', 'Psalms of Comfort'].map(plan => (
        <div key={plan} className="bg-white p-5 rounded-xl border border-stone-200 flex justify-between items-center group cursor-pointer hover:border-primary/50">
          <div>
            <h3 className="font-serif text-lg text-stone-700">{plan}</h3>
            <p className="text-xs text-stone-400 mt-1">Start this journey</p>
          </div>
          <Calendar className="text-stone-300 group-hover:text-primary" />
        </div>
      ))}
    </div>
  </div>
);

export const TopicsTab = () => (
  <div className="pb-24 px-4 pt-6 fade-in">
    <h1 className="text-2xl font-serif text-stone-800 mb-6">Topics</h1>
    <div className="flex flex-wrap gap-2">
      {['Grace', 'Forgiveness', 'Hope', 'Love', 'Peace', 'Anxiety', 'Salvation', 'Jesus', 'Creation', 'Prophecy', 'Marriage', 'Parenting'].map(topic => (
        <span key={topic} className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-stone-600 font-serif hover:border-primary hover:text-primary cursor-pointer transition-colors">
          {topic}
        </span>
      ))}
    </div>
  </div>
);

export const SavedTab = () => (
   <PlaceholderView 
    title="Your Library" 
    icon={Bookmark} 
    desc="Your highlighted verses and saved devotionals will appear here."
  />
);