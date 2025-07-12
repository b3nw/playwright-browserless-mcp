import { z } from 'zod';
// Input schemas for MCP tools
export const NavigateInputSchema = z.object({
    url: z.string().url(),
    waitUntil: z.enum(['networkidle', 'domcontentloaded', 'load']).optional().default('domcontentloaded')
});
export const ScreenshotInputSchema = z.object({
    fullPage: z.boolean().optional().default(false),
    selector: z.string().optional()
});
export const GetHtmlInputSchema = z.object({
    selector: z.string().optional()
});
export const ClickInputSchema = z.object({
    selector: z.string()
});
export const TypeTextInputSchema = z.object({
    selector: z.string(),
    text: z.string()
});
export const WaitForElementInputSchema = z.object({
    selector: z.string(),
    timeout: z.number().optional().default(30000)
});
export const EvaluateInputSchema = z.object({
    script: z.string()
});
//# sourceMappingURL=types.js.map