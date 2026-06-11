# QA Profondo — UX Process Pillar (lanciato a fine release)

## Filosofia
Ricerca attiva e proattiva di problemi.
Cerca quello che non è stato pensato.
NON fixare nulla — produci un report e aspetta istruzioni.
Eccezione: errori TypeScript banali.

## Come lanciarlo
> Leggi AGENT_QA_DEEP.md e fai un QA profondo della release corrente.

## Step 1 — Build e qualità codice
- npm run build → zero errori, segnala ogni warning
- Cerca console.log fuori da import.meta.env.DEV
- Cerca TODO, FIXME, HACK nel codice
- Cerca codice commentato non necessario
- Cerca funzioni duplicate o logica ripetuta
- Cerca magic numbers senza costante denominata
- Cerca import inutilizzati
- Cerca dipendenze installate ma non usate (npx depcheck)

## Step 2 — Sicurezza proattiva
Ragiona come un attaccante:
- Variabili VITE_ con secret/key/token/password → CRITICO
- API route senza check auth prima di qualsiasi operazione → CRITICO
- Validazione input: cosa succede con stringhe vuote, null, valori estremi?
- Fetch a endpoint esterni senza gestione errori?
- Dati utente loggati in console in produzione?

## Step 3 — Design System UI — ricerca proattiva
- Colori hex hardcoded nel JSX → devono essere variabili CSS
- Stili inline ripetuti → devono essere classi Tailwind
- <button> nativo invece di <Button> shadcn
- Empty state inline invece di <EmptyState>
- Dialog inline invece di <ConfirmDialog>
- Bottoni icona senza Tooltip
- Componenti simili ma leggermente diversi → candidati a unificazione
- Spacing inconsistente tra sezioni simili

## Step 4 — Design System UX — ricerca proattiva
- Azioni distruttive senza ConfirmDialog?
- Liste vuote senza EmptyState?
- Errori senza feedback chiaro all'utente?
- Operazioni lunghe senza loading state?
- Pattern inconsistenti tra sezioni?

## Step 5 — UX proattiva
Analizza l'app come un utente reale:
- Flussi confusi o con troppi click
- Informazioni mancanti che l'utente si aspetterebbe
- Messaggi di errore tecnici invece che chiari
- Comportamenti inaspettati
- Accessibilità: elementi interattivi senza aria-label
- Desktop: testo troncato, scroll orizzontale non voluto, elementi misallineati

## Step 6 — Performance e robustezza
- Componenti che si re-renderizzano inutilmente
- Chiamate API duplicate nello stesso componente
- Race conditions possibili
- Dati statici caricati in modo inefficiente

## Step 7 — Responsive desktop
- 1024px (laptop): tutto visibile e usabile?
- 1440px (desktop standard): layout corretto?
- 1920px (wide): nessun elemento che si perde?

## Output obbligatorio — docs/QA_REPORT_[data].md

### Struttura del report:
## 🔴 Problemi critici (sicurezza) — [file:riga, descrizione, impatto]
## 🟡 Problemi medi (UX/Design System) — [file:riga, descrizione]
## 🔵 Problemi UX proattivi — [problemi non richiesti trovati]
## 🟢 Suggerimenti (qualità codice) — [file:riga, suggerimento]
## ✅ Verifiche passate
## 📊 Statistiche (errori TS, console.log, colori hardcoded, pattern non conformi)
## 🆕 Aggiornamenti CLAUDE.md suggeriti — [segnala, non applicare]
