#!/usr/bin/env python3
"""Aggiunge nuovi training alla scheda Knowledge del file XLS."""
import xlrd, xlwt, os
from datetime import datetime, timedelta

XLS_PATH = os.path.join(os.path.dirname(__file__), '../src/data/milestones.xls')

def date_to_excel(date_str):
    d = datetime.strptime(date_str, '%Y-%m-%d')
    return (d - datetime(1899, 12, 30)).days

# sprint_num, end_date, ip_week(0/1), pillar, owner, project, title, done(0/1), details
NEW_KNOWLEDGE = [
    (192, '2026-07-07', 0, 'Knowledge', 'Assaf',   'Training', 'When to use Opus, how to get the most out of research', 0, ''),
    (193, '2026-08-04', 0, 'Knowledge', 'Colton',  'Training', 'Claude in Github and development',                      0, ''),
    (194, '2026-08-25', 0, 'Knowledge', 'Yaara',   'Training', 'Using Claude skills to build out designs in Lyra',      0, ''),
    (195, '2026-09-15', 0, 'Knowledge', 'Erez',    'Training', 'Using Obsidian to manage .md files',                   0, ''),
    (196, '2026-10-06', 0, 'Knowledge', 'Richard', 'Training', 'Hosting AI at home',                                   0, ''),
    (197, '2026-11-03', 0, 'Knowledge', 'Sveta',   'Training', 'User Insights project overview',                       0, ''),
    (198, '2026-11-24', 0, 'Knowledge', 'David B.','Training', 'Building a storybook with Claude',                     0, ''),
]

wb_r = xlrd.open_workbook(XLS_PATH, formatting_info=False)
wb_w = xlwt.Workbook()
date_fmt = xlwt.easyxf(num_format_str='DD/MM/YYYY')

for sheet_name in wb_r.sheet_names():
    sh_r = wb_r.sheet_by_name(sheet_name)
    sh_w = wb_w.add_sheet(sheet_name)

    rows = [list(sh_r.row_values(r)) for r in range(sh_r.nrows)]

    if sheet_name == 'Knowledge':
        for (sp, ed_str, ipw, pillar, owner, proj, title, done, details) in NEW_KNOWLEDGE:
            ed_serial = date_to_excel(ed_str)
            for i, row in enumerate(rows):
                if i == 0:
                    continue
                raw = row[0]
                row_sprint = int(raw) if isinstance(raw, float) else str(raw).strip()
                if row_sprint == sp and not str(row[6]).strip():
                    rows[i] = [sp, ed_serial, ipw, pillar, owner, proj, title, done, details]
                    break

    for r, row in enumerate(rows):
        for c, val in enumerate(row):
            if r > 0 and c == 1 and isinstance(val, (int, float)) and val > 1000:
                sh_w.write(r, c, val, date_fmt)
            else:
                sh_w.write(r, c, val)

wb_w.save(XLS_PATH)
print(f"✅ XLS aggiornato: {len(NEW_KNOWLEDGE)} training aggiunti a Knowledge")
