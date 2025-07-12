# MCP Playwright Server Implementation Plan

## Overview
Create an MCP server that connects to a remote browserless/playwright instance, providing web automation tools with configurable endpoints and reasonable defaults.

## Project Structure
```
playwright-mcp/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # Main server entry point
│   ├── server.ts         # MCP server implementation
│   ├── playwright.ts     # Playwright connection and utilities
│   └── types.ts          # TypeScript type definitions
└── README.md
```

## Dependencies
- `@modelcontextprotocol/sdk` - Official MCP TypeScript SDK
- `playwright` - Browser automation library
- `zod` - Input validation and schema definition
- `typescript` & `@types/node` - TypeScript support

## Configuration System
- Accept playwright URL via command line argument
- Default to `ws://localhost:3000/playwright/chromium`
- Support environment variable override: `PLAYWRIGHT_URL`
- Validate URL format and connectivity on startup

## MCP Tools to Implement

### 1. `navigate`
- **Purpose**: Navigate to a URL
- **Inputs**: `url` (string), optional `waitUntil` (networkidle, domcontentloaded, load)
- **Returns**: Success status and final URL

### 2. `screenshot`
- **Purpose**: Take a screenshot of current page
- **Inputs**: optional `fullPage` (boolean), `selector` (string)
- **Returns**: Base64 encoded PNG data
- **Defaults**: fullPage=false, viewport screenshot

### 3. `get_html`
- **Purpose**: Extract HTML content
- **Inputs**: optional `selector` (string for specific element)
- **Returns**: HTML string
- **Defaults**: Full page HTML

### 4. `click`
- **Purpose**: Click an element
- **Inputs**: `selector` (string)
- **Returns**: Success status

### 5. `type_text`
- **Purpose**: Type text into an input field
- **Inputs**: `selector` (string), `text` (string)
- **Returns**: Success status

### 6. `wait_for_element`
- **Purpose**: Wait for element to appear
- **Inputs**: `selector` (string), optional `timeout` (number, default 30000ms)
- **Returns**: Success status

### 7. `evaluate`
- **Purpose**: Execute JavaScript in browser context
- **Inputs**: `script` (string)
- **Returns**: Script execution result

## Implementation Details

### Error Handling
- Graceful connection failures to playwright endpoint
- Timeout handling for all operations
- Clear error messages for invalid selectors/operations
- Automatic retry logic for connection issues

### Browser Management
- Single browser instance with page pooling
- Automatic cleanup of resources
- Configurable viewport size (default: 1920x1080)
- User agent configuration

### Security Considerations
- Validate and sanitize all user inputs
- Restrict JavaScript execution in `evaluate` tool
- Timeout limits on all operations
- URL allowlist option for production use

## Development Steps
1. Set up TypeScript project with dependencies
2. Implement basic MCP server structure
3. Add playwright connection management
4. Implement core tools (navigate, screenshot, get_html)
5. Add interactive tools (click, type_text, wait_for_element)
6. Implement evaluate tool with safety measures
7. Add comprehensive error handling
8. Create configuration system
9. Write documentation and examples
10. Add tests and validation