/**
 * Module: filterPage
 * Description: This module contains the page object model for interacting with the Filters page of the web UI.
 * Author: Andrey Ivanov
 * Date: 04.05.2024
 */
import {expect, Page} from "@playwright/test";
import {DeleteDialog} from "./filterPageDeleteDialog";
import {DropdownComponent} from "./filterPageComponents";
import {BasePage} from "../basePage";
import {NavigationMenuComponent} from "../navigationMenuComponent";

export class FiltersPage extends BasePage {
    /**
     * Constructor for FiltersPage class
     * @param {Page} page - Playwright page object
     */
    constructor(private page: Page) {
        super();
    }

    /**
     * Navigates to the Filters page
     */
    public async navigateToPage(): Promise<void> {
        const navigationMenuComponent = new NavigationMenuComponent(this.page);
        await navigationMenuComponent.clickBtnEmailNavigationBar();
        await navigationMenuComponent.clickBtnFiltersNavigationBar();
    }

    // Page elements
    public deleteDialog = new DeleteDialog(this.page);
    public dropdownComponent = new DropdownComponent(this.page);

    // Page locators
    private textboxFilterName = this.page.getByTestId('text-input-filter_name');
    private textboxConditionCriteria = this.page.getByTestId('text-input-conditions[0].value');
    private textboxActions = this.page.locator('input[name="actions[0].value"]');
    private btnCreate = this.page.getByTestId('create-box-submit');
    private successIconFilterCreate = this.page.locator('.sg-box-notification--success').locator('[data-icon="success"]');
    private btnBack = this.page.getByTestId('box-notification-back-button');
    private tableBodyManageFilter = this.page.getByTestId('table-body');
    private successIconFilterDelete = this.page.locator('.sg-notification__icon').locator('[data-icon="success"]');
    private alertFilterNameFieldRequired = this.page.getByTestId('text-input-filter_name-label')
        .getByTestId('validation');
    private alertConditionCriteriaFieldRequired = this.page
        .getByTestId('text-input-conditions[0].value-label').getByTestId('validation');
    private alertActionFieldRequired = this.page
        .getByTestId('text-input-actions[0].value-label').getByTestId('validation');


    //Page methods
    /**
     * Fills the Filter Name textbox with the provided value
     * @param {string} filterName - Filter name to be filled in the textbox
     */
    async fillTextboxFilterName(filterName: string): Promise<void> {
        await this.textboxFilterName.fill(filterName);
    }

    /**
     * Fills the Condition Criteria textbox with the provided value
     * @param {string} condition - Condition to be filled in the textbox
     */
    async fillConditionCriteria(condition: string): Promise<void> {
        await this.textboxConditionCriteria.fill(condition);
    }

    /**
     * Fills the Actions textbox with the provided value
     * @param {string} action - Action to be filled in the textbox
     */
    async fillActions(action: string): Promise<void> {
        await this.textboxActions.fill(action);
    }

    /**
     * Clicks the Create button
     */
    async clickBtnCreate(): Promise<void> {
        await this.btnCreate.click();
    }

    /**
     * Checks for the visibility of the success icon after filter creation
     */
    async checkForFilterCreateSuccessIcon(): Promise<void> {
        await expect(this.successIconFilterCreate).toBeVisible();
    }

    /**
     * Clicks the Back button
     */
    async clickBtnBack(): Promise<void> {
        await this.btnBack.click();
    }

    /**
     * Checks the expected number of rows in the Manage Filters table
     * @param {number} expectedNumberOfRows - Expected number of rows in the table
     */
    async expectedNumberOfRowsOfManageFiltersTable(expectedNumberOfRows: number): Promise<void> {
        expect(await this.tableBodyManageFilter.locator('tr').count()).toEqual(expectedNumberOfRows);
    }

    /**
     * Checks if the Manage Filters table contains the provided filter name
     * @param {string} filterName - Filter name to be checked in the table
     */
    async checkIfManageFiltersTableContainsFilterName(filterName: string): Promise<void> {
        const tableRows = this.tableBodyManageFilter.locator('tr');
        let filterNameIsPresent: boolean = false;

        for (let i = 0; i < await tableRows.count(); i++) {
            const row = tableRows.nth(i)
            filterNameIsPresent = await row.textContent() === filterName;
            if (filterNameIsPresent) {
                break;
            }
        }
        expect(filterNameIsPresent).toBeTruthy();
    }

    /**
     * Clicks the delete button for the specified table row
     * @param {number} tableRowToDelete - Index of the table row to delete
     */
    async clickDeleteBtn(tableRowToDelete: number): Promise<void> {
        await this.tableBodyManageFilter.locator('tr')
            .nth(tableRowToDelete - 1).getByTestId('table-action-delete').click();
    }

    /**
     * Checks the visibility of the validation message for Filter Name field
     * @param {boolean} beVisible - Whether the validation message should be visible or not
     */
    async validationFilterNameRequiredShouldBeVisible(beVisible: boolean): Promise<void> {
        if (beVisible) {
            await expect(this.alertFilterNameFieldRequired).toBeVisible();
        } else {
            await expect(this.alertFilterNameFieldRequired).not.toBeVisible();
        }
    }

    /**
     * Checks the visibility of the validation message for Condition Criteria field
     * @param {boolean} beVisible - Whether the validation message should be visible or not
     */
    async validationConditionCriteriaRequiredShouldBeVisible(beVisible: boolean): Promise<void> {
        if (beVisible) {
            await expect(this.alertConditionCriteriaFieldRequired).toBeVisible();
        } else {
            await expect(this.alertConditionCriteriaFieldRequired).not.toBeVisible();
        }
    }

    /**
     * Checks the visibility of the validation message for Action field
     * @param {boolean} beVisible - Whether the validation message should be visible or not
     */
    async validationActionRequiredShouldBeVisible(beVisible: boolean): Promise<void> {
        if (beVisible) {
            await expect(this.alertActionFieldRequired).toBeVisible();
        } else {
            await expect(this.alertActionFieldRequired).not.toBeVisible();
        }
    }

    /**
     * Checks if success icon is visible after filter deletion
     */
    async checkForFilterDeleteSuccessIcon(): Promise<void> {
        await expect(this.successIconFilterDelete).toBeVisible();
    }

    /**
     * Helper function to create a mail filter
     * @param {FiltersPage} filterPage - FiltersPage object
     * @param {string} filterName - Name of the filter
     * @param {string} condition - Condition for the filter
     * @param {string} subject - Subject for the filter
     * @param {string} comparison - Comparison for the filter
     * @param {string} conditionCriteria - Criteria for the condition
     * @param {string} selectAction - Action to select
     * @param {string} fillAction - Action to fill
     */
    async createMailFilter(filterPage: FiltersPage, filterName: string, condition: string, subject: string, comparison: string, conditionCriteria: string, selectAction: string, fillAction: string) {
        await filterPage.fillTextboxFilterName(filterName);
        await filterPage.dropdownComponent.selectCondition(condition);
        await filterPage.dropdownComponent.selectSubject(subject);
        await filterPage.dropdownComponent.selectComparison(comparison);
        await filterPage.fillConditionCriteria(conditionCriteria);
        await filterPage.dropdownComponent.selectAction(selectAction);
        await filterPage.fillActions(fillAction)
        await filterPage.clickBtnCreate();
    }
}