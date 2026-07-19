export interface TeamMember {
  name: string
  role: string
  description: string
  photo: string
}

export const coreTeam: TeamMember[] = [
  { name: 'Simone Mimun',   role: 'Pillar Owner',       description: 'Systems thinker, cross-team alignment', photo: '' },
  { name: 'Yoav Chen',      role: 'Governance',          description: 'Quality standards, reviews',            photo: '' },
  { name: 'Lihi Shrem',     role: 'Process Architect',   description: 'Workflow design, playbooks',            photo: '' },
  { name: 'Shikha Shukla',  role: 'Knowledge Manager',   description: 'Repository & documentation',            photo: '' },
  { name: 'Erick Mathews',  role: 'Automation/AI Lead',  description: 'Tools, efficiency',                     photo: '' },
]

export const regionalReps: TeamMember[] = [
  { name: 'David Stoker', role: 'Americas', description: '', photo: '' },
  { name: 'Advait Patil', role: 'India',    description: '', photo: '' },
  { name: 'Tali Silon-Shacham', role: 'Israel',   description: '', photo: '' },
]
