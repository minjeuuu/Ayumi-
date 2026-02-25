import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Sparkles, Shuffle, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { bibleVersions, verseThemes } from '../data/bible-versions';
import { sampleVerses, Verse } from '../data/sample-verses';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleVerseSelect = (verse: Verse) => {
    navigate('/editor', { state: { verse } });
  };

  const handleRandomVerse = () => {
    const randomVerse = sampleVerses[Math.floor(Math.random() * sampleVerses.length)];
    navigate('/editor', { state: { verse: randomVerse } });
  };

  const handleDailyVerse = () => {
    const today = new Date().getDay();
    const dailyVerse = sampleVerses[today % sampleVerses.length];
    navigate('/editor', { state: { verse: dailyVerse } });
  };

  const filteredVerses = sampleVerses.filter(verse => {
    const matchesSearch = searchQuery === '' || 
      verse.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verse.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = selectedTheme === '' || verse.theme.includes(selectedTheme);
    return matchesSearch && matchesTheme;
  });

  const uniqueLanguages = Array.from(new Set(bibleVersions.map(v => v.language))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl mb-4">
            ayumi <span className="text-indigo-600">あゆみ</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Scripture into art</p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Button size="lg" onClick={handleRandomVerse} className="gap-2">
              <Shuffle className="w-5 h-5" />
              Random Verse
            </Button>
            <Button size="lg" variant="outline" onClick={handleDailyVerse} className="gap-2">
              <Calendar className="w-5 h-5" />
              Daily Verse
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search verses by words or reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-lg"
                />
              </div>

              <div className="flex gap-4">
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Themes</SelectItem>
                    {verseThemes.map(theme => (
                      <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {filteredVerses.map((verse, index) => (
                  <div
                    key={index}
                    onClick={() => handleVerseSelect(verse)}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-indigo-600">{verse.reference}</h3>
                      <div className="flex gap-2">
                        {verse.theme.slice(0, 3).map(theme => (
                          <span key={theme} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{verse.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="browse" className="space-y-6">
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-2xl mb-4">Browse by Theme</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
                  {verseThemes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => {
                        setSelectedTheme(theme);
                      }}
                      className="bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 px-4 py-3 rounded-lg transition-colors"
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="versions" className="space-y-6">
              <div className="mb-6">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Languages</SelectItem>
                    {uniqueLanguages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bibleVersions
                  .filter(v => selectedLanguage === '' || v.language === selectedLanguage)
                  .map(version => (
                    <div
                      key={version.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{version.name}</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">{version.language}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-indigo-600">{version.category}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-20 text-center text-gray-500 text-sm">
          <p>No likes. No comments. No followers. Just Scripture and art.</p>
          <p className="mt-2">Privacy-focused. Local-first storage.</p>
        </div>
      </div>
    </div>
  );
}