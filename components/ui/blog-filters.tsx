"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Snowflake, 
  Zap, 
  Wind, 
  Wrench, 
  Sun,
  X
} from "lucide-react"

interface BlogCategory {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface BlogFiltersProps {
  categories: BlogCategory[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  className?: string
}

const defaultCategories: BlogCategory[] = [
  {
    id: "klimatizace",
    name: "Klimatizace",
    icon: Snowflake,
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200"
  },
  {
    id: "tepelna-cerpadla",
    name: "Tepelná čerpadla",
    icon: Zap,
    color: "bg-green-100 text-green-800 hover:bg-green-200"
  },
  {
    id: "rekuperace",
    name: "Rekuperace",
    icon: Wind,
    color: "bg-purple-100 text-purple-800 hover:bg-purple-200"
  },
  {
    id: "elektroinstalace",
    name: "Elektroinstalace",
    icon: Wrench,
    color: "bg-orange-100 text-orange-800 hover:bg-orange-200"
  },
  {
    id: "fotovoltaika",
    name: "Fotovoltaika",
    icon: Sun,
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
  }
]

export function BlogFilters({ 
  categories = defaultCategories,
  selectedCategories, 
  onCategoryChange,
  className 
}: BlogFiltersProps) {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const clearAllFilters = () => {
    onCategoryChange([])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtrovat podle zaměření</h3>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Vymazat filtry
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategories.includes(category.id)
          
          return (
            <Badge
              key={category.id}
              variant={isSelected ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : category.color
              }`}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <Icon className="h-4 w-4 mr-1" />
              {category.name}
            </Badge>
          )
        })}
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Zobrazeno {selectedCategories.length} aktivních filtrů
        </div>
      )}
    </div>
  )
}

// Hook for managing blog filters
export function useBlogFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  return {
    selectedCategories,
    toggleCategory,
    clearFilters,
    setSelectedCategories
  }
} 