import React, { useState, useEffect } from 'react';
import { WORSHIP_ARTISTS, POPULAR_WORSHIP_SONGS } from '../../constants';
import { Music, Play, Search, Heart, Share2, ExternalLink, X, List, ChevronDown, Shuffle, SkipForward, SkipBack } from 'lucide-react';
import { callClaude } from '../../services/claudeService';

const WorshipMusicTab: React.FC<{ theme?: string }> = ({ theme = "light" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'songs' | 'artists' | 'favorites'>('songs');
  const [showYouTube, setShowYouTube] = useState(false);
  const [currentYouTubeId, setCurrentYouTubeId] = useState('');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playlist, setPlaylist] = useState<any[]>(POPULAR_WORSHIP_SONGS as any[]);
  const [genreFilter, setGenreFilter] = useState('all');
  const [notification, setNotification] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [moreArtistSongs, setMoreArtistSongs] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ayumi_worship_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('ayumi_worship_favorites', JSON.stringify(updated));
    showNotif(favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites ♥');
  };

  const playSong = (song: any, songList?: any[]) => {
    setSelectedSong(song);
    const ytId = song.youtubeId || '';
    setCurrentYouTubeId(ytId);
    if (ytId) {
      setShowYouTube(true);
    }
    if (songList) {
      setPlaylist(songList);
      setCurrentSongIndex(songList.findIndex((s: any) => s.id === song.id));
    }
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    const next = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(next);
    playSong(playlist[next]);
  };

  const playPrev = () => {
    if (playlist.length === 0) return;
    const prev = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prev);
    playSong(playlist[prev]);
  };

  const shufflePlay = () => {
    const list = playlist.length > 0 ? playlist : (POPULAR_WORSHIP_SONGS as any[]);
    const idx = Math.floor(Math.random() * list.length);
    playSong(list[idx], list);
  };

  const searchSongs = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const text = await callClaude(
        `List 8 Christian praise and worship songs matching "${searchQuery}". Return ONLY a valid JSON array, no markdown: [{"id":"s1","title":"Song Title","artist":"Artist Name","album":"Album","year":2020,"genre":"Contemporary Worship","youtubeId":"","tags":["praise"]}]`,
        'You are a Christian music expert. Return only a raw JSON array, no backticks, no explanation.'
      );
      const m = text.match(/\[[\s\S]*?\]/);
      if (m) {
        try { setSearchResults(JSON.parse(m[0])); } catch {}
      }
    } catch (e) { setSearchResults([]); }
    setIsSearching(false);
  };

  const loadLyrics = async (song: any) => {
    setIsLoadingLyrics(true);
    setShowLyrics(true);
    try {
      const text = await callClaude(
        `Write worship-style lyrics for "${song.title}" by ${song.artist}. Include [Verse 1], [Chorus], [Bridge] sections. Keep it reverent and scriptural.`,
        'You are helping someone worship God through music.'
      );
      setLyrics(text);
    } catch (e) { setLyrics('Lyrics unavailable. Search YouTube for the full song.'); }
    setIsLoadingLyrics(false);
  };

  const loadArtistSongs = async (artist: any) => {
    setSelectedArtist(artist);
    setIsLoadingMore(true);
    try {
      const text = await callClaude(
        `List 10 popular worship songs by ${artist.name}. Return ONLY raw JSON array: [{"title":"Song","year":2020,"album":"Album","youtubeId":""}]`,
        'Return only a raw JSON array, no backticks, no markdown.'
      );
      const m = text.match(/\[[\s\S]*?\]/);
      if (m) {
        try {
          const parsed = JSON.parse(m[0]);
          setMoreArtistSongs(parsed.map((s: any, i: number) => ({ ...s, id: `a${i}`, artist: artist.name })));
        } catch {}
      }
    } catch (e) { setMoreArtistSongs([]); }
    setIsLoadingMore(false);
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
    const text = `${song.title} by ${song.artist}\n\nListening on Ayumi - Walking with God`;
    if (navigator.share) await navigator.share({ text });
    else { await navigator.clipboard.writeText(text); showNotif('Copied to clipboard'); }
  };

  const allGenres = ['all', ...Array.from(new Set((WORSHIP_ARTISTS as any[]).map((a: any) => a.genre)))];
  const filteredArtists = genreFilter === 'all'
    ? (WORSHIP_ARTISTS as any[])
    : (WORSHIP_ARTISTS as any[]).filter((a: any) => a.genre === genreFilter);
  const favoriteSongs = (POPULAR_WORSHIP_SONGS as any[]).filter((s: any) => favorites.includes(s.id));

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Toast */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs px-4 py-2 rounded-full z-50 shadow-lg animate-fade-in">
          {notification}
        </div>
      )}

      {/* YouTube Embed Modal */}
      {showYouTube && currentYouTubeId && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 text-white bg-stone-900">
            <div className="min-w-0 flex-1 mr-3">
              <p className="font-bold truncate">{selectedSong?.title}</p>
              <p className="text-sm text-stone-400 truncate">{selectedSong?.artist}</p>
            </div>
            <button onClick={() => setShowYouTube(false)} className="p-2 flex-shrink-0">
              <X size={24} />
            </button>
          </div>

          {/* YouTube iframe */}
          <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
            <iframe
              key={currentYouTubeId}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${currentYouTubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={selectedSong?.title || 'Worship'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Controls */}
          <div className="flex-1 bg-stone-900 p-4 flex flex-col justify-between">
            <div className="flex justify-center items-center space-x-8 py-4">
              <button onClick={playPrev} className="text-stone-400 hover:text-white transition-colors">
                <SkipBack size={30} />
              </button>
              <button onClick={shufflePlay} className="text-stone-400 hover:text-white transition-colors">
                <Shuffle size={24} />
              </button>
              <button onClick={playNext} className="text-stone-400 hover:text-white transition-colors">
                <SkipForward size={30} />
              </button>
            </div>
            <div className="flex justify-around py-2">
              <button onClick={() => selectedSong && toggleFavorite(selectedSong.id)} className="flex flex-col items-center space-y-1 text-stone-400 hover:text-pink-400 transition-colors">
                <Heart size={22} className={selectedSong && favorites.includes(selectedSong.id) ? 'fill-pink-400 text-pink-400' : ''} />
                <span className="text-xs">Favorite</span>
              </button>
              <button onClick={() => { setShowYouTube(false); if (selectedSong) loadLyrics(selectedSong); }} className="flex flex-col items-center space-y-1 text-stone-400 hover:text-white transition-colors">
                <List size={22} />
                <span className="text-xs">Lyrics</span>
              </button>
              <button onClick={() => selectedSong && openYouTube(selectedSong)} className="flex flex-col items-center space-y-1 text-stone-400 hover:text-red-400 transition-colors">
                <ExternalLink size={22} />
                <span className="text-xs">YouTube</span>
              </button>
              <button onClick={() => selectedSong && shareContent(selectedSong)} className="flex flex-col items-center space-y-1 text-stone-400 hover:text-white transition-colors">
                <Share2 size={22} />
                <span className="text-xs">Share</span>
              </button>
            </div>
            {/* Up next */}
            {playlist.length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-700">
                <p className="text-xs text-stone-500 mb-2">UP NEXT</p>
                <p className="text-sm text-stone-300 truncate">{playlist[(currentSongIndex + 1) % playlist.length]?.title}</p>
                <p className="text-xs text-stone-500 truncate">{playlist[(currentSongIndex + 1) % playlist.length]?.artist}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lyrics Modal */}
      {showLyrics && (
        <div className="fixed inset-0 bg-stone-900/97 z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 text-white border-b border-stone-700">
            <div className="min-w-0 flex-1 mr-3">
              <p className="font-bold truncate">{selectedSong?.title}</p>
              <p className="text-sm text-stone-400 truncate">{selectedSong?.artist}</p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              {selectedSong?.youtubeId && (
                <button onClick={() => { setShowLyrics(false); setCurrentYouTubeId(selectedSong.youtubeId); setShowYouTube(true); }} className="text-xs bg-red-600 px-3 py-1 rounded-full">▶ Watch</button>
              )}
              <button onClick={() => setShowLyrics(false)} className="p-2"><X size={22} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {isLoadingLyrics ? (
              <div className="text-center text-stone-400 py-16">
                <div className="animate-spin w-10 h-10 border-2 border-stone-600 border-t-amber-400 rounded-full mx-auto mb-4" />
                <p className="font-serif text-lg">Loading lyrics...</p>
              </div>
            ) : (
              <div className="text-white font-serif text-lg leading-9 whitespace-pre-wrap text-center">{lyrics}</div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-b from-stone-800 to-stone-700 p-4 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <Music size={18} />
          <h2 className="font-bold">Worship Music</h2>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchSongs()}
            placeholder="Search worship songs..."
            className="w-full pl-9 pr-20 py-2.5 text-sm bg-stone-600/50 border border-stone-500 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <button onClick={searchSongs} disabled={isSearching} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-amber-500 hover:bg-amber-400 text-stone-900 px-3 py-1 rounded-lg font-bold transition-colors">
            {isSearching ? '...' : 'Find'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-stone-800 text-white border-b border-stone-700">
        {(['songs', 'artists', 'favorites'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2.5 text-xs capitalize transition-colors ${activeTab === t ? 'border-b-2 border-amber-400 text-amber-300 bg-stone-700' : 'text-stone-400 hover:text-stone-200'}`}>
            {t}{t === 'favorites' && favorites.length > 0 ? ` (${favorites.length})` : ''}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {activeTab === 'songs' && (
          <div className="p-4">
            {searchResults.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Search Results</h3>
                  <button onClick={() => setSearchResults([])} className="text-xs text-stone-400">Clear</button>
                </div>
                {searchResults.map((song, i) => (
                  <SongCard key={i} song={song} isFav={favorites.includes(song.id)} isActive={selectedSong?.id === song.id} index={i + 1} onPlay={() => playSong(song, searchResults)} onFav={() => toggleFavorite(song.id)} onYT={() => openYouTube(song)} onSpotify={() => openSpotify(song)} onLyrics={() => { setSelectedSong(song); loadLyrics(song); }} />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Popular Worship</h3>
              <button onClick={shufflePlay} className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
                <Shuffle size={12} /><span>Shuffle</span>
              </button>
            </div>
            {(POPULAR_WORSHIP_SONGS as any[]).map((song: any, i: number) => (
              <SongCard key={song.id} song={song} isFav={favorites.includes(song.id)} isActive={selectedSong?.id === song.id} index={i + 1} onPlay={() => playSong(song, POPULAR_WORSHIP_SONGS as any[])} onFav={() => toggleFavorite(song.id)} onYT={() => openYouTube(song)} onSpotify={() => openSpotify(song)} onLyrics={() => { setSelectedSong(song); loadLyrics(song); }} />
            ))}
          </div>
        )}

        {activeTab === 'artists' && (
          <div className="p-4">
            <div className="flex overflow-x-auto space-x-2 pb-2 mb-4 no-scrollbar">
              {allGenres.slice(0, 10).map(g => (
                <button key={g} onClick={() => setGenreFilter(g)} className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full capitalize transition-colors ${genreFilter === g ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'}`}>
                  {g}
                </button>
              ))}
            </div>

            {selectedArtist ? (
              <div>
                <button onClick={() => { setSelectedArtist(null); setMoreArtistSongs([]); }} className="flex items-center text-sm text-stone-500 mb-4 hover:text-stone-800 transition-colors">
                  ← Back to artists
                </button>
                <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white rounded-xl p-4 mb-4 shadow-md">
                  <h3 className="font-bold text-lg">{selectedArtist.name}</h3>
                  <p className="text-stone-400 text-sm">{selectedArtist.genre} · {selectedArtist.origin}</p>
                  {selectedArtist.description && <p className="text-stone-300 text-xs mt-2">{selectedArtist.description}</p>}
                </div>
                {isLoadingMore ? (
                  <div className="text-center py-10 text-stone-400">
                    <div className="animate-spin w-8 h-8 border-2 border-stone-300 border-t-stone-700 rounded-full mx-auto mb-3" />
                    Loading songs...
                  </div>
                ) : moreArtistSongs.length === 0 ? (
                  <div className="text-center py-10 text-stone-400">No songs loaded. Try again.</div>
                ) : (
                  moreArtistSongs.map((song, i) => (
                    <SongCard key={i} song={song} isFav={favorites.includes(song.id)} isActive={selectedSong?.id === song.id} index={i + 1} onPlay={() => playSong(song, moreArtistSongs)} onFav={() => toggleFavorite(song.id)} onYT={() => openYouTube(song)} onSpotify={() => openSpotify(song)} onLyrics={() => { setSelectedSong(song); loadLyrics(song); }} />
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredArtists.slice(0, 40).map((artist: any) => (
                  <button key={artist.id} onClick={() => loadArtistSongs(artist)} className="bg-white border border-stone-200 rounded-xl p-4 text-left hover:border-stone-400 hover:shadow-md transition-all active:scale-95">
                    <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-stone-500 rounded-full flex items-center justify-center mb-2">
                      <Music size={16} className="text-white" />
                    </div>
                    <p className="font-bold text-sm text-stone-800 leading-tight">{artist.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{artist.genre}</p>
                    <p className="text-xs text-stone-300">{artist.origin}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="p-4">
            {favoriteSongs.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <Heart size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-medium">No favorites yet</p>
                <p className="text-sm mt-1 text-stone-300">Tap ♥ on any song to save it here</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Your Favorites ({favoriteSongs.length})</h3>
                  <button onClick={() => playSong(favoriteSongs[0], favoriteSongs)} className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                    <Play size={12} /><span>Play All</span>
                  </button>
                </div>
                {favoriteSongs.map((song: any, i: number) => (
                  <SongCard key={song.id} song={song} isFav={true} isActive={selectedSong?.id === song.id} index={i + 1} onPlay={() => playSong(song, favoriteSongs)} onFav={() => toggleFavorite(song.id)} onYT={() => openYouTube(song)} onSpotify={() => openSpotify(song)} onLyrics={() => { setSelectedSong(song); loadLyrics(song); }} />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Mini player bar */}
      {selectedSong && !showYouTube && !showLyrics && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-20 bg-stone-800 text-white px-4 py-3 flex items-center space-x-3 cursor-pointer z-30 border-t border-stone-700 shadow-2xl" onClick={() => { if (currentYouTubeId) setShowYouTube(true); }}>
          <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
            <Music size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{selectedSong.title}</p>
            <p className="text-xs text-stone-400 truncate">{selectedSong.artist}</p>
          </div>
          <button onClick={e => { e.stopPropagation(); playPrev(); }} className="text-stone-400 hover:text-white p-1">
            <SkipBack size={16} />
          </button>
          <Play size={20} className="text-amber-400 flex-shrink-0" />
          <button onClick={e => { e.stopPropagation(); playNext(); }} className="text-stone-400 hover:text-white p-1">
            <SkipForward size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const SongCard: React.FC<{
  song: any; isFav: boolean; isActive?: boolean; index?: number;
  onPlay: () => void; onFav: () => void; onYT: () => void; onSpotify: () => void; onLyrics: () => void;
}> = ({ song, isFav, isActive, index, onPlay, onFav, onYT, onSpotify, onLyrics }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`mb-2 bg-white rounded-xl border shadow-sm transition-all ${isActive ? 'border-emerald-400 shadow-emerald-100' : 'border-stone-100 hover:border-stone-300'}`}>
      <div className="flex items-center p-3 space-x-3">
        {index !== undefined && <span className="text-xs text-stone-300 w-5 text-right flex-shrink-0">{index}</span>}
        <button onClick={onPlay} className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-emerald-500' : 'bg-stone-100 hover:bg-stone-200'}`}>
          <Play size={14} className={`${isActive ? 'text-white' : 'text-stone-500'} ml-0.5`} />
        </button>
        <div className="flex-1 min-w-0" onClick={() => setExpanded(!expanded)}>
          <p className={`text-sm font-bold truncate ${isActive ? 'text-emerald-700' : 'text-stone-800'}`}>{song.title}</p>
          <p className="text-xs text-stone-400 truncate">{song.artist}{song.year ? ` · ${song.year}` : ''}</p>
        </div>
        <button onClick={onFav} className="flex-shrink-0 p-1.5 hover:scale-110 transition-transform">
          <Heart size={16} className={isFav ? 'fill-pink-400 text-pink-400' : 'text-stone-200 hover:text-pink-300'} />
        </button>
        <button onClick={() => setExpanded(!expanded)} className="flex-shrink-0 p-1">
          <ChevronDown size={16} className={`text-stone-300 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {expanded && (
        <div className="flex border-t border-stone-50 px-3 py-2 space-x-2">
          <button onClick={onYT} className="flex-1 flex items-center justify-center space-x-1 text-xs py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-medium">
            <ExternalLink size={11} /><span>YouTube</span>
          </button>
          <button onClick={onSpotify} className="flex-1 flex items-center justify-center space-x-1 text-xs py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors font-medium">
            <Music size={11} /><span>Spotify</span>
          </button>
          <button onClick={onLyrics} className="flex-1 flex items-center justify-center space-x-1 text-xs py-2 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-lg transition-colors font-medium">
            <List size={11} /><span>Lyrics</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WorshipMusicTab;
