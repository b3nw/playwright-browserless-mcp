# Playwright MCP Server

A Model Context Protocol (MCP) server that provides web automation tools via a remote Playwright/browserless instance.

## Features

- Connect to any remote browserless/Playwright instance
- Web navigation and interaction tools
- Screenshot capture (full page or element-specific)
- HTML content extraction
- Element clicking and text input
- JavaScript execution with safety measures
- Comprehensive error handling and validation

## Quick Start

### 1. Install globally via npm

```bash
npm install -g playwright-mcp-server
```

### 2. Add to your AI assistant

**Claude Code:**
```bash
claude mcp add playwright-server -s user -- playwright-mcp-server --url ws://your-browserless-host:3000/playwright/chromium
```

**Cursor AI:**
```bash
cursor mcp add playwright-server -- playwright-mcp-server --url ws://your-browserless-host:3000/playwright/chromium
```

### 3. Restart your AI assistant and test

```
/mcp
```

## Installation Options

### Option 1: Global npm install (Recommended)
```bash
npm install -g playwright-mcp-server
```

### Option 2: Use with npx (No installation)
```bash
npx playwright-mcp-server --url ws://your-browserless-host:3000/playwright/chromium
```

### Option 3: Build from source
```bash
git clone <repository-url>
cd playwright-mcp
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
playwright-mcp-server --url ws://localhost:3000/playwright/chromium

# With custom settings
playwright-mcp-server --url ws://your-host:3000/playwright/chromium --timeout 60000 --width 1280 --height 720

# Using environment variable
PLAYWRIGHT_URL=ws://your-host:3000/playwright/chromium playwright-mcp-server
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
claude mcp add playwright-server -s user -- playwright-mcp-server --url ws://your-browserless-host:3000/playwright/chromium
```

**Method 2: Manual config file**
Edit `~/.config/claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "playwright-server": {
      "type": "stdio",
      "command": "playwright-mcp-server",
      "args": ["--url", "ws://your-browserless-host:3000/playwright/chromium"]
    }
  }
}
```

### Cursor AI

**Method 1: CLI**
```bash
cursor mcp add playwright-server -- playwright-mcp-server --url ws://your-browserless-host:3000/playwright/chromium
```

**Method 2: Settings UI**
1. Open Cursor preferences (`Cmd/Ctrl + ,`)
2. Navigate to "Features" → "Model Context Protocol"
3. Click "Add MCP Server"
4. Configure:
   - **Name**: `playwright-server`
   - **Command**: `playwright-mcp-server`
   - **Args**: `["--url", "ws://your-browserless-host:3000/playwright/chromium"]`

### VS Code with Claude Extension

Edit your Claude configuration to include:
```json
{
  "mcpServers": {
    "playwright-server": {
      "type": "stdio", 
      "command": "playwright-mcp-server",
      "args": ["--url", "ws://your-browserless-host:3000/playwright/chromium"]
    }
  }
}
```

## Available MCP Tools

### `navigate`
Navigate to a URL and wait for page load.
- `url` (required): URL to navigate to
- `waitUntil` (optional): "networkidle", "domcontentloaded", or "load"

### `screenshot`
Take a screenshot of the current page or specific element.
- `fullPage` (optional): Take full page screenshot (default: false)
- `selector` (optional): CSS selector for specific element

### `get_html`
Extract HTML content from the page or specific element.
- `selector` (optional): CSS selector for specific element

### `click`
Click on an element specified by CSS selector.
- `selector` (required): CSS selector for element to click

### `type_text`
Type text into an input field.
- `selector` (required): CSS selector for input element
- `text` (required): Text to type

### `wait_for_element`
Wait for an element to appear on the page.
- `selector` (required): CSS selector for element
- `timeout` (optional): Timeout in milliseconds (default: 30000)

### `evaluate`
Execute JavaScript code in the browser context.
- `script` (required): JavaScript code to execute

## Example Usage

Once configured, you can use these tools in your AI assistant:

```
Please navigate to https://example.com and take a screenshot
```

```
Fill out the form on this page with name "John Doe" and email "john@example.com"
```

```
Click the submit button and wait for the success message
```

## Troubleshooting

### Server not appearing in `/mcp`
1. Restart your AI assistant completely
2. Verify the server is installed: `playwright-mcp-server --help`
3. Check the configuration syntax in your config file

### Connection errors
1. Verify your browserless instance is running
2. Test the WebSocket URL in a browser
3. Check firewall/network settings

### Version compatibility
This server works with Playwright v1.53. If your browserless instance uses a different version, you may need to adjust the playwright dependency.

## License

MIT