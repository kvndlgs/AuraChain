'use client'

import { DashboardLayout, teacherNavItems } from '../../../components/dashboard/dashboard-layout'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'
import { Award, Users, BookOpen, TrendingUp, Plus } from 'lucide-react'

export default function TeacherDashboard() {
  return (
    <DashboardLayout navItems={teacherNavItems} title="Dashboard">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Auras</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">All time awarded</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Auras this week</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Total students</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classes</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Active classes</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-6">
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
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <p>No recent activity</p>
              <p className="mt-1 text-sm">Start awarding auras to see activity here</p>
            </div>
          </div>
        </div>

        {/* Your Classes */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold">Your Classes</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/teacher/classes">
                <Plus className="mr-2 h-4 w-4" />
                Create Class
              </Link>
            </Button>
          </div>
          <div className="p-6">
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
