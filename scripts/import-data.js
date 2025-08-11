// Import using existing Sanity setup
const { createClient } = require('next-sanity')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to create this token
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
})

// Import data from your existing website
async function importData() {
  console.log('🚀 Starting data import...')

  try {
    // 1. Import Categories
    await importCategories()
    
    // 2. Import Authors
    await importAuthors()
    
    // 3. Import Products
    await importProducts()
    
    // 4. Import Blog Posts
    await importBlogPosts()
    
    // 5. Import Project References
    await importProjectReferences()
    
    // 6. Import FAQ
    await importFAQ()
    
    // 7. Import Site Settings
    await importSiteSettings()
    
    console.log('✅ Data import completed successfully!')
    
  } catch (error) {
    console.error('❌ Import failed:', error)
  }
}

// Categories
async function importCategories() {
  console.log('📂 Importing categories...')
  
  const categories = [
    {
      _type: 'category',
      _id: 'klimatizace',
      title: 'Klimatizace',
      slug: { current: 'klimatizace' },
      description: 'Klimatizační systémy a jednotky',
      color: 'blue'
    },
    {
      _type: 'category',
      _id: 'tepelna-cerpadla',
      title: 'Tepelná čerpadla',
      slug: { current: 'tepelna-cerpadla' },
      description: 'Tepelná čerpadla pro vytápění a chlazení',
      color: 'green'
    },
    {
      _type: 'category',
      _id: 'rekuperace',
      title: 'Rekuperace',
      slug: { current: 'rekuperace' },
      description: 'Rekuperační jednotky a systémy',
      color: 'purple'
    },
    {
      _type: 'category',
      _id: 'elektroinstalace',
      title: 'Elektroinstalace',
      slug: { current: 'elektroinstalace' },
      description: 'Elektroinstalační práce a služby',
      color: 'orange'
    }
  ]

  for (const category of categories) {
    await client.createOrReplace(category)
    console.log(`✓ Created category: ${category.title}`)
  }
}

// Authors
async function importAuthors() {
  console.log('👤 Importing authors...')
  
  const authors = [
    {
      _type: 'author',
      _id: 'jan-novak',
      name: 'Ing. Jan Novák',
      slug: { current: 'jan-novak' },
      title: 'Specialista na klimatizace',
      email: 'jan.novak@sferaprodomov.cz',
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Odborník na klimatizační systémy s více než 10 lety zkušeností.'
            }
          ]
        }
      ]
    },
    {
      _type: 'author',
      _id: 'marie-svobodova',
      name: 'Marie Svobodová',
      slug: { current: 'marie-svobodova' },
      title: 'Specialistka na tepelná čerpadla',
      email: 'marie.svobodova@sferaprodomov.cz',
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Expertka na tepelná čerpadla a úsporné vytápění.'
            }
          ]
        }
      ]
    },
    {
      _type: 'author',
      _id: 'pavel-cerny',
      name: 'Ing. Pavel Černý',
      slug: { current: 'pavel-cerny' },
      title: 'Specialista na elektroinstalace',
      email: 'pavel.cerny@sferaprodomov.cz',
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Odborník na elektroinstalace a chytré domácnosti.'
            }
          ]
        }
      ]
    }
  ]

  for (const author of authors) {
    await client.createOrReplace(author)
    console.log(`✓ Created author: ${author.name}`)
  }
}

// Products
async function importProducts() {
  console.log('🛍️ Importing products...')
  
  const products = [
    {
      _type: 'product',
      _id: 'daikin-emura-ftxj-ms',
      title: 'Daikin Emura FTXJ-MS',
      slug: { current: 'daikin-emura-ftxj-ms' },
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
    {
      _type: 'product',
      _id: 'mitsubishi-ln25vg',
      title: 'Mitsubishi MSZ-LN25VG',
      slug: { current: 'mitsubishi-ln25vg' },
      description: 'Kompaktní a výkonná klimatizace s pokročilými funkcemi pro maximální komfort.',
      features: [
        'Energetická třída A++',
        '3D i-see senzor',
        'Plasma Quad filtr',
        'Rychlé chlazení',
        'Automatické čištění'
      ],
      isBestSelling: true,
      catalogUrl: '/katalogy/mitsubishi-ln.pdf',
      energyClass: 'A++',
      brand: 'mitsubishi',
      warranty: 3,
      category: { _type: 'reference', _ref: 'klimatizace' }
    },
    {
      _type: 'product',
      _id: 'lg-artcool-gallery',
      title: 'LG Artcool Gallery',
      slug: { current: 'lg-artcool-gallery' },
      description: 'Designová klimatizace, která se stane ozdobou vašeho interiéru.',
      features: [
        'Vyměnitelné designové panely',
        'Energetická třída A+++',
        'Dual Inverter technologie',
        'ThinQ aplikace',
        'UV nano technologie'
      ],
      isBestSelling: true,
      catalogUrl: '/katalogy/lg-gallery.pdf',
      energyClass: 'A+++',
      brand: 'lg',
      warranty: 3,
      category: { _type: 'reference', _ref: 'klimatizace' }
    }
  ]

  for (const product of products) {
    await client.createOrReplace(product)
    console.log(`✓ Created product: ${product.title}`)
  }
}

// Blog Posts
async function importBlogPosts() {
  console.log('📝 Importing blog posts...')
  
  const posts = [
    {
      _type: 'post',
      _id: 'jak-vybrat-klimatizaci',
      title: 'Jak vybrat správnou klimatizaci pro váš domov',
      slug: { current: 'jak-vybrat-klimatizaci' },
      excerpt: 'Kompletní průvodce výběrem klimatizace podle velikosti místnosti a energetické náročnosti.',
      author: { _type: 'reference', _ref: 'jan-novak' },
      categories: [{ _type: 'reference', _ref: 'klimatizace' }],
      publishedAt: '2024-01-15T10:00:00Z',
      readingTime: 5,
      featured: true,
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Výběr správné klimatizace je klíčový pro pohodlí vašeho domova. V tomto článku vám ukážeme, na co se zaměřit.'
            }
          ]
        }
      ]
    },
    {
      _type: 'post',
      _id: 'tepelna-cerpadla-dotace',
      title: 'Tepelná čerpadla a dotace 2024',
      slug: { current: 'tepelna-cerpadla-dotace' },
      excerpt: 'Aktuální přehled všech dostupných dotací na tepelná čerpadla.',
      author: { _type: 'reference', _ref: 'marie-svobodova' },
      categories: [{ _type: 'reference', _ref: 'tepelna-cerpadla' }],
      publishedAt: '2024-01-10T10:00:00Z',
      readingTime: 7,
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Přehled aktuálních dotačních programů pro tepelná čerpadla v roce 2024.'
            }
          ]
        }
      ]
    },
    {
      _type: 'post',
      _id: 'elektroinstalace-chytra-domacnost',
      title: 'Elektroinstalace pro chytrou domácnost',
      slug: { current: 'elektroinstalace-chytra-domacnost' },
      excerpt: 'Moderní elektroinstalace jako základ chytré domácnosti.',
      author: { _type: 'reference', _ref: 'pavel-cerny' },
      categories: [{ _type: 'reference', _ref: 'elektroinstalace' }],
      publishedAt: '2024-01-05T10:00:00Z',
      readingTime: 6,
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Jak připravit elektroinstalaci pro chytrou domácnost a na co nezapomenout.'
            }
          ]
        }
      ]
    }
  ]

  for (const post of posts) {
    await client.createOrReplace(post)
    console.log(`✓ Created post: ${post.title}`)
  }
}

// Project References
async function importProjectReferences() {
  console.log('🏆 Importing project references...')
  
  const references = [
    {
      _type: 'projectReference',
      _id: 'rodinny-dum-praha',
      title: 'Rodinný dům Praha',
      slug: { current: 'rodinny-dum-praha' },
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
    {
      _type: 'projectReference',
      _id: 'kancelarsky-komplex-brno',
      title: 'Kancelářský komplex Brno',
      slug: { current: 'kancelarsky-komplex-brno' },
      description: 'Centrální klimatizační systém pro 200 zaměstnanců s inteligentním řízením.',
      category: 'komercni',
      location: 'Brno',
      year: '2024',
      rating: 5,
      highlights: ['VRV systém', 'Inteligentní řízení', 'Monitoring', 'Údržba 24/7'],
      savings: '40% snížení spotřeby',
      isFeatured: true,
      isTopReference: true
    },
    {
      _type: 'projectReference',
      _id: 'wellness-centrum-ostrava',
      title: 'Wellness centrum Ostrava',
      slug: { current: 'wellness-centrum-ostrava' },
      description: 'Speciální klimatizace a rekuperace pro wellness s bazénem a saunou.',
      category: 'rekuperace',
      location: 'Ostrava',
      year: '2024',
      rating: 5,
      highlights: ['Odolnost vlhkosti', 'Speciální filtrace', 'Tichý provoz', 'Úspora energie'],
      savings: '50% čerstvější vzduch',
      isFeatured: true,
      isTopReference: true
    }
  ]

  for (const reference of references) {
    await client.createOrReplace(reference)
    console.log(`✓ Created reference: ${reference.title}`)
  }
}

// FAQ
async function importFAQ() {
  console.log('❓ Importing FAQ...')
  
  const faqs = [
    {
      _type: 'faq',
      _id: 'klimatizace-faq-1',
      question: 'Jak dlouho trvá instalace klimatizace?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Standardní instalace klimatizace trvá 4-8 hodin v závislosti na složitosti instalace a typu jednotky.'
            }
          ]
        }
      ],
      category: 'klimatizace',
      order: 1,
      isActive: true
    },
    {
      _type: 'faq',
      _id: 'klimatizace-faq-2',
      question: 'Jaká je spotřeba klimatizace?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Moderní klimatizace s inverterovou technologií spotřebují 0,5-2 kW/h v závislosti na výkonu a energetické třídě.'
            }
          ]
        }
      ],
      category: 'klimatizace',
      order: 2,
      isActive: true
    },
    {
      _type: 'faq',
      _id: 'tepelna-cerpadla-faq-1',
      question: 'Kolik ušetřím s tepelným čerpadlem?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Tepelné čerpadlo může ušetřit až 60% nákladů na vytápění oproti klasickému plynovému kotli.'
            }
          ]
        }
      ],
      category: 'tepelna-cerpadla',
      order: 1,
      isActive: true
    }
  ]

  for (const faq of faqs) {
    await client.createOrReplace(faq)
    console.log(`✓ Created FAQ: ${faq.question}`)
  }
}

// Site Settings
async function importSiteSettings() {
  console.log('⚙️ Importing site settings...')
  
  const siteSettings = {
    _type: 'siteSettings',
    _id: 'siteSettings',
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

  await client.createOrReplace(siteSettings)
  console.log('✓ Created site settings')
}

// Run the import
importData()
