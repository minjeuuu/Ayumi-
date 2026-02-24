"""
Data Models for Ayumi - Walking with God
Comprehensive models for Bible versions, worship music, journals, and more
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class BibleVersionInfo(BaseModel):
    """Bible version/translation information"""
    id: str
    name: str
    abbreviation: str
    language: str
    language_code: str
    year: Optional[int] = None
    description: Optional[str] = None
    translation_type: str = "formal"
    is_active: bool = True


class BibleVerse(BaseModel):
    """Single Bible verse"""
    book: str
    chapter: int
    verse: int
    text: str
    version: str = "ESV"


class BibleChapter(BaseModel):
    """Complete Bible chapter"""
    book: str
    chapter: int
    verses: List[BibleVerse]
    version: str = "ESV"


class HighlightColor(BaseModel):
    """Highlight color definition"""
    id: str
    name: str
    hex_color: str
    rgba: str
    category: str = "default"


class FontDefinition(BaseModel):
    """Font definition"""
    id: str
    name: str
    family: str
    category: str
    weight: str = "normal"
    style: str = "normal"
    is_web_safe: bool = False
    google_font: bool = False


class JournalCover(BaseModel):
    """Journal cover design"""
    id: str
    name: str
    category: str
    image_url: Optional[str] = None
    color_scheme: List[str] = []
    is_premium: bool = False


class JournalEntry(BaseModel):
    """User journal entry"""
    id: str
    user_id: str
    title: Optional[str] = None
    content: str
    date: datetime
    tags: List[str] = []
    linked_scripture: Optional[str] = None
    cover_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class WorshipArtist(BaseModel):
    """Worship music artist/band"""
    id: str
    name: str
    country: str
    genre: List[str] = ["Christian", "Worship"]
    description: Optional[str] = None
    image_url: Optional[str] = None
    social_links: Dict[str, str] = {}


class WorshipSong(BaseModel):
    """Worship song"""
    id: str
    title: str
    artist_id: str
    artist_name: str
    album: Optional[str] = None
    year: Optional[int] = None
    duration_seconds: Optional[int] = None
    youtube_id: Optional[str] = None
    spotify_id: Optional[str] = None
    lyrics: Optional[str] = None
    key: Optional[str] = None
    tempo: Optional[int] = None
    tags: List[str] = []


class WorshipPlaylist(BaseModel):
    """Worship music playlist"""
    id: str
    user_id: str
    name: str
    description: Optional[str] = None
    song_ids: List[str] = []
    is_public: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)


class VerseImageStyle(BaseModel):
    """Aesthetic verse image style"""
    id: str
    name: str
    font_id: str
    background_type: str
    background_value: str
    text_color: str
    alignment: str = "center"
    padding: int = 20
    effects: Dict[str, Any] = {}


class VerseImage(BaseModel):
    """Generated verse image"""
    id: str
    user_id: str
    verse_text: str
    verse_reference: str
    style_id: str
    image_data: str
    format: str = "png"
    width: int
    height: int
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ExportFormat(str, Enum):
    """Supported export formats"""
    PDF = "pdf"
    DOCX = "docx"
    HTML = "html"
    PNG = "png"
    JPG = "jpg"
    PPTX = "pptx"
    TXT = "txt"
    MD = "markdown"


class ExportRequest(BaseModel):
    """Export request"""
    content_type: str
    content_id: str
    format: ExportFormat
    options: Dict[str, Any] = {}


class PrayerRequest(BaseModel):
    """Prayer request"""
    id: str
    user_id: str
    title: str
    details: str
    category: str
    status: str = "active"
    date_added: datetime = Field(default_factory=datetime.utcnow)
    date_answered: Optional[datetime] = None
    linked_verse: Optional[str] = None


class DevotionalContent(BaseModel):
    """Devotional content"""
    id: str
    title: str
    scripture_quote: str
    scripture_reference: str
    short_reflection: str
    long_reflection: str
    application: str
    prayer_guide: str
    tags: List[str] = []
    date: datetime = Field(default_factory=datetime.utcnow)


class ReadingPlan(BaseModel):
    """Bible reading plan"""
    id: str
    name: str
    description: str
    duration_days: int
    readings: List[Dict[str, Any]]
    category: str
    difficulty: str = "beginner"


class UserProgress(BaseModel):
    """User progress tracking"""
    user_id: str
    reading_plan_id: Optional[str] = None
    days_completed: int = 0
    current_day: int = 1
    last_activity: datetime = Field(default_factory=datetime.utcnow)
    total_verses_read: int = 0
    total_prayers: int = 0
    total_journal_entries: int = 0


class UserSettings(BaseModel):
    """User settings"""
    user_id: str
    default_bible_version: str = "ESV"
    default_font: str = "system"
    font_size: int = 16
    theme: str = "light"
    daily_reminder: bool = True
    reminder_time: str = "08:00"
    language: str = "en"


class Animation(BaseModel):
    """Walking with God animation"""
    id: str
    name: str
    category: str
    file_path: str
    trigger: str
    description: Optional[str] = None


class Achievement(BaseModel):
    """User achievement"""
    id: str
    user_id: str
    achievement_type: str
    title: str
    description: str
    icon: str
    earned_date: datetime = Field(default_factory=datetime.utcnow)
    points: int = 0
