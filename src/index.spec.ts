import * as path from 'path';
import { spawn } from 'child_process';

const TYPESCRIPT_RUNNER = require.resolve('ts-node/dist/bin');
const MAIN_FILE = path.join(__dirname, 'index.ts');

// Pulled from https://github.com/kentcdodds/split-guide/blob/fb4b2a2ebc1fb8c3c010c2af1318861b8bb1bb13/src/bin/index.test.js#L93
function runCLI(args = '', cwd = process.cwd()): Promise<string> {
  const isRelative = cwd[0] !== '/';
  if (isRelative) {
    cwd = path.resolve(__dirname, cwd);
  }
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';

    const child = spawn(TYPESCRIPT_RUNNER, [MAIN_FILE, ...args.split(' ')], { cwd });

    child.on('error', (error) => {
      return reject(error);
    });

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', () => {
      if (stderr) {
        return reject(stderr);
      } else {
        return resolve(stdout);
      }
    });
  });
}

describe('cool cli', () => {
  describe('test', () => {
    it('prints a message', async () => {
      expect.assertions(1);

      // console.log('d', await runCLI());
      expect(await runCLI('do-something')).toMatchInlineSnapshot(`
        "Hello, world!
        "
      `);
    });
  });
});
