import { MessageSquare, Mail } from 'lucide-react'

const TEAMS_URL = 'https://teams.microsoft.com/l/chat/0/0?users=Simone.Mimun@nice.com'
const EMAIL = 'Simone.Mimun@nice.com'

export function Contacts() {
  return (
    <section id="contacts" className="py-24 bg-white border-t border-border">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl font-extrabold mb-4">
          <span className="text-gradient-primary">Contact</span>
        </h2>
        <p className="text-xl text-foreground/80 mb-10 max-w-xl">
          Questions about the UX Process Pillar? Reach out directly.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={TEAMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#6264A7] text-white font-semibold text-sm shadow-md hover:brightness-110 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="w-5 h-5" />
            Chat on Teams
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border bg-white text-foreground font-semibold text-sm shadow-sm hover:shadow-md hover:border-foreground/30 transition-all hover:scale-[1.02]"
          >
            <Mail className="w-5 h-5 text-muted-foreground" />
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  )
}
