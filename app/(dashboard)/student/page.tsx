'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout, studentNavItems } from '../../../components/dashboard/dashboard-layout'
import { Award, TrendingUp, Target, Star, Loader2 } from 'lucide-react'
import { useAuth } from '../../../contexts/auth-context'
import { AwardedAura } from '../../../lib/types/aura'
import { getStudentAuras, calculateAuraStats, StudentAuraStats } from '../../../services/studentAuraService'
import { AuraBadge } from '../../../components/student/aura-badge'
import { AuraDetailModal } from '../../../components/student/aura-detail-modal'

export default function StudentDashboard() {
  const { userProfile } = useAuth()
  const [auras, setAuras] = useState<AwardedAura[]>([])
  const [stats, setStats] = useState<StudentAuraStats>({ total: 0, thisMonth: 0, categories: {} })
  const [loading, setLoading] = useState(true)
  const [selectedAura, setSelectedAura] = useState<AwardedAura | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  useEffect(() => {
    async function loadAuras() {
      if (!userProfile?.uid) return

      setLoading(true)
      try {
        const fetchedAuras = await getStudentAuras(userProfile.uid)
        setAuras(fetchedAuras)
        setStats(calculateAuraStats(fetchedAuras))
      } catch (error) {
        console.error('Error loading auras:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAuras()
  }, [userProfile])

  const handleAuraClick = (aura: AwardedAura) => {
    setSelectedAura(aura)
    setDetailModalOpen(true)
  }

  const categoryCount = Object.keys(stats.categories).length

  return (
    <DashboardLayout navItems={studentNavItems} title="My Collection">
      <div className="space-y-4">
        {/* Welcome Banner */}
        <div className="rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5 p-4">
          <h2 className="text-2xl font-bold">Welcome to Your Collection!</h2>
          <p className="mt-2 text-muted-foreground">
            Collect auras from your teachers and track your achievements
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Auras</p>
                <p className="mt-2 text-3xl font-bold">{loading ? '-' : stats.total}</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">All time collected</p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="mt-2 text-3xl font-bold">{loading ? '-' : stats.thisMonth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Auras this month</p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="mt-2 text-3xl font-bold">{loading ? '-' : categoryCount}</p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Different types</p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rank</p>
                <p className="mt-2 text-3xl font-bold">-</p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">In your class</p>
          </div>
        </div>

        {/* Aura Collection */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Your Aura Collection</h2>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : auras.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <p className="text-lg font-medium">No auras yet!</p>
                <p className="mt-2 text-sm">Your teachers will award you auras as you achieve great things.</p>
                <p className="mt-1 text-sm">Check back soon to see your collection grow!</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {auras.map((aura) => (
                  <AuraBadge key={aura.id} aura={aura} onClick={() => handleAuraClick(aura)} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        {auras.length > 0 && (
          <div className="rounded-lg border bg-card">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <div className="divide-y">
              {auras.slice(0, 5).map((aura) => (
                <div
                  key={aura.id}
                  className="flex items-center gap-3 p-3 transition-colors hover:bg-accent"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl"
                    style={{ backgroundColor: `${aura.color}20` }}
                  >
                    {aura.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{aura.auraName}</p>
                    <p className="text-sm text-muted-foreground">
                      By {aura.teacherName} • {new Date(aura.awardedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAuraClick(aura)}
                    className="text-sm text-primary hover:underline"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aura Detail Modal */}
        <AuraDetailModal
          aura={selectedAura}
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  )
}
