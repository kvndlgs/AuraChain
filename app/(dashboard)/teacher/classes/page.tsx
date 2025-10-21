'use client'

import { DashboardLayout, teacherNavItems } from '../../../../components/dashboard/dashboard-layout'
import { BookOpen, Plus, Users } from 'lucide-react'
import { Button } from '../../../../components/ui/button'

export default function TeacherClassesPage() {
  return (
    <DashboardLayout navItems={teacherNavItems} title="Classes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Class Management</h2>
            <p className="text-muted-foreground">Organize and manage your classes</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        </div>

        {/* Classes Grid */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-semibold">Your Classes</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <BookOpen className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No classes yet</p>
              <p className="mt-1 text-sm">Create a class to organize your students</p>
              <Button className="mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Class
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
