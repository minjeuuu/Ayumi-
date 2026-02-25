export interface BibleVersion {
  id: string;
  name: string;
  language: string;
  category: string;
  script?: string;
}

export const bibleVersions: BibleVersion[] = [
  { id: 'kjv', name: 'King James Version', language: 'English', category: 'Traditional' },
  { id: 'nkjv', name: 'New King James Version', language: 'English', category: 'Traditional' },
  { id: 'esv', name: 'English Standard Version', language: 'English', category: 'Formal' },
  { id: 'niv', name: 'New International Version', language: 'English', category: 'Formal' },
  { id: 'nrsv', name: 'New Revised Standard Version', language: 'English', category: 'Formal' },
  { id: 'nasb', name: 'New American Standard Bible', language: 'English', category: 'Formal' },
  { id: 'csb', name: 'Christian Standard Bible', language: 'English', category: 'Formal' },
  { id: 'nlt', name: 'New Living Translation', language: 'English', category: 'Thought' },
  { id: 'gnt', name: 'Good News Translation', language: 'English', category: 'Thought' },
  { id: 'cev', name: 'Contemporary English Version', language: 'English', category: 'Thought' },
  { id: 'msg', name: 'The Message', language: 'English', category: 'Paraphrase' },
  { id: 'amp', name: 'Amplified Bible', language: 'English', category: 'Formal' },
  { id: 'web', name: 'World English Bible', language: 'English', category: 'Formal' },
  { id: 'leb', name: 'Lexham English Bible', language: 'English', category: 'Formal' },
  { id: 'rsv', name: 'Revised Standard Version', language: 'English', category: 'Formal' },
  { id: 'asv', name: 'American Standard Version', language: 'English', category: 'Traditional' },
  { id: 'ylt', name: 'Young\'s Literal Translation', language: 'English', category: 'Formal' },
  { id: 'drb', name: 'Douay-Rheims Bible', language: 'English', category: 'Traditional' },
  { id: 'erv', name: 'Easy-to-Read Version', language: 'English', category: 'Thought' },
  { id: 'gnv', name: 'Geneva Bible', language: 'English', category: 'Traditional' },
  { id: 'net', name: 'New English Translation', language: 'English', category: 'Formal' },
  { id: 'hcsb', name: 'Holman Christian Standard Bible', language: 'English', category: 'Formal' },
  { id: 'neb', name: 'New English Bible', language: 'English', category: 'Formal' },
  { id: 'reb', name: 'Revised English Bible', language: 'English', category: 'Formal' },
  { id: 'jb', name: 'Jerusalem Bible', language: 'English', category: 'Formal' },
  { id: 'njb', name: 'New Jerusalem Bible', language: 'English', category: 'Formal' },
  { id: 'tpt', name: 'The Passion Translation', language: 'English', category: 'Paraphrase' },
  { id: 'voice', name: 'The Voice', language: 'English', category: 'Paraphrase' },
  { id: 'esvuk', name: 'English Standard Version Anglicised', language: 'English', category: 'Formal' },
  { id: 'nivuk', name: 'New International Version UK', language: 'English', category: 'Formal' },
  
  { id: 'jpn-shinkyoudou', name: '新共同訳', language: 'Japanese', category: 'Modern', script: 'Japanese' },
  { id: 'jpn-shinkaiyaku', name: '新改訳', language: 'Japanese', category: 'Modern', script: 'Japanese' },
  { id: 'jpn-kougo', name: '口語訳', language: 'Japanese', category: 'Traditional', script: 'Japanese' },
  { id: 'jpn-bungo', name: '文語訳', language: 'Japanese', category: 'Traditional', script: 'Japanese' },
  { id: 'jpn-living', name: 'リビングバイブル', language: 'Japanese', category: 'Paraphrase', script: 'Japanese' },
  { id: 'jpn-meiji', name: '明治元訳', language: 'Japanese', category: 'Historical', script: 'Japanese' },
  { id: 'jpn-franciscan', name: 'フランシスコ会訳', language: 'Japanese', category: 'Modern', script: 'Japanese' },
  { id: 'jpn-seisho', name: '聖書協会共同訳', language: 'Japanese', category: 'Modern', script: 'Japanese' },
  
  { id: 'kor-revised', name: '개역개정', language: 'Korean', category: 'Modern', script: 'Korean' },
  { id: 'kor-common', name: '공동번역', language: 'Korean', category: 'Modern', script: 'Korean' },
  { id: 'kor-nkrv', name: '새번역', language: 'Korean', category: 'Modern', script: 'Korean' },
  { id: 'kor-living', name: '현대인의 성경', language: 'Korean', category: 'Paraphrase', script: 'Korean' },
  { id: 'kor-easy', name: '쉬운성경', language: 'Korean', category: 'Thought', script: 'Korean' },
  { id: 'kor-gaenyeok', name: '개역한글', language: 'Korean', category: 'Traditional', script: 'Korean' },
  
  { id: 'chn-union', name: '和合本', language: 'Chinese', category: 'Traditional', script: 'Chinese' },
  { id: 'chn-cunp', name: '新标点和合本', language: 'Chinese', category: 'Modern', script: 'Chinese' },
  { id: 'chn-rcuv', name: '和合本修订版', language: 'Chinese', category: 'Modern', script: 'Chinese' },
  { id: 'chn-ncv', name: '新译本', language: 'Chinese', category: 'Modern', script: 'Chinese' },
  { id: 'chn-ccb', name: '当代译本', language: 'Chinese', category: 'Paraphrase', script: 'Chinese' },
  { id: 'chn-msg', name: '信息本', language: 'Chinese', category: 'Paraphrase', script: 'Chinese' },
  { id: 'chn-nvi', name: '新译本简体', language: 'Chinese', category: 'Modern', script: 'Chinese' },
  { id: 'chn-traditional', name: '繁体和合本', language: 'Chinese', category: 'Traditional', script: 'Chinese' },
  
  { id: 'tgl-asnd', name: 'Ang Salita ng Diyos', language: 'Tagalog', category: 'Modern', script: 'Latin' },
  { id: 'tgl-mbb', name: 'Magandang Balita Biblia', language: 'Tagalog', category: 'Thought', script: 'Latin' },
  { id: 'tgl-ang-biblia', name: 'Ang Biblia', language: 'Tagalog', category: 'Traditional', script: 'Latin' },
  
  { id: 'ind-tb', name: 'Terjemahan Baru', language: 'Indonesian', category: 'Modern', script: 'Latin' },
  { id: 'ind-bis', name: 'Bahasa Indonesia Sehari-hari', language: 'Indonesian', category: 'Thought', script: 'Latin' },
  { id: 'ind-shellabear', name: 'Shellabear', language: 'Indonesian', category: 'Traditional', script: 'Latin' },
  { id: 'ind-fayh', name: 'Firman Allah Yang Hidup', language: 'Indonesian', category: 'Paraphrase', script: 'Latin' },
  
  { id: 'spa-rv1960', name: 'Reina-Valera 1960', language: 'Spanish', category: 'Traditional', script: 'Latin' },
  { id: 'spa-rv1995', name: 'Reina-Valera 1995', language: 'Spanish', category: 'Modern', script: 'Latin' },
  { id: 'spa-nvi', name: 'Nueva Versión Internacional', language: 'Spanish', category: 'Modern', script: 'Latin' },
  { id: 'spa-nblh', name: 'Nueva Biblia Latinoamericana', language: 'Spanish', category: 'Modern', script: 'Latin' },
  { id: 'spa-lbla', name: 'La Biblia de las Américas', language: 'Spanish', category: 'Formal', script: 'Latin' },
  { id: 'spa-nbv', name: 'Nueva Biblia Viva', language: 'Spanish', category: 'Paraphrase', script: 'Latin' },
  { id: 'spa-dhh', name: 'Dios Habla Hoy', language: 'Spanish', category: 'Thought', script: 'Latin' },
  { id: 'spa-tla', name: 'Traducción en Lenguaje Actual', language: 'Spanish', category: 'Thought', script: 'Latin' },
  { id: 'spa-blph', name: 'Biblia La Palabra', language: 'Spanish', category: 'Modern', script: 'Latin' },
  { id: 'spa-rv1909', name: 'Reina-Valera 1909', language: 'Spanish', category: 'Historical', script: 'Latin' },
  
  { id: 'fre-ls1910', name: 'Louis Segond 1910', language: 'French', category: 'Traditional', script: 'Latin' },
  { id: 'fre-ls21', name: 'Louis Segond 21', language: 'French', category: 'Modern', script: 'Latin' },
  { id: 'fre-seg', name: 'Segond', language: 'French', category: 'Traditional', script: 'Latin' },
  { id: 'fre-nbs', name: 'Nouvelle Bible Segond', language: 'French', category: 'Modern', script: 'Latin' },
  { id: 'fre-bds', name: 'Bible du Semeur', language: 'French', category: 'Thought', script: 'Latin' },
  { id: 'fre-pdv', name: 'Parole de Vie', language: 'French', category: 'Thought', script: 'Latin' },
  { id: 'fre-tob', name: 'Traduction Œcuménique', language: 'French', category: 'Formal', script: 'Latin' },
  { id: 'fre-jerusalem', name: 'Bible de Jérusalem', language: 'French', category: 'Formal', script: 'Latin' },
  
  { id: 'ger-luther1984', name: 'Lutherbibel 1984', language: 'German', category: 'Traditional', script: 'Latin' },
  { id: 'ger-luther2017', name: 'Lutherbibel 2017', language: 'German', category: 'Modern', script: 'Latin' },
  { id: 'ger-elb', name: 'Elberfelder Bibel', language: 'German', category: 'Formal', script: 'Latin' },
  { id: 'ger-schlachter', name: 'Schlachter 2000', language: 'German', category: 'Formal', script: 'Latin' },
  { id: 'ger-ngue', name: 'Neue Genfer Übersetzung', language: 'German', category: 'Modern', script: 'Latin' },
  { id: 'ger-hfa', name: 'Hoffnung für Alle', language: 'German', category: 'Paraphrase', script: 'Latin' },
  { id: 'ger-gute', name: 'Gute Nachricht Bibel', language: 'German', category: 'Thought', script: 'Latin' },
  { id: 'ger-einheits', name: 'Einheitsübersetzung', language: 'German', category: 'Formal', script: 'Latin' },
  
  { id: 'ita-nr1994', name: 'Nuova Riveduta 1994', language: 'Italian', category: 'Modern', script: 'Latin' },
  { id: 'ita-nr2006', name: 'Nuova Riveduta 2006', language: 'Italian', category: 'Modern', script: 'Latin' },
  { id: 'ita-cei', name: 'Conferenza Episcopale Italiana', language: 'Italian', category: 'Formal', script: 'Latin' },
  { id: 'ita-luzzi', name: 'Riveduta Luzzi', language: 'Italian', category: 'Traditional', script: 'Latin' },
  { id: 'ita-diodati', name: 'Nuova Diodati', language: 'Italian', category: 'Traditional', script: 'Latin' },
  
  { id: 'dut-nbv', name: 'Nieuwe Bijbelvertaling', language: 'Dutch', category: 'Modern', script: 'Latin' },
  { id: 'dut-hsv', name: 'Herziene Statenvertaling', language: 'Dutch', category: 'Modern', script: 'Latin' },
  { id: 'dut-staten', name: 'Statenvertaling', language: 'Dutch', category: 'Traditional', script: 'Latin' },
  { id: 'dut-gwv', name: 'Groot Nieuws Vertaling', language: 'Dutch', category: 'Thought', script: 'Latin' },
  
  { id: 'por-arc', name: 'Almeida Revista e Corrigida', language: 'Portuguese', category: 'Traditional', script: 'Latin' },
  { id: 'por-ara', name: 'Almeida Revista e Atualizada', language: 'Portuguese', category: 'Modern', script: 'Latin' },
  { id: 'por-nvi', name: 'Nova Versão Internacional', language: 'Portuguese', category: 'Modern', script: 'Latin' },
  { id: 'por-ntlh', name: 'Nova Tradução na Linguagem de Hoje', language: 'Portuguese', category: 'Thought', script: 'Latin' },
  { id: 'por-acf', name: 'Almeida Corrigida Fiel', language: 'Portuguese', category: 'Traditional', script: 'Latin' },
  
  { id: 'rus-synodal', name: 'Синодальный перевод', language: 'Russian', category: 'Traditional', script: 'Cyrillic' },
  { id: 'rus-rst', name: 'Русский Современный перевод', language: 'Russian', category: 'Modern', script: 'Cyrillic' },
  { id: 'rus-carslaw', name: 'Перевод Кассиана', language: 'Russian', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'pol-bt', name: 'Biblia Tysiąclecia', language: 'Polish', category: 'Modern', script: 'Latin' },
  { id: 'pol-bw', name: 'Biblia Warszawska', language: 'Polish', category: 'Traditional', script: 'Latin' },
  { id: 'pol-ubg', name: 'Uwspółcześniona Biblia Gdańska', language: 'Polish', category: 'Modern', script: 'Latin' },
  
  { id: 'ukr-ukrainian', name: 'Українська Біблія', language: 'Ukrainian', category: 'Modern', script: 'Cyrillic' },
  { id: 'ukr-ohienko', name: 'Біблія Огієнка', language: 'Ukrainian', category: 'Traditional', script: 'Cyrillic' },
  
  { id: 'vie-rv', name: 'Bản Dịch 1925', language: 'Vietnamese', category: 'Traditional', script: 'Latin' },
  { id: 'vie-nvi', name: 'Bản Dịch Mới', language: 'Vietnamese', category: 'Modern', script: 'Latin' },
  
  { id: 'tha-thsv', name: 'ฉบับมาตรฐาน', language: 'Thai', category: 'Modern', script: 'Thai' },
  { id: 'tha-tncv', name: 'ฉบับสมัยใหม่', language: 'Thai', category: 'Modern', script: 'Thai' },
  
  { id: 'hun-karoli', name: 'Károli-Biblia', language: 'Hungarian', category: 'Traditional', script: 'Latin' },
  { id: 'hun-uj', name: 'Új fordítás', language: 'Hungarian', category: 'Modern', script: 'Latin' },
  
  { id: 'rom-cornilescu', name: 'Cornilescu', language: 'Romanian', category: 'Traditional', script: 'Latin' },
  { id: 'rom-ntlr', name: 'Noua Traducere', language: 'Romanian', category: 'Modern', script: 'Latin' },
  
  { id: 'cze-cep', name: 'Český ekumenický překlad', language: 'Czech', category: 'Modern', script: 'Latin' },
  { id: 'cze-b21', name: 'Bible 21. století', language: 'Czech', category: 'Modern', script: 'Latin' },
  
  { id: 'slo-ecav', name: 'Evanjelický preklad', language: 'Slovak', category: 'Modern', script: 'Latin' },
  
  { id: 'bul-bulg', name: 'Българска Библия', language: 'Bulgarian', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'hrv-chr', name: 'Hrvatski Biblijski prijevod', language: 'Croatian', category: 'Modern', script: 'Latin' },
  
  { id: 'srp-serbian', name: 'Српска Библија', language: 'Serbian', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'swe-sfb', name: 'Svenska Folkbibeln', language: 'Swedish', category: 'Modern', script: 'Latin' },
  { id: 'swe-sv1917', name: 'Svenska 1917', language: 'Swedish', category: 'Traditional', script: 'Latin' },
  
  { id: 'nor-nb88', name: 'Norsk 1988', language: 'Norwegian', category: 'Modern', script: 'Latin' },
  { id: 'nor-nb2011', name: 'Norsk 2011', language: 'Norwegian', category: 'Modern', script: 'Latin' },
  
  { id: 'dan-danish', name: 'Dansk', language: 'Danish', category: 'Modern', script: 'Latin' },
  
  { id: 'fin-finnish', name: 'Raamattu 1933/38', language: 'Finnish', category: 'Traditional', script: 'Latin' },
  { id: 'fin-fin1992', name: 'Raamattu 1992', language: 'Finnish', category: 'Modern', script: 'Latin' },
  
  { id: 'ice-icelandic', name: 'Íslenska Biblían', language: 'Icelandic', category: 'Modern', script: 'Latin' },
  
  { id: 'ara-svd', name: 'الكتاب المقدس', language: 'Arabic', category: 'Modern', script: 'Arabic' },
  { id: 'ara-nav', name: 'الترجمة العربية', language: 'Arabic', category: 'Modern', script: 'Arabic' },
  
  { id: 'heb-modernhebrew', name: 'עברית חדשה', language: 'Hebrew', category: 'Modern', script: 'Hebrew' },
  { id: 'heb-westminster', name: 'Westminster Leningrad', language: 'Hebrew', category: 'Original', script: 'Hebrew' },
  { id: 'heb-aleppo', name: 'Aleppo Codex', language: 'Hebrew', category: 'Original', script: 'Hebrew' },
  { id: 'heb-bhs', name: 'Biblia Hebraica Stuttgartensia', language: 'Hebrew', category: 'Original', script: 'Hebrew' },
  
  { id: 'grk-textus', name: 'Textus Receptus', language: 'Greek', category: 'Original', script: 'Greek' },
  { id: 'grk-nestle', name: 'Nestle-Aland 28', language: 'Greek', category: 'Original', script: 'Greek' },
  { id: 'grk-westcott', name: 'Westcott-Hort', language: 'Greek', category: 'Original', script: 'Greek' },
  { id: 'grk-tischendorf', name: 'Tischendorf', language: 'Greek', category: 'Original', script: 'Greek' },
  { id: 'grk-sbl', name: 'SBL Greek NT', language: 'Greek', category: 'Original', script: 'Greek' },
  { id: 'grk-byzantine', name: 'Byzantine Text', language: 'Greek', category: 'Original', script: 'Greek' },
  
  { id: 'lat-vulgate', name: 'Biblia Sacra Vulgata', language: 'Latin', category: 'Original', script: 'Latin' },
  { id: 'lat-clementine', name: 'Clementine Vulgate', language: 'Latin', category: 'Original', script: 'Latin' },
  { id: 'lat-nova', name: 'Nova Vulgata', language: 'Latin', category: 'Modern', script: 'Latin' },
  
  { id: 'arm-eastern', name: 'Հայերեն Աստվածաշունչ', language: 'Armenian', category: 'Modern', script: 'Armenian' },
  
  { id: 'geo-georgian', name: 'ქართული ბიბლია', language: 'Georgian', category: 'Modern', script: 'Georgian' },
  
  { id: 'hin-hindi', name: 'हिन्दी बाइबिल', language: 'Hindi', category: 'Modern', script: 'Devanagari' },
  { id: 'hin-ov', name: 'ओ वी हिन्दी', language: 'Hindi', category: 'Modern', script: 'Devanagari' },
  
  { id: 'ben-bengali', name: 'বাংলা বাইবেল', language: 'Bengali', category: 'Modern', script: 'Bengali' },
  
  { id: 'tam-tamil', name: 'தமிழ் பைபிள்', language: 'Tamil', category: 'Modern', script: 'Tamil' },
  { id: 'tam-rov', name: 'திருவிவிலியம்', language: 'Tamil', category: 'Modern', script: 'Tamil' },
  
  { id: 'tel-telugu', name: 'తెలుగు బైబిల్', language: 'Telugu', category: 'Modern', script: 'Telugu' },
  
  { id: 'mal-malayalam', name: 'മലയാളം ബൈബിൾ', language: 'Malayalam', category: 'Modern', script: 'Malayalam' },
  
  { id: 'kan-kannada', name: 'ಕನ್ನಡ ಬೈಬಲ್', language: 'Kannada', category: 'Modern', script: 'Kannada' },
  
  { id: 'mar-marathi', name: 'मराठी बायबल', language: 'Marathi', category: 'Modern', script: 'Devanagari' },
  
  { id: 'guj-gujarati', name: 'ગુજરાતી બાઇબલ', language: 'Gujarati', category: 'Modern', script: 'Gujarati' },
  
  { id: 'pan-punjabi', name: 'ਪੰਜਾਬੀ ਬਾਈਬਲ', language: 'Punjabi', category: 'Modern', script: 'Gurmukhi' },
  
  { id: 'urd-urdu', name: 'اردو بائبل', language: 'Urdu', category: 'Modern', script: 'Arabic' },
  
  { id: 'nep-nepali', name: 'नेपाली बाइबल', language: 'Nepali', category: 'Modern', script: 'Devanagari' },
  
  { id: 'sin-sinhala', name: 'සිංහල බයිබලය', language: 'Sinhala', category: 'Modern', script: 'Sinhala' },
  
  { id: 'bur-myanmar', name: 'မြန်မာ သမ္မာကျမ်းစာ', language: 'Burmese', category: 'Modern', script: 'Myanmar' },
  
  { id: 'khm-khmer', name: 'ខ្មែរ ព្រះគម្ពីរ', language: 'Khmer', category: 'Modern', script: 'Khmer' },
  
  { id: 'lao-lao', name: 'ພຣະຄຳພີ ພາສາລາວ', language: 'Lao', category: 'Modern', script: 'Lao' },
  
  { id: 'msa-malay', name: 'Alkitab Bahasa Melayu', language: 'Malay', category: 'Modern', script: 'Latin' },
  
  { id: 'swa-swahili', name: 'Biblia Kiswahili', language: 'Swahili', category: 'Modern', script: 'Latin' },
  
  { id: 'amh-amharic', name: 'አማርኛ መጽሐፍ ቅዱስ', language: 'Amharic', category: 'Modern', script: 'Ethiopic' },
  
  { id: 'som-somali', name: 'Soomaaliga Bible', language: 'Somali', category: 'Modern', script: 'Latin' },
  
  { id: 'hau-hausa', name: 'Littafi Mai Tsarki Hausa', language: 'Hausa', category: 'Modern', script: 'Latin' },
  
  { id: 'yor-yoruba', name: 'Bíbélì Mímọ́ Yoruba', language: 'Yoruba', category: 'Modern', script: 'Latin' },
  
  { id: 'ibo-igbo', name: 'Akwụkwọ Nsọ Igbo', language: 'Igbo', category: 'Modern', script: 'Latin' },
  
  { id: 'zul-zulu', name: 'IBhayibheli Zulu', language: 'Zulu', category: 'Modern', script: 'Latin' },
  
  { id: 'afr-afrikaans', name: 'Afrikaanse Bybel', language: 'Afrikaans', category: 'Modern', script: 'Latin' },
  { id: 'afr-afr1953', name: 'Afrikaans 1953', language: 'Afrikaans', category: 'Traditional', script: 'Latin' },
  
  { id: 'wel-welsh', name: 'Beibl Cymraeg', language: 'Welsh', category: 'Modern', script: 'Latin' },
  
  { id: 'gle-irish', name: 'Bíobla Naofa', language: 'Irish', category: 'Modern', script: 'Latin' },
  
  { id: 'gla-scottish', name: 'Bioball Gàidhlig', language: 'Scottish Gaelic', category: 'Modern', script: 'Latin' },
  
  { id: 'eus-basque', name: 'Euskal Biblia', language: 'Basque', category: 'Modern', script: 'Latin' },
  
  { id: 'cat-catalan', name: 'Bíblia Catalana', language: 'Catalan', category: 'Modern', script: 'Latin' },
  
  { id: 'glg-galician', name: 'Biblia Galega', language: 'Galician', category: 'Modern', script: 'Latin' },
  
  { id: 'mlt-maltese', name: 'Bibbja Maltija', language: 'Maltese', category: 'Modern', script: 'Latin' },
  
  { id: 'alb-albanian', name: 'Bibla Shqip', language: 'Albanian', category: 'Modern', script: 'Latin' },
  
  { id: 'est-estonian', name: 'Piibel Eesti', language: 'Estonian', category: 'Modern', script: 'Latin' },
  
  { id: 'lav-latvian', name: 'Bībele Latviešu', language: 'Latvian', category: 'Modern', script: 'Latin' },
  
  { id: 'lit-lithuanian', name: 'Biblija Lietuvių', language: 'Lithuanian', category: 'Modern', script: 'Latin' },
  
  { id: 'slv-slovenian', name: 'Sveto pismo Slovenski', language: 'Slovenian', category: 'Modern', script: 'Latin' },
  
  { id: 'mkd-macedonian', name: 'Македонска Библија', language: 'Macedonian', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'mon-mongolian', name: 'Монгол Библи', language: 'Mongolian', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'tib-tibetan', name: 'བོད་ཡིག་བཀའ་འགྱུར', language: 'Tibetan', category: 'Modern', script: 'Tibetan' },
  
  { id: 'per-farsi', name: 'کتاب مقدس فارسی', language: 'Persian', category: 'Modern', script: 'Arabic' },
  
  { id: 'pus-pashto', name: 'مقدس کتاب پښتو', language: 'Pashto', category: 'Modern', script: 'Arabic' },
  
  { id: 'kur-kurdish', name: 'Încîla Pîroz Kurdî', language: 'Kurdish', category: 'Modern', script: 'Latin' },
  
  { id: 'aze-azerbaijani', name: 'Azərbaycan Müqəddəs', language: 'Azerbaijani', category: 'Modern', script: 'Latin' },
  
  { id: 'tur-turkish', name: 'Kutsal Kitap Türkçe', language: 'Turkish', category: 'Modern', script: 'Latin' },
  { id: 'tur-tck', name: 'Türkçe Kutsal Kitap', language: 'Turkish', category: 'Modern', script: 'Latin' },
  
  { id: 'uzb-uzbek', name: "Muqaddas Kitob O'zbek", language: 'Uzbek', category: 'Modern', script: 'Latin' },
  
  { id: 'kaz-kazakh', name: 'Қасиетті Кітап Қазақ', language: 'Kazakh', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'tgk-tajik', name: 'Китоби Муқаддас Тоҷикӣ', language: 'Tajik', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'tuk-turkmen', name: 'Mukaddes Kitap Türkmen', language: 'Turkmen', category: 'Modern', script: 'Latin' },
  
  { id: 'kir-kyrgyz', name: 'Ыйык Китеп Кыргыз', language: 'Kyrgyz', category: 'Modern', script: 'Cyrillic' },
  
  { id: 'ceb-cebuano', name: 'Bibliya Cebuano', language: 'Cebuano', category: 'Modern', script: 'Latin' },
  
  { id: 'ilo-ilocano', name: 'Biblia Ilocano', language: 'Ilocano', category: 'Modern', script: 'Latin' },
  
  { id: 'hil-hiligaynon', name: 'Bibliya Hiligaynon', language: 'Hiligaynon', category: 'Modern', script: 'Latin' },
  
  { id: 'war-waray', name: 'Biblia Waray', language: 'Waray', category: 'Modern', script: 'Latin' },
  
  { id: 'jav-javanese', name: 'Alkitab Jawa', language: 'Javanese', category: 'Modern', script: 'Latin' },
  
  { id: 'sun-sundanese', name: 'Alkitab Sunda', language: 'Sundanese', category: 'Modern', script: 'Latin' },
  
  { id: 'mad-madurese', name: 'Alkitab Madura', language: 'Madurese', category: 'Modern', script: 'Latin' },
  
  { id: 'min-minangkabau', name: 'Alkitab Minangkabau', language: 'Minangkabau', category: 'Modern', script: 'Latin' },
  
  { id: 'ban-balinese', name: 'Alkitab Bali', language: 'Balinese', category: 'Modern', script: 'Latin' },
  
  { id: 'fil-filipino', name: 'Bibliya Filipino', language: 'Filipino', category: 'Modern', script: 'Latin' },
  
  { id: 'fij-fijian', name: 'Ai Vola Tabu Fijian', language: 'Fijian', category: 'Modern', script: 'Latin' },
  
  { id: 'ton-tongan', name: 'Tohi Tapu Tongan', language: 'Tongan', category: 'Modern', script: 'Latin' },
  
  { id: 'smo-samoan', name: 'O le Tusi Paia Samoan', language: 'Samoan', category: 'Modern', script: 'Latin' },
  
  { id: 'mao-maori', name: 'Te Paipera Tapu Māori', language: 'Māori', category: 'Modern', script: 'Latin' },
  
  { id: 'haw-hawaiian', name: 'Ka Baibala Hemolele Hawaiian', language: 'Hawaiian', category: 'Modern', script: 'Latin' },
  
  { id: 'mri-marshallese', name: 'Baibōl Marshallese', language: 'Marshallese', category: 'Modern', script: 'Latin' },
  
  { id: 'nau-nauruan', name: 'Bibel Nauruan', language: 'Nauruan', category: 'Modern', script: 'Latin' },
  
  { id: 'kin-kinyarwanda', name: 'Bibiliya Kinyarwanda', language: 'Kinyarwanda', category: 'Modern', script: 'Latin' },
  
  { id: 'run-kirundi', name: 'Bibiliya Kirundi', language: 'Kirundi', category: 'Modern', script: 'Latin' },
  
  { id: 'mlg-malagasy', name: 'Baiboly Malagasy', language: 'Malagasy', category: 'Modern', script: 'Latin' },
  
  { id: 'sna-shona', name: 'Bhaibheri Shona', language: 'Shona', category: 'Modern', script: 'Latin' },
  
  { id: 'sot-sesotho', name: 'Bebele Sesotho', language: 'Sesotho', category: 'Modern', script: 'Latin' },
  
  { id: 'tsn-setswana', name: 'Beibele Setswana', language: 'Setswana', category: 'Modern', script: 'Latin' },
  
  { id: 'xho-xhosa', name: 'IBhayibhile Xhosa', language: 'Xhosa', category: 'Modern', script: 'Latin' },
  
  { id: 'nso-sepedi', name: 'Bebele Sepedi', language: 'Sepedi', category: 'Modern', script: 'Latin' },
  
  { id: 'ven-venda', name: 'Bivhili Venda', language: 'Venda', category: 'Modern', script: 'Latin' },
  
  { id: 'tsw-tswana', name: 'Beibele Tswana', language: 'Tswana', category: 'Modern', script: 'Latin' },
  
  { id: 'nde-ndebele', name: 'IBhayibheli Ndebele', language: 'Ndebele', category: 'Modern', script: 'Latin' },
];

export const verseThemes = [
  'Comfort', 'Strength', 'Hope', 'Faith', 'Love', 'Peace', 'Joy', 'Wisdom',
  'Courage', 'Patience', 'Forgiveness', 'Gratitude', 'Prayer', 'Guidance',
  'Protection', 'Healing', 'Grace', 'Trust', 'Salvation', 'Redemption',
  'Lament', 'Praise', 'Worship', 'Justice', 'Mercy', 'Righteousness',
  'Faithfulness', 'Kindness', 'Humility', 'Perseverance', 'Victory',
  'Deliverance', 'Blessing', 'Provision', 'Refuge', 'Light', 'Truth',
  'Freedom', 'Renewal', 'Restoration', 'Transformation', 'Unity',
  'Compassion', 'Service', 'Sacrifice', 'Obedience', 'Reverence'
];
