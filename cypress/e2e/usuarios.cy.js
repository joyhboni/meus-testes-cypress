describe('Testes de API - ServeRest (Usuários)', () => {
  
    it('Deve listar usuários cadastrados com sucesso', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios'
      }).then((response) => {
        expect(response.status).to.eq(200); // Valida Status Code
        expect(response.body).to.have.property('usuarios'); // Valida corpo do JSON
        expect(response.duration).to.be.lessThan(1000); // Valida tempo de resposta < 1s
      });
    });
  
    it('Deve realizar login com sucesso', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          "email": "fulano@qa.com",
          "password": "teste"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        expect(response.body).to.have.property('authorization'); // Valida o Token de segurança
      });
    });
  });