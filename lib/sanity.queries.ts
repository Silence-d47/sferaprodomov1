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

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $category] {
    _id,
    title,
    description,
    image,
    features,
    isRecommended,
    isBestSelling,
    catalogUrl,
    "files": files[]->{
      _id,
      title,
      "fileUrl": file.asset->url,
      fileType
    }
  }
`

export const bestSellingProductsQuery = groq`
  *[_type == "product" && category->slug.current == $category && isBestSelling == true] | order(_createdAt desc)[0...12] {
    _id,
    title,
    description,
    image,
    features,
    isRecommended,
    isBestSelling,
    catalogUrl,
    "files": files[]->{
      _id,
      title,
      fileType,
      "fileUrl": file.asset->url
    }
  }
`

// Správný způsob pro získání URL souboru v Sanity
export const productsByCategoryWithFilesQuery = groq`
  *[_type == "product" && category->slug.current == $category] {
    _id,
    title,
    description,
    image,
    features,
    isRecommended,
    isBestSelling,
    catalogUrl,
    energyClass,
    specifications,
    price,
    warranty,
    "brand": brand->title,
    "files": files[]->{
      _id,
      title,
      fileType,
      "fileUrl": file.asset->url
    }
  }
`

export const heroSlidesQuery = groq`
  *[_type == "heroSlide" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    "bgImage": bgImage.asset->url,
    features,
    phoneNumber,
    primaryButton {
      text,
      link,
      isActive
    },
    secondaryButton {
      text,
      link,
      isActive
    },
    slideType,
    order,
    isActive
  }
`