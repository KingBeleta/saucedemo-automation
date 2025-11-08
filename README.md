# SauceDemo Automation Suite

## Overview
This repository contains an automated test suite for [SauceDemo](https://www.saucedemo.com/), a demo e-commerce web application.  
The goal of this project is to demonstrate **quality-focused test automation** using Playwright and TypeScript, prioritizing maintainability, modularity, and meaningful test coverage.
Other user profiles (e.g. problem_user, performance_glitch_user) were considered out of scope as they simulate artificial failure modes not representative of real user behavior. 
The focus of this suite is reliability and maintainable coverage of core, stable paths.

---

## Scalability

- Page Object Model (POM) allows easy addition of new pages and flows.
- Data-driven tests make adding new scenarios simple.
- Parallel execution is enabled for faster runs.
- Modular structure supports CI/CD integration and larger test suites.

---

## Test Coverage

- Positive scenarios: login, checkout, multiple items
- Negative scenarios: invalid login, locked-out user
- UI behavior: sorting, cart persistence
- Form validation: checkout fields

---

## Test Strategy

The suite is designed with **business-critical flows** in mind:

1. **Happy Path Testing**
   - Login as `standard_user`.
   - Add one or multiple items to cart.
   - Checkout and validate order completion.
   - Logout.

2. **Sorting / Filtering Validation**
   - Validate sorting by Name (A→Z, Z→A).
   - Validate sorting by Price (Low→High, High→Low).

3. **Negative Testing**
   - Invalid login credentials.
   - Locked-out user login.

4. **Cart Persistence**
   - Validate items remain in the cart after navigation and logout/login.

5. **Checkout Validation**
   - Verify required fields are enforced (First Name, Last Name, Postal Code).


The suite focuses on **high-priority, high-risk functionality**, emphasizing maintainability and reusability through **Page Object Model (POM)** and **data-driven testing**.

---

## Project Structure

saucedemo-automation/
#### ├─ tests/ # Test files
#### ├─ locators/ # Page locators
#### ├─ pages/ # Page Objects
#### ├─ test-data/ # JSON test data
#### ├─ utils/ # BaseTest, Generic utilities
#### ├─ test-results/ # Test outputs (screenshots, HTML reports)
#### ├─ playwright.config.ts # Playwright configuration
#### ├─ package.json


---

## Running Tests
npm test

---

## Failure Artifacts

Playwright captures:
- Screenshots on failure (`test-results/`)
- Trace logs
- Video recordings of failed tests
These artifacts are automatically attached for debugging.

---

## CI/CD Integration

This project is integrated with GitHub Actions. On each push or pull request to the `main` branch, the workflow:
- Installs dependencies and Playwright browsers
- Runs all automated tests
- Generates HTML report
- Uploads the report as a workflow artifact

---




