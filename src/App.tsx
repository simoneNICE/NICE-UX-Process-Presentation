import { Navbar } from '@/components/Navbar'
import { Timeline } from '@/sections/Timeline'
import { Vision } from '@/sections/Vision'
import { Team } from '@/sections/Team'
import { Resources } from '@/sections/Resources'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Vision />
        <Timeline />
        <Team />
        <Resources />
      </main>
    </div>
  )
}
