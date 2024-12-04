import React, { useState, useMemo } from 'react'
import { useAgentLocales } from '@/hooks/useAgentLocales'
import { Tables } from '@/types/database.types'
import EditableCard from '@/components/Dashboard/EditableCard'
import AnalyticsCard from '@/components/Dashboard/AnalyticsCard'
import LocalesList from '@/components/Dashboard/LocalesList'
import Header from '@/components/Dashboard/Header'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import WidgetSettingsCard from '@/components/Dashboard/WidgetSettingsCard'
import { AgentWidget } from '@/components/Dashboard/AgentWidget'

type Agent = Tables<'agents'>

interface AgentDetailProps {
  agent: Agent
}

export const VALID_LLM_PROVIDERS = [
  'gpt-4o',
  'gpt-4o-mini',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.0-pro',
  'claude-3-5-sonnet',
  'claude-3-haiku',
  'gpt-3.5-turbo',
  'gpt-4-turbo'
] as const;

export function AgentDetail({ agent }: AgentDetailProps) {
  const { locales, loading, error } = useAgentLocales(agent.uuid)
  const [selectedLocale, setSelectedLocale] = useState<string>(agent.default_locale)
  const [selectedProvider, setSelectedProvider] = useState(agent.llm_provider);
  const [isProviderChanged, setIsProviderChanged] = useState(false);
  const [activeTab, setActiveTab] = useState<'manage' | 'analyse' | 'try'>('manage');

  // Memoize localeData to prevent unnecessary recalculations
  const localeData = useMemo(() => {
    return locales.find(locale => locale.locale === selectedLocale) || {
      system_prompt: agent.system_prompt,
      first_message: agent.first_message,
      call_to_action: '',
      listening: '',
      speaking: '',
      start_call: '',
      end_call: '',
    }
  }, [locales, selectedLocale, agent])

  const updateLocaleData = (field: 'system_prompt' | 'first_message', newContent: string) => {
    // Placeholder for updating locale data
    console.log(`Update ${field} with:`, newContent)
    // TODO: Implement actual update logic
  }

  const handleLLMProviderChange = (value: string) => {
    setSelectedProvider(value);
    setIsProviderChanged(true);
  };

  const handleSaveProvider = async (saveAcrossLocales: boolean) => {
    try {
      // TODO: Implement API call to save provider
      console.log('Saving provider:', selectedProvider, 'across locales:', saveAcrossLocales);
      setIsProviderChanged(false);
    } catch (error) {
      console.error('Failed to save provider:', error);
    }
  };

  const handleCancelProviderChange = () => {
    setSelectedProvider(agent.llm_provider); 
    setIsProviderChanged(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] relative p-6">
      <div className="relative bg-white dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-7xl mx-auto border border-gray-100/50 dark:border-gray-800/50">
        <div className="mb-8">
          <Header agentName={agent.name} />
        </div>

        <div className="flex justify-center mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === 'manage'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
          >
            Manage
          </button>
          <button
            onClick={() => setActiveTab('analyse')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === 'analyse'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
          >
            Analyse
          </button>
          <button
            onClick={() => setActiveTab('try')}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === 'try'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors`}
          >
            Try it out
          </button>
        </div>

        {activeTab === 'manage' && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/3 space-y-8">
              <EditableCard
                title="System Prompt"
                content={localeData.system_prompt}
                onSaveForLocale={(newContent) => {
                  console.log('Save system prompt for current locale:', newContent)
                  // TODO: Implement API call to save system prompt for locale
                }}
                onSaveAcrossLocales={(newContent) => {
                  console.log('Save system prompt across all locales:', newContent)
                  // TODO: Implement API call to save system prompt across locales
                }}
              />
              <EditableCard
                title="First Message"
                content={localeData.first_message}
                onSaveForLocale={(newContent) => {
                  console.log('Save first message for current locale:', newContent)
                  // TODO: Implement API call to save first message for locale
                }}
                onSaveAcrossLocales={(newContent) => {
                  console.log('Save first message across all locales:', newContent)
                  // TODO: Implement API call to save first message across locales
                }}
              />
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      LLM Provider
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Select the AI model that powers your agent
                    </p>
                  </div>
                  {isProviderChanged && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      Unsaved changes
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <Select
                    value={selectedProvider}
                    onValueChange={handleLLMProviderChange}
                  >
                    <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="max-h-[300px] overflow-y-auto">
                        {VALID_LLM_PROVIDERS.map((provider) => (
                          <SelectItem 
                            key={provider} 
                            value={provider}
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{provider}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>

                  {isProviderChanged && (
                    <div className="flex gap-3 justify-end mt-6 items-center">
                      <button
                        onClick={handleCancelProviderChange}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveProvider(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                      >
                        Save for Current Locale
                      </button>
                      <button
                        onClick={() => handleSaveProvider(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all"
                      >
                        Save Across All Locales
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <WidgetSettingsCard
                settings={{
                  call_to_action: localeData.call_to_action,
                  listening: localeData.listening,
                  speaking: localeData.speaking,
                  start_call: localeData.start_call,
                  end_call: localeData.end_call || '',
                }}
                onSaveForLocale={(newSettings) => {
                  console.log('Save widget settings for current locale:', newSettings)
                  // TODO: Implement API call to save widget settings for locale
                }}
                onSaveAcrossLocales={(newSettings) => {
                  console.log('Save widget settings across all locales:', newSettings)
                  // TODO: Implement API call to save widget settings across locales
                }}
              />
            </div>

            <motion.div
              className="lg:w-1/3 space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LocalesList
                locales={locales}
                loading={loading}
                error={error}
                selectedLocale={selectedLocale}
                setSelectedLocale={setSelectedLocale}
                defaultLocale={agent.default_locale}
              />
            </motion.div>
          </div>
        )}

        {activeTab === 'analyse' && (
          <div>
            <AnalyticsCard />
          </div>
        )}
        {activeTab === 'try' && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2">
              {locales.find(locale => locale.locale === selectedLocale) && (
                <AgentWidget agentId={locales.find(locale => locale.locale === selectedLocale)!.eleven_labs_id}/>
              )}
            </div>
            <motion.div
              className="lg:w-1/4 space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LocalesList
                locales={locales}
                loading={loading}
                error={error}
                selectedLocale={selectedLocale}
                setSelectedLocale={setSelectedLocale}
                defaultLocale={agent.default_locale}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(AgentDetail) 