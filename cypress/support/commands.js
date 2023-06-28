Cypress.Commands.add("getByTestId", (id) => {
  cy.get(`[data-id=${id}]`);
});
