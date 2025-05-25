describe('Criação de Aluno', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'cypress-test-token-1234567890');
    });
    
    cy.visit('/students/create');
  });

  it('deve exibir o formulário de cadastro de aluno', () => {
    cy.contains('Cadastrar alunos').should('be.visible');
    cy.get('label').contains('Nome completo').next('input').should('be.visible');
    cy.get('label').contains('Data de nascimento').next('input').should('be.visible');
    cy.get('label').contains('Contato').next('input').should('be.visible');
    cy.get('label').contains('Faixa').parent().find('button').should('be.visible');
    cy.get('label').contains('Data de entrada').next('input').should('be.visible');
    cy.get('button').contains('Salvar').should('be.visible');
  });

  it('deve cadastrar um aluno com sucesso', () => {
    cy.intercept('POST', '**/criarAlunos', {
      statusCode: 200,
      body: { message: 'Aluno Cadastrado' }
    }).as('criarAluno');

    cy.get('label').contains('Nome completo').next('input').type('Pedro Santos');
    cy.get('label').contains('Data de nascimento').next('input').type('1995-10-20');
    cy.get('label').contains('Contato').next('input').type('42996685421');
    
    cy.get('label').contains('Faixa').parent().find('button[role="combobox"]').click();
    cy.get('[role="option"]').contains('Branca').click();
    
    cy.get('label').contains('Data de entrada').next('input').type('2023-05-15');

    cy.get('button').contains('Salvar').click();
    
    cy.wait('@criarAluno');
    
    cy.url({ timeout: 15000 }).should('include', '/students');
  });
});