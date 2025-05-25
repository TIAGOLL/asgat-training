describe('Gerenciamento de Treinos', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'cypress-test-token-1234567890');
    });

    cy.intercept('GET', '**/buscarTreinos', {
      statusCode: 200,
      body: [
        {
          id: 1,
          tipo: 'resistencia',
          user_id: 1,
          exercicios: [
            { id: 1, nome: 'Flexão', treino_id: 1 },
            { id: 2, nome: 'Abdominal', treino_id: 1 }
          ]
        },
        {
          id: 2,
          tipo: 'forca',
          user_id: 1,
          exercicios: [
            { id: 3, nome: 'Agachamento', treino_id: 2 },
            { id: 4, nome: 'Supino', treino_id: 2 }
          ]
        }
      ]
    }).as('buscarTreinos');
    
    cy.visit('/trainings');
    cy.wait('@buscarTreinos');
  });

  it('deve exibir a lista de treinos', () => {
    cy.contains('Treinos').should('be.visible');
    cy.contains('resistencia').should('be.visible');
    cy.contains('forca').should('be.visible');
  });

  it('deve navegar para a criação de novo treino', () => {
    cy.get('button').contains('Treinos').click();
    cy.contains('Cadastrar treino').click();
    cy.url().should('include', '/trainings/create');
  });

  it('deve criar um novo treino com sucesso', () => {
    cy.intercept('POST', '**/criarTreino', {
      statusCode: 200,
      body: 'Treino Criado'
    }).as('criarTreino');

    cy.get('button').contains('Treinos').click();
    cy.contains('Cadastrar treino').click();
    
    cy.get('label').contains('Tipo de treino').parent().find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains('Treino de controle').click();
    
    cy.get('input[placeholder="Flexões - 10 repetições"]').type('Kata');
    cy.contains('button', 'Adicionar').click();
    
    cy.get('input[placeholder="Flexões - 10 repetições"]').type('Postura');
    cy.contains('button', 'Adicionar').click();
    
    cy.contains('Kata').should('be.visible');
    cy.contains('Postura').should('be.visible');
    
    cy.contains('button', 'Salvar').click();
    
    cy.wait('@criarTreino');
    
    cy.url().should('include', '/trainings');
  });
});