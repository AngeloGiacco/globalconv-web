"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAgents } from '@/hooks/useAgents'
import { AgentDefinitions } from '@/components/Dashboard/AgentDefinitions'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { CreateAgentForm } from '@/components/Dashboard/CreateAgentForm'

export default function Dashboard() {
  const { data: agents, isLoading: loading, error } = useAgents()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const handleCreateAgent = async (data: {
    name: string
    defaultLocale: string
    specLocale: string
    systemPrompt: string
    firstMessage: string
    activeLocales: string[]
  }) => {
    // TODO: Implement agent creation
    console.log('Creating agent:', data)
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="sr-only">Create New Agent</DialogTitle>
          <CreateAgentForm onSubmit={handleCreateAgent} />
        </DialogContent>
      </Dialog>
    </>
  )
}
