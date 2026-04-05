import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

const builder = imageUrlBuilder(client)

interface CropData {
  x: number
  y: number
  width: number
  height: number
}

interface ImageWithCrops {
  url?: string
  ref?: string
  deviceCrops?: Record<string, CropData>
}

function parseDimensions(ref: string): { width: number; height: number } | null {
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (!match) {
    return null
  }
  return { width: parseInt(match[1]), height: parseInt(match[2]) }
}

function cropHash(crop: CropData): string {
  return btoa(`${crop.x},${crop.y},${crop.width},${crop.height}`).slice(0, 8)
}

/**
 * Returns an optimized, cropped image URL for a given crop key.
 * Falls back to the original image URL if no crop is set.
 * Appends a hash of crop params for cache busting.
 */
export function getCroppedImageUrl(
  image: ImageWithCrops,
  cropKey: string,
  width: number,
): string | null {
  if (!image.ref) {
    return image.url || null
  }

  const crop = image.deviceCrops?.[cropKey]
  const dims = parseDimensions(image.ref)

  if (!crop || !dims || crop.width <= 0) {
    return builder.image(image.ref).width(width).auto('format').url()
  }

  const left = Math.round((dims.width * crop.x) / 100)
  const top = Math.round((dims.height * crop.y) / 100)
  const cropW = Math.round((dims.width * crop.width) / 100)
  const cropH = Math.round((dims.height * crop.height) / 100)

  const url = builder
    .image(image.ref)
    .rect(left, top, cropW, cropH)
    .width(width)
    .auto('format')
    .url()

  return `${url}&v=${cropHash(crop)}`
}
