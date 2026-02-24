import React, { useState } from 'react';
import { generateDailyDevotional } from '../../services/geminiService';
import DevotionalCard from '../DevotionalCard';
import { DevotionalContent } from '../../types';
import { Sparkles } from 'lucide-react';

interface DevotionalTabProps {
  initialContent: DevotionalContent | null;
}

const DevotionalTab: React.FC<DevotionalTabProps> = ({ initialContent }) => {
  const [content, setContent] = useState<DevotionalContent | null>(initialContent);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    const newContent = await generateDailyDevotional(topic);
    setContent(newContent);
    setLoading(false);
  };

  const topics = ['Anxiety', 'Peace', 'Joy', 'Patience', 'Grief', 'Hope', 'Forgiveness', 'Guidance'];

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <h1 className="text-2xl font-serif text-stone-800 mb-6">Devotionals</h1>

      {/* Generator Section */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm mb-8">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 block">Create a topical devotional</label>
        <div className="flex space-x-2 mb-4 overflow-x-auto no-scrollbar pb-2">
           {topics.map(t => (
             <button 
               key={t}
               onClick={() => setTopic(t)}
               className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm border transition-colors ${
                 topic === t ? 'bg-primary text-white border-primary' : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
               }`}
             >
               {t}
             </button>
           ))}
        </div>
        <div className="flex gap-2">
           <input 
             type="text" 
             value={topic}
             onChange={(e) => setTopic(e.target.value)}
             placeholder="Or type a specific topic..."
             className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-stone-700 focus:outline-none focus:ring-1 focus:ring-primary"
           />
           <button 
             onClick={handleGenerate}
             disabled={loading || !topic}
             className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center"
           >
             {loading ? <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full"></div> : <Sparkles size={18} />}
           </button>
        </div>
      </div>

      {content && !loading ? (
        <DevotionalCard content={content} isStepCompleted={false} onToggleStep={() => {}} />
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-stone-400">
           <div className="animate-spin mb-4 text-primary"><Sparkles size={32} /></div>
           <p className="font-serif italic">Seeking wisdom...</p>
        </div>
      ) : null}
    </div>
  );
};

export default DevotionalTab;