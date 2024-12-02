"use client"
import { useState, useEffect } from 'react'
import type { Database } from '@/types/database.types'
import { createClient } from '@/supabase/client'

type AgentLocale = Database['public']['Tables']['agent_locales']['Row']

export function useAgentLocales(agentId: number | null) {
  const [locales, setLocales] = useState<AgentLocale[]>([])
  const [loading, setLoading] = useState(
    false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    async function fetchAgentLocales() {
      if (!agentId) {
        setLocales([])
        return
      }

      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('agent_locales')
          .select('*')
          .eq('agent', agentId)
          .order('locale')

        if (error) throw error

        setLocales(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching agent locales')
      } finally {
        setLoading(false)
      }
    }

    fetchAgentLocales()
  }, [agentId])

  return { locales, loading, error }
} 