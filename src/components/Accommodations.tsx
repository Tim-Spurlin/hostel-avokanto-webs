import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Users as UsersIcon, Check, X } from "@phosphor-icons/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"

export function Accommodations() {
  const { language } = useLanguage()
  const rooms = [
    {
      id: "private",
      name: t('accommodations.private.name', language),
      price: t('accommodations.private.price', language),
      icon: Bed,
      description: t('accommodations.private.description', language),
      features: t('accommodations.private.features', language).split('|'),
      capacity: t('accommodations.private.capacity', language)
    },
    {
      id: "dorm6",
      name: t('accommodations.dorm6.name', language),
      price: t('accommodations.dorm6.price', language),
      icon: UsersIcon,
      description: t('accommodations.dorm6.description', language),
      features: t('accommodations.dorm6.features', language).split('|'),
      capacity: t('accommodations.dorm6.capacity', language)
    },
    {
      id: "dorm8",
      name: t('accommodations.dorm8.name', language),
      price: t('accommodations.dorm8.price', language),
      icon: UsersIcon,
      description: t('accommodations.dorm8.description', language),
      features: t('accommodations.dorm8.features', language).split('|'),
      capacity: t('accommodations.dorm8.capacity', language)
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
            {t('accommodations.title', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('accommodations.subtitle', language)}
          </p>
        </motion.div>

        <Tabs defaultValue="private" className="mb-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="private">{t('tabs.private', language)}</TabsTrigger>
            <TabsTrigger value="dorm6">{t('tabs.dorm6', language)}</TabsTrigger>
            <TabsTrigger value="dorm8">{t('tabs.dorm8', language)}</TabsTrigger>
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
                    {t('common.bookThisRoom', language)}
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
          <h3 className="text-2xl font-semibold mb-6 text-center">{t('accommodations.expect.title', language)}</h3>
          <Accordion type="single" collapsible className="bg-card rounded-xl">
            <AccordionItem value="climate">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>{t('accommodations.climate.title', language)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('accommodations.climate.description', language)}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bathrooms">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>{t('accommodations.bathrooms.title', language)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('accommodations.bathrooms.description', language)}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vibe">
              <AccordionTrigger className="px-6">
                <div className="flex items-center gap-2">
                  <Check size={20} className="text-primary" />
                  <span>{t('accommodations.vibe.title', language)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t('accommodations.vibe.description', language)}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
