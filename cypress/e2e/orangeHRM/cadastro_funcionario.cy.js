describe('OrangeHRM - Gestão de Funcionários', () => {

    beforeEach(() => {
      // [GIVEN] - Login e navegação até a tela de cadastro
      cy.visit('/') 
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
  
      // Navega para a tela de Adicionar Funcionário uma única vez aqui
      cy.contains('span', 'PIM').click()
      cy.contains('button', 'Add').click()
    })
  
    it('Deve cadastrar um novo funcionário com sucesso', () => {
      // [WHEN] - Preencher o cadastro completo
      cy.get('input[name="firstName"]').type('Teste')
      cy.get('input[name="lastName"]').type('Joyce')
      cy.get('button[type="submit"]').click()
  
      // [THEN] - Validar toast de sucesso
      cy.get('.oxd-toast', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Successfully Saved')
    })
  
    it('Cadastro com informações incompletas - Caminho Infeliz', () => {
      // [WHEN] - Preencher apenas o primeiro nome e tentar salvar
      cy.get('input[name="firstName"]').type('Teste')
      cy.get('button[type="submit"]').click()
  
      // [THEN] - Validar a mensagem de campo requerido
      // Dica: 'span' ajuda a ser mais específico se o .oxd-text falhar
      cy.get('.oxd-input-group > .oxd-text') 
        .should('be.visible')
        .and('contain', 'Required')
    })
  
  })