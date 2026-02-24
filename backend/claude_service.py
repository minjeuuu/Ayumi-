"""
Claude AI Service for Ayumi - Walking with God
Using Emergent LLM Key (Option B)
"""
from emergentintegrations.llm.chat import LlmChat, UserMessage
import json
from typing import Dict, List, Any, Optional
import os
from dotenv import load_dotenv

load_dotenv()

EMERGENT_LLM_KEY = os.getenv('EMERGENT_LLM_KEY', 'sk-emergent-b2cA3430e448e7321C')

print(f"✓ Using Emergent LLM key for Claude Sonnet")

def get_chat_client(session_id: str = "ayumi-default") -> LlmChat:
    """Get configured LlmChat client using Emergent"""
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message="You are a theologically sound Bible assistant. Provide accurate, evangelical, gospel-centered content."
    )
    chat.with_model("anthropic", "claude-4-sonnet-20250514")
    return chat


FALLBACK_HOME_DASHBOARD = {
    "date": "",
    "verse": {
        "text": "For we walk by faith, not by sight.",
        "reference": "2 Corinthians 5:7",
        "context": "Paul is speaking about the eternal home and the courage believers have.",
        "crossReferences": ["Hebrews 11:1", "Romans 8:24"],
        "gospelConnection": "Our faith is anchored in the finished work of Christ, even when unseen."
    },
    "passage": {
        "reference": "Psalm 23",
        "text": "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures...",
        "outline": ["The Shepherd's Provision", "The Shepherd's Protection", "The Shepherd's Presence"],
        "author": "David",
        "historicalSetting": "Likely written later in David's life, reflecting on God's faithfulness."
    },
    "devotional": {
        "title": "Walking by Faith",
        "scriptureQuote": "For we walk by faith, not by sight. - 2 Corinthians 5:7",
        "shortReflection": "Faith is our compass when the path ahead is unclear.",
        "longReflection": "In our daily walk with God, we are called to trust Him even when circumstances don't make sense. Faith isn't the absence of doubt, but the choice to believe God's promises despite our feelings. Just as Abraham walked into the unknown, we too are invited to step forward in confidence, knowing that our faithful God goes before us.",
        "application": "What is one area where you need to trust God more today? Take one small step of faith.",
        "prayerGuide": "Lord, help me to walk by faith today, trusting Your unseen hand to guide my steps."
    },
    "questions": {
        "heartCheck": "Is my heart at rest in God today, or am I anxious?",
        "beliefCheck": "Do I truly believe that God is sufficient for my needs?",
        "obedienceCheck": "What specific step of obedience is God calling me to take?"
    },
    "prayer": {
        "focusTheme": "Trust and Surrender",
        "scripture": "Proverbs 3:5-6",
        "guidedPrayer": "Lord, I choose to trust You with all my heart. Help me not to lean on my own understanding, but to acknowledge You in all my ways."
    },
    "theme": {
        "theme": "God's Faithfulness",
        "keyVerse": "Great is Your faithfulness. - Lamentations 3:23",
        "supportingVerses": ["Psalm 89:1", "1 Thessalonians 5:24", "Deuteronomy 7:9"]
    },
    "attribute": {
        "attribute": "Immutable",
        "definition": "God is unchanging in His character, promises, and purposes.",
        "scriptureProof": "I the Lord do not change. - Malachi 3:6",
        "worshipResponse": "I praise You, Lord, for being my unchanging Rock in a world of constant change."
    },
    "gospel": {
        "truth": "Christ died for the ungodly",
        "reference": "Romans 5:6-8",
        "explanation": "While we were still sinners, Christ died for us. Salvation is entirely by grace, not by our works or merit."
    },
    "history": {
        "event": "David Anointed as King",
        "reference": "1 Samuel 16",
        "description": "God rejects Saul and sends Samuel to anoint David, the youngest son of Jesse, as the future king of Israel.",
        "timeline": {
            "before": "Saul rejected by God for disobedience",
            "during": "Samuel anoints David; the Spirit of the Lord comes upon him",
            "after": "David begins his journey to the throne, learning faithfulness through trials"
        }
    }
}


async def generate_home_dashboard() -> Dict[str, Any]:
    """Generate comprehensive daily dashboard content"""
    try:
        prompt = """Generate a comprehensive daily devotional dashboard for 'Ayumi - Walking with God'.

Requirements:
- Use English Standard Version (ESV) for scripture
- Theology: Evangelical, Born-Again, Gospel-Centered
- All verses must be accurate

Return a JSON object with this structure (return ONLY the JSON):
{
  "date": "2026-02-24T19:00:00.000Z",
  "verse": {"text": "verse text", "reference": "reference", "context": "context", "crossReferences": ["ref1"], "gospelConnection": "connection"},
  "passage": {"reference": "ref", "text": "text", "outline": ["point1"], "author": "author", "historicalSetting": "setting"},
  "devotional": {"title": "title", "scriptureQuote": "quote", "shortReflection": "short", "longReflection": "long", "application": "app", "prayerGuide": "prayer"},
  "questions": {"heartCheck": "q1", "beliefCheck": "q2", "obedienceCheck": "q3"},
  "prayer": {"focusTheme": "theme", "scripture": "verse", "guidedPrayer": "prayer"},
  "theme": {"theme": "theme", "keyVerse": "verse", "supportingVerses": ["v1"]},
  "attribute": {"attribute": "attr", "definition": "def", "scriptureProof": "proof", "worshipResponse": "response"},
  "gospel": {"truth": "truth", "reference": "ref", "explanation": "exp"},
  "history": {"event": "event", "reference": "ref", "description": "desc", "timeline": {"before": "b", "during": "d", "after": "a"}}
}"""

        if USE_EMERGENT:
            chat = get_chat_client(session_id="dashboard")
            message = UserMessage(text=prompt)
            response = await chat.send_message(message)
            dashboard_data = json.loads(response)
        else:
            message = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                messages=[{"role": "user", "content": prompt}]
            )
            dashboard_data = json.loads(message.content[0].text)
        
        from datetime import datetime
        dashboard_data['date'] = datetime.utcnow().isoformat()
        return dashboard_data
        
    except Exception as e:
        print(f"Dashboard error: {e}")
        from datetime import datetime
        FALLBACK_HOME_DASHBOARD['date'] = datetime.utcnow().isoformat()
        return FALLBACK_HOME_DASHBOARD


async def generate_devotional(topic: Optional[str] = None) -> Dict[str, Any]:
    """Generate devotional content"""
    try:
        topic_text = f" on {topic}" if topic else ""
        prompt = f"""Generate deep devotional content{topic_text}.

Return JSON:
{{"title": "title", "scripture": {{"text": "text", "reference": "ref"}}, "reflection": "reflection", "prayer": "prayer", "stepOfFaith": "step", "tags": ["tag1"]}}"""

        if USE_EMERGENT:
            chat = get_chat_client(session_id="devotional")
            message = UserMessage(text=prompt)
            response = await chat.send_message(message)
            return json.loads(response)
        else:
            message = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=2048,
                messages=[{"role": "user", "content": prompt}]
            )
            return json.loads(message.content[0].text)
        
    except Exception as e:
        print(f"Devotional error: {e}")
        return {
            "title": "Walking by Faith",
            "scripture": {"text": "For we walk by faith, not by sight.", "reference": "2 Corinthians 5:7"},
            "reflection": "Faith is the foundation of our walk with God...",
            "prayer": "Lord, increase my faith today.",
            "stepOfFaith": "Trust God with one specific concern today.",
            "tags": ["faith", "trust"]
        }


async def get_bible_chapter(book: str, chapter: int, version: str = "ESV") -> List[Dict[str, Any]]:
    """Get full Bible chapter"""
    try:
        prompt = f"""Provide {book} chapter {chapter} in {version}.

Return JSON array (ONLY the array):
[{{"book":"{book}","chapter":{chapter},"verse":1,"text":"verse text"}},{{"book":"{book}","chapter":{chapter},"verse":2,"text":"verse text"}}]

Include ALL verses with exact biblical text."""

        if USE_EMERGENT:
            chat = get_chat_client(session_id=f"bible-{book}-{chapter}")
            message = UserMessage(text=prompt)
            response = await chat.send_message(message)
            return json.loads(response)
        else:
            message = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                messages=[{"role": "user", "content": prompt}]
            )
            content = message.content[0].text
            print(f"Got response for {book} {chapter}: {len(content)} chars")
            return json.loads(content)
        
    except Exception as e:
        print(f"Bible chapter error: {e}")
        import traceback
        traceback.print_exc()
        return []


async def get_chapter_context(book: str, chapter: int) -> Optional[Dict[str, Any]]:
    """Get chapter context"""
    try:
        prompt = f"""Context for {book} chapter {chapter}.

Return JSON:
{{"reference":"{book} {chapter}","outline":["point1"],"author":"author","historicalSetting":"setting","purpose":"purpose","crossReferences":["ref1"]}}"""

        if USE_EMERGENT:
            chat = get_chat_client(session_id=f"context-{book}-{chapter}")
            message = UserMessage(text=prompt)
            response = await chat.send_message(message)
            return json.loads(response)
        else:
            message = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                messages=[{"role": "user", "content": prompt}]
            )
            return json.loads(message.content[0].text)
        
    except Exception as e:
        print(f"Context error: {e}")
        return None


async def generate_prayer_prompts(verse: str) -> List[str]:
    """Generate prayer prompts"""
    try:
        prompt = f"""Based on "{verse}", generate 3 prayer prompts.
Return JSON array: ["prompt1","prompt2","prompt3"]"""

        if USE_EMERGENT:
            chat = get_chat_client(session_id="prayer-prompts")
            message = UserMessage(text=prompt)
            response = await chat.send_message(message)
            return json.loads(response)
        else:
            message = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=256,
                messages=[{"role": "user", "content": prompt}]
            )
            return json.loads(message.content[0].text)
        
    except Exception as e:
        return ["Lord, help me apply this truth.", "Thank You for Your Word.", "Give me faith to live this out."]


async def generate_prayer(prayer_type: str) -> str:
    """Generate prayer"""
    try:
        prompt = f"Write a short {prayer_type} prayer (2-3 sentences)."

        if USE_EMERGENT:
            chat = get_chat_client(session_id="prayer-gen")
            message = UserMessage(text=prompt)
            response = await chat.send_message(message)
            return response
        else:
            message = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=256,
                messages=[{"role": "user", "content": prompt}]
            )
            return message.content[0].text
        
    except Exception as e:
        return "Lord, teach us to pray. Help us seek Your face. Amen."
