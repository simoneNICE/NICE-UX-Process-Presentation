# Design System — NICE UX Process Pillar

> Fonte di verità per componenti e pattern UI/UX.
> Definito da AGENT_UX, implementato da AGENT_DEV.
> Mai aggiungere pattern senza approvazione.

---

## Variabili CSS

- --primary          → azione principale, link, selezione
- --destructive      → elimina, errore, azioni irreversibili
- --success          → conferme, stati positivi
- --warning          → attenzione, stati intermedi
- --muted            → sfondi secondari
- --muted-foreground → testo secondario
- --foreground       → testo principale
- --border           → bordi
- --card             → sfondo card
- --background       → sfondo pagina

Fonte di verità: src/index.css
Modificare un colore = modificare solo src/index.css

---

## Pattern base

### ConfirmDialog
Obbligatorio per ogni azione distruttiva (elimina, reset, azione irreversibile).
- Bottone conferma: var(--destructive), testo esplicito sull'azione
- Bottone annulla: sempre a sinistra del bottone conferma
- Testo dialog: descrizione chiara delle conseguenze

### EmptyState
Obbligatorio per ogni lista o sezione vuota.
- Struttura: icona Lucide + titolo + descrizione breve + CTA opzionale
- Icona: muted-foreground, 48px
- Titolo: h3, foreground
- Descrizione: muted-foreground, text-sm

### Tooltip
Obbligatorio per ogni bottone che mostra solo un'icona.
- Trigger: hover su desktop
- Contenuto: azione in inglese (contenuto del sito in inglese), concisa

### ActionButton
Bottone icona con Tooltip integrato. Usa sempre invece di <button> nativo.
- Hit area minima: 44×44px
- Variante ghost di default

---

## Pattern specifici
_Da aggiungere progressivamente con AGENT_UX._
