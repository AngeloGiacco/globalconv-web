"use client"
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useAgents } from '@/hooks/useAgents'
import { AgentDefinitions } from '@/components/Dashboard/AgentDefinitions'

export default function Dashboard() {
  const { agents, loading, error } = useAgents()
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null)

  if (loading) return <div className="text-center mt-10">Loading agents...</div>
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>

  // Find the selected agent's data
  const agentData = agents.find(agent => agent.id === selectedAgent)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/5 to-blue-100/10 relative">

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 pt-8 lg:pt-12 pb-16 relative"
      >
        <div className="max-w-[85rem] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Button onClick={() => {/* Handle agent creation */}}>
              Add New Agent
            </Button>
          </div>

          <Tabs defaultValue="definitions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 p-1 bg-gray-100/80 backdrop-blur rounded-full h-[42px]">
              <TabsTrigger value="definitions" className="flex items-center gap-2">
                Definitions
              </TabsTrigger>
              <TabsTrigger value="transcripts" className="flex items-center gap-2">
                Transcripts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="definitions">
              <AgentDefinitions 
                agents={agents} 
                selectedAgent={selectedAgent} 
                setSelectedAgent={setSelectedAgent} 
              />
            </TabsContent>

            <TabsContent value="transcripts">
              <div className="text-center">Please select an agent to view transcripts.</div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>
    </div>
  )
}
