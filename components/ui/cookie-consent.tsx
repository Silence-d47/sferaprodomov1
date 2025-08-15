"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const STORAGE_KEY = "cookie-consent-v1"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY)
      if (!value) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const acceptAll = () => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ necessary: true, analytics: true, marketing: true })) } catch {}
    setVisible(false)
  }

  const acceptNecessary = () => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ necessary: true, analytics: false, marketing: false })) } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="p-4 sm:p-6">
          <p className="text-sm text-slate-700">
            Tento web používá cookies pro zajištění správné funkčnosti a pro zlepšování služeb. Podrobnosti najdete v&nbsp;
            <Link href="/gdpr" className="underline hover:text-slate-900">Zásadách ochrany osobních údajů</Link>.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button variant="outline" className="border-slate-300" onClick={acceptNecessary}>Pouze nezbytné</Button>
            <Button className="bg-slate-900 hover:bg-slate-800" onClick={acceptAll}>Povolit vše</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


