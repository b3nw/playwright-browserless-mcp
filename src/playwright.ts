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
    const maxRetries = 3;
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Clean up any existing connections first
        await this.cleanup();
        
        this.browser = await chromium.connect(this.config.url);
        this.page = await this.browser.newPage({
          viewport: this.config.defaultViewport || { width: 1920, height: 1080 }
        });
        
        // Set default timeout
        this.page.setDefaultTimeout(this.config.timeout || 30000);
        
        // Set up error handlers
        this.browser.on('disconnected', () => {
          this.cleanup();
        });
        
        this.page.on('close', () => {
          this.page = null;
        });
        
        return; // Success
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw new Error(`Failed to connect to Playwright at ${this.config.url} after ${maxRetries} attempts: ${lastError?.message}`);
  }

  async disconnect(): Promise<void> {
    try {
      if (this.page && !this.page.isClosed()) {
        await this.page.close();
      }
    } catch (error) {
      // Page might already be closed
    }
    this.page = null;

    try {
      if (this.browser && this.browser.isConnected()) {
        await this.browser.close();
      }
    } catch (error) {
      // Browser might already be closed
    }
    this.browser = null;
  }

  getPage(): Page {
    if (!this.page) {
      throw new Error('Playwright not connected. Call connect() first.');
    }
    return this.page;
  }

  async isConnected(): Promise<boolean> {
    if (!this.browser || !this.page) {
      return false;
    }
    
    try {
      // Check if browser is still connected
      if (!this.browser.isConnected()) {
        return false;
      }
      
      // Check if page is still alive by trying a simple operation
      if (this.page.isClosed()) {
        return false;
      }
      
      // Verify connection with a lightweight operation
      await this.page.evaluate(() => true);
      return true;
    } catch (error) {
      // Connection lost
      await this.cleanup();
      return false;
    }
  }

  private async cleanup(): Promise<void> {
    this.page = null;
    this.browser = null;
  }

  async ensureConnected(): Promise<void> {
    const connected = await this.isConnected();
    if (!connected) {
      await this.cleanup();
      await this.connect();
    }
  }
}