import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Final Year Project',
  description: 'Luke Connolly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className='scroll-smooth'>
        <body className={inter.className}>
          <NavBar/>
          <div className='ml-32'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
