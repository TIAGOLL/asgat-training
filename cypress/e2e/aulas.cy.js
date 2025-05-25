describe('Gerenciamento de Aulas', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'cypress-test-token-1234567890');
    });

    cy.intercept('GET', '**/buscarAulas*', {
      statusCode: 200,
      body: [
        {
          id: 1,
          dia: '2023-06-10',
          hora: '19:00',
          nome: 'Turma Iniciantes',
          horario: 'Segunda e Quarta 19:00',
          treino_id: 1,
          turma_id: 1,
          user_id: 1
        },
        {
          id: 2,
          dia: '2023-06-12',
          hora: '20:00',
          nome: 'Turma Avançada',
          horario: 'Terça e Quinta 20:00',
          treino_id: 2,
          turma_id: 2,
          user_id: 1
        }
      ]
    }).as('buscarAulas');
    
    cy.visit('/classes');
    cy.wait('@buscarAulas');
  });

  it('deve exibir a lista de aulas', () => {
    cy.contains('Aulas').should('be.visible');
    cy.contains('Turma Iniciantes').should('be.visible');
    cy.contains('Turma Avançada').should('be.visible');
  });

  it('deve navegar para a página de criação de nova aula', () => {
    cy.intercept('GET', '**/buscarTreinos', {
      statusCode: 200,
      body: [{ id: 1, tipo: 'resistencia' }, { id: 2, tipo: 'forca' }]
    }).as('buscarTreinos');
    
    cy.intercept('GET', '**/buscarTurmas', {
      statusCode: 200,
      body: [{ id: 1, nome: 'Turma Iniciantes' }, { id: 2, nome: 'Turma Avançada' }]
    }).as('buscarTurmas');
    
    cy.get('button').contains('Aulas').click();
    cy.contains('Cadastrar aulas').click();
    
    cy.url().should('include', '/classes/create');
    cy.contains('Cadastrar aulas').should('be.visible');
  });
  
  it('deve cadastrar uma nova aula com sucesso', () => {
    cy.intercept('GET', '**/buscarTreinos', {
      statusCode: 200,
      body: [
        { id: 1, tipo: 'resistencia' }, 
        { id: 2, tipo: 'forca' }
      ]
    }).as('buscarTreinos');
    
    cy.intercept('GET', '**/buscarTurmas', {
      statusCode: 200,
      body: [
        { id: 1, nome: 'Turma Iniciantes' }, 
        { id: 2, nome: 'Turma Avançada' }
      ]
    }).as('buscarTurmas');
    
    cy.intercept('POST', '**/criarAula', {
      statusCode: 200,
      body: { message: 'Aula criada!' }
    }).as('criarAula');
    
    cy.get('button').contains('Aulas').click();
    cy.contains('Cadastrar aulas').click();
    
    cy.wait('@buscarTreinos');
    cy.wait('@buscarTurmas');
    
    cy.get('label').contains('Turma').parent().find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains('Turma Avançada').click();
    
    cy.get('label').contains('Treino').parent().find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains('resistencia').click();

    cy.get('input[id="date"]').type('2023-12-15');
    
    cy.get('input[id="time"]').type('20:30');
    
    cy.get('button[type="submit"]').contains('Salvar').click();
    
    cy.wait('@criarAula');
    
    cy.url({ timeout: 10000 }).should('include', '/classes');
    cy.contains('Aula criada!', { timeout: 10000 }).should('be.visible');
  });
});