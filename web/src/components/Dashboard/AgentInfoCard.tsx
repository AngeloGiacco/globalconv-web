import React from 'react'
import { Tables } from '@/types/database.types'
import Skeleton from '@/components/ui/Skeleton'

type Agent = Tables<'agents'>

interface AgentInfoCardProps {
  agent: Agent
  loading: boolean
}

const AgentInfoCard: React.FC<AgentInfoCardProps> = ({ agent, loading }) => (
  <div className="bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-transparent rounded-2xl p-8 backdrop-blur-sm border border-blue-100/30">
    {loading ? (
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div>
          <Skeleton className="w-32 h-4 mb-2" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
    ) : (
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <span className="text-white text-lg font-medium">{agent.name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-800">{agent.name}</p>
          <p className="text-gray-500 font-medium">{agent.default_locale}</p>
        </div>
      </div>
    )}
  </div>
)

export default React.memo(AgentInfoCard) 