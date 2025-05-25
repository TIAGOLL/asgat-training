describe('Gerenciamento de Turmas', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'cypress-test-token-1234567890');
    });

    cy.intercept('GET', '**/buscarTurmas', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'Turma Iniciantes',
          local: 'Academia Central',
          horario: 'Segunda e Quarta 19:00',
          dia: 1,
          user_id: 1
        },
        {
          id: 2,
          nome: 'Turma Avançada',
          local: 'Academia Central',
          horario: 'Terça e Quinta 20:00',
          dia: 2,
          user_id: 1
        }
      ]
    }).as('buscarTurmas');
    
    cy.intercept('GET', '**/buscarAlunos', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'João Silva',
          contato: '42999887766',
          faixa: 'Azul'
        },
        {
          id: 2,
          nome: 'Maria Oliveira',
          contato: '42998765432',
          faixa: 'Branca'
        }
      ]
    }).as('buscarAlunos');
    
    cy.visit('/classrooms');
    cy.wait('@buscarTurmas');
  });

  it('deve exibir a lista de turmas', () => {
    cy.contains('Turmas').should('be.visible');
    cy.contains('Turma Iniciantes').should('be.visible');
    cy.contains('Turma Avançada').should('be.visible');
  });

  it('deve navegar para a criação de nova turma', () => {
    cy.get('button').contains('Turmas').click();
    cy.contains('Cadastrar turma').click();
    cy.url().should('include', '/classrooms/create');
  });

  it('deve criar uma nova turma com sucesso', () => {
    cy.intercept('POST', '**/criarTurma', {
      statusCode: 200,
      body: 'Turma Criada'
    }).as('criarTurma');

    cy.get('button').contains('Turmas').click();
    cy.contains('Cadastrar turma').click();
    
    cy.get('label').contains('Nome da turma').next('input').type('Turma Infantil');
    cy.get('label').contains('Local').next('input').type('Academia Filial');
    
    cy.get('button[role="combobox"]').first().click();
    cy.get('[role="option"]').contains('Segunda').click();
    
    cy.get('input[id="time"]').type('14:00');
    
    cy.get('button').contains('Selecione os alunos').click();
    cy.get('[role="option"]').contains('João Silva').click();
    cy.get('body').type('{esc}');
    
    cy.contains('button', 'Salvar').click();
    
    cy.wait('@criarTurma', { timeout: 10000 });
    
    cy.url({ timeout: 15000 }).should('include', '/classrooms');
    cy.contains('Turma Criada', { timeout: 10000 }).should('be.visible');
  });
});