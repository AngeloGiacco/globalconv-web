import React from 'react'
import { Card } from '@/components/ui/card'
import { Tables } from '@/types/database.types'
import Link from 'next/link'

type Agent = Tables<'agents'>

interface AgentDefinitionsProps {
  agents: Agent[]
}

export function AgentDefinitions({ agents }: AgentDefinitionsProps) {
  if (!agents) {
    return <div>No agents available</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <Link href={`/dashboard/agent/${agent.uuid}`} key={agent.uuid}>
          <Card className="p-4 cursor-pointer transition-all hover:shadow-md">
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
          </Card>
        </Link>
      ))}
    </div>
  )
} 