"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableFeaturesProps {
  features: string[]
}

export function ExpandableFeatures({ features }: ExpandableFeaturesProps) {
  const [showFeatures, setShowFeatures] = useState(false)
  
  if (!features || features.length === 0) return null
  
  return (
    <div className="mt-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowFeatures(!showFeatures)}
        className="w-full p-2 h-auto text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
      >
        <span className="mr-2">
          {showFeatures ? 'Skrýt' : 'Zobrazit'} další vlastnosti ({features.length})
        </span>
        {showFeatures ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
      
      {showFeatures && (
        <div className="mt-3 pt-3 border-t border-slate-200">
          <h5 className="text-xs font-semibold mb-2 text-slate-600">Další vlastnosti:</h5>
          <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start hover:text-slate-700 transition-colors duration-200">
                <span className="mr-1.5 sm:mr-2 mt-0.5 text-black group-hover:text-blue-500 transition-colors duration-300">•</span>
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
