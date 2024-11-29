export interface ConvAIConfig {
  locales: string[];
  default_locale: string;
  specification_locale: string;
  agents_directory?: string;
}

export interface AgentConfig {
  name: string;
  firstMessage: string;
  systemPrompt: string;
  llmProvider: LLMProvider;
}

export interface LockFile {
  version: string;
  agents: {
    [agentName: string]: {
      firstMessage: string;
      systemPrompt: string;
      llmProvider: LLMProvider;
      locales: string[];
    };
  };
}

export interface AddOptions {
  firstMessage: string;
  systemPrompt: string;
  llmProvider: LLMProvider;
}

export const DEFAULT_CONFIG: ConvAIConfig = {
  locales: ['en'],
  default_locale: 'en',
  specification_locale: 'en',
  agents_directory: 'convai-agents',
};

export const CONSTANTS = {
  CONFIG_FILE: 'convai.yaml',
  LOCK_FILE: 'convai.lock',
  LOCK_VERSION: '1.0',
  API_BASE_URL: 'https://api.convai.com',
} as const;

export const VALID_LLM_PROVIDERS = [
  'gpt-4o',
  'gpt-4o-mini',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.0-pro',
  'claude-3-5-sonnet',
  'claude-3-haiku',
  'gpt-3.5-turbo',
  'gpt-4-turbo'
] as const;

export type LLMProvider = typeof VALID_LLM_PROVIDERS[number];
