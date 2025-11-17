export const CartPage = {
    
    getItems(){
        return cy.get('div.cart_item')
    },
    getItemByName(itemName){
        return cy.contains('div.cart_item',itemName)
    }
}