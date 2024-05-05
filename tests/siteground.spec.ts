/**
 * Module: EmailFiltrationTests
 * Description: This module contains tests for SitGround Email Filtration.
 * Author: Andrey Ivanov
 * Date: 04.05.2024
 */
import {test} from "@playwright/test";
import {describe} from "node:test";
import {En_TestData} from "../data/english_data";
import {Es_TestData} from "../data/spanish_data";
import {Fr_TestData} from "../data/french_data";
import {De_TestData} from "../data/german_data";
import {It_TestData} from "../data/italian_data";
import {FiltersPage} from "../pages/filterPage/filtersPage";

describe('Tests for SitGround Email Filtration.', () => {
    const testData = [En_TestData, Fr_TestData, De_TestData, It_TestData, Es_TestData];

    describe('Task 1 in all the available languages', () => {
        for (const data of testData) {
            test(`TC#1 Add an email filter. - ${data}`, async ({page}) => {
                const filterPage = new FiltersPage(page);

                await page.goto(data.LINK);
                await filterPage.navigateToPage();

                await filterPage.dropdownComponent.selectEmailAccount(data.EMAIL_ACCOUNT);
                await filterPage.createMailFilter(filterPage, data.FILTER_NAME, data.CONDITION, data.SUBJECT,
                    data.COMPARISON, data.CONDITION_CRITERIA, data.ACTION, data.FILL_ACTION);
                await filterPage.checkForFilterCreateSuccessIcon();
                await filterPage.expectedNumberOfRowsOfManageFiltersTable(1);
                await filterPage.checkIfManageFiltersTableContainsFilterName(data.FILTER_NAME);
            });
        }
    });

    describe('Task 2 in all the available languages', () => {
        for (const data of testData) {
            test(`TC#2 Delete an email filter. -> ${data}`, async ({page}) => {
                const filterPage = new FiltersPage(page);
                const filterName1 = 'Filter name 1';
                const filterName2 = 'Filter name 2';

                await page.goto(data.LINK);
                await filterPage.navigateToPage();

                await filterPage.dropdownComponent.selectEmailAccount(data.EMAIL_ACCOUNT);
                await filterPage.createMailFilter(filterPage, filterName1, data.CONDITION, data.SUBJECT, data.COMPARISON,
                    data.CONDITION_CRITERIA, data.ACTION, data.FILL_ACTION);
                await filterPage.checkForFilterCreateSuccessIcon();
                await filterPage.clickBtnBack();

                await filterPage.createMailFilter(filterPage, filterName2, data.CONDITION, data.SUBJECT, data.COMPARISON,
                    data.CONDITION_CRITERIA, data.ACTION, data.FILL_ACTION);
                await filterPage.checkForFilterCreateSuccessIcon();
                await filterPage.clickBtnBack();

                await filterPage.expectedNumberOfRowsOfManageFiltersTable(2);

                await filterPage.clickDeleteBtn(2);
                await filterPage.deleteDialog.clickConfirm();
                await filterPage.checkForFilterDeleteSuccessIcon();

                await filterPage.expectedNumberOfRowsOfManageFiltersTable(1);
                await filterPage.checkIfManageFiltersTableContainsFilterName(filterName1);
            });
        }
    });

    describe('Additional tests', () => {
        for (const data of testData) {
            test(`Test for required fields. -> ${data}`, async ({page}) => {
                const filterPage = new FiltersPage(page);
                const emptyFilterName = '';
                const emptyConditionCriteria = '';
                const emptyAction = '';

                await page.goto(data.LINK);
                await filterPage.navigateToPage();

                await filterPage.dropdownComponent.selectEmailAccount(data.EMAIL_ACCOUNT);
                await filterPage.createMailFilter(filterPage, emptyFilterName, data.CONDITION, data.SUBJECT,
                    data.COMPARISON, data.CONDITION_CRITERIA, data.ACTION, data.FILL_ACTION);

                await filterPage.validationFilterNameRequiredShouldBeVisible(true);
                await filterPage.fillTextboxFilterName(data.FILTER_NAME);
                await filterPage.validationFilterNameRequiredShouldBeVisible(false);

                await filterPage.fillConditionCriteria(emptyConditionCriteria);
                await filterPage.validationConditionCriteriaRequiredShouldBeVisible(true);
                await filterPage.fillConditionCriteria(data.CONDITION_CRITERIA);
                await filterPage.validationConditionCriteriaRequiredShouldBeVisible(false);

                await filterPage.fillActions(emptyAction);
                await filterPage.validationActionRequiredShouldBeVisible(true);
                await filterPage.fillActions(data.ACTION);
                await filterPage.validationActionRequiredShouldBeVisible(false);

                await filterPage.clickBtnCreate();
                await filterPage.checkForFilterCreateSuccessIcon();
            });
        }
    });
});


