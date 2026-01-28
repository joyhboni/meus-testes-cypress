describe('Gestão de Token e Autorização', () => {
    let authToken; // Variável global para guardar o token
  
    before(() => {
      // Fazemos o login antes de tudo para pegar o token
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          "email": "fulano@qa.com",
          "password": "teste"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        // Guardamos o valor do campo 'authorization' na nossa variável
        authToken = response.body.authorization; 
      });
    });
  
    it('Deve tentar acessar uma rota protegida usando o token salvo', () => {
      // Agora usamos o token que guardamos lá no 'before'
      cy.request({
        method: 'GET',
        url: '/usuarios',
        headers: {
          Authorization: authToken // Passamos o token no cabeçalho (header)
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('usuarios');
      });
    });
  });