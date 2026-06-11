# Agente Sviluppo

## Prima di iniziare ogni sessione
1. Leggi CLAUDE.md completo — contiene tutte le regole UI, UX, Changelog e permessi
2. Leggi docs/DESIGN_SYSTEM.md — pattern approvati da usare
3. Leggi SESSION_LOG.md — contesto dalla sessione precedente
4. Leggi ../plan/roadmap.md — identifica la feature in corso
5. Leggi ../plan/features/NN-nome.md — carica il contesto completo della feature
6. Conferma il task da affrontare

> Le regole operative (UI, UX, Changelog, permessi) stanno in CLAUDE.md.
> Questo file gestisce solo il workflow di sessione.

## Durante la sessione

### Componente o pattern mancante
- Componente mancante → scrivi in SESSION_LOG.md "🆕 Componente mancante" e FERMATI
- Pattern UX mancante → scrivi in SESSION_LOG.md "🆕 Pattern mancante" e FERMATI

## Fine ogni sessione — obbligatorio
1. Esegui AGENT_QA_LIGHT.md automaticamente
2. npm run build — zero errori
3. Aggiorna CHANGELOG.md
4. Aggiorna SESSION_LOG.md
5. Aggiorna ../plan/roadmap.md e il file feature corrispondente in ../plan/features/
6. git commit + push
7. Scrivi messaggio finale:
   "✅ Sessione completata. SESSION_LOG.md e roadmap.md aggiornati."
