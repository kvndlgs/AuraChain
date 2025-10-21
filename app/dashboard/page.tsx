'use client'

import { useEffect } from 'react'
import { useAuth } from '../../contexts/auth-context'
import { useRouter } from 'next/navigation'

export default function DashboardRedirect() {
  const { userProfile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && userProfile) {
      // Redirect to role-specific dashboard
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
    } else if (!loading && !userProfile) {
      router.push('/login')
    }
  }, [userProfile, loading, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
