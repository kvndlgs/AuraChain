'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { UserProfile, UserRole } from '../lib/types/user'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  needsProfileSetup: boolean
  signUp: (email: string, password: string, displayName: string, role: UserRole, schoolCode?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGitHub: () => Promise<void>
  completeOAuthProfile: (role: UserRole, schoolCode?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Fetch user profile from Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userDocRef)

          if (userDoc.exists()) {
            const profileData = userDoc.data() as UserProfile
            setUserProfile(profileData)
            setNeedsProfileSetup(false)
          } else {
            // User logged in via OAuth but profile doesn't exist yet
            setUserProfile(null)
            setNeedsProfileSetup(true)
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      } else {
        setUserProfile(null)
        setNeedsProfileSetup(false)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    role: UserRole,
    schoolCode?: string
  ) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = userCredential

      // Update display name
      await updateProfile(user, { displayName })

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: email,
        displayName: displayName,
        role: role,
        schoolId: schoolCode,
        createdAt: new Date(),
      }

      await setDoc(doc(db, 'users', user.uid), userProfile)

      // Create role-specific profile
      if (role === 'teacher') {
        await setDoc(doc(db, 'teachers', user.uid), {
          userId: user.uid,
          schoolId: schoolCode,
          isActive: true,
          createdAt: new Date(),
        })
      } else if (role === 'student') {
        await setDoc(doc(db, 'students', user.uid), {
          userId: user.uid,
          schoolId: schoolCode,
          enrolledAt: new Date(),
        })
      }

      setUserProfile(userProfile)
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      // Profile setup is handled by onAuthStateChanged
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signInWithGitHub = async () => {
    try {
      const provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider)
      // Profile setup is handled by onAuthStateChanged
    } catch (error) {
      console.error('Error signing in with GitHub:', error)
      throw error
    }
  }

  const completeOAuthProfile = async (role: UserRole, schoolCode?: string) => {
    if (!user) {
      throw new Error('No user logged in')
    }

    try {
      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'User',
        role: role,
        schoolId: schoolCode,
        createdAt: new Date(),
      }

      await setDoc(doc(db, 'users', user.uid), userProfile)

      // Create role-specific profile
      if (role === 'teacher') {
        await setDoc(doc(db, 'teachers', user.uid), {
          userId: user.uid,
          schoolId: schoolCode,
          isActive: true,
          createdAt: new Date(),
        })
      } else if (role === 'student') {
        await setDoc(doc(db, 'students', user.uid), {
          userId: user.uid,
          schoolId: schoolCode,
          enrolledAt: new Date(),
        })
      }

      setUserProfile(userProfile)
      setNeedsProfileSetup(false)
    } catch (error) {
      console.error('Error completing OAuth profile:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUserProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    needsProfileSetup,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGitHub,
    completeOAuthProfile,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
