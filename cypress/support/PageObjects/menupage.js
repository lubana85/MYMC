class MenuPage{

    getProductList(){
        return cy.get('.products-list')
    }
    getAddToCartButton(){
        return cy.get('#plp-add-btn')
    }
    getButtonPriceText(){
        return cy.get('.plp-add-btn-price-text')
    }
    getMealIdCH023(){
        return cy.get('#CH023')
    }
    getMealIdVN025(){
        return cy.get('#VN025')
    }
    getNumberOfItemsInCart(){
        return cy.get('#mb-total-items')
    }
    getMealCountInProgressBar(){
        return cy.get('#progressBar-meals')
    }
    getSnacksCountInProgressBar(){
        return cy.get('#progressBar-snacks')
    }
    getDrinksCountInProgressBar(){
        return cy.get('#progressBar-drinks')
    }

}
export default MenuPage;