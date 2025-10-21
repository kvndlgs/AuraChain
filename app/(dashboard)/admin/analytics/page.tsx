'use client'

import { DashboardLayout, adminNavItems } from '../../../../components/dashboard/dashboard-layout'
import { BarChart3, TrendingUp, Activity, PieChart } from 'lucide-react'

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout navItems={adminNavItems} title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">System Analytics</h2>
          <p className="text-muted-foreground">Monitor platform-wide metrics and insights</p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Auras Awarded</p>
            <p className="mt-2 text-3xl font-bold">0</p>
            <p className="mt-1 text-xs text-muted-foreground">All time</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Active Schools</p>
            <p className="mt-2 text-3xl font-bold">0</p>
            <p className="mt-1 text-xs text-muted-foreground">Registered</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Teachers</p>
            <p className="mt-2 text-3xl font-bold">0</p>
            <p className="mt-1 text-xs text-muted-foreground">Across all schools</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="mt-2 text-3xl font-bold">0</p>
            <p className="mt-1 text-xs text-muted-foreground">Enrolled</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Platform Growth</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Growth chart coming soon</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Aura Distribution</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Distribution chart coming soon</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Recent Activity</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Activity feed coming soon</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Top Schools</h3>
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
