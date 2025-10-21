'use client'

import { DashboardLayout, adminNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Award, Plus } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { DEFAULT_AURAS } from '../../../../lib/types/aura'

export default function AdminAurasPage() {
  return (
    <DashboardLayout navItems={adminNavItems} title="Aura Types">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Aura Type Management</h2>
            <p className="text-muted-foreground">Manage available aura types for teachers to award</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Aura Type
          </Button>
        </div>

        {/* Default Auras */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <h3 className="font-semibold">Available Aura Types</h3>
            </div>
          </div>
          <div className="divide-y p-6">
            {DEFAULT_AURAS.map((aura, index) => (
              <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{aura.icon}</span>
                  <div>
                    <p className="font-medium">{aura.name}</p>
                    <p className="text-sm text-muted-foreground">{aura.description}</p>
                    <p className="mt-1 text-xs capitalize text-muted-foreground">{aura.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" disabled={aura.isDefault}>
                    {aura.isDefault ? 'Default' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Aura Types</p>
            <p className="mt-2 text-3xl font-bold">{DEFAULT_AURAS.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Cross-Class Auras</p>
            <p className="mt-2 text-3xl font-bold">
              {DEFAULT_AURAS.filter((a) => a.category === 'cross-class').length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Subject-Specific</p>
            <p className="mt-2 text-3xl font-bold">
              {DEFAULT_AURAS.filter((a) => a.category === 'subject-specific').length}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
