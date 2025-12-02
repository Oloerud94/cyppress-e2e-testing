/// <reference types="cypress" />
import 'cypress-map';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { ItemPage } from '../pages/singleItem.page';
import inventoryItems from '../fixtures/inventoryItemsFixture.json';

const user = Cypress.env('users').standard;
chai.use(require('chai-sorted'));

describe('Inventory', () => {
  beforeEach(() => {
    LoginPage.loginSession(user.username, user.password);
    cy.visit('/inventory.html');
  });

  it('Check that items are displayed', () => {
    InventoryPage.getInventoryItems().should('be.visible').should('have.length.greaterThan', 3);
  });

  it('Check sorting Low -> High', () => {
    InventoryPage.sortItemsBy('lohi');
    InventoryPage.getItemPrices().map('innerText').mapInvoke('slice', 1).map(Number).should('be.sorted', { descending: false });
  });

  it('Check sorting High -> Low', () => {
    InventoryPage.sortItemsBy('hilo');
    InventoryPage.getItemPrices().map('innerText').mapInvoke('slice', 1).map(Number).should('be.sorted', { descending: true });
  });

  it('Check sorting A -> Z ', () => {
    InventoryPage.sortItemsBy('az');
    InventoryPage.getItemsName().map('innerText').should('be.sorted', { descending: false });
  });

  it('Check sorting Z -> A', () => {
    InventoryPage.sortItemsBy('za');
    InventoryPage.getItemsName().map('innerText').should('be.sorted', { descending: true });
  });

  it('Check items descriptions', () => {
    inventoryItems.forEach((item) => {
      InventoryPage.getItemDescriptionBy(item.name).within(() => {
        InventoryPage.getItemByPrice(item.price);
        InventoryPage.getItemByName(item.name);
        InventoryPage.getItemByDescription(item.desc);
      });
    });
  });

  it('Check single item page', () => {
    const item = inventoryItems[1];
    InventoryPage.getItemByName(item.name).click();
    cy.location('pathname').should('equal', '/inventory-item.html');
    ItemPage.getPrice().should('contain', item.price);
    ItemPage.getDesc().should('contain', item.desc);
    ItemPage.backButton();
    cy.location('pathname').should('equal', '/inventory.html');
  });
});
