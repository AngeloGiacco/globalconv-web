import axios, { AxiosInstance } from 'axios'

// Define the base URL for ElevenLabs API
const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1'

// Initialize Axios instance with default configurations
const apiClient: AxiosInstance = axios.create({
  baseURL: ELEVENLABS_API_BASE,
  headers: {
    'Content-Type': 'application/json',
    // The API key will be set dynamically in each request
  },
})

// Function to set the API key in headers
const setApiKey = (apiKey: string) => {
  apiClient.defaults.headers.common['xi-api-key'] = apiKey
}

// Function to set the API key from environment variables
const getApiKey = (): string => {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
  if (!apiKey) {
    throw new Error('ElevenLabs API key is not defined in environment variables.')
  }
  return apiKey
}

// Type Definitions based on the provided API specifications

// **1. Get Agent**
export interface GetAgentResponse {
  agent_id: string
  name: string
  conversation_config: {
    agent: {
      server: {
        url: string
        server_events: string[]
        secret: string
        timeout: number
      }
    }
  }
  metadata: Record<string, any>
  platform_settings?: Record<string, any>
}

// **2. Get Agents**
export interface GetAgentsResponse {
  agents: GetAgentResponse[]
  cursor?: string
}

export interface GetAgentsParams {
  cursor?: string
  page_size?: number
  search?: string
}

// **3. Get Conversations**
export interface GetConversationsResponse {
  conversations: Conversation[]
  cursor?: string
}

export interface GetConversationsParams {
  cursor?: string
  agent_id?: string
  call_successful?: 'success' | 'failure' | 'unknown'
  page_size?: number
}

export interface Conversation {
  agent_id: string
  conversation_id: string
  status: 'processing' | 'done'
  transcript: Transcript[]
  metadata: Record<string, any>
  analysis?: Record<string, any>
}

export interface Transcript {
  // Define transcript fields based on API response
  // Example:
  // speaker: string
  // message: string
  // timestamp: string
}

// **4. Get Conversation Details**
export interface GetConversationDetailsResponse extends Conversation {}

// **API Utility Functions**

/**
 * Get a single agent's configuration by agent ID.
 * 
 * @param agentId - The ID of the agent.
 * @param apiKey - Your ElevenLabs API key.
 * @returns The agent's configuration.
 */
export const getAgent = async (agentId: string): Promise<GetAgentResponse> => {
  try {
    setApiKey(getApiKey())
    const response = await apiClient.get<GetAgentResponse>(`/convai/agents/${agentId}`)
    return response.data
  } catch (error: any) {
    console.error('Error fetching agent:', error)
    throw error
  }
}

/**
 * Get a list of agents with optional pagination and search.
 * 
 * @param params - Query parameters for fetching agents.
 * @param apiKey - Your ElevenLabs API key.
 * @returns A paginated list of agents.
 */
export const getAgents = async (params: GetAgentsParams, apiKey: string): Promise<GetAgentsResponse> => {
  try {
    setApiKey(apiKey)
    const response = await apiClient.get<GetAgentsResponse>('/convai/agents', { params })
    return response.data
  } catch (error: any) {
    console.error('Error fetching agents:', error)
    throw error
  }
}

/**
 * Get a list of conversations for agents with optional filters.
 * 
 * @param params - Query parameters for fetching conversations.
 * @param apiKey - Your ElevenLabs API key.
 * @returns A paginated list of conversations.
 */
export const getConversations = async (params: GetConversationsParams, apiKey: string): Promise<GetConversationsResponse> => {
  try {
    setApiKey(apiKey)
    const response = await apiClient.get<GetConversationsResponse>('/convai/conversations', { params })
    return response.data
  } catch (error: any) {
    console.error('Error fetching conversations:', error)
    throw error
  }
}

/**
 * Get details of a specific conversation by conversation ID.
 * 
 * @param conversationId - The ID of the conversation.
 * @param apiKey - Your ElevenLabs API key.
 * @returns The details of the specified conversation.
 */
export const getConversationDetails = async (conversationId: string, apiKey: string): Promise<GetConversationDetailsResponse> => {
  try {
    setApiKey(apiKey)
    const response = await apiClient.get<GetConversationDetailsResponse>(`/convai/conversations/${conversationId}`)
    return response.data
  } catch (error: any) {
    console.error('Error fetching conversation details:', error)
    throw error
  }
} 