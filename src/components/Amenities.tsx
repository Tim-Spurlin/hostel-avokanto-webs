import { Card } from "@/components/ui/card"
import { WifiHigh, CookingPot, Users, Sun, Plant, Fire } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"

export function Amenities() {
  const { language } = useLanguage()
  
  const features = [
    {
      icon: WifiHigh,
      titleKey: 'amenities.wifi.title',
      descriptionKey: 'amenities.wifi.description',
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: CookingPot,
      titleKey: 'amenities.kitchen.title',
      descriptionKey: 'amenities.kitchen.description',
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Plant,
      titleKey: 'amenities.garden.title',
      descriptionKey: 'amenities.garden.description',
      color: "text-[oklch(0.60_0.14_150)]",
      bgColor: "bg-[oklch(0.60_0.14_150)]/10"
    },
    {
      icon: Users,
      titleKey: 'amenities.community.title',
      descriptionKey: 'amenities.community.description',
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Sun,
      titleKey: 'amenities.hospitality.title',
      descriptionKey: 'amenities.hospitality.description',
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Fire,
      titleKey: 'amenities.breakfast.title',
      descriptionKey: 'amenities.breakfast.description',
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
            {t('amenities.title', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('amenities.subtitle', language)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all hover:scale-105">
                <div className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                  <feature.icon size={32} weight="fill" className={feature.color} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(feature.titleKey, language)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(feature.descriptionKey, language)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
