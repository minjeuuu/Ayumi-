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
  mood?: string;
  coverStyle?: string;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
}

export interface Highlight {
  id: string;
  verseRef: string;
  text: string;
  color: string;
  note?: string;
  dateAdded: string;
  book: string;
  chapter: number;
  verse: number;
  version: string;
}

export interface SavedBookmark {
  id: string;
  book: string;
  chapter: number;
  verse?: number;
  version: string;
  note?: string;
  dateAdded: string;
  label?: string;
  color?: string;
}

export type PrayerCategory = 'Personal' | 'Family' | 'Church' | 'Work' | 'Nation' | 'World' | 'Healing' | 'Guidance' | 'Gratitude' | 'Intercession';

export interface PrayerRequest {
  id: string;
  title: string;
  details: string;
  category: PrayerCategory;
  status: 'active' | 'answered' | 'archived';
  dateAdded: string;
  dateAnswered?: string;
  linkedVerse?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
}

export interface PrayerSession {
  id: string;
  date: string;
  content: string;
  durationSeconds: number;
  type?: string;
}

export interface PrayerItem {
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
  version?: string;
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
  abbr?: string;
}

export type ReadingMode = 'normal' | 'verse-by-verse' | 'reader' | 'study' | 'parallel' | 'interlinear';

export interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  language: string;
  languageCode: string;
  year?: number;
  publisher?: string;
  type?: 'formal' | 'dynamic' | 'paraphrase' | 'literal';
  region?: string;
}

export interface WorshipSong {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  lyrics?: string;
  youtubeId?: string;
  genre?: string;
  tags?: string[];
  language?: string;
}

export interface VerseImageData {
  id: string;
  verseRef: string;
  verseText: string;
  backgroundStyle: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  overlayColor?: string;
  width: number;
  height: number;
  dateCreated: string;
}

export interface StudyNote {
  id: string;
  verseRef: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  type: 'observation' | 'interpretation' | 'application' | 'question';
  dateAdded: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  progress: number;
  passages: string[];
  category?: string;
}

export interface HomeSectionVerse {
  text: string;
  reference: string;
  context: string;
  crossReferences: string[];
  gospelConnection: string;
}

export interface HomeSectionPassage {
  reference: string;
  text: string;
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
  WORSHIP = 'WORSHIP',
  STUDY = 'STUDY',
  PLANS = 'PLANS',
  TOPICS = 'TOPICS',
  SEARCH = 'SEARCH',
  SAVED = 'SAVED',
  HIGHLIGHTS = 'HIGHLIGHTS',
  VERSE_IMAGE = 'VERSE_IMAGE',
  HODOU = 'HODOU',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
}

export enum AppState {
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR',
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'sepia' | 'forest' | 'ocean';
  fontSize: number;
  fontFamily: string;
  defaultBibleVersion: string;
  language: string;
  animationsEnabled: boolean;
  footstepAnimation: boolean;
  showVerseNumbers: boolean;
  dyslexiaFriendly: boolean;
  highContrast: boolean;
  largeText: boolean;
  parallelVersion?: string;
}
