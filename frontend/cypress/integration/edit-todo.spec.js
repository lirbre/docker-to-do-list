it("should create todos", () => {
  cy.visit("http://localhost:3000");
  cy.window().createtodo(1).counttodos(1);
});

it("should can open edit menu", () => {
  cy.window().openeditmodal();
});

it("should can close edit modal", () => {
  cy.window().closemodal();
});

it("should can cancel editing", () => {
  cy.window().openeditmodal().get('[data-cy="edit-cancel"]').click();
});

it("should only edit to something different", () => {
  cy.window()
    .get('[data-cy="todo-title"]')
    .contains("a to do title")
    .get('.priority-1')
    .counttodos(1)
    .openeditmodal()
    .get('[data-cy="edit-submit"]')
    .click()
    .get('[role="alert"]')
    .get('[data-cy="modal-container"]')
    .should("not.exist")
    .get('[data-cy="todo-title"]')
    .contains("a to do title")
    .get('.priority-1')
    .counttodos(1)
});

it("should can edit it's title and maintain it's priority", () => {
  cy.window()
    .get('[data-cy="todo-title"]')
    .contains("a to do title")
    .get('.priority-1')
    .counttodos(1)
    .openeditmodal()
    .get('[data-cy="edit-title"]')
    .clear()
    .type("a new to do title")
    .get('[data-cy="edit-submit"]')
    .click()
    .get('[data-cy="modal-container"]')
    .should("not.exist")
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-1')
    .counttodos(1);
});

it("should can edit it's priority to high and maintain it's title", () => {
    cy.window()
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-1')
    .counttodos(1)
    .openeditmodal()
    .get('[data-cy="edit-priority"]')
    .select(3)
    .get('[data-cy="edit-submit"]')
    .click()
    .get('[data-cy="modal-container"]')
    .should("not.exist")
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-3')
    .counttodos(1)
})  

it("should can edit it's priority to medium and maintain it's title", () => {
    cy.window()
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-3')
    .counttodos(1)
    .openeditmodal()
    .get('[data-cy="edit-priority"]')
    .select(2)
    .get('[data-cy="edit-submit"]')
    .click()
    .get('[data-cy="modal-container"]')
    .should("not.exist")
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-2')
    .counttodos(1)
})  

it("should can edit it's priority to low and maintain it's title", () => {
    cy.window()
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-2')
    .counttodos(1)
    .openeditmodal()
    .get('[data-cy="edit-priority"]')
    .select(1)
    .get('[data-cy="edit-submit"]')
    .click()
    .get('[data-cy="modal-container"]')
    .should("not.exist")
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-1')
    .counttodos(1)
})  

it("should cannot submit a empty title edit / unchange priority", () => {
  cy.window()
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-1')
    .openeditmodal()
    .get('[data-cy="edit-title"]')
    .clear()
    .get('[data-cy="edit-submit"]')
    .click()
    .get('[data-cy="modal-container"]')
    .should("exist")
    .get('[role="alert"]')
    .get('[data-cy="edit-cancel"]')
    .click()
    .get('[data-cy="todo-title"]')
    .contains("a new to do title")
    .get('.priority-1')
});
