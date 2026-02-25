import { useState } from 'react';
import { Plus, BookOpen, Download, Share2, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { journalCovers, pageStyles, journalCategories } from '../data/journal-covers';
import { toast } from 'sonner';

interface Journal {
  id: string;
  title: string;
  cover: typeof journalCovers[0];
  pageStyle: typeof pageStyles[0];
  entries: number;
  createdAt: Date;
}

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newJournalTitle, setNewJournalTitle] = useState('');
  const [selectedCover, setSelectedCover] = useState(journalCovers[0]);
  const [selectedPageStyle, setSelectedPageStyle] = useState(pageStyles[0]);
  const [coverCategory, setCoverCategory] = useState('All');

  const handleCreateJournal = () => {
    if (!newJournalTitle.trim()) {
      toast.error('Please enter a journal title');
      return;
    }

    const newJournal: Journal = {
      id: Date.now().toString(),
      title: newJournalTitle,
      cover: selectedCover,
      pageStyle: selectedPageStyle,
      entries: 0,
      createdAt: new Date(),
    };

    setJournals([newJournal, ...journals]);
    setNewJournalTitle('');
    setIsCreating(false);
    toast.success('Journal created successfully');
  };

  const filteredCovers = coverCategory === 'All' 
    ? journalCovers 
    : journalCovers.filter(c => c.category === coverCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">My Journals</h1>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Journal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Journal</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div>
                  <Label className="mb-2 block">Journal Title</Label>
                  <Input
                    placeholder="Enter journal title..."
                    value={newJournalTitle}
                    onChange={(e) => setNewJournalTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Choose Cover</Label>
                  <Tabs defaultValue="All" className="w-full">
                    <TabsList className="flex flex-wrap h-auto">
                      {journalCategories.slice(0, 8).map(cat => (
                        <TabsTrigger 
                          key={cat} 
                          value={cat}
                          onClick={() => setCoverCategory(cat)}
                          className="text-xs"
                        >
                          {cat}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                  <div className="grid grid-cols-4 gap-3 mt-4 max-h-96 overflow-y-auto">
                    {filteredCovers.map(cover => (
                      <button
                        key={cover.id}
                        onClick={() => setSelectedCover(cover)}
                        className={`aspect-[3/4] rounded-lg border-2 transition-all ${
                          selectedCover.id === cover.id 
                            ? 'border-indigo-500 ring-2 ring-indigo-200 scale-105' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={
                          cover.type === 'color' 
                            ? { backgroundColor: cover.value } 
                            : cover.type === 'gradient' 
                            ? { background: cover.value }
                            : { backgroundColor: '#f3f4f6' }
                        }
                        title={cover.name}
                      >
                        <div className="h-full flex items-end p-2">
                          <span className="text-xs text-gray-700 bg-white/80 px-2 py-1 rounded">
                            {cover.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Page Style</Label>
                  <Select 
                    value={selectedPageStyle.id} 
                    onValueChange={(val) => {
                      const style = pageStyles.find(s => s.id === val);
                      if (style) setSelectedPageStyle(style);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pageStyles.map(style => (
                        <SelectItem key={style.id} value={style.id}>
                          <div>
                            <div className="font-medium">{style.name}</div>
                            <div className="text-xs text-gray-500">{style.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateJournal}>
                    Create Journal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search journals..."
              className="pl-10"
            />
          </div>
        </div>

        {journals.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl mb-2 text-gray-600">No journals yet</h3>
            <p className="text-gray-500 mb-6">Create your first journal to start writing</p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Journal
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {journals.map(journal => (
              <div key={journal.id} className="group cursor-pointer">
                <div 
                  className="aspect-[3/4] rounded-lg shadow-md transition-all group-hover:shadow-xl group-hover:scale-105 mb-3"
                  style={
                    journal.cover.type === 'color' 
                      ? { backgroundColor: journal.cover.value } 
                      : journal.cover.type === 'gradient' 
                      ? { background: journal.cover.value }
                      : { backgroundColor: '#f3f4f6' }
                  }
                >
                  <div className="h-full flex flex-col justify-between p-4">
                    <div className="text-sm text-gray-700 bg-white/80 px-2 py-1 rounded self-start">
                      {journal.title}
                    </div>
                    <div className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded self-end">
                      {journal.entries} entries
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
