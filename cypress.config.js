const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://globalsqa.com/angularJs-protractor/BankingProject/#",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
