import { client } from './lib/sanity.client';
import { groq } from 'next-sanity';
import type { MetadataRoute } from 'next';

const baseUrl = 'https://sfera-domov.cz';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntry {
  url: string;
  lastModified: Date | string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

interface BlogPostSitemap {
  _updatedAt: string;
  publishedAt?: string;
  slug: {
    current: string;
  };
}

interface ReferencePageSitemap {
  _updatedAt: string;
  _createdAt: string;
  slug: {
    current: string;
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with their respective priorities and change frequencies
  const staticPages: SitemapEntry[] = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/klimatizace`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fotovoltaika`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/elektroinstalace`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reference`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];

  try {
    // Fetch blog posts
    const blogPosts = await client.fetch<BlogPostSitemap[]>(
      groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
        _updatedAt,
        publishedAt,
        slug
      }`
    );

    // Fetch reference projects
    const referencePages = await client.fetch<ReferencePageSitemap[]>(
      groq`*[_type == "projectReference" && defined(slug.current) && !(_id in path("drafts.**"))]{
        _updatedAt,
        _createdAt,
        slug
      }`
    );

    // Map blog posts to sitemap entries
    const blogEntries: SitemapEntry[] = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || new Date().toISOString()),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    // Map reference projects to sitemap entries
    const referenceEntries: SitemapEntry[] = referencePages.map((ref) => ({
      url: `${baseUrl}/reference/${ref.slug.current}`,
      lastModified: new Date(ref._updatedAt || ref._createdAt || new Date().toISOString()),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    return [...staticPages, ...blogEntries, ...referenceEntries];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static pages in case of error
    return staticPages;
  }
}
