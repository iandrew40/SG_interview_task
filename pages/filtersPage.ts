import {expect, Page} from "@playwright/test";

export class FiltersPage {
    constructor(private page: Page) {
    }

    private emailAccount = this.page.getByTestId('email-filters-users');
    private textboxFilterName = this.page.getByTestId('text-input-filter_name');
    private dropdownMatchCondition = this.page.getByTestId('match-condition');
    private dropdownSubject = this.page.getByTestId('subject');
    private dropdownComparison = this.page.getByTestId('comparision');
    private textboxConditionCriteria = this.page.getByTestId('text-input-conditions[0].value');
    private dropdownActions = this.page.getByTestId('actions');
    private textboxActions = this.page.locator('input[name="actions[0].value"]');
    private btnCreate = this.page.getByTestId('create-box-submit');
    private successIconFilterCreate = this.page.locator('.sg-box-notification--success').locator('[data-icon="success"]');
    private btnBack = this.page.getByTestId('box-notification-back-button');
    private tableBodyManageFilter = this.page.getByTestId('table-body');
    private btnCancelDelete = this.page.getByTestId('dialog-close');
    private btnConfirmDelete = this.page.getByTestId('dialog-submit');
    private successIconFilterDelete = this.page.locator('.sg-notification__icon').locator('[data-icon="success"]');

    private alertFilterNameFieldRequired = this.page.getByTestId('text-input-filter_name-label')
        .getByTestId('validation');
    private alertConditionCriteriaFieldRequired = this.page
        .getByTestId('text-input-conditions[0].value-label').getByTestId('validation');
    private alertActionFieldRequired = this.page
        .getByTestId('text-input-actions[0].value-label').getByTestId('validation');


    async selectEmailAccount(emailAccount: string): Promise<void> {
        await this.emailAccount.click();
        await this.page.getByText(emailAccount, {exact: true}).click();
    }

    async fillTextboxFilterName(filterName: string): Promise<void> {
        await this.textboxFilterName.fill(filterName);
    }

    async selectCondition(condition: string): Promise<void> {
        await this.dropdownMatchCondition.click();
        await this.page.getByRole('option', {name: condition}).click();
    }

    async selectSubject(subject: string): Promise<void> {
        await this.dropdownSubject.click();
        await this.page.getByRole('option', {name: subject}).click();
    }

    async selectComparison(comparison: string): Promise<void> {
        await this.dropdownComparison.click();
        await this.page.getByRole('option', {name: comparison}).click();
    }

    async fillConditionCriteria(condition: string): Promise<void> {
        await this.textboxConditionCriteria.fill(condition);
    }

    async selectAction(action: string): Promise<void> {
        await this.dropdownActions.click();
        await this.page.getByRole('option', {name: action}).click();
    }

    async fillActions(action: string): Promise<void> {
        await this.textboxActions.fill(action);
    }

    async clickBtnCreate(): Promise<void> {
        await this.btnCreate.click();
    }

    async checkForFilterCreateSuccessIcon(): Promise<void> {
        await expect(this.successIconFilterCreate).toBeVisible();
    }

    async clickBtnBack(): Promise<void> {
        await this.btnBack.click();
    }

    async expectedNumberOfRowsOfManageFiltersTable(expectedNumberOfRows: number): Promise<void> {
        expect(await this.tableBodyManageFilter.locator('tr').count()).toEqual(expectedNumberOfRows);
    }

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

    async clickDeleteBtn(tableRowToDelete: number): Promise<void> {
        await this.tableBodyManageFilter.locator('tr')
            .nth(tableRowToDelete - 1).getByTestId('table-action-delete').click();
    }

    async clickBtnCancelDeleteFilter(): Promise<void> {
        await this.btnCancelDelete.click();
    }

    async clickBtnConfirmDeleteFilter(): Promise<void> {
        await this.btnConfirmDelete.click();
    }

    async validationFilterNameRequiredShouldBeVisible(beVisible: boolean): Promise<void> {
        if (beVisible) {
            await expect(this.alertFilterNameFieldRequired).toBeVisible();
        } else {
            await expect(this.alertFilterNameFieldRequired).not.toBeVisible();
        }
    }

    async validationConditionCriteriaRequiredShouldBeVisible(beVisible: boolean): Promise<void> {
        if (beVisible) {
            await expect(this.alertConditionCriteriaFieldRequired).toBeVisible();
        } else {
            await expect(this.alertConditionCriteriaFieldRequired).not.toBeVisible();
        }
    }

    async validationActionRequiredShouldBeVisible(beVisible: boolean): Promise<void> {
        if (beVisible) {
            await expect(this.alertActionFieldRequired).toBeVisible();
        } else {
            await expect(this.alertActionFieldRequired).not.toBeVisible();
        }
    }

    async checkForFilterDeleteSuccessIcon(): Promise<void> {
        await expect(this.successIconFilterDelete).toBeVisible();
    }

}