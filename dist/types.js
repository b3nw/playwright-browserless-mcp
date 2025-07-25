import { z } from 'zod';
// Input schemas for MCP tools
export const BrowserNavigateInputSchema = z.object({
    url: z.string().url(),
    waitUntil: z.enum(['networkidle', 'domcontentloaded', 'load']).optional().default('domcontentloaded')
});
export const BrowserTakeScreenshotInputSchema = z.object({
    fullPage: z.boolean().optional().default(false),
    selector: z.string().optional()
});
export const BrowserGetHtmlInputSchema = z.object({
    selector: z.string().optional()
});
export const BrowserClickInputSchema = z.object({
    selector: z.string()
});
export const BrowserTypeInputSchema = z.object({
    selector: z.string(),
    text: z.string()
});
export const BrowserWaitForInputSchema = z.object({
    selector: z.string(),
    timeout: z.number().optional().default(30000)
});
export const BrowserEvaluateInputSchema = z.object({
    script: z.string()
});
export const BrowserSnapshotInputSchema = z.object({
    selector: z.string().optional()
});
export const BrowserFileUploadInputSchema = z.object({
    selector: z.string(),
    paths: z.array(z.string()).min(1)
});
export const BrowserRefreshInputSchema = z.object({
    waitUntil: z.enum(['networkidle', 'domcontentloaded', 'load']).optional().default('load'),
    timeout: z.number().optional()
});
//# sourceMappingURL=types.js.map