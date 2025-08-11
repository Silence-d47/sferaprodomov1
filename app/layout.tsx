import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { TopBar } from "@/components/ui/top-bar"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SFERA - Klimatizace, Tepelná čerpadla, Rekuperace, Elektroinstalace",
  description:
    "Profesionální klimatizace, tepelná čerpadla a rekuperace. Nadstandardní servis, montáž do 14 dnů, 0% záloha na skladové zboží. Opava.",
  keywords: "klimatizace, tepelná čerpadla, rekuperace, elektroinstalace, servis, montáž, Opava",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider theme="default">
          <TopBar />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
