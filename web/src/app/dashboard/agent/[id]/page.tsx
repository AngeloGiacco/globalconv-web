"use client"
import React from 'react'
import { useAgent } from '@/hooks/useAgent'
import { AgentDetail } from '@/components/Dashboard/AgentDetail'

export default function AgentPage({ params }: { params: Promise<{ id: string }> }) {
  const [uuid, setUuid] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    params.then(unwrappedParams => {
      setUuid(unwrappedParams.id)
    })
  }, [params])

  const { agent, loading, error } = useAgent(uuid)

  if (loading) return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12">
          <div className="w-full h-full rounded-full border-4 border-blue-600/30 border-t-blue-600 animate-spin" />
        </div>
        <div className="text-gray-600 font-medium">Loading agent...</div>
      </div>
    </div>
  )
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>

  if (!agent) {
    return <div className="text-center mt-10 text-red-500">Agent not found.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/5 to-blue-100/10 relative">
      <section 
        className="container mx-auto px-6 pt-8 lg:pt-12 pb-16 relative"
      >
        <div className="max-w-[85rem] mx-auto">
          <AgentDetail agent={agent} />
        </div>
      </section>
    </div>
  )
} 