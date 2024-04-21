Cypress.Commands.add('login', (user) => {
    // cy.session([user], () => {   cant use session in this app because of the way data is loaded
        cy.visit('/customer')
        cy.get('#userSelect').select(`${user}`)
        cy.get('[type=submit]').click()
        cy.get('[class="fontBig ng-binding"]').should('have.text', user)
    // })
})