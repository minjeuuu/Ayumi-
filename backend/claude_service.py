"""
Claude AI Service for Ayumi - Walking with God
Replaces all Google Gemini functionality with Claude Sonnet
"""
import anthropic
import json
from typing import Dict, List, Any, Optional
import os
from dotenv import load_dotenv

load_dotenv()

CLAUDE_API_KEY = os.getenv('CLAUDE_API_KEY', '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')

client = anthropic.Anthropic(api_key=CLAUDE_API_KEY)

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
    """Generate comprehensive daily dashboard content using Claude"""
    try:
        prompt = """Generate a comprehensive daily devotional dashboard for 'Ayumi - Walking with God', a serious Christian discipleship app.

Requirements:
- Use English Standard Version (ESV) for all scripture
- Theology: Evangelical, Born-Again, Scripture-First, Gospel-Centered
- Provide rich, deep content suitable for serious believers
- All verses must be accurate and verifiable

Return a JSON object with this exact structure:
{
  "date": "current date as ISO string",
  "verse": {
    "text": "full verse text",
    "reference": "book chapter:verse",
    "context": "brief context of the passage",
    "crossReferences": ["reference1", "reference2"],
    "gospelConnection": "how this verse points to the gospel"
  },
  "passage": {
    "reference": "longer passage reference",
    "text": "multiple verses, paragraph form",
    "outline": ["main point 1", "main point 2", "main point 3"],
    "author": "biblical author",
    "historicalSetting": "brief historical context"
  },
  "devotional": {
    "title": "devotional title",
    "scriptureQuote": "main verse with reference",
    "shortReflection": "1-2 sentence summary",
    "longReflection": "3-4 paragraph deep reflection",
    "application": "practical application point",
    "prayerGuide": "guided prayer based on the text"
  },
  "questions": {
    "heartCheck": "question about heart condition",
    "beliefCheck": "question about faith and trust",
    "obedienceCheck": "question about practical obedience"
  },
  "prayer": {
    "focusTheme": "prayer theme for the day",
    "scripture": "verse to pray through",
    "guidedPrayer": "sample prayer"
  },
  "theme": {
    "theme": "theological theme",
    "keyVerse": "main verse for theme",
    "supportingVerses": ["verse1", "verse2", "verse3"]
  },
  "attribute": {
    "attribute": "an attribute of God",
    "definition": "clear definition",
    "scriptureProof": "verse proving this attribute",
    "worshipResponse": "sample worship response"
  },
  "gospel": {
    "truth": "core gospel truth",
    "reference": "scripture reference",
    "explanation": "clear explanation"
  },
  "history": {
    "event": "biblical event",
    "reference": "scripture reference",
    "description": "event description",
    "timeline": {
      "before": "what led to this event",
      "during": "what happened",
      "after": "the result/impact"
    }
  }
}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        content_text = message.content[0].text
        dashboard_data = json.loads(content_text)
        
        from datetime import datetime
        dashboard_data['date'] = datetime.utcnow().isoformat()
        
        return dashboard_data
        
    except Exception as e:
        print(f"Claude dashboard generation error: {e}")
        from datetime import datetime
        FALLBACK_HOME_DASHBOARD['date'] = datetime.utcnow().isoformat()
        return FALLBACK_HOME_DASHBOARD


async def generate_devotional(topic: Optional[str] = None) -> Dict[str, Any]:
    """Generate a devotional on a specific topic"""
    try:
        topic_text = f" focused on the topic of {topic}" if topic else ""
        
        prompt = f"""Generate a deep devotional content{topic_text} for a Christian discipleship app.

Return JSON with this structure:
{{
  "title": "devotional title",
  "scripture": {{
    "text": "main verse text (ESV)",
    "reference": "verse reference"
  }},
  "reflection": "3-4 paragraphs of deep theological reflection",
  "prayer": "guided prayer",
  "stepOfFaith": "practical application step",
  "tags": ["tag1", "tag2", "tag3"]
}}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return json.loads(message.content[0].text)
        
    except Exception as e:
        print(f"Devotional generation error: {e}")
        return {
            "title": "Walking by Faith",
            "scripture": {
                "text": "For we walk by faith, not by sight.",
                "reference": "2 Corinthians 5:7"
            },
            "reflection": "Faith is the foundation of our walk with God...",
            "prayer": "Lord, increase my faith today.",
            "stepOfFaith": "Trust God with one specific concern today.",
            "tags": ["faith", "trust", "walk"]
        }


async def get_bible_chapter(book: str, chapter: int, version: str = "ESV") -> List[Dict[str, Any]]:
    """Get a full Bible chapter"""
    try:
        prompt = f"""Provide the complete text of {book} chapter {chapter} in {version} translation.

Return a JSON array where each object represents one verse:
[
  {{
    "book": "{book}",
    "chapter": {chapter},
    "verse": 1,
    "text": "exact verse text"
  }},
  ...
]

Provide ALL verses in the chapter with exact biblical text."""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return json.loads(message.content[0].text)
        
    except Exception as e:
        print(f"Bible chapter fetch error: {e}")
        return []


async def get_chapter_context(book: str, chapter: int) -> Optional[Dict[str, Any]]:
    """Get contextual information about a Bible chapter"""
    try:
        prompt = f"""Provide deep scholarly context for {book} chapter {chapter}.

Return JSON with this structure:
{{
  "reference": "{book} {chapter}",
  "outline": ["main section 1", "main section 2", "main section 3"],
  "author": "biblical author",
  "historicalSetting": "historical context",
  "purpose": "purpose of this passage",
  "crossReferences": ["related passage 1", "related passage 2"]
}}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return json.loads(message.content[0].text)
        
    except Exception as e:
        print(f"Context fetch error: {e}")
        return None


async def generate_prayer_prompts(verse: str) -> List[str]:
    """Generate prayer prompts based on a verse"""
    try:
        prompt = f"""Based on this Bible verse: "{verse}"

Generate 3 short, personal prayer prompts (each 10-20 words) that help someone pray through this verse.

Return as JSON array: ["prompt1", "prompt2", "prompt3"]"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=256,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return json.loads(message.content[0].text)
        
    except Exception as e:
        return [
            "Lord, help me understand and apply this truth today.",
            "Thank You, Father, for speaking to me through Your Word.",
            "Give me faith to live out what I'm learning here."
        ]


async def generate_prayer(prayer_type: str) -> str:
    """Generate a prayer of specific type"""
    try:
        prompt = f"Write a short, heartfelt {prayer_type} prayer (2-3 sentences) that a believer could pray."
        
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=256,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return message.content[0].text
        
    except Exception as e:
        return "Lord, teach us to pray. Help us to seek Your face and trust Your heart. Amen."
