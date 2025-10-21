'use client'

import { DashboardLayout, adminNavItems } from '../../../../components/dashboard/dashboard-layout'
import { GraduationCap, Plus, Search } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'

export default function AdminTeachersPage() {
  return (
    <DashboardLayout navItems={adminNavItems} title="Teachers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Teacher Management</h2>
            <p className="text-muted-foreground">Manage all teachers across schools</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>

        {/* Search */}
        <div className="rounded-lg border bg-card p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search teachers..." className="pl-9" />
            </div>
            <Button variant="outline">Filter by School</Button>
          </div>
        </div>

        {/* Teachers List */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-semibold">All Teachers</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <GraduationCap className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No teachers registered yet</p>
              <p className="mt-1 text-sm">Teachers will appear here once they register</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
