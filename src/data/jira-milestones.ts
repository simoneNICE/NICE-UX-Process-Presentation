import type { Milestone, Pillar, Sprint } from '../types'
import { getProjectMeta } from './jira-projects'

function sprint(id: number, name: string, startDate: string, endDate: string): Sprint {
  const num = name.match(/\.(\d+)\s/)?.[1] ?? name
  return { id, name, label: `S${num}`, startDate, endDate }
}

function m(
  jiraKey: string,
  pillar: Pillar,
  project: string,
  title: string,
  status: 'done' | 'in_progress' | 'todo',
  person: string,
  s?: Sprint,
): Milestone {
  const meta = getProjectMeta(pillar, project)
  return {
    jiraKey,
    pillar,
    project,
    projectDescription: meta?.description ?? '',
    goal: meta?.goal ?? '',
    kpi: meta?.kpi ?? '',
    title,
    status,
    person,
    sprint: s,
    details: '',
  }
}

const S193 = sprint(10652, 'CX.26.4.193 (15Jul26)', '2026-07-15', '2026-08-04')
const S194 = sprint(10653, 'CX.26.4.194 (05Aug26)', '2026-08-04', '2026-08-25')

export const milestones: Milestone[] = [
  // Knowledge / AI Training
  m('CXUX-13679', 'Knowledge', 'AI Training', 'Launch AI Training sessions', 'done', 'Simone Mimun'),
  m('CXUX-13680', 'Knowledge', 'AI Training', 'When to use Opus: how to get the most out of research', 'done', 'Erick Mathews'),
  m('CXUX-13681', 'Knowledge', 'AI Training', 'Claude in GitHub and development', 'todo', 'Erick Mathews'),
  m('CXUX-13674', 'Knowledge', 'AI Training', 'Using Claude skills to build out designs in Lyra', 'todo', 'Erick Mathews'),
  m('CXUX-13675', 'Knowledge', 'AI Training', 'Using Obsidian to manage .md files', 'todo', 'Erick Mathews'),
  m('CXUX-13676', 'Knowledge', 'AI Training', 'Hosting AI at home', 'todo', 'Erick Mathews'),
  m('CXUX-13677', 'Knowledge', 'AI Training', 'User Insights project overview', 'todo', 'Erick Mathews'),
  m('CXUX-13678', 'Knowledge', 'AI Training', 'Building a storybook with Claude', 'todo', 'Erick Mathews'),

  // Efficiency / JIRA Process
  m('CXUX-13682', 'Efficiency', 'JIRA Process', 'Introducing JIRA process for researchers', 'done', 'Simone Mimun'),
  m('CXUX-13683', 'Efficiency', 'JIRA Process', 'Reducing 30% of the fields in JIRA', 'done', 'Simone Mimun'),

  // Efficiency / AI Usage
  m('CXUX-13407', 'Efficiency', 'AI Usage', 'AI Usage Interviews - 4 Designers (1)', 'todo', 'Lihi Shrem', S193),
  m('CXUX-13410', 'Efficiency', 'AI Usage', 'Project Work Plan', 'todo', 'Lihi Shrem', S193),
  m('CXUX-13471', 'Efficiency', 'AI Usage', 'AI Usage Interviews - 4 Designers (2)', 'todo', 'Lihi Shrem', S194),
  m('CXUX-13525', 'Efficiency', 'AI Usage', 'AI Usage Interviews - Pune + US location Designers', 'todo', 'Sheetal Barge-Gole'),

  // Efficiency / JIRA AI Assistant
  m('CXUX-13687', 'Efficiency', 'JIRA AI Assistant', 'POC: JIRA AI Assistant for managers and employees', 'done', 'Simone Mimun'),
  m('CXUX-13688', 'Efficiency', 'JIRA AI Assistant', 'Proof of Concept (POC) for sharing the AI agent', 'in_progress', 'Simone Mimun'),
  m('CXUX-13689', 'Efficiency', 'JIRA AI Assistant', 'Introducing JIRA AI Assistant for managers and employees', 'todo', 'Simone Mimun'),

  // Governance / Audit - AI Assistant
  m('CXUX-13690', 'Governance', 'Audit - AI Assistant', 'Kick off Audit AI Assistant for Design System', 'done', 'Erick Mathews'),
  m('CXUX-13691', 'Governance', 'Audit - AI Assistant', 'Assess the current adoption and usage of the Design System across the Design team', 'in_progress', 'Lihi Shrem'),
  m('CXUX-13692', 'Governance', 'Audit - AI Assistant', 'Audit AI Assistant for Design System Governance', 'in_progress', 'Erick Mathews'),
  m('CXUX-13478', 'Governance', 'Audit - AI Assistant', 'Plan & Build Design System Audit Tool', 'todo', 'Lihi Shrem', S194),

  // Governance / Sharing
  m('CXUX-13693', 'Governance', 'Sharing', 'Sprint DEMO: will include all sites once in release', 'in_progress', 'Shikha Shukla'),
  m('CXUX-13694', 'Governance', 'Sharing', 'Improve Sprint DEMO (Templates)', 'in_progress', 'Shikha Shukla'),
  m('CXUX-13695', 'Governance', 'Sharing', 'Improve Sprint DEMO (TBD)', 'todo', 'Shikha Shukla'),

  // Governance / Design System Committee
  m('CXUX-13696', 'Governance', 'Design System Committee', 'Introducing a process for the (Human) Committee for Design System Governance', 'todo', 'Simone Mimun'),
]
