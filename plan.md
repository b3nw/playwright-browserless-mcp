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

### Core Tools (Already Implemented)
1. `navigate`
   - **Purpose**: Navigate to a URL
   - **Inputs**: `url` (string), optional `waitUntil` (networkidle, domcontentloaded, load)
   - **Returns**: Success status and final URL

2. `screenshot`
   - **Purpose**: Take a screenshot of current page
   - **Inputs**: optional `fullPage` (boolean), `selector` (string)
   - **Returns**: Base64 encoded PNG data
   - **Defaults**: fullPage=false, viewport screenshot

3. `get_html`
   - **Purpose**: Extract HTML content
   - **Inputs**: optional `selector` (string for specific element)
   - **Returns**: HTML string
   - **Defaults**: Full page HTML

4. `click`
   - **Purpose**: Click an element
   - **Inputs**: `selector` (string)
   - **Returns**: Success status

5. `type_text`
   - **Purpose**: Type text into an input field
   - **Inputs**: `selector` (string), `text` (string)
   - **Returns**: Success status

6. `wait_for_element`
   - **Purpose**: Wait for element to appear
   - **Inputs**: `selector` (string), optional `timeout` (number, default 30000ms)
   - **Returns**: Success status

7. `evaluate`
   - **Purpose**: Execute JavaScript in browser context
   - **Inputs**: `script` (string)
   - **Returns**: Script execution result

### High Priority Missing Tools (Based on Microsoft Analysis)

8. `browser_snapshot` ✅ **IMPLEMENTED**
   - **Purpose**: Get accessibility tree snapshot for LLM-friendly element identification
   - **Inputs**: optional `selector` (string for specific element)
   - **Returns**: Structured accessibility data with element references
   - **Why needed**: Replaces fragile CSS selectors with semantic descriptions
   - **Status**: Fully implemented and tested. Provides detailed accessibility tree information including roles, names, states, and CSS selectors for better element identification.

9. `browser_file_upload` ✅ **IMPLEMENTED**
   - **Purpose**: Upload files to file input elements
   - **Inputs**: `selector` (string), `paths` (array of file paths)
   - **Returns**: Success status and file count
   - **Why needed**: Critical for testing file upload functionality - completely missing
   - **Status**: Fully implemented with comprehensive file validation, absolute/relative path support, and proper error handling.

10. `browser_handle_dialog`
    - **Purpose**: Handle JavaScript dialogs (alerts, confirms, prompts)
    - **Inputs**: `accept` (boolean), optional `promptText` (string)
    - **Returns**: Dialog text and action result
    - **Why needed**: Prevents test hangs from unexpected dialogs

11. `browser_navigate_back`
    - **Purpose**: Navigate back in browser history
    - **Inputs**: None
    - **Returns**: Success status and new URL
    - **Why needed**: Essential for testing multi-step workflows

12. `browser_navigate_forward`
    - **Purpose**: Navigate forward in browser history
    - **Inputs**: None
    - **Returns**: Success status and new URL
    - **Why needed**: Complete browser navigation testing

13. `browser_refresh`
    - **Purpose**: Refresh the current page
    - **Inputs**: None
    - **Returns**: Success status
    - **Why needed**: Test page refresh behavior, form resubmission scenarios

### Medium Priority Missing Tools

14. `browser_hover`
    - **Purpose**: Hover mouse over element
    - **Inputs**: `selector` (string)
    - **Returns**: Success status
    - **Why needed**: Test hover menus, tooltips, hover states

15. `browser_drag`
    - **Purpose**: Drag and drop between elements
    - **Inputs**: `startSelector` (string), `endSelector` (string)
    - **Returns**: Success status
    - **Why needed**: Test drag-drop file uploads, sortable lists, Kanban boards

16. `browser_select_option`
    - **Purpose**: Select option from dropdown/select elements
    - **Inputs**: `selector` (string), `value` (string) or `label` (string)
    - **Returns**: Success status
    - **Why needed**: Complete form interaction beyond basic text input

17. `browser_check`
    - **Purpose**: Check checkbox or radio button
    - **Inputs**: `selector` (string)
    - **Returns**: Success status
    - **Why needed**: Form completion for checkboxes and radio buttons

18. `browser_uncheck`
    - **Purpose**: Uncheck checkbox
    - **Inputs**: `selector` (string)
    - **Returns**: Success status
    - **Why needed**: Toggle checkbox states in forms

19. `browser_fill`
    - **Purpose**: Fill multiple form fields at once
    - **Inputs**: `fields` (object with selector-value pairs)
    - **Returns**: Success status
    - **Why needed**: Efficient form completion vs individual type_text calls

### Low Priority Missing Tools

20. `browser_console_messages`
    - **Purpose**: Get browser console messages
    - **Inputs**: None
    - **Returns**: Array of console messages
    - **Why needed**: Debug JavaScript errors and application logs

21. `browser_pdf_save`
    - **Purpose**: Save current page as PDF
    - **Inputs**: optional `filename` (string)
    - **Returns**: PDF data or file path
    - **Why needed**: Generate test reports, test PDF export features

22. `browser_download`
    - **Purpose**: Handle file downloads
    - **Inputs**: optional `downloadPath` (string)
    - **Returns**: Download status and file path
    - **Why needed**: Test file download functionality

23. `browser_clear`
    - **Purpose**: Clear input field content
    - **Inputs**: `selector` (string)
    - **Returns**: Success status
    - **Why needed**: Reset form fields before new input

24. `browser_focus`
    - **Purpose**: Focus on specific element
    - **Inputs**: `selector` (string)
    - **Returns**: Success status
    - **Why needed**: Test focus management, keyboard navigation

25. `browser_close`
    - **Purpose**: Close the browser/page
    - **Inputs**: None
    - **Returns**: Success status
    - **Why needed**: Clean shutdown of browser sessions

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

### File Handling
- Support for absolute file paths in upload/download operations
- Temporary file management for downloads
- File type validation for uploads
- Size limits for file operations

## Development Steps
1. ✅ Set up TypeScript project with dependencies
2. ✅ Implement basic MCP server structure
3. ✅ Add playwright connection management
4. ✅ Implement core tools (navigate, screenshot, get_html)
5. ✅ Add interactive tools (click, type_text, wait_for_element)
6. ✅ Implement evaluate tool with safety measures
7. ✅ Add comprehensive error handling
8. ✅ Create configuration system
9. ✅ Write documentation and examples
10. ✅ Add tests and validation

### Next Phase: Missing Tools Implementation
11. ✅ Implement browser_snapshot for accessibility tree 
12. Add browser_file_upload for file testing
13. Implement browser_handle_dialog for dialog handling
14. Add browser navigation tools (back/forward/refresh)
15. Implement advanced element interactions (hover, drag, select)
16. Add debugging tools (console messages, PDF generation)
17. Implement form utilities (fill, clear, check/uncheck)
18. Add file download handling
19. Create comprehensive test suite for new tools
20. Update documentation with new capabilities
