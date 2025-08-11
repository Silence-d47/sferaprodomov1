import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Mock data pro testování
const mockPosts = {
  'jak-vybrat-klimatizaci': {
    title: 'Jak vybrat správnou klimatizaci pro váš domov',
    excerpt: 'Kompletní průvodce výběrem klimatizace podle velikosti místnosti a energetické náročnosti.',
    categories: ['Klimatizace'],
    author: 'Ing. Jan Novák',
    publishedAt: '2024-01-15',
    content: `
      <h2>Úvod do světa klimatizací</h2>
      <p>Výběr správné klimatizace pro váš domov není jednoduchá záležitost. V roce 2024 máme k dispozici mnoho technologií a možností, které mohou být pro laika matoucí.</p>
      
      <h2>Typy klimatizací</h2>
      <p>Existuje několik základních typů klimatizačních systémů:</p>
      <ul>
        <li><strong>Split klimatizace</strong> - nejpopulárnější volba pro domácnosti</li>
        <li><strong>Multi-split systémy</strong> - pro chlazení více místností</li>
        <li><strong>VRF systémy</strong> - pro větší objekty</li>
      </ul>
      
      <h2>Výpočet výkonu</h2>
      <p>Správný výpočet výkonu je klíčový pro efektivní provoz. Základní pravidlo je 100-150 W na m².</p>
    `
  },
  'tepelna-cerpadla-dotace': {
    title: 'Tepelná čerpadla a dotace 2024',
    excerpt: 'Aktuální přehled všech dostupných dotací na tepelná čerpadla.',
    categories: ['Tepelná čerpadla'],
    author: 'Marie Svobodová',
    publishedAt: '2024-01-10',
    content: `
      <h2>Dotace na tepelná čerpadla</h2>
      <p>V roce 2024 jsou dostupné různé dotace na tepelná čerpadla. Zjistěte, jaké možnosti máte.</p>
      
      <h2>Nová zelená úsporám</h2>
      <p>Program Nová zelená úsporám nabízí dotace až 180 000 Kč na tepelná čerpadla.</p>
    `
  },
  'elektroinstalace-chytra-domacnost': {
    title: 'Elektroinstalace pro chytrou domácnost',
    excerpt: 'Moderní elektroinstalace jako základ chytré domácnosti.',
    categories: ['Elektroinstalace'],
    author: 'Ing. Pavel Černý',
    publishedAt: '2024-01-05',
    content: `
      <h2>Chytrá domácnost</h2>
      <p>Moderní elektroinstalace je základním kamenem chytré domácnosti. Bez správné přípravy nemůžete využívat moderní technologie.</p>
      
      <h2>Co potřebujete</h2>
      <ul>
        <li>Silné okruhy pro spotřebiče</li>
        <li>Wi-Fi připojení v každé místnosti</li>
        <li>Příprava pro smart technologie</li>
      </ul>
    `
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = mockPosts[(await params).slug as keyof typeof mockPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1B5D93] via-[#196097] to-[#49A3D7] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/20 px-4 py-2">
              Blog článek
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-white/90 gap-2 mb-6">
              <span className="font-medium">Autor: {post.author}</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('cs-CZ')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.categories?.map((category: string) => (
                <Badge key={category} className="bg-white/20 text-white border-white/20">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
              <CardContent>
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-[#1B5D93] hover:text-[#196097] font-medium transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                Zpět na blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1B5D93] to-[#196097] text-white">
        <div className="container text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Zajímá vás více informací?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Podívejte se na další články v našem blogu nebo nás kontaktujte pro konzultaci
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog" 
              className="inline-block bg-white text-[#1B5D93] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 text-center"
            >
              Více článků
            </Link>
            <Link 
              href="/kontakt" 
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300 text-center"
            >
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
