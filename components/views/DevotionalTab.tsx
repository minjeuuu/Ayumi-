import React, { useState } from 'react';
import DevotionalCard from '../DevotionalCard';
import { DevotionalContent } from '../../types';
import { Sparkles, RefreshCw, Share2, Bookmark, Download } from 'lucide-react';
import { callClaude } from '../../services/claudeService';

interface DevotionalTabProps {
  initialContent: DevotionalContent | null;
  theme?: string;
}

const DevotionalTab: React.FC<DevotionalTabProps> = ({ initialContent, theme = 'light' }) => {
  const [content, setContent] = useState<DevotionalContent | null>(initialContent);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [saved, setSaved] = useState(false);

  const topics = ['Anxiety', 'Peace', 'Joy', 'Patience', 'Grief', 'Hope', 'Forgiveness', 'Guidance', 'Love', 'Strength', 'Wisdom', 'Trust', 'Healing', 'Surrender', 'Praise', 'Rest'];

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setIsStepCompleted(false);
    setSaved(false);

    try {
      const prompt = `Create a short Christian devotional on the topic of "${topic}". Return ONLY a JSON object with these exact fields:
{
  "title": "devotional title",
  "scripture": { "text": "verse text", "reference": "Book Chapter:Verse (Version)" },
  "reflection": "2-3 paragraphs of devotional reflection",
  "prayer": "a prayer paragraph",
  "stepOfFaith": "a practical step of faith for today",
  "tags": ["${topic.toLowerCase()}", "devotional"]
}`;

      const response = await callClaude(prompt);
      const clean = response.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setContent(parsed);
    } catch (error) {
      console.error('Devotional generation error:', error);
      setContent({
        title: `Walking in ${topic}`,
        scripture: {
          text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
          reference: "Proverbs 3:5 (ESV)"
        },
        reflection: `God invites us to explore the depths of ${topic.toLowerCase()} through His Word. In every season of life, His character remains the anchor for our souls. As we meditate on ${topic.toLowerCase()}, we discover that God's nature never changes - He is the same yesterday, today, and forever.`,
        prayer: `Lord, teach me more about ${topic.toLowerCase()}. Open my eyes to see Your truth in this area of my life. Help me to walk in the fullness of what You have for me. Amen.`,
        stepOfFaith: `Spend 5 minutes in silence, asking God to reveal a deeper understanding of ${topic.toLowerCase()} in your life today.`,
        tags: [topic.toLowerCase(), 'devotional', 'daily']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (content) {
      const saved = JSON.parse(localStorage.getItem('ayumi_saved_devotionals') || '[]');
      saved.unshift({
        ...content,
        savedDate: new Date().toISOString(),
        topic
      });
      localStorage.setItem('ayumi_saved_devotionals', JSON.stringify(saved));
      setSaved(true);
    }
  };

  const handleShare = async () => {
    if (content && navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: `${content.title}\n\n"${content.scripture.text}" - ${content.scripture.reference}\n\n${content.reflection}\n\nPrayer: ${content.prayer}\n\n- Ayumi: Walking with God`,
        });
      } catch (e) {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <h1 className="text-2xl font-serif text-stone-800 mb-6">Devotionals</h1>

      {/* Generator Section */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm mb-6">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 block">Create a topical devotional</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
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
            className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full"></div>
            ) : (
              <Sparkles size={18} />
            )}
            Generate
          </button>
        </div>
      </div>

      {/* Content */}
      {content && !loading ? (
        <div>
          {/* Action buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={handleSave}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${saved ? 'bg-primary/10 text-primary' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
            >
              <Bookmark size={16} /> {saved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-stone-100 text-stone-500 hover:bg-stone-200"
            >
              <Share2 size={16} /> Share
            </button>
          </div>

          <DevotionalCard
            content={content}
            isStepCompleted={isStepCompleted}
            onToggleStep={() => setIsStepCompleted(!isStepCompleted)}
          />

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 px-2">
              {content.tags.map(tag => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
          )}

          {/* Generate another */}
          <div className="text-center mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="inline-flex items-center gap-2 px-4 py-2 text-stone-500 hover:text-primary text-sm"
            >
              <RefreshCw size={16} /> Generate another on "{topic}"
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-stone-400">
          <div className="animate-spin mb-4 text-primary"><Sparkles size={32} /></div>
          <p className="font-serif italic">Seeking wisdom on {topic}...</p>
          <p className="text-xs text-stone-400 mt-2">AI is crafting your devotional</p>
        </div>
      ) : (
        <div className="text-center py-12 text-stone-400">
          <Sparkles className="mx-auto mb-4" size={40} />
          <p className="font-serif">Select a topic to generate a devotional</p>
          <p className="text-xs mt-2">Powered by Claude AI</p>
        </div>
      )}
    </div>
  );
};

export default DevotionalTab;
