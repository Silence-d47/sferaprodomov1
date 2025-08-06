"use client"

import { useState } from "react"
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
  ArrowLeft,
  Clock,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Mail,
  BookOpen,
  ThumbsUp,
  MessageCircle,
  Eye
} from "lucide-react"

// Mock article data - in real app, this would come from CMS based on slug
const article = {
  id: "jak-vybrat-klimatizaci-2024",
  title: "Jak vybrat správnou klimatizaci pro váš domov v roce 2024",
  excerpt: "Kompletní průvodce výběrem klimatizace podle velikosti místnosti, energetické náročnosti a nejnovějších technologií. Zjistěte, na co si dát pozor při výběru.",
  content: `
    <h2>Úvod do světa klimatizací</h2>
    <p>Výběr správné klimatizace pro váš domov není jednoduchá záležitost. V roce 2024 máme k dispozici mnoho technologií a možností, které mohou být pro laika matoucí. V tomto článku si projdeme všechny důležité aspekty, které byste měli zvážit.</p>
    
    <h2>Typy klimatizací</h2>
    <p>Existuje několik základních typů klimatizačních systémů:</p>
    <ul>
      <li><strong>Split klimatizace</strong> - nejpopulárnější volba pro domácnosti</li>
      <li><strong>Multi-split systémy</strong> - pro chlazení více místností</li>
      <li><strong>VRF systémy</strong> - pro větší objekty</li>
      <li><strong>Mobilní klimatizace</strong> - dočasné řešení</li>
    </ul>
    
    <h2>Výpočet výkonu</h2>
    <p>Správný výpočet výkonu je klíčový pro efektivní provoz. Základní pravidlo je 100-150 W na m². Ale pozor, je třeba zohlednit:</p>
    <ul>
      <li>Orientaci místnosti ke světovým stranám</li>
      <li>Počet oken a jejich velikost</li>
      <li>Izolaci budovy</li>
      <li>Počet osob v místnosti</li>
    </ul>
    
    <h2>Energetická účinnost</h2>
    <p>V roce 2024 je energetická účinnost důležitější než kdy dříve. Hledejte klimatizace s vysokým SEER a SCOP hodnocením. Investice do účinnější klimatizace se vám vrátí na úsporách za elektřinu.</p>
    
    <h2>Závěr</h2>
    <p>Výběr klimatizace je investice na dlouhá léta. Doporučujeme konzultaci s odborníkem, který vám pomůže vybrat nejlepší řešení pro vaše specifické potřeby.</p>
  `,
  image: "/placeholder.svg?height=600&width=1200&text=Klimatizace+2024",
  author: "Ing. Pavel Novák",
  authorImage: "/placeholder.svg?height=80&width=80&text=Autor",
  date: "2024-01-15",
  readTime: "8 min čtení",
  category: "Klimatizace",
  categoryBg: "bg-blue-100",
  categoryColor: "text-blue-800",
  tags: ["klimatizace", "výběr", "2024", "tipy", "energie"],
  views: 1247,
  likes: 89,
  comments: 12
}

// Related articles
const relatedArticles = [
  {
    id: "instalace-klimatizace",
    title: "Profesionální instalace klimatizace krok za krokem",
    excerpt: "Zjistěte, jak probíhá profesionální instalace klimatizace a proč je důležité svěřit ji odborníkům.",
    image: "/placeholder.svg?height=300&width=400&text=Instalace",
    category: "Klimatizace",
    categoryBg: "bg-blue-100",
    categoryColor: "text-blue-800",
    readTime: "6 min čtení",
    date: "2024-01-10"
  },
  {
    id: "udrzba-klimatizace",
    title: "Údržba klimatizace: Co dělat a kdy volat servis",
    excerpt: "Pravidelná údržba prodlužuje životnost klimatizace a zajišťuje její efektivní provoz.",
    image: "/placeholder.svg?height=300&width=400&text=Údržba",
    category: "Klimatizace", 
    categoryBg: "bg-blue-100",
    categoryColor: "text-blue-800",
    readTime: "5 min čtení",
    date: "2024-01-05"
  },
  {
    id: "chyby-pri-vyberu",
    title: "5 nejčastějších chyb při výběru klimatizace",
    excerpt: "Vyhněte se těmto častým chybám a vyberte si klimatizaci, která vám bude sloužit dlouhá léta.",
    image: "/placeholder.svg?height=300&width=400&text=Chyby",
    category: "Tipy a rady",
    categoryBg: "bg-cyan-100", 
    categoryColor: "text-cyan-800",
    readTime: "4 min čtení",
    date: "2023-12-28"
  }
]

export default function BlogArticlePage() {
  const [liked, setLiked] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0">
          <Image 
            src={article.image} 
            alt={article.title} 
            fill 
            className="object-cover opacity-30" 
          />
        </div>
        <div className="relative z-10 container h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-6">
              <Image 
                src="/logo/logo.svg" 
                alt="Sfera logo" 
                width={50} 
                height={50} 
                className="mr-4" 
              />
              <Badge className={`${article.categoryBg} ${article.categoryColor} border-0`}>
                <BookOpen className="h-4 w-4 mr-2" />
                {article.category}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
              {article.title}
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
              {article.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-blue-100">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(article.date).toLocaleDateString("cs-CZ")}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {article.readTime}
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                {article.views} zobrazení
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Wave Divider */}
      <OrganicWaveDivider />

      {/* Article Content */}
      <section className="py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card className="shadow-xl border-0 bg-white">
                  <CardContent className="p-8 lg:p-12">
                    {/* Author Info */}
                    <div className="flex items-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <Image 
                        src={article.authorImage} 
                        alt={article.author} 
                        width={60} 
                        height={60} 
                        className="rounded-full mr-4" 
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{article.author}</h3>
                        <p className="text-muted-foreground">Odborník na klimatizace a tepelná čerpadla</p>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                      <span className="text-sm font-medium text-muted-foreground mr-2">Štítky:</span>
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Social Actions */}
                    <div className="flex items-center justify-between mt-8 pt-8 border-t">
                      <div className="flex items-center gap-4">
                        <Button
                          variant={liked ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLiked(!liked)}
                          className={liked ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {liked ? article.likes + 1 : article.likes}
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {article.comments}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground mr-2">Sdílet:</span>
                        <Button variant="outline" size="sm">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Quick Navigation */}
                  <Card className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Obsah článku
                      </h3>
                      <nav className="space-y-2 text-sm">
                        <a href="#uvod" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                          Úvod do světa klimatizací
                        </a>
                        <a href="#typy" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                          Typy klimatizací
                        </a>
                        <a href="#vypocet" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                          Výpočet výkonu
                        </a>
                        <a href="#energie" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                          Energetická účinnost
                        </a>
                        <a href="#zaver" className="block text-muted-foreground hover:text-blue-600 transition-colors">
                          Závěr
                        </a>
                      </nav>
                    </CardContent>
                  </Card>

                  {/* CTA Card */}
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold mb-3">Potřebujete poradit?</h3>
                      <p className="text-blue-100 mb-4 text-sm">
                        Naši odborníci vám pomohou vybrat ideální klimatizaci pro váš domov.
                      </p>
                      <Button className="w-full bg-white text-blue-700 hover:bg-blue-50">
                        Nezávazná konzultace
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
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

      {/* Related Articles */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Související články</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Další užitečné články na podobná témata
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedArticles.map((post) => (
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
                    <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.date).toLocaleDateString("cs-CZ")}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Button asChild variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        Číst článek
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-16">
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zpět na blog
                </Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/blog">
                  Všechny články
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=Newsletter+Background')] opacity-10"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <BookOpen className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Líbil se vám článek?
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
