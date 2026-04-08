import { Card } from "@/components/ui/card"
import { WifiHigh, CookingPot, Users, Sun, Plant, Fire } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Amenities() {
  const features = [
    {
      icon: WifiHigh,
      title: "Blazing-Fast WiFi",
      description: "500+ Mbps speeds supporting 10+ devices—perfect for digital nomads and remote work.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: CookingPot,
      title: "South America's Best Kitchen",
      description: "Massive, fully-equipped kitchen with daily staff-cooked meals. Steps from Wednesday street market.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Plant,
      title: "Lush Garden Sanctuary",
      description: "Beautiful outdoor garden, sun terrace, picnic areas, and authentic Uruguayan BBQ facilities.",
      color: "text-[oklch(0.60_0.14_150)]",
      bgColor: "bg-[oklch(0.60_0.14_150)]/10"
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Game room, shared lounge, live entertainment. Learn Spanish, make lifelong friends.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Sun,
      title: "24/7 Hospitality",
      description: "Round-the-clock reception, security, and support. No curfew—explore Montevideo freely.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Fire,
      title: "Free Daily Breakfast",
      description: "Authentic local Uruguayan breakfast included. Optional staff-prepared dinners available.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ]

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Exceptional Amenities
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At just $11/night, we deliver connectivity, community, and comfort that rivals properties charging triple the price.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all hover:scale-105">
                <div className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                  <feature.icon size={32} weight="fill" className={feature.color} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
