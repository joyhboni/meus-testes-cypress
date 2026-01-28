# 🚀 Automação de Testes com Cypress - Estudo de QA

Este repositório documenta minha jornada de especialização técnica, focada em automação de APIs e boas práticas de QA.

## 🧪 O que este projeto demonstra?
- **CRUD Completo de API**: Fluxo de Criação, Leitura e Exclusão de produtos.
- **Gestão de Sincronismo**: Uso avançado de Promises/Callbacks para evitar dados `undefined`.
- **Dados Dinâmicos**: Geração de nomes de produtos únicos em tempo real para evitar conflitos.
- **Tratamento de Autenticação**: Captura e uso de Tokens de autorização entre requisições.

## 🛠️ Tecnologias
* **Cypress**
* **JavaScript (Node.js)**
* **ServeRest API** (Ambiente de Testes)

## 🏃 Como rodar
1. Instale: `npm install`
2. Execute: `npx cypress run --spec "cypress/e2e/api_produtos_crud.cy.js"`