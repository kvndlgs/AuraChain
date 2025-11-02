import { ThemeProvider } from './theme-provider'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

import { Toaster } from './ui/sonner'
import { AppHeader } from '../components/app-header'
import React from 'react'
import { AppFooter } from '../components/app-footer'
import { ClusterChecker } from '../components/cluster/cluster-ui'
import { AccountChecker } from '../components/account/account-ui'
import { cookies } from 'next/headers'

export async function AppLayout({
  children,
  links,
}: {
  children: React.ReactNode
  links: { label: string; path: string }[]
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex flex-col min-h-screen">
          <AppHeader links={links} />
          <main className="grow container mx-auto p-4">
            <SidebarTrigger />
            <ClusterChecker>
              <AccountChecker />
            </ClusterChecker>
            {children}
          </main>
          <AppFooter />
        </div>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  )
}
