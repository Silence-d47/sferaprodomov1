import { client } from './sanity.client'

export interface SanityFile {
  _id: string
  title: string
  fileUrl: string
  fileType: string
}

export function getFileUrl(fileAsset: any): string | null {
  if (!fileAsset || !fileAsset.file || !fileAsset.file.asset) {
    return null
  }
  
  // Pro soubory v Sanity se používá asset->url
  return fileAsset.file.asset.url
}

export async function getProductFiles(productId: string): Promise<SanityFile[]> {
  const query = `*[_type == "product" && _id == $productId][0] {
    "files": files[]->{
      _id,
      title,
      "fileUrl": file.asset->url,
      fileType
    }
  }`
  
  const result = await client.fetch(query, { productId })
  return result?.files || []
}
