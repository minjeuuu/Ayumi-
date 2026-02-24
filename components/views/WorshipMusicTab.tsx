import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Heart, Share2, Download, List, Search, TrendingUp, Clock, User, Radio } from 'lucide-react';

const BACKEND_URL = window.location.origin;

interface Song {
  id: string;
  title: string;
  artist_name: string;
  artist_id: string;
  youtube_id?: string;
  key?: string;
  tempo?: number;
  tags?: string[];
}

interface Artist {
  id: string;
  name: string;
  country: string;
  genre: string[];
  description?: string;
}

const WorshipMusicTab = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'songs' | 'artists' | 'playlists'>('songs');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [artistsRes, songsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/worship/artists`),
        fetch(`${BACKEND_URL}/api/worship/songs`)
      ]);
      
      const artistsData = await artistsRes.json();
      const songsData = await songsRes.json();
      
      setArtists(artistsData.artists || []);
      setSongs(songsData.songs || []);
    } catch (error) {
      console.error('Failed to load worship music:', error);
    } finally {
      setLoading(false);
    }
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    if (song.youtube_id) {
      window.open(`https://www.youtube.com/watch?v=${song.youtube_id}`, '_blank');
    }
  };

  const filteredSongs = searchQuery
    ? songs.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : songs;

  if (loading) {
    return (
      <div className="pb-24 px-4 pt-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Music className="mx-auto mb-4 text-primary animate-pulse" size={48} />
          <p className="text-stone-600">Loading worship songs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">Worship Music</h1>
          <p className="text-sm text-stone-500">{songs.length} songs from {artists.length} artists</p>
        </div>
        <Music className="text-primary" size={24} />
      </div>

      <div className="relative mb-4">
        <input 
          type="text" 
          placeholder="Search songs or artists..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 text-stone-400" size={20} />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setView('songs')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            view === 'songs' ? 'bg-primary text-white' : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          <List size={16} className="inline mr-2" />
          Songs
        </button>
        <button
          onClick={() => setView('artists')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            view === 'artists' ? 'bg-primary text-white' : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          <User size={16} className="inline mr-2" />
          Artists
        </button>
        <button
          onClick={() => setView('playlists')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            view === 'playlists' ? 'bg-primary text-white' : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          <Radio size={16} className="inline mr-2" />
          Playlists
        </button>
      </div>

      {view === 'songs' && (
        <div className="space-y-3">
          {filteredSongs.map(song => (
            <div key={song.id} className="bg-white p-4 rounded-xl border border-stone-200 hover:border-primary/50 transition-all group">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => playSong(song)}
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all flex-shrink-0"
                >
                  <Play size={20} fill="currentColor" />
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-stone-800 truncate">{song.title}</h3>
                  <p className="text-sm text-stone-500">{song.artist_name}</p>
                  {song.key && song.tempo && (
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-stone-100 px-2 py-1 rounded">Key: {song.key}</span>
                      <span className="text-xs bg-stone-100 px-2 py-1 rounded">Tempo: {song.tempo}</span>
                    </div>
                  )}
                  {song.tags && song.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {song.tags.map(tag => (
                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="p-2 hover:bg-stone-50 rounded-lg transition-colors">
                    <Heart size={18} className="text-stone-400" />
                  </button>
                  <button className="p-2 hover:bg-stone-50 rounded-lg transition-colors">
                    <Share2 size={18} className="text-stone-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'artists' && (
        <div className="grid grid-cols-2 gap-3">
          {artists.map(artist => (
            <div key={artist.id} className="bg-white p-4 rounded-xl border border-stone-200 hover:border-primary/50 transition-all cursor-pointer">
              <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-3 flex items-center justify-center">
                <Music className="text-primary" size={32} />
              </div>
              <h3 className="font-serif font-bold text-stone-800 text-sm mb-1 truncate">{artist.name}</h3>
              <p className="text-xs text-stone-500">{artist.country}</p>
              {artist.genre && (
                <p className="text-xs text-stone-400 mt-1">{artist.genre.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {view === 'playlists' && (
        <div className="space-y-3">
          {[
            { name: 'Morning Worship', songs: 25, duration: '1h 45m', icon: 'sunrise' },
            { name: 'Evening Prayer', songs: 18, duration: '1h 12m', icon: 'moon' },
            { name: 'Praise and Thanksgiving', songs: 30, duration: '2h 5m', icon: 'praise' },
            { name: 'Quiet Time', songs: 15, duration: '52m', icon: 'quiet' },
            { name: 'Faith Builders', songs: 22, duration: '1h 30m', icon: 'faith' },
            { name: 'Hymns of the Faith', songs: 28, duration: '1h 55m', icon: 'hymn' },
            { name: 'Scripture Songs', songs: 20, duration: '1h 20m', icon: 'scripture' },
          ].map((playlist, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 hover:border-primary/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Music size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-stone-800">{playlist.name}</h3>
                  <p className="text-sm text-stone-500">{playlist.songs} songs • {playlist.duration}</p>
                </div>
                <Play size={20} className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      )}

      {currentSong && (
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-stone-200 p-4 shadow-lg">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
              <Music size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-stone-800 text-sm truncate">{currentSong.title}</h4>
              <p className="text-xs text-stone-500">{currentSong.artist_name}</p>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorshipMusicTab;
