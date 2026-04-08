import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, CurrencyDollar } from "@phosphor-icons/react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LANGUAGES, CURRENCIES } from "@/lib/i18n"

export function Header() {
  const { language, setLanguage, currency, setCurrency } = useLanguage()

  const currentLanguage = LANGUAGES.find(l => l.code === language)
  const currentCurrency = CURRENCIES.find(c => c.code === currency)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-primary">Avokanto</h1>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe size={18} weight="duotone" />
                <span className="hidden sm:inline">{currentLanguage?.name}</span>
                <span className="text-lg">{currentLanguage?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className={language === lang.code ? 'font-semibold' : ''}>
                    {lang.name}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CurrencyDollar size={18} weight="duotone" />
                <span className="font-semibold">{currentCurrency?.code}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-[400px] overflow-y-auto">
              {CURRENCIES.map((curr) => (
                <DropdownMenuItem
                  key={curr.code}
                  onClick={() => setCurrency(curr.code)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className={`font-mono ${currency === curr.code ? 'font-bold' : ''}`}>
                      {curr.code}
                    </div>
                    <div className="text-xs text-muted-foreground">{curr.name}</div>
                  </div>
                  <span className="text-muted-foreground">{curr.symbol}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
