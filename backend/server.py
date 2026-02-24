from fastapi import FastAPI, APIRouter, HTTPException, Body
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime

# Import our services and data
from claude_service import (
    generate_home_dashboard,
    generate_devotional,
    get_bible_chapter,
    get_chapter_context,
    generate_prayer_prompts,
    generate_prayer
)
from bible_versions_data import (
    get_all_versions,
    get_versions_by_language,
    get_version_by_id,
    get_available_languages
)
from fonts_colors_data import (
    get_all_fonts,
    get_fonts_by_category,
    get_font_by_id,
    get_all_colors,
    get_colors_by_category,
    get_color_by_id
)
from worship_music_data import (
    get_all_artists,
    get_all_songs,
    search_songs,
    get_artist_songs
)
from models import (
    BibleVerse,
    BibleChapter,
    HighlightColor,
    FontDefinition,
    JournalEntry,
    PrayerRequest,
    DevotionalContent,
    UserSettings
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Ayumi API - Walking with God", version="2.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Basic Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class BibleReadRequest(BaseModel):
    book: str
    chapter: int
    version: str = "ESV"

class HighlightRequest(BaseModel):
    user_id: str
    book: str
    chapter: int
    verse: int
    color_id: str
    text: Optional[str] = None

class UserHighlight(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    book: str
    chapter: int
    verse: int
    color_id: str
    color_hex: str
    text: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ==========================
# CORE ENDPOINTS
# ==========================

@api_router.get("/")
async def root():
    return {
        "message": "Ayumi API - Walking with God",
        "version": "2.0.0",
        "powered_by": "Claude Sonnet",
        "endpoints": {
            "bible": "/api/bible/*",
            "devotional": "/api/devotional/*",
            "fonts": "/api/fonts",
            "colors": "/api/colors",
            "dashboard": "/api/dashboard"
        }
    }


# ==========================
# DASHBOARD ENDPOINTS
# ==========================

@api_router.get("/dashboard")
async def get_dashboard():
    """Get comprehensive daily dashboard content - returns fallback instantly, Claude-generated when available"""
    import asyncio
    from datetime import datetime
    
    # Check if we have a cached Claude-generated dashboard in MongoDB
    cached = await db.cached_dashboards.find_one({"date": datetime.now().strftime("%Y-%m-%d")})
    if cached:
        cached.pop('_id', None)
        return cached.get('data', get_fallback_dashboard())
    
    # Return fallback instantly 
    fallback = get_fallback_dashboard()
    
    # Schedule Claude generation in background
    async def generate_and_cache():
        try:
            dashboard = await generate_home_dashboard()
            await db.cached_dashboards.update_one(
                {"date": datetime.now().strftime("%Y-%m-%d")},
                {"$set": {"date": datetime.now().strftime("%Y-%m-%d"), "data": dashboard}},
                upsert=True
            )
        except Exception as e:
            logging.error(f"Background dashboard generation error: {e}")
    
    asyncio.create_task(generate_and_cache())
    return fallback


def get_fallback_dashboard():
    """Get instant fallback dashboard content"""
    from datetime import datetime
    return {
        "date": datetime.now().isoformat(),
        "verse": {
            "text": "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
            "reference": "Proverbs 3:5-6",
            "context": "Solomon instructs his son on the foundation of wisdom: complete trust in God.",
            "crossReferences": ["Psalm 37:5", "Isaiah 26:3-4", "Jeremiah 17:7-8"],
            "gospelConnection": "Christ is the wisdom of God made flesh, the ultimate path we trust and follow."
        },
        "passage": {
            "reference": "Psalm 23",
            "text": "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul. He leads me in paths of righteousness for his name's sake. Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me. You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows. Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the Lord forever.",
            "outline": ["The Shepherd's Provision (v1-3)", "The Shepherd's Protection (v4)", "The Shepherd's Abundance (v5-6)"],
            "author": "David",
            "historicalSetting": "Written from David's personal experience as both shepherd and king, reflecting on God's faithful care through every season."
        },
        "devotional": {
            "title": "The Steady Walk",
            "scriptureQuote": "Trust in the Lord with all your heart.",
            "shortReflection": "Our journey with Christ is often less about the destination and more about the daily rhythm of trust.",
            "longReflection": "Our journey with Christ is often less about the destination and more about the daily rhythm of trust. Each step we take in faith draws us closer to His heart and closer to the people He has placed in our path. Walking by faith means trusting God even when the way ahead is unclear, knowing that His plans are perfect and His timing is sure. Today, let us choose to lean not on our own understanding but to acknowledge Him in all our ways.",
            "application": "Take a 10-minute prayer walk today, asking God to guide your steps in a specific area of your life.",
            "prayerGuide": "Lord, I choose to trust You with all my heart today. Help me not to lean on my own understanding. Direct my paths and give me the courage to follow where You lead. Amen."
        },
        "questions": {
            "heartCheck": "Is my heart at rest in God today, or am I carrying burdens I should lay down?",
            "beliefCheck": "Do I truly believe that God's wisdom surpasses my own understanding?",
            "obedienceCheck": "What specific step of obedience is the Holy Spirit calling me to take today?"
        },
        "prayer": {
            "focusTheme": "Trust and Surrender",
            "scripture": "Proverbs 3:5-6",
            "guidedPrayer": "Father, I come before You with an open heart. I choose to trust You completely, even in the areas I cannot see or understand. Help me to surrender my plans and embrace Yours. Give me eyes to see Your hand at work in every circumstance. In Jesus' name, Amen."
        },
        "theme": {
            "theme": "God's Faithfulness",
            "keyVerse": "Great is Your faithfulness. - Lamentations 3:23",
            "supportingVerses": ["Psalm 89:1", "1 Thessalonians 5:24", "Deuteronomy 7:9", "2 Timothy 2:13"]
        },
        "attribute": {
            "attribute": "Immutable",
            "definition": "God is unchanging in His being, perfections, purposes, and promises.",
            "scriptureProof": "I the Lord do not change. - Malachi 3:6",
            "worshipResponse": "I praise You, Lord, for being my unchanging Rock in a world of constant change."
        },
        "gospel": {
            "truth": "Christ died for the ungodly",
            "reference": "Romans 5:6-8",
            "explanation": "While we were still sinners, Christ died for us. God demonstrates His own love toward us in this: while we were yet without strength, at just the right time, Christ died for the ungodly."
        },
        "history": {
            "event": "David Anointed as King",
            "reference": "1 Samuel 16",
            "description": "God rejects Saul and sends Samuel to Bethlehem to anoint David, the youngest son of Jesse, as the future king of Israel. God looks not at outward appearance but at the heart.",
            "timeline": {
                "before": "Saul rejected by God for disobedience",
                "during": "Samuel anoints David; the Spirit of the Lord comes upon him mightily",
                "after": "David begins his long journey to the throne, learning faithfulness through trials and persecution"
            }
        }
    }


# ==========================
# BIBLE ENDPOINTS
# ==========================

@api_router.get("/bible/versions")
async def get_bible_versions():
    """Get all available Bible versions"""
    return {"versions": get_all_versions()}


@api_router.get("/bible/versions/language/{language_code}")
async def get_versions_for_language(language_code: str):
    """Get Bible versions for specific language"""
    versions = get_versions_by_language(language_code)
    return {"language_code": language_code, "versions": versions}


@api_router.get("/bible/languages")
async def get_languages():
    """Get all available languages"""
    return {"languages": get_available_languages()}


@api_router.post("/bible/read")
async def read_bible_chapter(request: BibleReadRequest):
    """Read a complete Bible chapter"""
    try:
        verses = await get_bible_chapter(request.book, request.chapter, request.version)
        context = await get_chapter_context(request.book, request.chapter)
        
        return {
            "book": request.book,
            "chapter": request.chapter,
            "version": request.version,
            "verses": verses,
            "context": context
        }
    except Exception as e:
        logging.error(f"Bible read error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/bible/{book}/{chapter}")
async def get_chapter(book: str, chapter: int, version: str = "ESV"):
    """Get Bible chapter (alternative endpoint)"""
    try:
        verses = await get_bible_chapter(book, chapter, version)
        return {"book": book, "chapter": chapter, "version": version, "verses": verses}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================
# HIGHLIGHT ENDPOINTS
# ==========================

@api_router.post("/highlights")
async def create_highlight(highlight: HighlightRequest):
    """Create a verse highlight"""
    try:
        color = get_color_by_id(highlight.color_id)
        if not color:
            raise HTTPException(status_code=404, detail="Color not found")
        
        highlight_doc = UserHighlight(
            user_id=highlight.user_id,
            book=highlight.book,
            chapter=highlight.chapter,
            verse=highlight.verse,
            color_id=highlight.color_id,
            color_hex=color["hex_color"],
            text=highlight.text
        )
        
        await db.highlights.insert_one(highlight_doc.dict())
        return highlight_doc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/highlights/{user_id}")
async def get_user_highlights(user_id: str):
    """Get all highlights for a user"""
    highlights = await db.highlights.find({"user_id": user_id}).to_list(1000)
    return {"highlights": highlights}


@api_router.get("/highlights/{user_id}/{book}/{chapter}")
async def get_chapter_highlights(user_id: str, book: str, chapter: int):
    """Get highlights for a specific chapter"""
    highlights = await db.highlights.find({
        "user_id": user_id,
        "book": book,
        "chapter": chapter
    }).to_list(100)
    return {"highlights": highlights}


@api_router.delete("/highlights/{highlight_id}")
async def delete_highlight(highlight_id: str):
    """Delete a highlight"""
    result = await db.highlights.delete_one({"id": highlight_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Highlight not found")
    return {"message": "Highlight deleted"}


# ==========================
# FONTS ENDPOINTS
# ==========================

@api_router.get("/fonts")
async def get_fonts():
    """Get all available fonts"""
    return {"fonts": get_all_fonts()}


@api_router.get("/fonts/category/{category}")
async def get_fonts_by_cat(category: str):
    """Get fonts by category"""
    fonts = get_fonts_by_category(category)
    return {"category": category, "fonts": fonts}


@api_router.get("/fonts/{font_id}")
async def get_font(font_id: str):
    """Get specific font"""
    font = get_font_by_id(font_id)
    if not font:
        raise HTTPException(status_code=404, detail="Font not found")
    return font


# ==========================
# COLORS ENDPOINTS
# ==========================

@api_router.get("/colors")
async def get_colors():
    """Get all highlight colors"""
    return {"colors": get_all_colors()}


@api_router.get("/colors/category/{category}")
async def get_colors_by_cat(category: str):
    """Get colors by category"""
    colors = get_colors_by_category(category)
    return {"category": category, "colors": colors}


@api_router.get("/colors/{color_id}")
async def get_color(color_id: str):
    """Get specific color"""
    color = get_color_by_id(color_id)
    if not color:
        raise HTTPException(status_code=404, detail="Color not found")
    return color


# ==========================
# DEVOTIONAL ENDPOINTS
# ==========================

@api_router.post("/devotional/generate")
async def create_devotional(topic: Optional[str] = Body(None)):
    """Generate devotional content"""
    try:
        devotional = await generate_devotional(topic)
        return devotional
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================
# PRAYER ENDPOINTS
# ==========================

@api_router.post("/prayer/prompts")
async def get_prayer_prompts(verse: str = Body(..., embed=True)):
    """Generate prayer prompts for a verse"""
    try:
        prompts = await generate_prayer_prompts(verse)
        return {"prompts": prompts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/prayer/generate")
async def create_prayer(prayer_type: str = Body(..., embed=True)):
    """Generate a prayer"""
    try:
        prayer = await generate_prayer(prayer_type)
        return {"prayer": prayer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================
# USER SETTINGS ENDPOINTS
# ==========================

@api_router.get("/settings/{user_id}")
async def get_settings(user_id: str):
    """Get user settings"""
    settings = await db.settings.find_one({"user_id": user_id})
    if not settings:
        default_settings = UserSettings(user_id=user_id)
        await db.settings.insert_one(default_settings.dict())
        return default_settings
    return settings


@api_router.put("/settings/{user_id}")
async def update_settings(user_id: str, settings: Dict[str, Any] = Body(...)):
    """Update user settings"""
    settings["user_id"] = user_id
    await db.settings.update_one(
        {"user_id": user_id},
        {"$set": settings},
        upsert=True
    )
    return {"message": "Settings updated", "settings": settings}


# ==========================
# WORSHIP MUSIC ENDPOINTS
# ==========================

@api_router.get("/worship/artists")
async def get_worship_artists():
    """Get all worship artists"""
    return {"artists": get_all_artists()}


@api_router.get("/worship/songs")
async def get_worship_songs():
    """Get all worship songs"""
    return {"songs": get_all_songs()}


@api_router.get("/worship/search/{query}")
async def search_worship_songs(query: str):
    """Search worship songs"""
    results = search_songs(query)
    return {"query": query, "results": results}


@api_router.get("/worship/artist/{artist_id}/songs")
async def get_songs_by_artist(artist_id: str):
    """Get songs by specific artist"""
    songs = get_artist_songs(artist_id)
    return {"artist_id": artist_id, "songs": songs}


# ==========================
# JOURNAL ENDPOINTS
# ==========================

class JournalEntryCreate(BaseModel):
    id: str
    date: str
    title: str
    text: str
    tags: List[str] = []
    linkedScripture: Optional[str] = None
    mood: Optional[str] = None


@api_router.get("/journal/entries")
async def get_journal_entries():
    """Get all journal entries"""
    entries = await db.journal_entries.find().sort("date", -1).to_list(500)
    for e in entries:
        e.pop('_id', None)
    return {"entries": entries}


@api_router.post("/journal/entries")
async def save_journal_entry(entry: JournalEntryCreate):
    """Create or update a journal entry"""
    entry_dict = entry.dict()
    await db.journal_entries.update_one(
        {"id": entry.id},
        {"$set": entry_dict},
        upsert=True
    )
    return {"message": "Entry saved", "entry": entry_dict}


@api_router.delete("/journal/entries/{entry_id}")
async def delete_journal_entry(entry_id: str):
    """Delete a journal entry"""
    result = await db.journal_entries.delete_one({"id": entry_id})
    return {"message": "Entry deleted", "deleted": result.deleted_count > 0}


# ==========================
# BIBLE SEARCH ENDPOINT
# ==========================

@api_router.get("/bible/search/{query}")
async def search_bible(query: str):
    """Search for Bible content"""
    try:
        from claude_service import get_chat_client
        from emergentintegrations.llm.chat import UserMessage
        import json

        chat = get_chat_client(session_id=f"search-{query[:20]}")
        prompt = f"""Find 5 Bible verses related to "{query}". Return JSON array:
[{{"text":"verse text","reference":"Book Chapter:Verse","relevance":"why relevant"}}]
Return ONLY the JSON array."""

        message = UserMessage(text=prompt)
        response = await chat.send_message(message)
        results = json.loads(response)
        return {"query": query, "results": results}
    except Exception as e:
        logging.error(f"Bible search error: {e}")
        # Fallback results
        return {"query": query, "results": [
            {"text": "For God so loved the world...", "reference": "John 3:16", "relevance": "Universal love"},
            {"text": "I can do all things through Christ...", "reference": "Philippians 4:13", "relevance": "Strength in Christ"},
        ]}


# ==========================
# VERSE IMAGE DATA ENDPOINT
# ==========================

@api_router.get("/verse-image/backgrounds")
async def get_verse_backgrounds():
    """Get background options for verse images"""
    backgrounds = [
        {"id": "sunset", "name": "Golden Sunset", "gradient": "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"},
        {"id": "ocean", "name": "Ocean Depths", "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},
        {"id": "forest", "name": "Forest Morning", "gradient": "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"},
        {"id": "night", "name": "Starry Night", "gradient": "linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d2d6e 100%)"},
        {"id": "rose", "name": "Rose Garden", "gradient": "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)"},
        {"id": "dawn", "name": "Morning Dawn", "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"},
        {"id": "mountain", "name": "Mountain Peak", "gradient": "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)"},
        {"id": "warmth", "name": "Warm Embrace", "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"},
        {"id": "sage", "name": "Peaceful Sage", "gradient": "linear-gradient(135deg, #5B7C75 0%, #8fb8a8 100%)"},
        {"id": "earth", "name": "Earth Tones", "gradient": "linear-gradient(135deg, #8B6914 0%, #D4A843 50%, #E8C86A 100%)"},
        {"id": "midnight", "name": "Midnight Blue", "gradient": "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"},
        {"id": "pure", "name": "Pure White", "gradient": "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)"},
    ];
    return {"backgrounds": backgrounds}


# Legacy endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
