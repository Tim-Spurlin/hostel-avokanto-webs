import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n"

export function Hero() {
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, oklch(0.60 0.14 150) 0%, oklch(0.55 0.12 200) 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold mb-6 leading-tight">
            {t('hero.title', language)}
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle', language)}
          </p>
          <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            {t('hero.description', language)}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-12 text-lg">
            <MapPin size={24} weight="fill" />
            <span>{t('hero.location', language)}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 transition-all hover:scale-105"
            >
              {t('hero.bookStay', language)}
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
            >
              {t('hero.exploreStory', language)}
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </div>
  )
}
