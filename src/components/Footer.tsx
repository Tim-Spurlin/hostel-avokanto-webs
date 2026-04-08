import { Separator } from "@/components/ui/separator"
import { Heart, MapPin, Envelope } from "@phosphor-icons/react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart size={32} weight="fill" className="text-accent" />
              <h3 className="text-2xl font-semibold">Avokanto</h3>
            </div>
            <p className="text-background/80 leading-relaxed">
              A solidarity haven in Montevideo's heart. More than a hostel—a community sanctuary where travelers find unconditional welcome.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Location</h4>
            <div className="flex items-start gap-2 mb-2">
              <MapPin size={20} className="flex-shrink-0 mt-1" weight="fill" />
              <div>
                <p className="text-background/90">2077 San Salvador</p>
                <p className="text-background/90">Parque Rodó, Montevideo</p>
                <p className="text-background/90">Uruguay</p>
              </div>
            </div>
            <p className="text-sm text-background/70 mt-4">6-minute walk to Ramirez Beach</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/90">
              <li><a href="#philosophy" className="hover:text-accent transition-colors">Our Philosophy</a></li>
              <li><a href="#location" className="hover:text-accent transition-colors">Location</a></li>
              <li><a href="#amenities" className="hover:text-accent transition-colors">Amenities</a></li>
              <li><a href="#accommodations" className="hover:text-accent transition-colors">Accommodations</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
          <p>© 2024 Hostel Avokanto. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made with <Heart size={16} weight="fill" className="text-accent" /> in Montevideo
          </p>
        </div>
      </div>
    </footer>
  )
}
