import { Card } from "@/components/ui/card"
import { Heart, Users, CookingPot } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Philosophy() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            The Avokanto Philosophy
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our name comes from the Greek concept of <em>avokanto</em>—a solidarity haven where all are welcomed and cared for without prejudice. Born from community-driven sanctuaries during Greece's crisis, these spaces offered unconditional shelter, care, and human dignity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div {...fadeInUp} transition={{ delay: 0.1, duration: 0.6 }}>
            <Card className="p-8 h-full hover:shadow-lg transition-shadow border-l-4 border-l-accent">
              <Heart size={48} weight="fill" className="text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Unconditional Welcome</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every traveler, regardless of origin or background, finds genuine hospitality and respect at Avokanto. We're a sanctuary for wanderers seeking authentic connection.
              </p>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
            <Card className="p-8 h-full hover:shadow-lg transition-shadow border-l-4 border-l-secondary">
              <Users size={48} weight="fill" className="text-secondary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Community First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our lush garden and shared spaces aren't just amenities—they're the heart of a global community. Learn Spanish, share stories, make lifelong friends.
              </p>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.3, duration: 0.6 }}>
            <Card className="p-8 h-full hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CookingPot size={48} weight="fill" className="text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Shared Care</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our staff cooks daily family dinners. Our kitchen—praised as South America's best—lets you prepare fresh market finds. Food brings us together.
              </p>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          className="bg-primary/10 border border-primary/20 rounded-xl p-8 md:p-12 text-center"
          {...fadeInUp}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-lg md:text-xl italic text-foreground leading-relaxed max-w-4xl mx-auto">
            "Named after the Greek solidarity clinics, Avokanto is more than a hostel—it's a community shelter in the heart of Parque Rodó. Here, budget travelers discover warmth, unconditional welcome, and a genuine home in Montevideo."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
