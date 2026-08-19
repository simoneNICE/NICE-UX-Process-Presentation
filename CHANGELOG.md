# Changelog — NICE UX Process Pillar

> Aggiornato dopo ogni feature o fix. Scritto per l'utente finale, non per il developer.

---

## [Unreleased]

### Novità
- Tutti i dati delle milestone provengono ora direttamente da JIRA (epics, task, sprint)
- Le milestone senza sprint assegnato appaiono in una sezione "Not yet scheduled" separata
- Link diretto al ticket JIRA in ogni scheda milestone
- Nuovo progetto nel pilastro Efficiency: "JIRA Process for Design System", con i suoi tre step

### Miglioramenti
- Rimossa la dipendenza dal file Excel/CSV: JIRA è l'unica fonte di verità
- Ogni milestone mostra solo il proprio sprint, senza raggruppamenti artificiali
- Corretti i nomi del team (Shikha Shukla, Erick Mathews, David Stoker, Advait Patil, Tali Silon-Shacham)
- Rimosso il campo "person2" e il flag "ip_week" non più necessari
- Nelle schede delle milestone lo stato, il titolo e l'owner sono ora separati più chiaramente
- I progetti all'interno di ogni pilastro sono racchiusi in riquadri distinti, più facili da distinguere a colpo d'occhio
- I tre pilastri (Knowledge, Efficiency, Governance) sono ora impilati in un'unica colonna a piena larghezza, uno sotto l'altro, invece che affiancati in tre colonne strette
- La Roadmap è ora una vista ad albero navigabile: Pilastro → Progetto → Step, con possibilità di espandere e comprimere ogni ramo (icona a freccia) e pulsanti "Expand all / Collapse all". All'apertura i progetti sono chiusi per una panoramica compatta; lo stato di avanzamento resta visibile anche a ramo chiuso
- Rimossi i filtri per persona dalla Roadmap: la vista ad albero è ora l'unico modo di navigare, più semplice e diretta. L'owner di ogni step resta visibile nella sua scheda

- Tutto il layout ha più respiro: card, righe e schede hanno più spazio interno, e la colonna della Roadmap è un po' più larga. Gli stessi spazi sono applicati anche alla Timeline, così le due viste hanno lo stesso ritmo

### Bug fix
- I task ora appaiono nello stesso ordine in cui sono in JIRA. Prima erano ordinati per numero di ticket, quindi in tre progetti (AI Training, AI Usage, Audit - AI Assistant) la sequenza mostrata non corrispondeva a quella del backlog
