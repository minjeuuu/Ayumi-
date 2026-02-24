import React, { useState } from 'react';
import { HomeDashboardContent, Tab } from '../../types';
import { 
  BookOpen, Heart, ArrowRight, Sun, Anchor, Droplets, 
  History, Gift, ChevronDown, ChevronUp, Share2, Bookmark, 
  Highlighter, PenTool, Sparkles 
} from 'lucide-react';

interface HomeTabProps {
  content: HomeDashboardContent | null;
  onNavigate: (tab: Tab) => void;
}

// --- Reusable Expandable Section Component ---
const Section: React.FC<{
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
  color?: string;
}> = ({ title, icon, children, expandedContent, color = "text-stone-800" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden transition-all duration-300">
      <div 
        className="p-5 cursor-pointer hover:bg-stone-50/50 transition-colors"
        onClick={() => expandedContent && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {icon && <div className={`${color} opacity-80`}>{icon}</div>}
            <h3 className={`text-xs font-bold uppercase tracking-widest ${color} opacity-70`}>{title}</h3>
          </div>
          {expandedContent && (
            <div className="text-stone-300">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          )}
        </div>
        <div className="font-serif text-stone-700 leading-relaxed">
          {children}
        </div>
      </div>
      
      {/* Expanded Area */}
      {isExpanded && expandedContent && (
        <div className="bg-stone-50 border-t border-stone-100 p-5 animate-fadeIn">
          {expandedContent}
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
const HomeTab: React.FC<HomeTabProps> = ({ content, onNavigate }) => {
  if (!content) return <div className="p-8 text-center text-stone-400 animate-pulse">Gathering spiritual nourishment...</div>;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-4 pb-32 fade-in bg-stone-50/30 min-h-full px-2 pt-2">
      
      {/* TOP LAYER: Date & Header */}
      <div className="flex justify-between items-end px-3 py-4">
        <div>
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-widest">{today}</h2>
          <h1 className="text-2xl font-serif text-stone-800">Walking with God</h1>
        </div>
        <div className="text-xs font-medium text-stone-400 bg-white border border-stone-200 px-3 py-1 rounded-full shadow-sm">
          Day 12
        </div>
      </div>

      {/* SECTION 1: Verse of the Day */}
      <Section 
        title="Verse of the Day" 
        icon={<Sun size={18} />}
        color="text-primary"
        expandedContent={
          <div className="space-y-4 text-sm text-stone-600">
            <div>
              <span className="font-bold text-stone-700">Context: </span>
              {content.verse.context}
            </div>
            <div>
              <span className="font-bold text-stone-700">Gospel Connection: </span>
              {content.verse.gospelConnection}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {content.verse.crossReferences?.map((ref, i) => (
                <span key={i} className="bg-white border border-stone-200 px-2 py-1 rounded text-xs text-stone-500">{ref}</span>
              ))}
            </div>
            <div className="flex space-x-4 pt-2 border-t border-stone-200/50 mt-2">
              <button className="flex items-center text-xs text-stone-500 hover:text-primary"><BookOpen size={14} className="mr-1"/> Read Chapter</button>
              <button className="flex items-center text-xs text-stone-500 hover:text-primary"><Bookmark size={14} className="mr-1"/> Save</button>
              <button className="flex items-center text-xs text-stone-500 hover:text-primary"><Share2 size={14} className="mr-1"/> Share</button>
            </div>
          </div>
        }
      >
        <p className="text-xl md:text-2xl italic text-stone-800 mb-2 text-center leading-relaxed">"{content.verse.text}"</p>
        <p className="text-center text-sm text-stone-500 font-sans font-medium">{content.verse.reference}</p>
      </Section>

      {/* SECTION 2: Passage of the Day */}
      <Section 
        title="Passage of the Day" 
        icon={<BookOpen size={18} />}
        expandedContent={
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs text-stone-500 bg-white p-3 rounded-lg border border-stone-100">
              <div><span className="font-bold block text-stone-700">Author</span> {content.passage.author}</div>
              <div><span className="font-bold block text-stone-700">Setting</span> {content.passage.historicalSetting}</div>
            </div>
            <div>
               <h4 className="font-bold text-xs uppercase text-stone-400 mb-2">Outline</h4>
               <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                 {content.passage.outline?.map((point, i) => <li key={i}>{point}</li>)}
               </ul>
            </div>
            <button 
              onClick={() => onNavigate(Tab.READ)}
              className="w-full py-2 bg-stone-800 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              Read Full Passage
            </button>
          </div>
        }
      >
        <div className="line-clamp-4 text-stone-600 leading-7">
          {content.passage.text}
        </div>
        <p className="text-xs text-stone-400 mt-2 text-right">{content.passage.reference}</p>
      </Section>

      {/* SECTION 3: Daily Devotional Core */}
      <Section 
        title="Daily Devotional" 
        icon={<Droplets size={18} />}
        color="text-amber-600"
        expandedContent={
          <div className="space-y-5 prose prose-stone text-sm">
            <p className="leading-7">{content.devotional.longReflection}</p>
            <div className="bg-white p-4 rounded-lg border-l-4 border-amber-500 italic text-stone-600">
              "{content.devotional.application}"
            </div>
            <div className="pt-2">
               <h4 className="font-bold text-xs uppercase text-stone-400 mb-2">Guided Prayer</h4>
               <p className="text-stone-700 italic">{content.devotional.prayerGuide}</p>
            </div>
          </div>
        }
      >
        <h3 className="text-lg font-bold text-stone-800 mb-2">{content.devotional.title}</h3>
        <p className="text-stone-600 leading-7 line-clamp-3">{content.devotional.shortReflection}</p>
        <div className="mt-3 text-xs text-primary font-bold flex items-center cursor-pointer hover:underline">
          Read Devotional <ArrowRight size={12} className="ml-1" />
        </div>
      </Section>

      {/* SECTION 4: Reflection Questions */}
      <Section title="Reflection" icon={<PenTool size={18} />}>
        <div className="space-y-4">
          {[
            { label: "Heart Check", text: content.questions.heartCheck },
            { label: "Belief Check", text: content.questions.beliefCheck },
            { label: "Obedience", text: content.questions.obedienceCheck }
          ].map((q, i) => (
            <div key={i} className="group">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase mb-1">{q.label}</h4>
              <p className="text-stone-700 italic border-l-2 border-stone-200 pl-3 py-1 group-hover:border-primary transition-colors cursor-text">
                {q.text}
              </p>
            </div>
          ))}
          <button 
            onClick={() => onNavigate(Tab.JOURNAL)}
            className="text-xs text-stone-500 bg-stone-100 px-3 py-2 rounded w-full hover:bg-stone-200 transition-colors"
          >
            Answer in Journal
          </button>
        </div>
      </Section>

      {/* SECTION 5: Prayer Focus */}
      <Section 
        title="Prayer Focus" 
        icon={<Anchor size={18} />} 
        color="text-blue-600"
        expandedContent={
          <div className="text-sm">
            <p className="mb-3 text-stone-600">{content.prayer.guidedPrayer}</p>
            <button 
              onClick={() => onNavigate(Tab.PRAYER)}
              className="w-full py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Start Prayer Mode
            </button>
          </div>
        }
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-lg font-serif text-stone-800">{content.prayer.focusTheme}</span>
            <span className="text-xs text-stone-400">{content.prayer.scripture}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
             <ArrowRight size={16} />
          </div>
        </div>
      </Section>

      {/* GRID SECTION: Theme & Attribute */}
      <div className="grid grid-cols-2 gap-4">
        {/* SECTION 6: Theme */}
        <div className="bg-stone-800 text-stone-50 rounded-xl p-5 shadow-sm">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Theme</h3>
           <p className="text-xl font-serif mb-2">{content.theme.theme}</p>
           <p className="text-[10px] text-stone-400 mb-4">{content.theme.keyVerse}</p>
           <div className="flex flex-wrap gap-1">
             {content.theme.supportingVerses?.slice(0, 2).map((v, i) => (
               <span key={i} className="text-[9px] border border-stone-600 px-1.5 py-0.5 rounded">{v}</span>
             ))}
           </div>
        </div>

        {/* SECTION 7: Attribute */}
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex flex-col justify-center text-center">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">God Is</h3>
           <p className="text-xl font-serif text-primary mb-1">{content.attribute.attribute}</p>
           <p className="text-[10px] text-stone-500 leading-tight">{content.attribute.definition}</p>
        </div>
      </div>

      {/* SECTION 8: Gospel Reminder */}
      <div className="bg-stone-100 rounded-xl p-5 border-l-4 border-stone-300">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Gospel Truth</h3>
        <p className="font-serif text-stone-800 italic mb-2">"{content.gospel.truth}"</p>
        <p className="text-xs text-stone-500 leading-relaxed">{content.gospel.explanation} <span className="font-bold text-stone-400">({content.gospel.reference})</span></p>
      </div>

      {/* SECTION 9: History */}
      <Section title="Scripture History" icon={<History size={18} />}>
        <div className="flex items-start space-x-3">
          <div className="flex-1">
             <p className="font-bold text-stone-800 text-sm">{content.history.event}</p>
             <p className="text-xs text-stone-500 mt-1">{content.history.description}</p>
             <div className="mt-3 flex items-center text-[10px] text-stone-400 space-x-2">
                <span>{content.history.timeline.before}</span>
                <span className="w-4 h-[1px] bg-stone-300"></span>
                <span className="text-stone-600 font-bold">{content.history.timeline.during}</span>
                <span className="w-4 h-[1px] bg-stone-300"></span>
                <span>{content.history.timeline.after}</span>
             </div>
          </div>
        </div>
      </Section>

      {/* SECTION 10: Surprise Me */}
      <button className="w-full py-4 rounded-xl border-2 border-dashed border-stone-300 text-stone-400 font-serif italic hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2">
         <Gift size={18} />
         <span>Surprise me with Grace</span>
      </button>

      {/* SECTION 11: Stats */}
      <div className="flex justify-between items-center px-4 py-2 text-xs text-stone-400 font-medium">
         <span>1 Verse Read</span>
         <span>•</span>
         <span>0 Prayers</span>
         <span>•</span>
         <span>Step Pending</span>
      </div>

      {/* SECTION 12: Saved Preview */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex space-x-3 w-max px-1">
           <div className="w-48 bg-white p-3 rounded-lg border border-stone-100 opacity-60">
             <div className="h-2 w-12 bg-stone-100 rounded mb-2"></div>
             <div className="text-xs text-stone-300 italic">No saved items yet...</div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default HomeTab;