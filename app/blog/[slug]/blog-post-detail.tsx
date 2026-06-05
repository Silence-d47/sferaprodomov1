'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  ThumbsUp,
  MessageCircle,
  Tag,
  Lightbulb,
  Zap,
  Thermometer,
  Wrench,
  Home,
  Building2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider';
import { Toaster, toast } from 'react-hot-toast';
import { CustomPortableText } from '@/lib/sanity.portableText';
import { getCroppedImageUrl } from '@/lib/sanity.image-crops';
import type { PortableTextBlock } from '@portabletext/types';

type CropData = { x: number; y: number; width: number; height: number };

export interface PostData {
  _id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  slug: { current: string };
  categories: string[];
  author: string;
  publishedAt: string;
  mainImage: string | null;
  mainImageRef?: string;
  mainImageCrops?: Record<string, CropData>;
  body: PortableTextBlock[];
  readingTime?: number;
  keywords?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface Props {
  post: PostData;
  allPosts: PostData[];
}

const categoryConfig: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    gradient: string;
  }
> = {
  Klimatizace: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: Thermometer,
    description: 'Tipy pro správnou klimatizaci',
    gradient: 'from-blue-500 to-cyan-500',
  },
  'Tepelná čerpadla': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: Zap,
    description: 'Úsporné vytápění domácnosti',
    gradient: 'from-green-500 to-emerald-500',
  },
  Rekuperace: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    icon: Home,
    description: 'Čerstvý vzduch bez ztrát',
    gradient: 'from-purple-500 to-violet-500',
  },
  Elektroinstalace: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    icon: Wrench,
    description: 'Bezpečná elektroinstalace',
    gradient: 'from-orange-500 to-amber-500',
  },
  Fotovoltaika: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: Lightbulb,
    description: 'Solární energie pro váš dům',
    gradient: 'from-yellow-500 to-orange-500',
  },
  Komerční: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: Building2,
    description: 'Řešení pro firmy a podniky',
    gradient: 'from-gray-500 to-slate-500',
  },
};

export default function BlogPostDetail({ post, allPosts }: Props) {
  const slug = post.slug.current;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .then(() => toast.success('Článek úspěšně sdílen!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      toast.error('Sdílení není na tomto zařízení podporováno.');
    }
  };

  const handleBookmark = () => {
    toast.success('Článek byl uložen do záložek!');
  };

  const handleGenericClick = () => {
    toast('Tato funkce se připravuje.', {
      icon: '🚧',
    });
  };

  const currentIndex = allPosts.findIndex((p) => p.slug.current === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const relatedPosts = allPosts
    .filter(
      (p) => p.slug.current !== slug && p.categories?.some((cat) => post.categories?.includes(cat)),
    )
    .slice(0, 3);

  const getCategoryConfig = (category: string) => {
    return categoryConfig[category] || categoryConfig['Klimatizace'];
  };

  const getImageUrl = (p: PostData, cropKey: string, width: number) => {
    return (
      getCroppedImageUrl(
        { url: p.mainImage ?? undefined, ref: p.mainImageRef, deviceCrops: p.mainImageCrops },
        cropKey,
        width,
      ) ||
      p.mainImage ||
      '/placeholder.svg'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Toaster position="bottom-right" />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-100 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zpět na všechny články
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                {post.categories?.[0] && (
                  <div className="mb-6">
                    <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2 backdrop-blur-sm">
                      {post.categories[0]}
                    </Badge>
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight drop-shadow-2xl">
                  {post.title}
                </h1>
                {post.subtitle && (
                  <h2 className="text-2xl md:text-3xl font-semibold text-blue-100 mb-4 leading-snug">
                    {post.subtitle}
                  </h2>
                )}

                <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-white mb-8">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('cs-CZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{post.readingTime || 5} min čtení</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg"
                    onClick={handleBookmark}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Uložit článek
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-700 bg-white/10 backdrop-blur-sm"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Sdílet
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20 aspect-[3/2]">
                  <Image
                    src={getImageUrl(post, 'hero', 1200)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <EnhancedSectionDivider
            variant="wave"
            animated={true}
            height="xl"
            fromColor="from-blue-600"
            toColor="to-white"
            particles={false}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg prose-blue max-w-none">
              {post.body ? (
                <CustomPortableText value={post.body} />
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">Obsah článku se načítá...</p>
                </div>
              )}
            </article>

            <div className="mt-16 pt-8 border-t border-gray-200">
              {post.keywords && post.keywords.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-blue-600" />
                    Klíčová slova
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-6">
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={handleGenericClick}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>Užitečné</span>
                  </button>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={handleGenericClick}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Komentáře</span>
                  </button>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Sdílet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Související články
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Další užitečné články na podobné téma od našich techniků
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => {
                const category = relatedPost.categories?.[0] || 'Klimatizace';
                const config = getCategoryConfig(category);

                return (
                  <Card
                    key={relatedPost._id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={getImageUrl(relatedPost, 'card', 600)}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <Badge className={`${config.bg} ${config.text} border-0`}>{category}</Badge>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="flex items-center bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                          <Clock className="h-4 w-4 mr-1" />
                          {relatedPost.readingTime || 5} min
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(relatedPost.publishedAt).toLocaleDateString('cs-CZ')}
                      </div>

                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </CardTitle>

                      <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>

                      <Link href={`/blog/${relatedPost.slug.current}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Přečíst článek
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug.current}`} className="group flex-1">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center text-blue-600 mb-3">
                        <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Předchozí článek</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {prevPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{prevPost.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              )}

              {nextPost && (
                <Link href={`/blog/${nextPost.slug.current}`} className="group flex-1">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-right">
                      <div className="flex items-center justify-end text-blue-600 mb-3">
                        <span className="text-sm font-medium">Následující článek</span>
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {nextPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{nextPost.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Potřebujete odbornou pomoc?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Máte problém s klimatizací, tepelným čerpadlem nebo elektroinstalací? Naši technici
              jsou připraveni vám pomoci s profesionálním řešením.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg"
                asChild
              >
                <Link href="/kontakt">
                  <Phone className="h-5 w-5 mr-2" />
                  Nezávazná konzultace
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-900 hover:bg-yellow-500 hover:text-white font-semibold"
                asChild
              >
                <Link href="/sluzby">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Naše služby
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              <div className="text-center">
                <Phone className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-white mb-2">Zavolejte nám</h3>
                <p className="text-blue-100 text-sm">+420 735 014 112</p>
              </div>
              <div className="text-center">
                <Mail className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-white mb-2">Napište nám</h3>
                <p className="text-blue-100 text-sm">obchod@sfera-domov.cz</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-white mb-2">Navštivte nás</h3>
                <p className="text-blue-100 text-sm">Nákladní 471/32, Opava</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
