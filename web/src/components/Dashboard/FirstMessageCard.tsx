import React from 'react'

interface FirstMessageCardProps {
  firstMessage: string
}

const FirstMessageCard: React.FC<FirstMessageCardProps> = ({ firstMessage }) => (
  <div className="group bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
    <p className="font-semibold text-gray-800 mb-4 text-lg">First Message</p>
    <p className="text-gray-600 leading-relaxed font-medium">{firstMessage}</p>
  </div>
)

export default React.memo(FirstMessageCard) 