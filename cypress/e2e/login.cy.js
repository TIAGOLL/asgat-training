describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Autenticação', { timeout: 10000 }).should('be.visible');
  });

  it('deve exibir a página de login corretamente', () => {
    cy.get('img[alt="Logo Asgat"]').should('be.visible');
    cy.contains('Autenticação').should('be.visible');
    cy.contains('Insira seu e-mail e senha abaixo para fazer login em sua conta').should('be.visible');
    
    cy.get('input[name="email"], input[placeholder*="e-mail"], input[placeholder*="admin@admin.com"]').should('be.visible');
    cy.get('input[name="password"], input[placeholder*="123456"]').should('be.visible');
    cy.get('button').contains('Logar').should('be.visible');
    cy.contains('Não possuo conta').should('be.visible');
  });

  it('deve fazer login com credenciais válidas usando mock', () => {
    cy.intercept('POST', '**/loginToken', {
      statusCode: 200,
      body: 'cypress-test-token-1234567890'
    }).as('loginRequest');
    
    cy.get('input[name="email"]').clear().type('admin@admin.com');
    cy.get('input[name="password"]').clear().type('123456');
    
    cy.get('button').contains('Logar').click();
    
    cy.wait('@loginRequest');
    
    cy.window().its('localStorage').invoke('getItem', 'token')
      .should('eq', 'cypress-test-token-1234567890');
    
    cy.url({ timeout: 10000 }).should('include', '/classes');
  });

  it('deve exibir erro com credenciais inválidas', () => {
    cy.get('input[name="email"], input[placeholder*="e-mail"], input[placeholder*="admin@admin.com"]')
      .should('be.visible')
    
    cy.get('input[name="password"], input[placeholder*="123456"]')
      .should('be.visible')
      .type('senhaerrada');
    
    cy.get('button').contains('Logar').click();
    
    cy.contains('Senha ou usuários incorretos', { timeout: 10000 }).should('be.visible');
    
    cy.url().should('not.include', '/classes');
  });

  it('deve navegar para página de cadastro ao clicar em "Não possuo conta"', () => {
    cy.contains('Não possuo conta').click();
    cy.url().should('include', '/auth/sign-up');
  });

  it('deve navegar para página de recuperação de senha ao clicar em "Esqueci minha senha"', () => {
    cy.contains('Esqueci minha senha').click();
    cy.url().should('include', '/auth/forgot-password');
  });
});