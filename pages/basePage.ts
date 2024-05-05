/**
 * Module: filterPage
 * Description: This module contains the abstract base class for page objects, defining the common method navigateToPage().
 * Author: Andrey Ivanov
 * Date: 04.05.2024
 */
export abstract class BasePage {

    public abstract navigateToPage(): Promise<void>
}