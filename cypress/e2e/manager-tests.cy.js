///<reference types="cypress" />
import Manager from '../support/page-objects/manager.page'

describe('manager tests', () => {
    const manager = new Manager()

    beforeEach(() => {
        cy.visit('/manager')
    })

    it('should add customer', () => {
        manager.addCustomerBtn.click()
        manager.addCustomer('Fran', 'P', 1234)

        cy.on('window:alert', (msg) => {
            expect(msg).to.contains('Customer added successfully')
        })

        manager.customersBtn.click()
        manager.searchCustomerField.type('Fran')
        manager.firstNameTable(0).should('have.text', 'Fran')
        manager.lastNameTable(0).should('have.text', 'P')
        manager.postCodeTable(0).should('have.text', '1234')
    })
    
    it('should open account', () => {
        // ideally, I would create a new customer through an API request, to completely isolate the test
        manager.openAccountBtn.click()
        manager.customerSelector.select('Hermoine Granger')
        manager.currencySelector.select('Dollar')
        manager.submitBtn.click()

        cy.on('window:alert', (txt) => {
            expect(txt).to.be.a('string')
            expect(txt).to.contains('Account created successfully')

            const alertText = txt
            const splitText = alertText.split(':').pop()

            manager.customersBtn.click()
            manager.searchCustomerField.type(splitText)
            manager.accNumberTable(0).should('include.text', splitText)
        });
    })

    it('should delete customer', () => {
        manager.addCustomerBtn.click()
        manager.addCustomer('Delete', 'Customer', 1234)

        manager.customersBtn.click()
        manager.searchCustomerField.type('Delete')
        manager.deleceCustomerBtn(0).click()
        manager.searchCustomerField.clear()
        cy.get('tbody')
            .find('tr')
            .then((row) => {
                for (let index = 0; index < row.length; index++) {
                    manager.firstNameTable(index).should('not.have.text', 'Delete')
                }
            })
    })

    it('should sort by first name', () => {
        let storedText = []

        manager.customersBtn.click()
        cy.get(':nth-child(1) > a').click().click()
        cy.get('tbody tr td:nth-child(1)')
            .each(($el) => {
                storedText.push($el.text())
            })
            .then(() => {
                const sorted = Cypress._.sortBy(storedText)
        
                expect(storedText, 'correctly sorted').to.deep.equal(sorted)
            })
    })

    it('should sort by last name', () => {
        let storedText = []

        manager.customersBtn.click()
        cy.get(':nth-child(2) > a').click().click()
        cy.get('tbody tr td:nth-child(2)')
            .each(($el) => {
                storedText.push($el.text())
            })
            .then(() => {
                const sorted = Cypress._.sortBy(storedText)
        
                expect(storedText, 'correctly sorted').to.deep.equal(sorted)
            })
    })

    it('should sort by post code', () => {
        let storedText = []

        manager.customersBtn.click()
        cy.get(':nth-child(3) > a').click().click()
        cy.get('tbody tr td:nth-child(3)')
            .each(($el) => {
                storedText.push($el.text())
            })
            .then(() => {
                const sorted = Cypress._.sortBy(storedText)
        
                expect(storedText, 'correctly sorted').to.deep.equal(sorted)
            })
    })
})