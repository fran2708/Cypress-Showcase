///<reference types="cypress" />
import Customer from '../support/page-objects/customer.page'

describe('customer tests', () => {
    const customer = new Customer()

    beforeEach(() => {
        customer.login('Hermoine Granger')
    })

    it('should deposit', () => {
        customer.balance.invoke('text').then(balanceText => {
            const balance = parseFloat(balanceText)

            customer.depositButton.click()
            customer.inputField.type('100')
            customer.submitButton.click()

            cy.get('[ng-show=message]').should('have.text', 'Deposit Successful')
            customer.balance.invoke('text').then(updatedBalanceText => {
                const updatedBalance = parseFloat(updatedBalanceText)
                expect(updatedBalance).to.eq(balance + 100)
            }) 
        })
    })

    it('should withdraw', () => {
        customer.balance.invoke('text').then(balanceText => {
            const balance = parseFloat(balanceText)

            customer.withdrawButton.click()
            customer.inputField.type('100')
            customer.submitButton.click()

            cy.get('[ng-show=message]').should('have.text', 'Transaction successful')
            customer.balance.invoke('text').then(updatedBalanceText => {
                const updatedBalance = parseFloat(updatedBalanceText)
                expect(updatedBalance).to.eq(balance - 100)
            }) 
        })
    })

    it('should show filtered transactions', () => {
        const now = new Date(2050, 10, 10).getTime()
        cy.clock(now)

        // if the app used an API to handle transactions, I would use that to load a couple and search for those
        customer.depositButton.click()
        customer.inputField.type('100')
        customer.submitButton.click()
        
        cy.reload()
        
        customer.withdrawButton.click()
        customer.inputField.type('100')
        customer.submitButton.click()

        customer.transactionsButton.click()
        cy.get('input#start').type('2050-10-10T12:00')
        
        customer.transactionAmount(0).should('have.text', '100')
        customer.transactionType(0).should('have.text', 'Credit')
        customer.transactionAmount(1).should('have.text', '100')
        customer.transactionType(1).should('have.text', 'Debit')
    })

    it('should change account', () => {
        customer.accountSelector.select('1001')
        customer.accountNumber.should('have.text', '1001 ')

        customer.accountSelector.select('1002')
        customer.accountNumber.should('have.text', '1002 ')
        
        customer.accountSelector.select('1003')
        customer.accountNumber.should('have.text', '1003 ')
    })
    
    it('should logout', () => {
        customer.logoutButton.click()
        cy.get('#userSelect').should('be.visible')
    })
})