'use client'

import { DashboardLayout, parentNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Users, Plus, UserPlus } from 'lucide-react'
import { Button } from '../../../../components/ui/button'

export default function ParentChildrenPage() {
  return (
    <DashboardLayout navItems={parentNavItems} title="Children">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">My Children</h2>
            <p className="text-muted-foreground">Manage and track your children's accounts</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Child
          </Button>
        </div>

        {/* Instructions */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">How to Add a Child</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Click the "Add Child" button above</li>
            <li>Enter your child's student ID or email</li>
            <li>Send a connection request</li>
            <li>Once approved, you can track their achievements</li>
          </ol>
        </div>

        {/* Children List */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">Connected Children</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <Users className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No children connected yet</p>
              <p className="mt-1 text-sm">Add a child to start tracking their achievements</p>
              <Button className="mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Child
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
