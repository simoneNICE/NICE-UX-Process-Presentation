import type { SprintRow, Pillar } from '../types'

const RAW_CSV = `sprint,end_date,ip_week,pillar,title,done
191,2026-06-16,false,Knowledge,Launch AI Training sessions,true
191,2026-06-16,false,Efficiency,Reduce 30% of JIRA fields,true
192,2026-07-07,false,Governance,Create measurement baseline,false
IP Week,2026-07-14,true,,,
193,2026-08-04,false,Efficiency,100% Jira Engagement per i designers,false
194,2026-08-25,false,Efficiency,Introducing JIRA AI Assistant for managers and for employees,false
195,2026-09-15,false,Efficiency,Reduce 30% of time in JIRA through usage of AI Assistant,false
196,2026-10-06,false,Efficiency,Reduce 50% of time in JIRA through usage of AI Assistant,false
IP Week,2026-10-13,true,,,
197,2026-11-03,false,,,
198,2026-11-24,false,,,
199,2026-12-15,false,,`

function parseCSV(csv: string): SprintRow[] {
  const lines = csv.trim().split('\n').slice(1) // skip header
  const sprintMap = new Map<string, SprintRow>()
  const sprintOrder: string[] = []

  for (const line of lines) {
    const [sprint, end_date, ip_week, pillar, title, done] = line.split(',')
    const key = `${sprint}-${end_date}`

    if (!sprintMap.has(key)) {
      sprintMap.set(key, {
        sprint,
        endDate: end_date,
        ipWeek: ip_week === 'true',
        milestones: [],
      })
      sprintOrder.push(key)
    }

    if (pillar && title) {
      sprintMap.get(key)!.milestones.push({
        pillar: pillar as Pillar,
        title,
        done: done === 'true',
      })
    }
  }

  return sprintOrder.map((key) => sprintMap.get(key)!)
}

export const sprints: SprintRow[] = parseCSV(RAW_CSV)
