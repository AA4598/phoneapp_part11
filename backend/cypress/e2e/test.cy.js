
describe("Logging Debug", () => {
  it("should log a test message", () => {
    cy.task("log", "✅ Cypress logging works! This should appear in GitHub Actions.");
  });
});



describe("Landing Page Debug", () => {
  it("should log the page content or an error message", () => {
    cy.request({
      url: "http://localhost:3000",
      failOnStatusCode: false, // Prevent test failure on errors
    }).then((response) => {
      cy.task("log", `🔍 HTTP Status: ${response.status}`);

      if (response.status >= 200 && response.status < 300) {
        cy.log("✅ Page Loaded Successfully");
        cy.task("log", "✅ Page Loaded Successfully");
        cy.task("log", "Page Content (first 500 chars):\n" + response.body.substring(0, 500));
      } else {
        cy.log(`❌ Request failed with status ${response.status}: ${response.statusText}`);
        cy.task("log", `❌ Request failed with status ${response.status}: ${response.statusText}`);
      }
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
  it("should display 'Phonebook has info for' text", () => {
    cy.visit("http://localhost:3000/info");
    cy.contains("Phonebook has info for").should("be.visible");
  });
});

