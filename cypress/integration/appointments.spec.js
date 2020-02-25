import { wait } from "@testing-library/react";

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
  });

  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click()
      // validating that Monday was selected
      .should("have.class", "day-list__item--selected");

    cy.get('[alt="Add"]')
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Archie Cohen");
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  });

  it("should edit an interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click()
      // validating that Monday was selected
      .should("have.class", "day-list__item--selected");

      cy.contains("Archie Cohen")
      cy.get("[alt='Edit']")
      .first()
      .click({force: true});

    cy.get("[data-testid=student-name-input]").clear().type("Anakin Skywalker");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Anakin Skywalker");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
