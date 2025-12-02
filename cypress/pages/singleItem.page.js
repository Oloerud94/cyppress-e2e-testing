export const ItemPage = {
  getPrice() {
    return cy.get('div.inventory_details_price');
  },

  getDesc() {
    return cy.get('div.inventory_details_desc.large_size');
  },

  backButton() {
    return cy.get('[data-test="back-to-products"]').click();
  },
};
