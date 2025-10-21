'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { DEFAULT_AURAS, Aura } from '../../lib/types/aura'
import { createMockAuraNFT } from '../../lib/solana/mint-aura'
import { useAuth } from '../../contexts/auth-context'
import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Award, Loader2 } from 'lucide-react'

interface Student {
  id: string
  name: string
  walletAddress?: string
}

interface AwardAuraModalProps {
  open: boolean
  onClose: () => void
  students?: Student[]
}

export function AwardAuraModal({ open, onClose, students = [] }: AwardAuraModalProps) {
  const { userProfile } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedAura, setSelectedAura] = useState<Aura | null>(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Initialize auras with IDs
  const auras: Aura[] = DEFAULT_AURAS.map((aura, index) => ({
    ...aura,
    id: `aura-${index}`,
    createdAt: new Date(),
  }))

  const handleClose = () => {
    setStep(1)
    setSelectedStudent(null)
    setSelectedAura(null)
    setNotes('')
    setError('')
    onClose()
  }

  const handleAwardAura = async () => {
    if (!selectedStudent || !selectedAura || !userProfile) {
      setError('Please complete all steps')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Mint NFT (using mock for demo)
      const mintResult = await createMockAuraNFT({
        teacherWalletAddress: userProfile.walletAddress || 'mock-teacher-wallet',
        studentWalletAddress: selectedStudent.walletAddress || 'mock-student-wallet',
        aura: selectedAura,
        teacherName: userProfile.displayName,
        studentName: selectedStudent.name,
        schoolName: userProfile.schoolId,
        notes,
      })

      if (!mintResult.success) {
        throw new Error(mintResult.error || 'Failed to mint NFT')
      }

      // Save to Firestore
      const awardedAuraRef = doc(collection(db, 'awardedauras'))
      await setDoc(awardedAuraRef, {
        auraId: selectedAura.id,
        auraName: selectedAura.name,
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        issuedByTeacherId: userProfile.uid,
        teacherName: userProfile.displayName,
        schoolId: userProfile.schoolId,
        nftMintAddress: mintResult.mintAddress,
        transactionHash: mintResult.transactionSignature,
        notes,
        awardedAt: new Date(),
        category: selectedAura.category,
        icon: selectedAura.icon,
        color: selectedAura.color,
      })

      // Success! Close modal
      handleClose()
    } catch (err: any) {
      console.error('Error awarding aura:', err)
      setError(err.message || 'Failed to award aura')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Award Aura</DialogTitle>
          <DialogDescription>Select a student and aura type to award</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && <div className={`h-0.5 w-12 ${s < step ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>

          {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

          {/* Step 1: Select Student */}
          {step === 1 && (
            <div className="space-y-4">
              <Label>Select Student</Label>
              <div className="grid max-h-96 gap-2 overflow-y-auto">
                {students.length === 0 ? (
                  <div className="rounded-lg border p-8 text-center text-muted-foreground">
                    <p>No students available</p>
                    <p className="mt-1 text-sm">Add students to your class first</p>
                  </div>
                ) : (
                  students.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student)
                        setStep(2)
                      }}
                      className={`rounded-lg border p-4 text-left transition-colors hover:bg-accent ${
                        selectedStudent?.id === student.id ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <p className="font-medium">{student.name}</p>
                      {student.walletAddress && (
                        <p className="mt-1 text-xs text-muted-foreground">{student.walletAddress.slice(0, 16)}...</p>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Step 2: Select Aura */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Select Aura Type</Label>
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>
              <div className="grid max-h-96 gap-2 overflow-y-auto sm:grid-cols-2">
                {auras.map((aura) => (
                  <button
                    key={aura.id}
                    onClick={() => {
                      setSelectedAura(aura)
                      setStep(3)
                    }}
                    className={`rounded-lg border p-4 text-left transition-colors hover:bg-accent ${
                      selectedAura?.id === aura.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    style={{ borderLeftColor: aura.color, borderLeftWidth: '4px' }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{aura.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium">{aura.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{aura.description}</p>
                        <p className="mt-2 text-xs capitalize text-muted-foreground">{aura.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Add Notes */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Add Notes (Optional)</Label>
                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                  Back
                </Button>
              </div>

              {/* Summary */}
              <div className="rounded-lg border bg-muted p-4">
                <p className="text-sm font-medium">Summary</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Student:</span> {selectedStudent?.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-muted-foreground">Aura:</span>
                    <span className="text-lg">{selectedAura?.icon}</span>
                    {selectedAura?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add a personal message or reason for this award..."
                  className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">{notes.length}/200 characters</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleClose} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAwardAura} disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Awarding...
                    </>
                  ) : (
                    <>
                      <Award className="mr-2 h-4 w-4" />
                      Award Aura
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
