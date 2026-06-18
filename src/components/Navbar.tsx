const NAV_ITEMS = [
  { label: 'Vision', href: '#vision' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Team', href: '#team' },
  { label: 'Resources', href: '#resources' },
]

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="UX Process Pillar" className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm text-foreground">UX Process Pillar</span>
        </div>
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-blue-50 transition-all px-4 py-2 rounded-lg"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
