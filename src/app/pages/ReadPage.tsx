import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { 
  Highlighter, 
  Underline, 
  Circle, 
  Pencil, 
  StickyNote, 
  Bookmark,
  Download,
  Share2,
  Copy,
  Settings
} from 'lucide-react';
import { allBibleVersions } from '../data/bible-versions-extended';
import { sampleVerses } from '../data/sample-verses';
import { toast } from 'sonner';

const highlightColors = [
  { id: 'yellow', name: 'Yellow', value: '#FEF08A' },
  { id: 'green', name: 'Green', value: '#BBF7D0' },
  { id: 'blue', name: 'Blue', value: '#BFDBFE' },
  { id: 'pink', name: 'Pink', value: '#FBCFE8' },
  { id: 'purple', name: 'Purple', value: '#DDD6FE' },
  { id: 'orange', name: 'Orange', value: '#FED7AA' },
  { id: 'red', name: 'Red', value: '#FECACA' },
  { id: 'teal', name: 'Teal', value: '#99F6E4' },
];

export default function ReadPage() {
  const [selectedVersion, setSelectedVersion] = useState('niv');
  const [compareVersions, setCompareVersions] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(18);
  const [showVerseNumbers, setShowVerseNumbers] = useState(true);
  const [highlightMode, setHighlightMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState(highlightColors[0]);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);

  const handleExport = (format: string) => {
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  const handleShare = () => {
    toast.success('Share menu opened');
  };

  const handleCopy = () => {
    toast.success('Text copied to clipboard');
  };

  const handleHighlight = () => {
    setHighlightMode(!highlightMode);
    if (!highlightMode) {
      toast.success(`Highlight mode ON - ${selectedColor.name}`);
    }
  };

  const languages = Array.from(new Set(allBibleVersions.map(v => v.language))).sort();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl">ayumi</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Select defaultValue="pdf" onValueChange={handleExport}>
                    <SelectTrigger className="w-24">
                      <Download className="w-4 h-4 mr-1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="txt">TXT</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="md">MD</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select version" />
                  </SelectTrigger>
                  <SelectContent>
                    {allBibleVersions.map(version => (
                      <SelectItem key={version.id} value={version.id}>
                        {version.name} ({version.language})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select defaultValue="genesis">
                  <SelectTrigger>
                    <SelectValue placeholder="Select book" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="genesis">Genesis</SelectItem>
                    <SelectItem value="exodus">Exodus</SelectItem>
                    <SelectItem value="psalms">Psalms</SelectItem>
                    <SelectItem value="john">John</SelectItem>
                    <SelectItem value="romans">Romans</SelectItem>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Chapter" min="1" defaultValue="1" />
                  <Input type="number" placeholder="Verse" min="1" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={highlightMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleHighlight}
                >
                  <Highlighter className="w-4 h-4 mr-2" />
                  Highlight
                </Button>
                <Button variant="outline" size="sm">
                  <Underline className="w-4 h-4 mr-2" />
                  Underline
                </Button>
                <Button variant="outline" size="sm">
                  <Circle className="w-4 h-4 mr-2" />
                  Circle
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="w-4 h-4 mr-2" />
                  Draw
                </Button>
                <Button variant="outline" size="sm">
                  <StickyNote className="w-4 h-4 mr-2" />
                  Note
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmark
                </Button>
              </div>

              {highlightMode && (
                <div className="flex gap-2 mb-6">
                  {highlightColors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded border-2 transition-all ${
                        selectedColor.id === color.id ? 'border-gray-900 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              )}

              <ScrollArea className="h-[600px]">
                <div className="prose max-w-none" style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
                  {sampleVerses.slice(0, 10).map((verse, index) => (
                    <p key={index} className="mb-4">
                      {showVerseNumbers && (
                        <sup className="text-indigo-600 mr-2">{verse.verse}</sup>
                      )}
                      <span className="select-text cursor-text">{verse.text}</span>
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Reading Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Font Size: {fontSize}px</Label>
                  <input
                    type="range"
                    min="12"
                    max="32"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Show Verse Numbers</Label>
                  <Switch
                    checked={showVerseNumbers}
                    onCheckedChange={setShowVerseNumbers}
                  />
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block">Compare Versions</Label>
                  <div className="space-y-2">
                    {allBibleVersions.slice(0, 5).map(version => (
                      <div key={version.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`compare-${version.id}`}
                          checked={compareVersions.includes(version.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCompareVersions([...compareVersions, version.id]);
                            } else {
                              setCompareVersions(compareVersions.filter(v => v !== version.id));
                            }
                          }}
                          className="rounded"
                        />
                        <label htmlFor={`compare-${version.id}`} className="text-sm">
                          {version.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <Tabs defaultValue="highlights">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                </TabsList>
                <TabsContent value="highlights" className="mt-4">
                  <p className="text-sm text-gray-500">No highlights yet</p>
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                  <p className="text-sm text-gray-500">No notes yet</p>
                </TabsContent>
                <TabsContent value="bookmarks" className="mt-4">
                  <p className="text-sm text-gray-500">No bookmarks yet</p>
                </TabsContent>
              </Tabs>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
