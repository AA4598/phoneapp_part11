const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log("🔍 Cypress Log:", message); // Appears in GitHub Actions logs
          return null;
        },
      });
    },
  },
});
