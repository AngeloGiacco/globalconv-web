import React from 'react'
import EditableCard from '@/components/Dashboard/EditableCard'
import { Tables } from '@/types/database.types'

type Agent = Tables<'agents'>

interface SystemPromptCardProps {
  agent: Agent
  localeData: {
    system_prompt: string
    first_message: string
  }
  updateLocaleData: (field: 'system_prompt' | 'first_message', newContent: string) => void
}

const SystemPromptCard: React.FC<SystemPromptCardProps> = ({ agent, localeData, updateLocaleData }) => {
  
  const handleSaveForLocale = (newContent: string) => {
    console.log('Save system prompt for current locale:', newContent)
    // TODO: Implement API call to save for locale
  }

  const handleSaveAcrossLocales = (newContent: string) => {
    console.log('Save system prompt across all locales:', newContent)
    // TODO: Implement API call to save across locales
  }

  return (
    <EditableCard
      title="System Prompt"
      content={localeData.system_prompt}
      onSaveForLocale={handleSaveForLocale}
      onSaveAcrossLocales={handleSaveAcrossLocales}
    />
  )
}

export default React.memo(SystemPromptCard) 