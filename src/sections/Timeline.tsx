import { CheckCircle2, Circle } from 'lucide-react'
import { sprints } from '@/data/milestones'
import { PillarBadge, PILLAR_CONFIG } from '@/components/PillarBadge'
import { cn } from '@/lib/utils'
import type { Pillar, SprintRow as SprintRowType } from '@/types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short' })
}

function isTodayBetween(prevDate: string, currDate: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const prev = prevDate ? new Date(prevDate) : null
  const curr = new Date(currDate)
  if (!prev) return today <= curr
  return today > prev && today <= curr
}

function getProgress() {
  const today = new Date()
  const start = new Date('2026-06-16')
  const end = new Date('2026-12-15')
  const pct = Math.min(100, Math.max(0, ((today.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100))
  const done = sprints.flatMap(s => s.milestones).filter(m => m.done).length
  const total = sprints.flatMap(s => s.milestones).filter(m => m.title).length
  return { pct: Math.round(pct), done, total }
}

export function Timeline() {
  const { pct, done, total } = getProgress()
  let todayInserted = false

  return (
    <section id="timeline" className="pt-16 min-h-screen gradient-page">
      <div className="max-w-6xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-14">
          <h2 className="text-5xl font-extrabold mb-3">
            <span className="text-gradient-orange">Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Sprint roadmap · June – December 2026
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-6">
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{done} milestones completed</span>
                <span>{total - done} remaining</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-orange rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${(done / Math.max(total, 1)) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-gradient-orange">{pct}%</div>
              <div className="text-xs text-muted-foreground">timeline elapsed</div>
            </div>
          </div>
        </div>

        {/* Pillar legend */}
        <div className="flex gap-3 mb-12">
          {(['Knowledge', 'Efficiency', 'Governance'] as Pillar[]).map(p => (
            <PillarBadge key={p} pillar={p} className="text-sm px-3 py-1" />
          ))}
        </div>

        {/* Timeline rows */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[160px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-border to-border" />

          <div className="space-y-1">
            {sprints.map((sprint, i) => {
              const prevDate = i > 0 ? sprints[i - 1].endDate : ''
              const showToday = !todayInserted && isTodayBetween(prevDate, sprint.endDate)
              if (showToday) todayInserted = true

              return (
                <div key={`${sprint.sprint}-${sprint.endDate}`}>
                  {showToday && <TodayIndicator />}
                  <SprintRow sprint={sprint} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TodayIndicator() {
  return (
    <div className="relative my-3 flex items-center" style={{ paddingLeft: 0 }}>
      {/* Label */}
      <div
        className="absolute z-20 flex items-center gap-1.5 gradient-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        style={{ left: 76 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
        TODAY
      </div>
      {/* Line */}
      <div
        className="absolute right-0 h-px"
        style={{
          left: 160,
          background: 'linear-gradient(90deg, #f97316 0%, #fdba74 60%, transparent 100%)',
        }}
      />
    </div>
  )
}

interface SprintRowProps {
  sprint: SprintRowType
}

function SprintRow({ sprint }: SprintRowProps) {
  const allDone = sprint.milestones.length > 0 && sprint.milestones.every(m => m.done)

  if (sprint.ipWeek) {
    const hasMilestones = sprint.milestones.length > 0
    return (
      <div className={cn('flex gap-0 py-1.5', !hasMilestones && 'opacity-40')}>
        <div className="w-[160px] text-right pr-6 shrink-0 pt-2">
          <div className="text-[10px] text-muted-foreground">{formatDate(sprint.endDate)}</div>
        </div>
        <div className="relative shrink-0 w-0">
          <div className="absolute top-2.5 w-3 h-3 rounded-full border border-dashed border-muted-foreground bg-background -translate-x-1/2 z-10" />
        </div>
        <div className="flex-1 ml-7 flex items-center gap-4 flex-wrap py-2">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
            IP Week
          </span>
          {hasMilestones && sprint.milestones.map((m, idx) => (
            <MilestoneChip key={idx} milestone={m} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-0 group py-1.5">
      {/* Date column */}
      <div className="w-[160px] text-right pr-6 shrink-0 pt-3">
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          {formatMonth(sprint.endDate)}
        </div>
        <div className="text-lg font-black text-foreground leading-none">
          {new Date(sprint.endDate).getDate()}
        </div>
        <div className="text-[10px] text-muted-foreground">
          Sprint {sprint.sprint}
        </div>
      </div>

      {/* Dot on spine */}
      <div className="relative shrink-0 w-0 flex flex-col items-center">
        <div className={cn(
          'absolute top-3.5 w-4 h-4 rounded-full border-2 -translate-x-1/2 transition-all z-10 shadow-sm',
          allDone
            ? 'bg-emerald-500 border-emerald-500 shadow-emerald-200'
            : 'bg-white border-orange-300 group-hover:border-primary group-hover:shadow-orange-100'
        )} />
      </div>

      {/* Card */}
      <div className={cn(
        'flex-1 ml-7 mb-2 rounded-2xl border p-5 transition-all duration-200',
        allDone
          ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-md shadow-emerald-100'
          : 'bg-white shadow-sm hover:shadow-md border-border hover:border-orange-200'
      )}>
        {sprint.milestones.length === 0 ? (
          <p className="text-sm text-muted-foreground/60 italic">No milestones yet</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {sprint.milestones.map((m, idx) => (
              <MilestoneChip key={idx} milestone={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface MilestoneChipProps {
  milestone: {
    pillar: Pillar
    title: string
    done: boolean
  }
}

function MilestoneChip({ milestone }: MilestoneChipProps) {
  const c = PILLAR_CONFIG[milestone.pillar]

  if (milestone.done) {
    return (
      <div className={cn(
        'relative flex items-start gap-3 px-4 py-3 rounded-xl border shadow-md overflow-hidden',
        'bg-gradient-to-br from-emerald-500 to-emerald-400 border-emerald-400'
      )}>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5 drop-shadow" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">
              ✓ Done
            </span>
          </div>
          <p className="text-sm font-bold leading-snug text-white">
            {milestone.title}
          </p>
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
            {milestone.pillar}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'flex items-start gap-3 px-4 py-3 rounded-xl border shadow-sm transition-all hover:shadow-md',
      c.bg, c.border, c.glow
    )}>
      <Circle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: c.iconColor }} />
      <div>
        <p className="text-sm font-semibold leading-snug text-foreground">
          {milestone.title}
        </p>
        <PillarBadge pillar={milestone.pillar} className="mt-1.5" />
      </div>
    </div>
  )
}
