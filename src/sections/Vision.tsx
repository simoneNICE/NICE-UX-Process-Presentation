const PILLARS = [
  {
    icon: '⚡',
    label: 'Efficiency',
    description: 'Streamline processes and reduce friction across design workflows.',
    gradient: 'from-emerald-500 to-teal-400',
    bg: 'from-emerald-50 to-white',
    border: 'border-emerald-100',
  },
  {
    icon: '📚',
    label: 'Knowledge',
    description: 'Build a shared foundation of methods, guides, and best practices.',
    gradient: 'from-blue-500 to-indigo-400',
    bg: 'from-blue-50 to-white',
    border: 'border-blue-100',
  },
  {
    icon: '🏛️',
    label: 'Governance',
    description: 'Establish clear standards, ownership, and quality checkpoints.',
    gradient: 'from-violet-500 to-purple-400',
    bg: 'from-violet-50 to-white',
    border: 'border-violet-100',
  },
]

export function Vision() {
  return (
    <section id="vision" className="py-28 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <h2 className="text-5xl font-extrabold mb-4">
          <span className="text-gradient-primary">Vision</span>
        </h2>
        <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl mb-16">
          {/* Replace with final vision text */}
          The UX Process Pillar is a strategic initiative to raise the Design team's maturity —
          bringing consistent methodology, shared knowledge, and clear governance,
          all accelerated by AI.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.label}
              className={`relative rounded-2xl border p-7 bg-gradient-to-br ${p.bg} ${p.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.gradient} rounded-t-2xl`} />

              <div className="text-4xl mb-5">{p.icon}</div>
              <h3 className="font-extrabold text-xl mb-2">{p.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
