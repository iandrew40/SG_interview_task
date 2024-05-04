import {test} from "@playwright/test";
import {describe} from "node:test";
import {NavigationMenuComponent} from '../pages/navigationMenuComponent'
import {En_TestData} from "../data/english_data";
import {Es_TestData} from "../data/spanish_data";
import {Fr_TestData} from "../data/french_data";
import {De_TestData} from "../data/german_data";
import {It_TestData} from "../data/italian_data";
import {FiltersPage} from "../pages/filtersPage";


describe('Tests for SitGround Email Filtration.', () => {
    const testData = [En_TestData, Fr_TestData, De_TestData, It_TestData, Es_TestData];

    describe('Task 1 in all the available languages', () => {
        for (const data of testData) {
            test(`TC#1 Add an email filter. - ${data}`, async ({page}) => {
                await page.goto(data.LINK);

                const navigationMenuComponent = new NavigationMenuComponent(page);
                const filterPage = new FiltersPage(page);

                await navigationMenuComponent.clickBtnEmailNavigationBar();
                await navigationMenuComponent.clickBtnFiltersNavigationBar();
                await filterPage.selectEmailAccount(data.EMAIL_ACCOUNT);

                await createMailFilter(filterPage, data.FILTER_NAME, data.CONDITION, data.SUBJECT,
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
                await page.goto(data.LINK);

                const filterName1 = 'Filter name 1';
                const filterName2 = 'Filter name 2';

                const navigationMenuComponent = new NavigationMenuComponent(page);
                const filterPage = new FiltersPage(page);

                await navigationMenuComponent.clickBtnEmailNavigationBar();
                await navigationMenuComponent.clickBtnFiltersNavigationBar();
                await filterPage.selectEmailAccount(data.EMAIL_ACCOUNT);

                await createMailFilter(filterPage, filterName1, data.CONDITION, data.SUBJECT, data.COMPARISON,
                    data.CONDITION_CRITERIA, data.ACTION, data.FILL_ACTION);
                await filterPage.checkForFilterCreateSuccessIcon();
                await filterPage.clickBtnBack();

                await createMailFilter(filterPage, filterName2, data.CONDITION, data.SUBJECT, data.COMPARISON,
                    data.CONDITION_CRITERIA, data.ACTION, data.FILL_ACTION);
                await filterPage.checkForFilterCreateSuccessIcon();
                await filterPage.clickBtnBack();

                await filterPage.expectedNumberOfRowsOfManageFiltersTable(2);

                await filterPage.clickDeleteBtn(2);
                await filterPage.clickBtnConfirmDeleteFilter();
                await filterPage.checkForFilterDeleteSuccessIcon();

                await filterPage.expectedNumberOfRowsOfManageFiltersTable(1);
                await filterPage.checkIfManageFiltersTableContainsFilterName(filterName1);
            });
        }
    });

    describe('Additional tests', () => {
        for (const data of testData) {
            test(`Test for required fields. -> ${data}`, async ({page}) => {
                await page.goto(data.LINK);

                const emptyFilterName = '';
                const emptyConditionCriteria = '';
                const emptyAction = '';

                const navigationMenuComponent = new NavigationMenuComponent(page);
                const filterPage = new FiltersPage(page);

                await navigationMenuComponent.clickBtnEmailNavigationBar();
                await navigationMenuComponent.clickBtnFiltersNavigationBar();
                await filterPage.selectEmailAccount(data.EMAIL_ACCOUNT);
                await createMailFilter(filterPage, emptyFilterName, data.CONDITION, data.SUBJECT,
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

async function createMailFilter(filterPage: FiltersPage, filterName: string, condition: string, subject: string, comparison: string, conditionCriteria: string, selectAction: string, fillAction: string) {
    await filterPage.fillTextboxFilterName(filterName);
    await filterPage.selectCondition(condition);
    await filterPage.selectSubject(subject);
    await filterPage.selectComparison(comparison);
    await filterPage.fillConditionCriteria(conditionCriteria);
    await filterPage.selectAction(selectAction);
    await filterPage.fillActions(fillAction)
    await filterPage.clickBtnCreate();
}
