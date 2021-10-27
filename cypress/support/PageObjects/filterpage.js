class FilterPage{

    getFilterButton(){
        return cy.get('#filterButton > .px-2')
    }
    getMealsButton(){
       return cy.get('[data-value="Meals"]')
    }
    getProteinType(){
        return cy.get('.flex.min-w-16.menubuilder-refinements')
    }
}
export default FilterPage;