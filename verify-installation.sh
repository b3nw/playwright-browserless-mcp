#!/bin/bash

echo "🚀 Verifying Playwright MCP Server"
echo "=================================="

# Check if npx can run the package
echo "📦 Testing npx execution..."
if npx https://github.com/b3nw/playwright-browserless-mcp.git --help >/dev/null 2>&1; then
    echo "✅ Package runs successfully with npx"
else
    echo "❌ Failed to run with npx"
    echo "   Make sure you have Node.js and npm installed"
fi

echo ""
echo "🎯 AI Assistant integration commands:"
echo ""
echo "Claude Code:"
echo "claude mcp add playwright-server -s user -- npx https://github.com/b3nw/playwright-browserless-mcp.git --url ws://your-browserless-host:3000/playwright/chromium"
echo ""
echo "Cursor AI:"
echo "cursor mcp add playwright-server -- npx https://github.com/b3nw/playwright-browserless-mcp.git --url ws://your-browserless-host:3000/playwright/chromium"
echo ""
echo "🎉 No installation required!"
echo "   Just configure your AI assistant to use npx with your browserless URL"