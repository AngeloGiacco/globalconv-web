import { loadConfig, loadLockFile, saveLockFile, generateConfigHash } from '../utils/config';
import chalk from 'chalk';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface AgentConfig {
  first_message: string;
  sys_prompt: string;
  llm_provider: string;
}

interface LockFile {
  version: string;
  agents: {
    [agentName: string]: string;
  };
}

// Retrieve API token from environment variables
const API_TOKEN = process.env.CONVAI_API_TOKEN;

if (!API_TOKEN) {
  console.error(chalk.red('Error: CONVAI_API_TOKEN is not defined in environment variables.'));
  process.exit(1);
}

// Create an Axios instance with default headers
const apiClient = axios.create({
  baseURL: 'https://api.convai.com',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export async function sync() {
  try {
    const config = loadConfig();
    console.log(chalk.blue('Loading configuration...'));

    // Syncing main configuration
    const configResponse = await apiClient.post('/sync/config', config);

    if (configResponse.status === 200) {
      console.log(chalk.green('Successfully synced main configuration.'));
    } else {
      console.log(chalk.red('Failed to sync main configuration.'));
    }

    // Syncing agents
    const agentsDir = path.resolve(process.cwd(), 'convai-agents');
    if (!fs.existsSync(agentsDir)) {
      console.log(chalk.yellow('No convai-agents directory found.'));
      return;
    }

    const agentFiles = fs.readdirSync(agentsDir).filter(file => file.endsWith('.yaml'));
    const lockFile: LockFile = loadLockFile();
    const updatedLock: LockFile = { ...lockFile };

    for (const file of agentFiles) {
      const agentName = path.basename(file, '.yaml');
      const filePath = path.join(agentsDir, file);
      const agentConfig = yaml.load(fs.readFileSync(filePath, 'utf8')) as AgentConfig;

      const currentHash = generateConfigHash(agentConfig);
      const storedHash = lockFile.agents[agentName];

      if (currentHash === storedHash) {
        console.log(chalk.gray(`No changes detected for agent: ${agentName}. Skipping sync.`));
        continue;
      }

      try {
        const agentResponse = await apiClient.post(`/sync/agents/${agentName}`, agentConfig);

        if (agentResponse.status === 200) {
          console.log(chalk.green(`Successfully synced agent: ${agentName}`));
          // Update the hash after successful sync
          updatedLock.agents[agentName] = currentHash;
        } else {
          console.log(chalk.red(`Failed to sync agent: ${agentName}`));
        }
      } catch (agentError) {
        console.error(chalk.red(`Error syncing agent: ${agentName}`), agentError);
      }
    }

    // Save the updated lock file
    saveLockFile(updatedLock);
    console.log(chalk.blue('Sync process completed.'));
  } catch (error) {
    console.error(chalk.red('An error occurred during sync:'), error);
  }
}