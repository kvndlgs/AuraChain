'use client'

import { ThemeProvider } from '../components/theme-provider'
import { ReactQueryProvider } from './react-query-provider'
import { ClusterProvider } from '../components/cluster/cluster-data-access'
import { SolanaProvider } from '../components/solana/solana-provider'
import { AuthProvider } from '../contexts/auth-context'
import React from 'react'

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClusterProvider>
            <SolanaProvider>{children}</SolanaProvider>
          </ClusterProvider>
        </ThemeProvider>
      </AuthProvider>
    </ReactQueryProvider>
  )
}
