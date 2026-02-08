/// <reference types="cypress" />
import 'cypress-map';

import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import inventoryItems from '../fixtures/inventoryItemsFixture.json';
import { CartPage } from '../pages/cart.page';

const user = Cypress.env('users').standard;
chai.use(require('chai-sorted'));
const item = inventoryItems[1];
const secondItem = inventoryItems[2];
const ids = [item.id, secondItem.id];

describe('Add items to Cart', { viewportHeight: 1200 }, () => {
  beforeEach(() => {
    LoginPage.loginSession(user.username, user.password);
    cy.visit('/inventory.html');
  });

  it('Add item to shopping cart', () => {
    InventoryPage.getShoppingCartBadge().should('not.exist');

    //firstItem
    InventoryPage.addItemByName(item.name);
    InventoryPage.getShoppingCartBadge().should('contain', 1);
    InventoryPage.getItemDescriptionBy(item.name).find(InventoryPage.remove_item_locator).should('have.text', 'Remove');

    //secondItem
    InventoryPage.addItemByName(secondItem.name);
    InventoryPage.getItemDescriptionBy(secondItem.name).find(InventoryPage.remove_second_item_locator).should('have.text', 'Remove');
    InventoryPage.getShoppingCartBadge().should('contain', 2);
  });

  it('Check items from shopping cart', () => {
    window.localStorage.setItem('cart-contents', JSON.stringify(ids));
    cy.visit('/inventory.html');
    InventoryPage.getShoppingCart();
    cy.location('pathname').should('equal', '/cart.html');
    CartPage.getItems().should('have.length', 2);
    CartPage.getItems()
      .eq(0)
      .within(() => {
        cy.contains(InventoryPage.inventory_item_description, item.desc);
        cy.contains(InventoryPage.inventory_item_name, item.name);
        cy.contains(InventoryPage.inventory_item_price, item.price);
        cy.get('.btn.btn_secondary.btn_small.cart_button');
        cy.contains('.cart_quantity', 1);
      });

    CartPage.getItems()
      .eq(1)
      .within(() => {
        cy.contains('.inventory_item_desc', secondItem.desc);
        cy.contains('.inventory_item_name', secondItem.name);
        cy.contains('.inventory_item_price', secondItem.price);
        cy.contains('.cart_quantity', 1);
        cy.get('.btn.btn_secondary.btn_small.cart_button').should('have.text', 'Remove');
      });
  });

  it.skip('Delete items from cart', () => {
    window.localStorage.setItem('cart-contents', JSON.stringify(ids));
    cy.visit('/inventory.html');

    InventoryPage.getShoppingCartBadge().should('contain', ids.length);

    InventoryPage.getItemDescriptionBy(item.name).find('#remove-sauce-labs-bolt-t-shirt').should('have.text', 'Remove').click();

    InventoryPage.getShoppingCartBadge().should('contain', ids.length - 1);

    InventoryPage.getItemDescriptionBy(item.name).find('.btn.btn_primary.btn_small.btn_inventory').should('have.text', 'Add to cart');

    //second item
    InventoryPage.getItemDescriptionBy(secondItem.name)
      .find('.btn.btn_secondary.btn_small.btn_inventory')
      .should('have.text', 'Remove')
      .click();

    InventoryPage.getShoppingCartBadge().should('contain', ids.length - 2);

    InventoryPage.getItemDescriptionBy(secondItem.name).find('.btn.btn_primary.btn_small.btn_inventory').should('have.text', 'Add to cart');
  });
});
