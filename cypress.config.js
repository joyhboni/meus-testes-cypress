const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base para os testes do OrangeHRM
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    
    // Tempo de espera aumentado para lidar com a lentidão do site
    defaultCommandTimeout: 10000, 

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
