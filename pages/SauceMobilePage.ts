import { Page, Locator, expect } from '@playwright/test';
export class SauceMobilePage {
  readonly page: Page;
  // Login
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  // Inventory
  readonly inventoryList: Locator;
  readonly addToCartBtn: Locator;
  readonly cartBadge: Locator;

  // Menu
  readonly menuBtn: Locator;
  readonly menu: Locator;
  readonly closeMenuBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.inventoryList = page.locator('.inventory_list');
    this.addToCartBtn = page.locator('button[id^="add-to-cart"]').first();
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuBtn = page.locator('#react-burger-menu-btn');
    this.menu = page.locator('.bm-menu');
    this.closeMenuBtn = page.locator('#react-burger-cross-btn');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.inventoryList).toBeVisible();
  }

  async openMenu() {
    await this.menuBtn.click();
    await expect(this.menu).toBeVisible();
  }

  async closeMenuIfOpen() {
    if (await this.menu.isVisible()) {
      await this.closeMenuBtn.click();
      await expect(this.menu).not.toBeVisible();
    }
  }

  async addProductToCart() {
    // Critical fix: ensure menu is closed
    await this.closeMenuIfOpen();
    await this.addToCartBtn.scrollIntoViewIfNeeded();
    await this.addToCartBtn.click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: name });
  }
  
}