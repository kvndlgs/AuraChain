'use client'

import { ReactNode } from 'react'
import { useAuth } from '../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  Award,
  Settings,
  LogOut,
  School,
  BookOpen,
  BarChart3,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  icon: ReactNode
}

interface DashboardLayoutProps {
  children: ReactNode
  navItems: NavItem[]
  title: string
}

export function DashboardLayout({ children, navItems, title }: DashboardLayoutProps) {
  const { userProfile, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (!userProfile) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between border-b p-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex">
                 <img src='/aura-icon.webp' alt='aura' className='w-14 p-1' />
              </div>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                {userProfile.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">{userProfile.displayName}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{userProfile.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Settings & Logout */}
          <div className="border-t p-4">
            <div className="space-y-1">
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b bg-card px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>

          {userProfile.schoolId && (
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <School className="h-4 w-4" />
              <span>{userProfile.schoolId}</span>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

export const teacherNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/teacher', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Students', href: '/teacher/students', icon: <Users className="h-4 w-4" /> },
  { label: 'Award Auras', href: '/teacher/award', icon: <Award className="h-4 w-4" /> },
  { label: 'My Classes', href: '/teacher/classes', icon: <BookOpen className="h-4 w-4" /> },
  { label: 'Analytics', href: '/teacher/analytics', icon: <BarChart3 className="h-4 w-4" /> },
]

export const studentNavItems: NavItem[] = [
  { label: 'My Collection', href: '/student', icon: <Award className="h-4 w-4" /> },
  { label: 'Dashboard', href: '/student/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Achievements', href: '/student/achievements', icon: <BarChart3 className="h-4 w-4" /> },
]

export const parentNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/parent', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Children', href: '/parent/children', icon: <Users className="h-4 w-4" /> },
  { label: 'Achievements', href: '/parent/achievements', icon: <Award className="h-4 w-4" /> },
]

export const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'NFT Collection', href: '/admin/collection', icon: <Award className="h-4 w-4" /> },
  { label: 'Schools', href: '/admin/schools', icon: <School className="h-4 w-4" /> },
  { label: 'Teachers', href: '/admin/teachers', icon: <Users className="h-4 w-4" /> },
  { label: 'Students', href: '/admin/students', icon: <Users className="h-4 w-4" /> },
  { label: 'Aura Types', href: '/admin/auras', icon: <Award className="h-4 w-4" /> },
  { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-4 w-4" /> },
]
