import React from 'react';
import { RefreshCw, Bell, Sparkles } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  theme?: string;
}

const Header: React.FC<HeaderProps> = ({ onReset, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const bg = isDark ? 'bg-stone-900/95 border-stone-800' : isSepia ? 'bg-amber-50/95 border-amber-200' : 'bg-white/95 border-stone-100';
  const text = isDark ? 'text-stone-100' : 'text-stone-900';
  const sub = isDark ? 'text-stone-500' : 'text-stone-400';
  const btnColor = isDark ? 'text-stone-500 hover:text-stone-300 hover:bg-stone-800' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50';
  
  return (
    <div className={`sticky top-0 z-30 ${bg} border-b backdrop-blur-xl`}>
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #5B7C75 0%, #3A524D 100%)' }}>
            <Sparkles size={15} color="white" strokeWidth={2} />
          </div>
          <div>
            <h1 className={`text-base font-bold leading-tight tracking-tight ${text}`} style={{ fontFamily: "'Lora', serif" }}>ayumi</h1>
            <p className={`text-[10px] leading-none ${sub}`}>歩み · Walking with God</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className={`text-[11px] ${sub} mr-2 text-right`}>
            <div>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          </div>
          {onReset && (
            <button onClick={onReset} title="Refresh daily content"
              className={`p-2 rounded-xl transition-all ${btnColor}`}>
              <RefreshCw size={16} strokeWidth={1.8} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
