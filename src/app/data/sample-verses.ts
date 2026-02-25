export interface Verse {
  reference: string;
  bookShort: string;
  bookFull: string;
  chapter: number;
  verse: number;
  text: string;
  version: string;
  theme: string[];
}

export const sampleVerses: Verse[] = [
  {
    reference: 'John 3:16',
    bookShort: 'Jn',
    bookFull: 'John',
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    version: 'niv',
    theme: ['Love', 'Salvation', 'Faith']
  },
  {
    reference: 'Philippians 4:13',
    bookShort: 'Phil',
    bookFull: 'Philippians',
    chapter: 4,
    verse: 13,
    text: 'I can do all this through him who gives me strength.',
    version: 'niv',
    theme: ['Strength', 'Courage', 'Faith']
  },
  {
    reference: 'Jeremiah 29:11',
    bookShort: 'Jer',
    bookFull: 'Jeremiah',
    chapter: 29,
    verse: 11,
    text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
    version: 'niv',
    theme: ['Hope', 'Guidance', 'Trust']
  },
  {
    reference: 'Psalm 23:1',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 23,
    verse: 1,
    text: 'The Lord is my shepherd, I lack nothing.',
    version: 'niv',
    theme: ['Peace', 'Trust', 'Provision']
  },
  {
    reference: 'Proverbs 3:5-6',
    bookShort: 'Prov',
    bookFull: 'Proverbs',
    chapter: 3,
    verse: 5,
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    version: 'niv',
    theme: ['Trust', 'Guidance', 'Wisdom']
  },
  {
    reference: 'Isaiah 41:10',
    bookShort: 'Is',
    bookFull: 'Isaiah',
    chapter: 41,
    verse: 10,
    text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    version: 'niv',
    theme: ['Comfort', 'Strength', 'Protection']
  },
  {
    reference: 'Matthew 6:33',
    bookShort: 'Mt',
    bookFull: 'Matthew',
    chapter: 6,
    verse: 33,
    text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
    version: 'niv',
    theme: ['Priority', 'Trust', 'Provision']
  },
  {
    reference: 'Romans 8:28',
    bookShort: 'Rom',
    bookFull: 'Romans',
    chapter: 8,
    verse: 28,
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    version: 'niv',
    theme: ['Hope', 'Trust', 'Purpose']
  },
  {
    reference: 'Psalm 46:10',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 46,
    verse: 10,
    text: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
    version: 'niv',
    theme: ['Peace', 'Trust', 'Reverence']
  },
  {
    reference: '1 Corinthians 13:4-5',
    bookShort: '1 Cor',
    bookFull: '1 Corinthians',
    chapter: 13,
    verse: 4,
    text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.',
    version: 'niv',
    theme: ['Love', 'Kindness', 'Patience']
  },
  {
    reference: 'Joshua 1:9',
    bookShort: 'Josh',
    bookFull: 'Joshua',
    chapter: 1,
    verse: 9,
    text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    version: 'niv',
    theme: ['Courage', 'Strength', 'Protection']
  },
  {
    reference: 'Psalm 119:105',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 119,
    verse: 105,
    text: 'Your word is a lamp for my feet, a light on my path.',
    version: 'niv',
    theme: ['Guidance', 'Wisdom', 'Light']
  },
  {
    reference: 'Ephesians 2:8-9',
    bookShort: 'Eph',
    bookFull: 'Ephesians',
    chapter: 2,
    verse: 8,
    text: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God— not by works, so that no one can boast.',
    version: 'niv',
    theme: ['Grace', 'Salvation', 'Faith']
  },
  {
    reference: 'Matthew 11:28',
    bookShort: 'Mt',
    bookFull: 'Matthew',
    chapter: 11,
    verse: 28,
    text: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    version: 'niv',
    theme: ['Comfort', 'Peace', 'Rest']
  },
  {
    reference: 'Hebrews 11:1',
    bookShort: 'Heb',
    bookFull: 'Hebrews',
    chapter: 11,
    verse: 1,
    text: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    version: 'niv',
    theme: ['Faith', 'Hope', 'Trust']
  },
  {
    reference: 'Galatians 5:22-23',
    bookShort: 'Gal',
    bookFull: 'Galatians',
    chapter: 5,
    verse: 22,
    text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
    version: 'niv',
    theme: ['Love', 'Joy', 'Peace']
  },
  {
    reference: 'Psalm 27:1',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 27,
    verse: 1,
    text: 'The Lord is my light and my salvation— whom shall I fear? The Lord is the stronghold of my life— of whom shall I be afraid?',
    version: 'niv',
    theme: ['Courage', 'Protection', 'Light']
  },
  {
    reference: 'Colossians 3:23',
    bookShort: 'Col',
    bookFull: 'Colossians',
    chapter: 3,
    verse: 23,
    text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
    version: 'niv',
    theme: ['Service', 'Dedication', 'Purpose']
  },
  {
    reference: 'Romans 12:2',
    bookShort: 'Rom',
    bookFull: 'Romans',
    chapter: 12,
    verse: 2,
    text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God\'s will is—his good, pleasing and perfect will.',
    version: 'niv',
    theme: ['Transformation', 'Wisdom', 'Guidance']
  },
  {
    reference: '2 Timothy 1:7',
    bookShort: '2 Tim',
    bookFull: '2 Timothy',
    chapter: 1,
    verse: 7,
    text: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
    version: 'niv',
    theme: ['Courage', 'Power', 'Love']
  },
  {
    reference: 'Psalm 100:4',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 100,
    verse: 4,
    text: 'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.',
    version: 'niv',
    theme: ['Gratitude', 'Praise', 'Worship']
  },
  {
    reference: 'James 1:2-3',
    bookShort: 'Jas',
    bookFull: 'James',
    chapter: 1,
    verse: 2,
    text: 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.',
    version: 'niv',
    theme: ['Joy', 'Perseverance', 'Faith']
  },
  {
    reference: 'Psalm 37:4',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 37,
    verse: 4,
    text: 'Take delight in the Lord, and he will give you the desires of your heart.',
    version: 'niv',
    theme: ['Joy', 'Trust', 'Blessing']
  },
  {
    reference: '1 John 4:8',
    bookShort: '1 Jn',
    bookFull: '1 John',
    chapter: 4,
    verse: 8,
    text: 'Whoever does not love does not know God, because God is love.',
    version: 'niv',
    theme: ['Love', 'Faith', 'Truth']
  },
  {
    reference: 'Lamentations 3:22-23',
    bookShort: 'Lam',
    bookFull: 'Lamentations',
    chapter: 3,
    verse: 22,
    text: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.',
    version: 'niv',
    theme: ['Love', 'Faithfulness', 'Compassion']
  },
  {
    reference: 'Micah 6:8',
    bookShort: 'Mic',
    bookFull: 'Micah',
    chapter: 6,
    verse: 8,
    text: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
    version: 'niv',
    theme: ['Justice', 'Mercy', 'Humility']
  },
  {
    reference: 'Psalm 139:14',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 139,
    verse: 14,
    text: 'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.',
    version: 'niv',
    theme: ['Praise', 'Worth', 'Creation']
  },
  {
    reference: '1 Thessalonians 5:16-18',
    bookShort: '1 Thess',
    bookFull: '1 Thessalonians',
    chapter: 5,
    verse: 16,
    text: 'Rejoice always, pray continually, give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.',
    version: 'niv',
    theme: ['Joy', 'Prayer', 'Gratitude']
  },
  {
    reference: 'Isaiah 40:31',
    bookShort: 'Is',
    bookFull: 'Isaiah',
    chapter: 40,
    verse: 31,
    text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    version: 'niv',
    theme: ['Hope', 'Strength', 'Renewal']
  },
  {
    reference: 'Psalm 34:8',
    bookShort: 'Ps',
    bookFull: 'Psalms',
    chapter: 34,
    verse: 8,
    text: 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.',
    version: 'niv',
    theme: ['Blessing', 'Refuge', 'Goodness']
  },
];
