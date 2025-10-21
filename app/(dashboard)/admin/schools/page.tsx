'use client'

import { DashboardLayout, adminNavItems } from '../../../../components/dashboard/dashboard-layout'
import { School, Plus, Search } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'

export default function AdminSchoolsPage() {
  return (
    <DashboardLayout navItems={adminNavItems} title="Schools">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">School Management</h2>
            <p className="text-muted-foreground">Manage all schools in the system</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add School
          </Button>
        </div>

        {/* Search */}
        <div className="rounded-lg border bg-card p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search schools..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        {/* Schools List */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <School className="h-5 w-5" />
              <h3 className="font-semibold">Registered Schools</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <School className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No schools registered yet</p>
              <p className="mt-1 text-sm">Add a school to get started</p>
              <Button className="mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add First School
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
