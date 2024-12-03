import React from 'react'

interface SystemPromptCardProps {
  systemPrompt: string
}

const SystemPromptCard: React.FC<SystemPromptCardProps> = ({ systemPrompt }) => (
  <div className="group bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
    <p className="font-semibold text-gray-800 mb-4 text-lg">System Prompt</p>
    <p className="text-gray-600 leading-relaxed font-medium">{systemPrompt}</p>
  </div>
)

export default React.memo(SystemPromptCard) 