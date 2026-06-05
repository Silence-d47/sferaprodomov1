import { serverClient } from '@/lib/sanity.client';
import {
  featuredReferencesQuery,
  projectReferencesQuery,
  referenceHeroVideoQuery,
} from '@/lib/sanity.queries';
import { getCroppedImageUrl } from '@/lib/sanity.image-crops';
import { truncateText } from '@/lib/utils';
import {
  ReferenceClient,
  type FeaturedReference,
  type ListReference,
  type HeroVideo,
} from './reference-client';

// ISR fallback if webhook fails
export const revalidate = 3600;

type CropData = { x: number; y: number; width: number; height: number };

interface SanityRef {
  _id: string;
  slug?: { current: string };
  title: string;
  description?: string;
  bodyPreview?: string;
  image: string;
  imageRef?: string;
  deviceCrops?: Record<string, CropData>;
  gallery?: Array<{ url: string; alt?: string }>;
  category: string;
  location?: string;
  year?: string;
  rating?: number;
  highlights?: string[];
  savings?: string;
  _createdAt?: string;
}

export default async function ReferencePage() {
  const fetchOpts = { next: { tags: ['references'] } };

  const [featured, other, heroSettings] = await Promise.all([
    serverClient.fetch<SanityRef[]>(featuredReferencesQuery, {}, fetchOpts),
    serverClient.fetch<SanityRef[]>(projectReferencesQuery, {}, fetchOpts),
    serverClient.fetch<HeroVideo | null>(referenceHeroVideoQuery, {}, fetchOpts),
  ]);

  const imgData = (ref: SanityRef) => ({
    url: ref.image,
    ref: ref.imageRef,
    deviceCrops: ref.deviceCrops,
  });

  const featuredReferences: FeaturedReference[] = (featured || []).map((ref) => ({
    id: ref.slug?.current || ref._id,
    title: ref.title,
    description: truncateText(ref.bodyPreview || ref.description),
    image: getCroppedImageUrl(imgData(ref), 'slider', 800) || ref.image,
    category: ref.category,
    location: ref.location,
    year: ref.year,
    rating: ref.rating,
    highlights: ref.highlights,
    savings: ref.savings,
  }));

  const otherReferences: ListReference[] = (other || []).map((ref) => ({
    id: ref.slug?.current || ref._id,
    title: ref.title,
    description: truncateText(ref.bodyPreview || ref.description),
    image: getCroppedImageUrl(imgData(ref), 'card', 600) || ref.image,
    category: ref.category,
    location: ref.location,
    year: ref.year,
    rating: ref.rating,
    createdAt: ref._createdAt,
  }));

  return (
    <ReferenceClient
      featuredReferences={featuredReferences}
      otherReferences={otherReferences}
      heroVideo={heroSettings ?? null}
    />
  );
}
