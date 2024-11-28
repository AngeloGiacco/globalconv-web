import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import chalk from 'chalk';
import { saveConfig } from '../utils/config';

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
  };

  fs.writeFileSync(configPath, yaml.dump(defaultConfig), 'utf8');
  console.log(chalk.green('Initialized convAI project with default configuration.'));
}