import { loadConfig, loadLockFile, saveLockFile, generateConfigHash } from '../utils/config.js';
import chalk from 'chalk';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface AgentConfig {
  name: string;
  firstMessage: string;
  systemPrompt: string;
  llmProvider: string;
}

interface ConvaiConfig {
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
    const convaiConfig = yaml.load(convaiConfigContent) as ConvaiConfig;

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
    const agentsToUpdate: string[] = [];

    for (const agent of currentAgents) {
      const filePath = path.join(agentsDir, `${agent}.yaml`);
      const agentConfig = yaml.load(fs.readFileSync(filePath, 'utf8')) as AgentConfig;
      const storedHashes = lockFile.agents[agent];

      const hasChanges = !storedHashes || 
        generateConfigHash(agentConfig.firstMessage) !== storedHashes.firstMessage ||
        generateConfigHash(agentConfig.systemPrompt) !== storedHashes.systemPrompt ||
        generateConfigHash(agentConfig.llmProvider) !== storedHashes.llmProvider;

      if (hasChanges) {
        agentsToUpdate.push(agent);
      }
    }

    const changes = {
      create: agentsToCreate,
      update: agentsToUpdate,
      delete: agentsToDelete,
    };

    console.log(chalk.blue('Determined the following changes:'));
    console.log(JSON.stringify(changes, null, 2));

    // Optionally, you can handle the creation, update, and deletion here using API calls
    // For example:
    // await handleAgentChanges(changes, apiClient);

    // Update the lock file with current hashes for each field
    const updatedLock = { ...lockFile };
    for (const agent of agentsToCreate.concat(agentsToUpdate)) {
      const filePath = path.join(agentsDir, `${agent}.yaml`);
      const agentConfig = yaml.load(fs.readFileSync(filePath, 'utf8')) as AgentConfig;
      updatedLock.agents[agent] = {
        firstMessage: generateConfigHash(agentConfig.firstMessage),
        systemPrompt: generateConfigHash(agentConfig.systemPrompt),
        llmProvider: generateConfigHash(agentConfig.llmProvider),
      };
    }

    for (const agent of agentsToDelete) {
      delete updatedLock.agents[agent];
    }

    // Save the updated lock file
    saveLockFile(updatedLock);
    console.log(chalk.blue('Sync process completed.'));
  } catch (error) {
    console.error(chalk.red('An error occurred during sync:'), error);
  }
}