describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });

  it('front page can be opened', () => {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki'
    );
  });

  it('login form can be opened', () => {
    cy.contains('Log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();

    cy.contains('Matti Luukkainen logged in');
  });

  it('login fails with wrong password', () => {
    cy.contains('Log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.contains('Wrong Credentials');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('a new note can be created', () => {
      cy.contains('New Note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'another note cypress', important: true });
      });

      it('it can be made not important', () => {
        cy.contains('another note cypress')
          .contains('Make not Important')
          .click();

        cy.contains('another note cypress').contains('Make Important');
      });
    });
  });
});
