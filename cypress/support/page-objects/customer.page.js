class Customer {
    get accountNumber() {
        return cy.get('strong[class=ng-binding]').eq(0)
    }

    get balance() {
        return cy.get('strong[class=ng-binding]').eq(1)
    }

    get transactionsButton() {
        return cy.get('[ng-class=btnClass1]')
    }

    get depositButton() {
        return cy.get('[ng-class=btnClass2]')
    }

    get withdrawButton() {
        return cy.get('[ng-class=btnClass3]')
    }

    get inputField() {
        return cy.get('input[placeholder=amount]')
    }

    get submitButton() {
        return cy.get('button[type=submit]')
    }

    get accountSelector() {
        return cy.get('#accountSelect')
    }

    /**
     * Retrieves the transaction amount from a table row at the specified index.
     *
     * @param {number} index - The index of the table row.
     * @return {Chainer} - A Cypress chainer representing the transaction amount element.
     */
    transactionAmount(index) {
        return cy.get('tbody > tr').eq(index).find('td').eq(1)
    }

    /**
     * Retrieves the transaction type from a table row at the specified index.
     *
     * @param {number} index - The index of the table row.
     * @return {Chainer} - A Cypress chainer representing the transaction type element.
     */
    transactionType(index) {
        return cy.get('tbody > tr').eq(index).find('td').eq(2)
    }

    get logoutButton() {
        return cy.get('.logout')
    }

    /**
     * Logs in a user by visiting the '/customer' page, selecting the user from a dropdown,
     * clicking the submit button, and asserting that the logged in user's name is displayed.
     *
     * @param {string} user - The name of the user to log in as.
     */
    login(user) {
        // cy.session([user], () => {   cant use session in this app because of the way data is loaded
        cy.visit('/customer')
        cy.get('#userSelect').select(`${user}`)
        cy.get('[type=submit]').click()
        cy.get('[class="fontBig ng-binding"]').should('have.text', user)
        // })
    }
}

export default Customer