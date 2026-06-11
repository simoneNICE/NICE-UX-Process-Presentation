import { User } from 'lucide-react'
import { team } from '@/data/team'

export function Team() {
  return (
    <section id="team" className="py-28 gradient-page">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl font-extrabold mb-3">
          <span className="text-gradient-orange">Team</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-14">The people behind this initiative.</p>

        <div className="flex gap-8 justify-start">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-5">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300 to-amber-200 blur-sm scale-110 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-border flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-muted-foreground/50" />
                  )}
                </div>
              </div>
              <p className="font-bold text-sm text-foreground">{member.name}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
