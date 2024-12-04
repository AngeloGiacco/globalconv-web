import React from 'react'
import { Tables } from '@/types/database.types'
import Skeleton from '@/components/ui/Skeleton'
import { supportedLanguages } from '@/lib/supportedLanguages'

type Agent = Tables<'agents'>

interface AgentInfoCardProps {
  agent: Agent
  loading: boolean
}

const AgentInfoCard: React.FC<AgentInfoCardProps> = ({ agent, loading }) => {
  const localeInfo = supportedLanguages.find(lang => lang.locale === agent.default_locale)

  return (
    <div className="bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-transparent rounded-3xl p-10 backdrop-blur-md border border-blue-100/50 shadow-lg">
      {loading ? (
        <div className="flex items-center space-x-6 mb-6">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div>
            <Skeleton className="w-40 h-6 mb-3" />
            <Skeleton className="w-28 h-6" />
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-bold">{agent.name.charAt(0)}</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{agent.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              {localeInfo && <localeInfo.icon className="w-6 h-6" />}
              <p className="text-gray-600 font-medium">{localeInfo ? localeInfo.name : agent.default_locale}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(AgentInfoCard)