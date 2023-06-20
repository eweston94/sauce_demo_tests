describe('Login page tests', () => {
  
const elements = {
    login_logo: '[class="login_logo"]',
    username_field: '[data-test="username"]',
    password_field: '[data-test="password"]',
    login_button: '[data-test="login-button"]',
    usernames: '[id="login_credentials"]',
    password: '[class="login_password"]',
    login_error: '[data-test="error"]',
    close_error: '[class="error-button"]'
};

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });

    it('Successful login', () => {
        cy.login('standard_user','secret_sauce')
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    });

    it('Locked out login', () => {
        cy.login('locked_out_user', 'secret_sauce')
        cy.get(elements.login_error).should('be.visible'),
        cy.get(elements.login_error).should('contain.text', 'Epic sadface: Sorry, this user has been locked out.'),
        cy.get(elements.close_error).click(),
        cy.get(elements.login_error).should('not.exist')
    });
});