'use client'

import { DashboardLayout, adminNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Users, Search } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'

export default function AdminStudentsPage() {
  return (
    <DashboardLayout navItems={adminNavItems} title="Students">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Student Management</h2>
          <p className="text-muted-foreground">View and manage all students across schools</p>
        </div>

        {/* Search */}
        <div className="rounded-lg border bg-card p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-9" />
            </div>
            <Button variant="outline">Filter by School</Button>
          </div>
        </div>

        {/* Students List */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">All Students</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <Users className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No students registered yet</p>
              <p className="mt-1 text-sm">Students will appear here once they register</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
