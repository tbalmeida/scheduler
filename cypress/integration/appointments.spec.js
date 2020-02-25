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

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Changes the name and interviewer
    // Clicks the save button
    // Sees the edit to the appointment

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
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

});

/* 




"should cancel an interview"

    Visits the root of our web server
    Clicks the delete button for the existing appointment
    Clicks the confirm button
    Sees that the appointment slot is empty


 */
