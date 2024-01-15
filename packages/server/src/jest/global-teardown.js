const { teardown: teardownDevServer } = require('jest-dev-server');

module.exports = async function globalTeardown() {
  if (process.env.STAGE === 'test') {
    await teardownDevServer(globalThis.servers);
  }
};
