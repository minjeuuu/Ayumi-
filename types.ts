export interface Scripture {
  text: string;
  reference: string;
}

export interface DevotionalContent {
  title: string;
  scripture: Scripture;
  reflection: string;
  prayer: string;
  stepOfFaith: string;
  tags?: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title?: string;
  text: string;
  tags: string[];
  linkedScripture?: string;
}

export type PrayerCategory = 'Personal' | 'Family' | 'Church' | 'Work' | 'Nation' | 'World';

export interface PrayerRequest {
  id: string;
  title: string;
  details: string;
  category: PrayerCategory;
  status: 'active' | 'answered' | 'archived';
  dateAdded: string;
  dateAnswered?: string;
  linkedVerse?: string;
}

export interface PrayerSession {
  id: string;
  date: string;
  content: string;
  durationSeconds: number;
}

export interface PrayerItem {
  // Deprecated in favor of PrayerRequest, keeping for backwards compatibility if needed
  id: string;
  text: string;
  category: string;
  isAnswered: boolean;
  dateAdded: string;
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleContext {
  reference: string;
  outline: string[];
  author: string;
  historicalSetting: string;
  purpose: string;
  crossReferences: string[];
}

export type BibleBookCategory = 'Law' | 'History' | 'Poetry' | 'Major Prophets' | 'Minor Prophets' | 'Gospels' | 'Acts' | 'Epistles' | 'General Epistles' | 'Revelation';

export interface BibleBookDef {
  name: string;
  category: BibleBookCategory;
  chapters: number;
  testament: 'OT' | 'NT';
}

export type ReadingMode = 'normal' | 'verse-by-verse' | 'reader' | 'study';

// --- HOME DASHBOARD SPECIFIC TYPES ---

export interface HomeSectionVerse {
  text: string;
  reference: string;
  context: string;
  crossReferences: string[];
  gospelConnection: string;
}

export interface HomeSectionPassage {
  reference: string;
  text: string; // Multi-paragraph
  outline: string[];
  author: string;
  historicalSetting: string;
}

export interface HomeSectionDevotional {
  title: string;
  scriptureQuote: string;
  shortReflection: string;
  longReflection: string;
  application: string;
  prayerGuide: string;
}

export interface HomeSectionQuestions {
  heartCheck: string;
  beliefCheck: string;
  obedienceCheck: string;
}

export interface HomeSectionPrayer {
  focusTheme: string;
  scripture: string;
  guidedPrayer: string;
}

export interface HomeSectionTheme {
  theme: string;
  keyVerse: string;
  supportingVerses: string[];
}

export interface HomeSectionAttribute {
  attribute: string;
  definition: string;
  scriptureProof: string;
  worshipResponse: string;
}

export interface HomeSectionGospel {
  truth: string;
  reference: string;
  explanation: string;
}

export interface HomeSectionHistory {
  event: string;
  reference: string;
  description: string;
  timeline: { before: string; during: string; after: string };
}

export interface HomeDashboardContent {
  date: string;
  verse: HomeSectionVerse;
  passage: HomeSectionPassage;
  devotional: HomeSectionDevotional;
  questions: HomeSectionQuestions;
  prayer: HomeSectionPrayer;
  theme: HomeSectionTheme;
  attribute: HomeSectionAttribute;
  gospel: HomeSectionGospel;
  history: HomeSectionHistory;
}

export enum Tab {
  HOME = 'HOME',
  READ = 'READ',
  DEVOTIONAL = 'DEVOTIONAL',
  PRAYER = 'PRAYER',
  JOURNAL = 'JOURNAL',
  STUDY = 'STUDY',
  PLANS = 'PLANS',
  TOPICS = 'TOPICS',
  SEARCH = 'SEARCH',
  SAVED = 'SAVED',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
}

export enum AppState {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR',
}