import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serverClient } from '@/lib/sanity.client';
import { bodyProjection, postsQuery } from '@/lib/sanity.queries';
import { BASE_URL } from '@/lib/constants';
import { groq } from 'next-sanity';
import BlogPostDetail from './blog-post-detail';
import type { PostData } from './blog-post-detail';

export const revalidate = 3600;

const postDetailQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "mainImageRef": mainImage.asset._ref,
    "mainImageCrops": mainImage.deviceCrops,
    "author": author->name,
    "categories": categories[]->title,
    excerpt,
    ${bodyProjection},
    readingTime,
    keywords,
    seo
  }
`;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fetchOpts = { next: { tags: ['posts'] } };
  const data = await serverClient.fetch<PostData | null>(postDetailQuery, { slug }, fetchOpts);

  if (!data) {
    return { title: 'Článek nenalezen' };
  }

  const canonical = `${BASE_URL}/blog/${slug}`;
  const title = data.seo?.metaTitle || data.title || 'Blog';
  const description = data.seo?.metaDescription || data.excerpt || '';

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: data.mainImage ? [data.mainImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const fetchOpts = { next: { tags: ['posts'] } };

  const [post, allPosts] = await Promise.all([
    serverClient.fetch<PostData | null>(postDetailQuery, { slug }, fetchOpts),
    serverClient.fetch<PostData[]>(postsQuery, {}, fetchOpts),
  ]);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} allPosts={allPosts || []} />;
}
