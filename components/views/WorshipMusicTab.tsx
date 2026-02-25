import React, { useState, useRef, useEffect } from 'react';
import { WORSHIP_ARTISTS, POPULAR_WORSHIP_SONGS } from '../../constants';
import { Music, Play, Pause, Search, Heart, Share2, ExternalLink, ChevronLeft, ChevronRight, Download, List, X, Volume2 } from 'lucide-react';
import { callClaude } from '../../services/claudeService';

const WorshipMusicTab: React.FC<{ theme?: string }> = ({ theme = 'light' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeArtist, setActiveArtist] = useState<any>(null);
  const [artistSearch, setArtistSearch] = useState('');
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [activeTab, setActiveTab] = useState<'songs' | 'artists' | 'favorites'>('songs');
  const [genreFilter, setGenreFilter] = useState('');
  const [notification, setNotification] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200';
  const textColor = isDark ? 'text-stone-100' : 'text-stone-800';
  const mutedText = isDark ? 'text-stone-400' : 'text-stone-500';
  const bg = isDark ? 'bg-stone-950' : 'bg-stone-50';
  const accent = isDark ? 'text-amber-400' : 'text-emerald-700';

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_worship_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const showNotif = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 3000); };

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('ayumi_worship_favorites', JSON.stringify(updated));
  };

  const searchSongs = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const text = await callClaude(
        `List 8 Christian praise and worship songs matching "${searchQuery}". Include contemporary artists. Return JSON: [{"id":"1","title":"...","artist":"...","album":"...","year":2020,"genre":"Contemporary Worship","tags":["..."]}]`,
        'You are a Christian music expert. Only include praise and worship songs, no Catholic music.'
      );
      const m = text.match(/\[[\s\S]*\]/);
      if (m) setSearchResults(JSON.parse(m[0]));
    } catch (e) { setSearchResults([]); }
    setIsSearching(false);
  };

  const loadLyrics = async (song: any) => {
    setShowLyrics(true);
    setIsLoadingLyrics(true);
    setSelectedSong(song);
    try {
      const text = await callClaude(
        `Write the chorus and first verse of "${song.title}" by ${song.artist}. If you don't know the exact lyrics, write worship-style placeholder lyrics in the same theme. Label sections: [Verse 1] [Chorus] [Bridge] etc.`,
        'You are helping someone worship. Provide lyrics or worship-themed text.'
      );
      setLyrics(text);
    } catch (e) { setLyrics('Lyrics unavailable. Search YouTube for the full song.'); }
    setIsLoadingLyrics(false);
  };

  const openYouTube = (song: any) => {
    const query = encodeURIComponent(`${song.title} ${song.artist} official`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const openSpotify = (song: any) => {
    const query = encodeURIComponent(`${song.title} ${song.artist}`);
    window.open(`https://open.spotify.com/search/${query}`, '_blank');
  };

  const shareContent = async (song: any) => {
    const text = `${song.title} by ${song.artist} - Listen on YouTube!\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(song.title + ' ' + song.artist)}`;
    if (navigator.share) await navigator.share({ title: song.title, text });
    else { navigator.clipboard.writeText(text); showNotif('Copied link!'); }
  };

  const allGenres = [...new Set(WORSHIP_ARTISTS.map(a => a.genre))];
  const filteredArtists = WORSHIP_ARTISTS.filter(a =>
    (artistSearch ? a.name.toLowerCase().includes(artistSearch.toLowerCase()) : true) &&
    (genreFilter ? a.genre === genreFilter : true)
  );

  const displayedSongs = searchResults.length > 0 ? searchResults : POPULAR_WORSHIP_SONGS;
  const favoriteSongs = POPULAR_WORSHIP_SONGS.filter(s => favorites.includes(s.id));

  return (
    <div className={`min-h-screen ${bg} pb-32 md:pl-20`}>
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm">
          {notification}
        </div>
      )}

      {/* Lyrics Modal */}
      {showLyrics && selectedSong && (
        <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 text-white">
              <button onClick={() => setShowLyrics(false)}><ChevronLeft size={24} /></button>
              <div className="flex-1">
                <p className="font-bold">{selectedSong.title}</p>
                <p className="text-sm opacity-70">{selectedSong.artist}</p>
              </div>
              <button onClick={() => openYouTube(selectedSong)} className="px-3 py-1.5 bg-red-600 rounded-lg text-sm flex items-center gap-1">
                <ExternalLink size={14} /> YouTube
              </button>
            </div>
            {/* Lyrics */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isLoadingLyrics ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <pre className="text-white text-center text-lg leading-loose whitespace-pre-wrap font-sans">{lyrics}</pre>
              )}
            </div>
            {/* Controls */}
            <div className="p-4 flex justify-center gap-4">
              <button onClick={() => openSpotify(selectedSong)} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm">
                <Music size={16} /> Spotify
              </button>
              <button onClick={() => shareContent(selectedSong)} className="flex items-center gap-2 px-4 py-2 bg-stone-600 text-white rounded-full text-sm">
                <Share2 size={16} /> Share
              </button>
              <button onClick={() => toggleFavorite(selectedSong.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${favorites.includes(selectedSong.id) ? 'bg-red-500 text-white' : 'bg-stone-600 text-white'}`}>
                <Heart size={16} /> {favorites.includes(selectedSong.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 pt-4">
        {/* Search */}
        <div className={`flex gap-2 mb-4 ${cardBg} border rounded-xl px-3 py-2`}>
          <Search size={18} className={mutedText} />
          <input placeholder="Search songs, artists, hymns..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && searchSongs()}
            className={`flex-1 bg-transparent text-sm focus:outline-none ${textColor}`} />
          {isSearching && <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />}
          <button onClick={searchSongs} className={`text-xs ${accent} font-bold`}>Search</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-stone-200">
          {(['songs', 'artists', 'favorites'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? `border-emerald-600 ${accent}` : `border-transparent ${mutedText}`}`}>
              {tab} {tab === 'favorites' && favorites.length > 0 && `(${favorites.length})`}
            </button>
          ))}
        </div>

        {/* Songs Tab */}
        {activeTab === 'songs' && (
          <div className="space-y-3">
            {searchResults.length > 0 && (
              <div className="flex items-center justify-between">
                <p className={`text-sm ${mutedText}`}>{searchResults.length} results for "{searchQuery}"</p>
                <button onClick={() => setSearchResults([])} className={`text-xs ${accent}`}>Clear</button>
              </div>
            )}
            {displayedSongs.map(song => (
              <div key={song.id} className={`${cardBg} border rounded-xl p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Music size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${textColor} truncate`}>{song.title}</p>
                    <p className={`text-xs ${mutedText} truncate`}>{song.artist}</p>
                    {song.year && <p className={`text-xs ${mutedText}`}>{song.year}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleFavorite(song.id)} className={`p-1.5 ${favorites.includes(song.id) ? 'text-red-500' : mutedText}`}>
                      <Heart size={16} fill={favorites.includes(song.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button onClick={() => loadLyrics(song)} className={`p-1.5 ${mutedText} hover:${accent}`}>
                      <List size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openYouTube(song)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-500 text-white rounded-lg text-xs font-medium">
                    <Play size={12} /> YouTube
                  </button>
                  <button onClick={() => openSpotify(song)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-500 text-white rounded-lg text-xs font-medium">
                    <Music size={12} /> Spotify
                  </button>
                  <button onClick={() => shareContent(song)} className={`flex-1 flex items-center justify-center gap-1 py-2 ${cardBg} border rounded-lg text-xs ${textColor}`}>
                    <Share2 size={12} /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Artists Tab */}
        {activeTab === 'artists' && (
          <div>
            {/* Genre filter */}
            <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
              <button onClick={() => setGenreFilter('')} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${!genreFilter ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>All</button>
              {allGenres.slice(0, 8).map(g => (
                <button key={g} onClick={() => setGenreFilter(g === genreFilter ? '' : g)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${genreFilter === g ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'}`}>{g}</button>
              ))}
            </div>
            {/* Artist search */}
            <div className={`flex items-center gap-2 px-3 py-2 ${cardBg} border rounded-xl mb-3`}>
              <Search size={16} className={mutedText} />
              <input placeholder="Search artists..." value={artistSearch} onChange={e => setArtistSearch(e.target.value)}
                className={`flex-1 bg-transparent text-sm focus:outline-none ${textColor}`} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {filteredArtists.map(artist => (
                <div key={artist.id} className={`${cardBg} border rounded-xl p-4 cursor-pointer hover:border-emerald-400 transition-colors`}
                  onClick={() => { setSearchQuery(artist.name); searchSongs(); setActiveTab('songs'); }}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center mb-2">
                    <span className="text-white font-bold text-lg">{artist.name[0]}</span>
                  </div>
                  <p className={`font-semibold text-sm ${textColor}`}>{artist.name}</p>
                  <p className={`text-xs ${mutedText}`}>{artist.origin}</p>
                  <p className={`text-xs ${accent} mt-1`}>{artist.genre}</p>
                  <button onClick={(e) => { e.stopPropagation(); const q = encodeURIComponent(artist.name + ' worship'); window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank'); }}
                    className={`mt-2 flex items-center gap-1 text-xs text-red-500`}>
                    <ExternalLink size={11} /> Watch
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteSongs.length === 0 ? (
              <div className="text-center py-20">
                <Heart size={48} className={`${mutedText} mx-auto mb-4`} />
                <p className={textColor}>No favorites yet</p>
                <p className={`text-sm ${mutedText}`}>Tap the heart icon on any song to save it</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favoriteSongs.map(song => (
                  <div key={song.id} className={`${cardBg} border rounded-xl p-4`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-600 rounded-xl flex items-center justify-center">
                        <Heart size={18} className="text-white" fill="white" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${textColor}`}>{song.title}</p>
                        <p className={`text-xs ${mutedText}`}>{song.artist}</p>
                      </div>
                      <button onClick={() => toggleFavorite(song.id)} className="text-red-500"><Heart size={16} fill="currentColor" /></button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openYouTube(song)} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-xs">YouTube</button>
                      <button onClick={() => loadLyrics(song)} className={`flex-1 py-2 ${cardBg} border rounded-lg text-xs ${textColor}`}>Lyrics</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorshipMusicTab;
