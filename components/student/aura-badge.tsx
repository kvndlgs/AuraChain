'use client'

import { AwardedAura } from '../../lib/types/aura'
import { formatDistanceToNow } from 'date-fns'

interface AuraBadgeProps {
  aura: AwardedAura
  onClick?: () => void
}

export function AuraBadge({ aura, onClick }: AuraBadgeProps) {
  const formattedDate = formatDistanceToNow(aura.awardedAt, { addSuffix: true })

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg border bg-card p-6 text-left transition-all hover:scale-105 hover:shadow-lg"
      style={{
        borderLeftColor: aura.color,
        borderLeftWidth: '4px',
      }}
    >
      {/* Aura Icon */}
      <div className="mb-4 flex items-center justify-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-4xl transition-transform group-hover:scale-110"
          style={{
            backgroundColor: `${aura.color}20`,
          }}
        >
          {aura.icon}
        </div>
      </div>

      {/* Aura Name */}
      <h3 className="mb-2 text-center font-semibold">{aura.auraName}</h3>

      {/* Teacher Info */}
      <div className="space-y-1 text-center text-xs text-muted-foreground">
        <p>By {aura.teacherName}</p>
        <p>{formattedDate}</p>
      </div>

      {/* Category Badge */}
      <div className="mt-3 flex justify-center">
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs capitalize text-primary">
          {aura.category}
        </span>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  )
}
