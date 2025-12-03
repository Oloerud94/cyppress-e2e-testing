/// <reference types="cypress" />
import 'cypress-map';

import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import inventoryItems from '../fixtures/inventoryItemsFixture.json';
import { CheckoutPage } from '../pages/checkout.page';

const user = Cypress.env('users').standard;
chai.use(require('chai-sorted'));
let ids = inventoryItems.map((item) => item.id);
let items = inventoryItems.map((item) => item.id);

describe('Checkout process', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    LoginPage.loginSession(user.username, user.password);
    window.localStorage.setItem('cart-contents', JSON.stringify(ids));
    cy.visit('/inventory.html');
  });

  it.only('hello old friend', () => {
    const item = inventoryItems[1];
    window.localStorage.setItem('cart-contents', JSON.stringify(ids));

    InventoryPage.shoppingCartButton().click();

    cy.location('pathname').should('equal', '/cart.html');

    InventoryPage.shoppingCartButton().scrollIntoView().wait(200).should('have.text', items.length);

    console.log('debug turbat', ids);

    inventoryItems.forEach((item, k) => {
      console.log('debug turbat', item);
      console.log('k', k);
      cy.get('.cart_item')
        .eq(k)
        .within(() => {
          cy.get('.inventory_item_name').should('have.text', item.name);
          cy.get('.inventory_item_desc').should('have.text', item.desc);
          cy.get('.item_pricebar').contains(item.price);
        });
    });
    CheckoutPage.checkoutButton().click();
    cy.location('pathname').should('equal', '/checkout-step-one.html');

    cy.get('.checkout_info').within(() => {
      cy.get('#first-name').type('John');
      cy.get('#last-name').type('John');
      cy.get('#postal-code').type('John');
    });

    cy.get('#continue').click();
  });
});
