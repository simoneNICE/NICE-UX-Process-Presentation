export interface Resource {
  label: string
  url: string
  type: 'confluence' | 'github'
}

export const resources: Resource[] = [
  { label: 'Project Confluence Space', url: '#', type: 'confluence' },
  { label: 'NICE UX Process', url: 'https://github.com/simoneNICE/NICE-UX-Process', type: 'github' },
  { label: 'NICE UX Process Manager', url: 'https://github.com/simoneNICE/NICE-UX-Process-Manager', type: 'github' },
]
