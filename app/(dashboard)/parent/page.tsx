'use client'

import { DashboardLayout, parentNavItems } from '../../../components/dashboard/dashboard-layout'
import { Users, Award, TrendingUp, Heart } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

export default function ParentDashboard() {
  return (
    <DashboardLayout navItems={parentNavItems} title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <h2 className="text-2xl font-bold">Welcome, Parent!</h2>
          <p className="mt-2 text-muted-foreground">Track your children's achievements and progress</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Children</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Registered children</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Auras</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Combined achievements</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">New this month</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Different types</p>
          </div>
        </div>

        {/* Your Children */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold">Your Children</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/parent/children">View All</Link>
            </Button>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium">No children added yet</p>
              <p className="mt-2 text-sm">Add your children to track their achievements</p>
              <Button className="mt-4" asChild>
                <Link href="/parent/children">Add Child</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">Recent Achievements</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <p>No recent achievements</p>
              <p className="mt-1 text-sm">Your children's recent aura awards will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
