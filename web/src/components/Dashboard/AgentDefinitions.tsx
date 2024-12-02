import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tables } from '@/types/database.types'
import { useAgentLocales } from '@/hooks/useAgentLocales'

type Agent = Tables<'agents'>
type AgentLocale = Tables<'agent_locales'>

interface AgentDefinitionsProps {
  agents: Agent[]
  selectedAgent: number | null
  setSelectedAgent: (id: number | null) => void
}

export function AgentDefinitions({
  agents,
  selectedAgent,
  setSelectedAgent,
}: AgentDefinitionsProps) {
  const { locales, loading: loadingLocales } = useAgentLocales(selectedAgent)
  const [selectedLocale, setSelectedLocale] = useState<AgentLocale | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <Card
          key={agent.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedAgent === agent.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => {
            setSelectedAgent(agent.id)
            setSelectedLocale(null)
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="font-semibold">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.first_message}</p>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>Default Locale: {agent.default_locale || 'None'}</p>
            <p>Status: {agent.system_prompt || 'Active'}</p>
          </div>
          
          {selectedAgent === agent.id && (
            <div className="mt-3 border-t pt-2">
              <p className="font-medium">Agent Locales:</p>
              {loadingLocales ? (
                <p className="text-sm text-gray-400">Loading locales...</p>
              ) : locales.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {locales.map(locale => (
                    <span 
                      key={locale.id}
                      className={`px-2 py-1 bg-gray-100 rounded-full text-xs cursor-pointer ${
                        selectedLocale?.id === locale.id ? 'bg-blue-200' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedLocale(locale)
                      }}
                    >
                      {locale.locale}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No locales configured</p>
              )}
            </div>
          )}

          {selectedLocale && (
            <div className="mt-3 border-t pt-2">
              <p className="font-medium">Locale Details:</p>
              <p className="text-sm">First Message: {selectedLocale.first_message}</p>
              <p className="text-sm">System Prompt: {selectedLocale.system_prompt}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
} 