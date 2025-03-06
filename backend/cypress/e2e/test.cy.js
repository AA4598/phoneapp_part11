describe("Landing Page", () => {
  it("should display 'filter shown with:' text", () => {
    cy.visit("http://localhost:3000");
    //cy.contains("filter shown with:").should("be.visible");
    cy.contains("filter shown with:", { timeout: 10000 }).should("be.visible");
  });
});

describe("Info Page", () => {
  it("should display 'filter shown with:' text", () => {
    cy.visit("http://localhost:3000/info");
    cy.contains("Phonebook has info for").should("be.visible");
  });
});
