#!/usr/bin/env node

import { PlaywrightMcpServer } from './server.js';
import { PlaywrightConfig } from './types.js';

function parseArgs(): PlaywrightConfig {
  const args = process.argv.slice(2);
  
  // Default configuration
  const config: PlaywrightConfig = {
    url: process.env.PLAYWRIGHT_URL || 'ws://localhost:3000/playwright/chromium',
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    timeout: 30000
  };

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--url':
      case '-u':
        if (i + 1 < args.length) {
          config.url = args[i + 1];
          i++;
        }
        break;
      case '--timeout':
      case '-t':
        if (i + 1 < args.length) {
          config.timeout = parseInt(args[i + 1]);
          i++;
        }
        break;
      case '--width':
        if (i + 1 < args.length) {
          config.defaultViewport!.width = parseInt(args[i + 1]);
          i++;
        }
        break;
      case '--height':
        if (i + 1 < args.length) {
          config.defaultViewport!.height = parseInt(args[i + 1]);
          i++;
        }
        break;
      case '--help':
      case '-h':
        console.log(`
Playwright MCP Server

Usage: node index.js [options]

Options:
  -u, --url <url>        Playwright WebSocket URL (default: ws://localhost:3000/playwright/chromium)
  -t, --timeout <ms>     Default timeout in milliseconds (default: 30000)
  --width <pixels>       Viewport width (default: 1920)
  --height <pixels>      Viewport height (default: 1080)
  -h, --help            Show this help message

Environment Variables:
  PLAYWRIGHT_URL         Alternative way to set the Playwright URL

Example:
  node index.js --url ws://your-browserless-host:3000/playwright/chromium
        `);
        process.exit(0);
        break;
    }
  }

  return config;
}

async function main() {
  try {
    const config = parseArgs();
    
    console.error(`Starting Playwright MCP Server`);
    console.error(`Playwright URL: ${config.url}`);
    console.error(`Viewport: ${config.defaultViewport?.width}x${config.defaultViewport?.height}`);
    console.error(`Timeout: ${config.timeout}ms`);
    
    const server = new PlaywrightMcpServer(config);
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.error('Shutting down...');
      await server.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.error('Shutting down...');
      await server.stop();
      process.exit(0);
    });
    
    await server.start();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});