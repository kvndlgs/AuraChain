import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { AwardedAura } from '../lib/types/aura'

/**
 * Fetch awarded auras by a specific teacher
 */
export async function getTeacherAwardedAuras(teacherId: string, limitCount: number = 10): Promise<AwardedAura[]> {
  try {
    const aurasRef = collection(db, 'awardedauras')
    const q = query(
      aurasRef,
      where('issuedByTeacherId', '==', teacherId),
      limit(limitCount)
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

    // Sort in JavaScript instead of Firestore to avoid index requirement
    return auras.sort((a, b) => b.awardedAt.getTime() - a.awardedAt.getTime())
  } catch (error) {
    console.error('Error fetching teacher awarded auras:', error)
    return []
  }
}

/**
 * Calculate teacher statistics from awarded auras
 */
export function calculateTeacherStats(auras: AwardedAura[]) {
  const now = new Date()
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const thisWeek = auras.filter((aura) => aura.awardedAt >= weekStart)

  // Count unique students
  const uniqueStudents = new Set(auras.map((aura) => aura.studentId))

  return {
    total: auras.length,
    thisWeek: thisWeek.length,
    uniqueStudents: uniqueStudents.size,
  }
}
