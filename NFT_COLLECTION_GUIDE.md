# AuraChain NFT Collection Setup Guide

## Overview

This guide will help you create an NFT collection on Solana and mint aura NFTs as part of that collection.

## What You Need

1. **Solana Wallet** with some SOL for transaction fees
   - Devnet: Get free devnet SOL from https://faucet.solana.com/
   - Mainnet: Real SOL for production

2. **Admin Access** to your AuraChain dapp

3. **RPC Endpoint**
   - Devnet (testing): `https://api.devnet.solana.com`
   - Mainnet (production): Use a paid RPC provider like Helius, QuickNode, or Alchemy

## Step-by-Step Guide

### Step 1: Create the Collection

1. **Switch to Admin Role**
   - Go to `/settings`
   - Click "Switch to Admin" in the Development Tools section

2. **Navigate to NFT Collection Page**
   - Go to `/admin/collection` or click "NFT Collection" in the sidebar

3. **Connect Your Wallet**
   - Click the wallet button in the top-right corner
   - Connect your Solana wallet (Phantom, Solflare, etc.)
   - Make sure you have some SOL for transaction fees

4. **Create the Collection**
   - Fill in the collection details:
     - **Name**: "AuraChain Collection" (or your preferred name)
     - **Symbol**: "AURA" (or your preferred symbol, max 10 chars)
     - **Description**: Describe what your collection represents
   - Click "Create Collection"
   - **Approve the transaction** in your wallet
   - Wait for confirmation (this may take a few seconds)

5. **Save the Collection Address**
   - After successful creation, you'll see the collection address
   - Copy this address
   - Add it to your `.env.local` file:
     ```bash
     NEXT_PUBLIC_AURA_COLLECTION_ADDRESS=your_collection_address_here
     ```
   - Restart your dev server: `npm run dev`

### Step 2: Mint Aura NFTs (Coming Soon)

Once the collection is created and the address is in your environment variables:

1. **Teachers Can Award Auras**
   - Switch to Teacher role
   - Navigate to `/teacher/award`
   - Select a student and aura type
   - Click "Award Aura"
   - The NFT will be minted as part of your collection and transferred to the student

2. **Collection Benefits**
   - All aura NFTs are linked to the parent collection
   - Easy to verify authenticity
   - Better discovery on NFT marketplaces
   - Unified collection page on explorers

## Technical Details

### What Happens When You Create a Collection?

1. A **Collection NFT** (parent NFT) is created on Solana
2. This NFT has metadata identifying it as a collection
3. The collection address is stored in your environment variables
4. All future aura NFTs reference this collection

### What Happens When You Mint an Aura?

1. **Metadata is created** with:
   - Student name
   - Teacher name
   - School name
   - Aura type, category, color
   - Award date
   - Optional notes from teacher

2. **NFT is minted** on Solana:
   - Uses Metaplex Token Metadata standard
   - Linked to the collection
   - 0% royalty (free to transfer)

3. **NFT is transferred** to the student's wallet:
   - Automatically sent to student's connected wallet
   - Student owns the NFT permanently
   - Can be viewed in any Solana wallet or explorer

### File Structure

```
lib/solana/
├── create-collection.ts        # Collection creation logic
├── mint-collection-nft.ts      # Mint NFTs as part of collection
└── mint-aura.ts                # Original mock/demo minting

app/(dashboard)/admin/
└── collection/
    └── page.tsx                # Collection management UI
```

### Environment Variables

Add these to your `.env.local`:

```bash
# Solana RPC Endpoint (default: devnet)
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com

# Collection Address (after creating collection)
NEXT_PUBLIC_AURA_COLLECTION_ADDRESS=your_collection_address_here
```

## Upgrading from Mock to Real Minting

To switch from mock minting to real NFT minting:

1. **Create the collection** (follow steps above)
2. **Update the award modal** to use `mintCollectionAuraNFT` instead of `createMockAuraNFT`
3. **Ensure students have wallets connected** before awarding

## Troubleshooting

### "Wallet not connected"
- Make sure your wallet is connected before creating collection
- Check that you approved the connection in your wallet

### "Transaction failed"
- Ensure you have enough SOL for transaction fees
- Check your RPC endpoint is accessible
- Try again after a few seconds

### "Collection not found"
- Make sure `NEXT_PUBLIC_AURA_COLLECTION_ADDRESS` is set in `.env.local`
- Restart your dev server after adding the environment variable

### "Student doesn't receive NFT"
- Verify student has a wallet connected
- Check student's wallet address in their settings
- NFT may take a few seconds to appear in their wallet

## Testing on Devnet

1. **Get Devnet SOL**
   - Visit https://faucet.solana.com/
   - Enter your wallet address
   - Request devnet SOL (free)

2. **Create Collection on Devnet**
   - Use devnet RPC endpoint
   - Create collection as described above
   - Test minting auras

3. **View NFTs**
   - Solana Explorer: https://explorer.solana.com/?cluster=devnet
   - Solscan: https://solscan.io/?cluster=devnet
   - In your wallet (make sure wallet is set to devnet)

## Production Deployment

When ready for mainnet:

1. **Switch to Mainnet RPC**
   ```bash
   NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://your-mainnet-rpc-endpoint
   ```

2. **Use a Production RPC Provider**
   - Helius: https://helius.dev
   - QuickNode: https://quicknode.com
   - Alchemy: https://alchemy.com

3. **Create Collection on Mainnet**
   - Same process, but uses real SOL
   - Collection will be visible on mainnet explorers

4. **Upload Metadata to Decentralized Storage**
   - IPFS via NFT.Storage: https://nft.storage
   - Arweave via Bundlr: https://bundlr.network
   - Update `uploadMetadata` function in `mint-collection-nft.ts`

## Next Steps

1. ✅ Create your collection
2. ✅ Save collection address to environment
3. 🔄 Update award modal to use real minting (optional)
4. 🔄 Deploy metadata to IPFS/Arweave (for production)
5. 🔄 Switch to mainnet (when ready for production)

## Resources

- **Metaplex Docs**: https://developers.metaplex.com/
- **Solana Docs**: https://docs.solana.com/
- **Umi Framework**: https://github.com/metaplex-foundation/umi
- **Token Metadata Standard**: https://developers.metaplex.com/token-metadata

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify wallet has enough SOL
3. Ensure RPC endpoint is responding
4. Check transaction on Solana Explorer

---

Happy minting! 🎉
