import { ExternalLink, BookOpen, Github } from 'lucide-react'
import { resources } from '@/data/resources'

const ICONS = {
  confluence: BookOpen,
  github: Github,
}

const ICON_STYLES = {
  confluence: 'from-blue-500 to-blue-400',
  github: 'from-gray-800 to-gray-600',
}

export function Resources() {
  return (
    <section id="resources" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <h2 className="text-5xl font-extrabold mb-3">
          <span className="text-gradient-orange">Resources</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-14">Documentation, source code, and references.</p>

        <div className="flex flex-col gap-4 max-w-lg">
          {resources.map((r) => {
            const Icon = ICONS[r.type]
            const iconGradient = ICON_STYLES[r.type]
            return (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 bg-white border border-border rounded-2xl px-6 py-5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-sm flex-1 group-hover:text-primary transition-colors">
                  {r.label}
                </span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
