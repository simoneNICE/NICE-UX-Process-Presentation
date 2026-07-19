export type Pillar = 'Knowledge' | 'Efficiency' | 'Governance'

export type MilestoneStatus = 'todo' | 'in_progress' | 'done'

export interface Sprint {
  id: number
  name: string      // full JIRA sprint name, e.g. "CX.26.4.193 (15Jul26)"
  label: string     // short label, e.g. "S193"
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
}

export interface Milestone {
  jiraKey: string
  pillar: Pillar
  project: string
  projectDescription: string
  goal: string
  kpi: string
  title: string
  status: MilestoneStatus
  sprint?: Sprint
  person: string
  details: string
}

// Derived grouping used by Timeline
export interface SprintGroup {
  sprint: Sprint
  milestones: Milestone[]
}
