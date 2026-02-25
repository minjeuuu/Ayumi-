import { useState } from 'react';
import { Heart, Plus, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner';

interface PrayerRequest {
  id: string;
  title: string;
  text: string;
  date: Date;
  answered: boolean;
  category: string;
}

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPrayer, setNewPrayer] = useState({ title: '', text: '', category: 'Personal' });

  const handleAddPrayer = () => {
    if (!newPrayer.title.trim() || !newPrayer.text.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const prayer: PrayerRequest = {
      id: Date.now().toString(),
      title: newPrayer.title,
      text: newPrayer.text,
      date: new Date(),
      answered: false,
      category: newPrayer.category,
    };

    setPrayers([prayer, ...prayers]);
    setNewPrayer({ title: '', text: '', category: 'Personal' });
    setIsCreating(false);
    toast.success('Prayer request added');
  };

  const handleMarkAnswered = (id: string) => {
    setPrayers(prayers.map(p => p.id === id ? { ...p, answered: true } : p));
    toast.success('Marked as answered');
  };

  const activePrayers = prayers.filter(p => !p.answered);
  const answeredPrayers = prayers.filter(p => p.answered);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl">Prayer Journal</h1>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Prayer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Prayer Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block mb-2 font-medium text-sm">Title</label>
                    <Input
                      placeholder="Prayer title..."
                      value={newPrayer.title}
                      onChange={(e) => setNewPrayer({ ...newPrayer, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm">Category</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Personal', 'Family', 'Health', 'Work', 'Ministry', 'Other'].map(cat => (
                        <Button
                          key={cat}
                          variant={newPrayer.category === cat ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setNewPrayer({ ...newPrayer, category: cat })}
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm">Prayer</label>
                    <Textarea
                      placeholder="Write your prayer..."
                      value={newPrayer.text}
                      onChange={(e) => setNewPrayer({ ...newPrayer, text: e.target.value })}
                      className="min-h-32"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddPrayer}>
                      Add Prayer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">
                Active ({activePrayers.length})
              </TabsTrigger>
              <TabsTrigger value="answered">
                Answered ({answeredPrayers.length})
              </TabsTrigger>
              <TabsTrigger value="all">
                All ({prayers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              {activePrayers.length === 0 ? (
                <Card className="p-12 text-center">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No active prayer requests</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activePrayers.map(prayer => (
                    <Card key={prayer.id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{prayer.title}</h3>
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                              {prayer.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4" />
                            {prayer.date.toLocaleDateString()}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAnswered(prayer.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Answered
                        </Button>
                      </div>
                      <p className="text-gray-700">{prayer.text}</p>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="answered" className="mt-6">
              {answeredPrayers.length === 0 ? (
                <Card className="p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No answered prayers yet</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {answeredPrayers.map(prayer => (
                    <Card key={prayer.id} className="p-6 bg-green-50 border-green-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{prayer.title}</h3>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Answered
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mb-3">
                            {prayer.date.toLocaleDateString()}
                          </div>
                          <p className="text-gray-700">{prayer.text}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {prayers.map(prayer => (
                  <Card key={prayer.id} className={`p-6 ${prayer.answered ? 'bg-green-50 border-green-200' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{prayer.title}</h3>
                          <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                            {prayer.category}
                          </span>
                          {prayer.answered && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Answered
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mb-3">
                          {prayer.date.toLocaleDateString()}
                        </div>
                        <p className="text-gray-700">{prayer.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
