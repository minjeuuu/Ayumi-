import React from 'react';
import { Footprints } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center space-y-3">
      <div 
        className="flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
        onClick={onReset}
        title="Refresh Devotional"
      >
        <Footprints size={24} strokeWidth={1.5} />
        <h1 className="text-3xl font-serif font-medium tracking-wide">Ayumi</h1>
        <span className="text-xs font-serif text-stone-400 mt-2 select-none">あゆみ</span>
      </div>
      <p className="text-sm text-stone-500 font-light tracking-widest uppercase">Walking with God Daily</p>
    </header>
  );
};

export default Header;