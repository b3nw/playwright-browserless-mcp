import { chromium } from 'playwright';
export class PlaywrightManager {
    browser = null;
    page = null;
    config;
    constructor(config) {
        this.config = config;
    }
    async connect() {
        try {
            this.browser = await chromium.connect(this.config.url);
            this.page = await this.browser.newPage({
                viewport: this.config.defaultViewport || { width: 1920, height: 1080 }
            });
            // Set default timeout
            this.page.setDefaultTimeout(this.config.timeout || 30000);
        }
        catch (error) {
            throw new Error(`Failed to connect to Playwright at ${this.config.url}: ${error}`);
        }
    }
    async disconnect() {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
    getPage() {
        if (!this.page) {
            throw new Error('Playwright not connected. Call connect() first.');
        }
        return this.page;
    }
    isConnected() {
        return this.browser !== null && this.page !== null;
    }
    async ensureConnected() {
        if (!this.isConnected()) {
            await this.connect();
        }
    }
}
//# sourceMappingURL=playwright.js.map