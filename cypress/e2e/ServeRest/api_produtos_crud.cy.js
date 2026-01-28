describe('Análise Crítica - CRUD Produtos', () => {
    it('Deve garantir o cadastro antes de tentar consultar', () => {
      const nomeUnico = `Produto Joyce ${Date.now()}`;
  
      // 1. LOGIN (Garantindo o Token)
      cy.request('POST', '/login', {
        email: "fulano@qa.com",
        password: "teste"
      }).then((loginRes) => {
        const token = loginRes.body.authorization;
  
        // 2. CADASTRO (POST) - O segredo está aqui
        cy.request({
          method: 'POST',
          url: '/produtos',
          headers: { authorization: token },
          body: {
            nome: nomeUnico,
            preco: 100,
            descricao: "Descricao Teste",
            quantidade: 10
          },
          failOnStatusCode: false // Permite capturar o erro se o cadastro falhar
        }).then((prodRes) => {
          // Diagnóstico: Se não for 201, o teste falha aqui com a mensagem da API
          if (prodRes.status !== 201) {
            throw new Error(`FALHA NO CADASTRO: ${prodRes.body.message || JSON.stringify(prodRes.body)}`);
          }
  
          const id = prodRes.body._id;
          cy.log('ID criado com sucesso: ' + id);
  
          // 3. CONSULTA (Só executa se o ID existir)
          cy.request('GET', `/produtos/${id}`).then((getRes) => {
            expect(getRes.status).to.eq(200);
            expect(getRes.body.nome).to.eq(nomeUnico);
            
            // 4. DELETE (Limpeza)
            cy.request({
              method: 'DELETE',
              url: `/produtos/${id}`,
              headers: { authorization: token }
            }).then((delRes) => {
              expect(delRes.status).to.eq(200);
            });
          });
        });
      });
    });
  });