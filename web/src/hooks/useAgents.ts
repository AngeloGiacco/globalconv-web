"use client"
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { createClient } from '@/supabase/client'
import { Tables } from '@/types/database.types'

type Agent = Tables<'agents'>

export function useAgents(): UseQueryResult<Agent[], Error> {
  const supabase = createClient()

  return useQuery<Agent[], Error>({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)

      return data || []
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
} 