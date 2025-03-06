describe("Landing Page Debug", () => {
  it("should log the page content", () => {
    cy.request("http://localhost:3000").then((response) => {
      cy.log("Page Content: " + response.body.substring(0, 500)); // Show only the first 500 chars
      console.log("Full Page Content:", response.body); // Print everything in browser console
    });
  });
});

/*
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
*/
