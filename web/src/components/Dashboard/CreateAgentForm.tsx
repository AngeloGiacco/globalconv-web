import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { supportedLanguages } from '@/lib/supportedLanguages'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect } from '@/components/ui/multi-select'

interface CreateAgentFormProps {
  onSubmit: (data: {
    name: string
    defaultLocale: string
    specLocale: string
    systemPrompt: string
    firstMessage: string
    activeLocales: string[]
  }) => void
}

export function CreateAgentForm({ onSubmit }: CreateAgentFormProps) {
  const [name, setName] = useState('')
  const [defaultLocale, setDefaultLocale] = useState('')
  const [specLocale, setSpecLocale] = useState('')
  const [systemPrompt, setSystemPrompt] = useState('')
  const [firstMessage, setFirstMessage] = useState('')
  const [activeLocales, setActiveLocales] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      defaultLocale,
      specLocale,
      systemPrompt,
      firstMessage,
      activeLocales,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Create New Agent</h2>
        <p className="text-gray-600">Configure your new conversational agent with multilingual support.</p>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Agent Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter agent name"
            required
          />
        </div>

        {/* Locale Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Locale
            </label>
            <Select value={defaultLocale} onValueChange={setDefaultLocale} required>
              <SelectTrigger>
                <SelectValue placeholder="Select default locale" />
              </SelectTrigger>
              <SelectContent>
                {(supportedLanguages || []).map(lang => (
                  <SelectItem key={lang.locale} value={lang.locale}>
                    <div className="flex items-center gap-2">
                      {lang.icon && <lang.icon className="w-4 h-4" />}
                      <span>{lang.native_name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specification Locale
            </label>
            <Select value={specLocale} onValueChange={setSpecLocale} required>
              <SelectTrigger>
                <SelectValue placeholder="Select spec locale" />
              </SelectTrigger>
              <SelectContent>
                {(supportedLanguages || []).map(lang => (
                  <SelectItem key={lang.locale} value={lang.locale}>
                    <div className="flex items-center gap-2">
                      {lang.icon && <lang.icon className="w-4 h-4" />}
                      <span>{lang.native_name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Locales */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Active Locales
          </label>
          <MultiSelect
            options={(supportedLanguages || []).map(lang => ({
              value: lang.locale,
              label: lang.native_name,
              icon: lang.icon,
            }))}
            value={activeLocales}
            onChange={setActiveLocales}
            placeholder="Select active locales"
          />
          <p className="mt-1 text-sm text-gray-500">
            Select the locales this agent will be available in (includes default and spec locales)
          </p>
        </div>
      </div>

      {/* Prompts */}
      <div className="space-y-4">
        <div>
          <label htmlFor="systemPrompt" className="block text-sm font-medium text-gray-700 mb-1">
            System Prompt
          </label>
          <Textarea
            id="systemPrompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter the system prompt in the specification locale"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="firstMessage" className="block text-sm font-medium text-gray-700 mb-1">
            First Message
          </label>
          <Textarea
            id="firstMessage"
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            placeholder="Enter the first message in the specification locale"
            rows={4}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Agent
      </Button>
    </form>
  )
} 