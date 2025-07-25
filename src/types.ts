import { z } from 'zod';

export interface PlaywrightConfig {
  url: string;
  defaultViewport?: {
    width: number;
    height: number;
  };
  timeout?: number;
}

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

export type BrowserNavigateInput = z.infer<typeof BrowserNavigateInputSchema>;
export type BrowserTakeScreenshotInput = z.infer<typeof BrowserTakeScreenshotInputSchema>;
export type BrowserGetHtmlInput = z.infer<typeof BrowserGetHtmlInputSchema>;
export type BrowserClickInput = z.infer<typeof BrowserClickInputSchema>;
export type BrowserTypeInput = z.infer<typeof BrowserTypeInputSchema>;
export type BrowserWaitForInput = z.infer<typeof BrowserWaitForInputSchema>;
export type BrowserEvaluateInput = z.infer<typeof BrowserEvaluateInputSchema>;
export type BrowserSnapshotInput = z.infer<typeof BrowserSnapshotInputSchema>;
export type BrowserFileUploadInput = z.infer<typeof BrowserFileUploadInputSchema>;
export type BrowserRefreshInput = z.infer<typeof BrowserRefreshInputSchema>;

export interface AccessibilityNode {
  role: string;
  name?: string;
  value?: string;
  description?: string;
  keyshortcuts?: string;
  roledescription?: string;
  valuetext?: string;
  disabled?: boolean;
  expanded?: boolean;
  focused?: boolean;
  modal?: boolean;
  multiline?: boolean;
  multiselectable?: boolean;
  readonly?: boolean;
  required?: boolean;
  selected?: boolean;
  checked?: boolean | 'mixed';
  pressed?: boolean | 'mixed';
  level?: number;
  valuemin?: number;
  valuemax?: number;
  autocomplete?: string;
  haspopup?: string;
  invalid?: string;
  orientation?: string;
  children?: AccessibilityNode[];
  selector?: string;
}