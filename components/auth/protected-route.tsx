'use client'

import { useEffect } from 'react'
import { useAuth } from '../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { UserRole } from '../../lib/types/user'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Redirect to login if not authenticated
      if (!user) {
        router.push('/login')
        return
      }

      // Check if user has the required role
      if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
        // Redirect to appropriate dashboard based on role
        switch (userProfile.role) {
          case 'teacher':
            router.push('/teacher')
            break
          case 'student':
            router.push('/student')
            break
          case 'parent':
            router.push('/parent')
            break
          case 'admin':
            router.push('/admin')
            break
          default:
            router.push('/')
        }
      }
    }
  }, [user, userProfile, loading, allowedRoles, router])

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated or doesn't have permission
  if (!user || (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role))) {
    return null
  }

  return <>{children}</>
}
