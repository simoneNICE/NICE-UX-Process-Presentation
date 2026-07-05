import { Navbar } from '@/components/Navbar'
import { FocusAreas } from '@/sections/FocusAreas'
import { Team } from '@/sections/Team'
import { Contacts } from '@/sections/Contacts'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <FocusAreas />
        <Team />
        <Contacts />
      </main>
    </div>
  )
}
