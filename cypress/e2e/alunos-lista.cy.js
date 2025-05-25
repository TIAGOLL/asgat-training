describe('Lista de Alunos', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'cypress-test-token-1234567890');
    });

    cy.intercept('GET', '**/buscarAlunos', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'João Silva',
          idade: '2000-05-15',
          contato: '42999887766',
          faixa: 'Azul',
          data_ingresso: '2021-03-10',
          user_id: 1
        },
        {
          id: 2,
          nome: 'Maria Oliveira',
          idade: '1998-07-22',
          contato: '42998765432',
          faixa: 'Branca',
          data_ingresso: '2023-01-05',
          user_id: 1
        }
      ]
    }).as('buscarAlunos');
    
    cy.visit('/students');
    cy.wait('@buscarAlunos');
  });

  it('deve exibir a lista de alunos corretamente', () => {
    cy.contains('Alunos').should('be.visible');
    cy.contains('João Silva').should('be.visible');
    cy.contains('Maria Oliveira').should('be.visible');
    cy.contains('Azul').should('be.visible');
    cy.contains('Branca').should('be.visible');
  });
});