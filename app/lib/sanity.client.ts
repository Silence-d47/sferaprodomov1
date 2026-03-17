import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Types
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface BlogPost extends SanityDocument {
  _type: 'post'
  slug: { current: string }
  publishedAt?: string
  title: string
}

export interface ProjectReference extends SanityDocument {
  _type: 'projectReference'
  slug: { current: string }
  title: string
}
