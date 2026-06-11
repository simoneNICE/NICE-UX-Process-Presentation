export type Pillar = 'Knowledge' | 'Efficiency' | 'Governance'

export interface Milestone {
  pillar: Pillar
  title: string
  done: boolean
}

export interface SprintRow {
  sprint: string
  endDate: string
  ipWeek: boolean
  milestones: Milestone[]
}
