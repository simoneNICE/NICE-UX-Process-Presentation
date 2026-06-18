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
  doneBg: string
  doneBorder: string
  doneSubtext: string
}> = {
  Knowledge: {
    label: 'Knowledge',
    dot: 'bg-orange-500',
    text: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    glow: 'shadow-orange-100',
    iconColor: '#f97316',
    doneBg: 'from-orange-600 to-orange-400',
    doneBorder: 'border-orange-400',
    doneSubtext: 'text-orange-100',
  },
  Efficiency: {
    label: 'Efficiency',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    glow: 'shadow-emerald-100',
    iconColor: '#10b981',
    doneBg: 'from-emerald-600 to-emerald-400',
    doneBorder: 'border-emerald-400',
    doneSubtext: 'text-emerald-100',
  },
  Governance: {
    label: 'Governance',
    dot: 'bg-violet-500',
    text: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    glow: 'shadow-violet-100',
    iconColor: '#8b5cf6',
    doneBg: 'from-violet-600 to-violet-400',
    doneBorder: 'border-violet-400',
    doneSubtext: 'text-violet-100',
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
