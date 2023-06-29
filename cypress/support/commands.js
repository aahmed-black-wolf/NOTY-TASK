Cypress.Commands.add("gtId", (id) => {
  cy.get(`[data-id=${id}]`);
});
