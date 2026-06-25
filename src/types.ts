export type Pillar = 'Knowledge' | 'Efficiency' | 'Governance'

export type MilestoneStatus = 'todo' | 'in_progress' | 'done'

export interface Milestone {
  pillar: Pillar
  project: string
  title: string
  status: MilestoneStatus
  sprintLabel: string
  sprintStartDate: string
  sprintEndDate: string
  person1: string
  person2: string
  details: string
}

export interface SprintRow {
  sprint: string
  startDate: string
  endDate: string
  ipWeek: boolean
  milestones: Milestone[]
}
