/**
 * Module: filterPage
 * Description: This module contains the page object model for interacting with the navigation menu component of the site.
 * Author: Andrey Ivanov
 * Date: 04.05.2024
 */
import {Page} from "@playwright/test";

/**
 * Constructor for NavigationMenuComponent class
 * @param {Page} page - Playwright page object
 */
export class NavigationMenuComponent {
    constructor(private page: Page) {
    }

    // Page locators
    private btnEmailNavigationBar = this.page.locator('.sg-navigation-list').getByTestId('navigation-group-mail');
    private btnFiltersNavigationBar = this.page.getByTestId('navigation-list-item-email-filters');


    // Page methods
    /**
     * Clicks the Email Navigation Bar button
     */
    async clickBtnEmailNavigationBar(): Promise<void> {
        await this.btnEmailNavigationBar.click();
    }

    /**
     * Clicks the Filters Navigation Bar button
     */
    async clickBtnFiltersNavigationBar(): Promise<void> {
        await this.btnFiltersNavigationBar.click();
    }
}