import { collection, query, where, orderBy, getDocs, Timestamp, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { AwardedAura } from '../lib/types/aura'

export interface StudentAuraStats {
  total: number
  thisMonth: number
  categories: Record<string, number>
  latestAura?: AwardedAura
}

/**
 * Fetch all awarded auras for a specific student
 */
export async function getStudentAuras(studentId: string): Promise<AwardedAura[]> {
  try {
    const aurasRef = collection(db, 'awardedauras')
    // Simpler query without orderBy to avoid index requirement
    const q = query(
      aurasRef,
      where('studentId', '==', studentId)
    )

    const snapshot = await getDocs(q)
    const auras: AwardedAura[] = []

    snapshot.forEach((doc) => {
      const data = doc.data()
      auras.push({
        id: doc.id,
        auraId: data.auraId,
        auraName: data.auraName,
        studentId: data.studentId,
        studentName: data.studentName,
        issuedByTeacherId: data.issuedByTeacherId,
        teacherName: data.teacherName,
        schoolId: data.schoolId,
        nftMintAddress: data.nftMintAddress,
        transactionHash: data.transactionHash,
        notes: data.notes,
        awardedAt: data.awardedAt?.toDate() || new Date(),
        category: data.category,
        icon: data.icon,
        color: data.color,
      })
    })

    // Sort in JavaScript instead of Firestore
    return auras.sort((a, b) => b.awardedAt.getTime() - a.awardedAt.getTime())
  } catch (error) {
    console.error('Error fetching student auras:', error)
    return []
  }
}

/**
 * Calculate stats from awarded auras
 */
export function calculateAuraStats(auras: AwardedAura[]): StudentAuraStats {
  const now = new Date()
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const thisMonthAuras = auras.filter((aura) => aura.awardedAt >= thisMonthStart)

  const categories: Record<string, number> = {}
  auras.forEach((aura) => {
    categories[aura.category] = (categories[aura.category] || 0) + 1
  })

  return {
    total: auras.length,
    thisMonth: thisMonthAuras.length,
    categories,
    latestAura: auras[0], // Already sorted by date desc
  }
}

/**
 * Listen to real-time updates for student auras
 */
export function subscribeToStudentAuras(
  studentId: string,
  callback: (auras: AwardedAura[]) => void
): () => void {
  const aurasRef = collection(db, 'awardedauras')
  const q = query(
    aurasRef,
    where('studentId', '==', studentId),
    orderBy('awardedAt', 'desc')
  )

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const auras: AwardedAura[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        auras.push({
          id: doc.id,
          auraId: data.auraId,
          auraName: data.auraName,
          studentId: data.studentId,
          studentName: data.studentName,
          issuedByTeacherId: data.issuedByTeacherId,
          teacherName: data.teacherName,
          schoolId: data.schoolId,
          nftMintAddress: data.nftMintAddress,
          transactionHash: data.transactionHash,
          notes: data.notes,
          awardedAt: data.awardedAt?.toDate() || new Date(),
          category: data.category,
          icon: data.icon,
          color: data.color,
        })
      })
      callback(auras)
    },
    (error) => {
      console.error('Error in real-time listener:', error)
      callback([])
    }
  )

  return unsubscribe
}

/**
 * Get recent auras (last N)
 */
export function getRecentAuras(auras: AwardedAura[], limit: number = 5): AwardedAura[] {
  return auras.slice(0, limit)
}
