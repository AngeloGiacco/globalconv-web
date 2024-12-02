"use client"
import { useState, useEffect } from 'react'
import type { Database } from '@/types/database.types'
import { createClient } from '@/supabase/client'

type Agent = Database['public']['Tables']['agents']['Row'] & {
  agent_locales: Database['public']['Tables']['agent_locales']['Row'][]
}

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    async function fetchAgents() {
      try {
        const { data, error } = await supabase
          .from('agents')
          .select(`
            *,
            agent_locales (*)
          `)
          .order('created_at', { ascending: false })

        if (error) throw error

        setAgents(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching agents')
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  return { agents, loading, error }
} 