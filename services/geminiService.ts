import { GoogleGenAI, Type } from "@google/genai";
import { HomeDashboardContent, DevotionalContent, BibleVerse, BibleContext } from "../types";
import { FALLBACK_DEVOTIONAL } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. Using fallback content.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// --- Home Dashboard Generator ---
export const generateHomeDashboard = async (): Promise<HomeDashboardContent> => {
  const ai = getClient();
  
  // Fallback structure adapted to new type if AI fails (simplified for brevity)
  const fallbackHome: HomeDashboardContent = {
    date: new Date().toISOString(),
    verse: {
      text: "For we walk by faith, not by sight.",
      reference: "2 Corinthians 5:7",
      context: "Paul is speaking about the eternal home and the courage believers have.",
      crossReferences: ["Hebrews 11:1", "Romans 8:24"],
      gospelConnection: "Our faith is anchored in the finished work of Christ, even when unseen."
    },
    passage: {
      reference: "Psalm 23",
      text: "The Lord is my shepherd...",
      outline: ["The Shepherd's Provision", "The Shepherd's Protection"],
      author: "David",
      historicalSetting: "Likely written later in David's life."
    },
    devotional: {
      title: FALLBACK_DEVOTIONAL.title,
      scriptureQuote: FALLBACK_DEVOTIONAL.scripture.text,
      shortReflection: FALLBACK_DEVOTIONAL.reflection.substring(0, 100) + "...",
      longReflection: FALLBACK_DEVOTIONAL.reflection,
      application: FALLBACK_DEVOTIONAL.stepOfFaith,
      prayerGuide: FALLBACK_DEVOTIONAL.prayer
    },
    questions: {
      heartCheck: "Is my heart at rest today?",
      beliefCheck: "Do I believe He is sufficient?",
      obedienceCheck: "What step is He calling me to?"
    },
    prayer: {
      focusTheme: "Trust",
      scripture: "Psalm 56:3",
      guidedPrayer: "Lord, when I am afraid, I put my trust in You."
    },
    theme: {
      theme: "Faithfulness",
      keyVerse: "Lamentations 3:23",
      supportingVerses: ["Psalm 89:1", "1 Thess 5:24"]
    },
    attribute: {
      attribute: "Immutable",
      definition: "God does not change.",
      scriptureProof: "Malachi 3:6",
      worshipResponse: "I praise You for being my solid rock."
    },
    gospel: {
      truth: "Christ died for the ungodly.",
      reference: "Romans 5:6",
      explanation: "We did not earn salvation; it was a gift while we were weak."
    },
    history: {
      event: "David anointed King",
      reference: "1 Samuel 16",
      description: "Samuel anoints the youngest son of Jesse.",
      timeline: { before: "Saul rejected", during: "Oil poured", after: "Spirit comes on David" }
    }
  };

  if (!ai) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return fallbackHome;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a massive, comprehensive daily dashboard content for a Christian app 'Ayumi'. Evangelical, ESV, born-again theology.",
      config: {
        systemInstruction: `
          You are a deep, theological content generator for a serious devotional app.
          Use English Standard Version (ESV).
          Theology: Evangelical, Born-Again, Scripture-First.
          Return a massive JSON object matching the exact schema provided.
          Do not hallucinate non-existent verses.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            verse: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                reference: { type: Type.STRING },
                context: { type: Type.STRING },
                crossReferences: { type: Type.ARRAY, items: { type: Type.STRING } },
                gospelConnection: { type: Type.STRING }
              },
              required: ["text", "reference", "context", "gospelConnection"]
            },
            passage: {
              type: Type.OBJECT,
              properties: {
                reference: { type: Type.STRING },
                text: { type: Type.STRING },
                outline: { type: Type.ARRAY, items: { type: Type.STRING } },
                author: { type: Type.STRING },
                historicalSetting: { type: Type.STRING }
              },
              required: ["reference", "text", "author"]
            },
            devotional: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                scriptureQuote: { type: Type.STRING },
                shortReflection: { type: Type.STRING },
                longReflection: { type: Type.STRING },
                application: { type: Type.STRING },
                prayerGuide: { type: Type.STRING }
              },
              required: ["title", "shortReflection", "longReflection"]
            },
            questions: {
              type: Type.OBJECT,
              properties: {
                heartCheck: { type: Type.STRING },
                beliefCheck: { type: Type.STRING },
                obedienceCheck: { type: Type.STRING }
              },
              required: ["heartCheck", "beliefCheck", "obedienceCheck"]
            },
            prayer: {
              type: Type.OBJECT,
              properties: {
                focusTheme: { type: Type.STRING },
                scripture: { type: Type.STRING },
                guidedPrayer: { type: Type.STRING }
              },
              required: ["focusTheme", "guidedPrayer"]
            },
            theme: {
              type: Type.OBJECT,
              properties: {
                theme: { type: Type.STRING },
                keyVerse: { type: Type.STRING },
                supportingVerses: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["theme", "keyVerse"]
            },
            attribute: {
              type: Type.OBJECT,
              properties: {
                attribute: { type: Type.STRING },
                definition: { type: Type.STRING },
                scriptureProof: { type: Type.STRING },
                worshipResponse: { type: Type.STRING }
              },
              required: ["attribute", "definition"]
            },
            gospel: {
              type: Type.OBJECT,
              properties: {
                truth: { type: Type.STRING },
                reference: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["truth", "explanation"]
            },
            history: {
              type: Type.OBJECT,
              properties: {
                event: { type: Type.STRING },
                reference: { type: Type.STRING },
                description: { type: Type.STRING },
                timeline: {
                   type: Type.OBJECT,
                   properties: {
                     before: { type: Type.STRING },
                     during: { type: Type.STRING },
                     after: { type: Type.STRING }
                   },
                   required: ["before", "during", "after"]
                }
              },
              required: ["event", "description", "timeline"]
            }
          },
          required: ["verse", "passage", "devotional", "questions", "prayer", "theme", "attribute", "gospel", "history"]
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response");
    return JSON.parse(jsonStr) as HomeDashboardContent;

  } catch (error) {
    console.error("Gemini dashboard error:", error);
    return fallbackHome;
  }
};

// --- Topical Devotional (Keep for compatibility) ---
export const generateDailyDevotional = async (topic?: string): Promise<DevotionalContent> => {
  const ai = getClient();
  if (!ai) { return FALLBACK_DEVOTIONAL; }
  return FALLBACK_DEVOTIONAL; 
};

// --- Bible Reader (Simulated via Gemini) ---
export const getBibleChapter = async (book: string, chapter: number): Promise<BibleVerse[]> => {
  const ai = getClient();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide the full text of ${book} chapter ${chapter} in ESV.`,
      config: {
        systemInstruction: "Return a JSON array of verses. Each object has 'book', 'chapter', 'verse' (number), and 'text'. Exact ESV text.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              book: { type: Type.STRING },
              chapter: { type: Type.INTEGER },
              verse: { type: Type.INTEGER },
              text: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Bible fetch error", e);
    return [];
  }
};

// --- Chapter Context (Outline, Author, etc.) ---
export const getChapterContext = async (book: string, chapter: number): Promise<BibleContext | null> => {
  const ai = getClient();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide deep context for ${book} chapter ${chapter}.`,
      config: {
        systemInstruction: `
          You are a biblical scholar. Provide context for the requested chapter.
          Evangelical perspective.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reference: { type: Type.STRING },
            outline: { type: Type.ARRAY, items: { type: Type.STRING } },
            author: { type: Type.STRING },
            historicalSetting: { type: Type.STRING },
            purpose: { type: Type.STRING },
            crossReferences: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["reference", "outline", "author", "historicalSetting", "purpose"]
        }
      }
    });
    return JSON.parse(response.text || "null");
  } catch (e) {
    console.error("Context fetch error", e);
    return null;
  }
};

// --- Guided Prayer Prompts ---
export const generatePrayerPrompts = async (verse: string): Promise<string[]> => {
  const ai = getClient();
  if (!ai) return ["Lord, help me apply this word.", "Father, thank You for Your truth."];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 short, personal prayer prompts based on: "${verse}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return ["Lord, teach me through this verse.", "Help me understand Your heart here."];
  }
};

// --- Prayer Generator (General) ---
export const generatePrayer = async (type: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Lord, teach us to pray.";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a short, heartfelt ${type} prayer.`,
    config: {
      responseMimeType: "text/plain",
    }
  });
  return response.text || "";
};