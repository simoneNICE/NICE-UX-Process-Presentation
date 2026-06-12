import type { SprintRow, Pillar } from '../types'

const RAW_CSV = `sprint,end_date,ip_week,pillar,title,done
190,2026-05-26,false,,,
191,2026-06-16,false,Knowledge,Launch AI Training sessions,true
191,2026-06-16,false,Efficiency,Reduce 30% of JIRA fields,true
192,2026-07-07,false,Efficiency,100% Jira Engagement for Researchers,false
192,2026-07-07,false,Governance,Create measurement baseline,false
IP Week,2026-07-14,true,Efficiency,100% Jira Engagement for Designers,false
193,2026-08-04,false,Efficiency,Introducing JIRA AI Assistant for managers and employees,false
194,2026-08-25,false,Efficiency,Reduce 30% of time in JIRA through usage of AI Assistant,false
194,2026-08-25,false,Governance,Introducing AI Assistant for Design System,false
195,2026-09-15,false,,,
196,2026-10-06,false,Efficiency,Reduce 50% of time in JIRA through usage of AI Assistant,false
IP Week,2026-10-13,true,Governance,Increase 50% Design Efficiency,false
197,2026-11-03,false,,,
198,2026-11-24,false,,,
199,2026-12-15,false,Governance,Increase 100% Design Efficiency,false`

function parseCSV(csv: string): SprintRow[] {
  const lines = csv.trim().split('\n').slice(1)
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
