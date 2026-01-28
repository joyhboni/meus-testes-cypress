describe('OrangeHRM - Autenticação', () => {

    beforeEach(() => {
      cy.visit('/') // Ele usa a baseUrl que você configurou no cypress.config.js
    })
  
    it('Login com sucesso - Caminho Feliz', () => {
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/dashboard/index')
    })
  
    it('Login com senha incorreta - Caminho Infeliz', () => {
      // [WHEN] - Inserir usuário certo mas senha errada
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('senhaErrada123')
      cy.get('button[type="submit"]').click()
  
      // [THEN] - Validar a mensagem de erro
      // No OrangeHRM, o alerta de erro tem a classe .oxd-alert
      cy.get('.oxd-alert')
        .should('be.visible')
        .and('contain', 'Invalid credentials')
      
      // Validar se a cor do alerta é um tom de vermelho (estilo da classe oxd-alert--error)
      cy.get('.oxd-alert-content--error').should('exist')
    })
  })