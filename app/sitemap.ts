import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import type { MetadataRoute } from 'next';

// Create a separate client for sitemap with explicit configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false, // Disable CDN for sitemap to ensure fresh data
  token: process.env.SANITY_API_TOKEN,
});

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
    console.log('Starting sitemap generation');
    console.log('Sanity project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'set' : 'missing');
    console.log('Sanity dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'defaulting to production');

    // Fetch blog posts
    const blogQuery = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
      _updatedAt,
      publishedAt,
      slug
    }`;
    
    console.log('Fetching blog posts...');
    const blogPosts = await client.fetch<BlogPostSitemap[]>(blogQuery);
    console.log(`Fetched ${blogPosts.length} blog posts`);

    // Fetch reference projects
    const referenceQuery = groq`*[_type == "projectReference" && defined(slug.current) && !(_id in path("drafts.**"))]{
      _updatedAt,
      _createdAt,
      slug
    }`;
    
    console.log('Fetching reference pages...');
    const referencePages = await client.fetch<ReferencePageSitemap[]>(referenceQuery);
    console.log(`Fetched ${referencePages.length} reference pages`);

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
    console.error('Error generating sitemap:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Log environment info for debugging
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Sanity config:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'set' : 'missing',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'defaulting to production',
    });
    
    // Return only static pages in case of error
    return staticPages;
  }
}
