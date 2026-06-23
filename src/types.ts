export type Pillar = 'Knowledge' | 'Efficiency' | 'Governance'

export interface Milestone {
  pillar: Pillar
  project: string
  title: string
  done: boolean
  sprintLabel: string
  sprintStartDate: string
  sprintEndDate: string
  owner: string
  details: string
}

export interface SprintRow {
  sprint: string
  startDate: string
  endDate: string
  ipWeek: boolean
  milestones: Milestone[]
}
