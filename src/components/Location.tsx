import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Umbrella, Buildings, Bus, Airplane } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Location() {
  const landmarks = [
    { name: "Ramirez Beach", distance: "6-minute walk", icon: Umbrella, color: "text-secondary" },
    { name: "Downtown Center", distance: "1.1 miles", icon: Buildings, color: "text-primary" },
    { name: "Tres Cruces Terminal", distance: "2.0 km", icon: Bus, color: "text-accent" },
    { name: "Carrasco Airport", distance: "11 miles", icon: Airplane, color: "text-muted-foreground" },
  ]

  const nearby = [
    "Weekly Street Market (Wednesdays)",
    "Teatro de Verano",
    "National Library of Uruguay",
    "Pocito's Avenue",
    "Salvo's Palace",
    "Independencia Square",
    "Montevideo Harbour"
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-secondary text-secondary-foreground text-sm px-4 py-1">
            Rated 8.6/10 for Location
          </Badge>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Perfectly Positioned in Parque Rodó
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Walk to the beach in minutes, explore vibrant markets at your doorstep, and access all of Montevideo with ease from Uruguay's most eclectic neighborhood.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {landmarks.map((landmark, index) => (
            <motion.div
              key={landmark.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all hover:scale-105">
                <landmark.icon size={32} weight="fill" className={`${landmark.color} mb-3`} />
                <h3 className="font-semibold text-lg mb-1">{landmark.name}</h3>
                <p className="text-sm text-muted-foreground">{landmark.distance}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/30">
            <div className="flex items-start gap-4 mb-6">
              <MapPin size={40} weight="fill" className="text-primary flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-2">2077 San Salvador, Parque Rodó</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Parque Rodó is Montevideo's most vibrant, culturally dense neighborhood—a bohemian enclave balancing residential tranquility with thriving artistic energy. Tree-lined walkable streets, historic architecture, and immediate coastal access make this the perfect base for authentic exploration.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h4 className="font-semibold text-lg mb-4">Nearby Attractions</h4>
              <div className="flex flex-wrap gap-2">
                {nearby.map((place) => (
                  <Badge key={place} variant="outline" className="text-sm">
                    {place}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
