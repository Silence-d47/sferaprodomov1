"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Modal({ isOpen, onClose, children, title, size = "md" }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  }

  if (!mounted) return null

  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className={cn(
            "relative bg-white rounded-lg shadow-2xl w-full max-h-[90vh] overflow-y-auto",
            sizeClasses[size]
          )}>
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">{title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}

// Reference Detail Modal
interface ReferenceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  reference: {
    id: string
    title: string
    description: string
    image: string
    category: string
    location: string
    isTopReference?: boolean
    details?: {
      client?: string
      installed?: string
      capacity?: string
      savings?: string
      features?: string[]
    }
  }
}

export function ReferenceDetailModal({ isOpen, onClose, reference }: ReferenceDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={reference.title} size="lg">
      <div className="space-y-6">
        {/* Image */}
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={reference.image}
            alt={reference.title}
            fill
            className="object-cover"
          />
          {reference.isTopReference && (
            <Badge className="absolute top-4 right-4 bg-yellow-500">
              TOP REFERENCE
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">O projektu</h3>
              <p className="text-muted-foreground leading-relaxed">
                {reference.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Kategorie:</span>
                <Badge variant="secondary">{reference.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lokalita:</span>
                <span className="font-medium">{reference.location}</span>
              </div>
              {reference.details?.client && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Klient:</span>
                  <span className="font-medium">{reference.details.client}</span>
                </div>
              )}
              {reference.details?.installed && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Instalováno:</span>
                  <span className="font-medium">{reference.details.installed}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {reference.details?.capacity && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Technické údaje</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Výkon:</span>
                    <span className="font-medium">{reference.details.capacity}</span>
                  </div>
                  {reference.details?.savings && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Úspory:</span>
                      <span className="font-medium text-green-600">{reference.details.savings}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {reference.details?.features && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Vlastnosti</h3>
                <ul className="space-y-2">
                  {reference.details.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-6 border-t">
          <Button className="flex-1" asChild>
            <a href={`/reference/${reference.id}`}>
              Zobrazit detailní stránku
            </a>
          </Button>
          <Button variant="outline" onClick={onClose}>
            Zavřít
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// Datasheet Modal
interface DatasheetModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    category: string
    datasheetUrl?: string
    catalogUrl?: string
    features?: string[]
    specifications?: Record<string, string>
  }
}

export function DatasheetModal({ isOpen, onClose, product }: DatasheetModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Datasheet - ${product.name}`} size="lg">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">O produktu</h3>
              <p className="text-muted-foreground">
                {product.name} je špičkový produkt v kategorii {product.category}.
              </p>
            </div>

            {product.features && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Hlavní vlastnosti</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {product.specifications && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Technické specifikace</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Download buttons */}
        <div className="flex gap-4 pt-6 border-t">
          {product.datasheetUrl && (
            <Button className="flex-1" asChild>
              <a href={product.datasheetUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Stáhnout datasheet
              </a>
            </Button>
          )}
          {product.catalogUrl && (
            <Button variant="outline" className="flex-1" asChild>
              <a href={product.catalogUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Stáhnout katalog
              </a>
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Zavřít
          </Button>
        </div>
      </div>
    </Modal>
  )
} 