Cypress.Commands.add("createtodo", (priority) => {
  cy.get("input[name=title]")
    .type("a to do title")
    .get("select[name=priority]")
    .select(priority)
    .get('[data-cy="todoform"]')
    .submit()
    .get(`.priority-${priority}`);
});

Cypress.Commands.add("completetodos", () => {
  cy.get('[data-cy="todo-item"]')
    .click({ multiple: true })
    .should("have.css", "opacity")
    .and("match", /0.5/);
});

Cypress.Commands.add("uncompletetodos", () => {
  cy.get('[data-cy="complete-btn"]')
    .click({ multiple: true })
    .should("have.css", "opacity")
    .and("match", /1/);
});

Cypress.Commands.add("deletetodos", () => {
  cy.get('[data-cy="delete-btn"]').click({ multiple: true });
});

Cypress.Commands.add("counttodos", (expected) => {
  if (!expected) {
    cy.get('[data-cy="todo-item"]').should("not.exist");
  } else {
    cy.get('[data-cy="todo-container"]')
      .find('[data-cy="todo-item"]')
      .then((todo) => {
        expect(todo).to.have.length(expected);
      });
  }
});

Cypress.Commands.add("openconfigmodal", () => {
  cy.get('[data-cy="config-btn"]').click().get('[data-cy="modal-container"]');
});

Cypress.Commands.add("openeditmodal", () => {
  cy.get('[data-cy="edit-btn"]').click().get('[data-cy="modal-container"]');
});

Cypress.Commands.add("closemodal", () => {
  cy.get('[data-cy="modalclose-btn"]')
    .click()
    .get('[data-cy="modal-container"]')
    .should("not.exist");
});
