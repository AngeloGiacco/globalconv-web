#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './commands/init.js';
import { sync } from './commands/sync.js';
import { loadConfig, loadLockFile } from './utils/config.js';

const program = new Command();

program
  .name('convAI')
  .description('CLI tool to manage conversational AI agents')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new convAI project')
  .action(init);

program
  .command('sync')
  .description('Sync agents with the server')
  .action(sync);

program
  .command('debug')
  .description('Show current configuration and lock file state')
  .action(() => {
    console.log('Current Config:');
    console.log(loadConfig());
    console.log('\nLock File:');
    console.log(loadLockFile());
  });

program.parse(process.argv);