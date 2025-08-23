"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, ArrowRight, Filter, Search, BookOpen, TrendingUp, Star, Lightbulb, Zap, Thermometer, Wrench, Home, Building2 } from 'lucide-react'
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

// Category mapping with icons and colors
const categoryConfig: Record<string, { 
  bg: string; 
  text: string; 
  border: string; 
  icon: any; 
  description: string;
  gradient: string;
}> = {
  'Klimatizace': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200',
    icon: Thermometer,
    description: 'Tipy pro správnou klimatizaci',
    gradient: 'from-blue-500 to-cyan-500'
  },
  'Tepelná čerpadla': { 
    bg: 'bg-green-50', 
    text: 'text-green-700', 
    border: 'border-green-200',
    icon: Zap,
    description: 'Úsporné vytápění domácnosti',
    gradient: 'from-green-500 to-emerald-500'
  },
  'Rekuperace': { 
    bg: 'bg-purple-50', 
    text: 'text-purple-700', 
    border: 'border-purple-200',
    icon: Home,
    description: 'Čerstvý vzduch bez ztrát',
    gradient: 'from-purple-500 to-violet-500'
  },
  'Elektroinstalace': { 
    bg: 'bg-orange-50', 
    text: 'text-orange-700', 
    border: 'border-orange-200',
    icon: Wrench,
    description: 'Bezpečná elektroinstalace',
    gradient: 'from-orange-500 to-amber-500'
  },
  'Fotovoltaika': { 
    bg: 'bg-yellow-50', 
    text: 'text-yellow-700', 
    border: 'border-yellow-200',
    icon: Lightbulb,
    description: 'Solární energie pro váš dům',
    gradient: 'from-yellow-500 to-orange-500'
  },
  'Komerční': { 
    bg: 'bg-gray-50', 
    text: 'text-gray-700', 
    border: 'border-gray-200',
    icon: Building2,
    description: 'Řešení pro firmy a podniky',
    gradient: 'from-gray-500 to-slate-500'
  }
}

// Fetch data from Sanity
async function getBlogData() {
  try {
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
  const [ categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')
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
      if (sortBy === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      } else if (sortBy === 'oldest') {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      } else {
        // Popular - based on reading time (simulated)
        return (b.readingTime || 0) - (a.readingTime || 0)
      }
    })

    return filtered
  }, [posts, selectedCategory, searchTerm, sortBy])

  // Featured posts (first 3)
  const featuredPosts = filteredPosts.slice(0, 3)
  // Regular posts (all except featured to avoid duplication)
  const regularPosts = filteredPosts.slice(3)

  // Debug logging
  console.log('Total posts:', posts.length)
  console.log('Filtered posts:', filteredPosts.length)
  console.log('Featured posts:', featuredPosts.length)
  console.log('Regular posts:', regularPosts.length)
  console.log('Selected category:', selectedCategory)

  // Show featured posts section only if there are posts
  const showFeaturedSection = featuredPosts.length > 0
  // Show regular posts section if there are posts beyond featured ones
  const showRegularSection = regularPosts.length > 0

  // Get category config
  const getCategoryConfig = (category: string) => {
    return categoryConfig[category] || categoryConfig['Klimatizace']
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Načítání odborných článků...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - "Technik radí" */}
      <section className="relative py-40 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto text-center text-white">
            {/* Main heading */}
            <div className="mb-8">
              <Badge className="bg-white/20 text-white border-white/20 text-sm px-4 py-2 mb-6 inline-block">
                Naši technici pro vás přiravují pravidelně to nejzajímavější čtení
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                Články a zajímavosti
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto drop-shadow-lg">
                Odborné články, tipy a triky od našich techniků pro správné fungování 
                klimatizace, tepelných čerpadel a dalších systémů ve vašem domě
              </p>
            </div>

            {/* Search and filters */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Hledejte v článcích..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">100%</div>
                <div className="text-blue-100 text-sm">pro vaše pohodlí</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{posts.length}</div>
                <div className="text-blue-100 text-sm">článků k dispozici</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <EnhancedSectionDivider variant="wave" animated={true} height="xl" fromColor="from-blue-600" toColor="to-white" particles={false} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Přečtěte si, co vás zajímá
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vyberte si oblast, která vás zajímá, a najděte odborné rady od našich techniků.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.entries(categoryConfig).map(([category, config]) => {
              const IconComponent = config.icon
              const isSelected = selectedCategory === category
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(isSelected ? 'all' : category)}
                  className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${config.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${config.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{category}</h3>
                    <p className="text-gray-600 mb-4">{config.description}</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      <span>Prozkoumat články</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {showFeaturedSection && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="container">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                  Doporučené články
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nejdůležitější články
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tyto články by si měl přečíst každý, kdo se stará o svůj dům
              </p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredPosts.map((post, index) => {
                const category = post.categories?.[0] || 'Klimatizace'
                const config = getCategoryConfig(category)
                
                return (
                  <Card key={post._id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={post.mainImage ? urlForImage(post.mainImage).url() : "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${config.bg} ${config.text} border-0`}>
                          {category}
                        </Badge>
                      </div>

                      {/* Reading time */}
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readingTime || 5} min
                        </div>
                      </div>

                      {/* Featured indicator */}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center bg-yellow-500 text-white rounded-full px-3 py-1 text-sm font-medium">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Doporučené
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(post.publishedAt).toLocaleDateString('cs-CZ')}
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-2" />
                        {post.author}
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      
                      <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>

                      <Link href={`/blog/${post.slug.current}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Přečíst článek
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      {showRegularSection && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Všechny články
                </h2>
                <p className="text-xl text-gray-600">
                  {selectedCategory !== 'all' 
                    ? `Články v kategorii: ${selectedCategory}` 
                    : 'Kompletní přehled všech odborných článků'
                  }
                </p>
              </div>

              {/* Sort and filter controls */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Nejnovější</option>
                  <option value="oldest">Nejstarší</option>
                  <option value="popular">Nejpopulárnější</option>
                </select>
              </div>
            </div>

            {showRegularSection ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => {
                  const category = post.categories?.[0] || 'Klimatizace'
                  const config = getCategoryConfig(category)
                  
                  return (
                    <Card key={post._id} className="group overflow-hidden border border-gray-200 hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <Image
                          src={post.mainImage ? urlForImage(post.mainImage).url() : "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className={`${config.bg} ${config.text} border-0 text-xs`}>
                            {category}
                          </Badge>
                        </div>

                        {/* Reading time */}
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center bg-white/90 rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readingTime || 5} min
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString('cs-CZ')}
                          <span className="mx-2">•</span>
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        
                        <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        
                        <CardDescription className="text-gray-600 mb-4 line-clamp-3 text-sm">
                          {post.excerpt}
                        </CardDescription>

                        <Link href={`/blog/${post.slug.current}`}>
                          <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                            Přečíst článek
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {searchTerm ? 'Žádné články nenalezeny' : 'Žádné články k dispozici'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? `Pro hledaný výraz "${searchTerm}" nebyly nalezeny žádné články.`
                    : 'Žádné články nejsou v tuto chvíli k dispozici.'
                  }
                </p>
                {searchTerm && (
                  <Button
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Vymazat vyhledávání
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Potřebujete odbornou radu?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Nenašli jste odpověď v našich článcích? Kontaktujte naše techniky 
              a získejte osobní konzultaci pro váš konkrétní problém.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                <Link href="/kontakt">
                  <Zap className="h-5 w-5 mr-2" />
                  Nezávazná konzultace
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800 hover:text-white font-semibold bg-white/10 backdrop-blur-sm" asChild>
                <Link href="/sluzby">
                  Naše služby
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
