import { CheckCircle2, Circle, Clock, ChevronRight, X, CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { sprints } from '@/data/milestones'
import { PillarBadge, PILLAR_CONFIG } from '@/components/PillarBadge'
import { cn } from '@/lib/utils'
import type { Pillar, SprintRow as SprintRowType, Milestone } from '@/types'

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
  const start = new Date('2026-05-26')
  const end = new Date('2026-12-15')
  const pct = Math.min(100, Math.max(0, ((today.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100))
  const done = sprints.flatMap(s => s.milestones).filter(m => m.status === 'done').length
  const total = sprints.flatMap(s => s.milestones).filter(m => m.title).length
  return { pct: Math.round(pct), done, total }
}

// Date column width — must match the spine position
const DATE_COL = 'w-32'       // 128px
const SPINE_POS = 'left-32'   // same 128px

export function Timeline() {
  const { pct, done, total } = getProgress()
  let todayInserted = false

  return (
    <section id="timeline" className="pt-16 min-h-screen gradient-page">
      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-14">
          <h2 className="text-5xl font-extrabold mb-3">
            <span className="text-gradient-primary">Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Sprint roadmap · May – December 2026
          </p>
          <div className="flex items-center gap-6 max-w-md">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{done} milestones completed</span>
                <span>{total - done} remaining</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${(done / Math.max(total, 1)) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-gradient-primary">{pct}%</div>
              <div className="text-xs text-muted-foreground">elapsed</div>
            </div>
          </div>
        </div>

        {/* Pillar legend */}
        <div className="flex gap-3 mb-12">
          {(['Knowledge', 'Efficiency', 'Governance'] as Pillar[]).map(p => (
            <PillarBadge key={p} pillar={p} className="text-sm px-3 py-1" />
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine — aligned with date column right edge */}
          <div className={`absolute ${SPINE_POS} top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-border to-border`} />

          <div className="space-y-1">
            {sprints.map((sprint, i) => {
              const prevDate = i > 0 ? sprints[i - 1].endDate : ''
              const showToday = !todayInserted && isTodayBetween(prevDate, sprint.endDate)
              if (showToday) todayInserted = true

              return (
                <div key={`${sprint.sprint}-${sprint.endDate}`}>
                  {showToday && <TodayIndicator dateColClass={DATE_COL} />}
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

function TodayIndicator({ dateColClass }: { dateColClass: string }) {
  return (
    <div className="relative flex items-center my-3 h-8">
      {/* Empty date column space */}
      <div className={`${dateColClass} flex-shrink-0`} />
      {/* Line + badge starting from spine */}
      <div className="flex-1 relative flex items-center">
        <div
          className="absolute left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, #f97316 0%, transparent 80%)' }}
        />
        <span className="relative z-10 -ml-px gradient-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
          TODAY
        </span>
      </div>
    </div>
  )
}

function SprintRow({ sprint }: { sprint: SprintRowType }) {
  const allDone = sprint.milestones.length > 0 && sprint.milestones.every(m => m.status === 'done')

  const dotClass = cn(
    'rounded-full z-10 flex-shrink-0 shadow-sm transition-all -translate-x-1/2',
    sprint.ipWeek
      ? 'w-3 h-3 border border-dashed border-muted-foreground bg-background'
      : allDone
        ? 'w-4 h-4 bg-emerald-500 border-2 border-emerald-500 shadow-emerald-200'
        : 'w-4 h-4 bg-white border-2 border-blue-300'
  )

  return (
    <div className="relative flex items-start py-3">
      {/* Date column — right-aligned text, clear background */}
      <div className={`${DATE_COL} flex-shrink-0 pr-5 text-right`}>
        <div className="flex flex-col items-end leading-none gap-0.5">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {formatMonth(sprint.endDate)}
          </span>
          <span className="text-2xl font-black text-foreground leading-none">
            {new Date(sprint.endDate).getDate()}
          </span>
          <span className={cn(
            'text-[10px]',
            sprint.ipWeek ? 'text-blue-400 font-semibold italic' : 'text-muted-foreground'
          )}>
            {sprint.ipWeek ? `IP Week ${new Date(sprint.endDate).getFullYear()}` : sprint.sprint}
          </span>
        </div>
      </div>

      {/* Dot — centered on the spine */}
      <div className={dotClass} style={{ marginTop: '6px' }} />

      {/* Cards */}
      <div className="flex-1 pl-6 flex flex-row flex-wrap gap-2 content-start">
        {sprint.milestones.length > 0 ? (
          sprint.milestones.map((m, idx) => (
            <div key={idx} className="w-[calc(33.333%-6px)] min-w-[160px]">
              <MilestoneChip milestone={m} />
            </div>
          ))
        ) : (
          <div className="flex items-center h-9 px-4 rounded-xl border border-dashed border-border">
            <span className="text-xs text-muted-foreground/50 italic">No milestones</span>
          </div>
        )}
      </div>
    </div>
  )
}

const DONE_STYLES: Record<Pillar, { card: string; subtext: string }> = {
  Knowledge:  { card: 'bg-gradient-to-br from-orange-600 to-orange-400 border-orange-400',   subtext: 'text-orange-100' },
  Efficiency: { card: 'bg-gradient-to-br from-emerald-600 to-emerald-400 border-emerald-400', subtext: 'text-emerald-100' },
  Governance: { card: 'bg-gradient-to-br from-violet-600 to-violet-400 border-violet-400',   subtext: 'text-violet-100' },
}

function MilestoneChip({ milestone }: { milestone: Milestone }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {milestone.status === 'done'
        ? <DoneChip milestone={milestone} onClick={() => setOpen(true)} />
        : milestone.status === 'in_progress'
          ? <InProgressChip milestone={milestone} onClick={() => setOpen(true)} />
          : <PendingChip milestone={milestone} onClick={() => setOpen(true)} />
      }
      {open && <MilestoneModal milestone={milestone} onClose={() => setOpen(false)} />}
    </>
  )
}

function persons(m: Milestone): string {
  return [m.person1, m.person2].filter(Boolean).join(' & ')
}

function DoneChip({ milestone, onClick }: { milestone: Milestone; onClick: () => void }) {
  const ds = DONE_STYLES[milestone.pillar]
  const who = persons(milestone)
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-start gap-3 px-4 py-3 rounded-xl border shadow-md overflow-hidden w-full text-left cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg group',
        ds.card
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5 drop-shadow" />
      <div className="flex-1 min-w-0">
        <div className={cn('text-[9px] font-bold uppercase tracking-widest mb-1', ds.subtext)}>✓ Done</div>
        <p className="text-sm font-bold leading-snug text-white">{milestone.title}</p>
        <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border bg-white/20 border-white/30 text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0" />
          {milestone.pillar}
        </div>
        {who && <div className={cn('text-[10px] mt-1', ds.subtext)}>{who}</div>}
      </div>
      <ChevronRight className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5 group-hover:text-white/90 transition-colors" />
    </button>
  )
}

function PendingChip({ milestone, onClick }: { milestone: Milestone; onClick: () => void }) {
  const c = PILLAR_CONFIG[milestone.pillar]
  const who = persons(milestone)
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl border shadow-sm transition-all hover:shadow-md hover:scale-[1.02] w-full text-left cursor-pointer group',
        c.bg, c.border, c.glow
      )}
    >
      <Circle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: c.iconColor }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug text-foreground">{milestone.title}</p>
        <PillarBadge pillar={milestone.pillar} className="mt-1.5" />
        {who && <div className="text-[10px] text-muted-foreground mt-1">{who}</div>}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
    </button>
  )
}

function InProgressChip({ milestone, onClick }: { milestone: Milestone; onClick: () => void }) {
  const c = PILLAR_CONFIG[milestone.pillar]
  const who = persons(milestone)
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl border border-dashed shadow-sm transition-all hover:shadow-md hover:scale-[1.02] w-full text-left cursor-pointer group',
        c.bg, c.border
      )}
    >
      <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 animate-pulse" style={{ color: c.iconColor }} />
      <div className="flex-1 min-w-0">
        <div className={cn('text-[9px] font-bold uppercase tracking-widest mb-1', c.text)}>⟳ In Progress</div>
        <p className="text-sm font-semibold leading-snug text-foreground">{milestone.title}</p>
        <div className={cn('flex items-center gap-1.5 mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border inline-flex w-fit', c.bg, c.border, c.text)}>
          <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', c.dot)} />
          {milestone.pillar}
        </div>
        {who && <div className="text-[10px] text-muted-foreground mt-1">{who}</div>}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5 group-hover:text-muted-foreground transition-colors" />
    </button>
  )
}

function formatSprintDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function MilestoneModal({ milestone, onClose }: { milestone: Milestone; onClose: () => void }) {
  const c = PILLAR_CONFIG[milestone.pillar]
  const ds = DONE_STYLES[milestone.pillar]
  const who = persons(milestone)
  const isDone = milestone.status === 'done'
  const isInProgress = milestone.status === 'in_progress'
  const sprintTag = milestone.sprintLabel.startsWith('IP') ? 'IP Week' : `S${milestone.sprintLabel}`

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 p-6 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header strip */}
        <div className={cn(
          'px-6 py-5',
          isDone
            ? cn('bg-gradient-to-r', ds.card)
            : isInProgress
              ? cn('border-b border-dashed', c.bg, c.border)
              : cn('border-b', c.bg, c.border)
        )}>
          <div className="flex items-start justify-between gap-4">
            <div>
              {isDone && (
                <div className={cn('text-[10px] font-bold uppercase tracking-widest mb-1', ds.subtext)}>
                  ✓ Completed
                </div>
              )}
              {isInProgress && (
                <div className={cn('text-[10px] font-bold uppercase tracking-widest mb-1', c.text)}>⟳ In Progress</div>
              )}
              <p className={cn('text-[11px] font-semibold mb-1', isDone ? 'text-white/70' : c.text)}>
                {milestone.pillar} · {milestone.project}
              </p>
              <h3 className={cn('text-lg font-extrabold leading-snug', isDone ? 'text-white' : 'text-foreground')}>
                {milestone.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className={cn(
                'flex-shrink-0 p-1.5 rounded-lg transition-colors',
                isDone ? 'text-white/70 hover:text-white hover:bg-white/20' : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Meta strip */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground border-b border-border/60">
          <span className="flex items-center gap-1.5 font-semibold text-foreground">
            <CalendarDays className="w-3.5 h-3.5" />
            {sprintTag}
          </span>
          <span>{formatSprintDate(milestone.sprintStartDate)} – {formatSprintDate(milestone.sprintEndDate)}</span>
          {who && <span>👤 {who}</span>}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {milestone.details ? (
            <p className="text-sm text-foreground/80 leading-relaxed">
              {milestone.details.replace(/;/g, ',')}
            </p>
          ) : (
            <div className="text-sm text-muted-foreground italic text-center py-8 border border-dashed border-border rounded-xl bg-muted/30">
              Details coming soon — TBD
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
