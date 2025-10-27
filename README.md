<div align="center">

# AuraChain

![AuraChain Logo](public/aura-transparent@0.2x.png)

**Permanent. Verifiable. Owned.**

Blockchain-powered student recognition platform transforming classroom achievements into permanent Solana NFTs

[Live Demo](https://aura-chain-i38w.vercel.app) • [Video Pitch](https://youtube.com/watch?v=sDsPfd2_i08) • [GitHub](https://github.com/kvndlgs/aurachain)

---

</div>

## 📖 Overview

AuraChain is a blockchain-powered student recognition platform that transforms classroom achievements into permanent digital badges (NFTs) on Solana. Teachers award students "auras" for academic excellence, positive behavior, and milestones—creating a verifiable, lifelong record of accomplishments.

Students collect their auras in personalized dashboards, parents track their children's progress, and schools build transparent merit systems. Built with Next.js 15, Firebase, and Solana's Metaplex standard, AuraChain brings Web3 innovation to education.

### Key Features

- 🎓 **Multi-Role Platform**: Separate dashboards for teachers, students, parents, and admins
- ⛓️ **Real Solana NFTs**: Mint achievement badges using Metaplex Token Metadata standard
- 🎨 **10+ Aura Types**: Spanning academic, behavioral, creative, and athletic categories
- 🔥 **Firebase Integration**: Authentication, Firestore database, and security rules
- 💼 **Wallet Integration**: Connect Phantom, Solflare, or any Solana wallet
- 📊 **Analytics Dashboard**: Track student achievements and progress over time
- 🏫 **Collection System**: Schools have verified NFT collections for authenticity
- 🔒 **Role-Based Access**: Secure permissions enforced via Firestore rules

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Firebase Account** ([Create one](https://firebase.google.com/))
- **Solana Wallet** (Phantom recommended - [Download](https://phantom.app/))
- **Devnet SOL** for testing ([Get from faucet](https://faucet.solana.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kvndlgs/aurachain.git
   cd aurachain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Solana Configuration (Optional - for collection setup)
   NEXT_PUBLIC_AURA_COLLECTION_ADDRESS=your_collection_mint_address

   # GitHub OAuth (Optional)
   NEXT_GITHUB_CLIENT_ID=your_github_client_id
   NEXT_GITHUB_SECRET=your_github_secret
   ```

   > **Note**: Get Firebase credentials from [Firebase Console](https://console.firebase.google.com/) → Project Settings → General → Your apps

4. **Deploy Firestore security rules**

   ```bash
   # Install Firebase CLI if you haven't
   npm install -g firebase-tools

   # Login to Firebase
   firebase login

   # Initialize Firebase (select Firestore)
   firebase init firestore

   # Deploy security rules
   firebase deploy --only firestore:rules
   ```

   > Alternatively, copy the contents of `firestore.rules` and paste into Firebase Console → Firestore Database → Rules tab

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🎯 Testing the Platform

### 1. Create an Account

- Sign up with email/password or use Google/GitHub OAuth
- Select your role (Teacher, Student, Parent, or Admin)
- Complete profile setup

### 2. For Teachers: Award Your First Aura

1. Navigate to the Teacher Dashboard
2. Click **"Award Aura"**
3. Connect your Solana wallet (ensure you have devnet SOL)
4. Select a student and aura type
5. Confirm the transaction in your wallet
6. View the minted NFT on [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)

### 3. For Students: View Your Collection

- Navigate to Student Dashboard
- See all awarded auras with metadata
- View NFT details including mint address and transaction hash

### 4. (Optional) Create a Collection

For production use, create a parent collection:
1. Switch to Admin role (`/settings` → Development Tools)
2. Go to `/admin/collection`
3. Connect wallet and create collection
4. Add `NEXT_PUBLIC_AURA_COLLECTION_ADDRESS` to `.env.local`
5. Restart dev server

---

## 🏗️ Project Structure

```
aurachain/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Auth pages (login, signup)
│   ├── (dashboard)/              # Role-based dashboards
│   │   ├── teacher/              # Teacher dashboard & features
│   │   ├── student/              # Student dashboard
│   │   ├── parent/               # Parent dashboard
│   │   └── admin/                # Admin panel
│   ├── account/[address]/        # Public NFT viewing
│   └── api/                      # API routes
│       ├── auth/                 # Authentication endpoints
│       ├── solana/               # NFT minting endpoints
│       └── merits/               # Aura award processing
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── teacher/                  # Teacher-specific components
│   ├── student/                  # Student-specific components
│   └── auth/                     # Auth components
├── lib/                          # Utilities & configuration
│   ├── firebase.ts               # Firebase initialization
│   ├── solana/                   # Solana/Metaplex integration
│   └── types/                    # TypeScript type definitions
├── services/                     # Business logic layer
│   ├── authService.ts            # Authentication helpers
│   ├── auraService.ts            # Aura CRUD operations
│   └── solanaService.ts          # Blockchain interactions
├── contexts/                     # React Context providers
│   └── auth-context.tsx          # Auth state management
├── firestore.rules               # Firestore security rules
└── .claude/docs/                 # Documentation
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library

### Backend
- **Firebase Auth** - User authentication (email/password, Google, GitHub)
- **Firestore** - NoSQL database with security rules
- **Next.js API Routes** - Server-side endpoints

### Blockchain
- **Solana** - Fast, low-cost blockchain (Devnet/Mainnet)
- **Metaplex UMI** - NFT standard implementation
- **@solana/wallet-adapter** - Wallet connection
- **@metaplex-foundation/mpl-token-metadata** - Token metadata

### State Management
- **React Context** - Auth state
- **TanStack Query** - Server state caching

---

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm start                # Start production server
npm run build            # Build for production

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run ci               # Run all checks (build + lint + format)
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy

3. **Post-Deployment**
   - Update Firebase authorized domains (Firebase Console → Authentication → Settings)
   - Test authentication flows
   - Verify Solana wallet connections work

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### For Judges/Evaluators

To test the platform locally:
1. Follow the [Quick Start](#-quick-start) guide
2. Create a teacher account and award an aura
3. Check [Solana Explorer](https://explorer.solana.com/?cluster=devnet) to verify the NFT
4. Review the codebase structure in `lib/solana/mint-aura.ts`

### For Contributors

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run ci
   ```
5. **Commit with descriptive message**
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push and create a Pull Request**

### Contribution Ideas

- Add new aura types or categories
- Implement parent-child linking system
- Create analytics visualizations
- Add IPFS metadata storage
- Build mobile app (React Native)
- Integrate W3C Verifiable Credentials standard

---

## 📖 Documentation

Additional documentation available in `.claude/docs/`:
- [Complete Project Documentation](/.claude/docs/aurachain-docs.md)
- [NFT Minting Guide](/.claude/docs/nft-minting-guide.md)
- [Firestore Rules Setup](/.claude/docs/FIRESTORE_RULES_SETUP.md)
- [Authentication System](/.claude/docs/AUTH_SETUP.md)
- [Collection Setup Guide](/.claude/docs/NFT_COLLECTION_GUIDE.md)

---

## 🔒 Security

- **Firestore Security Rules**: Role-based access control
- **Environment Variables**: Never commit `.env.local` to Git
- **Wallet Security**: Private keys never leave the user's wallet
- **OAuth**: Secure Google/GitHub authentication via Firebase

Report security issues to: [your-email@example.com]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Solana Foundation** - Blockchain infrastructure
- **Metaplex** - NFT standard and tools
- **Firebase** - Backend services
- **Vercel** - Deployment platform
- **shadcn/ui** - Beautiful component library

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/kvndlgs/aurachain/issues)
- **Live Demo**: [https://aura-chain-i38w.vercel.app](https://aura-chain-i38w.vercel.app)
- **Video Demo**: [https://youtube.com/watch?v=sDsPfd2_i08](https://youtube.com/watch?v=sDsPfd2_i08)

---

<div align="center">

**Built with ❤️ for the future of education**

⭐ Star this repo if you find it useful!

</div>