# QA Leggero (automatico a fine task)

## Filosofia
QA veloce e automatico. Trova i problemi ovvi.
Fixa automaticamente quelli banali.
Segnala nel SESSION_LOG.md quelli che richiedono decisioni.

## Esecuzione automatica
Questo QA viene eseguito automaticamente da AGENT_DEV alla fine di ogni task.
Non serve lanciarlo manualmente.

## Check 1 — Build
npm run build
→ Se errori TypeScript banali (typo, import mancante): fixa automaticamente
→ Se errori complessi: segnala in SESSION_LOG.md e FERMATI

## Check 2 — Colori e stili
Cerca nel codice modificato in questa sessione:
- Valori hex hardcoded nel JSX (#xxxxxx) → segnala file:riga
- style={{ color: '...', background: '...' }} inline → segnala file:riga
- Classi Tailwind con colori arbitrari [#xxxxxx] → segnala file:riga

Se trovati: NON fixare automaticamente → segnala in SESSION_LOG.md

## Check 3 — Pattern Design System
Solo nei file modificati in questa sessione:
- <button> nativo invece di <Button> shadcn → fixa automaticamente
- Bottone icona senza Tooltip → fixa automaticamente aggiungendo Tooltip
- Eliminazione diretta senza ConfirmDialog → segnala in SESSION_LOG.md
- Lista vuota senza EmptyState → segnala in SESSION_LOG.md

## Check 4 — Sicurezza base
- Nuove variabili con VITE_ + secret/key/password → segnala CRITICO
- Nuova API route senza check auth → segnala CRITICO
- Console.log con dati sensibili → rimuovi automaticamente

## Check 5 — Changelog
Verifica che CHANGELOG.md sia stato aggiornato con almeno una riga
leggibile per l'utente finale per il task appena completato.
Se mancante: aggiungila tu.

## Output
Aggiungi in SESSION_LOG.md sezione "🔍 QA Leggero":
- ✅ Check passati
- ⚠️ Problemi segnalati (con file:riga)
- 🔴 Problemi critici (sicurezza)
- 🔧 Fix applicati automaticamente
