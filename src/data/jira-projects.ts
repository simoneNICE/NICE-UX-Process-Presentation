import type { Pillar } from '../types'

export interface JiraProjectMeta {
  epicKey: string
  description: string
  goal: string
  kpi: string
}

// Source of truth: JIRA epics under initiative CXUX-13120
// Key: `${pillar}/${project}` — must match values in milestones.csv
const JIRA_PROJECTS: Record<string, JiraProjectMeta> = {
  'Efficiency/AI Usage': {
    epicKey: 'CXUX-13122',
    description: 'A structured program to increase design quality and team efficiency through practical AI adoption.',
    goal: 'x2 Efficiency for designers.',
    kpi: 'Velocity, Quality',
  },
  'Efficiency/JIRA Process': {
    epicKey: 'CXUX-13132',
    description: 'A common approach to manage projects using JIRA.',
    goal: "Full monitoring and management of designers' and researchers' activity.",
    kpi: 'JIRA Engagement',
  },
  'Efficiency/JIRA AI Assistant': {
    epicKey: 'CXUX-13133',
    description:
      'Our team currently lacks a structured tracking system — one that gives clear visibility into who is doing what, prevents duplicated or lost work, and provides the historical data needed to plan capacity and justify resources. JIRA is already the de facto standard across our 9,000-person organization, used by every team we collaborate with, and available at zero additional cost. Adopting it gives us the reliable tracking foundation we are missing, while eliminating friction and manual translation work created by cross-team handoffs between mismatched systems. Standardizing on JIRA also enables us to build an AI assistant that streamlines usage for designers and managers, reducing manual effort and improving tracking accuracy across the team.',
    goal: 'Achieve 100% team alignment and reduce by 50% the time designers and managers spend in JIRA managing tasks and generating reports.',
    kpi: 'Time on JIRA, Velocity',
  },
  'Efficiency/Playbook': {
    epicKey: 'CXUX-13134',
    description:
      'A practical guide that standardizes the UX process by defining methods, roles, tools, best practices, and expected deliverables — ensuring consistency, collaboration, and quality across projects.',
    goal: 'Engage 80% of the designers. Facilitate knowledge sharing by documenting UX processes, roles, tools, and best practices in a single reference guide.',
    kpi: 'Playbook adoption rate',
  },
  'Governance/Audit - AI Assistant': {
    epicKey: 'CXUX-13123',
    description: 'An AI-powered tool that reviews design output and scores alignment with Design System standards.',
    goal: 'x2 Governance and Consistency in NICE apps, using AI support.',
    kpi: 'Tokens, Components and Patterns usage',
  },
  'Governance/Sharing': {
    epicKey: 'CXUX-13135',
    description: 'Activities related to sharing work across the team.',
    goal: 'TBD',
    kpi: 'TBD',
  },
  'Governance/Design System Committee': {
    epicKey: 'CXUX-13136',
    description:
      'Human Committee for Design System Governance: Q&A sessions and critical decisions around the Design System.',
    goal: 'x2 Governance in NICE apps, using human support.',
    kpi: 'Design Patterns',
  },
  'Knowledge/AI Training': {
    epicKey: 'CXUX-13137',
    description: 'Practical and theoretical sessions on AI, hosted by Erick Mathews.',
    goal: 'Increase team knowledge of AI and establish a baseline.',
    kpi: 'TBD',
  },
}

export function getProjectMeta(pillar: Pillar, project: string): JiraProjectMeta | undefined {
  return JIRA_PROJECTS[`${pillar}/${project}`]
}
