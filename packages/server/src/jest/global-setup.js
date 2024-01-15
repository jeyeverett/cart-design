const { setup: setupDevServer } = require('jest-dev-server');

module.exports = async function globalSetup() {
  if (process.env.STAGE === 'test') {
    globalThis.servers = await setupDevServer({
      command: `ts-node --transpile-only src/index.ts `,
      launchTimeout: 50000,
      port: 8080,
    });
  }
};
