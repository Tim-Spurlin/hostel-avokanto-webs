import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Users as UsersIcon, Check, X } from "@phosphor-icons/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export function Accommodations() {
  const rooms = [
    {
      id: "private",
      name: "Private Double Room",
      price: "$12-15",
      icon: Bed,
      description: "Perfect for couples or digital nomads seeking privacy while enjoying community spaces.",
      features: ["Television", "Secure lockers", "Natural ventilation", "High-speed WiFi", "Interior or exterior facing"],
      capacity: "2 guests"
    },
    {
      id: "dorm6",
      name: "6-Bed Mixed Dorm",
      price: "$11",
      icon: UsersIcon,
      description: "Intimate shared space ideal for solo travelers and new friends.",
      features: ["Secure lockers", "Natural ventilation", "High-speed WiFi", "Spacious layout", "Clean shared bathrooms"],
      capacity: "6 guests"
    },
    {
      id: "dorm8",
      name: "8-10 Bed Mixed Dorms",
      price: "$10-11",
      icon: UsersIcon,
      description: "Classic backpacker experience at unbeatable value.",
      features: ["Secure lockers", "Natural ventilation", "High-speed WiFi", "Social atmosphere", "Budget-friendly"],
      capacity: "8-10 guests"
    }
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
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Choose Your Space
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From private retreats to social dormitories, all guests enjoy our exceptional garden, kitchen, and community amenities.
          </p>
        </motion.div>

        <Tabs defaultValue="private" className="mb-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="dorm6">6-Bed</TabsTrigger>
            <TabsTrigger value="dorm8">8-10 Bed</TabsTrigger>
          </TabsList>

          {rooms.map((room, index) => (
            <TabsContent key={room.id} value={room.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-8 md:p-12 max-w-4xl mx-auto">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <room.icon size={32} weight="fill" className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-semibold">{room.name}</h3>
                        <Badge className="bg-accent text-accent-foreground">{room.price}/night</Badge>
                      </div>
                      <p className="text-muted-foreground mb-1">{room.description}</p>
                      <p className="text-sm text-muted-foreground">Capacity: {room.capacity}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {room.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check size={20} weight="bold" className="text-secondary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book This Room
                  </Button>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">What to Expect</h3>
          <Accordion type="single" collapsible className="bg-card rounded-xl">
            <AccordionItem value="climate">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>Eco-Friendly Climate Control</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  To maintain our ultra-budget $10-11 rates and eco-friendly footprint, our historic Parque Rodó building uses high-powered fans and natural cross-ventilation rather than AC. Perfect for travelers seeking an authentic, traditional Montevidean experience. Best during spring and fall; summer (Dec-Feb) can be warm.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bathrooms">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>Shared Facilities</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our hostel features communal bathrooms with hot showers and bidets, maintained to exceptional hygiene standards by our dedicated staff. Cleaned frequently throughout the day. During peak morning hours, there may be brief waits—perfect timing to enjoy coffee in our garden!
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vibe">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>Historic Bohemian Character</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  Avokanto is a historic, bohemian guest house in vibrant Parque Rodó—not a modern, sterile hotel. We celebrate character over perfection, community over luxury, and authentic Uruguayan warmth over corporate uniformity. If you're seeking a solidarity haven where backpackers, artists, and wanderers intersect, you've found it.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
