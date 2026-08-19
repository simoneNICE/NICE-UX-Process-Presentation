import type { Pillar } from '../types'

export interface JiraProjectMeta {
  epicKey: string
  description: string
  goal: string
  kpi: string
}

// Source of truth: JIRA epics under initiative CXUX-13120.
// Key: `${pillar}/${project}` — pillar e project vengono dalla capability e dall'epic in JIRA,
// non dal testo del summary del task. Ordine dei blocchi = rank delle capability (Governance >
// Efficiency > Knowledge), lo stesso di `jira-milestones.ts`.
const JIRA_PROJECTS: Record<string, JiraProjectMeta> = {
  'Governance/Operating Model for Design System': {
    epicKey: 'CXUX-14034',
    description:
      'Governance model and JIRA operational process for managing the Design System, with shared ownership across UX, R&D, and PM through a Discovery Team. It covers Capability-based planning, the RFC process, prioritization criteria, design lead time, and communication responsibilities.',
    goal: "To bring structure, transparency, and shared accountability to Design System planning and delivery — ensuring priorities reflect business needs, design and development stay in sync, and every stakeholder has clear visibility into what's being built, when, and why.",
    kpi: '% of features delivered within the committed sprint/release (delivery predictability); % of features meeting the design lead-time window (2–6 sprints); Average RFC review turnaround time (creation to decision); % of RFCs approved on first pass vs. sent back for missing info; % of urgent/ad-hoc requests handled outside the 20% flexible quota; Design System component adoption rate (post-release usage); % of Capabilities closed with all sign-offs (Design, Eng, QA) completed',
  },
  'Governance/Sharing': {
    epicKey: 'CXUX-13135',
    description: 'Activities related to sharing work across the team.',
    goal: 'TBD',
    kpi: 'TBD',
  },
  'Governance/Audit - AI Assistant': {
    epicKey: 'CXUX-13123',
    description: 'An AI-powered tool that reviews design output and scores alignment with Design System standards.',
    goal: 'x2 Governance and Consistency in NICE apps, using AI support.',
    kpi: 'Tokens, Components and Patterns usage',
  },
  'Governance/Lyra QA Validation': {
    epicKey: 'CXUX-13738',
    description: 'QA validation of Lyra design output against Design System standards.',
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
  'Efficiency/AI Adoption': {
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
