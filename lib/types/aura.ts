export type AuraCategory = 'cross-class' | 'math' | 'art' | 'pe' | 'english' | 'science' | 'custom'

export interface Aura {
  id: string
  name: string
  description: string
  category: AuraCategory
  icon: string // emoji or image URL
  color: string // hex color
  isDefault: boolean
  createdAt: Date
  createdBy?: string // for custom auras
}

export interface AwardedAura {
  id: string
  auraId: string
  auraName: string
  studentId: string
  studentName: string
  issuedByTeacherId: string
  teacherName: string
  schoolId?: string
  nftMintAddress?: string // Solana NFT address
  transactionHash?: string
  notes?: string
  awardedAt: Date
  category: AuraCategory
  icon: string
  color: string
}

// Default aura types from the docs
export const DEFAULT_AURAS: Omit<Aura, 'id' | 'createdAt'>[] = [
  {
    name: 'Excellent Work',
    description: 'Outstanding effort and achievement',
    category: 'cross-class',
    icon: '⭐',
    color: '#FFD700',
    isDefault: true,
  },
  {
    name: 'Great Teamwork',
    description: 'Exceptional collaboration with peers',
    category: 'cross-class',
    icon: '🤝',
    color: '#4CAF50',
    isDefault: true,
  },
  {
    name: 'Creative Thinking',
    description: 'Innovative and imaginative approach',
    category: 'cross-class',
    icon: '💡',
    color: '#FFC107',
    isDefault: true,
  },
  {
    name: 'Great Participation',
    description: 'Active engagement in class activities',
    category: 'cross-class',
    icon: '📚',
    color: '#2196F3',
    isDefault: true,
  },
  {
    name: 'Significant Improvement',
    description: 'Notable progress and growth',
    category: 'cross-class',
    icon: '🏆',
    color: '#9C27B0',
    isDefault: true,
  },
  {
    name: 'Math Master',
    description: 'Excellence in mathematics',
    category: 'math',
    icon: '🔢',
    color: '#FF5722',
    isDefault: true,
  },
  {
    name: 'Artistic Excellence',
    description: 'Outstanding creativity in art',
    category: 'art',
    icon: '🎨',
    color: '#E91E63',
    isDefault: true,
  },
  {
    name: 'Athletic Achievement',
    description: 'Great performance in physical education',
    category: 'pe',
    icon: '⚽',
    color: '#00BCD4',
    isDefault: true,
  },
  {
    name: 'Reading Star',
    description: 'Exceptional reading skills',
    category: 'english',
    icon: '📖',
    color: '#3F51B5',
    isDefault: true,
  },
  {
    name: 'Science Explorer',
    description: 'Curiosity and discovery in science',
    category: 'science',
    icon: '🔬',
    color: '#009688',
    isDefault: true,
  },
]

export interface NFTMetadata {
  name: string
  symbol: string
  description: string
  image: string
  external_url?: string
  attributes: {
    trait_type: string
    value: string
  }[]
  properties?: {
    creators?: {
      address: string
      verified: boolean
      share: number
    }[]
  }
}
