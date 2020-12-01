#!/bin/env node
import * as yargs from 'yargs';
import * as packageJson from '../package.json';

yargs
  .command(
    'do-something',
    'print a test message',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
    () => {
      console.log('Hello, world!');
    },
  )
  .alias('h', 'help')
  .alias('v', 'version')
  .version()
  .scriptName(packageJson.name)
  .help().argv;
