'use client'

import { DashboardLayout, studentNavItems } from '../../../components/dashboard/dashboard-layout'
import { Award, TrendingUp, Target, Star } from 'lucide-react'

export default function StudentDashboard() {
  return (
    <DashboardLayout navItems={studentNavItems} title="My Collection">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <h2 className="text-2xl font-bold">Welcome to Your Collection!</h2>
          <p className="mt-2 text-muted-foreground">
            Collect auras from your teachers and track your achievements
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Auras</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">All time collected</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Auras this month</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Different types</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rank</p>
                <p className="mt-2 text-3xl font-bold">-</p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">In your class</p>
          </div>
        </div>

        {/* Aura Collection */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">Your Aura Collection</h2>
          </div>
          <div className="p-12">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium">No auras yet!</p>
              <p className="mt-2 text-sm">Your teachers will award you auras as you achieve great things.</p>
              <p className="mt-1 text-sm">Check back soon to see your collection grow!</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <p>No recent activity</p>
              <p className="mt-1 text-sm">Your recent aura awards will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
