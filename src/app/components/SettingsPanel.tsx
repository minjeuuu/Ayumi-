import { useState } from 'react';
import { Settings, Globe, Type, Palette, Moon, Download, Shield } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

export function SettingsPanel() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState('en');
  const [autoSave, setAutoSave] = useState(true);
  const [animations, setAnimations] = useState(true);

  const handleExportData = () => {
    toast.success('Exporting all data...');
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all local data?')) {
      localStorage.clear();
      toast.success('All data cleared');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <Label>Language</Label>
                  </div>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label>Auto-save</Label>
                <Switch checked={autoSave} onCheckedChange={setAutoSave} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Animations</Label>
                <Switch checked={animations} onCheckedChange={setAnimations} />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-indigo-600" />
                  <Label>Dark Mode</Label>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <Separator />

              <div>
                <Label className="mb-3 block">Default Font Size: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(val) => setFontSize(val[0])}
                  min={12}
                  max={24}
                  step={1}
                />
              </div>

              <Separator />

              <div>
                <Label className="mb-2 block">Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">Light</Button>
                  <Button variant="outline">Dark</Button>
                  <Button variant="outline">Auto</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reading" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Default Bible Version</Label>
                <Select defaultValue="niv">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="niv">NIV</SelectItem>
                    <SelectItem value="esv">ESV</SelectItem>
                    <SelectItem value="kjv">KJV</SelectItem>
                    <SelectItem value="nlt">NLT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label>Show Verse Numbers</Label>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Cross References</Label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label>Highlight New Verses</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold">Privacy First</h3>
                  <p className="text-sm text-gray-500">All your data is stored locally on your device</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button variant="outline" className="w-full" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </Button>

                <Button variant="outline" className="w-full text-red-600 hover:text-red-700" onClick={handleClearData}>
                  Clear All Data
                </Button>
              </div>

              <Separator />

              <div className="text-sm text-gray-500 space-y-2">
                <p>No account required</p>
                <p>No data sent to servers</p>
                <p>No tracking or analytics</p>
                <p>Your data stays with you</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPanel;
