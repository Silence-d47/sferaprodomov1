import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { TopBar } from "@/components/ui/top-bar"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { WelcomePopupProvider } from "@/components/welcome-popup-provider"
import { CookieConsent } from "@/components/ui/cookie-consent"
import { GoogleAnalytics } from "@/components/ui/google-analytics"
import { FacebookPixel } from "@/components/ui/facebook-pixel"
import { GoogleTagManager } from "@/components/ui/google-tag-manager"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Inter - moderní a čitelný webový font
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "SFERA - Klimatizace, Tepelná čerpadla, Rekuperace, Elektroinstalace",
  description:
    "Profesionální klimatizace, tepelná čerpadla a rekuperace. Nadstandardní servis, montáž do 14 dnů, 0% záloha na skladové zboží. Opava.",
  keywords: "klimatizace, tepelná čerpadla, rekuperace, elektroinstalace, servis, montáž, Opava",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-touch-icon.png",
  },
    
}

export default function RootLayout({
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
        <Analytics />
        <SpeedInsights />
        <ThemeProvider theme="default">
          <WelcomePopupProvider>
            <TopBar />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
            <CookieConsent />
          </WelcomePopupProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
