'use client'

import { AwardedAura } from '../../lib/types/aura'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { ExternalLink, Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useCluster } from '../cluster/cluster-data-access'

interface AuraDetailModalProps {
  aura: AwardedAura | null
  open: boolean
  onClose: () => void
}

export function AuraDetailModal({ aura, open, onClose }: AuraDetailModalProps) {
  const { cluster } = useCluster()
  const [copied, setCopied] = useState(false)

  if (!aura) return null

  const handleCopyAddress = () => {
    if (aura.nftMintAddress) {
      navigator.clipboard.writeText(aura.nftMintAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleViewExplorer = () => {
    if (aura.nftMintAddress) {
      const network = cluster.network || 'devnet'
      const url = `https://explorer.solana.com/address/${aura.nftMintAddress}?cluster=${network}`
      window.open(url, '_blank')
    }
  }

  const formattedDate = new Date(aura.awardedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Aura Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Large Aura Display */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-8">
            <div
              className="mb-4 flex h-24 w-24 items-center justify-center rounded-full text-6xl"
              style={{
                backgroundColor: `${aura.color}20`,
              }}
            >
              {aura.icon}
            </div>
            <h2 className="text-center text-2xl font-bold">{aura.auraName}</h2>
          </div>

          {/* Aura Information */}
          <div className="space-y-3 rounded-lg border bg-card p-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Awarded by:</div>
              <div className="font-medium">{aura.teacherName}</div>

              <div className="text-muted-foreground">Date:</div>
              <div className="font-medium">{formattedDate}</div>

              <div className="text-muted-foreground">Category:</div>
              <div className="capitalize font-medium">{aura.category}</div>

              {aura.schoolId && (
                <>
                  <div className="text-muted-foreground">School:</div>
                  <div className="font-medium">{aura.schoolId}</div>
                </>
              )}
            </div>
          </div>

          {/* Teacher Notes */}
          {aura.notes && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Notes from Teacher:</p>
              <p className="text-sm italic">&ldquo;{aura.notes}&rdquo;</p>
            </div>
          )}

          {/* NFT Verification */}
          {aura.nftMintAddress && (
            <div className="space-y-3 rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <p className="font-medium">On-Chain Verification</p>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">NFT Mint Address:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate rounded bg-muted px-2 py-1 font-mono text-xs">
                      {aura.nftMintAddress}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="h-7 w-7 p-0"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {aura.transactionHash && (
                  <div>
                    <p className="text-xs text-muted-foreground">Transaction:</p>
                    <code className="block truncate rounded bg-muted px-2 py-1 font-mono text-xs">
                      {aura.transactionHash}
                    </code>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleViewExplorer}
                className="w-full"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Solana Explorer
              </Button>
            </div>
          )}

          {/* Close Button */}
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
