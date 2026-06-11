import { cn } from '@/lib/utils'
import type { Pillar } from '@/types'

export const PILLAR_CONFIG: Record<Pillar, {
  label: string
  dot: string
  text: string
  bg: string
  border: string
  glow: string
  iconColor: string
}> = {
  Knowledge: {
    label: 'Knowledge',
    dot: 'bg-blue-500',
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    glow: 'shadow-blue-100',
    iconColor: '#3b82f6',
  },
  Efficiency: {
    label: 'Efficiency',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    glow: 'shadow-emerald-100',
    iconColor: '#10b981',
  },
  Governance: {
    label: 'Governance',
    dot: 'bg-violet-500',
    text: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    glow: 'shadow-violet-100',
    iconColor: '#8b5cf6',
  },
}

interface PillarBadgeProps {
  pillar: Pillar
  className?: string
}

export function PillarBadge({ pillar, className }: PillarBadgeProps) {
  const c = PILLAR_CONFIG[pillar]
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border',
      c.bg, c.text, c.border, className
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', c.dot)} />
      {c.label}
    </span>
  )
}
