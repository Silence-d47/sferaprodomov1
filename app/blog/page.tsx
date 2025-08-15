"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, ArrowRight, Filter, Search } from 'lucide-react'
import { client } from '@/lib/sanity.client'
import { postsQuery, categoriesQuery } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider'
import { useState, useEffect, useMemo } from 'react'

// Types
interface Post {
  _id: string
  title: string
  excerpt: string
  slug: { current: string }
  categories: string[]
  author: string
  publishedAt: string
  mainImage: any
  readingTime?: number
}

interface Category {
  _id: string
  title: string
  description?: string
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Klimatizace': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Tepelná čerpadla': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Rekuperace': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Elektroinstalace': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'Fotovoltaika': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  'Komerční': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
  'default': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' }
}

// Fetch data from Sanity
async function getBlogData() {
  try {
    const { client } = await import('@/lib/sanity.client')
    const { postsQuery, categoriesQuery } = await import('@/lib/sanity.queries')
    
    const [posts, categories] = await Promise.all([
      client.fetch<Post[]>(postsQuery),
      client.fetch<Category[]>(categoriesQuery)
    ])
    
    return { posts, categories }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return { posts: [], categories: [] }
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getBlogData()
      setPosts(data.posts)
      setCategories(data.categories)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  // Filtered and sorted posts
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.categories?.some(cat => cat === selectedCategory)
      )
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.categories?.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [posts, selectedCategory, searchTerm, sortBy])

  // Get the latest post based on publishedAt date
  const latestPost = posts.length > 0 ? posts.reduce((latest, current) => 
    new Date(current.publishedAt) > new Date(latest.publishedAt) ? current : latest
  ) : null

  // Get all unique categories
  const allCategories = Array.from(new Set(posts.flatMap(post => post.categories)))

  // Get category color
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || categoryColors.default
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání blogu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - konzistentní s referencí */}
      <section className="relative h-[60vh] md:h-[90vh] min-h-[600px] md:min-h-[600px] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0">
          {/* Custom SVG Background for Blog */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Abstract geometric shapes representing technology and knowledge */}
            <defs>
              <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Circuit board pattern */}
            <g stroke="url(#techGradient)" strokeWidth="2" fill="none">
              {/* Main circuit lines */}
              <path d="M100 200 L300 200 L300 400 L500 400 L500 600 L700 600" />
              <path d="M200 100 L200 300 L400 300 L400 500 L600 500 L600 700" />
              <path d="M800 200 L1000 200 L1000 400 L800 400 L800 600 L600 600" />
              
              {/* Circuit nodes */}
              <circle cx="100" cy="200" r="8" fill="white" opacity="0.4" />
              <circle cx="300" cy="200" r="6" fill="white" opacity="0.3" />
              <circle cx="300" cy="400" r="6" fill="white" opacity="0.3" />
              <circle cx="500" cy="400" r="6" fill="white" opacity="0.3" />
              <circle cx="500" cy="600" r="6" fill="white" opacity="0.3" />
              <circle cx="700" cy="600" r="8" fill="white" opacity="0.4" />
              <circle cx="200" cy="100" r="6" fill="white" opacity="0.3" />
              <circle cx="200" cy="300" r="6" fill="white" opacity="0.3" />
              <circle cx="400" cy="300" r="6" fill="white" opacity="0.3" />
              <circle cx="400" cy="500" r="6" fill="white" opacity="0.3" />
              <circle cx="600" cy="500" r="6" fill="white" opacity="0.3" />
              <circle cx="600" cy="700" r="8" fill="white" opacity="0.4" />
              <circle cx="800" cy="200" r="6" fill="white" opacity="0.3" />
              <circle cx="1000" cy="200" r="6" fill="white" opacity="0.3" />
              <circle cx="1000" cy="400" r="6" fill="white" opacity="0.3" />
              <circle cx="800" cy="400" r="6" fill="white" opacity="0.3" />
              <circle cx="800" cy="600" r="6" fill="white" opacity="0.3" />
              <circle cx="600" cy="600" r="6" fill="white" opacity="0.3" />
            </g>
            
            {/* Floating knowledge/document symbols */}
            <g fill="white" opacity="0.2">
              {/* Document icons */}
              <rect x="150" y="150" width="40" height="50" rx="4" />
              <rect x="160" y="160" width="20" height="2" rx="1" />
              <rect x="160" y="170" width="25" height="2" rx="1" />
              <rect x="160" y="180" width="30" height="2" rx="1" />
              
              <rect x="850" y="300" width="35" height="45" rx="4" />
              <rect x="860" y="310" width="15" height="2" rx="1" />
              <rect x="860" y="320" width="20" height="2" rx="1" />
              <rect x="860" y="330" width="18" height="2" rx="1" />
              
              <rect x="400" y="500" width="38" height="48" rx="4" />
              <rect x="410" y="510" width="18" height="2" rx="1" />
              <rect x="410" y="520" width="22" height="2" rx="1" />
              <rect x="410" y="530" width="16" height="2" rx="1" />
            </g>
            
            {/* Abstract data flow arrows */}
            <g stroke="white" strokeWidth="1.5" opacity="0.15" fill="none">
              <path d="M50 300 Q150 250 250 300 T450 300" markerEnd="url(#arrowhead)" />
              <path d="M750 100 Q850 150 950 100 T1150 100" markerEnd="url(#arrowhead)" />
              <path d="M50 600 Q150 550 250 600 T450 600" markerEnd="url(#arrowhead)" />
            </g>
            
            {/* Arrow marker definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="white" opacity="0.3" />
              </marker>
            </defs>
            
            {/* Floating tech symbols */}
            <g fill="white" opacity="0.1">
              {/* Binary code dots */}
              <circle cx="120" cy="80" r="2" />
              <circle cx="125" cy="80" r="2" />
              <circle cx="130" cy="80" r="2" />
              <circle cx="135" cy="80" r="2" />
              <circle cx="140" cy="80" r="2" />
              
              <circle cx="1050" cy="720" r="2" />
              <circle cx="1055" cy="720" r="2" />
              <circle cx="1060" cy="720" r="2" />
              <circle cx="1065" cy="720" r="2" />
              <circle cx="1070" cy="720" r="2" />
              
              {/* Small geometric shapes */}
              <polygon points="80,120 90,110 100,120 90,130" />
              <polygon points="1120,680 1130,670 1140,680 1130,690" />
              <rect x="70" y="650" width="12" height="12" rx="2" />
              <rect x="1110" y="120" width="12" height="12" rx="2" />
            </g>
          </svg>
        </div>
        <div className="relative z-10 container px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Left side - Content */}
            <div className="lg:col-span-8 text-white flex flex-col justify-center">
              <Badge className="bg-white/20 text-white border-white/20 text-sm px-4 py-2 mb-6 inline-block">
                Náš blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Odborné články a praktické rady
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
                Aktuální informace z oblasti klimatizace, tepelných čerpadel a elektroinstalací od našich expertů
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                  <Link href="/kontakt">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Nezávazná poptávka
                  </Link>
                </Button>
                {latestPost && (
                  <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all" asChild>
                    <Link href={`/blog/${latestPost.slug.current}`}>
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Přečíst nejnovější článek
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Right side - Logo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full scale-110 animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30 shadow-2xl">
                </div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider positioned at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <EnhancedSectionDivider variant="wave" animated={true} height="xl" fromColor="from-blue-600" toColor="to-white" particles={false} />
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
      {latestPost && (
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
                  <div className="h-64 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {latestPost.mainImage ? (
                      <Image
                        src={urlForImage(latestPost.mainImage).url()}
                        alt={latestPost.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1B5D93]/10 to-[#196097]/20"></div>
                    )}
                    <div className="absolute top-4 left-4">
                      {latestPost.categories?.map((category: string) => {
                        const colors = getCategoryColor(category)
                        return (
                          <Badge key={category} className={`${colors.bg} ${colors.text} ${colors.border} border mr-2 text-xs`}>
                            {category}
                          </Badge>
                        )
                      })}
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
                      <span>{latestPost.readingTime || 5} min čtení</span>
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
      )}

      {/* Enhanced Filter Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Filter className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Filtrovat články</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Najděte si články podle kategorie nebo použijte vyhledávání pro rychlé nalezení tématu
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Hledat v článcích..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Kategorie</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge 
                onClick={() => setSelectedCategory('all')}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                Všechny ({posts.length})
              </Badge>
              {allCategories.map((category) => {
                const colors = getCategoryColor(category)
                const categoryCount = posts.filter(post => 
                  post.categories?.some(cat => cat === category)
                ).length
                
                return (
                  <Badge 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category 
                        ? `${colors.bg} ${colors.text} ${colors.border} border` 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category} ({categoryCount})
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Řazení</h3>
            <div className="flex justify-center gap-3">
              <Badge 
                onClick={() => setSortBy('newest')}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  sortBy === 'newest' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                Nejnovější
              </Badge>
              <Badge 
                onClick={() => setSortBy('oldest')}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  sortBy === 'oldest' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                Nejstarší
              </Badge>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Zobrazeno <span className="font-semibold text-blue-600">{filteredPosts.length}</span> z <span className="font-semibold">{posts.length}</span> článků
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 group">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlForImage(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1B5D93]/10 to-[#196097]/20 group-hover:from-[#1B5D93]/20 group-hover:to-[#196097]/30 transition-all duration-300"></div>
                    )}
                    <div className="absolute top-4 left-4">
                      {post.categories?.map((category: string) => {
                        const colors = getCategoryColor(category)
                        return (
                          <Badge key={category} className={`${colors.bg} ${colors.text} ${colors.border} border text-xs`}>
                            {category}
                          </Badge>
                        )
                      })}
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
                        <span>{post.readingTime || 3} min</span>
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
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-4">
                  {searchTerm ? 'Žádné články nenalezeny' : 'Zatím zde nejsou žádné články'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm 
                    ? `Pro vyhledávání "${searchTerm}" nebyly nalezeny žádné články. Zkuste jiný termín.`
                    : 'První články se brzy objeví v našem blogu.'
                  }
                </p>
                {searchTerm && (
                  <Button 
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    Vymazat vyhledávání
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 border-t border-gray-200">
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
