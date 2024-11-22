"use client"
import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '../supabase/client'

interface IntlConvAIProps {
  orgKey: string
  locale: string
  agentName: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
      }
    }
  }
}

export const IntlConvAI = ({ 
  orgKey, 
  locale, 
  agentName
}: IntlConvAIProps) => {
  const [agentId, setAgentId] = useState<string | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  
  useEffect(() => {
    const fetchAgentId = async () => {
      try {
        console.log('Fetching organization ID...')
        const { data: orgData } = await createClient()
          .from('orgs')
          .select('id')
          .eq('key', orgKey)
          .single()

        console.log('Organization data:', orgData)

        if (!orgData) return

        console.log('Fetching agent ID...')
        const { data: agentData } = await createClient()
          .from('agents')
          .select('id')
          .eq('name', agentName)
          .eq('org', orgData.id)
          .single()

        console.log('Agent data:', agentData)

        if (!agentData) return

        console.log('Fetching ElevenLabs ID for the locale...')
        const { data: localeData } = await createClient()
          .from('agent_locales')
          .select('eleven_labs_id')
          .eq('agent', agentData.id)
          .eq('locale', locale)
          .single()

        console.log('Locale data:', localeData)

        if (localeData) {
          setAgentId(localeData.eleven_labs_id)
          console.log('Agent ID set:', localeData.eleven_labs_id)
        }
      } catch (error) {
        console.error('Failed to fetch agent ID:', error)
      }
    }

    fetchAgentId()
  }, [orgKey, locale, agentName])

  useEffect(() => {
    if (document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      return
    }

    console.log('Adding ElevenLabs script to the document...')
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/convai-widget/index.js'
    script.async = true
    scriptRef.current = script
    document.body.appendChild(script)

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        console.log('Removing ElevenLabs script from the document...')
        document.body.removeChild(scriptRef.current)
      }
    }
  }, [])

  if (!agentId) {
    console.log('Agent ID not found, returning null...')
    return null
  }

  console.log('Rendering elevenlabs-convai component with agent ID:', agentId)
  return (
    <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
  )
}