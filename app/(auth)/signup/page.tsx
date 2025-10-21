'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { UserRole } from '../../../lib/types/user'
import { GoogleButton, GitHubButton } from '../../../components/auth/oauth-buttons'
import { OAuthRoleModal } from '../../../components/auth/oauth-role-modal'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [schoolCode, setSchoolCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle, signInWithGitHub, needsProfileSetup, userProfile } = useAuth()
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

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, displayName, role, schoolCode || undefined)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'teacher', label: 'Teacher', description: 'Award auras to students' },
    { value: 'student', label: 'Student', description: 'Collect and view auras' },
    { value: 'parent', label: 'Parent', description: 'View your children\'s auras' },
    { value: 'admin', label: 'School Admin', description: 'Manage school settings' },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">AuraChain</h1>
          <p className="mt-2 text-muted-foreground">From classroom to forever</p>
        </div>

        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Create Account</h2>
            <p className="text-sm text-muted-foreground">Join the AuraChain community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="displayName">Full Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Smith"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@school.edu"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="....."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Choose your role</Label>
              <div className="grid gap-2">
                {roles.map((roleOption) => (
                  <label
                    key={roleOption.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                      role === roleOption.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={roleOption.value}
                      checked={role === roleOption.value}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{roleOption.label}</div>
                      <div className="text-sm text-muted-foreground">{roleOption.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolCode">School Code (Optional)</Label>
              <Input
                id="schoolCode"
                type="text"
                placeholder="LINCOLN-2025"
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Enter your school's code to join their network</p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
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
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <OAuthRoleModal open={needsProfileSetup} />
    </div>
  )
}
