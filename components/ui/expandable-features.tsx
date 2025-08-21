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
        className="w-full p-3 h-auto text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 font-medium rounded-lg border border-blue-100 hover:border-blue-200"
      >
        <span className="mr-2">
          {showFeatures ? 'Skrýt' : 'Zobrazit'} další vlastnosti ({features.length})
        </span>
        {showFeatures ? (
          <ChevronUp className="h-4 w-4 transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-4 w-4 transition-transform duration-300" />
        )}
      </Button>
      
      {showFeatures && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-sm font-semibold mb-3 text-gray-700 uppercase tracking-wide">Další vlastnosti:</h5>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start group hover:bg-gray-50 p-2 rounded-lg transition-all duration-200">
                <span className="mr-3 mt-1 text-blue-500 group-hover:text-blue-600 transition-colors duration-200 flex-shrink-0">
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </span>
                <span className="leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors duration-200 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
