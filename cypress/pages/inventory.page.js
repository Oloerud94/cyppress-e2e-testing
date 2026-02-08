export const InventoryPage = {
  inventory_item_description: 'inventory_item_desc',
  inventory_item_name: '.inventory_item_name',
  inventory_item_price: '.inventory_item_price',
  remove_item_locator: '#remove-sauce-labs-bolt-t-shirt',
  add_item_locator: '.btn.btn_primary.btn_small.btn_inventory',
  add_second_item_locator: '.btn.btn_secondary.btn_small.btn_inventory',

  getFilter() {
    return cy.get('[data-test="product_sort_container"]');
  },

  getItemPrices() {
    return cy.get('div.inventory_item_price');
  },

  getItemsName() {
    return cy.get('div.inventory_item_name');
  },

  getInventoryItems() {
    return cy.get('div.inventory_item');
  },

  sortItemsBy(sortingValue) {
    InventoryPage.getFilter().select(sortingValue);
  },

  getItemDescriptionBy(description) {
    return cy.contains('.inventory_item_description', description);
  },

  getItemByPrice(price) {
    return cy.contains('.inventory_item_price', price);
  },

  getItemByName(name) {
    return cy.contains('.inventory_item_name', name);
  },

  getItemByDescription(desc) {
    return cy.contains('.inventory_item_desc', desc);
  },

  getShoppingCartBadge() {
    return cy.get('.shopping_cart_link').find('.shopping_cart_badge');
  },
  getShoppingCart() {
    return cy.get('a.shopping_cart_link').click();
  },

  addItemByName(itemName) {
    return InventoryPage.getItemDescriptionBy(itemName)
      .find('.btn.btn_primary.btn_small.btn_inventory')
      .should('have.text', 'Add to cart')
      .click();
  },

  shoppingCartButton() {
    return cy.get('#shopping_cart_container');
  },
};
