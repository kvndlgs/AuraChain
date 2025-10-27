import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
  createNft,
  mplTokenMetadata,
  verifyCollectionV1,
  transferV1,
} from '@metaplex-foundation/mpl-token-metadata'
import {
  generateSigner,
  percentAmount,
  signerIdentity,
  publicKey as umiPublicKey,
  some,
} from '@metaplex-foundation/umi'
import { createSignerFromWalletAdapter } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { WalletAdapter } from '@solana/wallet-adapter-base'
import { NFTMetadata, Aura } from '../types/aura'
import { getCollectionAddress } from './create-collection'

interface MintCollectionAuraParams {
  wallet: WalletAdapter
  aura: Aura
  teacherName: string
  studentName: string
  studentWalletAddress: string
  schoolName?: string
  notes?: string
  rpcEndpoint?: string
}

interface MintResult {
  success: boolean
  mintAddress?: string
  transactionSignature?: string
  error?: string
}

/**
 * Creates NFT metadata for an aura
 */
function createAuraMetadata(params: {
  aura: Aura
  studentName: string
  teacherName: string
  schoolName?: string
  awardDate: Date
  notes?: string
}): NFTMetadata {
  const { aura, studentName, teacherName, schoolName, awardDate, notes } = params

  return {
    name: `${aura.name} - ${studentName}`,
    symbol: 'AURA',
    description: notes || `${aura.description}. Awarded by ${teacherName} on ${awardDate.toLocaleDateString()}`,
    image: aura.icon.startsWith('http')
      ? aura.icon
      : `https://aurachain.vercel.app/badges/${aura.id}.png`,
    external_url: `https://aurachain.vercel.app/aura/${aura.id}`,
    attributes: [
      {
        trait_type: 'Aura Type',
        value: aura.name,
      },
      {
        trait_type: 'Teacher',
        value: teacherName,
      },
      ...(schoolName
        ? [
            {
              trait_type: 'School',
              value: schoolName,
            },
          ]
        : []),
      {
        trait_type: 'Date Awarded',
        value: awardDate.toISOString().split('T')[0],
      },
      {
        trait_type: 'Category',
        value: aura.category,
      },
      {
        trait_type: 'Color',
        value: aura.color,
      },
    ],
  }
}

/**
 * Uploads metadata to data URI (for demo)
 * In production, use IPFS, Arweave, or NFT.Storage
 */
async function uploadMetadata(metadata: NFTMetadata): Promise<string> {
  const metadataJson = JSON.stringify(metadata)
  const base64 = Buffer.from(metadataJson).toString('base64')
  return `data:application/json;base64,${base64}`
}

/**
 * Mints an aura NFT as part of the AuraChain collection
 */
export async function mintCollectionAuraNFT(
  params: MintCollectionAuraParams
): Promise<MintResult> {
  try {
    const {
      wallet,
      aura,
      teacherName,
      studentName,
      studentWalletAddress,
      schoolName,
      notes,
      rpcEndpoint = 'https://api.devnet.solana.com',
    } = params

    if (!wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    // Get collection address
    const collectionAddress = getCollectionAddress()
    if (!collectionAddress) {
      throw new Error('Collection not created yet. Please create a collection first.')
    }

    // Create metadata
    const metadata = createAuraMetadata({
      aura,
      studentName,
      teacherName,
      schoolName,
      awardDate: new Date(),
      notes,
    })

    // Upload metadata
    const metadataUri = await uploadMetadata(metadata)

    // Initialize Umi
    const umi = createUmi(rpcEndpoint).use(mplTokenMetadata())

    // Create signer from wallet adapter
    const signer = createSignerFromWalletAdapter(wallet)
    umi.use(signerIdentity(signer))

    // Generate mint address
    const mint = generateSigner(umi)

    // Create NFT as part of collection
    const createNftTx = await createNft(umi, {
      mint,
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(0),
      collection: some({ key: umiPublicKey(collectionAddress), verified: false }),
      creators: [
        {
          address: signer.publicKey,
          verified: true,
          share: 100,
        },
      ],
    }).sendAndConfirm(umi)

    // Verify the NFT as part of the collection
    try {
      await verifyCollectionV1(umi, {
        metadata: mint.publicKey,
        collectionMint: umiPublicKey(collectionAddress),
        authority: signer,
      }).sendAndConfirm(umi)
    } catch (err) {
      console.warn('Collection verification failed (this is okay for demo):', err)
    }

    // Transfer NFT to student if student wallet is different from teacher
    if (studentWalletAddress !== wallet.publicKey.toBase58()) {
      try {
        await transferV1(umi, {
          mint: mint.publicKey,
          authority: signer,
          tokenOwner: signer.publicKey,
          destinationOwner: umiPublicKey(studentWalletAddress),
          tokenStandard: 'NonFungible' as any,
        }).sendAndConfirm(umi)
      } catch (err) {
        console.warn('Transfer failed (student will need to claim):', err)
      }
    }

    const signature = Buffer.from(createNftTx.signature).toString('base64')

    return {
      success: true,
      mintAddress: mint.publicKey,
      transactionSignature: signature,
    }
  } catch (error) {
    console.error('Error minting collection NFT:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mint NFT',
    }
  }
}
