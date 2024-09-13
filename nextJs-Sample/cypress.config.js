const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Your Next.js dev server URL
    setupNodeEvents(on, config) {
      // Add custom event listeners if needed
    },
  },
});
