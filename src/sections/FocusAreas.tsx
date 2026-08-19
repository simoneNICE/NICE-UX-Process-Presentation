import { CheckCircle2, Circle, Clock, ChevronRight, X, CalendarDays } from 'lucide-react'
import { useState, useMemo, useRef, useEffect } from 'react'
import { milestones } from '@/data/milestones'
import { getProjectMeta } from '@/data/jira-projects'
import { PILLAR_CONFIG } from '@/components/PillarBadge'
import { cn } from '@/lib/utils'
import type { Pillar, Milestone } from '@/types'

const PILLAR_META: Record<Pillar, { icon: string; description: string; gradient: string; kpis?: { label: string; target: string }[] }> = {
  Knowledge: {
    icon: '📚',
    description: 'Build a shared foundation of methods, guides, and best practices.',
    gradient: 'from-orange-500 to-amber-400',
  },
  Efficiency: {
    icon: '⚡',
    description: 'Streamline processes and reduce friction across design workflows.',
    gradient: 'from-emerald-500 to-teal-400',
    kpis: [
      { label: 'AI adoption among designers',      target: '90%'    },
      { label: 'Average design cycle reduction',   target: '25%'    },
      { label: 'Time saved per designer/month',    target: '20 hrs' },
      { label: 'AI-generated assets reused',       target: '60%'    },
      { label: 'Manual repetitive work eliminated', target: '30%'  },
    ],
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

export function FocusAreas() {
  const { pct, done, total } = getProgress()

  // Tree collapse/expand — default: tutto chiuso (solo le righe dei pillar)
  const [expandedPillars, setExpandedPillars] = useState<Set<Pillar>>(() => new Set())
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(() => new Set())

  const allProjectKeys = useMemo(() => {
    const s = new Set<string>()
    milestones.forEach(m => s.add(`${m.pillar}::${m.project}`))
    return s
  }, [])

  const togglePillar = (pillar: Pillar) => {
    setExpandedPillars(prev => {
      const next = new Set(prev)
      if (next.has(pillar)) next.delete(pillar)
      else next.add(pillar)
      return next
    })
  }

  const toggleProject = (key: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const expandAll = () => {
    setExpandedPillars(new Set(PILLARS))
    setExpandedProjects(new Set(allProjectKeys))
  }

  const collapseAll = () => {
    setExpandedPillars(new Set())
    setExpandedProjects(new Set())
  }

  return (
    <section id="vision" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-3xl mx-auto px-8 relative z-10">

        {/* Vision intro */}
        <div className="mb-14">
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

        {/* Tree controls — espandi / comprimi tutto */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Expand all
          </button>
          <span className="text-border">·</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Collapse all
          </button>
        </div>

        {/* Roadmap tree — Pillar › Progetto › Step */}
        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden divide-y divide-border mb-12">
          {PILLARS.map(pillar => {
            const c = PILLAR_CONFIG[pillar]
            const meta = PILLAR_META[pillar]
            const pillarMilestones = milestones.filter(m => m.pillar === pillar)
            const byProject = groupByProject(pillarMilestones)
            const doneCount = pillarMilestones.filter(m => m.status === 'done').length
            const pillarOpen = expandedPillars.has(pillar)

            return (
              <div key={pillar}>
                {/* Livello 1 — Pillar */}
                <button
                  onClick={() => togglePillar(pillar)}
                  className="w-full flex items-center gap-4 px-7 py-6 text-left transition-colors hover:bg-muted/40"
                >
                  <ChevronRight className={cn(
                    'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                    c.text,
                    pillarOpen && 'rotate-90'
                  )} />
                  <span className="text-2xl leading-none">{meta.icon}</span>
                  <h3 className="text-xl font-black text-foreground tracking-tight">{pillar}</h3>
                  <span className={cn('ml-auto flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border', c.bg, c.text, c.border)}>
                    {doneCount}/{pillarMilestones.length}
                  </span>
                </button>

                {/* Contenuto pillar espanso */}
                {pillarOpen && (
                  <div className="px-7 pb-7">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl pl-9">{meta.description}</p>

                    {meta.kpis && (
                      <div className="mb-6 ml-9 overflow-hidden rounded-lg border border-border max-w-xl">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className={cn('border-b border-border', c.bg)}>
                              <th className={cn('px-4 py-3 text-left font-bold uppercase tracking-wider', c.text)}>KPI</th>
                              <th className={cn('px-4 py-3 text-right font-bold uppercase tracking-wider', c.text)}>Target</th>
                            </tr>
                          </thead>
                          <tbody>
                            {meta.kpis.map((kpi, i) => (
                              <tr key={i} className={cn('border-b border-border/50 last:border-0', i % 2 === 0 ? 'bg-white' : c.bg)}>
                                <td className="px-4 py-2.5 text-foreground/80">{kpi.label}</td>
                                <td className={cn('px-4 py-2.5 text-right font-bold tabular-nums', c.text)}>{kpi.target}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Livello 2 — Progetti, con guida verticale */}
                    <div className={cn('ml-4 pl-5 border-l-2 space-y-2', c.border)}>
                      {byProject.size === 0 && (
                        <p className="text-xs text-muted-foreground/50 italic py-4 pl-4">
                          No milestones yet
                        </p>
                      )}
                      {[...byProject.entries()].map(([project, items]) => (
                        <ProjectGroup
                          key={project}
                          project={project}
                          milestones={items}
                          pillar={pillar}
                          open={expandedProjects.has(`${pillar}::${project}`)}
                          onToggle={() => toggleProject(`${pillar}::${project}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectGroup({ project, milestones, pillar, open, onToggle }: {
  project: string
  milestones: Milestone[]
  pillar: Pillar
  open: boolean
  onToggle: () => void
}) {
  const c = PILLAR_CONFIG[pillar]
  const doneCount = milestones.filter(m => m.status === 'done').length

  const first = milestones[0]
  const description = first?.projectDescription
  const goal = first?.goal
  const kpi = first?.kpi
  const epicKey = getProjectMeta(pillar, project)?.epicKey

  return (
    <div>
      {/* Livello 2 — riga progetto */}
      <div className="flex items-center gap-3 pl-4 pr-4 py-3.5 rounded-lg transition-colors hover:bg-muted/50">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 flex-1 min-w-0 text-left"
        >
          <ChevronRight className={cn(
            'w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-90'
          )} />
          <span className="text-base font-extrabold text-foreground truncate">{project}</span>
        </button>
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
        <span className={cn('flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border', c.bg, c.text, c.border)}>
          {doneCount}/{milestones.length}
        </span>
      </div>

      {/* Contenuto progetto espanso — info + step */}
      {open && (
        <div className="pl-11 pr-3 pb-5 pt-2">
          {(description || goal || kpi) && (
            <div className="mb-6 space-y-5">
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

          <div className="mb-3">
            <span className={cn('text-[10px] font-bold uppercase tracking-widest', c.text)}>Steps</span>
          </div>
          {/* Livello 3 — step, con guida verticale */}
          <ul className={cn('space-y-3 border-l-2 pl-5', c.border)}>
            {milestones.map((m, i) => (
              <MilestoneItem key={i} milestone={m} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function MilestoneItem({ milestone }: { milestone: Milestone }) {
  const [open, setOpen] = useState(false)
  const c = PILLAR_CONFIG[milestone.pillar]
  const meta = PILLAR_META[milestone.pillar]

  return (
    <>
      <li>
        <button
          onClick={() => setOpen(true)}
          className={cn(
            'w-full flex items-start gap-3.5 px-5 py-4 rounded-xl border text-left transition-all group',
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
            {/* Status — chip distinto, staccato dal titolo */}
            {milestone.status === 'done' && (
              <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2.5 bg-white/20 text-white">
                ✓ Done
              </span>
            )}
            {milestone.status === 'in_progress' && (
              <span className={cn('inline-flex items-center text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-2.5 bg-white/70 border', c.text, c.border)}>
                ⟳ In Progress
              </span>
            )}

            {/* Titolo */}
            <span className={cn(
              'text-sm leading-snug block',
              milestone.status === 'done' ? 'text-white font-semibold' : 'text-foreground font-medium'
            )}>
              {milestone.title}
            </span>

            {milestone.sprint && (
              <div className={cn(
                'flex items-center gap-2 mt-3',
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

            {/* Owner — separato con divider */}
            {milestone.person && (
              <div className={cn(
                'flex items-center gap-2 mt-3.5 pt-3 border-t',
                milestone.status === 'done' ? 'border-white/20' : 'border-border'
              )}>
                <span className={cn('text-[9px] font-semibold uppercase tracking-widest', milestone.status === 'done' ? 'text-white/50' : 'text-muted-foreground')}>Owner</span>
                <span className={cn('text-xs font-bold', milestone.status === 'done' ? 'text-white/90' : 'text-foreground')}>
                  {milestone.person}
                </span>
              </div>
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
        className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className={cn(
          'px-7 py-6 border-b',
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

        <div className="px-7 pt-5 pb-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground border-b border-border/60">
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

        <div className="px-7 py-7">
          {milestone.details ? (
            <p className="text-sm text-foreground/80 leading-relaxed">{milestone.details}</p>
          ) : (
            <div className="text-sm text-muted-foreground italic text-center py-10 border border-dashed border-border rounded-xl bg-muted/30">
              Details coming soon — TBD
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
