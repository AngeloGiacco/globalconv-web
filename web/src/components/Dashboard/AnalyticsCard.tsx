import React from 'react'

const AnalyticsCard: React.FC = () => (
  <div className="group bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
    <p className="text-xl font-semibold text-gray-800 mb-6">Analytics</p>
    <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl flex items-center justify-center border border-gray-100">
      <p className="text-gray-400 font-medium">Analytics visualization coming soon</p>
    </div>
  </div>
)

export default React.memo(AnalyticsCard) 