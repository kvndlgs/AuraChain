import React from 'react'

export function AppHero({
  children,
  subtitle,
  title,
}: {
  children?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
}) {
  return (
    <div className="flex flex-row justify-center py-0 md:py-0">
      <div className="text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-sans font-black">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="pt-4 md:py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  )
}
