import React, { useState, useEffect, useRef } from 'react';
import { PenLine } from 'lucide-react';

interface JournalEntryProps {
  initialText: string;
  onSave: (text: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ initialText, onSave }) => {
  const [text, setText] = useState(initialText);
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    
    // Debounce save
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setIsSaving(true);
    timeoutRef.current = setTimeout(() => {
      onSave(newText);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-12 fade-in">
      <div className="flex items-center space-x-2 mb-4 px-2">
        <PenLine size={18} className="text-stone-400" />
        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Your Thoughts</h3>
        {isSaving && <span className="text-xs text-stone-300 italic ml-auto">Saving...</span>}
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Reflect on today's word..."
        className="w-full h-32 p-4 rounded-lg border border-stone-200 bg-white text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 resize-none font-serif leading-relaxed shadow-sm transition-all"
      />
    </div>
  );
};

export default JournalEntry;