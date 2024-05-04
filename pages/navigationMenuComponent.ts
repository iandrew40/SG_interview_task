import {Page} from "@playwright/test";

export class NavigationMenuComponent {
    constructor(private page: Page) {
    }

    private btnEmailNavigationBar = this.page.locator('.sg-navigation-list').getByTestId('navigation-group-mail');
    private btnFiltersNavigationBar = this.page.getByTestId('navigation-list-item-email-filters');


    async clickBtnEmailNavigationBar(): Promise<void> {
        await this.btnEmailNavigationBar.click();
    }

    async clickBtnFiltersNavigationBar(): Promise<void> {
        await this.btnFiltersNavigationBar.click();
    }
}