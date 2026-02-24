import React from 'react';
import JournalEntry from '../JournalEntry';

const JournalTab: React.FC = () => {
  return (
    <div className="pb-24 px-4 pt-6 fade-in">
       <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-serif text-stone-800">Journal</h1>
        <button className="text-sm text-stone-500 hover:text-primary underline decoration-stone-300">View History</button>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-8">
        <p className="text-stone-500 font-serif italic mb-4 text-center">
          "Journaling is a way of listening to the life God has given you."
        </p>
      </div>

      <JournalEntry initialText="" onSave={(t) => console.log(t)} />
      
      <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 mt-8">Recent Entries</h3>
      <div className="space-y-4 opacity-60 grayscale hover:grayscale-0 transition-all">
         <div className="p-4 bg-white border border-stone-200 rounded-lg">
           <div className="text-xs text-stone-400 mb-1">Yesterday</div>
           <p className="text-stone-600 line-clamp-2 font-serif">Reflecting on the peace that surpasses understanding...</p>
         </div>
         <div className="p-4 bg-white border border-stone-200 rounded-lg">
           <div className="text-xs text-stone-400 mb-1">Oct 24</div>
           <p className="text-stone-600 line-clamp-2 font-serif">A heavy heart today, but I am trusting in His timing.</p>
         </div>
      </div>
    </div>
  );
};

export default JournalTab;