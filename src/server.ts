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
      'browser_navigate',
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
      'browser_take_screenshot',
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
      'browser_get_html',
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
      'browser_click',
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
      'browser_type',
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
      'browser_wait_for',
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
      'browser_evaluate',
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

    // Browser snapshot tool
    this.server.registerTool(
      'browser_snapshot',
      {
        title: 'Get Accessibility Tree Snapshot',
        description: 'Get accessibility tree snapshot for LLM-friendly element identification',
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
          
          // Get the accessibility tree
          let snapshot;
          if (input.selector) {
            // Get accessibility snapshot for specific element
            const element = await page.locator(input.selector);
            snapshot = await element.locator('xpath=.').first().evaluate(async (el) => {
              // Use the browser's accessibility API to get semantic information
              const computedRole = el.getAttribute('role') || el.tagName.toLowerCase();
              const computedName = el.getAttribute('aria-label') || 
                                 el.getAttribute('aria-labelledby') || 
                                 el.getAttribute('title') || 
                                 (el as any).innerText?.trim() || 
                                 el.getAttribute('alt') || 
                                 el.getAttribute('placeholder') || '';
              
              return {
                role: computedRole,
                name: computedName,
                value: (el as any).value || el.getAttribute('aria-valuenow') || '',
                description: el.getAttribute('aria-describedby') || el.getAttribute('title') || '',
                disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
                expanded: el.getAttribute('aria-expanded') === 'true',
                focused: document.activeElement === el,
                selected: el.getAttribute('aria-selected') === 'true',
                checked: el.getAttribute('aria-checked') || (el as any).checked,
                required: el.hasAttribute('required') || el.getAttribute('aria-required') === 'true',
                readonly: el.hasAttribute('readonly') || el.getAttribute('aria-readonly') === 'true',
                invalid: el.getAttribute('aria-invalid') || (el as any).validity?.valid === false ? 'true' : undefined,
                multiline: el.getAttribute('aria-multiline') === 'true',
                autocomplete: el.getAttribute('autocomplete'),
                placeholder: el.getAttribute('placeholder'),
                tagName: el.tagName.toLowerCase(),
                id: el.id,
                className: el.className,
                text: (el as any).innerText?.trim() || '',
                href: (el as any).href,
                src: (el as any).src
              };
            });
          } else {
            // Get accessibility snapshot for entire page
            snapshot = await page.evaluate(() => {
              function getAccessibilityInfo(element: Element): any {
                if (!element || element.nodeType !== Node.ELEMENT_NODE) return null;
                
                const el = element as HTMLElement;
                const computedRole = el.getAttribute('role') || el.tagName.toLowerCase();
                const computedName = el.getAttribute('aria-label') || 
                                   el.getAttribute('aria-labelledby') || 
                                   el.getAttribute('title') || 
                                   el.innerText?.trim().substring(0, 100) || 
                                   el.getAttribute('alt') || 
                                   el.getAttribute('placeholder') || '';
                
                // Skip elements with no meaningful content unless they're interactive
                const interactiveRoles = ['button', 'link', 'input', 'select', 'textarea', 'checkbox', 'radio'];
                const isInteractive = interactiveRoles.includes(computedRole) || 
                                    el.hasAttribute('onclick') || 
                                    el.hasAttribute('href') || 
                                    el.tabIndex >= 0;
                
                if (!computedName && !isInteractive && !el.getAttribute('aria-label')) {
                  return null;
                }
                
                const info: any = {
                  role: computedRole,
                  name: computedName,
                  tagName: el.tagName.toLowerCase()
                };
                
                // Add important attributes
                if (el.id) info.id = el.id;
                if (el.className) info.className = el.className;
                if ((el as any).value) info.value = (el as any).value;
                if (el.getAttribute('aria-describedby')) info.description = el.getAttribute('aria-describedby');
                if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true') info.disabled = true;
                if (el.getAttribute('aria-expanded')) info.expanded = el.getAttribute('aria-expanded') === 'true';
                if (document.activeElement === el) info.focused = true;
                if (el.getAttribute('aria-selected')) info.selected = el.getAttribute('aria-selected') === 'true';
                if (el.getAttribute('aria-checked') || (el as any).checked !== undefined) {
                  info.checked = el.getAttribute('aria-checked') || (el as any).checked;
                }
                if (el.hasAttribute('required') || el.getAttribute('aria-required') === 'true') info.required = true;
                if (el.hasAttribute('readonly') || el.getAttribute('aria-readonly') === 'true') info.readonly = true;
                if ((el as any).href) info.href = (el as any).href;
                if (el.getAttribute('placeholder')) info.placeholder = el.getAttribute('placeholder');
                
                // Generate a simple CSS selector for this element
                let selector = el.tagName.toLowerCase();
                if (el.id) {
                  selector = `#${el.id}`;
                } else if (el.className) {
                  const classes = el.className.trim().split(/\s+/).slice(0, 2).join('.');
                  selector = `${selector}.${classes}`;
                }
                info.selector = selector;
                
                // Get children recursively, but limit depth to avoid huge trees
                const children: any[] = [];
                for (let child of Array.from(el.children).slice(0, 20)) { // Limit to first 20 children
                  const childInfo = getAccessibilityInfo(child);
                  if (childInfo) {
                    children.push(childInfo);
                  }
                }
                if (children.length > 0) {
                  info.children = children;
                }
                
                return info;
              }
              
              return getAccessibilityInfo(document.body);
            });
          }
          
          return {
            content: [{
              type: 'text',
              text: `Accessibility tree snapshot:\n${JSON.stringify(snapshot, null, 2)}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Browser snapshot failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Browser file upload tool
    this.server.registerTool(
      'browser_file_upload',
      {
        title: 'Upload Files to Input Element',
        description: 'Upload files to file input elements on the page',
        inputSchema: {
          selector: z.string(),
          paths: z.array(z.string()).min(1)
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            selector: z.string(),
            paths: z.array(z.string()).min(1)
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          
          // Validate that the element exists and is a file input
          const element = page.locator(input.selector);
          const elementType = await element.getAttribute('type');
          
          if (elementType !== 'file') {
            throw new Error('Target element is not a file input (type="file")');
          }
          
          // Validate that files exist (for absolute paths)
          const fs = await import('fs');
          const path = await import('path');
          
          const validatedPaths = [];
          for (const filePath of input.paths) {
            try {
              // Convert relative paths to absolute paths
              const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
              
              // Check if file exists
              if (!fs.existsSync(absolutePath)) {
                throw new Error(`File not found: ${filePath}`);
              }
              
              // Check if it's actually a file (not directory)
              const stats = fs.statSync(absolutePath);
              if (!stats.isFile()) {
                throw new Error(`Path is not a file: ${filePath}`);
              }
              
              validatedPaths.push(absolutePath);
            } catch (fileError) {
              throw new Error(`File validation failed for ${filePath}: ${fileError instanceof Error ? fileError.message : String(fileError)}`);
            }
          }
          
          // Upload the files
          await element.setInputFiles(validatedPaths);
          
          return {
            content: [{
              type: 'text',
              text: `Successfully uploaded ${validatedPaths.length} file(s) to element: ${input.selector}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `File upload failed: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // Browser refresh tool
    this.server.registerTool(
      'browser_refresh',
      {
        title: 'Refresh Current Page',
        description: 'Refresh the current page, similar to pressing F5 or clicking browser refresh',
        inputSchema: {
          waitUntil: z.enum(['networkidle', 'domcontentloaded', 'load']).optional().default('load'),
          timeout: z.number().optional()
        }
      },
      async (params: any) => {
        try {
          const input = z.object({
            waitUntil: z.enum(['networkidle', 'domcontentloaded', 'load']).optional().default('load'),
            timeout: z.number().optional()
          }).parse(params);
          await this.playwright.ensureConnected();
          
          const page = this.playwright.getPage();
          
          // Get current URL before refresh
          const currentUrl = page.url();
          
          // Perform the refresh with specified options
          const refreshOptions: any = {
            waitUntil: input.waitUntil
          };
          
          if (input.timeout !== undefined) {
            refreshOptions.timeout = input.timeout;
          }
          
          await page.reload(refreshOptions);
          
          // Get URL after refresh (should be the same unless redirected)
          const newUrl = page.url();
          
          return {
            content: [{
              type: 'text',
              text: `Successfully refreshed page. URL: ${newUrl}${currentUrl !== newUrl ? ` (redirected from ${currentUrl})` : ''}`
            }]
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Page refresh failed: ${error instanceof Error ? error.message : String(error)}`
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