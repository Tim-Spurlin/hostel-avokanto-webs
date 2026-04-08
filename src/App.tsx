import { Hero } from "@/components/Hero"
import { Philosophy } from "@/components/Philosophy"
import { Location } from "@/components/Location"
import { Amenities } from "@/components/Amenities"
import { Accommodations } from "@/components/Accommodations"
import { BookingCTA } from "@/components/BookingCTA"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Philosophy />
      <Location />
      <Amenities />
      <Accommodations />
      <BookingCTA />
      <Footer />
    </div>
  )
}

export default App
