# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AuraChain is a blockchain-powered student recognition platform that transforms classroom achievements into permanent digital badges (NFTs) on Solana. Teachers award students "auras" for academic excellence, positive behavior, and milestones. Students collect auras in dashboards, parents track progress, and schools build transparent merit systems.

**Tech Stack**: Next.js 15, TypeScript, React 19, Solana Web3.js, Metaplex, Firebase (Auth + Firestore), Tailwind CSS 4, shadcn/ui

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm start               # Start production server
npm run build           # Build for production

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting
npm run ci              # Run all checks (build + lint + format:check)
```

## Architecture

### Multi-Role System
The application serves 4 distinct user roles with separate dashboards:
- **Teachers**: Award auras, manage students/classes, view analytics (`app/(dashboard)/teacher/`)
- **Students**: View achievements, collect auras (`app/(dashboard)/student/`)
- **Parents**: Track children's progress (`app/(dashboard)/parent/`)
- **Admins**: Manage schools, teachers, students, aura types (`app/(dashboard)/admin/`)

### Authentication Flow
- Firebase Authentication handles sign-up/sign-in (email/password, Google OAuth, GitHub OAuth)
- User profiles stored in Firestore with role-based access control
- OAuth users must complete profile setup with role selection via modal
- Auth context at `contexts/auth-context.tsx` provides `useAuth()` hook
- Protected routes ensure role-appropriate access

### NFT Minting Architecture
The platform mints Solana NFTs using Metaplex standards:

1. **Mint Flow**: Teacher awards aura → Frontend calls API route → Creates NFT metadata → Mints via Metaplex → Stores mint address in Firestore
2. **Key Files**:
   - `lib/solana/mint-aura.ts`: Core minting logic using Metaplex UMI
   - `app/api/solana/mint/route.ts`: API endpoint for minting
   - `components/teacher/award-aura-modal.tsx`: Teacher UI for awarding
3. **NFT Structure**: Each aura NFT includes metadata (student name, teacher, school, date, category) stored on-chain with attributes
4. **Mock Mode**: Falls back to mock minting for demo purposes if blockchain interaction fails

### Data Model
**Firestore Collections**:
- `users` - Core user profiles with role field
- `teachers` - Teacher-specific data (schoolId, isActive, classes)
- `students` - Student-specific data (schoolId, grade, enrolledAt)
- `schools` - School information
- `meriits` - Default aura types (10 predefined across categories)
- `customauras` - Teacher-created custom auras
- `awardedauras` - Awarded aura records with NFT mint addresses
- `collections` - Metaplex collection data

**Security**: Firestore rules at `firestore.rules` enforce role-based access

### Type System
Core types defined in `lib/types/`:
- `user.ts`: UserRole, UserProfile, TeacherProfile, StudentProfile, ParentProfile, AdminProfile
- `aura.ts`: Aura, AuraCategory, AwardedAura, NFTMetadata, DEFAULT_AURAS

10 default aura types span categories: cross-class, math, art, pe, english, science, custom

### Component Architecture
- **Providers**: `components/app-providers.tsx` wraps app with AuthProvider, SolanaProvider, ReactQueryProvider, ThemeProvider
- **Layouts**: Route group layouts at `app/(auth)/layout.tsx` and `app/(dashboard)/layout.tsx`
- **UI Components**: shadcn/ui components in `components/ui/`
- **Feature Components**: Organized by role (teacher/, student/, auth/, dashboard/)

### State Management
- **Auth State**: React Context (`contexts/auth-context.tsx`)
- **Solana State**: Wallet adapter context from `@solana/wallet-adapter-react`
- **Server State**: TanStack Query (React Query) via `components/react-query-provider.tsx`
- **Theme**: next-themes for dark mode

## Key Patterns

### Route Groups
Uses Next.js route groups for layout separation:
- `app/(auth)/` - Auth pages (login, signup) with centered layout
- `app/(dashboard)/` - Role-based dashboards with sidebar navigation
- `app/account/[address]/` - Public NFT viewing

### API Routes
Server-side logic in `app/api/`:
- `auth/login/route.ts`, `auth/signup/route.ts` - Authentication
- `solana/mint/route.ts` - NFT minting
- `merits/award/route.ts` - Award processing

### Services Layer
Reusable business logic in `services/`:
- `authService.ts` - Authentication helpers
- `auraService.ts` - Aura CRUD operations
- `solanaService.ts` - Blockchain interactions
- `firebaseService.ts` - Firestore utilities
- `studentAuraService.ts` - Student-specific aura queries

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
```

## Solana Integration

- **Network**: Devnet by default (configurable via RPC endpoint)
- **Wallet Adapters**: Supports Phantom, Solflare, etc. via `@solana/wallet-adapter-react-ui`
- **Metaplex**: Uses `@metaplex-foundation/umi` and `mpl-token-metadata` for NFT standards
- **Fallback**: Mock minting available when blockchain calls fail

### Real NFT Minting Flow
Teachers award auras by:
1. Connecting Solana wallet (must have devnet SOL)
2. Selecting student and aura type in award modal
3. Wallet signs transaction (pays ~0.01-0.02 SOL)
4. NFT minted on-chain and transferred to student wallet
5. Mint address and transaction hash stored in Firestore

**Get Devnet SOL**: https://faucet.solana.com/

### NFT Collection Setup
Before minting auras, admins should create a collection:
1. Switch to admin role (`/settings` → Development Tools)
2. Navigate to `/admin/collection`
3. Connect wallet and create collection
4. Add `NEXT_PUBLIC_AURA_COLLECTION_ADDRESS` to `.env.local`
5. Restart dev server

All aura NFTs link to this parent collection for authenticity and marketplace discovery.

### NFT Metadata
- Currently: Data URIs (base64-encoded JSON) for demo/testing
- Production: Upload to IPFS (NFT.Storage) or Arweave (Bundlr)
- Structure: Metaplex standard with attributes for aura type, teacher, school, date, category

**Verification**: View minted NFTs on Solana Explorer (devnet): https://explorer.solana.com/?cluster=devnet

## Testing & Deployment

### Firestore Rules Deployment
Security rules must be deployed separately:
```bash
# Method 1: Firebase Console
# Go to Firestore Database → Rules tab → Paste firestore.rules → Publish

# Method 2: Firebase CLI
firebase deploy --only firestore:rules
```

See `.claude/docs/FIRESTORE_RULES_SETUP.md` for detailed instructions.

### OAuth Configuration
Google and GitHub OAuth are enabled:
1. Firebase Console → Authentication → Sign-in method
2. Enable providers and configure callback URLs
3. Environment variables in `.env.local`:
   - `NEXT_GITHUB_CLIENT_ID`
   - `NEXT_GITHUB_SECRET`

OAuth users complete profile setup via modal after first login.

### Testing Checklist
- [ ] Authentication flows (email/password, Google, GitHub)
- [ ] Role-based dashboard access
- [ ] Teacher awards aura (real minting on devnet)
- [ ] NFT verification on Solana Explorer
- [ ] Student views aura collection
- [ ] Firestore security rules enforce access control

## Important Notes

- **Client Components**: Most interactive components need `'use client'` directive for hooks
- **Firebase Initialization**: Singleton pattern in `lib/firebase.ts` prevents multiple initializations
- **Wallet Connection**: Teachers must connect Solana wallet to mint NFTs
- **Role Verification**: Always check `userProfile.role` before rendering role-specific UI
- **TypeScript Strict Mode**: Enabled in tsconfig - maintain type safety
- **Mock vs Real Minting**: `createMockAuraNFT()` exists for testing; `mintAuraNFT()` does real blockchain transactions
- **OAuth Profile Setup**: Users signing in via OAuth for the first time see a role selection modal (cannot be dismissed)

## Documentation
Additional guides in `.claude/docs/`:
- `aurachain-docs.md` - Complete project planning, architecture, and roadmap
- `FIRESTORE_RULES_SETUP.md` - Security rules deployment guide
- `AUTH_SETUP.md` - Authentication system documentation
- `NFT_COLLECTION_GUIDE.md` - Collection setup walkthrough
- `nft-minting-guide.md` - Real NFT minting implementation details
