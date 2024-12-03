import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  agentName: string
}

const Header: React.FC<HeaderProps> = ({ agentName }) => (
  <div className="flex justify-between items-center mb-12">
    <Link href="/dashboard">
      <Button
        variant="outline"
        className="group border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-full px-6 py-2.5 transition-all duration-200"
        aria-label="Go to Dashboard"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
        Dashboard
      </Button>
    </Link>
    <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
      {agentName}
    </h2>
  </div>
)

export default React.memo(Header) 