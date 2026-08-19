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

## Spacing — ritmo del respiro

Scala unica per tutto il sito. Non usare valori intermedi fuori da questa lista.

| Elemento | Padding | Note |
|---|---|---|
| Colonna contenuto (Roadmap) | `max-w-3xl` + `px-8` | Timeline resta `max-w-4xl` per la spina temporale |
| Riga di primo livello (Pillar) | `px-7 py-6` | `gap-4` tra chevron, icona e titolo |
| Contenuto espanso di primo livello | `px-7 pb-7` | indent testo `pl-9`, allineato al titolo |
| Riga di secondo livello (Progetto) | `px-4 py-3.5` | `gap-3` |
| Contenuto espanso di secondo livello | `pl-11 pr-3 pb-5 pt-2` | |
| Card / chip milestone | `px-5 py-4` | `gap-3.5` tra icona e contenuto |
| Chip di stato e conteggio | `px-2.5 py-1` | mai sotto `py-1` |
| Celle tabella KPI | `px-4 py-2.5` | header `py-3` |
| Modal | `px-7`, header `py-6`, corpo `py-7` | larghezza `max-w-xl` |

Dentro le card: blocco successivo a `mt-2.5`, divider owner a `mt-3.5 pt-3`.
Tra card sorelle: `space-y-3` in lista verticale, `gap-3` in griglia.

**Perché**: il layout è denso di livelli annidati (Pillar › Progetto › Step). Con padding
stretti i livelli si leggono come un blocco unico. Se serve comprimere, riduci il numero di
livelli aperti di default, non il padding.

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
