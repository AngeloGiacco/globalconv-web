import { loadConfig, loadLockFile, saveLockFile, generateConfigHash } from '../utils/config.js';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import dotenv from 'dotenv';
import { VALID_LLM_PROVIDERS, LLMProvider } from '../types/index.js';

// Load environment variables
dotenv.config();

interface AgentConfig {
  name: string;
  firstMessage: string;
  systemPrompt: string;
  llmProvider: LLMProvider;
  callToAction?: string;
  startCall?: string;
  endCall?: string;
  listening?: string;
  speaking?: string;
}

interface ConvAIConfig {
  locales: string[];
  default_locale: string;
  specification_locale: string;
  agents: string;
}

// Retrieve API token from environment variables
const API_TOKEN = process.env.CONVAI_API_TOKEN;

if (!API_TOKEN) {
  console.error(chalk.red('Error: CONVAI_API_TOKEN is not defined in environment variables.'));
  process.exit(1);
}

interface LocaleChanges {
  added: string[];
  removed: string[];
}

interface FieldChanges {
  firstMessage?: boolean;
  systemPrompt?: boolean;
  llmProvider?: boolean;
  locales?: LocaleChanges;
  callToAction?: boolean;
  startCall?: boolean;
  endCall?: boolean;
  listening?: boolean;
  speaking?: boolean;
}

interface DetailedChanges {
  create: string[];
  update: Record<string, FieldChanges>;
  delete: string[];
}

export async function sync() {
  try {
    const config = loadConfig();
    console.log(chalk.blue('Loading configuration...'));

    // Look for convai.yaml in the root directory where the command is executed
    const convaiConfigPath = path.resolve(process.cwd(), 'convai.yaml');
    if (!fs.existsSync(convaiConfigPath)) {
      console.error(chalk.red(`Error: Configuration file not found at ${convaiConfigPath}`));
      process.exit(1);
    }

    const convaiConfigContent = fs.readFileSync(convaiConfigPath, 'utf8');
    const convaiConfig = yaml.load(convaiConfigContent) as ConvAIConfig;

    const agentsDir = path.resolve(process.cwd(), convaiConfig.agents);
    if (!fs.existsSync(agentsDir)) {
      console.log(chalk.yellow(`No agents directory found at ${agentsDir}.`));
      return;
    }

    const agentFiles = fs.readdirSync(agentsDir).filter(file => file.endsWith('.yaml'));
    const lockFile = loadLockFile();
    const currentAgents = agentFiles.map(file => path.basename(file, '.yaml'));
    const lockedAgents = Object.keys(lockFile.agents);

    const agentsToCreate = currentAgents.filter(agent => !lockedAgents.includes(agent));
    const agentsToDelete = lockedAgents.filter(agent => !currentAgents.includes(agent));
    const agentUpdates: Record<string, FieldChanges> = {};

    for (const agent of currentAgents) {
      const filePath = path.join(agentsDir, `${agent}.yaml`);
      const agentConfig = yaml.load(fs.readFileSync(filePath, 'utf8')) as AgentConfig;

      // Validate LLM provider
      if (!VALID_LLM_PROVIDERS.includes(agentConfig.llmProvider as LLMProvider)) {
        console.error(chalk.red(
          `Error: Invalid LLM provider "${agentConfig.llmProvider}" for agent "${agent}". ` +
          `Valid providers are: ${VALID_LLM_PROVIDERS.join(', ')}`
        ));
        process.exit(1);
      }

      const storedHashes = lockFile.agents[agent];

      if (storedHashes) {
        const fieldChanges: FieldChanges = {};
        let hasAnyChanges = false;

        // Add default values if not present
        const currentCallToAction = agentConfig.callToAction || "Talk to us";
        const currentStartCall = agentConfig.startCall || "Start call";
        const currentEndCall = agentConfig.endCall || "End Call";
        const currentListening = agentConfig.listening || "Listening...";
        const currentSpeaking = agentConfig.speaking || "Speak to interrupt";

        // Compare with defaults if needed
        if (generateConfigHash(currentCallToAction) !== storedHashes.callToAction) {
          fieldChanges.callToAction = true;
          hasAnyChanges = true;
        }
        if (generateConfigHash(currentStartCall) !== storedHashes.startCall) {
          fieldChanges.startCall = true;
          hasAnyChanges = true;
        }
        if (generateConfigHash(currentEndCall) !== storedHashes.endCall) {
          fieldChanges.endCall = true;
          hasAnyChanges = true;
        }
        if (generateConfigHash(currentListening) !== storedHashes.listening) {
          fieldChanges.listening = true;
          hasAnyChanges = true;
        }
        if (generateConfigHash(currentSpeaking) !== storedHashes.speaking) {
          fieldChanges.speaking = true;
          hasAnyChanges = true;
        }

        // Compare locales with detailed changes
        const storedLocales = storedHashes.locales || [];
        const currentLocales = convaiConfig.locales;
        
        const addedLocales = currentLocales.filter(locale => !storedLocales.includes(locale));
        const removedLocales = storedLocales.filter(locale => !currentLocales.includes(locale));

        if (addedLocales.length > 0 || removedLocales.length > 0) {
          fieldChanges.locales = {
            added: addedLocales,
            removed: removedLocales
          };
          hasAnyChanges = true;
        }

        if (generateConfigHash(agentConfig.firstMessage) !== storedHashes.firstMessage) {
          fieldChanges.firstMessage = true;
          hasAnyChanges = true;
        }
        if (generateConfigHash(agentConfig.systemPrompt) !== storedHashes.systemPrompt) {
          fieldChanges.systemPrompt = true;
          hasAnyChanges = true;
        }
        if (agentConfig.llmProvider !== storedHashes.llmProvider) {
          fieldChanges.llmProvider = true;
          hasAnyChanges = true;
        }

        if (hasAnyChanges) {
          agentUpdates[agent] = fieldChanges;
        }
      }
    }

    const changes: DetailedChanges = {
      create: agentsToCreate,
      update: agentUpdates,
      delete: agentsToDelete,
    };

    const hasChanges = changes.create.length > 0 || Object.keys(changes.update).length > 0 || changes.delete.length > 0;

    if (hasChanges) {
      console.log(chalk.blue('Determined the following changes:'));
      
      // Log agent creations
      if (changes.create.length > 0) {
        console.log(chalk.green(`Creating new agents: ${changes.create.join(', ')}`));
      }

      // Log agent updates
      for (const [agent, agentChanges] of Object.entries(changes.update)) {
        if (agentChanges.locales) {
          const { added, removed } = agentChanges.locales;
          if (added.length > 0) {
            console.log(chalk.green(`  ${agent}: Adding locales: ${added.join(', ')}`));
          }
          if (removed.length > 0) {
            console.log(chalk.yellow(`  ${agent}: Removing locales: ${removed.join(', ')}`));
          }
        }
        if (agentChanges.firstMessage) {
          console.log(chalk.yellow(`  ${agent}: First message content changed`));
        }
        if (agentChanges.systemPrompt) {
          console.log(chalk.yellow(`  ${agent}: System prompt content changed`));
        }
        if (agentChanges.llmProvider) {
          console.log(chalk.yellow(`  ${agent}: LLM provider changed`));
        }
        if (agentChanges.callToAction) {
          console.log(chalk.yellow(`  ${agent}: Call to action content changed`));
        }
        if (agentChanges.startCall) {
          console.log(chalk.yellow(`  ${agent}: Start call content changed`));
        }
        if (agentChanges.endCall) {
          console.log(chalk.yellow(`  ${agent}: End call content changed`));
        }
        if (agentChanges.listening) {
          console.log(chalk.yellow(`  ${agent}: Listening content changed`));
        }
        if (agentChanges.speaking) {
          console.log(chalk.yellow(`  ${agent}: Speaking content changed`));
        }
      }

      // Log agent deletions
      if (changes.delete.length > 0) {
        console.log(chalk.red(`Deleting agents: ${changes.delete.join(', ')}`));
      }
    } else {
      console.log(chalk.green('No changes to make'));
    }

    // Optionally, you can handle the creation, update, and deletion here using API calls
    // For example:
    // await handleAgentChanges(changes, apiClient);

    // Update the lock file
    const updatedLock = { ...lockFile };
    for (const agent of agentsToCreate.concat(Object.keys(agentUpdates))) {
      const filePath = path.join(agentsDir, `${agent}.yaml`);
      const agentConfig = yaml.load(fs.readFileSync(filePath, 'utf8')) as AgentConfig;
      updatedLock.agents[agent] = {
        firstMessage: generateConfigHash(agentConfig.firstMessage),
        systemPrompt: generateConfigHash(agentConfig.systemPrompt),
        llmProvider: agentConfig.llmProvider,
        locales: [...convaiConfig.locales],
        callToAction: generateConfigHash(agentConfig.callToAction || "Talk to us"),
        startCall: generateConfigHash(agentConfig.startCall || "Start call"),
        endCall: generateConfigHash(agentConfig.endCall || "End Call"),
        listening: generateConfigHash(agentConfig.listening || "Listening..."),
        speaking: generateConfigHash(agentConfig.speaking || "Speak to interrupt"),
      };
    }

    for (const agent of agentsToDelete) {
      delete updatedLock.agents[agent];
    }

    // Save the updated lock file
    saveLockFile(updatedLock);
    console.log(chalk.green('Sync process completed.'));
  } catch (error) {
    console.error(chalk.red('An error occurred during sync:'), error);
  }
}

// Helper function to compare arrays
function arraysAreEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}