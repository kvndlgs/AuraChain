'use client'

import { useState } from 'react'
import { DashboardLayout, adminNavItems } from '../../../../components/dashboard/dashboard-layout'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Award, Plus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { createAuraCollection, getCollectionAddress } from '../../../../lib/solana/create-collection'

export default function AdminCollectionPage() {
  const { connected, publicKey, ...wallet } = useWallet()
  const [creating, setCreating] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [collectionName, setCollectionName] = useState('AuraChain Collection')
  const [collectionSymbol, setCollectionSymbol] = useState('AURA')
  const [collectionDescription, setCollectionDescription] = useState(
    'Digital achievement badges awarded by teachers to students'
  )

  const existingCollection = getCollectionAddress()

  const handleCreateCollection = async () => {
    if (!connected || !publicKey) {
      setResult({ success: false, message: 'Please connect your wallet first' })
      return
    }

    setCreating(true)
    setResult(null)

    try {
      const createResult = await createAuraCollection({
        wallet: wallet as any,
        name: collectionName,
        symbol: collectionSymbol,
        description: collectionDescription,
      })

      if (createResult.success && createResult.collectionAddress) {
        setResult({
          success: true,
          message: `Collection created successfully! Address: ${createResult.collectionAddress}`,
        })
      } else {
        setResult({
          success: false,
          message: createResult.error || 'Failed to create collection',
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      })
    } finally {
      setCreating(false)
    }
  }

  return (
    <DashboardLayout navItems={adminNavItems} title="NFT Collection">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Manage NFT Collection</h2>
          <p className="text-muted-foreground">
            Create and manage the AuraChain NFT collection on Solana
          </p>
        </div>

        {/* Collection Status */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <h3 className="font-semibold">Collection Status</h3>
            </div>
          </div>
          <div className="p-6">
            {existingCollection ? (
              <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-600">Collection Created</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Collection Address:{' '}
                      <code className="rounded bg-muted px-2 py-1 text-xs">{existingCollection}</code>
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      This collection is set in your environment variables. All aura NFTs will be minted
                      as part of this collection.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-600">No Collection Found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create a collection to start minting aura NFTs. The collection address will be stored
                      in your environment variables.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Collection Form */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <h3 className="font-semibold">Create New Collection</h3>
            </div>
          </div>
          <div className="space-y-6 p-6">
            {!connected && (
              <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600">
                  Please connect your wallet to create a collection
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Collection Name</Label>
                <Input
                  id="name"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  placeholder="AuraChain Collection"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  value={collectionSymbol}
                  onChange={(e) => setCollectionSymbol(e.target.value)}
                  placeholder="AURA"
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                  placeholder="Describe your collection..."
                  className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  maxLength={500}
                />
              </div>
            </div>

            {result && (
              <div
                className={`rounded-lg border p-4 ${
                  result.success
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-red-500/50 bg-red-500/10'
                }`}
              >
                <p className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  {result.message}
                </p>
              </div>
            )}

            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> After creating the collection, copy the collection address and add it
                to your <code>.env.local</code> file as{' '}
                <code>NEXT_PUBLIC_AURA_COLLECTION_ADDRESS</code>
              </p>
            </div>

            <Button onClick={handleCreateCollection} disabled={creating || !connected} className="w-full">
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Collection...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Collection
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h3 className="font-semibold">How to Set Up Collection</h3>
          </div>
          <div className="p-6">
            <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
              <li>Connect your admin wallet (make sure you have some SOL for transaction fees)</li>
              <li>Fill in the collection details above</li>
              <li>Click "Create Collection" and approve the transaction in your wallet</li>
              <li>
                Copy the collection address from the success message
              </li>
              <li>
                Add it to your <code>.env.local</code> file:
                <pre className="mt-2 rounded bg-muted p-2 text-xs">
                  NEXT_PUBLIC_AURA_COLLECTION_ADDRESS=your_collection_address_here
                </pre>
              </li>
              <li>Restart your dev server for changes to take effect</li>
              <li>All aura NFTs will now be minted as part of this collection!</li>
            </ol>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
