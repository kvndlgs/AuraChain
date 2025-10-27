import Image from 'next/image'

interface AuraIconProps {
  icon: string
  size?: number
  className?: string
}

/**
 * Renders an aura icon - supports both emoji and image URLs
 */
export function AuraIcon({ icon, size = 32, className = '' }: AuraIconProps) {
  // Check if icon is an image path (starts with / or http)
  const isImage = icon.startsWith('/') || icon.startsWith('http')

  if (isImage) {
    return (
      <Image
        src={icon}
        alt="Aura badge"
        width={size}
        height={size}
        className={className}
      />
    )
  }

  // Render as emoji
  return (
    <span
      className={className}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    >
      {icon}
    </span>
  )
}
