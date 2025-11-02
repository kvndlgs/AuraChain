'use client'

import { ProtectedRoute } from '../../components/auth/protected-route'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

import { AppSidebar } from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-screen bg-background">
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
