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

export type NavigateInput = z.infer<typeof NavigateInputSchema>;
export type ScreenshotInput = z.infer<typeof ScreenshotInputSchema>;
export type GetHtmlInput = z.infer<typeof GetHtmlInputSchema>;
export type ClickInput = z.infer<typeof ClickInputSchema>;
export type TypeTextInput = z.infer<typeof TypeTextInputSchema>;
export type WaitForElementInput = z.infer<typeof WaitForElementInputSchema>;
export type EvaluateInput = z.infer<typeof EvaluateInputSchema>;
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