import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supportedLanguages } from '@/lib/supportedLanguages'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Locale {
  id: string
  locale: string
}

interface LocalesListProps {
  locales: Locale[]
  loading: boolean
  error: string | null
  selectedLocale: string
  setSelectedLocale: (locale: string) => void
  defaultLocale: string
}

const LocalesList: React.FC<LocalesListProps> = ({
  locales,
  loading,
  error,
  selectedLocale,
  setSelectedLocale,
  defaultLocale,
}) => {
  const otherLocales = locales.filter(locale => locale.locale !== defaultLocale)
  const availableLocales = supportedLanguages.filter(
    lang => !locales.some(locale => locale.locale === lang.locale)
  )

  const [selectedNewLocale, setSelectedNewLocale] = useState<string>('')

  const addLocale = async () => {
    if (!selectedNewLocale) return
    // TODO: Implement the API call to add a new locale
    console.log('Adding locale:', selectedNewLocale)
    setSelectedNewLocale('') // Reset selection after adding
  }

  return (
    <div className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-100 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-semibold text-gray-800">Agent Languages</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50">
              Add Locale
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Language</DialogTitle>
              <DialogDescription>
                Select a language from the list below to add it to the agent's supported languages.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Select onValueChange={setSelectedNewLocale} value={selectedNewLocale}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {availableLocales.sort((a, b) => a.name.localeCompare(b.name)).map(lang => (
                    <SelectItem key={lang.locale} value={lang.locale}>
                      <div className="flex items-center gap-1">
                        <lang.icon className="w-4 h-4" />
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={addLocale} 
                disabled={!selectedNewLocale}
                className="w-full"
              >
                Add Language
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {/* Default Locale Button */}
        <LocaleButton
          locale={defaultLocale}
          isSelected={selectedLocale === defaultLocale}
          onClick={() => setSelectedLocale(defaultLocale)}
          isDefault
        />

        {/* Other Locales */}
        {loading ? (
          <p className="text-center text-gray-500">Loading locales...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : otherLocales.length > 0 ? (
          otherLocales.map(locale => (
            <LocaleButton
              key={locale.id}
              locale={locale.locale}
              isSelected={selectedLocale === locale.locale}
              onClick={() => setSelectedLocale(locale.locale)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No additional locales available.</p>
        )}
      </div>
    </div>
  )
}

interface LocaleButtonProps {
  locale: string
  isSelected: boolean
  onClick: () => void
  isDefault?: boolean
}

const LocaleButton: React.FC<LocaleButtonProps> = ({ locale, isSelected, onClick, isDefault }) => {
  const langInfo = supportedLanguages.find(l => l.locale === locale)
  if (!langInfo) return null

  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      onClick={onClick}
      className={`w-full rounded-xl py-3 text-left transition-all duration-200 ${
        isSelected
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20'
          : 'border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
      }`}
      aria-pressed={isSelected}
    >
      <span className="flex items-center gap-2">
        {isSelected && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
        <langInfo.icon className="w-4 h-4" />
        <span>{langInfo.name}</span>
        {isDefault && <span className="ml-auto text-sm opacity-75">(Default)</span>}
      </span>
    </Button>
  )
}

export default React.memo(LocalesList)