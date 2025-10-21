'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/auth-context'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { UserRole } from '../../lib/types/user'

interface OAuthRoleModalProps {
  open: boolean
}

export function OAuthRoleModal({ open }: OAuthRoleModalProps) {
  const [role, setRole] = useState<UserRole>('student')
  const [schoolCode, setSchoolCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { completeOAuthProfile } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await completeOAuthProfile(role, schoolCode || undefined)
      // Profile is set, modal will close automatically via state update
    } catch (err: any) {
      setError(err.message || 'Failed to complete profile')
      setLoading(false)
    }
  }

  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'teacher', label: 'Teacher', description: 'Award auras to students' },
    { value: 'student', label: 'Student', description: 'Collect and view auras' },
    { value: 'parent', label: 'Parent', description: "View your children's auras" },
    { value: 'admin', label: 'School Admin', description: 'Manage school settings' },
  ]

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>Tell us a bit more about yourself to get started</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

          <div className="space-y-2">
            <Label>Choose your role</Label>
            <div className="grid gap-2">
              {roles.map((roleOption) => (
                <label
                  key={roleOption.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                    role === roleOption.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent'
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
            <Label htmlFor="schoolCode">School Code</Label>
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
            {loading ? 'Setting up...' : 'Complete Setup'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
