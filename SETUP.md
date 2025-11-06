# AuraChain Development Environment Setup

This guide will help you set up your local development environment for AuraChain.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kvndlgs/aurachain.git
cd aurachain
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Solana libraries, Firebase, and more.

### 3. Set Up Firebase

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "aurachain-dev")
4. Disable Google Analytics (optional for development)
5. Click "Create project"

#### Enable Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click "Get started"
3. Enable the following sign-in methods:
   - **Email/Password** (required)
   - **Google** (optional but recommended)
   - **GitHub** (optional)

#### Create Firestore Database

1. In Firebase Console, go to **Build → Firestore Database**
2. Click "Create database"
3. Choose **"Start in test mode"** for development
4. Select your preferred location
5. Click "Enable"

#### Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app (name it "AuraChain Web")
5. Copy the configuration values

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### 5. Deploy Firestore Security Rules

Security rules control who can read/write data in your Firestore database.

#### Option A: Using Firebase CLI (Recommended)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select Firestore only)
firebase init firestore

# When prompted:
# - Select your Firebase project
# - Keep the default firestore.rules filename
# - Don't overwrite the existing rules file

# Deploy the rules
firebase deploy --only firestore:rules
```

#### Option B: Using Firebase Console

1. Go to Firebase Console → **Firestore Database**
2. Click the **"Rules"** tab
3. Copy the contents of `firestore.rules` from the project
4. Paste into the editor
5. Click **"Publish"**

### 6. Set Up Solana Wallet (For Testing NFT Minting)

1. Install [Phantom Wallet](https://phantom.app/) browser extension
2. Create a new wallet or import an existing one
3. Switch to **Devnet** in wallet settings
4. Get free devnet SOL:
   - Go to [Solana Faucet](https://faucet.solana.com/)
   - Paste your wallet address
   - Click "Airdrop"
   - Wait for confirmation (you'll receive ~1-2 SOL)

### 7. Start Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

## Verification Checklist

Test that everything is working:

- [ ] **Dev server runs** - `npm run dev` starts without errors
- [ ] **Firebase connection** - No console errors about Firebase config
- [ ] **Sign up works** - Create a new account with email/password
- [ ] **Role selection** - Can select a role (Teacher/Student/Parent/Admin)
- [ ] **Dashboard loads** - Role-specific dashboard displays correctly
- [ ] **Wallet connection** (for teachers) - Can connect Solana wallet

## Optional: Test NFT Minting

To test the full NFT minting flow:

1. **Create a test teacher account**
   - Sign up with a new email
   - Select "Teacher" role

2. **Award an aura**
   - Click "Award Aura" button
   - Connect your Phantom wallet
   - Select a student (create a student account first if needed)
   - Choose an aura type
   - Confirm the transaction

3. **Verify on Solana Explorer**
   - Copy the transaction hash from the success message
   - Go to [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)
   - Paste the transaction hash to view the minted NFT

## Optional: Create a Collection

For production use, create a parent NFT collection:

1. **Switch to admin role**
   - Go to `/settings`
   - Scroll to "Development Tools"
   - Click "Switch to Admin"

2. **Create collection**
   - Navigate to `/admin/collection`
   - Connect your wallet
   - Click "Create Collection"
   - Confirm the transaction

3. **Update environment**
   - Copy the collection mint address
   - Add to `.env.local`:
     ```env
     NEXT_PUBLIC_AURA_COLLECTION_ADDRESS=your_collection_mint_address
     ```
   - Restart the dev server

## Troubleshooting

### Firebase connection errors

- **Issue**: "Firebase: Error (auth/invalid-api-key)"
- **Solution**: Double-check your API key in `.env.local`

### Firestore permission errors

- **Issue**: "Missing or insufficient permissions"
- **Solution**: Deploy Firestore security rules (Step 5)

### Wallet connection fails

- **Issue**: Wallet doesn't connect or shows wrong network
- **Solution**: Ensure Phantom is set to Devnet, not Mainnet

### NFT minting fails

- **Issue**: Transaction fails or times out
- **Solution**:
  - Check you have devnet SOL in your wallet
  - Ensure wallet is connected
  - Try again (devnet can be slow)

### Build errors

- **Issue**: TypeScript or build errors
- **Solution**:
  ```bash
  # Clear Next.js cache
  rm -rf .next

  # Reinstall dependencies
  rm -rf node_modules package-lock.json
  npm install

  # Try building again
  npm run build
  ```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm start               # Start production server
npm run build           # Build for production

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting
npm run ci              # Run all checks (build + lint + format)
```

## Next Steps

- **Read the docs**: Check `.claude/docs/` for detailed guides
- **Explore the code**: Start with `app/` directory structure
- **Test features**: Try all user roles (Teacher, Student, Parent, Admin)
- **Mint NFTs**: Award auras and verify on Solana Explorer

## Getting Help

- **Documentation**: See [README.md](README.md) and `.claude/docs/`
- **Issues**: Report bugs on [GitHub Issues](https://github.com/kvndlgs/aurachain/issues)
- **Video Demo**: Watch the [pitch video](https://youtube.com/watch?v=sDsPfd2_i08)

---

**Happy coding! 🚀**
