'use client'

import { DashboardLayout, teacherNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Users, Search, Plus, UserPlus } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'

export default function TeacherStudentsPage() {
  return (
    <DashboardLayout navItems={teacherNavItems} title="Students">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Student Management</h2>
            <p className="text-muted-foreground">Manage your students and their progress</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="rounded-lg border bg-card p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        {/* Students List */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">Your Students</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <Users className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No students yet</p>
              <p className="mt-1 text-sm">Add students to start awarding auras</p>
              <Button className="mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Student
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
