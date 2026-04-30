const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'node src/server.js',
    url: 'http://localhost:3000/todos',
    reuseExistingServer: !process.env.CI,
  },
});
