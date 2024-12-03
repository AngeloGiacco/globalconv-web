import React from 'react'
import EditableCard from '@/components/Dashboard/EditableCard'
import { Tables } from '@/types/database.types'

type Agent = Tables<'agents'>

interface FirstMessageCardProps {
  agent: Agent
  localeData: {
    system_prompt: string
    first_message: string
  }
  updateLocaleData: (field: 'system_prompt' | 'first_message', newContent: string) => void
}

const FirstMessageCard: React.FC<FirstMessageCardProps> = ({ agent, localeData, updateLocaleData }) => {
  
  const handleSaveForLocale = (newContent: string) => {
    console.log('Save first message for current locale:', newContent)
    // TODO: Implement API call to save for locale
  }

  const handleSaveAcrossLocales = (newContent: string) => {
    console.log('Save first message across all locales:', newContent)
    // TODO: Implement API call to save across locales
  }

  return (
    <EditableCard
      title="First Message"
      content={localeData.first_message}
      onSaveForLocale={handleSaveForLocale}
      onSaveAcrossLocales={handleSaveAcrossLocales}
    />
  )
}

export default React.memo(FirstMessageCard) 