import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
  createNft,
  mplTokenMetadata,
  CreateNftInput
} from '@metaplex-foundation/mpl-token-metadata'
import {
  generateSigner,
  percentAmount,
  signerIdentity,
  publicKey as umiPublicKey,
  Umi,
  TransactionBuilderSendAndConfirmOptions
} from '@metaplex-foundation/umi'
import { createSignerFromWalletAdapter } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { WalletAdapter } from '@solana/wallet-adapter-base'

interface CreateCollectionParams {
  wallet: WalletAdapter
  name?: string
  symbol?: string
  description?: string
  image?: string
  rpcEndpoint?: string
}

interface CreateCollectionResult {
  success: boolean
  collectionAddress?: string
  transactionSignature?: string
  error?: string
}

/**
 * Creates an NFT collection on Solana
 * This collection will be the parent for all aura NFTs
 */
export async function createAuraCollection(
  params: CreateCollectionParams
): Promise<CreateCollectionResult> {
  try {
    const {
      wallet,
      name = 'AuraChain Collection',
      symbol = 'AURA',
      description = 'Digital achievement badges awarded by teachers to students',
      image = 'https://aurachain.vercel.app/collection-badge.png',
      rpcEndpoint = 'https://api.devnet.solana.com',
    } = params

    if (!wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    // Initialize Umi
    const umi = createUmi(rpcEndpoint).use(mplTokenMetadata())

    // Create signer from wallet adapter
    const signer = createSignerFromWalletAdapter(wallet)
    umi.use(signerIdentity(signer))

    // Generate collection mint address
    const collectionMint = generateSigner(umi)

    console.log('Creating collection NFT...')
    console.log('Collection mint address:', collectionMint.publicKey)

    // Create collection NFT
    const createCollectionTx = await createNft(umi, {
      mint: collectionMint,
      name,
      symbol,
      uri: `data:application/json;base64,${Buffer.from(
        JSON.stringify({
          name,
          symbol,
          description,
          image,
          attributes: [
            {
              trait_type: 'Type',
              value: 'Collection',
            },
          ],
        })
      ).toString('base64')}`,
      sellerFeeBasisPoints: percentAmount(0), // 0% royalty
      isCollection: true, // Mark this as a collection
    }).sendAndConfirm(umi)

    const signature = Buffer.from(createCollectionTx.signature).toString('base64')

    console.log('Collection created successfully!')
    console.log('Signature:', signature)

    return {
      success: true,
      collectionAddress: collectionMint.publicKey,
      transactionSignature: signature,
    }
  } catch (error) {
    console.error('Error creating collection:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create collection',
    }
  }
}

/**
 * Get the collection address from environment or return null
 */
export function getCollectionAddress(): string | null {
  return process.env.NEXT_PUBLIC_AURA_COLLECTION_ADDRESS || null
}
