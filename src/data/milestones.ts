import { milestones } from './jira-milestones'
import type { SprintGroup, Milestone } from '../types'

export { milestones }

export function getSprintGroups(): SprintGroup[] {
  const map = new Map<number, SprintGroup>()
  for (const m of milestones) {
    if (!m.sprint) continue
    if (!map.has(m.sprint.id)) {
      map.set(m.sprint.id, { sprint: m.sprint, milestones: [] })
    }
    map.get(m.sprint.id)!.milestones.push(m)
  }
  return [...map.values()].sort((a, b) =>
    a.sprint.endDate.localeCompare(b.sprint.endDate)
  )
}

export function getUnscheduled(): Milestone[] {
  return milestones.filter(m => !m.sprint)
}
