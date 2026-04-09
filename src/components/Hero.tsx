import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"
import heroVideo from "@/assets/video/grok-video-6dd4813e-c21b-4df0-b189-4caa82691fb7_1775677438.mp4"

export function Hero() {
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/40 z-0" />

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
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 transition-all hover:scale-105 pattern-ripple"
            >
              {t('hero.bookStay', language)}
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm pattern-ripple"
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
