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

---

## 2026-08-19 — Pillar ordinati per rank JIRA + sync JIRA (44 task)

✅ Completato
- **Ordine dei pillar = rank delle capability in JIRA**: `Governance` (CXUX-13124) → `Efficiency`
  (CXUX-13121) → `Knowledge` (CXUX-13129), letto da `parent = CXUX-13120 ORDER BY rank ASC`.
  Prima era `Knowledge, Efficiency, Governance`, un ordine narrativo scelto a mano — esattamente
  l'inverso di JIRA
- Allineati i 4 punti che ripetono l'ordine: `FocusAreas.tsx` (`PILLARS`), `Timeline.tsx` (pillar
  legend), `Vision.tsx` (`PILLARS`, che aveva un terzo ordine ancora diverso: Efficiency, Knowledge,
  Governance), `types.ts` (unione `Pillar`). `PILLAR_CONFIG` e `PILLAR_META` sono `Record` letti per
  chiave: lasciati come sono
- `src/data/jira-milestones.ts` riscritto con il sync JIRA fresco: 44 task, blocchi riordinati
  Governance → Efficiency → Knowledge. Rank degli epic e dei task invariati rispetto al sync
  precedente, quindi dentro ogni progetto la sequenza non cambia
- Nuova costante sprint `S194` (`CX.26.4.194 (05Aug26)`, 05Ago–25Ago), lo sprint attivo
- CXUX-13407 spostato da S193 a S194: in JIRA ha entrambi gli sprint
  (`[194 active, 193 closed]`) perché è stato portato avanti. La regola "prendi l'ultimo elemento
  dell'array" dava S193, uno sprint chiuso il 4 agosto, per un task ancora aperto
- `.claude/commands/sync-jira.md` aggiornato: nuovo step 1b (rank capability), epic spostati in 1c,
  nuovo step 2b con l'elenco dei 4 file da allineare, regola sprint corretta in "più recente per
  `startDate`", e un blocco sul troncamento delle risposte JIRA
- `npm run build` — zero errori TypeScript
- CHANGELOG.md aggiornato in [Unreleased] › Miglioramenti e Bug fix

🔍 Verifica dati JIRA
- 44 task totali (5+8+2+1 Governance, 3+7+7+3 Efficiency, 8 Knowledge) — somma per epic = totale
  della query globale, nessun task perso nel troncamento
- Stati: 12 done, 10 in_progress, 22 todo · 4 task con sprint (2× S193, 1× S194, 1× S195)
- 10 epic, tutti già presenti nella mappa: nessun epic nuovo, nessun task escluso
- Nessuna differenza di titolo, stato, owner o descrizione rispetto al sync precedente: l'unico
  cambio di dato è lo sprint di CXUX-13407

⚠️ Azioni manuali
- Deploy non eseguito: il sito in produzione mostra ancora l'ordine vecchio
- Nessun commit eseguito
- Verifica visiva a 1024 / 1440 / 1920px non eseguita
- Da decidere con Simone: 3 capability segnaposto vuote in JIRA (`XXXX`, stato Removed —
  CXUX-13126, CXUX-13130, CXUX-13131) sotto l'initiative. Ignorate dal sync, ma sporcano il rank
- Da decidere con Simone: l'epic `Efficiency / Playbook` (CXUX-13134) è in stato Removed e non ha
  task. Resta nella mappa e in `jira-projects.ts`, ma sul sito non produce nulla

---

## 2026-08-19 — Secondo sync JIRA (45 task): epic rinominati e spostati

Rifatto il sync su richiesta di Simone. Nel frattempo JIRA era cambiato: 45 task invece di 44.

✅ Completato
- **CXUX-14034 spostato di capability e rinominato**: da `Efficiency / JIRA Process for Design System`
  a `Governance / Operating Model for Design System`. In JIRA è il primo epic di Governance per rank,
  quindi sul sito apre il pillar Governance con i suoi 3 step
- **CXUX-13122 rinominato**: `Efficiency / AI Usage` → `Efficiency / AI Adoption`
- **Nuovo task CXUX-14044** "Survey and Interview Report" (AI Adoption, todo, Lihi Shrem). Il rank lo
  mette tra `AI Usage Interviews - 4 Designers (2)` e `Process for AI Usage`, non in fondo
- `jira-projects.ts` riscritto: chiavi aggiornate ai nuovi nomi tenendo description / goal / kpi
  agganciati allo stesso `epicKey`, e blocchi riordinati come il sito (Governance → Efficiency →
  Knowledge). Nessun metadato perso nella rinomina
- `jira-milestones.ts` riscritto: 45 task, Efficiency scende a 3 progetti e Governance sale a 5
- `.claude/commands/sync-jira.md`: mappa epic aggiornata, avviso che gli epic vengono rinominati e
  spostati (la chiave stabile è `epicKey`, non la stringa `pillar/project`), sezione "epic noti ma non
  mappati", Step 1a convertito in query di solo conteggio (`searchResultMode: "count"`)
- `npm run build` — zero errori TypeScript
- CHANGELOG.md aggiornato in [Unreleased] › Novità, Miglioramenti e Bug fix

🔍 Verifica dati JIRA
- `totalCount` = 45; somma per epic = 45 (Governance 3+5+8+2+1 = 19, Efficiency 8+7+3 = 18,
  Knowledge 8). Nessun task perso nel troncamento delle risposte
- Stati: 12 done, 10 in_progress, 23 todo · 4 task con sprint (2× S193, 1× S194, 1× S195)
- Ordine capability invariato: Governance (CXUX-13124) → Efficiency (CXUX-13121) → Knowledge (CXUX-13129)
- 11 epic (uno in più): a parte i due rinominati, rank ed elenco task degli altri sono invariati

⚠️ Azioni manuali
- **Epic nuovo non mappato: CXUX-14043 `Knowledge / Centralise Knowledge Repository`** (stato New,
  description `TBD`, 0 task). Non aggiunto a `jira-projects.ts` come da regola: senza task non
  comparirebbe comunque sul sito. Serve una conferma di Simone su nome e metadati
- Deploy non eseguito
- Verifica visiva a 1024 / 1440 / 1920px non eseguita
- Restano aperte le segnalazioni della sessione precedente: 3 capability segnaposto `XXXX` e l'epic
  Playbook in stato Removed

---

## 2026-08-19 — Sottotitolo Roadmap + esclusi i task Removed

✅ Completato
- `FocusAreas.tsx`: sottotitolo sopra i pulsanti Expand all / Collapse all — "Three directions to
  improve how the team works" (`text-muted-foreground text-lg`, stesso stile degli altri sottotitoli
  di sezione, nessun pattern nuovo)
- **Decisione di Simone: i task in stato `Removed` non vanno sul sito.** Non si mappano più a `todo`:
  si scartano. Rimossi da `jira-milestones.ts` CXUX-13478 (Audit - AI Assistant), CXUX-13685 e
  CXUX-13686 (JIRA Process) → da 45 a 42 task
- `.claude/commands/sync-jira.md`: nuova regola trasversale in cima allo Step 1, `AND status != Removed`
  in tutte le query di lettura, query specchio di conteggio dei Removed, Step 4 riporta quanti task
  sono stati esclusi. Corrette le due voci che dicevano il contrario (Step 2 Playbook, Step 4)
- Decisione registrata in `wiki/decisions.md` (2026-08-19)
- `npm run build` — zero errori TypeScript
- CHANGELOG.md aggiornato in [Unreleased] › Miglioramenti e Bug fix

🔍 Verifica dati JIRA
- Task `Removed` sotto gli 11 epic: `totalCount` = 3 (CXUX-13478, CXUX-13685, CXUX-13686), tutti e
  tre erano nel sito. Nessun altro task Removed presente
- Il file contiene ora 42 righe `m(...)`: 45 in JIRA meno i 3 Removed

⚠️ Azioni manuali
- Deploy non eseguito: il sito in produzione mostra ancora i 3 task Removed e non ha il sottotitolo
- Verifica visiva a 1024 / 1440 / 1920px non eseguita
- Da decidere: la formulazione inglese del sottotitolo (alternative proposte a Simone)
- Restano aperte: epic non mappato CXUX-14043, 3 capability segnaposto `XXXX`. L'epic Playbook
  (CXUX-13134, Removed) rientra ora nella regola generale — resta da decidere se togliere il suo
  mapping da `jira-projects.ts`
