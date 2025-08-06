"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { ShapedSectionHeader } from "@/components/ui/shaped-section-header"
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Filter,
  Search,
  BookOpen,
  Clock,
  Tag,
  Mail,
  Bell
} from "lucide-react"

// Categories with colors matching service sections
const getCategories = (posts: any[]) => {
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return [
    { name: "Všechny", color: "text-gray-600", bg: "bg-gray-50", count: posts.length },
    { name: "Klimatizace", color: "text-blue-600", bg: "bg-blue-50", count: categoryCounts["Klimatizace"] || 0 },
    { name: "Tepelná čerpadla", color: "text-green-600", bg: "bg-green-50", count: categoryCounts["Tepelná čerpadla"] || 0 },
    { name: "Rekuperace", color: "text-purple-600", bg: "bg-purple-50", count: categoryCounts["Rekuperace"] || 0 },
    { name: "Elektroinstalace", color: "text-orange-600", bg: "bg-orange-50", count: categoryCounts["Elektroinstalace"] || 0 },
    { name: "Fotovoltaika", color: "text-yellow-600", bg: "bg-yellow-50", count: categoryCounts["Fotovoltaika"] || 0 },
    { name: "Tipy a rady", color: "text-cyan-600", bg: "bg-cyan-50", count: categoryCounts["Tipy a rady"] || 0 }
  ]
}

// Mock data - in real app, this would come from CMS
const blogPosts = [
  {
    id: "jak-vybrat-klimatizaci-2024",
    title: "Jak vybrat správnou klimatizaci pro váš domov v roce 2024",
    excerpt: "Kompletní průvodce výběrem klimatizace podle velikosti místnosti, energetické náročnosti a nejnovějších technologií. Zjistěte, na co si dát pozor při výběru.",
    image: "/placeholder.svg?height=400&width=600&text=Klimatizace+2024",
    category: "Klimatizace",
    categoryColor: "text-blue-600",
    categoryBg: "bg-blue-50",
    author: "Ing. Jan Novák",
    date: "2024-12-20",
    readTime: "8 min čtení",
    featured: true,
    tags: ["výběr", "domácnost", "energie"]
  },
  {
    id: "tepelna-cerpadla-dotace-2024",
    title: "Dotace na tepelná čerpadla 2024: Kompletní přehled",
    excerpt: "Aktuální přehled všech dostupných dotací na tepelná čerpadla. Jak získat až 180 000 Kč na instalaci tepelného čerpadla.",
    image: "/placeholder.svg?height=300&width=400&text=Dotace+TC",
    category: "Tepelná čerpadla",
    categoryColor: "text-green-600",
    categoryBg: "bg-green-50",
    author: "Marie Svobodová",
    date: "2024-12-18",
    readTime: "6 min čtení",
    tags: ["dotace", "úspory", "investice"]
  },
  {
    id: "rekuperace-zdravi-vzduch",
    title: "Rekuperace a její pozitivní vliv na zdraví celé rodiny",
    excerpt: "Proč je kvalita vzduchu v domácnosti klíčová pro naše zdraví a jak rekuperace pomáhá udržet čistý vzduch po celý rok.",
    image: "/placeholder.svg?height=300&width=400&text=Rekuperace+Zdravi",
    category: "Rekuperace",
    categoryColor: "text-purple-600",
    categoryBg: "bg-purple-50",
    author: "MUDr. Petr Dvořák",
    date: "2024-12-15",
    readTime: "5 min čtení",
    tags: ["zdraví", "vzduch", "alergeny"]
  },
  {
    id: "elektroinstalace-chytra-domacnost",
    title: "Elektroinstalace pro chytrou domácnost: Co potřebujete vědět",
    excerpt: "Moderní elektroinstalace jako základ chytré domácnosti. Tipy pro přípravu elektroinstalace pro smart home technologie.",
    image: "/placeholder.svg?height=300&width=400&text=Smart+Home",
    category: "Elektroinstalace",
    categoryColor: "text-orange-600",
    categoryBg: "bg-orange-50",
    author: "Ing. Pavel Černý",
    date: "2024-12-12",
    readTime: "7 min čtení",
    tags: ["smart home", "technologie", "budoucnost"]
  },
  {
    id: "fotovoltaika-vyhodnost-2024",
    title: "Je fotovoltaika v roce 2024 stále výhodná investice?",
    excerpt: "Analýza návratnosti fotovoltaických elektráren v současných podmínkách. Kalkulace úspor a doporučení pro rok 2024.",
    image: "/placeholder.svg?height=300&width=400&text=FVE+2024",
    category: "Fotovoltaika",
    categoryColor: "text-yellow-600",
    categoryBg: "bg-yellow-50",
    author: "Ing. Tomáš Procházka",
    date: "2024-12-10",
    readTime: "9 min čtení",
    tags: ["investice", "úspory", "kalkulace"]
  },
  {
    id: "udrzba-klimatizace-zima",
    title: "Zimní údržba klimatizace: Checklist pro majitelie",
    excerpt: "Co dělat s klimatizací v zimě? Kompletní návod na zimní údržbu, která prodlouží životnost vašeho zařízení.",
    image: "/placeholder.svg?height=300&width=400&text=Udrzba+Zima",
    category: "Tipy a rady",
    categoryColor: "text-cyan-600",
    categoryBg: "bg-cyan-50",
    author: "Jan Novák",
    date: "2024-12-08",
    readTime: "4 min čtení",
    tags: ["údržba", "zima", "servis"]
  },
  {
    id: "uspory-energie-klimatizace",
    title: "10 tipů jak ušetřit na energiích s klimatizací",
    excerpt: "Praktické rady pro efektivní používání klimatizace. Jak snížit spotřebu energie až o 40% bez ztráty komfortu.",
    image: "/placeholder.svg?height=300&width=400&text=Uspory+Energie",
    category: "Tipy a rady",
    categoryColor: "text-cyan-600",
    categoryBg: "bg-cyan-50",
    author: "Marie Svobodová",
    date: "2024-12-05",
    readTime: "6 min čtení",
    tags: ["úspory", "efektivita", "tipy"]
  },
  {
    id: "tepelne-cerpadlo-vs-kotel",
    title: "Tepelné čerpadlo vs. plynový kotel: Porovnání 2024",
    excerpt: "Detailní srovnání tepelných čerpadel a plynových kotlů. Provozní náklady, investice a dlouhodobá výhodnost.",
    image: "/placeholder.svg?height=300&width=400&text=TC+vs+Kotel",
    category: "Tepelná čerpadla",
    categoryColor: "text-green-600",
    categoryBg: "bg-green-50",
    author: "Ing. Pavel Černý",
    date: "2024-12-01",
    readTime: "8 min čtení",
    tags: ["porovnání", "náklady", "vytápění"]
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Všechny")
  const [searchQuery, setSearchQuery] = useState("")

  // Get dynamic categories with counts
  const categories = getCategories(blogPosts)

  // Filter posts based on selected category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Všechny" || post.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Get featured post (newest)
  const featuredPost = blogPosts[0]
  const otherPosts = filteredPosts.slice(1) // Show all posts except the first one

  return (
    <div className="flex flex-col">
      {/* Hero Section - konzistentní s hlavní stránkou */}
      <section className="relative h-[500px] bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0">
          <Image 
            src="/placeholder.svg?height=500&width=1200&text=Blog+Hero" 
            alt="Blog" 
            fill 
            className="object-cover opacity-20" 
          />
        </div>
        <div className="relative z-10 container h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-6">
              <Image 
                src="/logo/logo.svg" 
                alt="Sfera logo" 
                width={60} 
                height={60} 
                className="mr-4" 
              />
              <Badge className="bg-white/20 text-white border-white/20 text-sm px-3 py-1">
                <BookOpen className="h-4 w-4 mr-2" />
                Blog & Články
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Tipy a rady od expertů
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
              Užitečné články, praktické tipy a nejnovější trendy ze světa klimatizace, 
              tepelných čerpadel, rekuperace a elektroinstalací.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
                <Link href="#nejnovejsi-clanek">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Nejnovější článek
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#vsechny-clanky">
                  <Search className="h-5 w-5 mr-2" />
                  Procházet články
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Wave Divider */}
      <OrganicWaveDivider />

      {/* Featured Post */}
      <section id="nejnovejsi-clanek" className="py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                Nejnovější
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Aktuální článek</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden shadow-2xl border-0 bg-white">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      NOVÉ
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${featuredPost.categoryBg} ${featuredPost.categoryColor} border-0`}>
                      {featuredPost.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{featuredPost.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">{featuredPost.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(featuredPost.date).toLocaleDateString("cs-CZ")}
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href={`/blog/${featuredPost.id}`}>
                        Číst článek
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Shaped Section Header */}
      <ShapedSectionHeader 
        variant="wave-inverse"
        animated={true}
        height="lg"
        backgroundColor="bg-white"
        particles={false}
      />

      {/* Blog Posts with Filters */}
      <section id="vsechny-clanky" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Všechny články</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Procházejte naše články podle kategorií nebo vyhledávejte konkrétní témata
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Vyhledávejte články, témata nebo klíčová slova..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.name
                      ? `${category.bg} ${category.color} shadow-md scale-105`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2 inline" />
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {otherPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${post.categoryBg} ${post.categoryColor} border-0 text-xs`}>
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.date).toLocaleDateString("cs-CZ")}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          {post.author.split(' ')[0]}
                        </div>
                        <Button asChild variant="outline" className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors text-sm">
                          <Link href={`/blog/${post.id}`}>
                            Číst více
                            <ArrowRight className="h-3 w-3 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nebyly nalezeny žádné články</h3>
              <p className="text-gray-500 mb-6">Zkuste změnit filtry nebo vyhledávací dotaz</p>
              <Button onClick={() => { setSelectedCategory("Všechny"); setSearchQuery("") }}>
                Zobrazit všechny články
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=Newsletter+Background')] opacity-10"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Bell className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Nezmeškejte žádný článek
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Přihlaste se k odběru našeho newsletteru a dostávejte nejnovější články, 
              praktické tipy a exkluzivní obsah přímo do vašeho emailu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Váš email" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                />
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                <Bell className="h-4 w-4 mr-2" />
                Přihlásit se
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Žádný spam, pouze kvalitní obsah. Odhlásit se můžete kdykoli.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
