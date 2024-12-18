import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import chalk from 'chalk';
import { ConvAIConfig, LockFile, CONSTANTS, DEFAULT_CONFIG } from '../types/index.js';
import crypto from 'crypto';

/**
 * Load main configuration
 */
export function loadConfig(): ConvAIConfig {
  const configPath = path.resolve(process.cwd(), CONSTANTS.CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    console.log(chalk.yellow(`Config file ${CONSTANTS.CONFIG_FILE} not found. Creating a default one.`));
    fs.writeFileSync(configPath, yaml.dump(DEFAULT_CONFIG), 'utf8');
    return DEFAULT_CONFIG;
  }

  const fileContents = fs.readFileSync(configPath, 'utf8');
  return yaml.load(fileContents) as ConvAIConfig;
}

/**
 * Save main configuration
 */
export function saveConfig(config: ConvAIConfig) {
  const configPath = path.resolve(process.cwd(), CONSTANTS.CONFIG_FILE);
  fs.writeFileSync(configPath, yaml.dump(config), 'utf8');
  console.log(chalk.green(`Configuration saved to ${CONSTANTS.CONFIG_FILE}`));
}

/**
 * Load lock file
 */
export function getLockFilePath(): string {
  return path.resolve(process.cwd(), CONSTANTS.LOCK_FILE);
}

export function loadLockFile(): LockFile {
  const lockPath = getLockFilePath();
  if (!fs.existsSync(lockPath)) {
    return {
      version: CONSTANTS.LOCK_VERSION,
      agents: {},
    };
  }
  return JSON.parse(fs.readFileSync(lockPath, 'utf8'));
}

/**
 * Save lock file
 */
export function saveLockFile(lockFile: LockFile): void {
  const lockPath = getLockFilePath();
  fs.writeFileSync(lockPath, JSON.stringify(lockFile, null, 2));
}

/**
 * Generate SHA-256 hash for an agent configuration
 */
export function generateConfigHash(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}
