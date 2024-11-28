import { Command } from 'commander';
import { init } from './commands/init';
import { sync } from './commands/sync';

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

program.parse(process.argv);