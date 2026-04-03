import { groq } from 'next-sanity'

export const heroSlidesQuery = groq`
  *[_type == "heroSlide" && isActive == true] | order(order asc) {
    "id": _id,
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

// Blog queries
export const postsQuery = groq`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "mainImageRef": mainImage.asset._ref,
    "mainImageCrops": mainImage.deviceCrops,
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
    subtitle,
    slug,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "author": author->name,
    "categories": categories[]->title,
    excerpt,
    "body": body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "youtube" => {
        ...,
        "posterImage": posterImage{
          ...,
          "url": asset->url
        }
      }
    },
    readingTime,
    keywords,
    seo
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

// Reference queries
export const projectReferencesQuery = groq`
  *[_type == "projectReference"] | order(_createdAt desc) {
    _id,
    title,
    subtitle,
    slug,
    description,
    "image": image.asset->url,
    "imageRef": image.asset._ref,
    "deviceCrops": image.deviceCrops,
    "gallery": gallery[]{
      "url": asset->url,
      "alt": alt
    },
    category,
    location,
    year,
    rating,
    highlights,
    savings,
    isFeatured,
    isTopReference,
    _createdAt
  }
`

export const featuredReferencesQuery = groq`
  *[_type == "projectReference" && isTopReference == true] | order(_createdAt desc)[0...6] {
    _id,
    title,
    subtitle,
    slug,
    description,
    "image": image.asset->url,
    "imageRef": image.asset._ref,
    "deviceCrops": image.deviceCrops,
    "gallery": gallery[]{
      "url": asset->url,
      "alt": alt
    },
    category,
    location,
    year,
    rating,
    highlights,
    savings,
    isFeatured,
    isTopReference,
    _createdAt
  }
`

export const referenceBySlugQuery = groq`
  *[_type == "projectReference" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    description,
    "image": image.asset->url,
    youtubeUrl,
    "gallery": gallery[]{
      "url": asset->url,
      "alt": alt
    },
    "body": body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "youtube" => {
        ...,
        "posterImage": posterImage{
          ...,
          "url": asset->url
        }
      }
    },
    category,
    location,
    year,
    rating,
    highlights,
    savings,
    isFeatured,
    isTopReference,
    seo,
    _createdAt
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
    "imageRef": image.asset._ref,
    "imageCrops": image.deviceCrops,
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

// Reference page hero video
export const referenceHeroVideoQuery = groq`
  *[_type == "referencePageSettings"][0] {
    "videoWebm": videoWebm.asset->url,
    "videoMp4": videoMp4.asset->url,
    "posterImage": posterImage.asset->url,
    videoOpacity
  }
`

// Správný způsob pro získání URL souboru v Sanity
export const productsByCategoryWithFilesQuery = groq`
  *[_type == "product" && category->slug.current == $category] {
    _id,
    title,
    description,
    image,
    "imageRef": image.asset._ref,
    "imageCrops": image.deviceCrops,
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

// Service catalog (PDF downloads per service)
export const serviceCatalogQuery = groq`
  *[_type == "serviceCatalog" && service == $service][0]{
    title,
    "fileUrl": catalogFile.asset->url
  }
`
