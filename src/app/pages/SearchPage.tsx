import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { sampleVerses } from '../data/sample-verses';
import { Card } from '../components/ui/card';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredVerses = sampleVerses.filter(v =>
    v.text.toLowerCase().includes(query.toLowerCase()) ||
    v.reference.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <SearchIcon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl">Search</h1>
          </div>

          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by word, phrase, theme, or emotion..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>

          <Tabs defaultValue="verses" className="w-full">
            <TabsList>
              <TabsTrigger value="verses">Verses</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
            </TabsList>

            <TabsContent value="verses" className="mt-6 space-y-4">
              {query === '' ? (
                <Card className="p-12 text-center">
                  <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Start typing to search...</p>
                </Card>
              ) : filteredVerses.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-gray-500">No results found</p>
                </Card>
              ) : (
                filteredVerses.map((verse, index) => (
                  <Card key={index} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-semibold text-indigo-600 mb-2">{verse.reference}</h3>
                    <p className="text-gray-700">{verse.text}</p>
                    <div className="flex gap-2 mt-3">
                      {verse.theme.map(t => (
                        <span key={t} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="themes" className="mt-6">
              <Card className="p-12 text-center">
                <p className="text-gray-500">Theme search coming soon</p>
              </Card>
            </TabsContent>

            <TabsContent value="books" className="mt-6">
              <Card className="p-12 text-center">
                <p className="text-gray-500">Book search coming soon</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
