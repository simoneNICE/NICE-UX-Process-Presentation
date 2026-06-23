import type { SprintRow, Pillar } from '../types'
import RAW_CSV from './milestones.csv?raw'

function addDays(iso: string, days: number): string {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function parseCSV(csv: string): SprintRow[] {
  const lines = csv.trim().split('\n').slice(1)
  const sprintMap = new Map<string, SprintRow>()
  const sprintOrder: string[] = []
  let prevEndDate = ''

  for (const line of lines) {
    const [sprint, end_date, ip_week, pillar, owner, project, title, done, details] = line.split(',')
    const key = `${sprint}-${end_date}`

    if (!sprintMap.has(key)) {
      const startDate = prevEndDate ? addDays(prevEndDate, 1) : end_date
      sprintMap.set(key, {
        sprint,
        startDate,
        endDate: end_date,
        ipWeek: ip_week === 'true',
        milestones: [],
      })
      sprintOrder.push(key)
      prevEndDate = end_date
    }

    if (pillar && project && title) {
      const row = sprintMap.get(key)!
      sprintMap.get(key)!.milestones.push({
        pillar: pillar as Pillar,
        project,
        title,
        done: done?.trim() === 'true',
        sprintLabel: sprint,
        sprintStartDate: row.startDate,
        sprintEndDate: end_date,
        owner: owner?.trim() ?? '',
        details: details?.trim() ?? '',
      })
    }
  }

  return sprintOrder.map((key) => sprintMap.get(key)!)
}

export const sprints: SprintRow[] = parseCSV(RAW_CSV)
