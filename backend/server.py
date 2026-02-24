from fastapi import FastAPI, APIRouter, HTTPException, Body
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
    """Get comprehensive daily dashboard content"""
    try:
        dashboard = await generate_home_dashboard()
        return dashboard
    except Exception as e:
        logging.error(f"Dashboard error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


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
