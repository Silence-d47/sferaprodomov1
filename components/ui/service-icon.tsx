import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceIconProps {
  icon: LucideIcon
  className?: string
}

export function ServiceIcon({ icon: Icon, className }: ServiceIconProps) {
  return (
    <div className={cn("flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary", className)}>
      <Icon className="h-6 w-6" />
    </div>
  )
}
