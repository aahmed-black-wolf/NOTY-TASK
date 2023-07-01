/// <reference types="Cypress"/>

describe("Full Case Test", () => {
  it("Append & Complete & Delete & Recover & Clear ", () => {
    cy.visit(Cypress.env().baseUrl);

    const tasks = [
      {
        title: "Task 1",
        description: "Description for Task 1",
        date: "2023-07-24T08:30",
      },
      {
        title: "Task 2",
        description: "Description for Task 2",
        date: "2023-07-13T08:30",
      },
      {
        title: "Task 3",
        description: "Description for Task 3",
        date: "2023-07-12T08:30",
      },
      {
        title: "Task 4",
        description: "Description for Task 4",
        date: "2023-07-02T10:00",
      },
      {
        title: "Task 5",
        description: "Description for Task 5",
        date: "2023-07-03T13:15",
      },
      {
        title: "Task 6",
        description: "Description for Task 6",
        date: "2023-07-04T16:45",
      },
      {
        title: "Task 7",
        description: "Description for Task 7",
        date: "2023-07-05T09:30",
      },
      {
        title: "Task 8",
        description: "Description for Task 8",
        date: "2023-07-06T14:00",
      },
      {
        title: "Task 9",
        description: "Description for Task 9",
        date: "2023-07-07T16:30",
      },
      {
        title: "Task 10",
        description: "Description for Task 10",
        date: "2023-07-08T11:45",
      },
      {
        title: "Task 11",
        description: "Description for Task 11",
        date: "2023-07-09T13:00",
      },
      {
        title: "Task 12",
        description: "Description for Task 12",
        date: "2023-07-10T09:15",
      },
      {
        title: "Task 13",
        description: "Description for Task 13",
        date: "2023-07-11T15:30",
      },
      {
        title: "Task 14",
        description: "Description for Task 14",
        date: "2023-07-12T12:00",
      },
      {
        title: "Task 15",
        description: "Description for Task 15",
        date: "2023-07-13T10:30",
      },
      {
        title: "Task 16",
        description: "Description for Task 16",
        date: "2023-07-14T08:45",
      },
      {
        title: "Task 17",
        description: "Description for Task 17",
        date: "2023-07-15T17:00",
      },
      {
        title: "Task 18",
        description: "Description for Task 18",
        date: "2023-07-16T14:15",
      },
      {
        title: "Task 19",
        description: "Description for Task 19",
        date: "2023-07-17T12:30",
      },
      {
        title: "Task 20",
        description: "Description for Task 20",
        date: "2023-07-18T11:00",
      },
    ];

    // Phase(1) Appending
    tasks.forEach((e, i) => {
      cy.gtId("create-button").click();
      cy.gtId("title-input").type(e.title);
      cy.gtId("date-input").type(e.date);
      cy.gtId("description-input").type(e.description);
      cy.gtId("add-button").click();
      cy.gtId("form-close-button").click();
      cy.window().then((win) => {
        expect(
          JSON.parse(win.localStorage.getItem("todo-data")).length
        ).to.equal(i + 1);
      });
    });
    // Phase(2) Deleting
    cy.gtId("deleter-button").each(($button) => {
      cy.wrap($button).click();
    });
    cy.window().then((win) => {
      expect(win.localStorage.getItem("todo-data")).to.equal(null);
    });
    cy.gtId("todo-box").should("have.length", 0);
    cy.gtId("delete-route").click();
    cy.get(".todo-box").should("have.length", tasks.length);
    cy.window().then((win) => {
      expect(
        JSON.parse(win.localStorage.getItem("delete-data")).length
      ).to.equal(tasks.length);
    });
    cy.gtId("recover-button").each(($button) => {
      cy.wrap($button).click();
    });
    cy.get(".todo-box").should("have.length", 0);
    cy.window().then((win) => {
      expect(win.localStorage.getItem("delete-data")).to.equal(null);
    });
    cy.gtId("home-route").click();
    cy.get(".todo-box").should("have.length", tasks.length);
    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("todo-data")).length).to.equal(
        tasks.length
      );
    });
    // Phase(3) Pause
    cy.gtId("pause-button").each(($button) => {
      cy.wrap($button).click();
    });
    cy.window().then((win) => {
      expect(win.localStorage.getItem("todo-data")).to.equal(null);
    });
    cy.gtId("todo-box").should("have.length", 0);
    cy.gtId("pause-route").click();
    cy.get(".todo-box").should("have.length", tasks.length);
    cy.window().then((win) => {
      expect(
        JSON.parse(win.localStorage.getItem("pause-data")).length
      ).to.equal(tasks.length);
    });
    cy.gtId("recover-button").each(($button) => {
      cy.wrap($button).click();
    });
    cy.get(".todo-box").should("have.length", 0);
    cy.window().then((win) => {
      expect(win.localStorage.getItem("pause-data")).to.equal(null);
    });
    cy.gtId("home-route").click();
    cy.get(".todo-box").should("have.length", tasks.length);
    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("todo-data")).length).to.equal(
        tasks.length
      );
    });
    cy.gtId("home-route").click();
    cy.get(".todo-box").should("have.length", tasks.length);
    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("todo-data")).length).to.equal(
        tasks.length
      );
    });
    // Phase(4) Clear
    cy.gtId("clear-button").click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("todo-data")).to.equal(null);
      expect(win.localStorage.getItem("delete-data")).to.equal(null);
      expect(win.localStorage.getItem("pause-data")).to.equal(null);
    });
    cy.get(".todo-box").should("have.length", 0);
  });
});
