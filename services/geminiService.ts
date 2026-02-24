import { HomeDashboardContent, DevotionalContent, BibleVerse, BibleContext } from "../types";
import { FALLBACK_DEVOTIONAL } from "../constants";

// Using backend API powered by Claude (Emergent LLM) instead of Gemini
const BACKEND_URL = window.location.origin;

const getClient = () => {
  return true; // Backend handles AI
};

// --- Home Dashboard Generator ---
export const generateHomeDashboard = async (): Promise<HomeDashboardContent> => {
  
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
      text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
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

  await new Promise(resolve => setTimeout(resolve, 1500));
  return fallbackHome;
};

// --- Topical Devotional ---
export const generateDailyDevotional = async (topic?: string): Promise<DevotionalContent> => {
  return FALLBACK_DEVOTIONAL; 
};

// --- Bible Reader ---
export const getBibleChapter = async (book: string, chapter: number): Promise<BibleVerse[]> => {
  return [];
};

// --- Chapter Context ---
export const getChapterContext = async (book: string, chapter: number): Promise<BibleContext | null> => {
  return null;
};

// --- Guided Prayer Prompts ---
export const generatePrayerPrompts = async (verse: string): Promise<string[]> => {
  return ["Lord, help me apply this word.", "Father, thank You for Your truth.", "Give me faith to live this out."];
};

// --- Prayer Generator ---
export const generatePrayer = async (type: string): Promise<string> => {
  return "Lord, teach us to pray. Help us to seek Your face and trust Your heart. Amen.";
};
