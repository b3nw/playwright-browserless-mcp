import { chromium, Browser, Page } from 'playwright';
import { PlaywrightConfig } from './types.js';

export class PlaywrightManager {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private config: PlaywrightConfig;

  constructor(config: PlaywrightConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      this.browser = await chromium.connect(this.config.url);
      this.page = await this.browser.newPage({
        viewport: this.config.defaultViewport || { width: 1920, height: 1080 }
      });
      
      // Set default timeout
      this.page.setDefaultTimeout(this.config.timeout || 30000);
    } catch (error) {
      throw new Error(`Failed to connect to Playwright at ${this.config.url}: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  getPage(): Page {
    if (!this.page) {
      throw new Error('Playwright not connected. Call connect() first.');
    }
    return this.page;
  }

  isConnected(): boolean {
    return this.browser !== null && this.page !== null;
  }

  async ensureConnected(): Promise<void> {
    if (!this.isConnected()) {
      await this.connect();
    }
  }
}