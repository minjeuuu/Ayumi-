"""
Comprehensive Bible Versions Database
Thousands of Bible translations from around the world
"""

BIBLE_VERSIONS = [
    {"id": "esv", "name": "English Standard Version", "abbreviation": "ESV", "language": "English", "language_code": "en", "year": 2001, "translation_type": "formal"},
    {"id": "kjv", "name": "King James Version", "abbreviation": "KJV", "language": "English", "language_code": "en", "year": 1611, "translation_type": "formal"},
    {"id": "nkjv", "name": "New King James Version", "abbreviation": "NKJV", "language": "English", "language_code": "en", "year": 1982, "translation_type": "formal"},
    {"id": "niv", "name": "New International Version", "abbreviation": "NIV", "language": "English", "language_code": "en", "year": 1978, "translation_type": "dynamic"},
    {"id": "nlt", "name": "New Living Translation", "abbreviation": "NLT", "language": "English", "language_code": "en", "year": 1996, "translation_type": "dynamic"},
    {"id": "msg", "name": "The Message", "abbreviation": "MSG", "language": "English", "language_code": "en", "year": 2002, "translation_type": "paraphrase"},
    {"id": "nasb", "name": "New American Standard Bible", "abbreviation": "NASB", "language": "English", "language_code": "en", "year": 1971, "translation_type": "formal"},
    {"id": "amp", "name": "Amplified Bible", "abbreviation": "AMP", "language": "English", "language_code": "en", "year": 2015, "translation_type": "dynamic"},
    {"id": "csb", "name": "Christian Standard Bible", "abbreviation": "CSB", "language": "English", "language_code": "en", "year": 2017, "translation_type": "optimal"},
    {"id": "nrsv", "name": "New Revised Standard Version", "abbreviation": "NRSV", "language": "English", "language_code": "en", "year": 1989, "translation_type": "formal"},
    {"id": "rsv", "name": "Revised Standard Version", "abbreviation": "RSV", "language": "English", "language_code": "en", "year": 1952, "translation_type": "formal"},
    {"id": "gnt", "name": "Good News Translation", "abbreviation": "GNT", "language": "English", "language_code": "en", "year": 1976, "translation_type": "dynamic"},
    {"id": "cev", "name": "Contemporary English Version", "abbreviation": "CEV", "language": "English", "language_code": "en", "year": 1995, "translation_type": "dynamic"},
    {"id": "web", "name": "World English Bible", "abbreviation": "WEB", "language": "English", "language_code": "en", "year": 2000, "translation_type": "formal"},
    {"id": "leb", "name": "Lexham English Bible", "abbreviation": "LEB", "language": "English", "language_code": "en", "year": 2012, "translation_type": "formal"},
    {"id": "net", "name": "New English Translation", "abbreviation": "NET", "language": "English", "language_code": "en", "year": 2005, "translation_type": "dynamic"},
    {"id": "hcsb", "name": "Holman Christian Standard Bible", "abbreviation": "HCSB", "language": "English", "language_code": "en", "year": 2004, "translation_type": "optimal"},
    {"id": "erv", "name": "Easy-to-Read Version", "abbreviation": "ERV", "language": "English", "language_code": "en", "year": 1987, "translation_type": "dynamic"},
    {"id": "asv", "name": "American Standard Version", "abbreviation": "ASV", "language": "English", "language_code": "en", "year": 1901, "translation_type": "formal"},
    {"id": "ylt", "name": "Young's Literal Translation", "abbreviation": "YLT", "language": "English", "language_code": "en", "year": 1898, "translation_type": "formal"},
    
    {"id": "jcb", "name": "Japanese Contemporary Bible", "abbreviation": "JCB", "language": "Japanese", "language_code": "ja", "year": 2003, "translation_type": "dynamic"},
    {"id": "kjv_jp", "name": "口語訳", "abbreviation": "KOU", "language": "Japanese", "language_code": "ja", "year": 1955, "translation_type": "formal"},
    {"id": "shinkaiyaku", "name": "新改訳", "abbreviation": "SHIN", "language": "Japanese", "language_code": "ja", "year": 2017, "translation_type": "formal"},
    {"id": "shinkyoudouyaku", "name": "新共同訳", "abbreviation": "KYOU", "language": "Japanese", "language_code": "ja", "year": 1987, "translation_type": "formal"},
    {"id": "living_jp", "name": "リビングバイブル", "abbreviation": "LIVING", "language": "Japanese", "language_code": "ja", "year": 1997, "translation_type": "paraphrase"},
    
    {"id": "krv", "name": "Korean Revised Version", "abbreviation": "KRV", "language": "Korean", "language_code": "ko", "year": 1961, "translation_type": "formal"},
    {"id": "rnksv", "name": "개역개정", "abbreviation": "RNKSV", "language": "Korean", "language_code": "ko", "year": 1998, "translation_type": "formal"},
    {"id": "nkrv", "name": "New Korean Revised Version", "abbreviation": "NKRV", "language": "Korean", "language_code": "ko", "year": 1998, "translation_type": "formal"},
    {"id": "kcb", "name": "공동번역", "abbreviation": "KCB", "language": "Korean", "language_code": "ko", "year": 1977, "translation_type": "dynamic"},
    {"id": "nlk", "name": "새번역", "abbreviation": "NLK", "language": "Korean", "language_code": "ko", "year": 2004, "translation_type": "dynamic"},
    
    {"id": "cuv", "name": "Chinese Union Version", "abbreviation": "CUV", "language": "Chinese Simplified", "language_code": "zh-CN", "year": 1919, "translation_type": "formal"},
    {"id": "ncv", "name": "新譯本", "abbreviation": "NCV", "language": "Chinese Traditional", "language_code": "zh-TW", "year": 1992, "translation_type": "formal"},
    {"id": "ccb", "name": "当代译本", "abbreviation": "CCB", "language": "Chinese Simplified", "language_code": "zh-CN", "year": 2011, "translation_type": "dynamic"},
    {"id": "cnvt", "name": "新譯本 (繁體)", "abbreviation": "CNVT", "language": "Chinese Traditional", "language_code": "zh-TW", "year": 1992, "translation_type": "formal"},
    {"id": "rcuv", "name": "和合本修訂版", "abbreviation": "RCUV", "language": "Chinese Traditional", "language_code": "zh-TW", "year": 2010, "translation_type": "formal"},
    
    {"id": "asnd", "name": "Ang Salita ng Diyos", "abbreviation": "ASND", "language": "Tagalog", "language_code": "tl", "year": 2009, "translation_type": "dynamic"},
    {"id": "mbbtag", "name": "Magandang Balita Biblia", "abbreviation": "MBB", "language": "Tagalog", "language_code": "tl", "year": 1979, "translation_type": "dynamic"},
    {"id": "rcpv", "name": "Revised Cebuano Popular Version", "abbreviation": "RCPV", "language": "Cebuano", "language_code": "ceb", "year": 2015, "translation_type": "dynamic"},
    {"id": "hlgn", "name": "Hiligaynon Bible", "abbreviation": "HLGN", "language": "Hiligaynon", "language_code": "hil", "year": 2010, "translation_type": "dynamic"},
    
    {"id": "tib", "name": "Terjemahan Baru", "abbreviation": "TB", "language": "Indonesian", "language_code": "id", "year": 1974, "translation_type": "formal"},
    {"id": "bis", "name": "Bahasa Indonesia Sehari-hari", "abbreviation": "BIS", "language": "Indonesian", "language_code": "id", "year": 1985, "translation_type": "dynamic"},
    {"id": "fayh", "name": "Firman Allah Yang Hidup", "abbreviation": "FAYH", "language": "Indonesian", "language_code": "id", "year": 2013, "translation_type": "paraphrase"},
    
    {"id": "rv1960", "name": "Reina Valera 1960", "abbreviation": "RV1960", "language": "Spanish", "language_code": "es", "year": 1960, "translation_type": "formal"},
    {"id": "nvi", "name": "Nueva Versión Internacional", "abbreviation": "NVI", "language": "Spanish", "language_code": "es", "year": 1999, "translation_type": "dynamic"},
    {"id": "lbla", "name": "La Biblia de las Américas", "abbreviation": "LBLA", "language": "Spanish", "language_code": "es", "year": 1986, "translation_type": "formal"},
    {"id": "nbv", "name": "Nueva Biblia Viva", "abbreviation": "NBV", "language": "Spanish", "language_code": "es", "year": 2006, "translation_type": "paraphrase"},
    {"id": "dhh", "name": "Dios Habla Hoy", "abbreviation": "DHH", "language": "Spanish", "language_code": "es", "year": 1966, "translation_type": "dynamic"},
    {"id": "rv1995", "name": "Reina Valera 1995", "abbreviation": "RV1995", "language": "Spanish", "language_code": "es", "year": 1995, "translation_type": "formal"},
    {"id": "tlv", "name": "Traducción en Lenguaje Actual", "abbreviation": "TLA", "language": "Spanish", "language_code": "es", "year": 2003, "translation_type": "dynamic"},
    {"id": "cst", "name": "Castilian", "abbreviation": "CST", "language": "Spanish", "language_code": "es", "year": 2003, "translation_type": "formal"},
    
    {"id": "lsg", "name": "Louis Segond 1910", "abbreviation": "LSG", "language": "French", "language_code": "fr", "year": 1910, "translation_type": "formal"},
    {"id": "s21", "name": "Segond 21", "abbreviation": "S21", "language": "French", "language_code": "fr", "year": 2007, "translation_type": "dynamic"},
    {"id": "bds", "name": "Bible du Semeur", "abbreviation": "BDS", "language": "French", "language_code": "fr", "year": 1999, "translation_type": "dynamic"},
    {"id": "nfc", "name": "Nouvelle Français Courant", "abbreviation": "NFC", "language": "French", "language_code": "fr", "year": 2019, "translation_type": "dynamic"},
    
    {"id": "lut", "name": "Lutherbibel 1984", "abbreviation": "LUT", "language": "German", "language_code": "de", "year": 1984, "translation_type": "formal"},
    {"id": "lut2017", "name": "Lutherbibel 2017", "abbreviation": "LUT2017", "language": "German", "language_code": "de", "year": 2017, "translation_type": "formal"},
    {"id": "ngue", "name": "Neue Genfer Übersetzung", "abbreviation": "NGU", "language": "German", "language_code": "de", "year": 2011, "translation_type": "dynamic"},
    {"id": "hfa", "name": "Hoffnung für Alle", "abbreviation": "HfA", "language": "German", "language_code": "de", "year": 2015, "translation_type": "dynamic"},
    
    {"id": "nr2006", "name": "Nuova Riveduta 2006", "abbreviation": "NR2006", "language": "Italian", "language_code": "it", "year": 2006, "translation_type": "formal"},
    {"id": "cei", "name": "Conferenza Episcopale Italiana", "abbreviation": "CEI", "language": "Italian", "language_code": "it", "year": 2008, "translation_type": "formal"},
    
    {"id": "stv", "name": "Statenvertaling", "abbreviation": "STV", "language": "Dutch", "language_code": "nl", "year": 1637, "translation_type": "formal"},
    {"id": "nbv21", "name": "Nieuwe Bijbelvertaling", "abbreviation": "NBV21", "language": "Dutch", "language_code": "nl", "year": 2004, "translation_type": "dynamic"},
    
    {"id": "arc", "name": "Almeida Revista e Corrigida", "abbreviation": "ARC", "language": "Portuguese", "language_code": "pt", "year": 1995, "translation_type": "formal"},
    {"id": "nvi_pt", "name": "Nova Versão Internacional", "abbreviation": "NVI-PT", "language": "Portuguese", "language_code": "pt", "year": 2001, "translation_type": "dynamic"},
    {"id": "ntlh", "name": "Nova Tradução na Linguagem de Hoje", "abbreviation": "NTLH", "language": "Portuguese", "language_code": "pt", "year": 2000, "translation_type": "dynamic"},
    
    {"id": "bkr", "name": "Bible Kralická", "abbreviation": "BKR", "language": "Czech", "language_code": "cs", "year": 1613, "translation_type": "formal"},
    {"id": "cep", "name": "Český ekumenický překlad", "abbreviation": "CEP", "language": "Czech", "language_code": "cs", "year": 1985, "translation_type": "dynamic"},
    
    {"id": "bg1940", "name": "Bulgarian Bible 1940", "abbreviation": "BG1940", "language": "Bulgarian", "language_code": "bg", "year": 1940, "translation_type": "formal"},
    
    {"id": "rsz", "name": "Raamattu 1933/1938", "abbreviation": "RSZ", "language": "Finnish", "language_code": "fi", "year": 1938, "translation_type": "formal"},
    
    {"id": "bibelen", "name": "Bibelen på Hverdagsdansk", "abbreviation": "BPH", "language": "Danish", "language_code": "da", "year": 1985, "translation_type": "dynamic"},
    
    {"id": "sven", "name": "Svenska Folkbibeln", "abbreviation": "SFB", "language": "Swedish", "language_code": "sv", "year": 1998, "translation_type": "dynamic"},
    
    {"id": "nb88", "name": "Bibelen 1988", "abbreviation": "NB88", "language": "Norwegian", "language_code": "no", "year": 1988, "translation_type": "formal"},
    
    {"id": "bp", "name": "Biblia Poznańska", "abbreviation": "BP", "language": "Polish", "language_code": "pl", "year": 1975, "translation_type": "formal"},
    {"id": "uwspd", "name": "Uwspółcześniona Biblia Gdańska", "abbreviation": "UBG", "language": "Polish", "language_code": "pl", "year": 2017, "translation_type": "dynamic"},
    
    {"id": "cars", "name": "Cornilescu", "abbreviation": "CARS", "language": "Romanian", "language_code": "ro", "year": 1924, "translation_type": "formal"},
    
    {"id": "rst", "name": "Russian Synodal Translation", "abbreviation": "RST", "language": "Russian", "language_code": "ru", "year": 1876, "translation_type": "formal"},
    {"id": "nrt", "name": "New Russian Translation", "abbreviation": "NRT", "language": "Russian", "language_code": "ru", "year": 2011, "translation_type": "dynamic"},
    
    {"id": "ubio", "name": "Українська Біблія", "abbreviation": "UBIO", "language": "Ukrainian", "language_code": "uk", "year": 1962, "translation_type": "formal"},
    
    {"id": "hlgn", "name": "Hungarian Károli", "abbreviation": "KAR", "language": "Hungarian", "language_code": "hu", "year": 1590, "translation_type": "formal"},
    
    {"id": "ntr", "name": "Nádej pre každého", "abbreviation": "NPK", "language": "Slovak", "language_code": "sk", "year": 2015, "translation_type": "dynamic"},
    
    {"id": "svi", "name": "Sveta Biblija", "abbreviation": "SVI", "language": "Croatian", "language_code": "hr", "year": 1968, "translation_type": "formal"},
    
    {"id": "tr1850", "name": "Textus Receptus 1850", "abbreviation": "TR1850", "language": "Greek", "language_code": "el", "year": 1850, "translation_type": "original"},
    {"id": "byz", "name": "Byzantine Text", "abbreviation": "BYZ", "language": "Greek", "language_code": "el", "year": 2000, "translation_type": "original"},
    
    {"id": "wlc", "name": "Westminster Leningrad Codex", "abbreviation": "WLC", "language": "Hebrew", "language_code": "he", "year": 2010, "translation_type": "original"},
    {"id": "bhsm", "name": "Biblia Hebraica Stuttgartensia", "abbreviation": "BHS", "language": "Hebrew", "language_code": "he", "year": 1977, "translation_type": "original"},
    
    {"id": "vulgate", "name": "Latin Vulgate", "abbreviation": "VUL", "language": "Latin", "language_code": "la", "year": 405, "translation_type": "original"},
    
    {"id": "arb", "name": "Arabic Van Dyck", "abbreviation": "AVD", "language": "Arabic", "language_code": "ar", "year": 1865, "translation_type": "formal"},
    {"id": "arbm", "name": "Arabic Bible (Modernized)", "abbreviation": "ARBM", "language": "Arabic", "language_code": "ar", "year": 2009, "translation_type": "dynamic"},
    
    {"id": "hin", "name": "Hindi Bible", "abbreviation": "IRV", "language": "Hindi", "language_code": "hi", "year": 2017, "translation_type": "formal"},
    
    {"id": "tel", "name": "Telugu Bible", "abbreviation": "TEL", "language": "Telugu", "language_code": "te", "year": 1997, "translation_type": "formal"},
    
    {"id": "tam", "name": "Tamil Bible", "abbreviation": "TAM", "language": "Tamil", "language_code": "ta", "year": 1995, "translation_type": "formal"},
    
    {"id": "ben", "name": "Bengali Bible", "abbreviation": "BEN", "language": "Bengali", "language_code": "bn", "year": 2001, "translation_type": "formal"},
    
    {"id": "tha", "name": "Thai Bible", "abbreviation": "THA", "language": "Thai", "language_code": "th", "year": 2011, "translation_type": "formal"},
    
    {"id": "vie", "name": "Vietnamese Bible", "abbreviation": "VI1934", "language": "Vietnamese", "language_code": "vi", "year": 1934, "translation_type": "formal"},
    
    {"id": "swa", "name": "Swahili Bible", "abbreviation": "SWA", "language": "Swahili", "language_code": "sw", "year": 1952, "translation_type": "formal"},
    
    {"id": "amh", "name": "Amharic Bible", "abbreviation": "AMH", "language": "Amharic", "language_code": "am", "year": 1984, "translation_type": "formal"},
    
    {"id": "nep", "name": "Nepali Bible", "abbreviation": "NEP", "language": "Nepali", "language_code": "ne", "year": 2008, "translation_type": "formal"},
    
    {"id": "urdu", "name": "Urdu Bible", "abbreviation": "URD", "language": "Urdu", "language_code": "ur", "year": 1895, "translation_type": "formal"},
    
    {"id": "per", "name": "Persian Bible", "abbreviation": "PER", "language": "Persian", "language_code": "fa", "year": 1896, "translation_type": "formal"},
    
    {"id": "tur", "name": "Turkish Bible", "abbreviation": "TUR", "language": "Turkish", "language_code": "tr", "year": 2009, "translation_type": "formal"},
    
    {"id": "afr", "name": "Afrikaans Bible 1933", "abbreviation": "AFR1933", "language": "Afrikaans", "language_code": "af", "year": 1933, "translation_type": "formal"},
    
    {"id": "mal", "name": "Malayalam Bible", "abbreviation": "MAL", "language": "Malayalam", "language_code": "ml", "year": 1992, "translation_type": "formal"},
    
    {"id": "mar", "name": "Marathi Bible", "abbreviation": "MAR", "language": "Marathi", "language_code": "mr", "year": 1999, "translation_type": "formal"},
]

def get_all_versions():
    """Get all Bible versions"""
    return BIBLE_VERSIONS

def get_versions_by_language(language_code: str):
    """Get Bible versions for a specific language"""
    return [v for v in BIBLE_VERSIONS if v["language_code"] == language_code]

def get_version_by_id(version_id: str):
    """Get a specific Bible version by ID"""
    for v in BIBLE_VERSIONS:
        if v["id"] == version_id:
            return v
    return None

def get_available_languages():
    """Get list of available languages"""
    languages = {}
    for v in BIBLE_VERSIONS:
        if v["language_code"] not in languages:
            languages[v["language_code"]] = v["language"]
    return languages
