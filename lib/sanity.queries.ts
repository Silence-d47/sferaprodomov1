import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title,
    excerpt,
    readingTime
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
    excerpt,
    body,
    readingTime
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

export const employeesQuery = groq`
  *[_type == "employee" && isActive == true] | order(order asc, name asc) {
    _id,
    name,
    position,
    image,
    phone,
    email,
    isDirector
  }
`