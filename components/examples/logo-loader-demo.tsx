'use client'

import { LogoLoader } from '@/components/logo-loader'

/**
 * Demo component showing different uses of the LogoLoader
 *
 * You can use this as a reference and delete it later.
 */
export function LogoLoaderDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-2xl font-bold">LogoLoader Examples</h2>

      {/* Default Loader */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-medium">Default (200px)</h3>
        <LogoLoader />
      </div>

      {/* Small Loader */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-medium">Small (100px)</h3>
        <LogoLoader size={100} />
      </div>

      {/* Large Loader */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-medium">Large (300px)</h3>
        <LogoLoader size={300} />
      </div>

      {/* Fast Animation */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-medium">Fast (2x speed)</h3>
        <LogoLoader />
      </div>

      {/* Slow Animation */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-medium">Slow (0.5x speed)</h3>
        <LogoLoader />
      </div>

      {/* With Custom Styling */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-medium">With Custom Background</h3>
        <LogoLoader size={150} className="bg-brand-500 rounded-full p-4" />
      </div>
    </div>
  )
}

/**
 * Full Page Loading Screen Example
 */
export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <LogoLoader size={200} />
        <p className="text-muted-foreground text-lg">Loading...</p>
      </div>
    </div>
  )
}

/**
 * Inline Loading State Example
 */
export function InlineLoader() {
  return (
    <div className="flex items-center gap-4">
      <LogoLoader size={40} />
      <span>Processing your request...</span>
    </div>
  )
}
