import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Share2, Download, Search, Music } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { worshipArtists, worshipSongs, musicGenres, musicThemes } from '../data/worship-music';
import { toast } from 'sonner';

export default function WorshipPage() {
  const [selectedSong, setSelectedSong] = useState<typeof worshipSongs[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'Paused' : 'Playing');
  };

  const handleSongSelect = (song: typeof worshipSongs[0]) => {
    setSelectedSong(song);
    setIsPlaying(true);
    toast.success(`Now playing: ${song.title}`);
  };

  const handleDownload = (song: typeof worshipSongs[0]) => {
    toast.success(`Downloading: ${song.title}`);
  };

  const filteredSongs = worshipSongs.filter(song => {
    const matchesSearch = searchQuery === '' || 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = selectedTheme === 'All' || song.theme.includes(selectedTheme);
    return matchesSearch && matchesTheme;
  });

  const filteredArtists = worshipArtists.filter(artist => {
    const matchesGenre = selectedGenre === 'All' || artist.genre.includes(selectedGenre);
    const matchesSearch = searchQuery === '' || 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-[1fr_350px] gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl mb-6">Worship Music</h1>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search songs, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs defaultValue="songs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="songs">Songs</TabsTrigger>
                  <TabsTrigger value="artists">Artists</TabsTrigger>
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                </TabsList>

                <TabsContent value="songs" className="mt-6 space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {musicThemes.slice(0, 10).map(theme => (
                      <button
                        key={theme}
                        onClick={() => setSelectedTheme(theme)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTheme === theme
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>

                  <ScrollArea className="h-[600px]">
                    <div className="space-y-2">
                      {filteredSongs.map(song => (
                        <div
                          key={song.id}
                          className={`flex items-center gap-4 p-4 rounded-lg transition-colors cursor-pointer ${
                            selectedSong?.id === song.id
                              ? 'bg-indigo-50 border border-indigo-200'
                              : 'bg-white hover:bg-gray-50 border border-gray-100'
                          }`}
                          onClick={() => handleSongSelect(song)}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSongSelect(song);
                              handlePlayPause();
                            }}
                          >
                            {selectedSong?.id === song.id && isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <div className="flex-1">
                            <div className="font-medium">{song.title}</div>
                            <div className="text-sm text-gray-500">{song.artist}</div>
                          </div>
                          <div className="text-sm text-gray-400">{song.duration}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(song);
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="artists" className="mt-6 space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {musicGenres.slice(0, 8).map(genre => (
                      <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedGenre === genre
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>

                  <ScrollArea className="h-[600px]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredArtists.map(artist => (
                        <div
                          key={artist.id}
                          className="bg-white rounded-lg p-4 border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer"
                        >
                          <div className="w-full aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg mb-3 flex items-center justify-center">
                            <Music className="w-12 h-12 text-white opacity-50" />
                          </div>
                          <h3 className="font-semibold mb-1">{artist.name}</h3>
                          <p className="text-sm text-gray-500">{artist.country}</p>
                          <div className="flex gap-1 mt-2">
                            {artist.genre.slice(0, 2).map(g => (
                              <span key={g} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="playlists" className="mt-6">
                  <div className="text-center py-20">
                    <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl mb-2 text-gray-600">Create Your Playlist</h3>
                    <p className="text-gray-500 mb-6">Organize your favorite worship songs</p>
                    <Button>
                      <Music className="w-4 h-4 mr-2" />
                      New Playlist
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Now Playing</h3>
              {selectedSong ? (
                <div className="space-y-4">
                  <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Music className="w-20 h-20 text-white opacity-50" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{selectedSong.title}</h4>
                    <p className="text-gray-500">{selectedSong.artist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={handlePlayPause} className="flex-1">
                      {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <div className="pt-4 border-t">
                    <h5 className="font-medium mb-2 text-sm">Themes</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedSong.theme.map(theme => (
                        <span key={theme} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <Music className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Select a song to play</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
