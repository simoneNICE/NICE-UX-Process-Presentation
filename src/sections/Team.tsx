import { User } from 'lucide-react'
import { coreTeam, regionalReps } from '@/data/team'
import type { TeamMember } from '@/data/team'

function MemberCard({ member, small = false }: { member: TeamMember; small?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center group" style={{ width: small ? '140px' : '176px' }}>
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 to-blue-200 blur-sm scale-110 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
        <div className={`relative rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-border flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 ${small ? 'w-16 h-16' : 'w-24 h-24'}`}>
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <User className={`text-muted-foreground/50 ${small ? 'w-7 h-7' : 'w-10 h-10'}`} />
          )}
        </div>
      </div>
      <p className={`font-bold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>{member.name}</p>
      <p className={`font-semibold text-primary mt-0.5 ${small ? 'text-[11px]' : 'text-xs'}`}>{member.role}</p>
      {member.description && (
        <p className="text-xs text-muted-foreground mt-1 leading-snug">{member.description}</p>
      )}
    </div>
  )
}

export function Team() {
  return (
    <section id="team" className="py-28 gradient-page">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl font-extrabold mb-3">
          <span className="text-gradient-primary">Team</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-14">The people behind this initiative.</p>

        {/* Core Team */}
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Core Team</p>
        <div className="flex gap-6 justify-start flex-wrap mb-14">
          {coreTeam.map(member => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>

        {/* Regional Representatives */}
        <div className="border-t border-border/60 pt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Regional Representatives</p>
          <div className="flex gap-6 justify-start flex-wrap">
            {regionalReps.map(member => (
              <MemberCard key={member.name} member={member} small />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
