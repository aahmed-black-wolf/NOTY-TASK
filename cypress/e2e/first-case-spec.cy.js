/// <reference types="Cypress"/>

describe("template spec", () => {
  it("passes", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.clearLocalStorage();
    cy.getByTestId("btn").eq(0).click();
    cy.getByTestId("btn").eq(1).click();
   
  });
});
