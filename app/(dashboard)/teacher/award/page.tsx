'use client'

import { useState } from 'react'
import { DashboardLayout, teacherNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Button } from '../../../../components/ui/button'
import { AwardAuraModal } from '../../../../components/teacher/award-aura-modal'
import { Award, Users, Plus } from 'lucide-react'

// Mock students for demo
const MOCK_STUDENTS = [
  { id: 'student-1', name: 'Emma Johnson', walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU' },
  { id: 'student-2', name: 'Liam Smith', walletAddress: '8yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV' },
  { id: 'student-3', name: 'Olivia Brown', walletAddress: '9zKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW' },
  { id: 'student-4', name: 'Noah Davis', walletAddress: 'AaKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsX' },
  { id: 'student-5', name: 'Ava Wilson', walletAddress: 'BbKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsY' },
  { id: 'student-6', name: 'Ethan Martinez', walletAddress: 'CcKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsZ' },
]

export default function AwardAuraPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <DashboardLayout navItems={teacherNavItems} title="Award Auras">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Award Auras to Students</h2>
            <p className="text-muted-foreground">Recognize and reward student achievements</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Award className="mr-2 h-4 w-4" />
            Award Aura
          </Button>
        </div>

        {/* Instructions */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">How to Award Auras</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Click the "Award Aura" button above</li>
            <li>Select the student you want to award</li>
            <li>Choose an appropriate aura type</li>
            <li>Add optional notes about why they're receiving this award</li>
            <li>Confirm to mint the NFT and award it to the student</li>
          </ol>
        </div>

        {/* Students List */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">Your Students</h3>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>
          <div className="divide-y">
            {MOCK_STUDENTS.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.walletAddress.slice(0, 16)}...</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setModalOpen(true)
                  }}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Award
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Awards */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h3 className="font-semibold">Recent Awards</h3>
          </div>
          <div className="p-6">
            <div className="text-center text-muted-foreground">
              <Award className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">No auras awarded yet</p>
              <p className="mt-1 text-sm">Your recent awards will appear here</p>
            </div>
          </div>
        </div>
      </div>

      <AwardAuraModal open={modalOpen} onClose={() => setModalOpen(false)} students={MOCK_STUDENTS} />
    </DashboardLayout>
  )
}
