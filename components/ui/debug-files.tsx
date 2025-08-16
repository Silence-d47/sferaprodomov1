import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DebugFilesProps {
  product: {
    title: string
    catalogUrl?: string
    files?: Array<{
      _id: string
      title: string
      fileUrl: string
      fileType: string
    }>
  }
}

export function DebugFiles({ product }: DebugFilesProps) {
  return (
    <div className="border border-red-500 p-4 m-4 bg-red-50">
      <h3 className="font-bold text-red-700 mb-2">Debug: {product.title}</h3>
      
      <div className="mb-2">
        <strong>catalogUrl:</strong> {product.catalogUrl || "undefined"}
      </div>
      
      <div className="mb-2">
        <strong>files:</strong> {product.files ? `${product.files.length} souborů` : "undefined"}
      </div>
      
      {product.files && product.files.length > 0 && (
        <div className="mb-2">
          <strong>Detaily souborů:</strong>
          <ul className="ml-4">
            {product.files.map((file) => (
              <li key={file._id}>
                - {file.title} ({file.fileType}): {file.fileUrl}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4">
        <strong>Testovací tlačítka:</strong>
        <div className="flex gap-2 mt-2">
          {product.catalogUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={product.catalogUrl} download target="_blank" rel="noopener noreferrer">
                Test catalogUrl
              </a>
            </Button>
          )}
          
          {product.files && product.files.map((file) => (
            <Button key={file._id} size="sm" variant="outline" asChild>
              <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                Test {file.fileType}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
