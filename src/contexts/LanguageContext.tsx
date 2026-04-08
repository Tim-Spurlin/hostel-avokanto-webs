import React, { createContext, useContext, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'
import { LanguageCode, CurrencyCode } from '@/lib/i18n'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  currency: CurrencyCode
  setCurrency: (curr: CurrencyCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useKV<LanguageCode>('user-language', 'es')
  const [currency, setCurrency] = useKV<CurrencyCode>('user-currency', 'USD')

  return (
    <LanguageContext.Provider value={{ language: language || 'es', setLanguage, currency: currency || 'USD', setCurrency }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
