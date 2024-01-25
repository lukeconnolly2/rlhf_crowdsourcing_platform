import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import QueryProvider from "@/providers/query-provider"
import { UserProvider } from "@/providers/user-context"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#6d27d9",
          },
        }}
      >
        <UserProvider>
          <QueryProvider>
            <html lang="en" className="scroll-smooth" suppressHydrationWarning>
              <head />
              <body
                className={cn(
                  "min-h-screen bg-background font-sans antialiased",
                  fontSans.variable
                )}
              >
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <div className="flex-1">{children}</div>
                  </div>
                  <TailwindIndicator />
                </ThemeProvider>
              </body>
            </html>
          </QueryProvider>
        </UserProvider>
      </ClerkProvider>
    </>
  )
}
