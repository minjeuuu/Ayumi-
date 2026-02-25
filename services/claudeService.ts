import { HomeDashboardContent, DevotionalContent, BibleVerse, BibleContext } from "../types";
import { FALLBACK_DEVOTIONAL, CLAUDE_API_KEY } from "../constants";

const CLAUDE_API = 'https://api.anthropic.com/v1/messages';

// Helper: Call Claude API directly from browser
export const callClaude = async (prompt: string, systemPrompt?: string): Promise<string> => {
  try {
    const response = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2048,
        system: systemPrompt || 'You are a helpful Bible study assistant for the ayumi app.',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      throw new Error(`Claude API error: ${response.status}`);
    }
    const data = await response.json();
    return data.content?.[0]?.text || '';
  } catch (e) {
    console.error('Claude call error:', e);
    throw e;
  }
};

// Build a KJV Bible verse from known verses for offline fallback
const KJV_VERSES: Record<string, string[][]> = {
  'John': [
    [],
    ['In the beginning was the Word, and the Word was with God, and the Word was God.', 'The same was in the beginning with God.', 'All things were made by him; and without him was not any thing made that was made.', 'In him was life; and the life was the light of men.', 'And the light shineth in darkness; and the darkness comprehended it not.', 'There was a man sent from God, whose name was John.', 'The same came for a witness, to bear witness of the Light, that all men through him might believe.', 'He was not that Light, but was sent to bear witness of that Light.', 'That was the true Light, which lighteth every man that cometh into the world.', 'He was in the world, and the world was made by him, and the world knew him not.', 'He came unto his own, and his own received him not.', 'But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:', 'Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.', 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.'],
    ['And this is the record of John, when the Jews sent priests and Levites from Jerusalem to ask him, Who art thou?'],
    ['For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.', 'He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.', 'And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.'],
  ],
  'Psalms': [
    [],
    ['Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.', 'But his delight is in the law of the LORD; and in his law doth he meditate day and night.', 'And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.', 'The ungodly are not so: but are like the chaff which the wind driveth away.', 'Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous.', 'For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish.'],
    ['Why do the heathen rage, and the people imagine a vain thing?'],
    ['The LORD is my shepherd; I shall not want.', 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.', 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.', 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.', 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.'],
  ],
};

// Get Bible chapter - uses Bible API (free) then fallback to Claude
export const getBibleChapter = async (book: string, chapter: number, version = 'KJV'): Promise<BibleVerse[]> => {
  // Try Bible API (free, no key needed for KJV/ASV)
  try {
    // Using bible-api.com which is free
    const bookQuery = book.replace(/ /g, '+');
    const response = await fetch(`https://bible-api.com/${bookQuery}+${chapter}?translation=${version.toLowerCase()}`);
    if (response.ok) {
      const data = await response.json();
      if (data.verses && data.verses.length > 0) {
        return data.verses.map((v: any) => ({
          book,
          chapter,
          verse: v.verse,
          text: v.text.trim(),
          version,
        }));
      }
    }
  } catch (e) {
    console.log('Bible API failed, trying Claude...', e);
  }

  // Fallback: use local data for common books
  if (KJV_VERSES[book]?.[chapter]) {
    return KJV_VERSES[book][chapter].map((text, i) => ({
      book,
      chapter,
      verse: i + 1,
      text,
      version: 'KJV',
    }));
  }

  // Final fallback: Claude generates verses
  try {
    const text = await callClaude(
      `Write out ${book} chapter ${chapter} from the ${version} Bible translation, verse by verse. Format as JSON array: [{"verse": 1, "text": "..."}, ...]. Write the complete chapter with all verses.`,
      'You are a Bible translation expert. Provide accurate scripture text.'
    );
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const verses = JSON.parse(jsonMatch[0]);
      return verses.map((v: any) => ({ book, chapter, verse: v.verse, text: v.text, version }));
    }
  } catch (e) {
    console.error('Claude fallback error:', e);
  }

  return [{ book, chapter, verse: 1, text: `${book} ${chapter} - Loading...`, version }];
};

// Get chapter context
export const getChapterContext = async (book: string, chapter: number): Promise<BibleContext | null> => {
  try {
    const text = await callClaude(
      `Give context for ${book} chapter ${chapter}. Return JSON: {"reference":"${book} ${chapter}","outline":["..."],"author":"...","historicalSetting":"...","purpose":"...","crossReferences":["..."]}`,
      'You are a Biblical scholar. Be concise and accurate.'
    );
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('Context error:', e);
  }
  return null;
};

// Generate home dashboard
export const generateHomeDashboard = async (): Promise<HomeDashboardContent> => {
  const fallback: HomeDashboardContent = {
    date: new Date().toISOString(),
    verse: { text: "For we walk by faith, not by sight.", reference: "2 Corinthians 5:7", context: "Paul encourages believers to live by faith.", crossReferences: ["Hebrews 11:1", "Romans 8:24"], gospelConnection: "Our faith is anchored in Christ's finished work." },
    passage: { reference: "Psalm 23", text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.", outline: ["The Shepherd's Provision", "The Shepherd's Protection", "The Shepherd's Presence"], author: "David", historicalSetting: "Written from David's experience as a shepherd and king." },
    devotional: { title: "The Steady Walk", scriptureQuote: "For we walk by faith, not by sight. - 2 Corinthians 5:7", shortReflection: "Every step of faith is a declaration that God is trustworthy.", longReflection: "Our journey with Christ is often less about the destination and more about the daily rhythm of trust. Each step we take in faith draws us closer to His heart. Walking by faith means trusting God even when the way ahead is unclear.", application: "Take a 10-minute prayer walk today.", prayerGuide: "Lord, help me to walk by faith today. Guide my steps and keep my eyes on You." },
    questions: { heartCheck: "Is my heart at rest in God today?", beliefCheck: "Do I believe God is sufficient for every need?", obedienceCheck: "What step of obedience is the Spirit calling me to?" },
    prayer: { focusTheme: "Trust and Surrender", scripture: "Proverbs 3:5-6", guidedPrayer: "Lord, I choose to trust You with all my heart. Direct my paths today." },
    theme: { theme: "God's Faithfulness", keyVerse: "Great is Your faithfulness. - Lamentations 3:23", supportingVerses: ["Psalm 89:1", "1 Thessalonians 5:24"] },
    attribute: { attribute: "Immutable", definition: "God is unchanging in His character and promises.", scriptureProof: "I the Lord do not change. - Malachi 3:6", worshipResponse: "I praise You for being my unchanging Rock." },
    gospel: { truth: "Christ died for the ungodly", reference: "Romans 5:6-8", explanation: "While we were still sinners, Christ died for us. Salvation is entirely by grace." },
    history: { event: "David Anointed as King", reference: "1 Samuel 16", description: "God sends Samuel to anoint David as the future king of Israel.", timeline: { before: "Saul rejected by God", during: "Samuel anoints David", after: "David begins journey to the throne" } }
  };

  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const text = await callClaude(
      `Create a daily devotional dashboard for ${today}. Return valid JSON matching this structure exactly: {"date":"${new Date().toISOString()}","verse":{"text":"...","reference":"...","context":"...","crossReferences":["..."],"gospelConnection":"..."},"passage":{"reference":"...","text":"full passage text","outline":["..."],"author":"...","historicalSetting":"..."},"devotional":{"title":"...","scriptureQuote":"...","shortReflection":"...","longReflection":"...","application":"...","prayerGuide":"..."},"questions":{"heartCheck":"...","beliefCheck":"...","obedienceCheck":"..."},"prayer":{"focusTheme":"...","scripture":"...","guidedPrayer":"..."},"theme":{"theme":"...","keyVerse":"...","supportingVerses":["..."]},"attribute":{"attribute":"...","definition":"...","scriptureProof":"...","worshipResponse":"..."},"gospel":{"truth":"...","reference":"...","explanation":"..."},"history":{"event":"...","reference":"...","description":"...","timeline":{"before":"...","during":"...","after":"..."}}}`,
      'You are a Bible teacher. Create fresh, Scripture-based daily devotional content. Return only valid JSON.'
    );
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('Dashboard generation error:', e);
  }
  return fallback;
};

// Generate daily devotional
export const generateDailyDevotional = async (topic?: string): Promise<DevotionalContent> => {
  try {
    const t = await callClaude(
      `Generate a devotional${topic ? ` on the topic: ${topic}` : ''}. Return JSON: {"title":"...","scripture":{"text":"...","reference":"..."},"reflection":"...","prayer":"...","stepOfFaith":"...","tags":["..."]}`,
      'You are a devotional writer. Create authentic, Scripture-based content.'
    );
    const m = t.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
  } catch (e) {}
  return FALLBACK_DEVOTIONAL;
};

// Generate prayer
export const generatePrayer = async (type: string, context?: string): Promise<string> => {
  try {
    const text = await callClaude(
      `Write a heartfelt ${type} prayer${context ? ` about: ${context}` : ''}. Keep it 3-5 sentences, scripture-based, personal.`,
      'You are a prayer guide. Write authentic, biblical prayers.'
    );
    return text;
  } catch (e) {
    return "Lord, teach us to pray. Help us to seek Your face and trust in Your provision. Amen.";
  }
};

// Generate prayer prompts
export const generatePrayerPrompts = async (verse: string): Promise<string[]> => {
  try {
    const text = await callClaude(
      `Based on this verse: "${verse}", give 5 prayer prompts. Return JSON array: ["prompt1","prompt2","prompt3","prompt4","prompt5"]`,
      'You are a prayer guide.'
    );
    const m = text.match(/\[[\s\S]*\]/);
    if (m) return JSON.parse(m[0]);
  } catch (e) {}
  return ["Lord, help me apply this word.", "Father, thank You for Your truth.", "Show me how to live this out.", "Remove any unbelief from my heart.", "Let this word take root in me."];
};

// Search Bible
export const searchBible = async (query: string, version = 'KJV'): Promise<BibleVerse[]> => {
  // Try bible-api
  try {
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=${version.toLowerCase()}`);
    if (response.ok) {
      const data = await response.json();
      if (data.verses) {
        return data.verses.map((v: any) => ({
          book: v.book_name || query,
          chapter: v.chapter,
          verse: v.verse,
          text: v.text.trim(),
          version,
        }));
      }
    }
  } catch (e) {}

  // Claude search
  try {
    const text = await callClaude(
      `Find Bible verses about "${query}". Return 5-10 relevant verses as JSON: [{"book":"...","chapter":0,"verse":0,"text":"..."}]`,
      'You are a Bible concordance. Return accurate verse references.'
    );
    const m = text.match(/\[[\s\S]*\]/);
    if (m) {
      const vv = JSON.parse(m[0]);
      return vv.map((v: any) => ({ ...v, version }));
    }
  } catch (e) {}
  return [];
};

// Get verse explanation
export const explainVerse = async (verse: string, reference: string, level: string = 'adult'): Promise<string> => {
  try {
    const text = await callClaude(
      `Explain this Bible verse for a ${level}: "${verse}" (${reference}). Cover: what it says, what it means, historical context, and modern application. Be clear and engaging.`,
      'You are a Bible teacher who explains scripture clearly for different audiences.'
    );
    return text;
  } catch (e) {
    return `"${verse}" - ${reference}: This verse speaks of God's faithfulness and love for His people.`;
  }
};

// Generate verse image text
export const generateVerseImageCaption = async (verse: string, reference: string): Promise<string> => {
  try {
    const text = await callClaude(
      `Create a short, beautiful caption (1-2 sentences) to accompany this verse in a visual image: "${verse}" (${reference})`,
      'You create inspiring captions for scripture images.'
    );
    return text;
  } catch (e) {
    return reference;
  }
};

// Get study notes
export const generateStudyNotes = async (book: string, chapter: number): Promise<string> => {
  try {
    const text = await callClaude(
      `Provide detailed study notes for ${book} chapter ${chapter}. Include: themes, key words, cross-references, historical background, and application points.`,
      'You are a Biblical scholar providing thorough study notes.'
    );
    return text;
  } catch (e) {
    return `Study notes for ${book} ${chapter} will appear here.`;
  }
};

// Get topic verses
export const getTopicVerses = async (topic: string): Promise<{verse: string, reference: string, note: string}[]> => {
  try {
    const text = await callClaude(
      `List 10 Bible verses about "${topic}". Return JSON: [{"verse":"...","reference":"...","note":"why this relates"}]`,
      'You are a Bible concordance expert.'
    );
    const m = text.match(/\[[\s\S]*\]/);
    if (m) return JSON.parse(m[0]);
  } catch (e) {}
  return [];
};

// AI Chat
export const chatWithAI = async (message: string, history: {role: string, content: string}[]): Promise<string> => {
  try {
    const response = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: 'You are Ayumi, a gentle, knowledgeable Bible companion. Answer questions about scripture, faith, and spiritual growth with warmth and wisdom. Always point back to Scripture.',
        messages: [
          ...history.map(h => ({ role: h.role as 'user' | 'assistant', content: h.content })),
          { role: 'user', content: message }
        ],
      }),
    });
    const data = await response.json();
    return data.content?.[0]?.text || 'I am here to help you on your faith journey.';
  } catch (e) {
    return 'Let us seek wisdom together from God\'s Word. What would you like to explore?';
  }
};
