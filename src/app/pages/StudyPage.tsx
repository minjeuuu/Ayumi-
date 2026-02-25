import { useState } from 'react';
import { BookOpen, Search, Lightbulb, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { explainVerse, answerBibleQuestion } from '../config/claude';
import { toast } from 'sonner';

export default function StudyPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [ageLevel, setAgeLevel] = useState('adult');

  const handleAsk = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setLoading(true);
    try {
      const response = await answerBibleQuestion(question);
      setAnswer(response);
      toast.success('Answer received');
    } catch (error) {
      toast.error('Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 md:pt-16">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl">Bible Study Assistant</h1>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Ask a Question</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Textarea
                    placeholder="Ask anything about the Bible..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="pl-10 min-h-32"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Understanding Level</label>
                <div className="grid grid-cols-4 gap-2">
                  {['child', 'teen', 'adult', 'scholar'].map(level => (
                    <Button
                      key={level}
                      variant={ageLevel === level ? 'default' : 'outline'}
                      onClick={() => setAgeLevel(level)}
                      className="capitalize"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handleAsk} disabled={loading} className="w-full" size="lg">
                {loading ? (
                  'Getting Answer...'
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Ask Claude
                  </>
                )}
              </Button>

              {answer && (
                <Card className="p-6 bg-indigo-50 border-indigo-200">
                  <h3 className="font-semibold mb-3 text-indigo-900">Answer:</h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {answer}
                  </div>
                </Card>
              )}
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Parallel Reading</h3>
                <p className="text-sm text-gray-600">Compare multiple Bible versions side by side</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Cross References</h3>
                <p className="text-sm text-gray-600">Discover related verses and themes</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Original Languages</h3>
                <p className="text-sm text-gray-600">Explore Hebrew, Greek, and Aramaic roots</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
