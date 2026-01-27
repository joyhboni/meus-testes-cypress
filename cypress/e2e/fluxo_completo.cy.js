describe('Fluxo de Usuário Dinâmico - ServeRest', () => {
    // Gerando um e-mail aleatório para o teste ser sempre novo
    const emailAleatorio = `joyce_qa${Math.floor(Math.random() * 10000)}@teste.com`;
  
    it('Deve cadastrar um usuário e validar o login com os dados criados', () => {
      // PASSO 1: Cadastrar Usuário
      cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
          "nome": "Joyce QA",
          "email": emailAleatorio,
          "password": "teste",
          "administrador": "true"
        }
      }).then((response) => {
        expect(response.status).to.eq(201); // 201 = Created
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      });
  
      // PASSO 2: Fazer Login com o usuário que acabamos de criar
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          "email": emailAleatorio,
          "password": "teste"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        // Opcional: Validar que recebemos um token
        expect(response.body).to.have.property('authorization');
      });
    });
  });