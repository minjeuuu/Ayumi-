export interface BibleVersion {
  id: string;
  name: string;
  language: string;
  category: string;
  script?: string;
  year?: number;
}

export const allBibleVersions: BibleVersion[] = [
  { id: 'kjv', name: 'King James Version', language: 'English', category: 'Traditional', year: 1611 },
  { id: 'nkjv', name: 'New King James Version', language: 'English', category: 'Traditional', year: 1982 },
  { id: 'esv', name: 'English Standard Version', language: 'English', category: 'Formal', year: 2001 },
  { id: 'niv', name: 'New International Version', language: 'English', category: 'Formal', year: 1978 },
  { id: 'niv-uk', name: 'New International Version UK', language: 'English', category: 'Formal', year: 2011 },
  { id: 'nrsv', name: 'New Revised Standard Version', language: 'English', category: 'Formal', year: 1989 },
  { id: 'nrsvue', name: 'New Revised Standard Version Updated Edition', language: 'English', category: 'Formal', year: 2021 },
  { id: 'nasb-1995', name: 'New American Standard Bible 1995', language: 'English', category: 'Formal', year: 1995 },
  { id: 'nasb-2020', name: 'New American Standard Bible 2020', language: 'English', category: 'Formal', year: 2020 },
  { id: 'csb', name: 'Christian Standard Bible', language: 'English', category: 'Formal', year: 2017 },
  { id: 'hcsb', name: 'Holman Christian Standard Bible', language: 'English', category: 'Formal', year: 2004 },
  { id: 'rsv', name: 'Revised Standard Version', language: 'English', category: 'Formal', year: 1952 },
  { id: 'nlt', name: 'New Living Translation', language: 'English', category: 'Thought', year: 1996 },
  { id: 'gnt', name: 'Good News Translation', language: 'English', category: 'Thought', year: 1976 },
  { id: 'cev', name: 'Contemporary English Version', language: 'English', category: 'Thought', year: 1995 },
  { id: 'msg', name: 'The Message', language: 'English', category: 'Paraphrase', year: 2002 },
  { id: 'amp', name: 'Amplified Bible', language: 'English', category: 'Formal', year: 2015 },
  { id: 'leb', name: 'Lexham English Bible', language: 'English', category: 'Formal', year: 2010 },
  { id: 'web', name: 'World English Bible', language: 'English', category: 'Formal', year: 2000 },
  { id: 'asv', name: 'American Standard Version', language: 'English', category: 'Traditional', year: 1901 },
  { id: 'ylt', name: 'Young Literal Translation', language: 'English', category: 'Formal', year: 1898 },
  { id: 'drb', name: 'Douay-Rheims Bible', language: 'English', category: 'Traditional', year: 1609 },
  { id: 'erv', name: 'Easy-to-Read Version', language: 'English', category: 'Thought', year: 2006 },
  { id: 'gnv', name: 'Geneva Bible', language: 'English', category: 'Traditional', year: 1599 },
  { id: 'net', name: 'New English Translation', language: 'English', category: 'Formal', year: 2005 },
  { id: 'neb', name: 'New English Bible', language: 'English', category: 'Formal', year: 1970 },
  { id: 'reb', name: 'Revised English Bible', language: 'English', category: 'Formal', year: 1989 },
  { id: 'jb', name: 'Jerusalem Bible', language: 'English', category: 'Formal', year: 1966 },
  { id: 'njb', name: 'New Jerusalem Bible', language: 'English', category: 'Formal', year: 1985 },
  { id: 'tpt', name: 'The Passion Translation', language: 'English', category: 'Paraphrase', year: 2017 },
  { id: 'voice', name: 'The Voice', language: 'English', category: 'Paraphrase', year: 2012 },
  { id: 'phillips', name: 'J.B. Phillips New Testament', language: 'English', category: 'Paraphrase', year: 1972 },
  { id: 'living', name: 'Living Bible', language: 'English', category: 'Paraphrase', year: 1971 },
  { id: 'coverdale', name: 'Coverdale Bible', language: 'English', category: 'Historical', year: 1535 },
  { id: 'tyndale', name: 'Tyndale Bible', language: 'English', category: 'Historical', year: 1530 },
  { id: 'bishops', name: 'Bishops Bible', language: 'English', category: 'Historical', year: 1568 },
  { id: 'great-bible', name: 'Great Bible', language: 'English', category: 'Historical', year: 1539 },
  { id: 'wycliffe', name: 'Wycliffe Bible', language: 'English', category: 'Historical', year: 1382 },
  { id: 'darby', name: 'Darby Translation', language: 'English', category: 'Formal', year: 1890 },
  { id: 'weymouth', name: 'Weymouth New Testament', language: 'English', category: 'Modern', year: 1903 },
  { id: 'twentieth', name: 'Twentieth Century New Testament', language: 'English', category: 'Modern', year: 1904 },
  { id: 'moffatt', name: 'Moffatt Translation', language: 'English', category: 'Modern', year: 1926 },
  { id: 'knox', name: 'Knox Translation', language: 'English', category: 'Modern', year: 1955 },
  { id: 'nabre', name: 'New American Bible Revised Edition', language: 'English', category: 'Formal', year: 2011 },
  { id: 'ncv', name: 'New Century Version', language: 'English', category: 'Thought', year: 1991 },
  { id: 'nirv', name: 'New International Readers Version', language: 'English', category: 'Thought', year: 1996 },
  { id: 'icb', name: 'International Childrens Bible', language: 'English', category: 'Thought', year: 1986 },
  { id: 'tniv', name: 'Todays New International Version', language: 'English', category: 'Modern', year: 2005 },
  { id: 'gw', name: 'Gods Word Translation', language: 'English', category: 'Thought', year: 1995 },
  { id: 'isv', name: 'International Standard Version', language: 'English', category: 'Formal', year: 2011 },
  { id: 'tlv', name: 'Tree of Life Version', language: 'English', category: 'Messianic', year: 2015 },
  { id: 'mev', name: 'Modern English Version', language: 'English', category: 'Modern', year: 2014 },
  { id: 'cjb', name: 'Complete Jewish Bible', language: 'English', category: 'Messianic', year: 1998 },
  { id: 'ojb', name: 'Orthodox Jewish Bible', language: 'English', category: 'Messianic', year: 2002 },
  { id: 'esvuk', name: 'English Standard Version Anglicised', language: 'English', category: 'Formal', year: 2002 },
  
  { id: 'rv1909', name: 'Reina-Valera 1909', language: 'Spanish', category: 'Traditional', year: 1909 },
  { id: 'rv1960', name: 'Reina-Valera 1960', language: 'Spanish', category: 'Traditional', year: 1960 },
  { id: 'rv1995', name: 'Reina-Valera 1995', language: 'Spanish', category: 'Modern', year: 1995 },
  { id: 'rv2000', name: 'Reina-Valera 2000', language: 'Spanish', category: 'Modern', year: 2000 },
  { id: 'rvr1977', name: 'Reina-Valera Revisada 1977', language: 'Spanish', category: 'Modern', year: 1977 },
  { id: 'nvi-spa', name: 'Nueva Versión Internacional', language: 'Spanish', category: 'Modern', year: 1999 },
  { id: 'nblh', name: 'Nueva Biblia Latinoamericana', language: 'Spanish', category: 'Modern', year: 2005 },
  { id: 'lbla', name: 'La Biblia de las Américas', language: 'Spanish', category: 'Formal', year: 1986 },
  { id: 'nbv-spa', name: 'Nueva Biblia Viva', language: 'Spanish', category: 'Paraphrase', year: 2006 },
  { id: 'dhh', name: 'Dios Habla Hoy', language: 'Spanish', category: 'Thought', year: 1979 },
  { id: 'tla', name: 'Traducción en Lenguaje Actual', language: 'Spanish', category: 'Thought', year: 2003 },
  { id: 'blph', name: 'Biblia La Palabra', language: 'Spanish', category: 'Modern', year: 2010 },
  { id: 'pdt-spa', name: 'Palabra de Dios para Todos', language: 'Spanish', category: 'Thought', year: 2008 },
  { id: 'bti', name: 'Biblia Textual Internacional', language: 'Spanish', category: 'Formal', year: 1999 },
  { id: 'bla', name: 'Biblia Latinoamericana', language: 'Spanish', category: 'Modern', year: 1972 },
  { id: 'cst', name: 'Castilian', language: 'Spanish', category: 'Regional', year: 2003 },
  { id: 'nbd', name: 'Nueva Biblia al Día', language: 'Spanish', category: 'Modern', year: 2006 },
  { id: 'bls', name: 'Biblia Lenguaje Sencillo', language: 'Spanish', category: 'Thought', year: 2008 },
  { id: 'jbs', name: 'Jubilee Bible Spanish', language: 'Spanish', category: 'Traditional', year: 2000 },
  { id: 'rv-gomez', name: 'Reina-Valera Gómez', language: 'Spanish', category: 'Modern', year: 2010 },
  
  { id: 'arc', name: 'Almeida Revista e Corrigida', language: 'Portuguese', category: 'Traditional', year: 1898 },
  { id: 'ara', name: 'Almeida Revista e Atualizada', language: 'Portuguese', category: 'Modern', year: 1993 },
  { id: 'acf', name: 'Almeida Corrigida Fiel', language: 'Portuguese', category: 'Traditional', year: 1994 },
  { id: 'aa', name: 'Almeida Atualizada', language: 'Portuguese', category: 'Modern', year: 1997 },
  { id: 'nvi-por', name: 'Nova Versão Internacional', language: 'Portuguese', category: 'Modern', year: 2001 },
  { id: 'ntlh', name: 'Nova Tradução na Linguagem de Hoje', language: 'Portuguese', category: 'Thought', year: 2000 },
  { id: 'naa', name: 'Nova Almeida Atualizada', language: 'Portuguese', category: 'Modern', year: 2017 },
  { id: 'tb', name: 'Tradução Brasileira', language: 'Portuguese', category: 'Traditional', year: 1917 },
  { id: 'bv', name: 'Bíblia Viva', language: 'Portuguese', category: 'Paraphrase', year: 1981 },
  { id: 'ave', name: 'A Versão Fácil de Ler', language: 'Portuguese', category: 'Thought', year: 1999 },
  { id: 'kja', name: 'King James Atualizada', language: 'Portuguese', category: 'Modern', year: 2012 },
  { id: 'bkj', name: 'Bíblia King James', language: 'Portuguese', category: 'Formal', year: 2008 },
  { id: 'vc', name: 'Versão Contemporânea', language: 'Portuguese', category: 'Modern', year: 2011 },
  
  { id: 'ls1910', name: 'Louis Segond 1910', language: 'French', category: 'Traditional', year: 1910 },
  { id: 'ls21', name: 'Louis Segond 21', language: 'French', category: 'Modern', year: 2007 },
  { id: 'seg', name: 'Segond', language: 'French', category: 'Traditional', year: 1880 },
  { id: 'nbs', name: 'Nouvelle Bible Segond', language: 'French', category: 'Modern', year: 2002 },
  { id: 'bds', name: 'Bible du Semeur', language: 'French', category: 'Thought', year: 1992 },
  { id: 'pdv', name: 'Parole de Vie', language: 'French', category: 'Thought', year: 2000 },
  { id: 'tob', name: 'Traduction Œcuménique', language: 'French', category: 'Formal', year: 2010 },
  { id: 'jb-fr', name: 'Bible de Jérusalem', language: 'French', category: 'Formal', year: 1973 },
  { id: 'fc', name: 'Français Courant', language: 'French', category: 'Thought', year: 1982 },
  { id: 'neg1979', name: 'Nouvelle Édition de Genève 1979', language: 'French', category: 'Traditional', year: 1979 },
  { id: 'bfc', name: 'Bible en Français Courant', language: 'French', category: 'Thought', year: 1997 },
  { id: 'darby-fr', name: 'Darby French', language: 'French', category: 'Formal', year: 1885 },
  { id: 'martin', name: 'Martin Bible', language: 'French', category: 'Traditional', year: 1744 },
  { id: 'ostervald', name: 'Ostervald', language: 'French', category: 'Traditional', year: 1996 },
  { id: 'colombe', name: 'Nouvelle Bible Colombe', language: 'French', category: 'Modern', year: 1978 },
  
  { id: 'luther1545', name: 'Lutherbibel 1545', language: 'German', category: 'Traditional', year: 1545 },
  { id: 'luther1912', name: 'Lutherbibel 1912', language: 'German', category: 'Traditional', year: 1912 },
  { id: 'luther1984', name: 'Lutherbibel 1984', language: 'German', category: 'Traditional', year: 1984 },
  { id: 'luther2017', name: 'Lutherbibel 2017', language: 'German', category: 'Modern', year: 2017 },
  { id: 'elb', name: 'Elberfelder Bibel', language: 'German', category: 'Formal', year: 2006 },
  { id: 'elb1871', name: 'Elberfelder 1871', language: 'German', category: 'Traditional', year: 1871 },
  { id: 'schlachter', name: 'Schlachter 2000', language: 'German', category: 'Formal', year: 2000 },
  { id: 'schlachter1951', name: 'Schlachter 1951', language: 'German', category: 'Traditional', year: 1951 },
  { id: 'ngue', name: 'Neue Genfer Übersetzung', language: 'German', category: 'Modern', year: 2011 },
  { id: 'hfa', name: 'Hoffnung für Alle', language: 'German', category: 'Paraphrase', year: 2002 },
  { id: 'gute', name: 'Gute Nachricht Bibel', language: 'German', category: 'Thought', year: 1997 },
  { id: 'einheits', name: 'Einheitsübersetzung', language: 'German', category: 'Formal', year: 2016 },
  { id: 'menge', name: 'Menge Bibel', language: 'German', category: 'Formal', year: 1939 },
  { id: 'zuercher', name: 'Zürcher Bibel', language: 'German', category: 'Modern', year: 2007 },
  { id: 'neues-leben', name: 'Neues Leben', language: 'German', category: 'Thought', year: 2005 },
  { id: 'volxbibel', name: 'Volxbibel', language: 'German', category: 'Paraphrase', year: 2005 },
  
  { id: 'nr1994', name: 'Nuova Riveduta 1994', language: 'Italian', category: 'Modern', year: 1994 },
  { id: 'nr2006', name: 'Nuova Riveduta 2006', language: 'Italian', category: 'Modern', year: 2006 },
  { id: 'cei', name: 'Conferenza Episcopale Italiana', language: 'Italian', category: 'Formal', year: 2008 },
  { id: 'cei1974', name: 'CEI 1974', language: 'Italian', category: 'Traditional', year: 1974 },
  { id: 'luzzi', name: 'Riveduta Luzzi', language: 'Italian', category: 'Traditional', year: 1925 },
  { id: 'diodati', name: 'Nuova Diodati', language: 'Italian', category: 'Traditional', year: 1991 },
  { id: 'tilc', name: 'Traduzione Interconfessionale', language: 'Italian', category: 'Modern', year: 1985 },
  { id: 'nd', name: 'Nuovissima Diodati', language: 'Italian', category: 'Modern', year: 2006 },
  
  { id: 'nbv', name: 'Nieuwe Bijbelvertaling', language: 'Dutch', category: 'Modern', year: 2004 },
  { id: 'hsv', name: 'Herziene Statenvertaling', language: 'Dutch', category: 'Modern', year: 2010 },
  { id: 'staten', name: 'Statenvertaling', language: 'Dutch', category: 'Traditional', year: 1637 },
  { id: 'gwv', name: 'Groot Nieuws Vertaling', language: 'Dutch', category: 'Thought', year: 1996 },
  { id: 'nbg1951', name: 'NBG-vertaling 1951', language: 'Dutch', category: 'Traditional', year: 1951 },
  { id: 'nbs-nl', name: 'Naardense Bijbel', language: 'Dutch', category: 'Modern', year: 2004 },
  { id: 'willibrord', name: 'Willibrordvertaling', language: 'Dutch', category: 'Traditional', year: 1978 },
  
  { id: 'synodal', name: 'Синодальный перевод', language: 'Russian', category: 'Traditional', script: 'Cyrillic', year: 1876 },
  { id: 'rst', name: 'Русский Современный перевод', language: 'Russian', category: 'Modern', script: 'Cyrillic', year: 2011 },
  { id: 'cars', name: 'Перевод Кассиана', language: 'Russian', category: 'Modern', script: 'Cyrillic', year: 1970 },
  { id: 'ibo', name: 'Перевод Кулакова', language: 'Russian', category: 'Modern', script: 'Cyrillic', year: 2015 },
  { id: 'slovo', name: 'Слово Жизни', language: 'Russian', category: 'Paraphrase', script: 'Cyrillic', year: 1998 },
  
  { id: 'shinkyoudou', name: '新共同訳', language: 'Japanese', category: 'Modern', script: 'Japanese', year: 1987 },
  { id: 'shinkaiyaku', name: '新改訳2017', language: 'Japanese', category: 'Modern', script: 'Japanese', year: 2017 },
  { id: 'kougo', name: '口語訳', language: 'Japanese', category: 'Traditional', script: 'Japanese', year: 1955 },
  { id: 'bungo', name: '文語訳', language: 'Japanese', category: 'Traditional', script: 'Japanese', year: 1887 },
  { id: 'living-jpn', name: 'リビングバイブル', language: 'Japanese', category: 'Paraphrase', script: 'Japanese', year: 1973 },
  { id: 'meiji', name: '明治元訳', language: 'Japanese', category: 'Historical', script: 'Japanese', year: 1887 },
  { id: 'franciscan', name: 'フランシスコ会訳', language: 'Japanese', category: 'Modern', script: 'Japanese', year: 2013 },
  { id: 'seisho', name: '聖書協会共同訳', language: 'Japanese', category: 'Modern', script: 'Japanese', year: 2018 },
  { id: 'shin-kaiyaku-3', name: '新改訳第3版', language: 'Japanese', category: 'Modern', script: 'Japanese', year: 2003 },
  { id: 'taize', name: 'テゼ訳', language: 'Japanese', category: 'Modern', script: 'Japanese', year: 1980 },
  
  { id: 'revised-kor', name: '개역개정', language: 'Korean', category: 'Modern', script: 'Korean', year: 1998 },
  { id: 'common-kor', name: '공동번역', language: 'Korean', category: 'Modern', script: 'Korean', year: 1977 },
  { id: 'nkrv', name: '새번역', language: 'Korean', category: 'Modern', script: 'Korean', year: 2004 },
  { id: 'living-kor', name: '현대인의 성경', language: 'Korean', category: 'Paraphrase', script: 'Korean', year: 2005 },
  { id: 'easy-kor', name: '쉬운성경', language: 'Korean', category: 'Thought', script: 'Korean', year: 2009 },
  { id: 'gaenyeok', name: '개역한글', language: 'Korean', category: 'Traditional', script: 'Korean', year: 1961 },
  { id: 'korean-living', name: '성경 현대어', language: 'Korean', category: 'Modern', script: 'Korean', year: 1985 },
  { id: 'rnksv', name: '표준새번역', language: 'Korean', category: 'Formal', script: 'Korean', year: 1993 },
  
  { id: 'union-chn', name: '和合本', language: 'Chinese', category: 'Traditional', script: 'Chinese', year: 1919 },
  { id: 'cunp', name: '新标点和合本', language: 'Chinese', category: 'Modern', script: 'Chinese', year: 2010 },
  { id: 'rcuv', name: '和合本修订版', language: 'Chinese', category: 'Modern', script: 'Chinese', year: 2010 },
  { id: 'ncv', name: '新译本', language: 'Chinese', category: 'Modern', script: 'Chinese', year: 1992 },
  { id: 'ccb', name: '当代译本', language: 'Chinese', category: 'Paraphrase', script: 'Chinese', year: 1979 },
  { id: 'msg-chn', name: '信息本', language: 'Chinese', category: 'Paraphrase', script: 'Chinese', year: 2005 },
  { id: 'nvi-chn', name: '新译本简体', language: 'Chinese', category: 'Modern', script: 'Chinese', year: 2001 },
  { id: 'traditional-chn', name: '繁体和合本', language: 'Chinese', category: 'Traditional', script: 'Chinese', year: 1919 },
  { id: 'lzz', name: '吕振中译本', language: 'Chinese', category: 'Formal', script: 'Chinese', year: 1970 },
  { id: 'recovery', name: '恢复本', language: 'Chinese', category: 'Modern', script: 'Chinese', year: 1987 },
  
  { id: 'asnd', name: 'Ang Salita ng Diyos', language: 'Tagalog', category: 'Modern', script: 'Latin', year: 1998 },
  { id: 'mbb', name: 'Magandang Balita Biblia', language: 'Tagalog', category: 'Thought', script: 'Latin', year: 1982 },
  { id: 'ang-biblia', name: 'Ang Biblia', language: 'Tagalog', category: 'Traditional', script: 'Latin', year: 1905 },
  { id: 'apsd', name: 'Ang Pulong Sa Dios', language: 'Tagalog', category: 'Modern', script: 'Latin', year: 2009 },
  
  { id: 'tb-ind', name: 'Terjemahan Baru', language: 'Indonesian', category: 'Modern', script: 'Latin', year: 1974 },
  { id: 'bis', name: 'Bahasa Indonesia Sehari-hari', language: 'Indonesian', category: 'Thought', script: 'Latin', year: 1985 },
  { id: 'shellabear', name: 'Shellabear', language: 'Indonesian', category: 'Traditional', script: 'Latin', year: 1912 },
  { id: 'fayh', name: 'Firman Allah Yang Hidup', language: 'Indonesian', category: 'Paraphrase', script: 'Latin', year: 1974 },
  { id: 'tsi', name: 'Terjemahan Sederhana Indonesia', language: 'Indonesian', category: 'Thought', script: 'Latin', year: 2013 },
  
  { id: 'svd', name: 'الكتاب المقدس', language: 'Arabic', category: 'Modern', script: 'Arabic', year: 1865 },
  { id: 'nav', name: 'الترجمة العربية', language: 'Arabic', category: 'Modern', script: 'Arabic', year: 1993 },
  { id: 'gna', name: 'الأخبار السارة', language: 'Arabic', category: 'Thought', script: 'Arabic', year: 1993 },
  { id: 'arabic-life', name: 'كتاب الحياة', language: 'Arabic', category: 'Paraphrase', script: 'Arabic', year: 1988 },
  
  { id: 'modernhebrew', name: 'עברית חדשה', language: 'Hebrew', category: 'Modern', script: 'Hebrew', year: 1991 },
  { id: 'wlc', name: 'Westminster Leningrad', language: 'Hebrew', category: 'Original', script: 'Hebrew', year: 2008 },
  { id: 'aleppo', name: 'Aleppo Codex', language: 'Hebrew', category: 'Original', script: 'Hebrew', year: 930 },
  { id: 'bhs', name: 'Biblia Hebraica Stuttgartensia', language: 'Hebrew', category: 'Original', script: 'Hebrew', year: 1977 },
  
  { id: 'tr', name: 'Textus Receptus', language: 'Greek', category: 'Original', script: 'Greek', year: 1550 },
  { id: 'na28', name: 'Nestle-Aland 28', language: 'Greek', category: 'Original', script: 'Greek', year: 2012 },
  { id: 'wh', name: 'Westcott-Hort', language: 'Greek', category: 'Original', script: 'Greek', year: 1881 },
  { id: 'tischendorf', name: 'Tischendorf', language: 'Greek', category: 'Original', script: 'Greek', year: 1869 },
  { id: 'sbl', name: 'SBL Greek NT', language: 'Greek', category: 'Original', script: 'Greek', year: 2010 },
  { id: 'byzantine', name: 'Byzantine Text', language: 'Greek', category: 'Original', script: 'Greek', year: 1991 },
  { id: 'lxx', name: 'Septuagint', language: 'Greek', category: 'Original', script: 'Greek', year: -250 },
  
  { id: 'vulgate', name: 'Biblia Sacra Vulgata', language: 'Latin', category: 'Original', script: 'Latin', year: 405 },
  { id: 'clementine', name: 'Clementine Vulgate', language: 'Latin', category: 'Original', script: 'Latin', year: 1592 },
  { id: 'nova', name: 'Nova Vulgata', language: 'Latin', category: 'Modern', script: 'Latin', year: 1979 },
  
  { id: 'sfb', name: 'Svenska Folkbibeln', language: 'Swedish', category: 'Modern', script: 'Latin', year: 2015 },
  { id: 'sv1917', name: 'Svenska 1917', language: 'Swedish', category: 'Traditional', script: 'Latin', year: 1917 },
  { id: 'sfu', name: 'Svenska Folkbibeln 2015', language: 'Swedish', category: 'Modern', script: 'Latin', year: 2015 },
  
  { id: 'nb88', name: 'Norsk Bibel 1988', language: 'Norwegian', category: 'Modern', script: 'Latin', year: 1988 },
  { id: 'nb2011', name: 'Norsk Bibel 2011', language: 'Norwegian', category: 'Modern', script: 'Latin', year: 2011 },
  { id: 'dn33', name: 'Det Norsk Bibelselskap 1930', language: 'Norwegian', category: 'Traditional', script: 'Latin', year: 1930 },
  
  { id: 'danish', name: 'Dansk', language: 'Danish', category: 'Modern', script: 'Latin', year: 1992 },
  { id: 'dn1933', name: 'Dansk 1933', language: 'Danish', category: 'Traditional', script: 'Latin', year: 1933 },
  
  { id: 'finnish1933', name: 'Raamattu 1933/38', language: 'Finnish', category: 'Traditional', script: 'Latin', year: 1938 },
  { id: 'finnish1992', name: 'Raamattu 1992', language: 'Finnish', category: 'Modern', script: 'Latin', year: 1992 },
  
  { id: 'icelandic', name: 'Íslenska Biblían', language: 'Icelandic', category: 'Modern', script: 'Latin', year: 2007 },
  
  { id: 'bt', name: 'Biblia Tysiąclecia', language: 'Polish', category: 'Modern', script: 'Latin', year: 1965 },
  { id: 'bw', name: 'Biblia Warszawska', language: 'Polish', category: 'Traditional', script: 'Latin', year: 1975 },
  { id: 'ubg', name: 'Uwspółcześniona Biblia Gdańska', language: 'Polish', category: 'Modern', script: 'Latin', year: 2017 },
  { id: 'bp', name: 'Biblia Paulistów', language: 'Polish', category: 'Modern', script: 'Latin', year: 2008 },
  
  { id: 'ukrainian', name: 'Українська Біблія', language: 'Ukrainian', category: 'Modern', script: 'Cyrillic', year: 2011 },
  { id: 'ohienko', name: 'Біблія Огієнка', language: 'Ukrainian', category: 'Traditional', script: 'Cyrillic', year: 1962 },
  
  { id: 'vie-rv', name: 'Bản Dịch 1925', language: 'Vietnamese', category: 'Traditional', script: 'Latin', year: 1925 },
  { id: 'vie-nvi', name: 'Bản Dịch Mới', language: 'Vietnamese', category: 'Modern', script: 'Latin', year: 2010 },
  { id: 'vie-bd', name: 'Bản Dịch Hiện Đại', language: 'Vietnamese', category: 'Modern', script: 'Latin', year: 2005 },
  
  { id: 'thsv', name: 'ฉบับมาตรฐาน', language: 'Thai', category: 'Modern', script: 'Thai', year: 2011 },
  { id: 'tncv', name: 'ฉบับสมัยใหม่', language: 'Thai', category: 'Modern', script: 'Thai', year: 1999 },
  
  { id: 'karoli', name: 'Károli-Biblia', language: 'Hungarian', category: 'Traditional', script: 'Latin', year: 1590 },
  { id: 'uj', name: 'Új fordítás', language: 'Hungarian', category: 'Modern', script: 'Latin', year: 2014 },
  { id: 'revkaroli', name: 'Revideált Károli', language: 'Hungarian', category: 'Modern', script: 'Latin', year: 2020 },
  
  { id: 'cornilescu', name: 'Cornilescu', language: 'Romanian', category: 'Traditional', script: 'Latin', year: 1921 },
  { id: 'ntlr', name: 'Noua Traducere', language: 'Romanian', category: 'Modern', script: 'Latin', year: 2002 },
  
  { id: 'cep', name: 'Český ekumenický překlad', language: 'Czech', category: 'Modern', script: 'Latin', year: 1985 },
  { id: 'b21', name: 'Bible 21. století', language: 'Czech', category: 'Modern', script: 'Latin', year: 2009 },
  { id: 'kralicka', name: 'Kralická Bible', language: 'Czech', category: 'Traditional', script: 'Latin', year: 1613 },
  
  { id: 'ecav', name: 'Evanjelický preklad', language: 'Slovak', category: 'Modern', script: 'Latin', year: 2007 },
  
  { id: 'bulg', name: 'Българска Библия', language: 'Bulgarian', category: 'Modern', script: 'Cyrillic', year: 1940 },
  
  { id: 'chr', name: 'Hrvatski Biblijski prijevod', language: 'Croatian', category: 'Modern', script: 'Latin', year: 2014 },
  
  { id: 'serbian', name: 'Српска Библија', language: 'Serbian', category: 'Modern', script: 'Cyrillic', year: 1984 },
  
  { id: 'eastern-arm', name: 'Հայերեն Աստվածաշունչ', language: 'Armenian', category: 'Modern', script: 'Armenian', year: 1994 },
  
  { id: 'georgian', name: 'ქართული ბიბლია', language: 'Georgian', category: 'Modern', script: 'Georgian', year: 1989 },
  
  { id: 'hindi', name: 'हिन्दी बाइबिल', language: 'Hindi', category: 'Modern', script: 'Devanagari', year: 2010 },
  { id: 'ov', name: 'ओ वी हिन्दी', language: 'Hindi', category: 'Modern', script: 'Devanagari', year: 2017 },
  
  { id: 'bengali', name: 'বাংলা বাইবেল', language: 'Bengali', category: 'Modern', script: 'Bengali', year: 2006 },
  
  { id: 'tamil', name: 'தமிழ் பைபிள்', language: 'Tamil', category: 'Modern', script: 'Tamil', year: 1995 },
  { id: 'rov', name: 'திருவிவிலியம்', language: 'Tamil', category: 'Modern', script: 'Tamil', year: 2012 },
  
  { id: 'telugu', name: 'తెలుగు బైబిల్', language: 'Telugu', category: 'Modern', script: 'Telugu', year: 2005 },
  
  { id: 'malayalam', name: 'മലയാളം ബൈബിൾ', language: 'Malayalam', category: 'Modern', script: 'Malayalam', year: 2007 },
  
  { id: 'kannada', name: 'ಕನ್ನಡ ಬೈಬಲ್', language: 'Kannada', category: 'Modern', script: 'Kannada', year: 2009 },
  
  { id: 'marathi', name: 'मराठी बायबल', language: 'Marathi', category: 'Modern', script: 'Devanagari', year: 2006 },
  
  { id: 'gujarati', name: 'ગુજરાતી બાઇબલ', language: 'Gujarati', category: 'Modern', script: 'Gujarati', year: 2010 },
  
  { id: 'punjabi', name: 'ਪੰਜਾਬੀ ਬਾਈਬਲ', language: 'Punjabi', category: 'Modern', script: 'Gurmukhi', year: 2011 },
  
  { id: 'urdu', name: 'اردو بائبل', language: 'Urdu', category: 'Modern', script: 'Arabic', year: 1895 },
  
  { id: 'nepali', name: 'नेपाली बाइबल', language: 'Nepali', category: 'Modern', script: 'Devanagari', year: 2008 },
  
  { id: 'sinhala', name: 'සිංහල බයිබලය', language: 'Sinhala', category: 'Modern', script: 'Sinhala', year: 2012 },
  
  { id: 'myanmar', name: 'မြန်မာ သမ္မာကျမ်းစာ', language: 'Burmese', category: 'Modern', script: 'Myanmar', year: 1835 },
  
  { id: 'khmer', name: 'ខ្មែរ ព្រះគម្ពីរ', language: 'Khmer', category: 'Modern', script: 'Khmer', year: 1954 },
  
  { id: 'lao', name: 'ພຣະຄຳພີ ພາສາລາວ', language: 'Lao', category: 'Modern', script: 'Lao', year: 1932 },
  
  { id: 'malay', name: 'Alkitab Bahasa Melayu', language: 'Malay', category: 'Modern', script: 'Latin', year: 1996 },
  
  { id: 'swahili', name: 'Biblia Kiswahili', language: 'Swahili', category: 'Modern', script: 'Latin', year: 1952 },
  
  { id: 'amharic', name: 'አማርኛ መጽሐፍ ቅዱስ', language: 'Amharic', category: 'Modern', script: 'Ethiopic', year: 1962 },
  
  { id: 'somali', name: 'Soomaaliga Bible', language: 'Somali', category: 'Modern', script: 'Latin', year: 1979 },
  
  { id: 'hausa', name: 'Littafi Mai Tsarki Hausa', language: 'Hausa', category: 'Modern', script: 'Latin', year: 1980 },
  
  { id: 'yoruba', name: 'Bíbélì Mímọ́ Yoruba', language: 'Yoruba', category: 'Modern', script: 'Latin', year: 1900 },
  
  { id: 'igbo', name: 'Akwụkwọ Nsọ Igbo', language: 'Igbo', category: 'Modern', script: 'Latin', year: 1913 },
  
  { id: 'zulu', name: 'IBhayibheli Zulu', language: 'Zulu', category: 'Modern', script: 'Latin', year: 1959 },
  
  { id: 'afrikaans', name: 'Afrikaanse Bybel', language: 'Afrikaans', category: 'Modern', script: 'Latin', year: 2014 },
  { id: 'afr1953', name: 'Afrikaans 1953', language: 'Afrikaans', category: 'Traditional', script: 'Latin', year: 1953 },
  { id: 'afr1933', name: 'Afrikaans 1933', language: 'Afrikaans', category: 'Traditional', script: 'Latin', year: 1933 },
  
  { id: 'welsh', name: 'Beibl Cymraeg', language: 'Welsh', category: 'Modern', script: 'Latin', year: 2004 },
  { id: 'william-morgan', name: 'William Morgan 1588', language: 'Welsh', category: 'Historical', script: 'Latin', year: 1588 },
  
  { id: 'irish', name: 'Bíobla Naofa', language: 'Irish', category: 'Modern', script: 'Latin', year: 2013 },
  
  { id: 'scottish', name: 'Bioball Gàidhlig', language: 'Scottish Gaelic', category: 'Modern', script: 'Latin', year: 1996 },
  
  { id: 'basque', name: 'Euskal Biblia', language: 'Basque', category: 'Modern', script: 'Latin', year: 1994 },
  
  { id: 'catalan', name: 'Bíblia Catalana', language: 'Catalan', category: 'Modern', script: 'Latin', year: 1993 },
  
  { id: 'galician', name: 'Biblia Galega', language: 'Galician', category: 'Modern', script: 'Latin', year: 1989 },
  
  { id: 'maltese', name: 'Bibbja Maltija', language: 'Maltese', category: 'Modern', script: 'Latin', year: 1983 },
  
  { id: 'albanian', name: 'Bibla Shqip', language: 'Albanian', category: 'Modern', script: 'Latin', year: 1994 },
  
  { id: 'estonian', name: 'Piibel Eesti', language: 'Estonian', category: 'Modern', script: 'Latin', year: 1997 },
  
  { id: 'latvian', name: 'Bībele Latviešu', language: 'Latvian', category: 'Modern', script: 'Latin', year: 2012 },
  
  { id: 'lithuanian', name: 'Biblija Lietuvių', language: 'Lithuanian', category: 'Modern', script: 'Latin', year: 1998 },
  
  { id: 'slovenian', name: 'Sveto pismo Slovenski', language: 'Slovenian', category: 'Modern', script: 'Latin', year: 1996 },
  
  { id: 'macedonian', name: 'Македонска Библија', language: 'Macedonian', category: 'Modern', script: 'Cyrillic', year: 1990 },
  
  { id: 'mongolian', name: 'Монгол Библи', language: 'Mongolian', category: 'Modern', script: 'Cyrillic', year: 1990 },
  
  { id: 'tibetan', name: 'བོད་ཡིག་བཀའ་འགྱུར', language: 'Tibetan', category: 'Modern', script: 'Tibetan', year: 1948 },
  
  { id: 'farsi', name: 'کتاب مقدس فارسی', language: 'Persian', category: 'Modern', script: 'Arabic', year: 1895 },
  
  { id: 'pashto', name: 'مقدس کتاب پښتو', language: 'Pashto', category: 'Modern', script: 'Arabic', year: 1895 },
  
  { id: 'kurdish', name: 'Încîla Pîroz Kurdî', language: 'Kurdish', category: 'Modern', script: 'Latin', year: 2001 },
  
  { id: 'azerbaijani', name: 'Azərbaycan Müqəddəs', language: 'Azerbaijani', category: 'Modern', script: 'Latin', year: 2001 },
  
  { id: 'turkish', name: 'Kutsal Kitap Türkçe', language: 'Turkish', category: 'Modern', script: 'Latin', year: 2001 },
  { id: 'tck', name: 'Türkçe Kutsal Kitap', language: 'Turkish', category: 'Modern', script: 'Latin', year: 1987 },
  
  { id: 'uzbek', name: "Muqaddas Kitob O'zbek", language: 'Uzbek', category: 'Modern', script: 'Latin', year: 1992 },
  
  { id: 'kazakh', name: 'Қасиетті Кітап Қазақ', language: 'Kazakh', category: 'Modern', script: 'Cyrillic', year: 2010 },
  
  { id: 'tajik', name: 'Китоби Муқаддас Тоҷикӣ', language: 'Tajik', category: 'Modern', script: 'Cyrillic', year: 1992 },
  
  { id: 'turkmen', name: 'Mukaddes Kitap Türkmen', language: 'Turkmen', category: 'Modern', script: 'Latin', year: 2012 },
  
  { id: 'kyrgyz', name: 'Ыйык Китеп Кыргыз', language: 'Kyrgyz', category: 'Modern', script: 'Cyrillic', year: 2011 },
  
  { id: 'cebuano', name: 'Bibliya Cebuano', language: 'Cebuano', category: 'Modern', script: 'Latin', year: 1917 },
  
  { id: 'ilocano', name: 'Biblia Ilocano', language: 'Ilocano', category: 'Modern', script: 'Latin', year: 1909 },
  
  { id: 'hiligaynon', name: 'Bibliya Hiligaynon', language: 'Hiligaynon', category: 'Modern', script: 'Latin', year: 1912 },
  
  { id: 'waray', name: 'Biblia Waray', language: 'Waray', category: 'Modern', script: 'Latin', year: 1917 },
  
  { id: 'javanese', name: 'Alkitab Jawa', language: 'Javanese', category: 'Modern', script: 'Latin', year: 1893 },
  
  { id: 'sundanese', name: 'Alkitab Sunda', language: 'Sundanese', category: 'Modern', script: 'Latin', year: 1877 },
  
  { id: 'filipino', name: 'Bibliya Filipino', language: 'Filipino', category: 'Modern', script: 'Latin', year: 2011 },
  
  { id: 'fijian', name: 'Ai Vola Tabu Fijian', language: 'Fijian', category: 'Modern', script: 'Latin', year: 1864 },
  
  { id: 'tongan', name: 'Tohi Tapu Tongan', language: 'Tongan', category: 'Modern', script: 'Latin', year: 1862 },
  
  { id: 'samoan', name: 'O le Tusi Paia Samoan', language: 'Samoan', category: 'Modern', script: 'Latin', year: 1855 },
  
  { id: 'maori', name: 'Te Paipera Tapu Māori', language: 'Māori', category: 'Modern', script: 'Latin', year: 1868 },
  
  { id: 'hawaiian', name: 'Ka Baibala Hemolele Hawaiian', language: 'Hawaiian', category: 'Modern', script: 'Latin', year: 1839 },
  
  { id: 'kinyarwanda', name: 'Bibiliya Kinyarwanda', language: 'Kinyarwanda', category: 'Modern', script: 'Latin', year: 1988 },
  
  { id: 'kirundi', name: 'Bibiliya Kirundi', language: 'Kirundi', category: 'Modern', script: 'Latin', year: 2003 },
  
  { id: 'malagasy', name: 'Baiboly Malagasy', language: 'Malagasy', category: 'Modern', script: 'Latin', year: 1835 },
  
  { id: 'shona', name: 'Bhaibheri Shona', language: 'Shona', category: 'Modern', script: 'Latin', year: 1949 },
  
  { id: 'sesotho', name: 'Bebele Sesotho', language: 'Sesotho', category: 'Modern', script: 'Latin', year: 1881 },
  
  { id: 'setswana', name: 'Beibele Setswana', language: 'Setswana', category: 'Modern', script: 'Latin', year: 1857 },
  
  { id: 'xhosa', name: 'IBhayibhile Xhosa', language: 'Xhosa', category: 'Modern', script: 'Latin', year: 1859 },
  
  { id: 'sepedi', name: 'Bebele Sepedi', language: 'Sepedi', category: 'Modern', script: 'Latin', year: 1986 },
  
  { id: 'venda', name: 'Bivhili Venda', language: 'Venda', category: 'Modern', script: 'Latin', year: 1998 },
  
  { id: 'ndebele', name: 'IBhayibheli Ndebele', language: 'Ndebele', category: 'Modern', script: 'Latin', year: 2012 },
  
  { id: 'quechua', name: 'Biblia Quechua', language: 'Quechua', category: 'Modern', script: 'Latin', year: 1986 },
  
  { id: 'guarani', name: 'Biblia Guaraní', language: 'Guarani', category: 'Modern', script: 'Latin', year: 1996 },
  
  { id: 'aymara', name: 'Biblia Aymara', language: 'Aymara', category: 'Modern', script: 'Latin', year: 1987 },
  
  { id: 'nahuatl', name: 'Biblia Náhuatl', language: 'Nahuatl', category: 'Modern', script: 'Latin', year: 1833 },
  
  { id: 'mixtec', name: 'Biblia Mixteco', language: 'Mixtec', category: 'Modern', script: 'Latin', year: 1998 },
  
  { id: 'zapotec', name: 'Biblia Zapoteco', language: 'Zapotec', category: 'Modern', script: 'Latin', year: 2002 },
];

export const languageCategories = [
  'All',
  'English',
  'Spanish',
  'Portuguese',
  'French',
  'German',
  'Italian',
  'Dutch',
  'Scandinavian',
  'Slavic',
  'Asian',
  'Middle Eastern',
  'African',
  'Pacific',
  'Indigenous',
  'Original Languages',
  'Historical'
];

export function getBibleVersionsByLanguage(language: string): BibleVersion[] {
  if (language === 'All') return allBibleVersions;
  return allBibleVersions.filter(v => v.language === language);
}

export function getBibleVersionsByCategory(category: string): BibleVersion[] {
  if (category === 'All') return allBibleVersions;
  return allBibleVersions.filter(v => v.category === category);
}
