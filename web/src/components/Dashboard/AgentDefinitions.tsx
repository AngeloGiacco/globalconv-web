import React from 'react'
import { Card } from '@/components/ui/card'
import { Tables } from '@/types/database.types'
import Link from 'next/link'
import { supportedLanguages } from '@/lib/supportedLanguages'

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
      {agents.map((agent) => {
        const locale = supportedLanguages.find(lang => lang.locale === agent.default_locale)
        return (
          <Link href={`/dashboard/agent/${agent.uuid}`} key={agent.uuid}>
            <Card className="p-4 cursor-pointer transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-gray-500">{agent.description}</p>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                {locale ? (
                  <p className="flex items-center">Default language: {locale.name} <locale.icon className="w-6 h-6 ml-2" /></p>
                ) : (
                  <p>Default language: {agent.default_locale}</p>
                )}
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
} 