import {Page, Locator} from '@playwright/test';

export class MakeMyTripFilters{

    constructor(private page:Page){}

    async goto():Promise<void>{
        await this.page.goto('https://www.makemytrip.com/flight/search?itinerary=DEL-BLR-14/07/2026_BLR-DEL-15/07/2026&tripType=R&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&lang=eng');
        await this.page.waitForLoadState('networkidle');
    }

    async applyFilter(filterName:string):Promise<void>{
        await this.page.locator('label.checkboxContainer').filter({hasText: filterName}).locator('input').click();
    }

    async isFilterApplied(filterName:string):Promise<boolean>{
        return await this.page.locator('label.checkboxContainer').filter({hasText: filterName}).locator('input').isChecked();
    }
}