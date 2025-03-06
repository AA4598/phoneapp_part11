const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message); // Print to terminal (GitHub Actions logs)
          return null;
        },
      });
    },
  },
});
