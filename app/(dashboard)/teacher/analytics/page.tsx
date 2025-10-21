'use client'

import { DashboardLayout, teacherNavItems } from '../../../../components/dashboard/dashboard-layout'
import { BarChart3, TrendingUp, Calendar, PieChart } from 'lucide-react'

export default function TeacherAnalyticsPage() {
  return (
    <DashboardLayout navItems={teacherNavItems} title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Analytics & Insights</h2>
          <p className="text-muted-foreground">Track your awarding patterns and student progress</p>
        </div>

        {/* Stats Overview */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Overview</h3>
          </div>
          <p className="mt-2 text-muted-foreground">View your awarding statistics and trends</p>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Auras Over Time</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Chart coming soon</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Aura Distribution</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Chart coming soon</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Activity Calendar</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Calendar view coming soon</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Top Students</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Leaderboard coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
