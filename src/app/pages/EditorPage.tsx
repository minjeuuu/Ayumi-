import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Download, Copy, Share2, Eye, Palette, Type, Layout, Layers, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { fonts, fontCategories } from '../data/fonts';
import { backgrounds, canvasSizes } from '../data/backgrounds';
import { designPresets } from '../data/presets';
import { Verse } from '../data/sample-verses';
import { toast } from 'sonner';

interface DesignState {
  canvasSize: typeof canvasSizes[0];
  background: typeof backgrounds[0];
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
  textColor: string;
  textAlign: 'left' | 'center' | 'right';
  showVerseNumber: boolean;
  showReference: boolean;
  referencePosition: 'top' | 'bottom';
  padding: number;
  textShadow: boolean;
  textStroke: boolean;
  strokeWidth: number;
  strokeColor: string;
  opacity: number;
  rotation: number;
}

export default function EditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const verse = (location.state?.verse as Verse) || {
    reference: 'John 3:16',
    text: 'For God so loved the world...',
    bookFull: 'John',
    theme: ['Love']
  };

  const canvasRef = useRef<HTMLDivElement>(null);
  const [fontCategory, setFontCategory] = useState('All');
  const [backgroundCategory, setBackgroundCategory] = useState('All');

  const [design, setDesign] = useState<DesignState>({
    canvasSize: canvasSizes[0],
    background: backgrounds[0],
    fontFamily: 'Playfair Display',
    fontSize: 48,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.5,
    textColor: '#1F2937',
    textAlign: 'center',
    showVerseNumber: false,
    showReference: true,
    referencePosition: 'bottom',
    padding: 80,
    textShadow: false,
    textStroke: false,
    strokeWidth: 1,
    strokeColor: '#000000',
    opacity: 100,
    rotation: 0,
  });

  const updateDesign = (updates: Partial<DesignState>) => {
    setDesign(prev => ({ ...prev, ...updates }));
  };

  const handleExport = async (format: 'png' | 'jpg' | 'pdf') => {
    toast.success(`Exported as ${format.toUpperCase()}`);
  };

  const handleCopyImage = () => {
    toast.success('Image copied to clipboard');
  };

  const handleShare = () => {
    toast.success('Share menu opened');
  };

  const filteredFonts = fonts.filter(font => 
    fontCategory === 'All' || font.category === fontCategory
  );

  const filteredBackgrounds = backgrounds.filter(bg =>
    backgroundCategory === 'All' || 
    (bg.type === 'color' && backgroundCategory === 'Colors') ||
    (bg.type === 'gradient' && backgroundCategory === 'Gradients') ||
    (bg.type === 'texture' && backgroundCategory === 'Textures') ||
    (bg.type === 'image' && backgroundCategory === 'Images')
  );

  const getBackgroundStyle = () => {
    if (design.background.type === 'color') {
      return { backgroundColor: design.background.value };
    } else if (design.background.type === 'gradient') {
      return { background: design.background.value };
    }
    return { backgroundColor: '#FFFFFF' };
  };

  const getTextStyle = (): React.CSSProperties => {
    return {
      fontFamily: design.fontFamily,
      fontSize: `${design.fontSize}px`,
      fontWeight: design.fontWeight,
      letterSpacing: `${design.letterSpacing}px`,
      lineHeight: design.lineHeight,
      color: design.textColor,
      textAlign: design.textAlign,
      padding: `${design.padding}px`,
      opacity: design.opacity / 100,
      transform: `rotate(${design.rotation}deg)`,
      textShadow: design.textShadow ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
      WebkitTextStroke: design.textStroke ? `${design.strokeWidth}px ${design.strokeColor}` : 'none',
    };
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h2 className="font-semibold">Ayumi あゆみ</h2>
            <p className="text-sm text-gray-500">{verse.reference}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyImage}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Select defaultValue="png" onValueChange={(val) => handleExport(val as 'png' | 'jpg' | 'pdf')}>
            <SelectTrigger className="w-32">
              <Download className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="webp">WEBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
          <div 
            ref={canvasRef}
            className="shadow-2xl relative"
            style={{
              width: `${Math.min(design.canvasSize.width, 800)}px`,
              height: `${Math.min(design.canvasSize.height * (800 / design.canvasSize.width), 800)}px`,
              ...getBackgroundStyle(),
            }}
          >
            <div className="h-full flex flex-col justify-center" style={getTextStyle()}>
              {design.showReference && design.referencePosition === 'top' && (
                <div className="text-sm opacity-70 mb-4">{verse.reference}</div>
              )}
              <div>
                {design.showVerseNumber && <span className="opacity-60 mr-2">{verse.verse}</span>}
                {verse.text}
              </div>
              {design.showReference && design.referencePosition === 'bottom' && (
                <div className="text-sm opacity-70 mt-4">{verse.reference}</div>
              )}
            </div>
          </div>
        </div>

        <aside className="w-96 bg-white border-l border-gray-200 overflow-hidden flex flex-col">
          <Tabs defaultValue="style" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
              <TabsTrigger value="style">
                <Palette className="w-4 h-4 mr-1" />
                Style
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="w-4 h-4 mr-1" />
                Text
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="w-4 h-4 mr-1" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="effects">
                <Layers className="w-4 h-4 mr-1" />
                Effects
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <TabsContent value="style" className="p-6 space-y-6 mt-0">
                <div>
                  <Label className="mb-3 block">Canvas Size</Label>
                  <Select 
                    value={design.canvasSize.id} 
                    onValueChange={(val) => {
                      const size = canvasSizes.find(s => s.id === val);
                      if (size) updateDesign({ canvasSize: size });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {canvasSizes.map(size => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label className="mb-3 block">Background</Label>
                  <Tabs defaultValue="Colors" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="Colors" onClick={() => setBackgroundCategory('Colors')}>Colors</TabsTrigger>
                      <TabsTrigger value="Gradients" onClick={() => setBackgroundCategory('Gradients')}>Gradients</TabsTrigger>
                      <TabsTrigger value="Textures" onClick={() => setBackgroundCategory('Textures')}>Textures</TabsTrigger>
                      <TabsTrigger value="Images" onClick={() => setBackgroundCategory('Images')}>Images</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="grid grid-cols-5 gap-2 mt-4 max-h-64 overflow-y-auto">
                    {filteredBackgrounds.map(bg => (
                      <button
                        key={bg.id}
                        onClick={() => updateDesign({ background: bg })}
                        className={`h-12 rounded border-2 transition-all ${
                          design.background.id === bg.id 
                            ? 'border-indigo-500 ring-2 ring-indigo-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={
                          bg.type === 'color' 
                            ? { backgroundColor: bg.value } 
                            : bg.type === 'gradient' 
                            ? { background: bg.value }
                            : { backgroundColor: '#f3f4f6' }
                        }
                        title={bg.name}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="p-6 space-y-6 mt-0">
                <div>
                  <Label className="mb-3 block">Font Family</Label>
                  <Select value={fontCategory} onValueChange={setFontCategory}>
                    <SelectTrigger className="mb-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ScrollArea className="h-48 border rounded-md">
                    <div className="p-2 space-y-1">
                      {filteredFonts.map(font => (
                        <button
                          key={font.id}
                          onClick={() => updateDesign({ fontFamily: font.name })}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                            design.fontFamily === font.name ? 'bg-indigo-50 text-indigo-700' : ''
                          }`}
                          style={{ fontFamily: font.name }}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block">Font Size: {design.fontSize}px</Label>
                  <Slider
                    value={[design.fontSize]}
                    onValueChange={(val) => updateDesign({ fontSize: val[0] })}
                    min={12}
                    max={120}
                    step={1}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Font Weight: {design.fontWeight}</Label>
                  <Slider
                    value={[design.fontWeight]}
                    onValueChange={(val) => updateDesign({ fontWeight: val[0] })}
                    min={100}
                    max={900}
                    step={100}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Letter Spacing: {design.letterSpacing}px</Label>
                  <Slider
                    value={[design.letterSpacing]}
                    onValueChange={(val) => updateDesign({ letterSpacing: val[0] })}
                    min={-5}
                    max={20}
                    step={0.5}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Line Height: {design.lineHeight}</Label>
                  <Slider
                    value={[design.lineHeight]}
                    onValueChange={(val) => updateDesign({ lineHeight: val[0] })}
                    min={0.8}
                    max={3}
                    step={0.1}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={design.textColor}
                      onChange={(e) => updateDesign({ textColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={design.textColor}
                      onChange={(e) => updateDesign({ textColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="p-6 space-y-6 mt-0">
                <div>
                  <Label className="mb-2 block">Text Alignment</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['left', 'center', 'right'] as const).map(align => (
                      <Button
                        key={align}
                        variant={design.textAlign === align ? 'default' : 'outline'}
                        onClick={() => updateDesign({ textAlign: align })}
                        className="capitalize"
                      >
                        {align}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Padding: {design.padding}px</Label>
                  <Slider
                    value={[design.padding]}
                    onValueChange={(val) => updateDesign({ padding: val[0] })}
                    min={0}
                    max={200}
                    step={10}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Show Verse Number</Label>
                  <Switch
                    checked={design.showVerseNumber}
                    onCheckedChange={(val) => updateDesign({ showVerseNumber: val })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show Reference</Label>
                  <Switch
                    checked={design.showReference}
                    onCheckedChange={(val) => updateDesign({ showReference: val })}
                  />
                </div>

                {design.showReference && (
                  <div>
                    <Label className="mb-2 block">Reference Position</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['top', 'bottom'] as const).map(pos => (
                        <Button
                          key={pos}
                          variant={design.referencePosition === pos ? 'default' : 'outline'}
                          onClick={() => updateDesign({ referencePosition: pos })}
                          className="capitalize"
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="mb-2 block">Rotation: {design.rotation}°</Label>
                  <Slider
                    value={[design.rotation]}
                    onValueChange={(val) => updateDesign({ rotation: val[0] })}
                    min={-45}
                    max={45}
                    step={1}
                  />
                </div>
              </TabsContent>

              <TabsContent value="effects" className="p-6 space-y-6 mt-0">
                <div>
                  <Label className="mb-2 block">Opacity: {design.opacity}%</Label>
                  <Slider
                    value={[design.opacity]}
                    onValueChange={(val) => updateDesign({ opacity: val[0] })}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Text Shadow</Label>
                  <Switch
                    checked={design.textShadow}
                    onCheckedChange={(val) => updateDesign({ textShadow: val })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>Text Stroke</Label>
                  <Switch
                    checked={design.textStroke}
                    onCheckedChange={(val) => updateDesign({ textStroke: val })}
                  />
                </div>

                {design.textStroke && (
                  <>
                    <div>
                      <Label className="mb-2 block">Stroke Width: {design.strokeWidth}px</Label>
                      <Slider
                        value={[design.strokeWidth]}
                        onValueChange={(val) => updateDesign({ strokeWidth: val[0] })}
                        min={0.5}
                        max={10}
                        step={0.5}
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">Stroke Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={design.strokeColor}
                          onChange={(e) => updateDesign({ strokeColor: e.target.value })}
                          className="w-20 h-10"
                        />
                        <Input
                          type="text"
                          value={design.strokeColor}
                          onChange={(e) => updateDesign({ strokeColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </aside>
      </div>
    </div>
  );
}