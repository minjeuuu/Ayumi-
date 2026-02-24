import React, { useState, useEffect, useRef } from 'react';
import { PrayerRequest, PrayerCategory } from '../../types';
import { generatePrayerPrompts } from '../../services/geminiService';
import { 
  Moon, Sun, Plus, Check, Archive, Clock, Edit2, 
  BookOpen, Heart, Flame, Shield, Globe, Users,
  Mic, StopCircle, RefreshCw, ChevronDown, ChevronRight, X
} from 'lucide-react';

const CATEGORIES: { id: PrayerCategory; label: string; icon: any }[] = [
  { id: 'Personal', label: 'Personal', icon: Heart },
  { id: 'Family', label: 'Family', icon: Users },
  { id: 'Church', label: 'Church', icon: Flame },
  { id: 'Work', label: 'Work', icon: Shield },
  { id: 'Nation', label: 'Nation', icon: Globe },
  { id: 'World', label: 'World', icon: Globe },
];

const PrayerTab: React.FC = () => {
  // --- State ---
  const [viewMode, setViewMode] = useState<'canvas' | 'list'>('canvas');
  const [quietMode, setQuietMode] = useState(false);
  
  // Prayer Canvas State
  const [prayerText, setPrayerText] = useState('');
  const [activeVerse, setActiveVerse] = useState<{text: string, ref: string} | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Requests State
  const [requests, setRequests] = useState<PrayerRequest[]>([
    { id: '1', title: 'Wisdom for decisions', details: 'Need guidance on the new role.', category: 'Personal', status: 'active', dateAdded: new Date().toISOString() },
    { id: '2', title: 'Healing for Aunt Mary', details: '', category: 'Family', status: 'active', dateAdded: new Date().toISOString() },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReq, setNewReq] = useState<{title: string; category: PrayerCategory}>({ title: '', category: 'Personal' });

  // --- Effects ---
  
  // Auto-save logic for canvas
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const txt = e.target.value;
    setPrayerText(txt);
    setIsSaving(true);
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      // Simulate save
      setIsSaving(false);
    }, 1500);
  };

  // Toggle Verse Attachment (Simulated)
  const attachVerse = () => {
    setActiveVerse({ 
      text: "The Lord is near to all who call on him, to all who call on him in truth.",
      ref: "Psalm 145:18"
    });
  };

  // Add Request Logic
  const handleAddRequest = () => {
    if (!newReq.title.trim()) return;
    const req: PrayerRequest = {
      id: Date.now().toString(),
      title: newReq.title,
      details: '',
      category: newReq.category,
      status: 'active',
      dateAdded: new Date().toISOString()
    };
    setRequests([req, ...requests]);
    setNewReq({ title: '', category: 'Personal' });
    setShowAddModal(false);
  };

  // Mark Answered
  const toggleStatus = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: r.status === 'active' ? 'answered' : 'active', dateAnswered: r.status === 'active' ? new Date().toISOString() : undefined } : r
    ));
  };

  // --- Guided Prompts ---
  const insertPrompt = async (type: string) => {
    const promptHeader = `\n[${type}]\n`;
    setPrayerText(prev => prev + (prev ? '\n' : '') + promptHeader);
    
    if (activeVerse && type === 'Scripture') {
       try {
         // Optimistic UI update
         setPrayerText(prev => prev + "Listening...");
         const prompts = await generatePrayerPrompts(activeVerse.text);
         setPrayerText(prev => prev.replace("Listening...", "") + (prompts[0] || "Lord, open my eyes to this truth.") + "\n");
       } catch (e) {
         setPrayerText(prev => prev.replace("Listening...", "") + "\n");
       }
    }
  };

  // --- Render Components ---

  const Header = () => (
    <div className={`
      flex justify-between items-center py-4 px-4 transition-all duration-500
      ${quietMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'}
    `}>
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        <h1 className={`text-xl font-serif transition-colors ${quietMode ? 'text-stone-300' : 'text-stone-800'}`}>
          {viewMode === 'canvas' ? 'Secret Place' : 'Intercession'}
        </h1>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setQuietMode(!quietMode)}
          className={`p-2 rounded-full transition-colors ${quietMode ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-500'}`}
          title={quietMode ? "Exit Quiet Mode" : "Enter Quiet Mode"}
        >
          {quietMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );

  const ModeSwitcher = () => (
    <div className={`px-4 mb-4 transition-opacity duration-500 ${quietMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-stone-100 p-1 rounded-xl flex">
        <button 
          onClick={() => setViewMode('canvas')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === 'canvas' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
        >
          Communion
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
        >
          Requests
        </button>
      </div>
    </div>
  );

  // VIEW: CANVAS
  const CanvasView = () => (
    <div className="flex-1 flex flex-col px-4 animate-fadeIn h-full pb-32">
      {/* Verse Attachment */}
      {activeVerse ? (
        <div className={`mb-4 p-4 border-l-4 border-primary rounded-r-lg shadow-sm group relative transition-colors ${quietMode ? 'bg-stone-900 border-stone-700' : 'bg-white'}`}>
           <button onClick={() => setActiveVerse(null)} className="absolute top-2 right-2 text-stone-300 hover:text-stone-500"><X size={14} /></button>
           <p className={`font-serif italic text-sm mb-1 ${quietMode ? 'text-stone-400' : 'text-stone-700'}`}>"{activeVerse.text}"</p>
           <p className="text-xs text-stone-500 font-bold">{activeVerse.ref}</p>
        </div>
      ) : (
        !quietMode && (
          <button 
            onClick={attachVerse} 
            className="mb-4 py-2 border border-dashed border-stone-300 rounded-lg text-xs text-stone-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
          >
            <BookOpen size={14} className="mr-2" /> Pray through Scripture
          </button>
        )
      )}

      {/* Main Text Area */}
      <div className="relative flex-1">
        <textarea 
          value={prayerText}
          onChange={handleTextChange}
          placeholder="Father, I am here..."
          className={`
            w-full h-full resize-none bg-transparent focus:outline-none font-serif text-lg leading-relaxed placeholder-stone-300 p-2
            ${quietMode ? 'text-stone-300 caret-stone-500' : 'text-stone-700'}
          `}
        />
        <div className={`absolute bottom-2 right-2 text-xs italic transition-opacity ${isSaving ? 'opacity-50' : 'opacity-0'} ${quietMode ? 'text-stone-600' : 'text-stone-300'}`}>
          Saving...
        </div>
      </div>

      {/* Guided Chips (Hidden in Quiet Mode) */}
      {!quietMode && (
        <div className="mt-4 overflow-x-auto no-scrollbar py-2">
          <div className="flex space-x-2">
            <span className="text-xs font-bold text-stone-300 uppercase self-center mr-2">Guide:</span>
            {['Adoration', 'Confession', 'Thanksgiving', 'Supplication', activeVerse ? 'Scripture' : null].filter(Boolean).map(type => (
              <button 
                key={type} 
                onClick={() => insertPrompt(type!)}
                className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs text-stone-500 hover:border-primary hover:text-primary transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // VIEW: LIST
  const ListView = () => (
    <div className="px-4 pb-32 animate-fadeIn">
      {/* Add Button */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="w-full py-3 mb-6 bg-white border border-stone-200 rounded-xl text-stone-500 font-medium hover:border-primary hover:text-primary flex items-center justify-center transition-all shadow-sm"
      >
        <Plus size={18} className="mr-2" /> Add Request
      </button>

      {/* Categories */}
      <div className="space-y-6">
        {CATEGORIES.map(cat => {
          const catRequests = requests.filter(r => r.category === cat.id && r.status === 'active');
          if (catRequests.length === 0) return null;

          return (
            <div key={cat.id}>
              <div className="flex items-center space-x-2 mb-3">
                <cat.icon size={16} className="text-stone-400" />
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">{cat.label}</h3>
              </div>
              <div className="space-y-2">
                {catRequests.map(req => (
                  <div key={req.id} className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm flex items-start group">
                     <button 
                       onClick={() => toggleStatus(req.id)}
                       className="mt-1 w-5 h-5 rounded-full border border-stone-300 mr-3 flex items-center justify-center text-transparent hover:border-primary hover:text-primary/20 transition-all"
                     >
                       <Check size={12} />
                     </button>
                     <div className="flex-1">
                       <p className="text-stone-800 font-medium">{req.title}</p>
                       {req.details && <p className="text-stone-500 text-sm mt-1 font-serif">{req.details}</p>}
                       <p className="text-[10px] text-stone-300 mt-2">Added {new Date(req.dateAdded).toLocaleDateString()}</p>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Answered / Archived Section */}
        <div className="mt-8 pt-8 border-t border-stone-200">
           <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">Answered Prayers</h3>
           <div className="space-y-2 opacity-60">
             {requests.filter(r => r.status === 'answered').map(req => (
               <div key={req.id} className="bg-stone-50 p-3 rounded-lg flex items-center justify-between">
                 <span className="text-sm text-stone-600 line-through decoration-stone-300">{req.title}</span>
                 <button onClick={() => toggleStatus(req.id)} className="text-stone-400 text-xs hover:text-primary">Reopen</button>
               </div>
             ))}
             {requests.filter(r => r.status === 'answered').length === 0 && (
               <p className="text-xs text-stone-300 italic">No answered prayers recorded yet.</p>
             )}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`
      h-full flex flex-col transition-colors duration-700
      ${quietMode ? 'bg-[#1c1917]' : 'bg-[#fafaf9]'}
    `}>
      <Header />
      <ModeSwitcher />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'canvas' ? <CanvasView /> : <ListView />}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
            <h3 className="font-serif text-xl text-stone-800 mb-4">New Request</h3>
            
            <input 
              type="text" 
              value={newReq.title}
              onChange={e => setNewReq({...newReq, title: e.target.value})}
              placeholder="Request title..."
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg mb-4 focus:outline-none focus:ring-1 focus:ring-primary font-medium text-stone-800"
              autoFocus
            />

            <div className="grid grid-cols-3 gap-2 mb-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setNewReq({...newReq, category: cat.id})}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition-colors ${
                    newReq.category === cat.id 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'bg-white border-stone-200 text-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <cat.icon size={16} className="mb-1" />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-stone-100 text-stone-500 rounded-xl font-medium hover:bg-stone-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRequest}
                disabled={!newReq.title.trim()}
                className="flex-1 py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-700 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTab;