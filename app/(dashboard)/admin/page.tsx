'use client'

import { DashboardLayout, adminNavItems } from '../../../components/dashboard/dashboard-layout'
import { School, Users, Award, TrendingUp, CheckCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <DashboardLayout navItems={adminNavItems} title="Admin Dashboard">
      <div className="space-y-4">
        {/* Welcome Banner */}
        <div className="rounded-lg border bg-linear-to-r from-primary/10 to-primary/5 p-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="mt-2 text-muted-foreground">Manage schools, teachers, students, and system settings</p>
        </div>

        {/* System Stats */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Schools</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <School className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Active schools</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Registered teachers</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Enrolled students</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Auras</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Awarded all-time</p>
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
                <p className="text-sm font-medium text-muted-foreground">Aura Types</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Available types</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/admin/schools">
                <School className="mr-2 h-4 w-4" />
                Manage Schools
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/teachers">
                <Users className="mr-2 h-4 w-4" />
                Manage Teachers
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/auras">
                <Award className="mr-2 h-4 w-4" />
                Manage Aura Types
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">System Status</h2>
          </div>
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Firebase Connection</p>
                  <p className="text-sm text-muted-foreground">All services operational</p>
                </div>
              </div>
              <span className="text-sm text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Solana Network</p>
                  <p className="text-sm text-muted-foreground">Connected to devnet</p>
                </div>
              </div>
              <span className="text-sm text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Authentication</p>
                  <p className="text-sm text-muted-foreground">OAuth providers enabled</p>
                </div>
              </div>
              <span className="text-sm text-green-500">Active</span>
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
              <p className="mt-1 text-sm">System activity will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
