/// <reference types="cypress" />
import 'cypress-map';

import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import inventoryItems from '../fixtures/inventoryItemsFixture.json';

const user = Cypress.env('users').standard;
chai.use(require('chai-sorted'));
let ids = inventoryItems.map((item) => item.id);

describe('Delete items from Cart', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    LoginPage.loginSession(user.username, user.password);
    window.localStorage.setItem('cart-contents', JSON.stringify(ids));
    cy.visit('/inventory.html');
  });

  it.only('Delete items from cart', () => {
    const item = inventoryItems[1];
    const secondItem = inventoryItems[2];
    window.localStorage.setItem('cart-contents', JSON.stringify(ids));
    cy.visit('/inventory.html');

    InventoryPage.getShoppingCartBadge().should('contain', ids.length);

    InventoryPage.getItemDescriptionBy(item.name).find(InventoryPage.remove_item_locator).should('have.text', 'Remove').click();

    InventoryPage.getShoppingCartBadge().should('contain', ids.length - 1);

    InventoryPage.getItemDescriptionBy(item.name).find(InventoryPage.add_item_locator).should('have.text', 'Add to cart');

    //second item
    InventoryPage.getItemDescriptionBy(secondItem.name)
      .find(InventoryPage.add_second_item_locator)
      .should('have.text', 'Remove')
      .click();

    InventoryPage.getShoppingCartBadge().should('contain', ids.length - 2);

    InventoryPage.getItemDescriptionBy(secondItem.name).find('.btn.btn_primary.btn_small.btn_inventory').should('have.text', 'Add to cart');
  });
});
