import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@/components/ui/google-analytics"
import { FacebookPixel } from "@/components/ui/facebook-pixel"
import { GoogleTagManager } from "@/components/ui/google-tag-manager"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sanity Studio - SFERA PRO DOMOV",
  description: "Content management system pro SFERA PRO DOMOV",
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <GoogleAnalytics />
        <FacebookPixel />
        <GoogleTagManager />
        <ThemeProvider theme="default">
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
