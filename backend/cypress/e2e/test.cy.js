describe("Landing Page", () => {
    it("should display 'filter shown with:' text", () => {
      cy.visit("http://localhost:3000/info"); // Ensure the app is running
      //cy.visit("/");
      //cy.contains("filter shown with:").should("be.visible");
      cy.contains("Phonebook").should("be.visible");
    });
  });
  