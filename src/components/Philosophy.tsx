import { Card } from "@/components/ui/card"
import { Heart, Users, CookingPot } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"
import diningVideo from "@/assets/video/grok-video-6dd4813e-c21b-4df0-b189-4caa82691fb7_1775677438.mp4"

export function Philosophy() {
  const { language } = useLanguage()
  
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
            {t('philosophy.title', language)}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('philosophy.subtitle', language)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div {...fadeInUp} transition={{ delay: 0.1, duration: 0.6 }}>
            <Card className="p-8 h-full hover:shadow-lg transition-shadow border-l-4 border-l-accent">
              <Heart size={48} weight="fill" className="text-accent mb-4" />
              <h3 className="text-2xl font-semibold mb-4">{t('philosophy.unconditional.title', language)}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('philosophy.unconditional.description', language)}
              </p>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
            <Card className="p-8 h-full hover:shadow-lg transition-shadow border-l-4 border-l-secondary">
              <Users size={48} weight="fill" className="text-secondary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">{t('philosophy.community.title', language)}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('philosophy.community.description', language)}
              </p>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.3, duration: 0.6 }}>
            <Card className="p-8 h-full hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CookingPot size={48} weight="fill" className="text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">{t('philosophy.care.title', language)}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('philosophy.care.description', language)}
              </p>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          className="mb-16"
          {...fadeInUp}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <video 
              src={diningVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent pointer-events-none" />
          </div>
          <div className="text-center mt-6">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground">
              {t('philosophy.dining.title', language)}
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('philosophy.dining.description', language)}
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-primary/10 border border-primary/20 rounded-xl p-8 md:p-12 text-center"
          {...fadeInUp}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-lg md:text-xl italic text-foreground leading-relaxed max-w-4xl mx-auto">
            {t('philosophy.quote', language)}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
