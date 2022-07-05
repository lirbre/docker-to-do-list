    Cypress.Commands.add('createtodo', (priority) => {
        cy
        .get('input[name=title]')
        .type('a to do title')
        .get('select[name=priority]')
        .select(priority)
        .get('[data-cy="todoform"]')
        .submit() 
        .get(`.priority-${priority}`)
    })

    Cypress.Commands.add('completetodo', () => {
        cy
        .get('[data-cy="todoitem"]')
        .click({ multiple: true })
        .should('have.css', 'opacity')
        .and('match', /0.5/)
        .get('[data-cy="complete-btn"]')
        .click({ multiple: true })
        .should('have.css', 'opacity')
        .and('match', /1/)
    })
    
    Cypress.Commands.add('deletetodo', () => {
        cy
        .get('[data-cy="delete-btn"]')
        .click({ multiple: true })
    })

    Cypress.Commands.add('counttodo', (expected) => {
        if (!expected) {
            cy
            .get('[data-cy="todoitem"]')
            .should('not.exist')
        } else {
            cy
        .get('[data-cy="todocontainer"]')
        .find('[data-cy="todoitem"]')
        .then(todo => {
            expect(todo).to.have.length(expected);
        })
        }
    })