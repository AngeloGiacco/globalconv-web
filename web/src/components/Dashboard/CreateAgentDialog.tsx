"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supportedLanguages, Language } from '@/lib/supportedLanguages'
import { cn } from "@/lib/utils"
import { VALID_LLM_PROVIDERS } from '@/components/Dashboard/AgentDetail';

interface CreateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    name: string
    defaultLanguage: string
    specLanguage: string
    llmProvider: string
    systemPrompt: string
    description: string
    firstMessage: string
    agentLanguages: string[]
  }) => void
}

export function CreateAgentDialog({ open, onOpenChange, onSubmit }: CreateAgentDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [agentLanguages, setAgentLanguages] = useState<Language['locale'][]>([])
  const [defaultLanguage, setDefaultLanguage] = useState<string>('en')
  const [specLanguage, setSpecLanguage] = useState<string>('en')
  const handleCreateAgent = (data: {
    name: string
    defaultLanguage: string
    specLanguage: string
    llmProvider: string
    systemPrompt: string
    description: string
    firstMessage: string
    agentLanguages: string[]
  }) => {
    console.log('handleCreateAgent', data);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0">
        <div className="flex h-[80vh]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-100 p-6 space-y-6">
            <div>
              <DialogTitle className="text-xl font-semibold mb-4">Conversational Agent</DialogTitle>
              <DialogDescription className="mb-6">
                Configure your conversational AI agent
              </DialogDescription>
            </div>
            
            <nav className="space-y-1">
              {['Basic Info', 'Agent Settings', 'Language Settings'].map((step, index) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm rounded-md",
                    "hover:bg-gray-100 transition-colors",
                    "text-left",
                    index === currentStep ? "bg-white shadow-sm text-blue-600" : "text-gray-600"
                  )}
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs mr-3">
                    {index + 1}
                  </span>
                  {step}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleCreateAgent({
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                systemPrompt: formData.get('systemPrompt') as string,
                llmProvider: formData.get('llmProvider') as string,
                firstMessage: formData.get('firstMessage') as string,
                defaultLanguage: defaultLanguage,
                specLanguage: specLanguage,
                agentLanguages: agentLanguages
              })
            }} className="space-y-6">
              {currentStep === 0 && (
                // Basic Info
                <div className="space-y-6">
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
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Agent Description
                    </label>
                    <textarea
                      required
                      id="description"
                      name="description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Briefly describe what this agent does..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                // Agent Settings
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Specification Language
                    </label>
                    <Select onValueChange={setSpecLanguage} value={specLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80 overflow-y-auto">
                        {supportedLanguages.sort((a, b) => a.name.localeCompare(b.name)).map(lang => (
                          <SelectItem key={lang.locale} value={lang.locale}>
                            <div className="flex items-center gap-1">
                              <lang.icon className="w-4 h-4" />
                              <span>{lang.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                </div>
              )}

              {currentStep === 2 && (
                // Language Settings
                <div className="space-y-6">
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
                      <SelectContent className="max-h-80 overflow-y-auto">
                        {supportedLanguages.sort((a, b) => a.name.localeCompare(b.name)).map((lang) => (
                          <SelectItem key={lang.locale} value={lang.locale}>
                            <div className="flex items-center gap-1">
                              <lang.icon className="w-4 h-4" />
                              <span>{lang.name}</span>
                            </div>
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
                      {supportedLanguages
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((lang) => (
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
                </div>
              )}

              <div className="flex justify-between gap-3 pt-6 mt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                  className={currentStep === 0 ? 'invisible' : ''}
                >
                  Previous
                </Button>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  {currentStep === 2 ? (
                    <Button type="submit">
                      Create Agent
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 