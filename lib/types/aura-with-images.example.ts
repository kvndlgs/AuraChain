/**
 * EXAMPLE: How to use custom badge images instead of emojis
 *
 * Once you've added your custom badge images to /public/badges/,
 * update DEFAULT_AURAS in aura.ts like this:
 */

import { Aura, AuraCategory } from './aura'

export const DEFAULT_AURAS_WITH_IMAGES: Omit<Aura, 'id' | 'createdAt'>[] = [
  {
    name: 'Excellent Work',
    description: 'Outstanding effort and achievement',
    category: 'cross-class' as AuraCategory,
    icon: '/badges/excellent-work.png', // 👈 Image path instead of emoji
    color: '#FFD700',
    isDefault: true,
  },
  {
    name: 'Great Teamwork',
    description: 'Exceptional collaboration with peers',
    category: 'cross-class' as AuraCategory,
    icon: '/badges/great-teamwork.png', // 👈 Image path
    color: '#4CAF50',
    isDefault: true,
  },
  {
    name: 'Creative Thinking',
    description: 'Innovative and imaginative approach',
    category: 'cross-class' as AuraCategory,
    icon: '/badges/creative-thinking.png', // 👈 Image path
    color: '#FFC107',
    isDefault: true,
  },
  {
    name: 'Great Participation',
    description: 'Active engagement in class activities',
    category: 'cross-class' as AuraCategory,
    icon: '/badges/great-participation.png', // 👈 Image path
    color: '#2196F3',
    isDefault: true,
  },
  {
    name: 'Significant Improvement',
    description: 'Notable progress and growth',
    category: 'cross-class' as AuraCategory,
    icon: '/badges/significant-improvement.png', // 👈 Image path
    color: '#9C27B0',
    isDefault: true,
  },
  {
    name: 'Math Master',
    description: 'Excellence in mathematics',
    category: 'math' as AuraCategory,
    icon: '/badges/math-master.png', // 👈 Image path
    color: '#FF5722',
    isDefault: true,
  },
  {
    name: 'Artistic Genius',
    description: 'Creative excellence in arts',
    category: 'art' as AuraCategory,
    icon: '/badges/artistic-genius.png', // 👈 Image path
    color: '#E91E63',
    isDefault: true,
  },
  {
    name: 'Athletic Achievement',
    description: 'Outstanding performance in PE',
    category: 'pe' as AuraCategory,
    icon: '/badges/athletic-achievement.png', // 👈 Image path
    color: '#00BCD4',
    isDefault: true,
  },
  {
    name: 'Reading Champion',
    description: 'Excellence in reading and comprehension',
    category: 'english' as AuraCategory,
    icon: '/badges/reading-champion.png', // 👈 Image path
    color: '#3F51B5',
    isDefault: true,
  },
  {
    name: 'Science Star',
    description: 'Outstanding scientific inquiry',
    category: 'science' as AuraCategory,
    icon: '/badges/science-star.png', // 👈 Image path
    color: '#4CAF50',
    isDefault: true,
  },
]

/**
 * STEPS TO USE CUSTOM BADGES:
 *
 * 1. Add your badge images to: /public/badges/
 *    - Use PNG format with transparency
 *    - Recommended size: 512x512px
 *    - Name files: excellent-work.png, great-teamwork.png, etc.
 *
 * 2. Update lib/types/aura.ts:
 *    - Copy the icon paths from this file
 *    - Replace the emoji icons in DEFAULT_AURAS
 *
 * 3. The components will automatically render images!
 *    - AuraBadge, AwardAuraModal, and recent awards
 *    - All use the new AuraIcon component
 *
 * 4. NFT metadata will include the full image URL
 */
