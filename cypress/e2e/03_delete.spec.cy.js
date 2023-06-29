/// <reference types="Cypress"/>
describe("Delete Operations", () => {
  it("Append & Delete Task", () => {
    // Append 9 Task
    cy.visit(Cypress.env().baseUrl);
    for (let index = 1; index < 10; index++) {
      cy.gtId("task-input").type(`Task-${index}`);
      cy.gtId("date-input").type(`2023-0${index}-0${index}`);
      cy.gtId("add-button").click();
    }
    // Delete 9 Task
    cy.gtId("deleter-button").each(($button) => {
      cy.wrap($button).click();
    });
    // Check if active todo is empty
    cy.get(".todo-box").should("have.length", 0);

    // Check if LocalStorge Work right
    cy.window().then((win) => {
      expect(win.localStorage.getItem("todo-data")).to.equal(null);
      expect(
        JSON.parse(win.localStorage.getItem("delete-data")).length
      ).to.equal(9);
    });
    // Test Recover Future
    cy.gtId("delete-route").click();
    cy.get(".todo-box").should("have.length", 9);
    cy.gtId("recover-button").each(($button) => {
      cy.wrap($button).click();
    });
    cy.get(".todo-box").should("have.length", 0);
    // Check if LocalStorge Work right
    cy.window().then((win) => {
      expect(win.localStorage.getItem("delete-data")).to.equal(null);
      expect(JSON.parse(win.localStorage.getItem("todo-data")).length).to.equal(
        9
      );
    });
    cy.gtId("home-route").click();
    cy.get(".todo-box").should("have.length", 9);

    cy.gtId("clear-button").click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("todo-data")).to.equal(null);
      expect(win.localStorage.getItem("delete-data")).to.equal(null);
    });
    cy.get(".todo-box").should("have.length", 0);
  });
});
