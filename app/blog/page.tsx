import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'

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

// Get the latest post based on publishedAt date
const latestPost = mockPosts.reduce((latest, current) => 
  new Date(current.publishedAt) > new Date(latest.publishedAt) ? current : latest
)

// Get all unique categories
const allCategories = Array.from(new Set(mockPosts.flatMap(post => post.categories)))

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Professional Hero Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Odborné články, praktické rady a aktuální informace z oblasti klimatizace, tepelných čerpadel a elektroinstalací
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="py-3 bg-gray-50 border-b border-gray-100">
        <div className="container max-w-6xl mx-auto">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#1B5D93] transition-colors">
              Domů
            </Link>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
        </div>
      </section>

      {/* Featured Latest Article */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-[#1B5D93] rounded-full"></div>
              <span className="text-sm font-semibold text-[#1B5D93] uppercase tracking-wide">Nejnovější článek</span>
            </div>
          </div>

          <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B5D93]/10 to-[#196097]/20"></div>
                  <div className="absolute top-4 left-4">
                    {latestPost.categories?.map((category: string) => (
                      <Badge key={category} className="bg-white/90 text-gray-800 border-0 mr-2 text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(latestPost.publishedAt).toLocaleDateString('cs-CZ')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{latestPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>5 min čtení</span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  <Link href={`/blog/${latestPost.slug.current}`} className="hover:text-[#1B5D93] transition-colors duration-200">
                    {latestPost.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {latestPost.excerpt}
                </p>
                <Link 
                  href={`/blog/${latestPost.slug.current}`}
                  className="inline-flex items-center gap-2 text-[#1B5D93] font-semibold hover:gap-3 transition-all duration-200"
                >
                  Číst celý článek
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Kategorie</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  className="cursor-pointer bg-white text-gray-700 border border-gray-300 hover:bg-[#1B5D93] hover:text-white hover:border-[#1B5D93] transition-all duration-200 px-4 py-2"
                >
                  Všechny
                </Badge>
                {allCategories.map((category) => (
                  <Badge 
                    key={category}
                    className="cursor-pointer bg-white text-gray-700 border border-gray-300 hover:bg-[#1B5D93] hover:text-white hover:border-[#1B5D93] transition-all duration-200 px-4 py-2"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Řazení</h3>
              <div className="flex gap-2">
                <Badge 
                  className="cursor-pointer bg-[#1B5D93] text-white border border-[#1B5D93] hover:bg-[#196097] transition-all duration-200 px-4 py-2"
                >
                  Nejnovější
                </Badge>
                <Badge 
                  className="cursor-pointer bg-white text-gray-700 border border-gray-300 hover:bg-[#1B5D93] hover:text-white hover:border-[#1B5D93] transition-all duration-200 px-4 py-2"
                >
                  Nejstarší
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <article key={post._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B5D93]/10 to-[#196097]/20 group-hover:from-[#1B5D93]/20 group-hover:to-[#196097]/30 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4">
                    {post.categories?.map((category: string) => (
                      <Badge key={category} className="bg-white/90 text-gray-800 border-0 text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('cs-CZ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>3 min</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1B5D93] transition-colors duration-200">
                    <Link href={`/blog/${post.slug.current}`} className="block">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug.current}`}
                      className="text-[#1B5D93] text-sm font-semibold hover:text-[#196097] transition-colors duration-200"
                    >
                      Číst více
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nezmeškejte žádný článek</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Přihlaste se k odběru našeho newsletteru a získejte nejnovější články přímo do e-mailu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Váš e-mail" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5D93] focus:border-transparent"
            />
            <button className="bg-[#1B5D93] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#196097] transition-colors duration-200">
              Přihlásit se
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
