export const CheckoutPage = {
    getFilter() {
      return cy.get('[data-test="product_sort_container"]');
    },

    checkoutButton(){
      return cy.get('[data-test="checkout"]')
    }
  

  };
  