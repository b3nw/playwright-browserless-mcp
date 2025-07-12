#!/bin/bash

echo "🚀 Verifying Playwright MCP Server Installation"
echo "=============================================="

# Check if globally installed
echo "📦 Checking global installation..."
if command -v playwright-mcp-server >/dev/null 2>&1; then
    echo "✅ playwright-mcp-server globally installed"
    playwright-mcp-server --help >/dev/null 2>&1 && echo "✅ Server starts successfully"
else
    echo "⚠️  playwright-mcp-server not found globally"
    echo "   Install with: npm install -g playwright-mcp-server"
    echo "   Or run from source: npm run build && npm link"
fi

echo ""
echo "🎯 Simple integration commands:"
echo ""
echo "Claude Code:"
echo "claude mcp add playwright-server -s user -- playwright-mcp-server --url ws://your-browserless-host:3000/playwright/chromium"
echo ""
echo "Cursor AI:"
echo "cursor mcp add playwright-server -- playwright-mcp-server --url ws://your-browserless-host:3000/playwright/chromium"
echo ""
echo "🎉 No complex paths or directories needed!"
echo "   Just install globally and specify your browserless URL"