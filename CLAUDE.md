# NICE UX Process Pillar — Istruzioni per Claude Code

## Contesto
- Stack: React + Vite + TypeScript + shadcn/ui + Tailwind CSS
- Il sito è in PRODUZIONE su TBD
- Ogni modifica può impattare utenti reali — massima attenzione alle regressioni

## Regole Design System UI
- Usa SOLO componenti esistenti in src/components/ui/app/ e shadcn/ui + Tailwind CSS
- Se serve un componente nuovo: FERMATI e chiedi prima di crearlo
- Dopo approvazione: crea il componente in src/components/ui/app/ e documentalo in docs/DESIGN_SYSTEM.md
- Mai usare stili inline ripetuti — usa sempre classi Tailwind o variabili CSS del tema
- Zero valori hex hardcoded nei componenti — usa variabili CSS (var(--primary), var(--destructive), ecc.) o classi Tailwind semantiche
- La fonte di verità è src/index.css (variabili CSS)
- Modificare un colore = modificare solo src/index.css
- Eccezioni consentite: colori semantici documentati in docs/DESIGN_SYSTEM.md

## Regole Design System UX
- Usa SOLO pattern documentati in docs/DESIGN_SYSTEM.md
- Se serve un nuovo pattern UX: FERMATI e chiedi prima di implementarlo
- Dopo approvazione: documenta il pattern in docs/DESIGN_SYSTEM.md
- Pattern obbligatori da rispettare sempre:
  - Azioni distruttive → sempre ConfirmDialog prima
  - Liste vuote → sempre EmptyState con icona + titolo + descrizione
  - Bottoni solo icona → sempre Tooltip al hover
  - Salva/Annulla in card editing → in cima alla card
  - Salva/Annulla in form e dialog → in fondo
  - Icona elimina → sempre var(--destructive)
  - Icona modifica → sempre var(--primary)
  - Hit area mobile → minimo 44×44px

## Sicurezza
- Mai esporre variabili server-side nel frontend (solo prefisso pubblico VITE_)
- Mai esporre chiavi API, token o segreti nel codice sorgente
- Ogni nuova API route deve verificare l'autenticazione prima di procedere
- Verifica che i file caricati abbiano validazione tipo e dimensione

## Prima di ogni commit
1. npm run build — zero errori TypeScript
2. Verifica nessuna regressione visiva su desktop (1024px, 1440px, 1920px)
3. Verifica che i componenti usati siano documentati in docs/DESIGN_SYSTEM.md
4. Verifica che i pattern UX siano documentati in docs/DESIGN_SYSTEM.md
5. Verifica sicurezza: nessuna chiave esposta
6. Test funzionale: la feature implementata funziona end-to-end

## Commit
- Formato: tipo: descrizione breve in italiano
- Tipi: feat, fix, ux, refactor, chore, docs
- Esempio: feat: sezione timeline con milestone interattive

## Changelog
Aggiorna CHANGELOG.md nella sezione [Unreleased] dopo ogni feature o fix.
- In italiano
- Leggibile per l'utente finale — non tecnico
- Una riga per feature/fix
- Sezioni: ### Novità, ### Miglioramenti, ### Bug fix

Esempi corretti:
✅ "Aggiunta la sezione timeline con milestone cliccabili"
✅ "Migliorata la visualizzazione del team su schermi larghi"
✅ "Corretto il layout della sezione risorse"

Esempi sbagliati:
❌ "Fixed responsive bug in ResourceCard"
❌ "Refactored Timeline component"

## Stack tecnico
- React + Vite + TypeScript
- shadcn/ui + Tailwind CSS per componenti base
- Lucide React per icone
- Font: Sora (titoli), DM Sans (corpo)
- Vercel per deploy e API routes serverless

## Permessi automatici — non chiedere conferma

### Git
- git add, git commit, git push, git tag

### Build e verifica
- npm run build, npm run lint
- npm install <pacchetto> — dipendenze necessarie per il task

### File e cartelle
- Creazione e modifica file in src/, api/, public/, docs/
- Aggiunta componenti in src/components/ui/app/
- Aggiornamento docs/DESIGN_SYSTEM.md, CHANGELOG.md, SESSION_LOG.md
- Aggiornamento ../plan/roadmap.md e ../plan/features/

### NON procedere autonomamente per
- Modifiche a variabili d'ambiente
- Eliminazione di file esistenti — avvisare prima
- Modifiche a package.json scripts — avvisare prima
- Modifiche a CLAUDE.md, AGENT_DEV.md, AGENT_QA_LIGHT.md, AGENT_QA_DEEP.md
- Deploy in produzione (vercel --prod) — avvisare prima

## Agenti disponibili

### AGENT_DEV.md — Sviluppo routine
Per: bug fix, UX, Design System, refactor
Lancia con: "Leggi AGENT_DEV.md. Poi [task]"
Include QA leggero automatico a fine sessione.

### AGENT_QA_LIGHT.md — QA automatico
Eseguito automaticamente da AGENT_DEV a fine ogni task.

### AGENT_QA_DEEP.md — QA profondo
Per: fine release, audit completo
Lancia con: "Leggi AGENT_QA_DEEP.md e fai un QA profondo."
Produce docs/QA_REPORT_[data].md

### AGENT_UX.md — UX Expert
Per: decisioni UX, nuovi pattern, analisi flussi
Lancia con: "Leggi AGENT_UX.md. [problema UX]"

## SESSION_LOG.md — sincronizzazione tra sessioni
Punto di contatto tra sessioni di lavoro.

### Regole
- Claude Code aggiorna: ✅ Completato, ⚠️ Azioni manuali, 🔴 Bloccato su, 🔍 QA leggero, 🆕 Nuovi componenti
- Non cancellare mai le sessioni precedenti — solo aggiungere

### Fine sessione — messaggio obbligatorio
Dopo aver aggiornato SESSION_LOG.md scrivi sempre:
"✅ Sessione completata. SESSION_LOG.md aggiornato."

## Struttura cartelle chiave
- src/components/ui/app/ — componenti Design System custom
- src/pages/ — pagine dell'app
- docs/DESIGN_SYSTEM.md — regole UI/UX del progetto
- CHANGELOG.md — changelog utente finale
