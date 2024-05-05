/**
 * Module: filterPage
 * Description: This module contains the page object model for interacting with delete dialogs.
 * Author: Andrey Ivanov
 * Date: 05.05.2024
 */
import {Page} from "@playwright/test";

export class DeleteDialog {
    constructor(private page: Page) {
    }

    private btnCancelDelete = this.page.getByTestId('dialog-close');
    private btnConfirmDelete = this.page.getByTestId('dialog-submit');


    async clickCancel(): Promise<void> {
        await this.btnCancelDelete.click();
    }

    async clickConfirm(): Promise<void> {
        await this.btnConfirmDelete.click();
    }
}