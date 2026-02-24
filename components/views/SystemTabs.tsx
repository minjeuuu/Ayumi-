import React from 'react';
import { Search, User, Settings, Moon, Bell, Shield } from 'lucide-react';

export const SearchTab = () => (
  <div className="pb-24 px-4 pt-6 fade-in">
    <div className="relative mb-6">
      <input 
        type="text" 
        placeholder="Search scripture, devotionals..." 
        className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <Search className="absolute left-3 top-3.5 text-stone-400" size={20} />
    </div>
    <div className="text-center py-20">
      <p className="text-stone-400 font-serif italic">Search specifically for "Love", "Romans 8", or "David"</p>
    </div>
  </div>
);

export const ProfileTab = () => (
  <div className="pb-24 px-4 pt-6 fade-in">
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center mb-6">
      <div className="w-20 h-20 bg-stone-100 rounded-full mx-auto mb-4 flex items-center justify-center text-stone-400">
        <User size={32} />
      </div>
      <h2 className="text-xl font-serif font-bold text-stone-800">Pilgrim</h2>
      <p className="text-sm text-stone-500">Member since 2024</p>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-6">
       <div className="bg-stone-50 p-4 rounded-xl text-center">
         <span className="block text-2xl font-bold text-primary">12</span>
         <span className="text-xs text-stone-500 uppercase tracking-wider">Day Streak</span>
       </div>
       <div className="bg-stone-50 p-4 rounded-xl text-center">
         <span className="block text-2xl font-bold text-primary">48</span>
         <span className="text-xs text-stone-500 uppercase tracking-wider">Prayers</span>
       </div>
    </div>
  </div>
);

export const SettingsTab = () => (
  <div className="pb-24 px-4 pt-6 fade-in space-y-2">
    <h1 className="text-2xl font-serif text-stone-800 mb-6">Settings</h1>
    
    {[
      { icon: Moon, label: 'Appearance', sub: 'Light' },
      { icon: Bell, label: 'Notifications', sub: 'Daily at 7:00 AM' },
      { icon: Shield, label: 'Privacy', sub: 'All data local' },
    ].map((item) => (
      <div key={item.label} className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><item.icon size={20} /></div>
          <div>
            <p className="font-medium text-stone-700">{item.label}</p>
            <p className="text-xs text-stone-400">{item.sub}</p>
          </div>
        </div>
      </div>
    ))}
    
    <div className="mt-8 pt-8 border-t border-stone-200 text-center">
      <p className="text-xs text-stone-400 font-serif">Ayumi v2.0.0</p>
    </div>
  </div>
);