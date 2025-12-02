/// <reference types="cypress" />
import { LoginPage } from '../pages/login.page';
import loginFixture from '../fixtures/loginFixture.json';
const user = Cypress.env('users').standard;

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('SHOULD show the home page WHEN valid credentials', () => {
    LoginPage.loginWith(user.username, user.password);
    cy.location('pathname').should('equal', '/inventory.html');
  });

  it('SHOULD show erros WHEN invalid username', () => {
    LoginPage.loginWith(user.username + 1, user.password);
    cy.location('pathname').should('equal', '/');
    LoginPage.getError().should('be.visible').contains(loginFixture.errorMessage);
  });

  it('SHOULD show erros WHEN invalid password', () => {
    LoginPage.loginWith(user.username, user.password + 1);
    cy.location('pathname').should('equal', '/');
    LoginPage.getError().should('be.visible').contains(loginFixture.errorMessage);
  });

  it('SHOULD show erros WHEN no username', () => {
    LoginPage.loginWithNoUsername(user.password);
    cy.location('pathname').should('equal', '/');
    LoginPage.getError().should('be.visible').contains(loginFixture.errorMessageNoUsername);
  });

  it('SHOULD show erros WHEN no password', () => {
    LoginPage.loginWithNoPassword(user.username);
    cy.location('pathname').should('equal', '/');
    LoginPage.getError().should('be.visible').contains(loginFixture.errorMessageNoPassword);
  });
});
