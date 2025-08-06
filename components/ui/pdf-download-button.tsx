"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface PDFDownloadButtonProps {
  url: string
  filename: string
  title?: string
  className?: string
  onClick?: () => void
  height?: string
}

export function PDFDownloadButton({
  url,
  filename,
  title = "Stáhnout katalog",
  className,
  onClick,
  height = "h-4 w-4",
}: PDFDownloadButtonProps) {
  const handleDownload = () => {
    // Analytics tracking
    if (onClick) {
      onClick()
    }

    // Download logic
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className={cn("gap-1 border-primary/20 hover:bg-primary/5 text-xs", className)}
    >
      <Download className={height} />
      {title}
    </Button>
  )
}
