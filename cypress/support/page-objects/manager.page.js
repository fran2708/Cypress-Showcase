class Manager {
    get addCustomerBtn() {
        return cy.get('[ng-class=btnClass1]')
    }

    get openAccountBtn() {
        return cy.get('[ng-class=btnClass2]')
    }

    get customersBtn() {
        return cy.get('[ng-class=btnClass3]')
    }

    get firstNameField () {
        return cy.get('[placeholder="First Name"]')
    }

    get lastNameField () {
        return cy.get('[placeholder="Last Name"]')
    }

    get postCodeField () {
        return cy.get('[placeholder="Post Code"]')
    }

    get submitBtn () {
        return cy.get('button[type=submit]')
    }

    get customerSelector () {
        return cy.get('#userSelect')
    }

    get currencySelector () {
        return cy.get('#currency')
    }

    get searchCustomerField () {
        return cy.get('[placeholder="Search Customer"]')
    }

    /**
     * Retrieves the first name from a table row at the specified index.
     * @param {number} index  - The index of the table row
     * @returns {Chainer} - A Cypress chainer representing the first name element. 
     */
    firstNameTable (index) {
        return cy.get('tbody > tr').eq(index).find('td').eq(0)
    }
    
    /**
     * Retrieves the last name from a table row at the specified index.
     *
     * @param {number} index - The index of the table row.
     * @return {Chainer} - A Cypress chainer representing the last name element.
     */
    lastNameTable (index) {
        return cy.get('tbody > tr').eq(index).find('td').eq(1)
    }
    
    /**
     * Retrieves the post code from a table row at the specified index.
     *
     * @param {number} index - The index of the table row.
     * @return {Chainer} - A Cypress chainer representing the post code element.
     */
    postCodeTable (index) {
        return cy.get('tbody > tr').eq(index).find('td').eq(2)
    }
    
    /**
     * Retrieves the account number from a table row at the specified index.
     *
     * @param {number} index - The index of the table row.
     * @return {Chainer} - A Cypress chainer representing the account number element.
     */
    accNumberTable (index) {
        return cy.get('tbody > tr').eq(index).find('td').eq(3)
    }
    
    /**
     * Button to delete a customer.
     *
     * @param {number} index - The index of the customer button.
     * @return {Object} - The Cypress object representing the button.
     */
    deleceCustomerBtn (index) {
        return cy.get('tbody > tr').eq(index).find('button')
    }

    addCustomer (firstName, lastName, postCode) {
        this.firstNameField.type(firstName)
        this.lastNameField.type(lastName)
        this.postCodeField.type(postCode)
        this.submitBtn.click()
    }
}

export default Manager