import { Separator } from "@/components/ui/separator"
import { Heart, MapPin, Envelope } from "@phosphor-icons/react"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n-new"

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-foreground text-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart size={32} weight="fill" className="text-accent" />
              <h3 className="text-2xl font-semibold">Avokanto</h3>
            </div>
            <p className="text-background/80 leading-relaxed">
              {t('footer.description', language)}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.location', language)}</h4>
            <div className="flex items-start gap-2 mb-2">
              <MapPin size={20} className="flex-shrink-0 mt-1" weight="fill" />
              <div>
                <p className="text-background/90">2077 San Salvador</p>
                <p className="text-background/90">Parque Rodó, Montevideo</p>
                <p className="text-background/90">Uruguay</p>
              </div>
            </div>
            <p className="text-sm text-background/70 mt-4">{t('footer.walkToBeach', language)}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.quickLinks', language)}</h4>
            <ul className="space-y-2 text-background/90">
              <li><a href="#philosophy" className="hover:text-accent transition-colors">{t('footer.ourPhilosophy', language)}</a></li>
              <li><a href="#location" className="hover:text-accent transition-colors">{t('footer.location', language)}</a></li>
              <li><a href="#amenities" className="hover:text-accent transition-colors">{t('footer.amenities', language)}</a></li>
              <li><a href="#accommodations" className="hover:text-accent transition-colors">{t('footer.accommodations', language)}</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
          <p>{t('footer.rights', language)}</p>
          <p className="flex items-center gap-2">
            {t('footer.madeWith', language)} <Heart size={16} weight="fill" className="text-accent" /> {t('footer.inMontevideo', language)}
          </p>
        </div>
      </div>
    </footer>
  )
}
