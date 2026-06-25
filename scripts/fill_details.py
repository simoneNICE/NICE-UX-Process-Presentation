#!/usr/bin/env python3
"""Aggiorna il campo details di ogni milestone nel file XLS."""
import xlrd, xlwt, os

XLS_PATH = os.path.join(os.path.dirname(__file__), '../src/data/milestones.xls')

DETAILS = {
    # ── KNOWLEDGE ──────────────────────────────────────────────────────────────
    ('191', 'Launch AI Training'):
        'Kick off the recurring AI training program. Define session format, '
        'speaker cadence, and shared documentation space. Establish the '
        'training backlog that will carry the team through the year.',

    ('192', 'When to use Opus'):
        'Practical session on choosing the right Claude model for UX research. '
        'Demo live synthesis of user interviews, compare Opus vs Sonnet, and '
        'share a reusable prompt library for research workflows. '
        'Follows the program launch; sets the foundation for the tool sessions ahead.',

    ('193', 'Claude in Github'):
        'Hands-on session on Claude Code integration via GitHub. Cover PR review '
        'automation, code generation for design tokens and specs, and how designers '
        'can contribute to codebases using Claude as co-pilot. '
        'Builds on the AI literacy from S192 before moving to Lyra in S194.',

    ('194', 'Claude skills to build out designs'):
        'Live demo of Claude custom skills applied to Lyra design production. '
        'Show how to accelerate component creation, generate design variants, and '
        'document patterns directly from the design tool. '
        'Bridges the GitHub session (S193) with the knowledge management track (S195).',

    ('195', 'Obsidian'):
        'Session on knowledge management for the design team. Set up a shared '
        'Obsidian vault for design decisions, research notes, and process docs. '
        'Show how Claude can query and summarize the vault. '
        'Follows the tool-heavy sessions; shifts focus to long-term knowledge capture.',

    ('196', 'Hosting AI at home'):
        'Session on running local AI models (Ollama, LM Studio) for '
        'privacy-sensitive design work. Cover use cases where cloud AI is not '
        'appropriate and how local models complement the team\'s Claude setup. '
        'Prepares the team for independent AI experimentation beyond the sprint cycle.',

    ('197', 'User Insights'):
        'Presentation of the User Insights initiative and its connection to AI '
        'workflows. Show how ongoing research feeds the AI assistant and how '
        'automated insight synthesis can accelerate product decisions. '
        'Penultimate session; sets context for the final Storybook session.',

    ('198', 'Storybook'):
        'Final training session of the year: using Claude to generate, maintain, '
        'and document Storybook components. Bridge the gap between design system '
        'governance and engineering handoff. '
        'Closes the training program; outputs feed directly into Governance pillar.',

    # ── EFFICIENCY ─────────────────────────────────────────────────────────────
    ('191', 'Introducing JIRA process for researcher'):
        'Roll out the new JIRA workflow for UX researchers. Define ticket types, '
        'field requirements, and tagging conventions. Run a guided onboarding '
        'session and collect initial friction points. '
        'Baseline process before the field-reduction work.',

    ('191', 'Reducing 30%'):
        'Audit all JIRA field configurations used by the design team. Remove '
        'redundant or unused fields and simplify the ticket template to reduce '
        'cognitive load. Document the new streamlined schema. '
        'Prerequisite for achieving full engagement in S192.',

    ('192', '100% Jira Engagement for Researchers'):
        'Achieve full adoption of the new JIRA process among UX researchers. '
        'Monitor ticket creation rate and completeness, run follow-up check-ins, '
        'and resolve remaining blockers. '
        'Measures success of the S191 rollout; feeds data into AI Assistant planning.',

    ('194', '100% Jira Engagement for Designers'):
        'Extend JIRA adoption to the full design team. Run onboarding for '
        'designers, adapt ticket templates where needed, and validate that all '
        'active design work is tracked. '
        'Completes team-wide JIRA coverage; creates the data foundation for the AI Assistant.',

    ('196', 'Introducing JIRA AI Assistant'):
        'Launch the AI Assistant integration in JIRA for managers and ICs. '
        'Automate ticket summarisation, priority suggestions, and sprint planning '
        'inputs. '
        'First measurable step toward time reduction; targets 30% saving in IP Week.',

    ('197', 'Reduce 30% of time in JIRA'):
        'Validate the 30% JIRA time-reduction target after the first AI Assistant '
        'sprint. Collect time-tracking data and user feedback, adjust prompt '
        'configurations, and iterate. '
        'Checkpoint between the assistant launch (S196) and the 50% target.',

    ('IP Week', 'Reduce 50% of time in JIRA'):
        'Scale AI Assistant optimisations to reach the 50% efficiency target. '
        'Automate recurring JIRA rituals (sprint review prep, backlog grooming '
        'summaries), and measure against the S196 baseline. '
        'End-of-year efficiency milestone; validates the full Efficiency pillar ROI.',

    # ── GOVERNANCE ─────────────────────────────────────────────────────────────
    ('192', 'baseline to measure Design System'):
        'Establish quantitative and qualitative baseline metrics for Design System '
        'adoption. Define KPIs (component coverage, token usage, contribution rate), '
        'set up tracking dashboards, and document the measurement framework. '
        'This baseline is the reference point for the 50% and 100% targets in S199/S204.',

    ('IP Week', 'Kick off AI Assistant for Design System'):
        'Kick off the AI governance assistant project. Define scope, assign '
        'responsibilities, and prototype the first use case (component usage '
        'scanning or token drift detection). '
        'Foundational kick-off before the guideline completes (S193) and the '
        'committee launches (S194).',

    ('193', 'Complete Design System Guideline'):
        'Finalise and publish the comprehensive Design System usage guideline. '
        'Cover component selection, contribution workflow, naming conventions, '
        'and accessibility standards. '
        'Prerequisite for both the governance committee (S194) and the AI assistant rollout.',

    ('194', 'Introducing (Human) Committee'):
        'Launch the cross-functional Design System governance committee. Define '
        'membership, meeting cadence, decision rights, and escalation paths. '
        'The committee will oversee both human and AI-driven governance going '
        'forward; directly precedes the AI assistant production rollout.',

    ('IP Week', 'Introducing AI Assistant for Design System Governance'):
        'Deploy the AI assistant for design system governance in production. '
        'Automate component usage audits, flag token inconsistencies, and generate '
        'governance reports for the committee. '
        'Delivers on the IP Week Jul kick-off; targets 100% designer adoption by S197.',

    ('197', '100% Designers Engagment'):
        'Reach full design team adoption of the AI governance assistant. Run '
        'onboarding sessions, resolve tool friction, and validate that all '
        'designers are using the assistant for at least one governance task per '
        'sprint. Gates the PM expansion in S200.',

    ('199', 'Increase 50% Design Usage'):
        'Validate a 50% increase in Design System usage against the S192 baseline. '
        'Combine AI assistant data with committee review findings to confirm '
        'adoption trajectory and surface remaining gaps. '
        'Mid-programme checkpoint; informs scope for the final 100% target.',

    ('200', '80% PMs Engagment'):
        'Extend AI governance assistant to 80% of PMs. Run PM-specific onboarding, '
        'adapt dashboards for product metrics, and integrate with roadmap planning '
        'workflows. '
        'Cross-functional milestone; bridges design-only governance to full org adoption.',

    ('204', 'Increase 100% Design Usage'):
        'Achieve the full-year target: 100% increase in Design System usage. '
        'This is the primary success metric of the Governance pillar. '
        'Consolidate findings, publish the end-of-year governance report, and '
        'plan the next governance cycle.',
}


def match_details(sprint_val, title_val):
    sprint_str = str(int(sprint_val)) if isinstance(sprint_val, float) else str(sprint_val).strip()
    title_str = str(title_val).strip()
    for (sp_key, title_key), details in DETAILS.items():
        if sprint_str == sp_key and title_key.lower() in title_str.lower():
            return details
    return None


def get_col_indices(header_row):
    """Ritorna dict nome→indice leggendo il header. Robusto a fogli senza colonna pillar."""
    hdr = [str(v).strip().lower() for v in header_row]
    def idx(name):
        return hdr.index(name) if name in hdr else None
    return {
        'sprint':  idx('sprint')   or 0,
        'end_date': idx('end_date') or 1,
        'ip_week': idx('ip_week')  or 2,
        'pillar':  idx('pillar'),        # None se non esiste
        'owner':   idx('owner'),
        'project': idx('project'),
        'title':   idx('title'),
        'done':    idx('done'),
        'details': idx('details'),
    }


wb_r = xlrd.open_workbook(XLS_PATH, formatting_info=False)
wb_w = xlwt.Workbook()
date_style = xlwt.easyxf(num_format_str='DD/MM/YYYY')

updated = 0

for sheet_name in wb_r.sheet_names():
    sh_r = wb_r.sheet_by_name(sheet_name)
    sh_w = wb_w.add_sheet(sheet_name)

    if sh_r.nrows == 0:
        continue

    cols = get_col_indices(sh_r.row_values(0))
    idx_title   = cols['title']
    idx_details = cols['details']

    for r in range(sh_r.nrows):
        row = list(sh_r.row_values(r))

        # Ensure row has enough columns
        max_col = max(c for c in cols.values() if c is not None)
        while len(row) <= max_col:
            row.append('')

        if r > 0 and row[cols['sprint']]:
            sprint_val = row[cols['sprint']]
            title_val  = row[idx_title] if idx_title is not None else ''
            details = match_details(sprint_val, title_val)
            current_detail = str(row[idx_details]).strip() if idx_details is not None else ''
            if details and not current_detail:
                row[idx_details] = details
                updated += 1

        for c, val in enumerate(row):
            if r > 0 and c == (cols['end_date'] or 1) and isinstance(val, (int, float)) and val > 1000:
                sh_w.write(r, c, val, date_style)
            else:
                sh_w.write(r, c, val)

wb_w.save(XLS_PATH)
print(f'✅ XLS aggiornato: {updated} details aggiunti')
