#!/bin/env node
import * as yargs from 'yargs';
import * as packageJson from '../package.json';
import { GraphRaw, toGraphMap, toTable } from './dijkstra';
import { table as tablePretty } from 'table';

const nodes: GraphRaw[] = [
  [
    'A',
    {
      C: 2,
      B: 5,
    },
  ],
  [
    'B',
    {
      A: 5,
      D: 2,
    },
  ],
  [
    'C',
    {
      A: 2,
      E: 2,
      D: 8,
    },
  ],
  [
    'D',
    {
      B: 2,
      C: 8,
      F: 4,
    },
  ],
  [
    'E',
    {
      C: 2,
      F: 4,
    },
  ],
  [
    'F',
    {
      D: 4,
      E: 4,
    },
  ],
];

yargs
  .command(
    'run',
    'print a test message',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
    () => {
      const graph = toGraphMap(nodes);

      const tables = toTable(graph);

      console.log(tables.join('\n'));
    },
  )
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
