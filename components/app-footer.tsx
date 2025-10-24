import React from 'react'

export function AppFooter() {
  return (
    <footer className="text-center p-2 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-400 text-xs">
      <a
        className="flex items-center justify-start gap-2 link hover:text-neutral-500 dark:hover:text-white"
        href="https://github.com/kvndlgs/aurachain"
        target="_blank"
        rel="noopener noreferrer"
      >
      <span><img src='/aura-icon.webp' alt='aura' className='w-4' /></span>  &copy; 2025 All Right Reserved
      </a>
    </footer>
  )
}
