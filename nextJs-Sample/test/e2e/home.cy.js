describe('Home page', () => {
    it('should navigate to the About page', () => {
      cy.visit('/');
      cy.contains('Go to About').click();
      cy.url().should('include', '/about');
      cy.contains('This is About page');
    });
  });
  