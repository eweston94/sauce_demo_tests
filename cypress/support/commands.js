// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const elements = {
    login_logo: '[class="login_logo"]',
    username_field: '[data-test="username"]',
    password_field: '[data-test="password"]',
    login_button: '[data-test="login-button"]',
    add_backpack_to_cart: '[data-test="add-to-cart-sauce-labs-backpack"]',
    add_bike_light_to_cart: '[data-test="add-to-cart-sauce-labs-bike-light"]',
    add_tshirt_to_cart: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    add_fleece_to_cart: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
    add_onesie_to_cart: '[data-test="add-to-cart-sauce-labs-onesie"]',
    add_red_tshirt_to_cart: '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    view_cart_button: '[class="shopping_cart_link"]',
    invetory_item: '[class="inventory_item_name"]',
    first_name_field: '[data-test="firstName"]',
    last_name_field: '[data-test="lastName"]',
    postcode_field: '[data-test="postalCode"]',
    summary_values: '[class="summary_value_label"]',
    subtotal: '[class="summary_subtotal_label"]',
    tax_total: '[class="summary_tax_label"]',
    total_to_pay: '[class="summary_info_label summary_total_label"]'
};

Cypress.Commands.add('login', (username, password) => {
    cy.get(elements.username_field).type(username),
    cy.get(elements.password_field).type(password),
    cy.get(elements.login_button).click()
});

Cypress.Commands.add('addAllItemsToCart', () => {
    cy.get(elements.add_backpack_to_cart).click(),
    cy.get(elements.add_bike_light_to_cart).click(),
    cy.get(elements.add_fleece_to_cart).click(),
    cy.get(elements.add_onesie_to_cart).click(),
    cy.get(elements.add_red_tshirt_to_cart).click(),
    cy.get(elements.add_tshirt_to_cart).click()
});

Cypress.Commands.add('addItem', (item_name) => {
    cy.get(`[data-test="add-to-cart-sauce-labs-${item_name}"]`).click()
});

Cypress.Commands.add('checkAllItemsInCart', () => {
    cy.get(elements.invetory_item).eq(0).should('contain.text', 'Sauce Labs Backpack'),
    cy.get(elements.invetory_item).eq(1).should('contain.text', 'Sauce Labs Bike Light'),
    cy.get(elements.invetory_item).eq(2).should('contain.text', 'Sauce Labs Fleece Jacket'),
    cy.get(elements.invetory_item).eq(3).should('contain.text', 'Sauce Labs Onesie'),
    cy.get(elements.invetory_item).eq(4).should('contain.text', 'Test.allTheThings() T-Shirt (Red)'),
    cy.get(elements.invetory_item).eq(5).should('contain.text', 'Sauce Labs Bolt T-Shirt')
});

Cypress.Commands.add('checkItemInCart', (item_name) => {
    cy.get(elements.invetory_item).should('contain.text', item_name)
});

Cypress.Commands.add('enterPostalDetails', (first_name, last_name, postcode) => {
    cy.get(elements.first_name_field).type(first_name),
    cy.get(elements.last_name_field).type(last_name),
    cy.get(elements.postcode_field).type(postcode)
});

Cypress.Commands.add('checkOrderSummary', (card_details, shipping_method, subtotal, tax, total ) => {
    cy.get(elements.summary_values).eq(0).should('contain.text', card_details),
    cy.get(elements.summary_values).eq(1).should('contain.text', shipping_method),
    cy.get(elements.subtotal).should('contain.text', subtotal),
    cy.get(elements.tax_total).should('contain.text', tax),
    cy.get(elements.total_to_pay).should('contain.text', total)
});

