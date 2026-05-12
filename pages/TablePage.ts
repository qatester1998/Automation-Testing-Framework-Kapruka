import { Page, Locator } from '@playwright/test';

export class TablePage {

    readonly page: Page;
    readonly lastNameHeader: Locator;
    readonly lastNameValues: Locator;

    constructor(page: Page) {
        this.page = page;

        // ✅ Scoped specifically to table1
        this.lastNameHeader = page
            .locator('#table1')
            .getByRole('columnheader', { name: /Last Name/i });

        // ✅ Last Name column values from table1
        this.lastNameValues = page.locator(
            '#table1 tbody tr td:nth-child(1)'
        );
    }

    async navigateToPage() {
        await this.page.goto(
            'https://the-internet.herokuapp.com/tables',
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    async getLastNames(): Promise<string[]> {

        const values = await this.lastNameValues.allTextContents();

        return values.map(value => value.trim());
    }

    async clickLastNameColumn() {

        await this.lastNameHeader.click();

        // wait for sorting to complete
        await this.page.waitForTimeout(1000);
    }
}