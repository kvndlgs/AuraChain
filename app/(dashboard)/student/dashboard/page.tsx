'use client'

import { DashboardLayout, studentNavItems } from '../../../../components/dashboard/dashboard-layout'
import { TrendingUp, Calendar } from 'lucide-react'

export default function StudentDashboardPage() {
  return (
    <DashboardLayout navItems={studentNavItems} title="Dashboard">
      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold">Performance Dashboard</h2>
          <p className="mt-2 text-muted-foreground">Track your progress and achievements over time</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Progress Chart</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Chart coming soon</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Monthly Activity</h3>
            </div>
            <div className="mt-4 text-center text-muted-foreground">
              <p>Calendar view coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
