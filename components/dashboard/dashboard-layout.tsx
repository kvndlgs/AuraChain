'use client'

import { ReactNode } from 'react'
import { useAuth } from '../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Link from 'next/link'
import { LayoutDashboard, Users, Award, Settings, LogOut, School, BookOpen, BarChart3, Menu, X } from 'lucide-react'
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
    <div className="flex h-screen bg-background w-full">
      {/* Mobile sidebar backdrop */}

      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        {/* Top Bar */}
        <header className="flex items-center justify-between border-b bg-card px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
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
        <main className="flex-1 overflow-y-auto p-4 lg:p-2">{children}</main>
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
