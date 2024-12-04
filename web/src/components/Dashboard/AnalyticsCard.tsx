import React from 'react'

const AnalyticsCard: React.FC = () => (
  <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl flex items-center justify-center border border-gray-100">
    <p className="text-gray-400 font-medium">Analytics visualization coming soon</p>
  </div>
)

export default React.memo(AnalyticsCard) 