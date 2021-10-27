/// <reference types="cypress" />
import FilterPage from "../../support/PageObjects/filterpage"
import MenuPage from "../../support/PageObjects/menupage"
const menupage = new MenuPage()
const filterpage = new FilterPage()

describe('Actions', () => {
    beforeEach(() => {
      cy.visit('https://www.mymusclechef.com/menu/')
      cy.wait(2000)
    })
    it('check the user can not add to cart unless he adds the minimum amount of 99$, by checking the button is disabled', () => {

      var productIds = ['CH047', 'VN025', 'BE027', 'SF013', 'BE007', 'BE009', 'CH023', 'BE005', 'CH010', 'CH018']
          
      cy.wrap(productIds).each((id, i, array) => {
          menupage.getProductList().find('#add-btn-' + id).find('.pt__stepper.icon-24-plus-white')
              .click()
          if (i == 9) {
              menupage.getAddToCartButton().find('#plp-amount').invoke('text').then((text1) => {
                  cy.wrap(parseFloat(text1)).should('be.gte', 99)
                  menupage.getButtonPriceText().should('not.be.hidden')
              })

          } else {
             menupage.getAddToCartButton().find('.plp__amt-diff').invoke('text').then((text2) => {
                  cy.wrap(parseFloat(text2)).should('be.lt', 99)
                  menupage.getButtonPriceText().should('be.hidden')
              })
          }

      })


  })

  it('check the number of items in the "Add to Cart" button is correct', () => {
    
      menupage.getMealIdCH023().find('.pt__stepper.icon-24-plus-white.p-2.items-center').click()
      menupage.getMealIdVN025().find('.pt__stepper.icon-24-plus-white.p-2.items-center').click()
      menupage.getNumberOfItemsInCart().should('have.text', '2')
      menupage.getMealCountInProgressBar().should('have.text', '2')


  })

  it('check if the price is correct in the "Add to Cart" button', () =>

      {

          var price1 = 0.0,
              price2 = 0.0

          menupage.getMealIdCH023().find('.price__discount.discount__0').invoke('text').then((text1) => {
              price1 = parseFloat(text1.substring(1))
              cy.log(price1)

          })
          menupage.getProductList().find('#add-btn-CH023').find('.pt__stepper.icon-24-plus-white')
            .click()
          menupage.getMealIdVN025().find('.price__discount.discount__0').invoke('text').then((text2) => {
              price2 = parseFloat(text2.substring(1))

          })
          menupage.getProductList().find('#add-btn-VN025').find('.pt__stepper.icon-24-plus-white')
            .click()
          menupage.getAddToCartButton().find('.plp__amt-diff').invoke('text').then((text3) => {
              expect(price1 + price2).to.equal(parseFloat(text3))

          })




      })

    it('check if the data in the progress bar is correct, for example when we add 7 meals, one snack and one drink', () => {

        var productIds = ['CH047', 'SB020', 'BE027', 'SB006', 'BE007', 'BE009', 'SB016', 'BE005', 'CH010', 'CH018']
        cy.wrap(productIds).each((id, i, array) => {
            menupage.getProductList().find('#add-btn-' + id).find('.pt__stepper.icon-24-plus-white').first()
              .click()
      })
      menupage.getMealCountInProgressBar().should('have.text', '7')
      menupage.getSnacksCountInProgressBar().should('have.text', '13')
      menupage.getDrinksCountInProgressBar().should('have.text', '2')

  })

  it('check the filter "protein type" for example we should get two meals when we filter by protein type "Seafood"', () => {

      cy.wait(2000)
      filterpage.getFilterButton().click()
      cy.wait(2000)
      filterpage.getMealsButton().click()
      cy.wait(2000)
      cy.get('#proteinType').click()
      cy.wait(2000)
      filterpage.getProteinType().eq(3).click()
      cy.wait(2000)
      cy.get('#menu-builder-product-grid').find('.pt-6').find('.product-tile.w-full.mb-4').should('have.length', 2)

  })
})