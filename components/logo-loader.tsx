'use client'

import Lottie from 'lottie-react'
import logoLoaderAnimation from '@/public/logo-loader-1.json'

interface LogoLoaderProps {
  /**
   * Size of the loader
   * @default 200
   */
  size?: number
  /**
   * Animation speed multiplier
   * @default 1

   * Whether the animation should loop
   * @default true
   */
  loop?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

export function LogoLoader({ size = 200, loop = true, className = '' }: LogoLoaderProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Lottie
        animationData={logoLoaderAnimation}
        loop={loop}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
