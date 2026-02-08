# Cypress E2E Testing Framework

A End-to-End testing framework build with Cypress to validate real life user flow in a web application( The Swag Store).
This project is designed as a learning framework, following the practices in test automation, structure, and CI integration.
The purpose of this project is to automate user journeys using Cypress and ensure application stability through reliable UI tests.

# Tech Stack

- **Cypress** – End-to-End testing framework
- **ESLint & Prettier** – Code quality and formatting
- **GitHub Actions** – Continuous Integration (CI)

The application itself is stored in the src folder, while all the tests are saved in the cypress/e2e folder.

![Uploading 2026-02-08_21-00.png…]()

Folder Structure
Let me show you the folder structure:

Fixtures: Here we store different kinds of testing data, for example error messages and product information
<img width="1909" height="976" alt="image" src="https://github.com/user-attachments/assets/70087b12-69a7-4127-a3e0-ec952da67db5" />

Pages: This folder contains functions that help us interact with specific elements on a page.
<img width="1883" height="998" alt="image" src="https://github.com/user-attachments/assets/e98aeb31-ef3b-4752-9893-284ad078b1c4" />

Example Test
Now, let’s take a look at one of the tests, for example, cart.cy.js.
In the beforeEach block, we perform login and navigate to the /inventory page.

It adds two items, and verifies them.

<img width="1864" height="787" alt="image" src="https://github.com/user-attachments/assets/f2d26d7a-56fa-4c1f-af4f-91da6daef304" />

To run the tests:

Start the web application with:
npm run start-18

Open Cypress with:
npx cypress open

Once Cypress opens, we can select cart.cy.js, and all the tests will run automatically.
<img width="1274" height="195" alt="image" src="https://github.com/user-attachments/assets/93e08a42-8059-4754-be82-ef14799784e5" />

<img width="842" height="842" alt="image" src="https://github.com/user-attachments/assets/741d4075-c04a-403a-a1ae-66c836384ab9" />

Here, we can see the test results and reports.
<img width="1811" height="1136" alt="image" src="https://github.com/user-attachments/assets/29fae0f6-3651-46ff-9669-5fa74ecb8e38" />

GitHub Actions Integration
The tests are also integrated with GitHub Actions.
You can check the report directly from the GitHub Actions workflow.

<img width="1867" height="745" alt="image" src="https://github.com/user-attachments/assets/2bcd7fb2-aaec-490f-9d54-1cb59635ebca" />

<img width="1412" height="258" alt="image" src="https://github.com/user-attachments/assets/e3507664-1e2c-440a-adc5-2648330bfd2d" />

<img width="1499" height="858" alt="image" src="https://github.com/user-attachments/assets/46bb6f36-a8ac-4f31-a643-fdff9c721afc" />
