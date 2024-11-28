import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import chalk from 'chalk';
import crypto from 'crypto';

interface ConvAIConfig {
  locales: string[];
  default_locale: string;
  specification_locale: string;
}

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

const CONFIG_FILE = 'convai.yaml';
const LOCK_FILE = '.convai/.convai.lock';
const LOCK_VERSION = '1.0';

/**
 * Load main configuration
 */
export function loadConfig(): ConvAIConfig {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    console.log(chalk.yellow(`Config file ${CONFIG_FILE} not found. Creating a default one.`));
    const defaultConfig: ConvAIConfig = {
      locales: ['en'],
      default_locale: 'en',
      specification_locale: 'en',
    };
    fs.writeFileSync(configPath, yaml.dump(defaultConfig), 'utf8');
    return defaultConfig;
  }

  const fileContents = fs.readFileSync(configPath, 'utf8');
  return yaml.load(fileContents) as ConvAIConfig;
}

/**
 * Save main configuration
 */
export function saveConfig(config: ConvAIConfig) {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);
  fs.writeFileSync(configPath, yaml.dump(config), 'utf8');
  console.log(chalk.green(`Configuration saved to ${CONFIG_FILE}`));
}

/**
 * Load lock file
 */
export function loadLockFile(): LockFile {
  const lockPath = path.resolve(process.cwd(), LOCK_FILE);
  if (!fs.existsSync(lockPath)) {
    return { version: LOCK_VERSION, agents: {} };
  }
  const fileContents = fs.readFileSync(lockPath, 'utf8');
  return JSON.parse(fileContents) as LockFile;
}

/**
 * Save lock file
 */
export function saveLockFile(lock: LockFile) {
  const lockDir = path.resolve(process.cwd(), '.convai');
  if (!fs.existsSync(lockDir)) {
    fs.mkdirSync(lockDir);
  }
  const lockPath = path.resolve(lockDir, '.convai.lock');
  fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2), 'utf8');
}

/**
 * Generate hash for an agent configuration
 */
export function generateConfigHash(agentConfig: AgentConfig): string {
  const hash = crypto.createHash('sha256');
  // Concatenate relevant fields
  const data = `${agentConfig.first_message}|${agentConfig.sys_prompt}|${agentConfig.llm_provider}`;
  hash.update(data);
  return hash.digest('hex');
}