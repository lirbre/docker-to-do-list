it("should create todos", () => {
  cy.visit("http://localhost:3000");
  cy.window().createtodo(1).createtodo(2).createtodo(3).shouldhavemanytodos(3);
});

it("should can complete todos", () => {
  cy.window().completetodos({ multiple: true });
});

it("should can uncomplete todos", () => {
  cy.window().uncompletetodos({ multiple: true });
});

it("should open config modal", () => {
  cy.window().openconfigmodal();
});

it("should close config modal", () => {
  cy.window().closeconfigmodal();
});

it("should can change visibility of low priority", () => {
  cy.window()
    .openconfigmodal()
    .get('[data-cy="priority-config"]')
    .find('input[type="checkbox"]')
    .first()
    .click()
    .get('[data-cy="todo-container"]')
    .find(".priority-1")
    .should("not.exist")
    .get('[data-cy="priority-config"]')
    .find('input[type="checkbox"]')
    .first()
    .click()
    .get('[data-cy="todo-container"]')
    .find(".priority-1");
});

it("should can change visibility of medium priority", () => {
  cy.window()
    .get('[data-cy="priority-config"]')
    .find('input[type="checkbox"]')
    .eq(1)
    .click()
    .get('[data-cy="todo-container"]')
    .find(".priority-2")
    .should("not.exist")
    .get('[data-cy="priority-config"]')
    .find('input[type="checkbox"]')
    .eq(1)
    .click()
    .get('[data-cy="todo-container"]')
    .find(".priority-2");
});

it("should can change visibility of medium priority", () => {
  cy.window()
    .get('[data-cy="priority-config"]')
    .find('input[type="checkbox"]')
    .last()
    .click()
    .get('[data-cy="todo-container"]')
    .find(".priority-3")
    .should("not.exist")
    .get('[data-cy="priority-config"]')
    .find('input[type="checkbox"]')
    .last()
    .click()
    .get('[data-cy="todo-container"]')
    .find(".priority-3");
});

it("should can change visibility of complete todos", () => {
  cy.window()
    .closeconfigmodal()
    .completetodos({ multiple: true })
    .openconfigmodal()
    .get('[data-cy="hide-config"]')
    .click()
    .shouldhavemanytodos(0)
    .get('[data-cy="hide-config"]')
    .click()
    .shouldhavemanytodos(3)
    .closeconfigmodal()
    .uncompletetodos({ multiple: true })
    .get('[data-cy="todo-item"]')
    .eq(1)
    .click()
    .openconfigmodal()
    .get('[data-cy="hide-config"]')
    .click()
    .shouldhavemanytodos(2)
    .get('[data-cy="hide-config"]')
    .click()
    .closeconfigmodal()
    .get('[data-cy="todo-item"]')
    .eq(1)
    .click();
});

it("should can delete todos", () => {
  cy.window().deletetodos({ multiple: true }).shouldhavemanytodos(0);
});

it("should can sort by higher priority", () => {
  cy.window()
    .createtodo(1)
    .createtodo(3)
    .get('[data-cy="todo-item"]')
    .first()
    .should("have.class", "priority-1")
    .openconfigmodal()
    .get('[data-cy="sortpriority-config"]')
    .click()
    .closeconfigmodal()
    .get('[data-cy="todo-item"]')
    .first()
    .should("have.class", "priority-3")
    .openconfigmodal()
    .get('[data-cy="sortpriority-config"]')
    .click()
    .closeconfigmodal()
    .get('[data-cy="todo-item"]')
    .first()
    .should("have.class", "priority-1")
});

it("should delete all complete todos", () => {
  cy.window()
    .completetodos()
    .openconfigmodal()
    .get('[data-cy="deletecomplete-config"]')
    .click()
    .shouldhavemanytodos(0)
    .closeconfigmodal();
});
