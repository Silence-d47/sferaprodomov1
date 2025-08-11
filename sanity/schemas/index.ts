import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import product from './product'
import reference from './reference'
import heroSlide from './heroSlide'
import featureCard from './featureCard'
import logoPartner from './logoPartner'
import service from './service'
import faq from './faq'
import testimonial from './testimonial'
import siteSettings from './siteSettings'
import fileAsset from './file'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    blockContent,
    product,
    reference,
    heroSlide,
    featureCard,
    logoPartner,
    service,
    faq,
    testimonial,
    siteSettings,
    fileAsset,
  ],
}
