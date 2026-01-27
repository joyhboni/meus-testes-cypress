describe('Diagnóstico de API - CRUD Produtos', () => {
    it('Deve validar a criação do produto antes de prosseguir', () => {
      // 1. LOGIN (Usando o usuário padrão da API que sabemos que é ADMIN)
      cy.request('POST', '/login', {
        email: "fulano@qa.com",
        password: "teste"
      }).then((loginRes) => {
        const token = loginRes.body.authorization;
        const nomeUnico = "Produto Teste Joyce " + Date.now();
  
        // 2. CREATE (Aqui vamos imprimir o erro se ele existir)
        cy.request({
          method: 'POST',
          url: '/produtos',
          headers: { authorization: token },
          body: {
            nome: nomeUnico,
            preco: 100,
            descricao: "Teste de Diagnóstico",
            quantidade: 10
          },
          failOnStatusCode: false // IMPORTANTE: Não deixa o Cypress travar aqui
        }).then((prodRes) => {
          // Se o status não for 201, o teste vai nos dizer EXATAMENTE o erro da API
          if (prodRes.status !== 201) {
            cy.log('FALHA NO CADASTRO:', JSON.stringify(prodRes.body));
            throw new Error(`A API respondeu com erro: ${prodRes.body.message}`);
          }
  
          const id = prodRes.body._id;
          cy.log('ID Gerado com sucesso:', id);
  
          // 3. READ (GET) - Só entra aqui se o ID for real
          cy.request('GET', `/produtos/${id}`).then((getRes) => {
            expect(getRes.status).to.eq(200);
            expect(getRes.body.nome).to.eq(nomeUnico);
          });
        });
      });
    });
  });