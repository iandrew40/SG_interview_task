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