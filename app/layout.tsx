import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '../components/app-providers'
import { AppLayout } from '../components/app-layout'
import React from 'react'

export const metadata: Metadata = {
  title: 'AuraChain',
  description: 'Blockchain-powered student recognition platform',
  openGraph: {
    title: 'AuraChain',
    description: 'Blockchain-powered student recognition platform',
    url: 'https://aura-chain.vercel.app',
    siteName: 'AuraChain',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AuraChain',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraChain',
    description: 'Blockchain-powered student recognition platform',
    images: ['/og-image.png'],
  },
}

const links: { label: string; path: string }[] = [
  // More links...
  { label: 'Home', path: '/' },
  { label: 'Account', path: '/account' },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased font-sans`}>
        <AppProviders>
          <AppLayout links={links}>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}
// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
