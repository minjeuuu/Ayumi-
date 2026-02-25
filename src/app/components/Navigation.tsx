import { Link, useLocation } from 'react-router';
import { 
  BookOpen, 
  Pen, 
  Music, 
  BookMarked, 
  Heart, 
  Video, 
  Search,
  Footprints,
  Settings
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Footprints, label: 'Home' },
  { path: '/read', icon: BookOpen, label: 'Read' },
  { path: '/editor', icon: Pen, label: 'Create' },
  { path: '/journal', icon: BookMarked, label: 'Journal' },
  { path: '/worship', icon: Music, label: 'Worship' },
  { path: '/study', icon: Search, label: 'Study' },
  { path: '/prayer', icon: Heart, label: 'Prayer' },
  { path: '/media', icon: Video, label: 'Media' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto md:flex md:gap-1 md:justify-center md:items-center md:h-16 scrollbar-hide">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col md:flex-row items-center justify-center gap-1 py-3 px-3 min-w-[64px] transition-colors ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm whitespace-nowrap">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
