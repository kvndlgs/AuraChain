# AuraChain Authentication System

## Overview
A complete Firebase-based authentication system with role-based access control for the AuraChain application.

## Features Implemented

### 1. Firebase Configuration
- **File**: `lib/firebase.ts`
- Initializes Firebase App, Auth, Firestore, and Storage
- Handles multiple app instances properly
- Uses environment variables for configuration

### 2. Type Definitions
- **File**: `lib/types/user.ts`
- Defines user roles: `teacher`, `student`, `parent`, `admin`
- Type-safe interfaces for different user profiles
- Extended profiles for role-specific data

### 3. Authentication Context
- **File**: `contexts/auth-context.tsx`
- Provides global authentication state
- Methods:
  - `signUp()` - Register with email/password + role selection
  - `signIn()` - Login with email/password
  - `signInWithGoogle()` - OAuth login with Google
  - `signInWithGitHub()` - OAuth login with GitHub
  - `completeOAuthProfile()` - Complete profile setup after OAuth
  - `logout()` - Sign out user
- Automatically syncs with Firestore user profiles
- Creates role-specific documents in Firestore
- Handles OAuth profile setup flow with `needsProfileSetup` state

### 4. Authentication Pages

#### Login Page
- **Route**: `/login`
- **File**: `app/(auth)/login/page.tsx`
- Clean UI with email/password fields
- OAuth buttons (Google & GitHub)
- Error handling
- Link to signup page
- Auto-redirects if already logged in

#### Signup Page
- **Route**: `/signup`
- **File**: `app/(auth)/signup/page.tsx`
- Full name, email, password fields
- Role selection (Teacher, Student, Parent, Admin)
- Optional school code
- Password validation
- OAuth buttons (Google & GitHub)
- Creates user profile in Firestore
- Auto-redirects if already logged in

### 5. Protected Routes
- **File**: `components/auth/protected-route.tsx`
- Wraps dashboard pages to require authentication
- Role-based access control
- Automatic redirection based on user role
- Loading states

### 6. Dashboard Pages

#### Landing Page
- **Route**: `/`
- Shows AuraChain branding
- Links to login/signup
- Auto-redirects authenticated users

#### Dashboard Redirect
- **Route**: `/dashboard`
- Automatically redirects to role-specific dashboard

#### Teacher Dashboard
- **Route**: `/teacher`
- **File**: `app/(dashboard)/teacher/page.tsx`
- Protected route (requires authentication)
- Stats panel (auras awarded, weekly count, students)
- Quick actions
- Class management area

#### Student Dashboard
- **Route**: `/student`
- **File**: `app/(dashboard)/student/page.tsx`
- Protected route (requires authentication)
- Achievement stats
- Aura collection view

### 7. OAuth Components

#### OAuth Role Modal
- **File**: `components/auth/oauth-role-modal.tsx`
- Modal shown after first OAuth login
- Role selection (defaults to student)
- School code input
- Cannot be dismissed (no close button)
- Creates user profile after completion

#### OAuth Buttons
- **File**: `components/auth/oauth-buttons.tsx`
- Reusable `GoogleButton` component
- Reusable `GitHubButton` component
- Built-in loading states
- Error handling
- Proper brand styling (Google colors, GitHub icon)

### 8. Provider Integration
- **File**: `components/app-providers.tsx`
- AuthProvider wraps entire app
- Integrates with existing Solana, Theme, and Query providers

### 9. Firestore Security Rules
- **File**: `firestore.rules`
- Comprehensive security rules for all collections
- Role-based access control
- Prevents unauthorized access
- Immutable aura records
- See `FIRESTORE_RULES_SETUP.md` for deployment instructions

## User Flows

### New User Registration
1. Navigate to `/signup`
2. Enter full name, email, password
3. Select role (teacher, student, parent, admin)
4. Optionally enter school code
5. Submit form
6. Account created in Firebase Auth
7. User profile created in Firestore (`users` collection)
8. Role-specific profile created (`teachers` or `students` collection)
9. Redirected to appropriate dashboard

### Login Flow
1. Navigate to `/login`
2. Enter email and password
3. Submit form
4. Firebase Auth validates credentials
5. User profile fetched from Firestore
6. Redirected to `/dashboard`
7. Dashboard redirects to role-specific page:
   - Teachers → `/teacher`
   - Students → `/student`
   - Parents → `/parent`
   - Admins → `/admin`

### Protected Route Access
1. User attempts to access protected route
2. `ProtectedRoute` component checks authentication
3. If not authenticated → redirect to `/login`
4. If authenticated but wrong role → redirect to correct dashboard
5. If authorized → render page content

### OAuth Login Flow (Google/GitHub)
1. Navigate to `/login` or `/signup`
2. Click "Continue with Google" or "Continue with GitHub"
3. OAuth popup window opens
4. User authenticates with OAuth provider
5. Popup closes, user is signed into Firebase
6. `AuthContext` checks if user profile exists in Firestore
7. If profile exists → redirect to dashboard
8. If NO profile → show `OAuthRoleModal`
9. User selects role and enters school code
10. Profile created in Firestore
11. Modal closes, redirected to dashboard

## Firestore Structure

```
aurachain/
├── users/{userId}
│   ├── uid: string
│   ├── email: string
│   ├── displayName: string
│   ├── role: "teacher" | "parent" | "student" | "admin"
│   ├── schoolId: string (optional)
│   ├── walletAddress: string (optional)
│   └── createdAt: timestamp
│
├── teachers/{teacherId}
│   ├── userId: string
│   ├── schoolId: string
│   ├── isActive: boolean
│   └── createdAt: timestamp
│
└── students/{studentId}
    ├── userId: string
    ├── schoolId: string
    └── enrolledAt: timestamp
```

## Environment Variables
All Firebase configuration is stored in `.env.local`:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`
- `NEXT_GITHUB_CLIENT_ID` - GitHub OAuth App Client ID
- `NEXT_GITHUB_SECRET` - GitHub OAuth App Secret

## OAuth Setup in Firebase Console

### Google OAuth
1. Go to Firebase Console → Authentication → Sign-in method
2. Click on Google provider
3. Enable Google sign-in
4. Add your project's authorized domains
5. Save

### GitHub OAuth
1. Go to Firebase Console → Authentication → Sign-in method
2. Click on GitHub provider
3. Enable GitHub sign-in
4. You'll see a callback URL (copy this)
5. Go to GitHub → Settings → Developer settings → OAuth Apps
6. Create a new OAuth App or use existing
7. Set Authorization callback URL to the Firebase URL
8. Copy Client ID and Client Secret
9. Paste them into Firebase Console
10. Add to `.env.local` as shown above
11. Save

## Usage

### In Components
```tsx
import { useAuth } from '@/contexts/auth-context'

function MyComponent() {
  const {
    user,
    userProfile,
    loading,
    needsProfileSetup,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGitHub,
    completeOAuthProfile,
    logout
  } = useAuth()

  // Use authentication state and methods

  // Example: OAuth sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      // If needsProfileSetup is true, OAuthRoleModal will appear
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  }
}
```

### Protecting Routes
```tsx
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function ProtectedPage() {
  return (
    <ProtectedRoute allowedRoles={['teacher', 'admin']}>
      {/* Page content */}
    </ProtectedRoute>
  )
}
```

## Next Steps

1. **Deploy Firestore Security Rules** - Use `firestore.rules` file (see `FIRESTORE_RULES_SETUP.md`)
2. **Enable OAuth in Firebase** - Follow "OAuth Setup in Firebase Console" section above
3. **Email Verification** - Add email verification flow
4. **Password Reset** - Implement forgot password functionality
5. **Profile Management** - Allow users to update their profiles
6. **School Management** - Create school creation and joining flows
7. **Class Management** - Allow teachers to create and manage classes
8. **Student Enrollment** - Link students to teachers/classes

## Testing

The development server is running at http://localhost:3001

Test the flows:
1. Visit http://localhost:3001 - Should see landing page
2. Click "Get Started" → Navigate to signup
3. **Email/Password**: Create an account with role selection
4. Should be redirected to appropriate dashboard
5. Logout and try logging back in
6. **OAuth**: Click "Continue with Google" or "Continue with GitHub"
7. Authenticate with OAuth provider
8. If first time, complete profile setup modal
9. Should be redirected to dashboard
10. Test protected route access

## Files Created/Modified

**New Files:**
- `lib/firebase.ts` - Firebase initialization
- `lib/types/user.ts` - User type definitions
- `contexts/auth-context.tsx` - Authentication context with OAuth
- `components/auth/protected-route.tsx` - Protected route wrapper
- `components/auth/oauth-role-modal.tsx` - OAuth profile setup modal
- `components/auth/oauth-buttons.tsx` - Reusable OAuth buttons
- `app/(auth)/layout.tsx` - Auth layout
- `app/(auth)/login/page.tsx` - Login page with OAuth
- `app/(auth)/signup/page.tsx` - Signup page with OAuth
- `app/(dashboard)/layout.tsx` - Dashboard layout with protection
- `app/(dashboard)/teacher/page.tsx` - Teacher dashboard
- `app/(dashboard)/student/page.tsx` - Student dashboard
- `app/dashboard/page.tsx` - Dashboard redirect
- `firestore.rules` - Firestore security rules
- `FIRESTORE_RULES_SETUP.md` - Firestore deployment guide
- `AUTH_SETUP.md` - This documentation

**Modified Files:**
- `components/app-providers.tsx` - Added AuthProvider
- `components/dashboard/dashboard-feature.tsx` - Updated landing page with OAuth
- `components/ui/dialog.tsx` - Added hideCloseButton prop
- `.env.local` - Added GitHub OAuth credentials
