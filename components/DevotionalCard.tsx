import React from 'react';
import { DevotionalContent } from '../types';
import { BookOpen, CheckCircle2, Circle } from 'lucide-react';

interface DevotionalCardProps {
  content: DevotionalContent;
  isStepCompleted: boolean;
  onToggleStep: () => void;
}

const DevotionalCard: React.FC<DevotionalCardProps> = ({ content, isStepCompleted, onToggleStep }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden fade-in mx-auto">
      {/* Title Section */}
      <div className="p-8 pb-4 text-center border-b border-stone-50 bg-stone-50/50">
        <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-2">{content.title}</h2>
        <div className="w-12 h-0.5 bg-primary/30 mx-auto my-4"></div>
      </div>

      {/* Scripture Section */}
      <div className="p-8 md:p-10 bg-white">
        <div className="mb-8">
          <div className="flex justify-center mb-4 text-primary">
            <BookOpen size={20} strokeWidth={1.5} />
          </div>
          <blockquote className="text-lg md:text-xl font-serif leading-relaxed text-center text-stone-700 italic">
            "{content.scripture.text}"
          </blockquote>
          <p className="text-center text-sm font-sans text-stone-400 mt-4 tracking-wide uppercase">
            {content.scripture.reference}
          </p>
        </div>

        {/* Reflection Section */}
        <div className="prose prose-stone max-w-none mb-10">
          <p className="text-stone-600 leading-7 md:leading-8 font-light text-justify">
            {content.reflection}
          </p>
        </div>

        {/* Prayer Section */}
        <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 mb-8">
          <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 text-center">Prayer</h3>
          <p className="font-serif text-stone-700 italic text-center">
            {content.prayer}
          </p>
        </div>

        {/* Step of Faith (Action) */}
        <div className="mt-8 pt-6 border-t border-stone-100">
           <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 text-center">Today's Step of Faith</h3>
           
           <div 
            onClick={onToggleStep}
            className={`
              relative group cursor-pointer transition-all duration-300 ease-in-out
              flex items-start md:items-center space-x-4 p-4 rounded-xl border
              ${isStepCompleted 
                ? 'bg-primary/5 border-primary/20' 
                : 'bg-white border-stone-200 hover:border-primary/40 hover:shadow-md'}
            `}
           >
              <div className={`
                mt-1 md:mt-0 flex-shrink-0 transition-colors duration-300
                ${isStepCompleted ? 'text-primary' : 'text-stone-300 group-hover:text-primary/60'}
              `}>
                {isStepCompleted ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </div>
              <div className="flex-1">
                <p className={`
                  text-stone-700 font-medium transition-all duration-300
                  ${isStepCompleted ? 'line-through opacity-60' : ''}
                `}>
                  {content.stepOfFaith}
                </p>
                {isStepCompleted && (
                  <p className="text-xs text-primary mt-1 font-medium fade-in">
                    Walk completed for today. Grace be with you.
                  </p>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DevotionalCard;