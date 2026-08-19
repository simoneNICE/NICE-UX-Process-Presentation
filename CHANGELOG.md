# Changelog — NICE UX Process Pillar

> Aggiornato dopo ogni feature o fix. Scritto per l'utente finale, non per il developer.

---

## [Unreleased]

### Novità
- Tutti i dati delle milestone provengono ora direttamente da JIRA (epics, task, sprint)
- Le milestone senza sprint assegnato appaiono in una sezione "Not yet scheduled" separata
- Link diretto al ticket JIRA in ogni scheda milestone
- Nuovo progetto: "Operating Model for Design System", con i suoi tre step
- Nuovo step in AI Adoption: "Survey and Interview Report"

### Miglioramenti
- Rimossa la dipendenza dal file Excel/CSV: JIRA è l'unica fonte di verità
- Ogni milestone mostra solo il proprio sprint, senza raggruppamenti artificiali
- Corretti i nomi del team (Shikha Shukla, Erick Mathews, David Stoker, Advait Patil, Tali Silon-Shacham)
- Rimosso il campo "person2" e il flag "ip_week" non più necessari
- Nelle schede delle milestone lo stato, il titolo e l'owner sono ora separati più chiaramente
- I progetti all'interno di ogni pilastro sono racchiusi in riquadri distinti, più facili da distinguere a colpo d'occhio
- I tre pilastri (Governance, Efficiency, Knowledge) sono ora impilati in un'unica colonna a piena larghezza, uno sotto l'altro, invece che affiancati in tre colonne strette
- La Roadmap è ora una vista ad albero navigabile: Pilastro → Progetto → Step, con possibilità di espandere e comprimere ogni ramo (icona a freccia) e pulsanti "Expand all / Collapse all". All'apertura i progetti sono chiusi per una panoramica compatta; lo stato di avanzamento resta visibile anche a ramo chiuso
- Rimossi i filtri per persona dalla Roadmap: la vista ad albero è ora l'unico modo di navigare, più semplice e diretta. L'owner di ogni step resta visibile nella sua scheda

- Tutto il layout ha più respiro: card, righe e schede hanno più spazio interno, e la colonna della Roadmap è un po' più larga. Gli stessi spazi sono applicati anche alla Timeline, così le due viste hanno lo stesso ritmo
- Sopra i pulsanti "Expand all / Collapse all" c'è ora un sottotitolo che spiega cosa si sta guardando: "Three directions to improve how the team works"
- Anche i tre pilastri seguono ora l'ordine che hanno in JIRA — Governance, Efficiency, Knowledge — invece di un ordine deciso a mano. Vale per Roadmap, Timeline e Vision, così le tre sezioni raccontano la stessa sequenza
- Il progetto "JIRA Process for Design System" si chiama ora "Operating Model for Design System" ed è passato da Efficiency a Governance, come in JIRA
- Il progetto "AI Usage" si chiama ora "AI Adoption", come in JIRA

### Bug fix
- I task ora appaiono nello stesso ordine in cui sono in JIRA. Prima erano ordinati per numero di ticket, quindi in tre progetti (AI Training, AI Adoption, Audit - AI Assistant) la sequenza mostrata non corrispondeva a quella del backlog
- "AI Usage Interviews - 4 Designers (1)" era mostrato nello sprint 193, ormai chiuso: ora appare nello sprint 194, quello in corso, come in JIRA
