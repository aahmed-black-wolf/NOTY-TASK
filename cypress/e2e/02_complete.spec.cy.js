/// <reference types="Cypress"/>

describe("Complete", () => {
  it.skip("Test Complete Appneder Task", () => {
    let iterator = 0;

    for (let index = 1; index < 11; index++) {
      iterator++;
      //   Test Phase (1) - Append new Task & Confirm Complete Task
      cy.visit(Cypress.env().baseUrl);
      cy.get("[data-id='task-input']").type("First-Task");
      cy.get("[data-id='date-input']").type("2023-06-15");
      cy.get("[data-id='add-button']").click();
      cy.get(".todo-box").should("have.length", 1);

      //   Test Phase (2) - Check - Complete Task
      cy.get('[data-id="complete-button"]').click();
      cy.get(".todo-box").should("have.length", 0);
      cy.get('[data-id="complete-route"]').click();
      cy.get(".todo-box").should("have.length", iterator);

      if (index % 10 == 0) {
        cy.get('[data-id="clear-button"]').click();
        cy.get(".todo-box").should("have.length", 0);
        iterator = index % 10;
      }
    }
  });

  it("Test Appender & Complete Task by Task", () => {
    cy.visit(Cypress.env().baseUrl);
    let counter_of_test = 10;
    for (let index = 0; index < counter_of_test; index++) {
      cy.get("[data-id='task-input']").type(`Task-${index + 1}`);
      cy.get("[data-id='date-input']").type("2023-06-15");
      cy.get("[data-id='add-button']").click();
    }
    cy.get(".todo-box").should("have.length", counter_of_test);

    cy.get('[data-id="complete-button"]').each(($button) => {
      cy.wrap($button).click();
    });
    cy.visit(`${Cypress.env().baseUrl}complete`);
    cy.get(".todo-box").should("have.length", counter_of_test);
  });

  it("Check Local Storage Data", () => {
    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("complete-data"))).to.equal(
        null
      );
    });
    cy.visit(Cypress.env().baseUrl);
    cy.get("[data-id='task-input']").type(`First-Task`);
    cy.get("[data-id='date-input']").type("2023-08-15");
    cy.get("[data-id='add-button']").click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("todo-data")).length).to.equal(
        1
      );
    });
    cy.get('[data-id="clear-button"]').click();
    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("todo-data"))).to.equal(null);
      expect(JSON.parse(win.localStorage.getItem("complete-data"))).to.equal(
        null
      );
    });
  });
});
