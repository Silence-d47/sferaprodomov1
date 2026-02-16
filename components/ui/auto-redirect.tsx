"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AutoRedirectProps {
  to: string
  seconds: number
}

export function AutoRedirect({ to, seconds }: AutoRedirectProps) {
  const router = useRouter()
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    setRemaining(seconds)

    const interval = window.setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)

    const timeout = window.setTimeout(() => {
      router.replace(to)
    }, seconds * 1000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [router, seconds, to])

  return (
    <p className="text-center text-sm text-slate-600 dark:text-slate-300">
      Za {remaining} s budete přesměrováni na úvodní stránku.
    </p>
  )
}

