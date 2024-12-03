"use client"
import { useState, useEffect } from 'react'
import type { Database } from '@/types/database.types'
import { createClient } from '@/supabase/client'

type Agent = Database['public']['Tables']['agents']['Row']

export function useAgent(agentId?: string) {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!agentId) {
      setAgent(null)
      setLoading(false)
      return
    }

    async function fetchAgent() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('uuid', agentId)
          .single()

        if (error) throw error

        setAgent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the agent')
      } finally {
        setLoading(false)
      }
    }

    fetchAgent()
  }, [agentId])

  return { agent, loading, error }
} 