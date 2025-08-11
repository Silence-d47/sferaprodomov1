// Simple import script using Sanity CLI dataset import
const fs = require('fs')
const path = require('path')

// Sample data to import
const sampleData = [
  // Categories
  {
    _id: 'klimatizace',
    _type: 'category',
    title: 'Klimatizace',
    slug: { current: 'klimatizace', _type: 'slug' },
    description: 'Klimatizační systémy a jednotky',
    color: 'blue'
  },
  {
    _id: 'tepelna-cerpadla',
    _type: 'category',
    title: 'Tepelná čerpadla',
    slug: { current: 'tepelna-cerpadla', _type: 'slug' },
    description: 'Tepelná čerpadla pro vytápění a chlazení',
    color: 'green'
  },
  {
    _id: 'rekuperace',
    _type: 'category',
    title: 'Rekuperace',
    slug: { current: 'rekuperace', _type: 'slug' },
    description: 'Rekuperační jednotky a systémy',
    color: 'purple'
  },
  
  // Authors
  {
    _id: 'jan-novak',
    _type: 'author',
    name: 'Ing. Jan Novák',
    slug: { current: 'jan-novak', _type: 'slug' },
    title: 'Specialista na klimatizace',
    email: 'jan.novak@sferaprodomov.cz',
    bio: [
      {
        _type: 'block',
        _key: 'bio1',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Odborník na klimatizační systémy s více než 10 lety zkušeností.'
          }
        ]
      }
    ]
  },
  
  // Products
  {
    _id: 'daikin-emura-ftxj-ms',
    _type: 'product',
    title: 'Daikin Emura FTXJ-MS',
    slug: { current: 'daikin-emura-ftxj-ms', _type: 'slug' },
    description: 'Prémiová nástěnná klimatizace s elegantním designem a nejvyšší energetickou účinností.',
    features: [
      'Energetická třída A+++',
      'Inverterová technologie',
      'Wi-Fi ovládání',
      'Tichý provoz 19 dB(A)',
      '3D proudění vzduchu'
    ],
    isRecommended: true,
    isBestSelling: true,
    catalogUrl: '/katalogy/daikin-emura.pdf',
    energyClass: 'A+++',
    brand: 'daikin',
    warranty: 5,
    category: { _type: 'reference', _ref: 'klimatizace' }
  },
  
  // Blog Posts
  {
    _id: 'jak-vybrat-klimatizaci',
    _type: 'post',
    title: 'Jak vybrat správnou klimatizaci pro váš domov',
    slug: { current: 'jak-vybrat-klimatizaci', _type: 'slug' },
    excerpt: 'Kompletní průvodce výběrem klimatizace podle velikosti místnosti a energetické náročnosti.',
    author: { _type: 'reference', _ref: 'jan-novak' },
    categories: [{ _type: 'reference', _ref: 'klimatizace' }],
    publishedAt: '2024-01-15T10:00:00Z',
    readingTime: 5,
    featured: true,
    body: [
      {
        _type: 'block',
        _key: 'body1',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Výběr správné klimatizace je klíčový pro pohodlí vašeho domova. V tomto článku vám ukážeme, na co se zaměřit při výběru klimatizace podle velikosti místnosti, energetické náročnosti a dalších důležitých faktorů.'
          }
        ]
      }
    ]
  },
  
  // Project References
  {
    _id: 'rodinny-dum-praha',
    _type: 'projectReference',
    title: 'Rodinný dům Praha',
    slug: { current: 'rodinny-dum-praha', _type: 'slug' },
    description: 'Kompletní klimatizace s tepelným čerpadlem a rekuperací pro maximální komfort.',
    category: 'klimatizace',
    location: 'Praha',
    year: '2024',
    rating: 5,
    highlights: ['Multi-split systém', 'Tepelné čerpadlo', 'Rekuperace', 'Chytrá domácnost'],
    savings: '65% úspora nákladů',
    isFeatured: true,
    isTopReference: true
  },
  
  // FAQ
  {
    _id: 'klimatizace-faq-1',
    _type: 'faq',
    question: 'Jak dlouho trvá instalace klimatizace?',
    answer: [
      {
        _type: 'block',
        _key: 'answer1',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Standardní instalace klimatizace trvá 4-8 hodin v závislosti na složitosti instalace a typu jednotky.'
          }
        ]
      }
    ],
    category: 'klimatizace',
    order: 1,
    isActive: true
  },
  
  // Site Settings
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'SFÉRA PRO DOMOV.CZ',
    description: 'Profesionální klimatizace, tepelná čerpadla a elektroinstalace',
    contact: {
      phone: '+420 735 014 112',
      email: 'info@sferaprodomov.cz',
      address: 'Moravskoslezský kraj',
      openingHours: 'Pondělí - Pátek: 8:00 - 20:00\nSobota: 9:00 - 16:00\nNeděle: Na zavolání'
    },
    ratings: {
      googleRating: 4.9,
      googleReviews: 127,
      seznamRating: 4.8,
      seznamReviews: 89
    },
    companyInfo: {
      companyName: 'SFÉRA PRO DOMOV s.r.o.',
      ico: '12345678',
      foundedYear: 2015
    }
  }
]

// Write data to NDJSON file for Sanity import
const outputPath = path.join(__dirname, 'sample-data.ndjson')
const ndjsonData = sampleData.map(item => JSON.stringify(item)).join('\n')

fs.writeFileSync(outputPath, ndjsonData, 'utf8')

console.log('✅ Sample data exported to:', outputPath)
console.log('📝 To import this data to Sanity, run:')
console.log(`npx sanity dataset import ${outputPath} production --replace`)
