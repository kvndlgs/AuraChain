'use client'

import { DashboardLayout, parentNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Award, Trophy } from 'lucide-react'

export default function ParentAchievementsPage() {
  return (
    <DashboardLayout navItems={parentNavItems} title="Achievements">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Children's Achievements</h2>
          <p className="text-muted-foreground">View all achievements earned by your children</p>
        </div>

        {/* Overview */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Achievement Overview</h3>
          </div>
          <p className="mt-2 text-muted-foreground">Track your children's progress and milestones</p>
        </div>

        {/* Achievements List */}
        <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
          <Award className="mx-auto h-12 w-12 opacity-20" />
          <p className="mt-2">No achievements yet</p>
          <p className="mt-1 text-sm">Connect a child to see their achievements</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
