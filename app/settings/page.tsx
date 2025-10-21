'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Settings, User, School, Wallet, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { UserRole } from '../../lib/types/user'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../../components/solana/solana-provider'

export default function SettingsPage() {
  const { userProfile, logout } = useAuth()
  const router = useRouter()
  const { publicKey, connected } = useWallet()
  const [updating, setUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')
  const [walletSaved, setWalletSaved] = useState(false)

  // Sync wallet address to Firestore when wallet connects
  useEffect(() => {
    const syncWalletAddress = async () => {
      if (connected && publicKey && userProfile) {
        const walletAddress = publicKey.toBase58()

        // Only update if the wallet address has changed
        if (userProfile.walletAddress !== walletAddress) {
          try {
            const userDocRef = doc(db, 'users', userProfile.uid)
            await updateDoc(userDocRef, {
              walletAddress: walletAddress
            })
            setWalletSaved(true)
            setTimeout(() => setWalletSaved(false), 3000)
          } catch (error) {
            console.error('Error saving wallet address:', error)
          }
        }
      }
    }

    syncWalletAddress()
  }, [connected, publicKey, userProfile])

  if (!userProfile) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const handleUpdateRole = async (newRole: UserRole) => {
    if (!userProfile) return

    setUpdating(true)
    setUpdateMessage('')

    try {
      const userDocRef = doc(db, 'users', userProfile.uid)
      await updateDoc(userDocRef, {
        role: newRole
      })
      setUpdateMessage('Role updated! Please refresh the page.')
      setTimeout(() => {
        window.location.href = `/${newRole}`
      }, 1500)
    } catch (error) {
      console.error('Error updating role:', error)
      setUpdateMessage('Failed to update role')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/${userProfile.role}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="rounded-lg border bg-card">
            <div className="border-b p-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Profile Information</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={userProfile.displayName} disabled />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={userProfile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={userProfile.role} disabled className="capitalize" />
              </div>
            </div>
          </div>

          {/* School Information */}
          {userProfile.schoolId && (
            <div className="rounded-lg border bg-card">
              <div className="border-b p-6">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">School Information</h2>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label>School Code</Label>
                  <Input value={userProfile.schoolId} disabled />
                </div>
              </div>
            </div>
          )}

          {/* Wallet */}
          <div className="rounded-lg border bg-card">
            <div className="border-b p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Solana Wallet</h2>
                </div>
                {connected && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Connected
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4 p-6">
              {walletSaved && (
                <div className="rounded-md bg-green-500/15 p-3 text-sm text-green-600">
                  Wallet address saved to your profile!
                </div>
              )}

              {connected && publicKey ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Connected Wallet Address</Label>
                    <Input value={publicKey.toBase58()} disabled />
                  </div>
                  <div className="flex justify-between items-center rounded-lg border bg-muted/50 p-4">
                    <div>
                      <p className="text-sm font-medium">Wallet Connection</p>
                      <p className="text-xs text-muted-foreground">Your wallet is connected and ready to receive NFTs</p>
                    </div>
                    <WalletButton />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="rounded-lg border bg-muted/50 p-8">
                    <Wallet className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <p className="mt-4 font-medium">No wallet connected</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Connect your Solana wallet to receive NFT auras
                    </p>
                    <div className="mt-6">
                      <WalletButton />
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Your wallet address will be automatically saved to your profile when you connect.
                  This allows teachers to award NFT auras directly to your wallet.
                </p>
              </div>
            </div>
          </div>

          {/* Dev Tools - Role Switcher */}
          <div className="rounded-lg border border-yellow-500/50 bg-card">
            <div className="border-b bg-yellow-500/10 p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold">Development Tools</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground">
                Switch your role for testing purposes. Current role: <strong className="capitalize">{userProfile.role}</strong>
              </p>
              {updateMessage && (
                <div className="mt-4 rounded-md bg-primary/15 p-3 text-sm text-primary">
                  {updateMessage}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant={userProfile.role === 'teacher' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateRole('teacher')}
                  disabled={updating || userProfile.role === 'teacher'}
                >
                  Switch to Teacher
                </Button>
                <Button
                  variant={userProfile.role === 'student' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateRole('student')}
                  disabled={updating || userProfile.role === 'student'}
                >
                  Switch to Student
                </Button>
                <Button
                  variant={userProfile.role === 'parent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateRole('parent')}
                  disabled={updating || userProfile.role === 'parent'}
                >
                  Switch to Parent
                </Button>
                <Button
                  variant={userProfile.role === 'admin' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateRole('admin')}
                  disabled={updating || userProfile.role === 'admin'}
                >
                  Switch to Admin
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-lg border border-destructive/50 bg-card">
            <div className="border-b p-6">
              <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground">
                Once you log out, you'll need to sign in again to access your account.
              </p>
              <Button variant="destructive" className="mt-4" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
