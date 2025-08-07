import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title,
    excerpt
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title,
    body
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    description
  }
`

export const authorsQuery = groq`
  *[_type == "author"] {
    _id,
    name,
    slug,
    image,
    bio
  }
` 