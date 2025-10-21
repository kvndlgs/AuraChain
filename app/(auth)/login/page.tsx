'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { GoogleButton, GitHubButton } from '../../../components/auth/oauth-buttons'
import { OAuthRoleModal } from '../../../components/auth/oauth-role-modal'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle, signInWithGitHub, needsProfileSetup, userProfile } = useAuth()
  const router = useRouter()

  // Redirect to dashboard if already logged in with complete profile
  useEffect(() => {
    if (userProfile && !needsProfileSetup) {
      router.push('/dashboard')
    }
  }, [userProfile, needsProfileSetup, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">AuraChain</h1>
          <p className="mt-2 text-muted-foreground">From classroom to forever</p>
        </div>

        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="teacher@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="....."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="space-y-2">
            <GoogleButton onClick={signInWithGoogle} disabled={loading} />
            <GitHubButton onClick={signInWithGitHub} disabled={loading} />
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <OAuthRoleModal open={needsProfileSetup} />
    </div>
  )
}
