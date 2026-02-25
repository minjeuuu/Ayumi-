import { Video, Play } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-3 mb-6">
          <Video className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl">Bible Media</h1>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="overflow-hidden cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center relative">
                    <Play className="w-16 h-16 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Bible Story {i}</h3>
                    <p className="text-sm text-gray-500">Animated explanation</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Audio content coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="animations" className="mt-6">
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Animations coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
