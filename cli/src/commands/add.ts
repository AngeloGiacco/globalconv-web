import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import { loadConfig } from '../utils/config.js';
import { AgentConfig, AddOptions } from '../types/index.js';
import yaml from 'yaml';

export const add = async (name: string, options: AddOptions) => {
  const config = loadConfig();
  const agentsDir = config.agents_directory || 'convai-agents';

  mkdirSync(agentsDir, { recursive: true });

  const agentConfig: AgentConfig = {
    name,
    firstMessage: options.firstMessage || "Hey! How can I help?",
    systemPrompt: options.systemPrompt || "You're a helpful assistant.",
    llmProvider: options.llmProvider || "gemini-1.5-flash",
    callToAction: options.callToAction || "Talk to us",
    startCall: options.startCall || "Start call",
    endCall: options.endCall || "End Call",
    listening: options.listening || "Listening...",
    speaking: options.speaking || "Speak to interrupt",
  };

  const { name: _, ...agentConfigWithoutName } = agentConfig;
  const agentPath = join(agentsDir, `${name}.yaml`);
  writeFileSync(agentPath, yaml.stringify(agentConfigWithoutName));

  console.log(`✨ Created new agent: ${name}`);
  console.log(` Agent configuration saved to: ${agentPath}`);
}; 