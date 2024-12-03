"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAgents } from '@/hooks/useAgents'
import { AgentDefinitions } from '@/components/Dashboard/AgentDefinitions'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { supportedLanguages, Language } from '@/lib/supportedLanguages'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export default function Dashboard() {
  const { data: agents, isLoading: loading, error } = useAgents()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [agentLanguages, setAgentLanguages] = useState<Language['locale'][]>([])
  const [defaultLanguage, setDefaultLanguage] = useState<string>('')

  const handleCreateAgent = async (data: {
    name: string
    defaultLanguage: string
    specLanguage: string
    llmProvider: string
    systemPrompt: string
    firstMessage: string
    agentLanguages: string[]
  }) => {
    const validLanguages = agentLanguages.filter(locale => 
      supportedLanguages.some(lang => lang.locale === locale)
    )

    if (validLanguages.length === 0) {
      alert("Please select at least one valid language.")
      return
    }

    const defaultLanguage = validLanguages[0]

    console.log('Creating agent:', {
      ...data,
      defaultLanguage,
      agentLanguages: validLanguages
    })
    setCreateDialogOpen(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12">
          <div className="w-full h-full rounded-full border-4 border-blue-600/30 border-t-blue-600 animate-spin" />
        </div>
        <div className="text-gray-600 font-medium">Loading your agents...</div>
      </div>
    </div>
  )
  
  if (error) return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="max-w-md text-center px-6">
        <div className="text-2xl font-semibold text-gray-900 mb-2">Unable to load agents</div>
        <div className="text-gray-600">{error.message}</div>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[calc(100vh-4rem)] bg-[#fafafa]"
      >
        <div className="h-40 bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 h-full">
            <div className="flex items-end h-full pb-6">
              <div className="flex-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  Conversational Agents
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 mt-2"
                >
                  Deploy and manage your conversational AI agents across multiple languages
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-11 rounded-lg shadow-lg hover:shadow-blue-200 transition-all duration-300"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  Create New Agent
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <AgentDefinitions agents={agents ?? []} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-xl font-semibold mb-4" style={{ display: 'none' }}>Create New Agent</DialogTitle>
          <DialogDescription>
              Fill in the details below to create a new conversational agent.
            </DialogDescription>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleCreateAgent({
              name: formData.get('name') as string,
              systemPrompt: formData.get('systemPrompt') as string,
              llmProvider: formData.get('llmProvider') as string,
              firstMessage: formData.get('firstMessage') as string,
              defaultLanguage: defaultLanguage,
              specLanguage: 'en',
              agentLanguages: agentLanguages
            })
          }} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Agent Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Conversational Agent's Name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="systemPrompt" className="text-sm font-medium text-gray-700">
                System Prompt
              </label>
              <textarea
                required
                id="systemPrompt"
                name="systemPrompt"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="You are a helpful AI assistant..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="firstMessage" className="text-sm font-medium text-gray-700">
                First Message
              </label>
              <textarea
                id="firstMessage"
                name="firstMessage"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hello! How can I assist you today?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                LLM Provider
              </label>
              <Select 
                required
                name="llmProvider"
                onValueChange={(value) => {
                  const form = document.querySelector('form');
                  if (form) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'llmProvider';
                    input.value = value;
                    form.appendChild(input);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {VALID_LLM_PROVIDERS.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Default Language
              </label>
              <Select 
                required
                name="defaultLanguage"
                value={defaultLanguage}
                onValueChange={setDefaultLanguage}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map((lang) => (
                    <SelectItem key={lang.locale} value={lang.locale}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Agent Languages
              </label>
              <div className="flex flex-wrap gap-2">
                {supportedLanguages.map((lang) => (
                  <Button
                    key={lang.locale}
                    type="button"
                    variant={agentLanguages.includes(lang.locale) ? "default" : "outline"}
                    onClick={() => {
                      setAgentLanguages(prev => 
                        prev.includes(lang.locale)
                          ? prev.filter(l => l !== lang.locale)
                          : [...prev, lang.locale]
                      )
                    }}
                    className={`
                      ${agentLanguages.includes(lang.locale) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700'}
                    `}
                  >
                    <span className="flex items-center">
                      <lang.icon className="w-4 h-4 mr-2" />
                      {lang.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Agent
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
