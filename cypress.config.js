const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    overwrite: false,
    reportPageTitle: 'Reporte de Pruebas',
    embedScreenshots: true,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss', 
    inlineAssets: true,
    saveAllAttempts: false,
    embedScreenshots: true  
  },
  e2e: {
   
    screenshotOnRunFailure: true,
    viewportWidth: 1920,  // Ancho personalizado
    viewportHeight: 1080, // Alto personalizado
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com"
  },
});
