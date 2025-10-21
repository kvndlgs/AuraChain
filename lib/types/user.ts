export type UserRole = 'teacher' | 'parent' | 'student' | 'admin'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  schoolId?: string
  walletAddress?: string
  createdAt: Date
}

export interface TeacherProfile extends UserProfile {
  role: 'teacher'
  subject?: string
  classes?: string[]
  isActive: boolean
}

export interface StudentProfile extends UserProfile {
  role: 'student'
  grade?: string
  enrolledAt?: Date
}

export interface ParentProfile extends UserProfile {
  role: 'parent'
  children?: string[] // Array of student IDs
}

export interface AdminProfile extends UserProfile {
  role: 'admin'
  permissions?: string[]
}
