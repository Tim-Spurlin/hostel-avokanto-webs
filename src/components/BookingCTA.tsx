import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"

export function BookingCTA() {
  const { language } = useLanguage()
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
            {t('bookingCTA.title', language)}
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
            {t('bookingCTA.subtitle', language)}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 pattern-ripple">
              <h3 className="font-semibold text-lg mb-2">{t('bookingCTA.checkIn.title', language)}</h3>
              <p className="opacity-90">{t('bookingCTA.checkIn.time', language)}</p>
              <p className="text-sm opacity-75 mt-1">{t('bookingCTA.checkIn.note', language)}</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 pattern-ripple">
              <h3 className="font-semibold text-lg mb-2">{t('bookingCTA.checkOut.title', language)}</h3>
              <p className="opacity-90">{t('bookingCTA.checkOut.time', language)}</p>
              <p className="text-sm opacity-75 mt-1">{t('bookingCTA.checkOut.note', language)}</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 transition-all hover:scale-105 pattern-ripple"
            >
              {t('bookingCTA.bookingCom', language)}
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm pattern-ripple"
            >
              {t('bookingCTA.hostelworld', language)}
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
          </div>

          <p className="text-sm opacity-75 mt-6">
            {t('bookingCTA.policy', language)}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
