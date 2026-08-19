# SESSION_LOG — NICE UX Process Pillar

> Punto di contatto tra sessioni Claude Code.
> Claude Code aggiorna questo file. Claude (chat) lo legge per aggiornare wiki e roadmap.
> Non cancellare mai le sessioni precedenti — solo aggiungere.

---

## 2026-06-11 — Init

✅ Progetto inizializzato (boilerplate v1.4.0)
- Struttura cartelle creata (raw/ wiki/ site/)
- CLAUDE.md root e site generati
- PROJECT_CONFIG.md creato
- Agenti installati: AGENT_DEV, AGENT_UX, AGENT_QA_LIGHT, AGENT_QA_DEEP
- Wiki inizializzata (9 pagine)
- Design System inizializzato
- Permessi .claude/settings.local.json configurati

---

## 2026-07-29 — Ordine task allineato a JIRA

✅ Completato
- `src/data/jira-milestones.ts` riordinato secondo il **rank** JIRA (l'ordine del backlog), non più per chiave ticket. Nessun dato alterato: solo l'ordine delle righe
- Ordine ora a 3 livelli: pillar (Knowledge → Efficiency → Governance, fisso nel sito) > progetto (rank epic) > task (rank)
- Progetti riordinati dentro Governance: Sharing, Audit - AI Assistant, Lyra QA Validation, Design System Committee
- `.claude/commands/sync-jira.md`: JQL passata a `ORDER BY rank ASC`, aggiunta la regola vincolante sull'ordine delle righe, epic `CXUX-13738` (Lyra QA Validation) aggiunto a JQL e mappa — prima era assente e i suoi 2 task sarebbero spariti al prossimo sync
- `npm run build` — zero errori TypeScript

⚠️ Azioni manuali
- Deploy non eseguito: il sito in produzione mostra ancora il vecchio ordine
- `CXUX-13478` (Audit - AI Assistant, stato `Removed` in JIRA) non è nel sito: da decidere se lo skill deve escludere esplicitamente lo stato `Removed` o mapparlo a `todo` come dice la regola attuale

## 2026-07-29 — Più aria nel design

✅ Completato
- Padding aumentato su tutti i livelli della Roadmap (`FocusAreas.tsx`): riga pillar `px-5 py-4` → `px-7 py-6`, riga progetto `py-2.5` → `py-3.5`, card step `px-3 py-2.5` → `px-5 py-4`, tabella KPI `px-3 py-2` → `px-4 py-2.5`
- Colonna Roadmap allargata: `max-w-2xl` → `max-w-3xl`
- Spazio tra card: `space-y-1.5` → `space-y-3`; guide verticali con più indent (`pl-3` → `pl-5`)
- Stesso ritmo applicato alla Timeline (`Timeline.tsx`): chip `px-4 py-3` → `px-5 py-4`, griglia `gap-2` → `gap-3` (con `w-[calc(33.333%-8px)]`), righe sprint `py-3` → `py-4`
- Modal milestone (duplicato nelle due sezioni): `max-w-lg` → `max-w-xl`, padding `px-6` → `px-7`
- Nuova sezione "Spacing — ritmo del respiro" in `docs/DESIGN_SYSTEM.md` con la scala completa
- `npm run build` — zero errori TypeScript

⚠️ Azioni manuali
- Verifica visiva a 1024 / 1440 / 1920px non eseguita da me: nessun tooling browser nel progetto. Dev server lasciato attivo su http://localhost:5173/
- `MilestoneModal` è duplicato in `FocusAreas.tsx` e `Timeline.tsx`: ho aggiornato entrambi a mano. Candidato a estrazione in `src/components/ui/app/`

---

## 2026-08-19 — Rimossi i filtri dalla Roadmap

✅ Completato
- `src/sections/FocusAreas.tsx`: rimosso il blocco filtro "Filter by:" (chip per persona con conteggio + pulsante Clear) e tutta la logica collegata: stato `selectedPersons`, `personCounts`, `togglePerson`, `isFiltered`, helper `milestoneMatchesPerson`
- Semplificate le conseguenze del filtro: i badge di conteggio tornano al formato `done/totale` (via il prefisso `visibili/`), i pulsanti pillar e progetto non sono più disabilitati, `ProjectGroup` perde le prop `selectedPersons`/`toggleDisabled`, `MilestoneItem` perde la prop `visible` e le classi opacity/max-h usate per nascondere gli step
- I controlli "Expand all / Collapse all" sono ora sempre visibili (prima erano nascosti a filtro attivo)
- L'owner di ogni step resta visibile nella scheda e nel modal — rimossa solo la possibilità di filtrare
- `npm run build` — zero errori TypeScript (`noUnusedLocals` attivo: nessun import o variabile orfana)
- CHANGELOG.md aggiornato in [Unreleased] › Miglioramenti

⚠️ Azioni manuali
- Deploy non eseguito: il sito in produzione mostra ancora i filtri
- Nessun commit eseguito

📝 Nota
- Questa voce era stata scritta una prima volta e si è persa: un'altra scrittura su SESSION_LOG.md
  (stessa che ha applicato la scala di spacing a FocusAreas/Timeline e DESIGN_SYSTEM.md) l'ha sovrascritta.
  Le modifiche a FocusAreas.tsx e CHANGELOG.md sono invece sopravvissute.
