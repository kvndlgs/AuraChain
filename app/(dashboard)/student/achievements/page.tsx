'use client'

import { DashboardLayout, studentNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Award, Trophy } from 'lucide-react'

export default function StudentAchievementsPage() {
  return (
    <DashboardLayout navItems={studentNavItems} title="Achievements">
      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Achievements & Milestones</h2>
          </div>
          <p className="mt-2 text-muted-foreground">View all your achievements and unlock new milestones</p>
        </div>

        <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
          <Award className="mx-auto h-12 w-12 opacity-20" />
          <p className="mt-2">No achievements yet</p>
          <p className="mt-1 text-sm">Keep collecting auras to unlock achievements!</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
