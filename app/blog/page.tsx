import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock data pro testování
const mockPosts = [
  {
    _id: '1',
    title: 'Jak vybrat správnou klimatizaci pro váš domov',
    excerpt: 'Kompletní průvodce výběrem klimatizace podle velikosti místnosti a energetické náročnosti.',
    slug: { current: 'jak-vybrat-klimatizaci' },
    categories: ['Klimatizace'],
    author: 'Ing. Jan Novák',
    publishedAt: '2024-01-15',
    mainImage: null
  },
  {
    _id: '2',
    title: 'Tepelná čerpadla a dotace 2024',
    excerpt: 'Aktuální přehled všech dostupných dotací na tepelná čerpadla.',
    slug: { current: 'tepelna-cerpadla-dotace' },
    categories: ['Tepelná čerpadla'],
    author: 'Marie Svobodová',
    publishedAt: '2024-01-10',
    mainImage: null
  },
  {
    _id: '3',
    title: 'Elektroinstalace pro chytrou domácnost',
    excerpt: 'Moderní elektroinstalace jako základ chytré domácnosti.',
    slug: { current: 'elektroinstalace-chytra-domacnost' },
    categories: ['Elektroinstalace'],
    author: 'Ing. Pavel Černý',
    publishedAt: '2024-01-05',
    mainImage: null
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1B5D93] via-[#196097] to-[#49A3D7]">
        <div className="container">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Novinky, tipy a užitečné informace z oblasti klimatizace a elektroinstalací
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {post.categories?.map((category: string) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl">
                    <Link href={`/blog/${post.slug.current}`} className="hover:text-[#1B5D93]">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('cs-CZ')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
