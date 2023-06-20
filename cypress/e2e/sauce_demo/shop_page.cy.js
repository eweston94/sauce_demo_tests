describe('End to End Shopping Journeys', () => {

    const elements = {
        view_cart_button: '[class="shopping_cart_link"]',
        cart_item_name: '[class="inventory_item_name"]',
        checkout_button: '[data-test="checkout"]',
        continue_button: '[data-test="continue"]',
        finish_button: '[data-test="finish"]',
        checkout_container: '[id="checkout_complete_container"]',
        cancel_button: '[data-test="cancel"]'
    }

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/'),
        cy.login('standard_user', 'secret_sauce'),
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    });

    it('Buy all items end to end Journey', () => {
        cy.addAllItemsToCart(),
        cy.get(elements.view_cart_button).click()
        cy.checkAllItemsInCart(),
        cy.get(elements.checkout_button).click()
        cy.enterPostalDetails('Test', 'Test', 'CV32 7PN'),
        cy.get(elements.continue_button).click(),
        cy.checkOrderSummary('SauceCard #31337', 'Free Pony Express Delivery!', '$129.94', '$10.40', '$140.34')
        cy.get(elements.finish_button).click(),
        cy.get(elements.checkout_container).should('be.visible')
    });

    it('Buy Select Item end to end Journey', () => {
        cy.addItem('backpack'),
        cy.get(elements.view_cart_button).click(),
        cy.checkItemInCart('Backpack'),
        cy.get(elements.checkout_button).click()
        cy.enterPostalDetails('Test', 'Test', 'CV32 7PN'),
        cy.get(elements.continue_button).click(),
        cy.checkOrderSummary('SauceCard #31337', 'Free Pony Express Delivery!', '$29.99', '$2.40', '$32.39')
        cy.get(elements.finish_button).click(),
        cy.get(elements.checkout_container).should('be.visible')
    });

    it('Drop out of order journey', () => {
        cy.addItem('backpack'),
        cy.get(elements.view_cart_button).click(),
        cy.checkItemInCart('Backpack'),
        cy.get(elements.checkout_button).click()
        cy.enterPostalDetails('Test', 'Test', 'CV32 7PN'),
        cy.get(elements.continue_button).click(),
        cy.checkOrderSummary('SauceCard #31337', 'Free Pony Express Delivery!', '$29.99', '$2.40', '$32.39'),
        cy.get(elements.cancel_button).click(),
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    });
});