#!/usr/bin/env python3
"""
Converte milestones.xls (multi-foglio) → milestones.csv
Uso: python3 scripts/xls_to_csv.py

Colonne XLS: sprint, end_date, ip_week, person 1, person 2, project, title, done, details
Colonne CSV: sprint, end_date, ip_week, pillar, person1, person2, project, title, done, details
             (pillar = nome del foglio)
"""

import xlrd
import csv
import os
from datetime import datetime, timedelta

XLS_PATH = os.path.join(os.path.dirname(__file__), '../src/data/milestones.xls')
CSV_PATH = os.path.join(os.path.dirname(__file__), '../src/data/milestones.csv')

PILLARS = ['Knowledge', 'Efficiency', 'Governance']

def excel_date(serial):
    if not serial:
        return ''
    base = datetime(1899, 12, 30)
    return (base + timedelta(days=int(serial))).strftime('%Y-%m-%d')

def sanitize(text):
    """Sostituisce virgole interne con punto e virgola per non rompere il CSV."""
    return str(text).strip().replace(',', ';')

def parse_done(raw):
    """Converte il valore done di Excel in todo/in_progress/done."""
    s = str(raw).strip().lower()
    if s in ('1', '1.0', 'true', 'done'):
        return 'done'
    if s in ('in_progress', 'in progress'):
        return 'in_progress'
    return 'todo'

def parse_sheet(wb, sheet_name):
    sh = wb.sheet_by_name(sheet_name)
    if sh.nrows < 2:
        return []

    header = [str(v).strip().lower() for v in sh.row_values(0)]

    def col(name):
        for i, h in enumerate(header):
            if h == name:
                return i
        return None

    idx_sprint  = col('sprint')   if col('sprint')   is not None else 0
    idx_date    = col('end_date') if col('end_date')  is not None else 1
    idx_ip      = col('ip_week')  if col('ip_week')   is not None else 2
    idx_p1          = col('person 1')
    idx_p2          = col('person 2')
    idx_project     = col('project')
    idx_project_desc= col('project_description') or col('project description')
    idx_goal        = col('goal')
    idx_kpi         = col('kpi')
    idx_title       = col('title')
    idx_done        = col('done')
    idx_details     = col('details')

    def get(row, i):
        return sanitize(row[i]) if i is not None and i < len(row) else ''

    rows = []
    for r in range(1, sh.nrows):
        row = sh.row_values(r)

        raw_sprint = row[idx_sprint] if idx_sprint < len(row) else ''
        raw_date   = row[idx_date]   if idx_date   < len(row) else ''

        sprint_label = 'IP Week' if str(raw_sprint).strip() == 'IP Week' \
            else str(int(raw_sprint)) if isinstance(raw_sprint, float) \
            else str(raw_sprint).strip()
        end_date = excel_date(raw_date) if isinstance(raw_date, float) else str(raw_date).strip()
        ip_week  = str(row[idx_ip]).strip() if idx_ip is not None and idx_ip < len(row) else ''

        person1 = get(row, idx_p1)
        person2 = get(row, idx_p2)
        # Evita duplicato se person1 == person2
        if person1 and person1 == person2:
            person2 = ''

        project      = get(row, idx_project)
        project_desc = get(row, idx_project_desc)
        goal         = get(row, idx_goal)
        kpi          = get(row, idx_kpi)
        title        = get(row, idx_title)
        raw_done = row[idx_done] if idx_done is not None and idx_done < len(row) else 0
        done    = parse_done(raw_done)
        details = get(row, idx_details)

        rows.append({
            'sprint': sprint_label,
            'end_date': end_date,
            'ip_week': 'true' if ip_week in ('1', '1.0', 'true') else 'false',
            'pillar': sheet_name,
            'person1': person1,
            'person2': person2,
            'project': project,
            'project_description': project_desc,
            'goal': goal,
            'kpi': kpi,
            'title': title,
            'done': done,
            'details': details,
        })

    return rows


def main():
    wb = xlrd.open_workbook(XLS_PATH)

    # Ordine sprint da Knowledge
    sprint_order = []
    sprint_keys = set()

    ref_sheet = wb.sheet_by_name('Knowledge')
    ref_header = [str(v).strip().lower() for v in ref_sheet.row_values(0)]
    idx_s = ref_header.index('sprint')   if 'sprint'   in ref_header else 0
    idx_d = ref_header.index('end_date') if 'end_date' in ref_header else 1

    for r in range(1, ref_sheet.nrows):
        row = ref_sheet.row_values(r)
        raw_sprint = row[idx_s]
        raw_date   = row[idx_d]
        sprint_label = 'IP Week' if str(raw_sprint).strip() == 'IP Week' \
            else str(int(raw_sprint)) if isinstance(raw_sprint, float) \
            else str(raw_sprint).strip()
        end_date = excel_date(raw_date) if isinstance(raw_date, float) else str(raw_date).strip()
        key = f"{sprint_label}|{end_date}"
        if key not in sprint_keys:
            sprint_keys.add(key)
            sprint_order.append((sprint_label, end_date))

    # Raccoglie milestone per sprint
    all_rows_by_sprint: dict = {f"{s}|{d}": [] for s, d in sprint_order}

    # Raccoglie descrizioni per progetto (prima non vuota per ogni pillar+project)
    project_descriptions: dict = {}

    for pillar in PILLARS:
        for m in parse_sheet(wb, pillar):
            key = f"{m['sprint']}|{m['end_date']}"
            if key not in all_rows_by_sprint:
                all_rows_by_sprint[key] = []
            if m['title']:
                proj_key = f"{m['pillar']}|{m['project']}"
                if m['project_description'] and proj_key not in project_descriptions:
                    project_descriptions[proj_key] = m['project_description']
                all_rows_by_sprint[key].append(m)

    # Propaga descrizione mancante dalle altre righe dello stesso progetto
    for key, milestones in all_rows_by_sprint.items():
        for m in milestones:
            proj_key = f"{m['pillar']}|{m['project']}"
            if not m['project_description'] and proj_key in project_descriptions:
                m['project_description'] = project_descriptions[proj_key]

    # Scrivi CSV
    rows_out = []
    for sprint_label, end_date in sprint_order:
        key = f"{sprint_label}|{end_date}"
        ip_week = 'true' if sprint_label == 'IP Week' else 'false'
        milestones = all_rows_by_sprint.get(key, [])
        if milestones:
            for m in milestones:
                rows_out.append([
                    sprint_label, end_date, ip_week,
                    m['pillar'], m['person1'], m['person2'],
                    m['project'], m['project_description'], m['goal'], m['kpi'],
                    m['title'], m['done'], m['details']
                ])
        else:
            rows_out.append([sprint_label, end_date, ip_week, '', '', '', '', '', '', '', '', '', ''])

    with open(CSV_PATH, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['sprint', 'end_date', 'ip_week', 'pillar', 'person1', 'person2', 'project', 'project_description', 'goal', 'kpi', 'title', 'done', 'details'])
        writer.writerows(rows_out)

    print(f'✅ Generato {CSV_PATH}')
    total = len([r for r in rows_out if r[10]])
    done  = len([r for r in rows_out if r[10] and r[11] == 'done'])
    wip   = len([r for r in rows_out if r[10] and r[11] == 'in_progress'])
    print(f'   {total} milestone: {done} done, {wip} in progress, {total-done-wip} todo')


if __name__ == '__main__':
    main()
