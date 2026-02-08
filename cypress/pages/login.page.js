/// <reference types="cypress" />
export const LoginPage = {
  getUsername() {
    return cy.get('[data-test="username"]');
  },
  getPassword() {
    return cy.get('[data-test="password"]');
  },

  getLogin() {
    return cy.get('[data-test=login-button]');
  },

  getError() {
    return cy.get('[data-test="error"]');
  },
  
  loginWith(username, password) {
    LoginPage.getUsername().type(username);
    LoginPage.getPassword().type(password);
    LoginPage.getLogin().click();
  },

  loginSession(username, password) {
    cy.session(
      `user ${username} login`,
      () => {
        cy.log('**log in**');
        cy.visit('/');
        LoginPage.loginWith(username, password);
        cy.location('pathname').should('equal', '/inventory.html');
      },
      {
        validate() {
          cy.visit('/inventory.html');
          cy.location('pathname').should('equal', '/inventory.html');
        },
      },
    );
  },

  loginWithNoUsername(password) {
    LoginPage.getPassword().type(password);
    LoginPage.getLogin().click();
  },
  loginWithNoPassword(username) {
    LoginPage.getUsername().type(username);
    LoginPage.getLogin().click();
  },
};
