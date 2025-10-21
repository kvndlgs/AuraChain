'use client'

import { useAuth } from '../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export function DashboardFeature() {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && userProfile) {
      // Redirect authenticated users to their dashboard
      router.push('/dashboard')
    }
  }, [user, userProfile, loading, router])

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">AuraChain</h1>
        <p className="mb-2 text-xl text-muted-foreground">From classroom to forever</p>
        <p className="mb-12 text-lg text-muted-foreground">
          Digital achievement badges that teachers award, kids collect, and own on the blockchain
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-2 text-3xl">⭐</div>
            <h3 className="mb-2 font-semibold">For Teachers</h3>
            <p className="text-sm text-muted-foreground">Award meaningful, permanent achievements to your students</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-2 text-3xl">🎨</div>
            <h3 className="mb-2 font-semibold">For Students</h3>
            <p className="text-sm text-muted-foreground">Collect and showcase your accomplishments forever</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-2 text-3xl">🔗</div>
            <h3 className="mb-2 font-semibold">Blockchain Verified</h3>
            <p className="text-sm text-muted-foreground">Every achievement is a unique NFT on Solana</p>
          </div>
        </div>
      </div>
    </div>
  )
}
