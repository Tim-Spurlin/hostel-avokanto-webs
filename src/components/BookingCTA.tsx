import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function BookingCTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary via-primary to-secondary">
      <div className="max-w-4xl mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Your Sanctuary Awaits
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
            From $11/night. Unconditional welcome. Genuine community. The heart of Montevideo.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="font-semibold text-lg mb-2">Check-in</h3>
              <p className="opacity-90">2:00 PM - 11:00 PM</p>
              <p className="text-sm opacity-75 mt-1">24-hour reception available</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="font-semibold text-lg mb-2">Check-out</h3>
              <p className="opacity-90">Before 11:00 AM</p>
              <p className="text-sm opacity-75 mt-1">Flexible with advance notice</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 transition-all hover:scale-105"
            >
              Book on Booking.com
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
            >
              Book on Hostelworld
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
          </div>

          <p className="text-sm opacity-75 mt-6">
            Free cancellation up to 72 hours before arrival • Cash payment upon arrival
          </p>
        </motion.div>
      </div>
    </section>
  )
}
