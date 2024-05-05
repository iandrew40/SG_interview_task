/**
 * Module: DropdownComponent
 * Description: This module contains the page object model for interacting with dropdown components.
 * Author: Andrey Ivanov
 * Date: 04.05.2024
 */
import {Page} from "@playwright/test";

export class DropdownComponent {

    /**
     * Constructor for DropdownComponent class
     * @param {Page} page - Playwright page object
     */
    constructor(private page: Page) {
    }

    // Dropdown locators
    private emailAccount = this.page.getByTestId('email-filters-users');
    private dropdownMatchCondition = this.page.getByTestId('match-condition');
    private dropdownSubject = this.page.getByTestId('subject');
    private dropdownComparison = this.page.getByTestId('comparision');
    private dropdownActions = this.page.getByTestId('actions');

    // Dropdown methods
    /**
     * Selects an email account from the dropdown
     * @param {string} emailAccount - Email account to be selected
     */
    async selectEmailAccount(emailAccount: string): Promise<void> {
        await this.emailAccount.click();
        await this.page.getByText(emailAccount, {exact: true}).click();
    }

    /**
     * Selects a condition from the dropdown
     * @param {string} condition - Condition to be selected
     */
    async selectCondition(condition: string): Promise<void> {
        await this.dropdownMatchCondition.click();
        await this.page.getByRole('option', {name: condition}).click();
    }

    /**
     * Selects a subject from the dropdown
     * @param {string} subject - Subject to be selected
     */
    async selectSubject(subject: string): Promise<void> {
        await this.dropdownSubject.click();
        await this.page.getByRole('option', {name: subject}).click();
    }

    /**
     * Selects a comparison from the dropdown
     * @param {string} comparison - Comparison to be selected
     */
    async selectComparison(comparison: string): Promise<void> {
        await this.dropdownComparison.click();
        await this.page.getByRole('option', {name: comparison}).click();
    }

    /**
     * Selects an action from the dropdown
     * @param {string} action - Action to be selected
     */
    async selectAction(action: string): Promise<void> {
        await this.dropdownActions.click();
        await this.page.getByRole('option', {name: action}).click();
    }
}