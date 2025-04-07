const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss', 
    screenshots: true,
    embedScreenshots: true  
  },
  e2e: {
    screenshotOnRunFailure: true,
    viewportWidth: 1920,  // Ancho personalizado
    viewportHeight: 1080, // Alto personalizado
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com"
  },
});
