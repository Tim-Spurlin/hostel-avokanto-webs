import { LanguageProvider } from "@/contexts/LanguageContext"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Philosophy } from "@/components/Philosophy"
import { Location } from "@/components/Location"
import { Amenities } from "@/components/Amenities"
import { Accommodations } from "@/components/Accommodations"
import { BookingCalendar } from "@/components/BookingCalendar"
import { BookingCTA } from "@/components/BookingCTA"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Philosophy />
        <Location />
        <Amenities />
        <Accommodations />
        <BookingCalendar />
        <BookingCTA />
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
