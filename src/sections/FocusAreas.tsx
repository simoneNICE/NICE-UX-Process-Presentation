import { CheckCircle2, Circle, Clock, ChevronRight, X, CalendarDays } from 'lucide-react'
import { useState, useMemo, useRef, useEffect } from 'react'
import { milestones } from '@/data/milestones'
import { getProjectMeta } from '@/data/jira-projects'
import { PILLAR_CONFIG } from '@/components/PillarBadge'
import { cn } from '@/lib/utils'
import type { Pillar, Milestone } from '@/types'

const PILLAR_META: Record<Pillar, { icon: string; description: string; gradient: string }> = {
  Knowledge: {
    icon: '📚',
    description: 'Build a shared foundation of methods, guides, and best practices.',
    gradient: 'from-orange-500 to-amber-400',
  },
  Efficiency: {
    icon: '⚡',
    description: 'Streamline processes and reduce friction across design workflows.',
    gradient: 'from-emerald-500 to-teal-400',
  },
  Governance: {
    icon: '🏛️',
    description: 'Establish clear standards, ownership, and quality checkpoints.',
    gradient: 'from-violet-500 to-purple-400',
  },
}

const PILLARS: Pillar[] = ['Knowledge', 'Efficiency', 'Governance']

function getProgress() {
  const today = new Date()
  const start = new Date('2026-05-26')
  const end = new Date('2026-12-15')
  const pct = Math.min(100, Math.max(0, ((today.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100))
  const done = milestones.filter(m => m.status === 'done').length
  const total = milestones.length
  return { pct: Math.round(pct), done, total }
}

function groupByProject(ms: Milestone[]): Map<string, Milestone[]> {
  const map = new Map<string, Milestone[]>()
  for (const m of ms) {
    if (!map.has(m.project)) map.set(m.project, [])
    map.get(m.project)!.push(m)
  }
  return map
}

function milestoneMatchesPerson(m: Milestone, selected: Set<string>): boolean {
  return selected.has(m.person)
}

export function FocusAreas() {
  const { pct, done, total } = getProgress()

  const [selectedPersons, setSelectedPersons] = useState<Set<string>>(new Set())

  const personCounts = useMemo(() => {
    const map = new Map<string, number>()
    milestones.forEach(m => {
      if (m.person) map.set(m.person, (map.get(m.person) ?? 0) + 1)
    })
    return [...map.entries()].sort((a, b) => b[1] - a[1])
  }, [])

  const togglePerson = (person: string) => {
    setSelectedPersons(prev => {
      const next = new Set(prev)
      if (next.has(person)) next.delete(person)
      else next.add(person)
      return next
    })
  }

  const isFiltered = selectedPersons.size > 0

  return (
    <section id="vision" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">

        {/* Vision intro */}
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="text-gradient-primary">The Project</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl mb-8">
            The UX Process Pillar is a strategic initiative to raise the Design team's maturity —
            bringing consistent methodology, shared knowledge, and clear governance,
            all accelerated by AI.
          </p>

          <h3 className="text-3xl font-extrabold mb-4">
            <span className="text-gradient-primary">Roadmap</span>
          </h3>

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

        {/* Person filter */}
        {personCounts.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">Filter by:</span>
            {personCounts.map(([person, count]) => {
              const active = selectedPersons.has(person)
              return (
                <button
                  key={person}
                  onClick={() => togglePerson(person)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-foreground text-background border-foreground shadow-md scale-105'
                      : 'bg-white text-foreground border-border hover:border-foreground/40 hover:shadow-sm'
                  )}
                >
                  {person}
                  <span className={cn(
                    'text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center transition-colors duration-200',
                    active ? 'bg-white/20 text-background' : 'bg-muted text-muted-foreground'
                  )}>
                    {count}
                  </span>
                </button>
              )
            })}
            {isFiltered && (
              <button
                onClick={() => setSelectedPersons(new Set())}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground border border-dashed border-border hover:border-foreground/40 transition-all duration-200"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        )}

        {/* Pillar columns */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {PILLARS.map(pillar => {
            const c = PILLAR_CONFIG[pillar]
            const meta = PILLAR_META[pillar]
            const pillarMilestones = milestones.filter(m => m.pillar === pillar)
            const byProject = groupByProject(pillarMilestones)
            const doneCount = pillarMilestones.filter(m => m.status === 'done').length

            return (
              <div
                key={pillar}
                className="flex flex-col rounded-2xl border border-border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className={`h-1 bg-gradient-to-r ${meta.gradient}`} />

                <div className="px-6 pt-6 pb-5">
                  <div className="text-3xl mb-3">{meta.icon}</div>
                  <h3 className="text-2xl font-black text-foreground mb-1 tracking-tight">{pillar}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{meta.description}</p>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${meta.gradient} rounded-full transition-all duration-700`}
                        style={{ width: `${(doneCount / Math.max(pillarMilestones.length, 1)) * 100}%` }}
                      />
                    </div>
                    <span className={cn('text-xs font-semibold', c.text)}>
                      {doneCount}/{pillarMilestones.length}
                    </span>
                  </div>
                </div>

                <div className={cn('mx-6 border-t', c.border)} />

                <div className="flex-1 p-5 space-y-5">
                  {byProject.size === 0 && (
                    <p className="text-xs text-muted-foreground/50 italic text-center py-6">
                      No milestones yet
                    </p>
                  )}
                  {[...byProject.entries()].map(([project, items]) => (
                    <ProjectGroup
                      key={project}
                      project={project}
                      milestones={items}
                      pillar={pillar}
                      selectedPersons={selectedPersons}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectGroup({ project, milestones, pillar, selectedPersons }: {
  project: string
  milestones: Milestone[]
  pillar: Pillar
  selectedPersons: Set<string>
}) {
  const c = PILLAR_CONFIG[pillar]
  const doneCount = milestones.filter(m => m.status === 'done').length
  const isFiltered = selectedPersons.size > 0
  const visibleCount = isFiltered
    ? milestones.filter(m => milestoneMatchesPerson(m, selectedPersons)).length
    : milestones.length

  if (isFiltered && visibleCount === 0) return null

  const first = milestones[0]
  const description = first?.projectDescription
  const goal = first?.goal
  const kpi = first?.kpi
  const epicKey = getProjectMeta(pillar, project)?.epicKey

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <h4 className="text-lg font-extrabold text-foreground truncate">{project}</h4>
          {epicKey && (
            <a
              href={`https://nice-ce-cxone-prod.atlassian.net/browse/${epicKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-blue-400 hover:text-blue-600 hover:underline flex-shrink-0"
            >
              {epicKey} ↗
            </a>
          )}
        </div>
        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all duration-300 flex-shrink-0 ml-2', c.bg, c.text, c.border)}>
          {isFiltered ? `${visibleCount}/` : ''}{doneCount}/{milestones.length}
        </span>
      </div>

      {(description || goal || kpi) && (
        <div className="mb-5 space-y-4">
          {description && (
            <ExpandableText text={description} className="text-sm text-foreground/70 leading-relaxed" />
          )}
          {(goal || kpi) && (
            <div className="space-y-3">
              {goal && (
                <div className="space-y-1">
                  <span className={cn('text-[10px] font-bold uppercase tracking-widest block', c.text)}>Goal</span>
                  <ExpandableText text={goal} className="text-sm text-foreground/80 leading-relaxed" />
                </div>
              )}
              {kpi && (
                <div className="space-y-1">
                  <span className={cn('text-[10px] font-bold uppercase tracking-widest block', c.text)}>KPI</span>
                  <p className="text-sm text-foreground/80 leading-relaxed">{kpi}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mb-2">
        <span className={cn('text-[10px] font-bold uppercase tracking-widest', c.text)}>Steps</span>
      </div>
      <ul className="space-y-1.5">
        {milestones.map((m, i) => (
          <MilestoneItem
            key={i}
            milestone={m}
            visible={!isFiltered || milestoneMatchesPerson(m, selectedPersons)}
          />
        ))}
      </ul>
    </div>
  )
}

function MilestoneItem({ milestone, visible = true }: { milestone: Milestone; visible?: boolean }) {
  const [open, setOpen] = useState(false)
  const c = PILLAR_CONFIG[milestone.pillar]
  const meta = PILLAR_META[milestone.pillar]

  return (
    <>
      <li className={cn(
        'transition-all duration-300 ease-in-out overflow-hidden',
        visible ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0 pointer-events-none'
      )}>
        <button
          onClick={() => setOpen(true)}
          className={cn(
            'w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all group',
            milestone.status === 'done'
              ? `bg-gradient-to-br ${meta.gradient} border-transparent shadow-sm`
              : milestone.status === 'in_progress'
                ? `${c.bg} border-dashed ${c.border} hover:shadow-sm`
                : 'bg-white border-border hover:shadow-sm'
          )}
        >
          {milestone.status === 'done'
            ? <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
            : milestone.status === 'in_progress'
              ? <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 animate-pulse" style={{ color: c.iconColor }} />
              : <Circle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: c.iconColor }} />
          }
          <div className="flex-1 min-w-0">
            {milestone.status === 'done' && (
              <span className="text-[9px] font-bold uppercase tracking-widest block mb-0.5 text-white/80">
                ✓ Done
              </span>
            )}
            {milestone.status === 'in_progress' && (
              <span className={cn('text-[9px] font-bold uppercase tracking-widest block mb-0.5', c.text)}>
                ⟳ In Progress
              </span>
            )}
            <span className={cn(
              'text-sm leading-snug block',
              milestone.status === 'done' ? 'text-white font-semibold' : 'text-foreground font-medium'
            )}>
              {milestone.title}
            </span>
            {milestone.sprint && (
              <div className={cn(
                'flex items-center gap-2 mt-1.5',
                milestone.status === 'done' ? 'text-white/70' : 'text-muted-foreground/70'
              )}>
                <span className={cn(
                  'text-[13px] font-black tracking-tight',
                  milestone.status === 'done' ? 'text-white' : 'text-foreground/80'
                )}>
                  {milestone.sprint.label}
                </span>
                <span className="text-[10px] font-medium">
                  {formatDate(milestone.sprint.startDate)} – {formatDate(milestone.sprint.endDate)}
                </span>
              </div>
            )}
            {milestone.person && (
              <span className={cn('text-xs font-bold block mt-1', milestone.status === 'done' ? 'text-white/90' : 'text-foreground')}>
                {milestone.person}
                <span className={cn('text-[9px] font-semibold ml-1', milestone.status === 'done' ? 'text-white/50' : 'text-muted-foreground')}>Owner</span>
              </span>
            )}
          </div>
          <ChevronRight className={cn(
            'w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-colors',
            milestone.status === 'done'
              ? 'text-white/50 group-hover:text-white/90'
              : 'text-muted-foreground/30 group-hover:text-muted-foreground'
          )} />
        </button>
      </li>
      {open && <MilestoneModal milestone={milestone} onClose={() => setOpen(false)} />}
    </>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function ExpandableText({ text, className }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (ref.current) setOverflows(ref.current.scrollHeight > ref.current.clientHeight + 1)
  }, [text])

  return (
    <div>
      <p ref={ref} className={cn(className, !expanded && 'line-clamp-3')}>
        {text}
      </p>
      {(overflows || expanded) && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-[11px] font-semibold text-blue-500 hover:underline mt-1 block"
        >
          {expanded ? 'Read less ↑' : 'Read more ↓'}
        </button>
      )}
    </div>
  )
}

function MilestoneModal({ milestone, onClose }: { milestone: Milestone; onClose: () => void }) {
  const c = PILLAR_CONFIG[milestone.pillar]
  const meta = PILLAR_META[milestone.pillar]
  const isDone = milestone.status === 'done'
  const isInProgress = milestone.status === 'in_progress'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 p-6 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className={cn(
          'px-6 py-5 border-b',
          isDone
            ? `bg-gradient-to-r ${meta.gradient}`
            : isInProgress
              ? `${c.bg} border-dashed ${c.border}`
              : cn(c.bg, c.border)
        )}>
          <div className="flex items-start justify-between gap-4">
            <div>
              {isDone && (
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white/70">✓ Completed</div>
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

        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground border-b border-border/60">
          {milestone.sprint && (
            <>
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <CalendarDays className="w-3.5 h-3.5" />
                {milestone.sprint.label}
              </span>
              <span className="flex items-center gap-1">
                {formatDate(milestone.sprint.startDate)} – {formatDate(milestone.sprint.endDate)}
              </span>
            </>
          )}
          {milestone.person && (
            <span className="flex items-center gap-1">👤 {milestone.person}</span>
          )}
          <a
            href={`https://nice-ce-cxone-prod.atlassian.net/browse/${milestone.jiraKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            {milestone.jiraKey} ↗
          </a>
        </div>

        <div className="px-6 py-5">
          {milestone.details ? (
            <p className="text-sm text-foreground/80 leading-relaxed">{milestone.details}</p>
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
