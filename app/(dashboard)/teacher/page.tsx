'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout, teacherNavItems } from '../../../components/dashboard/dashboard-layout'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'
import { Award, Users, BookOpen, TrendingUp, Plus, Loader2, ExternalLink } from 'lucide-react'
import { useAuth } from '../../../contexts/auth-context'
import { getTeacherAwardedAuras, calculateTeacherStats } from '../../../services/teacherAuraService'
import { AwardedAura } from '../../../lib/types/aura'
import { formatDistanceToNow } from 'date-fns'

export default function TeacherDashboard() {
  const { userProfile } = useAuth()
  const [auras, setAuras] = useState<AwardedAura[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, thisWeek: 0, uniqueStudents: 0 })

  useEffect(() => {
    async function loadAuras() {
      if (!userProfile?.uid) return

      setLoading(true)
      try {
        const fetchedAuras = await getTeacherAwardedAuras(userProfile.uid, 5)
        setAuras(fetchedAuras)
        setStats(calculateTeacherStats(fetchedAuras))
      } catch (error) {
        console.error('Error loading auras:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAuras()
  }, [userProfile])

  return (
    <DashboardLayout navItems={teacherNavItems} title="Dashboard">
      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Auras</p>
                <p className="mt-2 text-3xl font-bold">
                  {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : stats.total}
                </p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">All time awarded</p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="mt-2 text-3xl font-bold">
                  {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : stats.thisWeek}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Auras this week</p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students</p>
                <p className="mt-2 text-3xl font-bold">
                  {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : stats.uniqueStudents}
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Awarded students</p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classes</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Active classes</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-4">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/teacher/award">
                <Award className="mr-2 h-4 w-4" />
                Award Aura
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/teacher/students">
                <Users className="mr-2 h-4 w-4" />
                View Students
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/teacher/classes">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Classes
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Recent Awards</h2>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : auras.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <Award className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">No auras awarded yet</p>
                <p className="mt-1 text-sm">Start awarding auras to see activity here</p>
              </div>
            ) : (
              <div className="divide-y">
                {auras.map((aura) => (
                  <div key={aura.id} className="flex items-center gap-3 py-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl"
                      style={{ backgroundColor: `${aura.color}20` }}
                    >
                      {aura.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{aura.auraName}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        To {aura.studentName} • {formatDistanceToNow(aura.awardedAt, { addSuffix: true })}
                      </p>
                    </div>
                    {aura.nftMintAddress && (
                      <a
                        href={`https://explorer.solana.com/address/${aura.nftMintAddress}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        View NFT
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Your Classes */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Your Classes</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/teacher/classes">
                <Plus className="mr-2 h-4 w-4" />
                Create Class
              </Link>
            </Button>
          </div>
          <div className="p-4">
            <div className="text-center text-muted-foreground">
              <p>No classes yet</p>
              <p className="mt-1 text-sm">Create your first class to get started</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
