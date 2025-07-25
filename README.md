# Playwright MCP Server

A Model Context Protocol (MCP) server that provides comprehensive web automation tools via a remote Playwright/browserless instance. Features 10 powerful tools with Microsoft Playwright-standard naming convention.

## Features

- **10 Comprehensive Web Automation Tools** with Microsoft-standard naming
- Connect to any remote browserless/Playwright instance
- Advanced accessibility tree capture for LLM-friendly element identification
- File upload capabilities for testing forms and workflows
- Screenshot capture (full page or element-specific)
- HTML content extraction with flexible targeting
- Element interaction (clicking, typing, waiting)
- JavaScript execution with safety measures
- Page refresh with configurable wait conditions
- Comprehensive error handling and validation

## Quick Start

### 1. Add to your AI assistant (No installation required)

**Claude Code:**
```bash
claude mcp add playwright-server -s user -- npx playwright-browserless-mcp --url ws://your-browserless-host:3000/playwright/chromium
```

**Cursor AI:**
```bash
cursor mcp add playwright-server -- npx playwright-browserless-mcp --url ws://your-browserless-host:3000/playwright/chromium
```

### 2. Restart your AI assistant and test

```
/mcp
```

## Installation Options

### Option 1: Use with npx (Recommended - No installation required)
```bash
npx playwright-browserless-mcp --url ws://your-browserless-host:3000/playwright/chromium
```

### Option 2: Install globally
```bash
npm install -g playwright-browserless-mcp
playwright-browserless-mcp --url ws://your-browserless-host:3000/playwright/chromium
```

### Option 3: Build from source
```bash
git clone https://github.com/b3nw/playwright-browserless-mcp.git
cd playwright-browserless-mcp
npm install && npm run build
```

## Configuration

### Required
- `--url`: Your browserless WebSocket URL

### Optional
- `--timeout`: Request timeout in milliseconds (default: 30000)
- `--width`: Browser viewport width (default: 1920)
- `--height`: Browser viewport height (default: 1080)

### Examples

```bash
# Basic usage
npx playwright-browserless-mcp --url ws://localhost:3000/playwright/chromium

# With custom settings
npx playwright-browserless-mcp --url ws://your-host:3000/playwright/chromium --timeout 60000 --width 1280 --height 720

# Using environment variable
PLAYWRIGHT_URL=ws://your-host:3000/playwright/chromium npx playwright-browserless-mcp
```

## Setting Up Browserless

You need a running browserless/Playwright instance. Here are your options:

### Option 1: Docker (Local)
```bash
docker run -p 3000:3000 ghcr.io/browserless/chromium
```
Then use: `ws://localhost:3000/playwright/chromium`

### Option 2: Browserless Cloud
1. Sign up at [browserless.io](https://browserless.io)
2. Use your provided WebSocket URL

### Option 3: Self-hosted
Follow the [browserless documentation](https://docs.browserless.io) for self-hosting.

## AI Assistant Integration

### Claude Code

**Method 1: CLI (Recommended)**
```bash
claude mcp add playwright-server -s user -- npx playwright-browserless-mcp --url ws://your-browserless-host:3000/playwright/chromium
```

**Method 2: Manual config file**
Edit `~/.config/claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "playwright-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright-browserless-mcp", "--url", "ws://your-browserless-host:3000/playwright/chromium"]
    }
  }
}
```

### Cursor AI

**Method 1: CLI**
```bash
cursor mcp add playwright-server -- npx playwright-browserless-mcp --url ws://your-browserless-host:3000/playwright/chromium
```

**Method 2: Settings UI**
1. Open Cursor preferences (`Cmd/Ctrl + ,`)
2. Navigate to "Features" → "Model Context Protocol"
3. Click "Add MCP Server"
4. Configure:
   - **Name**: `playwright-server`
   - **Command**: `npx`
   - **Args**: `["playwright-browserless-mcp", "--url", "ws://your-browserless-host:3000/playwright/chromium"]`

### VS Code with Claude Extension

Edit your Claude configuration to include:
```json
{
  "mcpServers": {
    "playwright-server": {
      "type": "stdio", 
      "command": "npx",
      "args": ["playwright-browserless-mcp", "--url", "ws://your-browserless-host:3000/playwright/chromium"]
    }
  }
}
```

## Available MCP Tools (v1.1.0)

### Core Navigation & Interaction

#### `browser_navigate`
Navigate to a URL and wait for page load.
- `url` (required): URL to navigate to
- `waitUntil` (optional): "networkidle", "domcontentloaded", or "load"

#### `browser_click`
Click on an element specified by CSS selector.
- `selector` (required): CSS selector for element to click

#### `browser_type`
Type text into an input field.
- `selector` (required): CSS selector for input element
- `text` (required): Text to type

#### `browser_wait_for`
Wait for an element to appear on the page.
- `selector` (required): CSS selector for element
- `timeout` (optional): Timeout in milliseconds (default: 30000)

### Content Extraction & Analysis

#### `browser_take_screenshot`
Take a screenshot of the current page or specific element.
- `fullPage` (optional): Take full page screenshot (default: false)
- `selector` (optional): CSS selector for specific element

#### `browser_get_html`
Extract HTML content from the page or specific element.
- `selector` (optional): CSS selector for specific element

#### `browser_snapshot` 🆕
Get accessibility tree snapshot for LLM-friendly element identification. Perfect for understanding page structure and finding elements semantically.
- `selector` (optional): CSS selector to limit snapshot to specific element
- Returns: Structured accessibility data with roles, names, and selectors

### Advanced Features

#### `browser_file_upload` 🆕
Upload files to file input elements. Essential for testing file upload forms and workflows.
- `selector` (required): CSS selector for file input element
- `paths` (required): Array of file paths to upload

#### `browser_refresh` 🆕
Refresh the current page with configurable wait conditions.
- `waitUntil` (optional): "networkidle", "domcontentloaded", or "load" (default: "load")
- `timeout` (optional): Custom timeout in milliseconds

#### `browser_evaluate`
Execute JavaScript code in the browser context with safety measures.
- `script` (required): JavaScript code to execute

## Example Usage

Once configured, you can use these tools in your AI assistant:

### Basic Navigation
```
Please navigate to https://example.com and take a screenshot
```

### Form Interaction
```
Fill out the form on this page with name "John Doe" and email "john@example.com", then upload the resume.pdf file
```

### Advanced Analysis
```
Get an accessibility snapshot of this page to understand its structure, then click the submit button and wait for the success message
```

### Testing Workflows
```
Navigate to the login page, fill in credentials, upload a profile picture, and verify the account was created successfully
```

## What's New in v1.1.0

- 🔄 **Microsoft Playwright Standard Naming**: All tools now use `browser_` prefix for consistency
- 🆕 **Accessibility Tree Snapshots**: `browser_snapshot` tool for semantic element identification
- 📁 **File Upload Support**: `browser_file_upload` tool for testing file forms
- 🔄 **Page Refresh**: `browser_refresh` tool with configurable wait conditions
- ✅ **10 Total Tools**: Expanded from 7 to 10 comprehensive automation tools
- 🎯 **Enhanced Testing**: Better support for complex web application testing workflows

## Troubleshooting

### Server not appearing in `/mcp`
1. Restart your AI assistant completely
2. Verify the server works: `npx playwright-browserless-mcp --help`
3. Check the configuration syntax in your config file

### Connection errors
1. Verify your browserless instance is running
2. Test the WebSocket URL in a browser
3. Check firewall/network settings

### Tool naming issues
If you see old tool names (navigate, screenshot, etc.), you're using an outdated version. Update to v1.1.0:
```bash
npx playwright-browserless-mcp@latest --url your-browserless-url
```

### Version compatibility
This server works with Playwright v1.53. If your browserless instance uses a different version, you may need to adjust the playwright dependency.

## License

MIT