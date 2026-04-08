import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Umbrella, Buildings, Bus, Airplane } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"

export function Location() {
  const { language } = useLanguage()
  
  const landmarks = [
    { name: t('location.ramirezBeach', language), distance: t('location.distance.6min', language), icon: Umbrella, color: "text-secondary" },
    { name: t('location.downtownCenter', language), distance: t('location.distance.1.1miles', language), icon: Buildings, color: "text-primary" },
    { name: t('location.tresCruces', language), distance: t('location.distance.2km', language), icon: Bus, color: "text-accent" },
    { name: t('location.airport', language), distance: t('location.distance.11miles', language), icon: Airplane, color: "text-muted-foreground" },
  ]

  const nearby = [
    t('location.nearby.market', language),
    t('location.nearby.teatro', language),
    t('location.nearby.library', language),
    t('location.nearby.pocitos', language),
    t('location.nearby.salvo', language),
    t('location.nearby.plaza', language),
    t('location.nearby.harbour', language),
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
            {t('location.badge', language)}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            {t('location.title', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('location.subtitle', language)}
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
                <h3 className="text-2xl font-semibold mb-2">{t('location.address', language)}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('location.description', language)}
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h4 className="font-semibold text-lg mb-4">{t('location.nearby.title', language)}</h4>
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
