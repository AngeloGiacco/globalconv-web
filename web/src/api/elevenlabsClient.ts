import axios from 'axios'

// Fetch a single agent
export const fetchAgent = async (agentId: string) => {
  const response = await axios.get(`/api/elevenlabs/agents/${agentId}`)
  return response.data
}

// Fetch list of agents
export const fetchAgents = async (params: { cursor?: string; page_size?: number; search?: string }) => {
  const response = await axios.get('/api/elevenlabs/agents', { params })
  return response.data
}

// Fetch conversations
export const fetchConversations = async (params: { cursor?: string; agent_id?: string; call_successful?: 'success' | 'failure' | 'unknown'; page_size?: number }) => {
  const response = await axios.get('/api/elevenlabs/conversations', { params })
  return response.data
}

// Fetch conversation details
export const fetchConversationDetails = async (conversationId: string) => {
  const response = await axios.get(`/api/elevenlabs/conversations/${conversationId}`)
  return response.data
} 