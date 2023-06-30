/// <reference types="Cypress"/>

describe("TODO Operations", () => {
  it("APPEND New Task", () => {
    localStorage.clear();
    const validDate = "2023-06-30";
    cy.visit(" http://127.0.0.1:3000/");

    // Logical || Normal Phase
    cy.get('[data-id="task-input"]').type("First Task");
    cy.get('[data-id="date-input"]').type(validDate);
    cy.get('[data-id="add-button"]').click();
    cy.get(".todo-box").should("have.length", 1);
    cy.get("[data-id='clear-button']").click();
    cy.get(".todo-box").should("have.length", 0);

    //  UPNormal Phase
    cy.get('[data-id="task-input"]').type("First Task");
    cy.get('[data-id="add-button"]').click();
    cy.get(".todo-box").should("have.length", 0);
    cy.get('[data-id="date-input"]').type(validDate);
    cy.get('[data-id="add-button"]').click();
    cy.get(".todo-box").should("have.length", 1);
  });
});
