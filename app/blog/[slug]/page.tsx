import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, User, Clock, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

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
  body: any
  readingTime?: number
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

// Fetch post data from Sanity
async function getPostData(slug: string): Promise<Post | null> {
  try {
    const { client } = await import('@/lib/sanity.client')
    const { postQuery } = await import('@/lib/sanity.queries')
    const post = await client.fetch<Post>(postQuery, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Fetch all posts for navigation
async function getAllPosts(): Promise<Post[]> {
  try {
    const { client } = await import('@/lib/sanity.client')
    const { postsQuery } = await import('@/lib/sanity.queries')
    const posts = await client.fetch<Post[]>(postsQuery)
    return posts.sort((a: Post, b: Post) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = params.slug
  const [post, allPosts] = await Promise.all([
    getPostData(slug),
    getAllPosts()
  ])

  if (!post) {
    notFound()
  }

  // Get current post index and navigation posts
  const currentIndex = allPosts.findIndex(p => p.slug.current === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  
  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.slug.current !== slug && p.categories?.some(cat => post.categories?.includes(cat)))
    .slice(0, 3)

  // Get category color
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || categoryColors.default
  }

  // Import Sanity utilities inside the component
  const { urlForImage } = await import('@/lib/sanity.image')
  const { CustomPortableText } = await import('@/lib/sanity.portableText')

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
              {post.categories?.map((category: string) => {
                const colors = getCategoryColor(category)
                return (
                  <Badge key={category} className={`${colors.bg} ${colors.text} ${colors.border} border`}>
                    {category}
                  </Badge>
                )
              })}
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
                {post.mainImage && (
                  <div className="mb-8">
                    <div className="relative w-full overflow-hidden aspect-[5/4] rounded-lg">
                      <Image
                        src={urlForImage(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {post.excerpt && (
                  <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <p className="text-lg text-gray-700 italic">{post.excerpt}</p>
                  </div>
                )}
                
                <div className="prose prose-lg max-w-none">
                  <CustomPortableText value={post.body} />
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation between posts */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {prevPost && (
                  <Link 
                    href={`/blog/${prevPost.slug.current}`}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200 border-r border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronLeft className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Předchozí článek</div>
                        <div className="font-semibold text-gray-900 line-clamp-2">{prevPost.title}</div>
                      </div>
                    </div>
                  </Link>
                )}
                {nextPost && (
                  <Link 
                    href={`/blog/${nextPost.slug.current}`}
                    className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${!prevPost ? 'md:col-span-2' : ''}`}
                  >
                    <div className="flex items-center gap-3 justify-end">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Následující článek</div>
                        <div className="font-semibold text-gray-900 line-clamp-2">{nextPost.title}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
            
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

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
          <div className="container">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">Související články</h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Podívejte se na další články ze stejné kategorie
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`} className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 group">
                  <div className="relative w-full overflow-hidden aspect-[5/4] bg-gradient-to-br from-gray-100 to-gray-200">
                    {relatedPost.mainImage ? (
                      <Image
                        src={urlForImage(relatedPost.mainImage).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1B5D93]/10 to-[#196097]/20 group-hover:from-[#1B5D93]/20 group-hover:to-[#196097]/30 transition-all duration-300"></div>
                    )}
                    <div className="absolute top-4 left-4">
                      {relatedPost.categories?.map((category: string) => {
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
                        <span>{new Date(relatedPost.publishedAt).toLocaleDateString('cs-CZ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readingTime || 3} min</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1B5D93] transition-colors duration-200">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="text-[#1B5D93] text-sm font-semibold group-hover:text-[#196097] transition-colors duration-200">
                      Číst více
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section */}
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
              Všechny články
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
