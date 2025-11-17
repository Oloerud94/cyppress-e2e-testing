const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    supportFile: false,
    // fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      users: {
        standard: {
          username: 'standard_user',
          password: 'secret_sauce',
        },
        lockedOut: {
          username: 'locked_out_user',
          password: 'secret_sauce',
        },
        problem: {
          username: 'problem_user',
          password: 'secret_sauce',
        },
        glitch: {
          username: 'performance_glitch_user',
          password: 'secret_sauce',
        },
      },
    }
  },
});
