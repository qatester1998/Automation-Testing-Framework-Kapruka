import { test, expect } from '@playwright/test';
import { TablePage } from '@pages/TablePage';

test('Validate ascending and descending sorting', async ({ page }) => {

    const tablePage = new TablePage(page);

    // Navigate
    await tablePage.navigateToPage();

    // ==========================
    // ASCENDING VALIDATION
    // ==========================

    const originalValues = await tablePage.getLastNames();
    console.log('Original Values:', originalValues);

    const expectedAscending = [...originalValues].sort();
    console.log('Expected Ascending:', expectedAscending);

    await tablePage.clickLastNameColumn();

    const actualAscending = await tablePage.getLastNames();
    console.log('Actual Ascending:', actualAscending);

    expect(actualAscending).toEqual(expectedAscending);

    // ==========================
    // DESCENDING VALIDATION
    // ==========================

    const expectedDescending = [...expectedAscending].reverse();
    console.log('Expected Descending:', expectedDescending);

    await tablePage.clickLastNameColumn();

    const actualDescending = await tablePage.getLastNames();
    console.log('Actual Descending:', actualDescending);

    expect(actualDescending).toEqual(expectedDescending);
});