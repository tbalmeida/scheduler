describe('Interviews', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Monday');
  });

  it('User can create an appointment', () => {
    cy.get('[alt="Add"]')
    .first()
    .click();

    cy.get('[data-testid=student-name-input]')
    .type('John Doe') ;
    
    cy.get('.interviewers__item-image')
    .first()
    .click();

    cy.get('.interviewers__item--selected')
    .should('exist');

    cy.get('[alt="Add"]')
    .first()
    .click();

    // cy.get('')
    // save the data
    // cy.get('.button--confirm')
  });
});
