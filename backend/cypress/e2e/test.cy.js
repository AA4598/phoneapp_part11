describe("Landing Page Debug", () => {
  it("should log the page content", () => {
    cy.request("http://localhost:3000").then((response) => {
      cy.log(response.body); // Logs HTML content
      console.log(response.body); // Prints to Cypress console
    });
  });
});

describe("Landing Page", () => {
  it("should display 'filter shown with:' text", () => {
    cy.visit("http://localhost:3000");
    cy.wait(10000)
    cy.contains("filter shown with:").should("be.visible");
    //cy.contains("filter shown with:", { timeout: 10000 }).should("be.visible");
  });
});

describe("Info Page", () => {
  it("should display 'filter shown with:' text", () => {
    cy.visit("http://localhost:3000/info");
    cy.contains("Phonebook has info for").should("be.visible");
  });
});
