import React, { useState, useMemo } from 'react'
import { useAgentLocales } from '@/hooks/useAgentLocales'
import { Tables } from '@/types/database.types'
import AgentInfoCard from '@/components/Dashboard/AgentInfoCard'
import SystemPromptCard from '@/components/Dashboard/SystemPromptCard'
import FirstMessageCard from '@/components/Dashboard/FirstMessageCard'
import AnalyticsCard from '@/components/Dashboard/AnalyticsCard'
import LocalesList from '@/components/Dashboard/LocalesList'
import BackgroundGradients from '@/components/Dashboard/BackgroundGradients'
import Header from '@/components/Dashboard/Header'

type Agent = Tables<'agents'>

interface AgentDetailProps {
  agent: Agent
}

export function AgentDetail({ agent }: AgentDetailProps) {
  const { locales, loading, error } = useAgentLocales(agent.uuid)
  const [selectedLocale, setSelectedLocale] = useState<string>(agent.default_locale)

  // Memoize localeData to prevent unnecessary recalculations
  const localeData = useMemo(() => {
    return (
      locales.find(locale => locale.locale === selectedLocale) || {
        system_prompt: agent.system_prompt,
        first_message: agent.first_message,
      }
    )
  }, [locales, selectedLocale, agent.system_prompt, agent.first_message])

  return (
    <div className="min-h-screen bg-[#FCFCFD] relative p-6">
      {/* Enhanced background gradients */}
      <BackgroundGradients />

      {/* Main content container */}
      <div className="relative bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-7xl mx-auto border border-gray-100/50">
        {/* Header section */}
        <Header agentName={agent.name} />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section */}
          <div className="lg:w-2/3 space-y-8">
            <AgentInfoCard agent={agent} loading={loading} />
            <SystemPromptCard systemPrompt={localeData.system_prompt} />
            <FirstMessageCard firstMessage={localeData.first_message} />
            <AnalyticsCard />
          </div>

          {/* Right Section - Locales */}
          <div className="lg:w-1/3">
            <LocalesList
              locales={locales}
              loading={loading}
              error={error}
              selectedLocale={selectedLocale}
              setSelectedLocale={setSelectedLocale}
              defaultLocale={agent.default_locale}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 