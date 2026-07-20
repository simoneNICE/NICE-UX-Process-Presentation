export interface TeamMember {
  name: string
  role: string
  description: string
  photo: string
}

export const coreTeam: TeamMember[] = [
  { name: 'Simone Mimun',   role: 'Pillar Owner',       description: 'Systems thinker, cross-team alignment', photo: '/team/simone.jpg' },
  { name: 'Yoav Chen',      role: 'Governance',          description: 'Quality standards, reviews',            photo: '/team/yoav.jpg' },
  { name: 'Lihi Shrem',     role: 'Process Architect',   description: 'Workflow design, playbooks',            photo: '/team/lihi.jpg' },
  { name: 'Sheetal Barge-Gole', role: 'Knowledge Manager',   description: 'Repository & documentation',            photo: '/team/sheetal.jpg' },
  { name: 'Erick Mathews',  role: 'Automation/AI Lead',  description: 'Tools, efficiency',                     photo: '/team/erick.jpg' },
]

export const regionalReps: TeamMember[] = [
  { name: 'David Stoker', role: 'Americas', description: '', photo: '' },
  { name: 'Advait Patil', role: 'India',    description: '', photo: '' },
  { name: 'Tali Silon-Shacham', role: 'Israel',   description: '', photo: '' },
]
