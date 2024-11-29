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
  llmProvider: string;
}

export interface LockFile {
  version: string;
  agents: {
    [agentName: string]: {
      firstMessage: string;
      systemPrompt: string;
      llmProvider: string;
    };
  };
}

export interface AddOptions {
  firstMessage: string;
  systemPrompt: string;
  llmProvider: string;
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
