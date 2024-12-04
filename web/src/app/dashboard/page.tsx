"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAgents } from '@/hooks/useAgents'
import { AgentDefinitions } from '@/components/Dashboard/AgentDefinitions'
import { CreateAgentDialog } from '@/components/Dashboard/CreateAgentDialog'
import { supportedLanguages } from '@/lib/supportedLanguages'

export default function Dashboard() {
  const { data: agents, isLoading: loading, error } = useAgents()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const handleCreateAgent = async (data: {
    name: string
    defaultLanguage: string
    specLanguage: string
    llmProvider: string
    systemPrompt: string
    description: string
    firstMessage: string
    agentLanguages: string[]
  }) => {
    const validLanguages = data.agentLanguages.filter(locale => 
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
                  Your Conversational Agents
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 mt-2"
                >
                  Click on an agent to modify it or analyse its performance
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
                  Create Agent
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
            <div className="p-6">
              <AgentDefinitions agents={agents ?? []} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <CreateAgentDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateAgent}
      />
    </>
  )
}
