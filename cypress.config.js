const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev/', // URL da API que os testes foram feitos
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
