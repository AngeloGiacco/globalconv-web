import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import chalk from 'chalk';

export function init() {
  const configPath = path.resolve(process.cwd(), 'convai.yaml');
  if (fs.existsSync(configPath)) {
    console.log(chalk.red('convai.yaml already exists in this directory.'));
    return;
  }

  const defaultConfig = {
    locales: ['en'],
    default_locale: 'en',
    specification_locale: 'en',
    agents: './convai-agents/'
  };

  fs.writeFileSync(configPath, yaml.dump(defaultConfig), 'utf8');
  console.log(chalk.green('Initialized convAI project with default configuration.'));
}