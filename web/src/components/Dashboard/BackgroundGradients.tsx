import React from 'react'

const BackgroundGradients: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent rounded-full mix-blend-normal animate-drift" />
    <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-gradient-to-tr from-indigo-50/30 via-blue-50/20 to-transparent rounded-full mix-blend-normal animate-drift-slow" />
  </div>
)

export default React.memo(BackgroundGradients) 