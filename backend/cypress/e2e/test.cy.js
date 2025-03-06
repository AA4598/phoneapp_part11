describe("Landing Page Debug", () => {
  it("should log the page content or an error message", () => {
    cy.request({
      url: "http://localhost:3000",
      failOnStatusCode: false, // Prevent Cypress from failing on non-2xx responses
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        //cy.log("✅ Page Loaded Successfully");
        //cy.log("Page Content: " + response.body.substring(0, 500)); // Show first 500 chars
        //console.log("Full Page Content:", response.body); // Print everything in browser console
      } else {
        //cy.log(`❌ Request failed with status ${response.status}: ${response.statusText}`);
        //console.error(`Error ${response.status}: ${response.statusText}`);
      }
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
