import { HomeDashboardContent, DevotionalContent, BibleVerse, BibleContext } from "../types";
import { FALLBACK_DEVOTIONAL } from "../constants";

const BACKEND_URL = 'http://localhost:8001';

// This service now calls our FastAPI backend which uses Claude
const getClient = () => {
  return true; // Backend handles the AI
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
      outline: ["The Shepherd's Provision", "The Shepherd's Protection", "The Shepherd's Presence"],
      author: "David",
      historicalSetting: "Likely written later in David's life, reflecting on God's faithfulness."
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
      heartCheck: "Is my heart at rest in God today, or am I anxious?",
      beliefCheck: "Do I truly believe that God is sufficient for my needs?",
      obedienceCheck: "What specific step of obedience is God calling me to take?"
    },
    prayer: {
      focusTheme: "Trust and Surrender",
      scripture: "Proverbs 3:5-6",
      guidedPrayer: "Lord, I choose to trust You with all my heart. Help me not to lean on my own understanding."
    },
    theme: {
      theme: "God's Faithfulness",
      keyVerse: "Great is Your faithfulness. - Lamentations 3:23",
      supportingVerses: ["Psalm 89:1", "1 Thessalonians 5:24", "Deuteronomy 7:9"]
    },
    attribute: {
      attribute: "Immutable",
      definition: "God is unchanging in His character, promises, and purposes.",
      scriptureProof: "I the Lord do not change. - Malachi 3:6",
      worshipResponse: "I praise You, Lord, for being my unchanging Rock in a world of constant change."
    },
    gospel: {
      truth: "Christ died for the ungodly",
      reference: "Romans 5:6-8",
      explanation: "While we were still sinners, Christ died for us. Salvation is entirely by grace, not by our works or merit."
    },
    history: {
      event: "David Anointed as King",
      reference: "1 Samuel 16",
      description: "God rejects Saul and sends Samuel to anoint David, the youngest son of Jesse, as the future king of Israel.",
      timeline: {
        before: "Saul rejected by God for disobedience",
        during: "Samuel anoints David; the Spirit of the Lord comes upon him",
        after: "David begins his journey to the throne, learning faithfulness through trials"
      }
    }
  };

  try {
    const response = await fetch(`${BACKEND_URL}/api/dashboard`);
    if (!response.ok) throw new Error('Backend error');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dashboard generation error:", error);
    return fallbackHome;
  }
};

// --- Topical Devotional ---
export const generateDailyDevotional = async (topic?: string): Promise<DevotionalContent> => {
  return FALLBACK_DEVOTIONAL;
};

// --- Bible Reader ---
export const getBibleChapter = async (book: string, chapter: number): Promise<BibleVerse[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/bible/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book, chapter, version: 'ESV' })
    });
    const data = await response.json();
    return data.verses || [];
  } catch (e) {
    console.error("Bible fetch error", e);
    return [];
  }
};

// --- Chapter Context ---
export const getChapterContext = async (book: string, chapter: number): Promise<BibleContext | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/bible/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book, chapter, version: 'ESV' })
    });
    const data = await response.json();
    return data.context || null;
  } catch (e) {
    console.error("Context fetch error", e);
    return null;
  }
};

// --- Guided Prayer Prompts ---
export const generatePrayerPrompts = async (verse: string): Promise<string[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/prayer/prompts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verse })
    });
    const data = await response.json();
    return data.prompts || ["Lord, help me apply this word.", "Father, thank You for Your truth."];
  } catch (e) {
    return ["Lord, teach me through this verse.", "Help me understand Your heart here."];
  }
};

// --- Prayer Generator ---
export const generatePrayer = async (type: string): Promise<string> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/prayer/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prayer_type: type })
    });
    const data = await response.json();
    return data.prayer || "Lord, teach us to pray.";
  } catch (e) {
    return "Lord, teach us to pray.";
  }
};
