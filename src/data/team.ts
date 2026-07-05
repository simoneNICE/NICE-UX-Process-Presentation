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
  { name: 'Shika Shukla',   role: 'Knowledge Manager',   description: 'Repository & documentation',            photo: '' },
  { name: 'Erick Matthews', role: 'Automation/AI Lead',  description: 'Tools, efficiency',                     photo: '' },
]

export const regionalReps: TeamMember[] = [
  { name: 'Dave S.', role: 'Americas', description: '', photo: '' },
  { name: 'Advit',   role: 'India',    description: '', photo: '' },
  { name: 'Tali',    role: 'Israel',   description: '', photo: '' },
]
