import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { PlaywrightManager } from './playwright.js';
import { PlaywrightConfig } from './types.js';
import { z } from 'zod';

export class PlaywrightMcpServer {
  private server: McpServer;
  private playwright: PlaywrightManager;

  constructor(config: PlaywrightConfig) {
    this.server = new McpServer({
      name: 'playwright-mcp-server',
      version: '1.0.0'
    });

    this.playwright = new PlaywrightManager(config);
    this.setupTools();
  }

  private setupTools(): void {
    // Navigate tool
    this.server.registerTool(
      'navigate',
      {
        title: 'Navigate to URL',
        description: 'Navigate to a specified URL and wait for page load',
        inputSchema: {
          url: z.string().url(),
          waitUntil: z.enum(['networkidle', 'domcontentloaded', 'load']).optional().default('domcontentloaded')
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            url: z.string().url(),
            waitUntil: z.enum(['networkidle', 'domcontentloaded', 'load']).optional().default('domcontentloaded')
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          await page.goto(input.url, { waitUntil: input.waitUntil });
          
          return {
            content: [{
              type: 'text',
              text: `Successfully navigated to ${page.url()}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Navigation failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Screenshot tool
    this.server.registerTool(
      'screenshot',
      {
        title: 'Take Screenshot',
        description: 'Take a screenshot of the current page or a specific element',
        inputSchema: {
          fullPage: z.boolean().optional().default(false),
          selector: z.string().optional()
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            fullPage: z.boolean().optional().default(false),
            selector: z.string().optional()
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          let screenshot: Buffer;
          
          if (input.selector) {
            const element = await page.locator(input.selector);
            screenshot = await element.screenshot();
          } else {
            screenshot = await page.screenshot({ fullPage: input.fullPage });
          }
          
          return {
            content: [{
              type: 'text',
              text: `Screenshot taken (${screenshot.length} bytes), base64: ${screenshot.toString('base64')}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Screenshot failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Get HTML tool
    this.server.registerTool(
      'get_html',
      {
        title: 'Get HTML Content',
        description: 'Extract HTML content from the page or a specific element',
        inputSchema: {
          selector: z.string().optional()
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            selector: z.string().optional()
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          let html: string;
          
          if (input.selector) {
            const element = await page.locator(input.selector);
            html = await element.innerHTML();
          } else {
            html = await page.content();
          }
          
          return {
            content: [{
              type: 'text',
              text: html
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `HTML extraction failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Click tool
    this.server.registerTool(
      'click',
      {
        title: 'Click Element',
        description: 'Click on an element specified by selector',
        inputSchema: {
          selector: z.string()
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            selector: z.string()
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          await page.click(input.selector);
          
          return {
            content: [{
              type: 'text',
              text: `Successfully clicked element: ${input.selector}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Click failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Type text tool
    this.server.registerTool(
      'type_text',
      {
        title: 'Type Text',
        description: 'Type text into an input field specified by selector',
        inputSchema: {
          selector: z.string(),
          text: z.string()
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            selector: z.string(),
            text: z.string()
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          await page.fill(input.selector, input.text);
          
          return {
            content: [{
              type: 'text',
              text: `Successfully typed text into element: ${input.selector}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Type text failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Wait for element tool
    this.server.registerTool(
      'wait_for_element',
      {
        title: 'Wait for Element',
        description: 'Wait for an element to appear on the page',
        inputSchema: {
          selector: z.string(),
          timeout: z.number().optional().default(30000)
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            selector: z.string(),
            timeout: z.number().optional().default(30000)
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          await page.waitForSelector(input.selector, { timeout: input.timeout });
          
          return {
            content: [{
              type: 'text',
              text: `Element appeared: ${input.selector}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Wait for element failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Evaluate JavaScript tool
    this.server.registerTool(
      'evaluate',
      {
        title: 'Execute JavaScript',
        description: 'Execute JavaScript code in the browser context',
        inputSchema: {
          script: z.string()
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            script: z.string()
          }).parse(params);
          await this.playwright.ensureConnected();
          
          // Basic security check - prevent dangerous operations
          const script = input.script.trim();
          const dangerousPatterns = [
            /require\s*\(/,
            /import\s+/,
            /eval\s*\(/,
            /Function\s*\(/,
            /process\./,
            /global\./,
            /window\.location/,
            /document\.cookie/
          ];
          
          if (dangerousPatterns.some(pattern => pattern.test(script))) {
            throw new Error('Script contains potentially dangerous operations');
          }
          
          const page = this.playwright.getPage();
          const result = await page.evaluate(input.script);
          
          return {
            content: [{
              type: 'text',
              text: `Script executed. Result: ${JSON.stringify(result)}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Script evaluation failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }

  async stop(): Promise<void> {
    await this.playwright.disconnect();
  }
}