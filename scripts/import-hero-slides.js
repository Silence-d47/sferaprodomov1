// Simple hero slides import for Sanity
const { createClient } = require('next-sanity')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cu4viahw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-05',
})

async function importHeroSlides() {
  console.log('🏆 Importing hero slides...')

  const slides = [
    {
      _type: 'heroSlide',
      _id: 'hero-slide-1',
      title: 'Porucha elektřiny? Jsme u vás do 24 hodin.',
      subtitle: 'Vaše spolehlivá elektro pohotovost pro Opavu a okolí, 7 dní v týdnu.',
      description:
        'Nenechte se omezovat nefunkční zásuvkou nebo vypadlým jističem. Náš tým rychle a profesionálně vyřeší jakoukoliv drobnou poruchu elektroinstalace. Spolehlivě, bezpečně a bez zbytečného čekání.',
      slideType: 'intro',
      features: [
        'Rychlá reakce do 24 hodin',
        'Profesionální servis',
        '7 dní v týdnu',
        'Opava a okolí',
      ],
      primaryButton: {
        text: 'Potřebuji rychlou opravu',
        link: '/kontakt',
        isActive: true,
      },
      secondaryButton: {
        text: 'Zavolejte nám',
        link: 'tel:+420735014112',
        isActive: true,
      },
      phoneNumber: '+420 735 014 112',
      order: 1,
      isActive: true,
    },
    {
      _type: 'heroSlide',
      _id: 'hero-slide-2',
      title: 'Profesionální klimatizace a tepelná čerpadla',
      subtitle: 'Nadstandardní servis a montáž do 14 dnů',
      description:
        'Specializujeme se na instalaci klimatizací, tepelných čerpadel a rekuperačních systémů. Garantujeme kvalitu, spolehlivost a rychlou realizaci.',
      slideType: 'service',
      features: [
        'Montáž do 14 dnů',
        '0% záloha na skladové zboží',
        'Platba po realizaci',
        'Servis do 7 dnů',
        'Technická podpora 24/7',
      ],
      primaryButton: {
        text: 'Nezávazná nabídka',
        link: '/kontakt',
        isActive: true,
      },
      secondaryButton: {
        text: 'Zavolejte nám',
        link: 'tel:+420735014112',
        isActive: true,
      },
      phoneNumber: '+420 735 014 112',
      order: 2,
      isActive: true,
    },
  ]

  try {
    for (const slide of slides) {
      await client.createOrReplace(slide)
      console.log(`✓ Created hero slide: ${slide.title}`)
    }
    console.log('✅ Hero slides import completed successfully!')
  } catch (error) {
    console.error('❌ Hero slides import failed:', error)
  }
}

// Run the import
importHeroSlides()
