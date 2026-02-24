"""
Worship Music Database for Ayumi
Comprehensive collection of Christian worship artists and songs
"""

WORSHIP_ARTISTS = [
    {"id": "victory-worship", "name": "Victory Worship", "country": "Philippines", "genre": ["Contemporary", "Worship"], "description": "Worship ministry from Victory Church Manila"},
    {"id": "planetshakers", "name": "Planetshakers", "country": "Australia", "genre": ["Contemporary", "Rock", "Worship"], "description": "Dynamic worship from Planetshakers Church"},
    {"id": "elevation-worship", "name": "Elevation Worship", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Elevation Church worship ministry"},
    {"id": "hillsong-worship", "name": "Hillsong Worship", "country": "Australia", "genre": ["Contemporary", "Worship"], "description": "Global worship movement from Hillsong Church"},
    {"id": "hillsong-united", "name": "Hillsong United", "country": "Australia", "genre": ["Contemporary", "Alternative"], "description": "Youth-focused worship from Hillsong"},
    {"id": "bethel-music", "name": "Bethel Music", "country": "USA", "genre": ["Contemporary", "Worship", "Prophetic"], "description": "Bethel Church Redding worship collective"},
    {"id": "jesus-culture", "name": "Jesus Culture", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Passionate worship from Sacramento"},
    {"id": "passion", "name": "Passion", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Collegiate worship movement"},
    {"id": "maverick-city", "name": "Maverick City Music", "country": "USA", "genre": ["Gospel", "Contemporary", "Worship"], "description": "Diverse worship collective"},
    {"id": "upper-room", "name": "Upper Room", "country": "USA", "genre": ["Spontaneous", "Worship"], "description": "Spontaneous worship ministry"},
    {"id": "gateway-worship", "name": "Gateway Worship", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Gateway Church worship"},
    {"id": "chris-tomlin", "name": "Chris Tomlin", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Most sung worship leader globally"},
    {"id": "matt-redman", "name": "Matt Redman", "country": "UK", "genre": ["Contemporary", "Worship"], "description": "British worship leader and songwriter"},
    {"id": "kari-jobe", "name": "Kari Jobe", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Gateway Church worship leader"},
    {"id": "jeremy-camp", "name": "Jeremy Camp", "country": "USA", "genre": ["Contemporary", "Rock"], "description": "Contemporary Christian artist"},
    {"id": "casting-crowns", "name": "Casting Crowns", "country": "USA", "genre": ["Contemporary", "Rock"], "description": "Contemporary Christian band"},
    {"id": "for-king-and-country", "name": "for KING & COUNTRY", "country": "Australia/USA", "genre": ["Pop", "Rock"], "description": "Christian pop duo"},
    {"id": "lauren-daigle", "name": "Lauren Daigle", "country": "USA", "genre": ["Contemporary", "Pop"], "description": "Contemporary Christian singer"},
    {"id": "phil-wickham", "name": "Phil Wickham", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Worship leader and songwriter"},
    {"id": "brandon-lake", "name": "Brandon Lake", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Maverick City and Bethel worship leader"},
    {"id": "cody-carnes", "name": "Cody Carnes", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Gateway worship pastor"},
    {"id": "jenn-johnson", "name": "Jenn Johnson", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Bethel Music worship leader"},
    {"id": "jonathan-mcreynolds", "name": "Jonathan McReynolds", "country": "USA", "genre": ["Gospel", "Contemporary"], "description": "Gospel artist and worship leader"},
    {"id": "tasha-cobbs", "name": "Tasha Cobbs Leonard", "country": "USA", "genre": ["Gospel", "Worship"], "description": "Contemporary gospel artist"},
    {"id": "israel-houghton", "name": "Israel Houghton", "country": "USA", "genre": ["Gospel", "Worship", "Contemporary"], "description": "Multi-award winning worship leader"},
    {"id": "vertical-worship", "name": "Vertical Worship", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Harvest Bible Chapel worship"},
    {"id": "covenant-worship", "name": "Covenant Worship", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Covenant Church worship"},
    {"id": "north-point", "name": "North Point Worship", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "North Point Community Church"},
    {"id": "life-worship", "name": "Life.Church Worship", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Life.Church worship ministry"},
    {"id": "red-rocks", "name": "Red Rocks Worship", "country": "USA", "genre": ["Contemporary", "Worship"], "description": "Red Rocks Church worship"},
    {"id": "awake84", "name": "Awake84", "country": "Philippines", "genre": ["Contemporary", "Worship"], "description": "Filipino worship movement"},
    {"id": "life-worship-ph", "name": "Life Worship Philippines", "country": "Philippines", "genre": ["Contemporary", "Worship"], "description": "Filipino worship collective"},
    {"id": "oc-supertones", "name": "O.C. Supertones", "country": "USA", "genre": ["Ska", "Rock"], "description": "Christian ska band"},
    {"id": "newsboys", "name": "Newsboys", "country": "Australia/USA", "genre": ["Pop", "Rock"], "description": "Contemporary Christian rock"},
    {"id": "tobymac", "name": "TobyMac", "country": "USA", "genre": ["Hip Hop", "Pop"], "description": "Contemporary Christian rapper"},
    {"id": "lecrae", "name": "Lecrae", "country": "USA", "genre": ["Hip Hop", "Rap"], "description": "Christian hip hop artist"},
    {"id": "kb", "name": "KB", "country": "USA", "genre": ["Hip Hop", "Rap"], "description": "Christian rapper"},
    {"id": "andy-mineo", "name": "Andy Mineo", "country": "USA", "genre": ["Hip Hop", "Rap"], "description": "Christian hip hop artist"},
    {"id": "social-club", "name": "Social Club Misfits", "country": "USA", "genre": ["Hip Hop", "Rap"], "description": "Christian rap duo"},
]

WORSHIP_SONGS = [
    {"id": "wf001", "title": "Way Maker", "artist_id": "victory-worship", "artist_name": "Victory Worship", "youtube_id": "29IYLsRy4yM", "key": "B", "tempo": 68, "tags": ["miracle", "promise", "faith"]},
    {"id": "wf002", "title": "Graves Into Gardens", "artist_id": "elevation-worship", "artist_name": "Elevation Worship", "youtube_id": "Ck4xHocysLw", "key": "D", "tempo": 72, "tags": ["resurrection", "redemption", "transformation"]},
    {"id": "wf003", "title": "Goodness of God", "artist_id": "bethel-music", "artist_name": "Bethel Music", "youtube_id": "IwWP19xG3pE", "key": "C", "tempo": 128, "tags": ["goodness", "faithfulness", "testimony"]},
    {"id": "wf004", "title": "Reckless Love", "artist_id": "cory-asbury", "artist_name": "Cory Asbury", "youtube_id": "Sc6SSHuZvQE", "key": "C", "tempo": 134, "tags": ["love", "grace", "pursuit"]},
    {"id": "wf005", "title": "What a Beautiful Name", "artist_id": "hillsong-worship", "artist_name": "Hillsong Worship", "youtube_id": "r5L6QlAH3L4", "key": "D", "tempo": 68, "tags": ["name", "jesus", "glory"]},
    {"id": "wf006", "title": "Oceans", "artist_id": "hillsong-united", "artist_name": "Hillsong United", "youtube_id": "dy9nwe9_xzw", "key": "D", "tempo": 72, "tags": ["faith", "trust", "deeper"]},
    {"id": "wf007", "title": "Build My Life", "artist_id": "passion", "artist_name": "Passion", "youtube_id": "2v73GKSFwkw", "key": "C", "tempo": 70, "tags": ["foundation", "worthy", "surrender"]},
    {"id": "wf008", "title": "Jireh", "artist_id": "elevation-worship", "artist_name": "Elevation Worship", "youtube_id": "l3rLQVH49Qs", "key": "G", "tempo": 145, "tags": ["provider", "enough", "provision"]},
    {"id": "wf009", "title": "The Blessing", "artist_id": "elevation-worship", "artist_name": "Elevation Worship", "youtube_id": "QhUddHfuv5U", "key": "D", "tempo": 60, "tags": ["blessing", "peace", "presence"]},
    {"id": "wf010", "title": "Yes I Will", "artist_id": "vertical-worship", "artist_name": "Vertical Worship", "youtube_id": "TJ2ifmssR5A", "key": "A", "tempo": 72, "tags": ["commitment", "covenant", "faithful"]},
    {"id": "wf011", "title": "Lion and the Lamb", "artist_id": "bethel-music", "artist_name": "Bethel Music", "youtube_id": "54tOXzFKjeA", "key": "E", "tempo": 138, "tags": ["worthy", "lamb", "lion"]},
    {"id": "wf012", "title": "Holy Forever", "artist_id": "chris-tomlin", "artist_name": "Chris Tomlin", "youtube_id": "bZh71xfp_wU", "key": "D", "tempo": 136, "tags": ["holy", "forever", "worthy"]},
    {"id": "wf013", "title": "How Great Is Our God", "artist_id": "chris-tomlin", "artist_name": "Chris Tomlin", "youtube_id": "KBD18rsVJHk", "key": "C", "tempo": 76, "tags": ["greatness", "majesty", "glory"]},
    {"id": "wf014", "title": "10000 Reasons", "artist_id": "matt-redman", "artist_name": "Matt Redman", "youtube_id": "DXDGE_lRI0E", "key": "G", "tempo": 73, "tags": ["praise", "worship", "bless"]},
    {"id": "wf015", "title": "Revelation Song", "artist_id": "kari-jobe", "artist_name": "Kari Jobe", "youtube_id": "pJamdvg1m6Y", "key": "D", "tempo": 72, "tags": ["holy", "worthy", "lamb"]},
    {"id": "wf016", "title": "Tremble", "artist_id": "mosaic-msc", "artist_name": "Mosaic MSC", "youtube_id": "VNmzPd5VxYw", "key": "Bb", "tempo": 72, "tags": ["power", "name", "authority"]},
    {"id": "wf017", "title": "Living Hope", "artist_id": "phil-wickham", "artist_name": "Phil Wickham", "youtube_id": "DmeGFixWY2c", "key": "C", "tempo": 74, "tags": ["hope", "resurrection", "alive"]},
    {"id": "wf018", "title": "This Is Amazing Grace", "artist_id": "phil-wickham", "artist_name": "Phil Wickham", "youtube_id": "XFRjr_x-yxU", "key": "A", "tempo": 128, "tags": ["grace", "sacrifice", "love"]},
    {"id": "wf019", "title": "King of Kings", "artist_id": "hillsong-worship", "artist_name": "Hillsong Worship", "youtube_id": "pL1n7TTmPTQ", "key": "B", "tempo": 72, "tags": ["king", "victory", "risen"]},
    {"id": "wf020", "title": "So Will I", "artist_id": "hillsong-united", "artist_name": "Hillsong United", "youtube_id": "Qp4M7-X6d0g", "key": "C", "tempo": 68, "tags": ["creation", "worship", "response"]},
]

def get_all_artists():
    """Get all worship artists"""
    return WORSHIP_ARTISTS

def get_all_songs():
    """Get all worship songs"""
    return WORSHIP_SONGS

def search_songs(query: str):
    """Search songs by title or artist"""
    query_lower = query.lower()
    return [s for s in WORSHIP_SONGS if query_lower in s["title"].lower() or query_lower in s["artist_name"].lower()]

def get_artist_songs(artist_id: str):
    """Get all songs by artist"""
    return [s for s in WORSHIP_SONGS if s["artist_id"] == artist_id]
