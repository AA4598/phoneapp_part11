describe("Landing Page", () => {
    it("should display 'filter shown with:' text", () => {
      cy.visit("http://localhost:3000"); // Ensure the app is running
      cy.contains("filter shown with:").should("be.visible");
    });
  });
  