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
  details: string,
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
    details,
    sprint: s,
  }
}

const S193 = sprint(10652, "CX.26.4.193 (15Jul26)", "2026-07-15", "2026-08-04")
const S194 = sprint(10653, "CX.26.4.194 (05Aug26)", "2026-08-04", "2026-08-25")

export const milestones: Milestone[] = [
  // Knowledge / AI Training
  m("CXUX-13679", "Knowledge", "AI Training", "Launch AI Training sessions", "done", "Simone Mimun", "Kick off the recurring AI training program. Define session format, speaker cadence, and shared documentation space. Establish the training backlog that will carry the team through the year."),
  m("CXUX-13680", "Knowledge", "AI Training", "When to use Opus: how to get the most out of research", "done", "Erick Mathews", "Practical session on choosing the right Claude model for UX research. Demo live synthesis of user interviews, compare Opus vs Sonnet, and share a reusable prompt library for research workflows. Follows the program launch, sets the foundation for the tool sessions ahead."),
  m("CXUX-13681", "Knowledge", "AI Training", "Claude in GitHub and development", "todo", "Erick Mathews", "Hands-on session on Claude Code integration via GitHub. Cover PR review automation, code generation for design tokens and specs, and how designers can contribute to codebases using Claude as co-pilot."),
  m("CXUX-13674", "Knowledge", "AI Training", "Using Claude skills to build out designs in Lyra", "todo", "Erick Mathews", "Live demo of Claude custom skills applied to Lyra design production. Show how to accelerate component creation, generate design variants, and document patterns directly from the design tool."),
  m("CXUX-13675", "Knowledge", "AI Training", "Using Obsidian to manage .md files", "todo", "Erick Mathews", "Session on knowledge management for the design team. Set up a shared Obsidian vault for design decisions, research notes, and process docs. Show how Claude can query and summarize the vault. Follows the tool-heavy sessions, shifts focus to long-term knowledge capture."),
  m("CXUX-13676", "Knowledge", "AI Training", "Hosting AI at home", "todo", "Erick Mathews", "Session on running local AI models (Ollama, LM Studio) for privacy-sensitive design work. Cover use cases where cloud AI is not appropriate and how local models complement the team's Claude setup. Prepares the team for independent AI experimentation beyond the sprint cycle."),
  m("CXUX-13677", "Knowledge", "AI Training", "User Insights project overview", "todo", "Erick Mathews", "Presentation of the User Insights initiative and its connection to AI workflows. Show how ongoing research feeds the AI assistant and how automated insight synthesis can accelerate product decisions. Penultimate session, sets context for the final Storybook session."),
  m("CXUX-13678", "Knowledge", "AI Training", "Building a storybook with Claude", "todo", "Erick Mathews", "Final training session of the year: using Claude to generate, maintain, and document Storybook components. Bridge the gap between design system governance and engineering handoff. Closes the training program, outputs feed directly into Governance pillar."),

  // Efficiency / JIRA Process
  m("CXUX-13682", "Efficiency", "JIRA Process", "Introducing JIRA process for researchers", "done", "Simone Mimun", "Roll out the new JIRA workflow for UX researchers. Define ticket types, field requirements, and tagging conventions. Run a guided onboarding session and collect initial friction points. Baseline process before the field-reduction work."),
  m("CXUX-13683", "Efficiency", "JIRA Process", "Reducing 30% of the fields in JIRA", "done", "Simone Mimun", "Audit all JIRA field configurations used by the design team. Remove redundant or unused fields and simplify the ticket template to reduce cognitive load. Document the new streamlined schema. Prerequisite for achieving full engagement in S192."),
  m("CXUX-13684", "Efficiency", "JIRA Process", "50% JIRA Engagement for Researchers", "done", "Simone Mimun", ""),
  m("CXUX-13685", "Efficiency", "JIRA Process", "100% JIRA Engagement for Researchers", "in_progress", "Megan Fisher", ""),
  m("CXUX-13686", "Efficiency", "JIRA Process", "100% JIRA Engagement for Designers", "in_progress", "Megan Fisher", ""),

  // Efficiency / AI Usage
  m("CXUX-13407", "Efficiency", "AI Usage", "AI Usage Interviews - 4 Designers (1)", "todo", "Lihi Shrem", "", S193),
  m("CXUX-13410", "Efficiency", "AI Usage", "Project Work Plan", "in_progress", "Lihi Shrem", "", S193),
  m("CXUX-13471", "Efficiency", "AI Usage", "AI Usage Interviews - 4 Designers (2)", "todo", "Lihi Shrem", "", S194),
  m("CXUX-13525", "Efficiency", "AI Usage", "AI Usage Interviews - Pune + US location Designers - SBG", "todo", "Sheetal Barge-Gole", ""),

  // Efficiency / JIRA AI Assistant
  m("CXUX-13687", "Efficiency", "JIRA AI Assistant", "POC: JIRA AI Assistant for managers and employees", "done", "Simone Mimun", "Proof of concept for the AI Assistant integration in JIRA for managers and employees. Automate ticket summarisation, priority suggestions, and sprint planning inputs. First measurable step toward time reduction, targets 30% saving."),
  m("CXUX-13688", "Efficiency", "JIRA AI Assistant", "Proof of Concept (POC) for sharing the AI agent", "in_progress", "Simone Mimun", ""),
  m("CXUX-13689", "Efficiency", "JIRA AI Assistant", "Introducing JIRA AI Assistant for managers and employees", "todo", "Simone Mimun", "Launch the AI Assistant integration in JIRA for managers and employees. Automate ticket summarisation, priority suggestions, and sprint planning inputs. First measurable step toward time reduction, targets 30% saving."),

  // Governance / Audit - AI Assistant
  m("CXUX-13690", "Governance", "Audit - AI Assistant", "Kick off Audit AI Assistant for Design System", "done", "Erick Mathews", "Kick off the AI governance assistant project. Define scope, assign responsibilities, and prototype the first use case (component usage scanning or token drift detection)."),
  m("CXUX-13691", "Governance", "Audit - AI Assistant", "Assess the current adoption and usage of the Design System across the Design team", "todo", "Sheetal Barge-Gole", ""),
  m("CXUX-13692", "Governance", "Audit - AI Assistant", "Audit AI Assistant for Design System Governance", "todo", "Erick Mathews", ""),
  m("CXUX-13478", "Governance", "Audit - AI Assistant", "Plan & Build Design System Audit Tool", "todo", "Lihi Shrem", "", S194),

  // Governance / Sharing
  m("CXUX-13693", "Governance", "Sharing", "Sprint DEMO: will include all sites once in release", "in_progress", "Shikha Shukla", "Expanding the Sprint DEMO to also include the USA site."),
  m("CXUX-13694", "Governance", "Sharing", "Improve Sprint DEMO (Templates)", "in_progress", "Shikha Shukla", "Create a standard template for Sprint DEMO presentation."),
  m("CXUX-13695", "Governance", "Sharing", "Improve Sprint DEMO (TBD)", "todo", "Shikha Shukla", "Identify needs and issues in the Sprint DEMO presentation and resolve them."),

  // Governance / Design System Committee
  m("CXUX-13696", "Governance", "Design System Committee", "Introducing a process for the (Human) Committee for Design System Governance", "todo", "Simone Mimun", "Launch the cross-functional Design System governance committee. Define membership, meeting cadence, decision rights, and escalation paths. The committee will oversee both human and AI-driven governance going forward, directly precedes the AI assistant production rollout."),

]
