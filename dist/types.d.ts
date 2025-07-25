import { z } from 'zod';
export interface PlaywrightConfig {
    url: string;
    defaultViewport?: {
        width: number;
        height: number;
    };
    timeout?: number;
}
export declare const BrowserNavigateInputSchema: z.ZodObject<{
    url: z.ZodString;
    waitUntil: z.ZodDefault<z.ZodOptional<z.ZodEnum<["networkidle", "domcontentloaded", "load"]>>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    waitUntil: "networkidle" | "domcontentloaded" | "load";
}, {
    url: string;
    waitUntil?: "networkidle" | "domcontentloaded" | "load" | undefined;
}>;
export declare const BrowserTakeScreenshotInputSchema: z.ZodObject<{
    fullPage: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    selector: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullPage: boolean;
    selector?: string | undefined;
}, {
    fullPage?: boolean | undefined;
    selector?: string | undefined;
}>;
export declare const BrowserGetHtmlInputSchema: z.ZodObject<{
    selector: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    selector?: string | undefined;
}, {
    selector?: string | undefined;
}>;
export declare const BrowserClickInputSchema: z.ZodObject<{
    selector: z.ZodString;
}, "strip", z.ZodTypeAny, {
    selector: string;
}, {
    selector: string;
}>;
export declare const BrowserTypeInputSchema: z.ZodObject<{
    selector: z.ZodString;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    selector: string;
    text: string;
}, {
    selector: string;
    text: string;
}>;
export declare const BrowserWaitForInputSchema: z.ZodObject<{
    selector: z.ZodString;
    timeout: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    selector: string;
    timeout: number;
}, {
    selector: string;
    timeout?: number | undefined;
}>;
export declare const BrowserEvaluateInputSchema: z.ZodObject<{
    script: z.ZodString;
}, "strip", z.ZodTypeAny, {
    script: string;
}, {
    script: string;
}>;
export declare const BrowserSnapshotInputSchema: z.ZodObject<{
    selector: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    selector?: string | undefined;
}, {
    selector?: string | undefined;
}>;
export declare const BrowserFileUploadInputSchema: z.ZodObject<{
    selector: z.ZodString;
    paths: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    selector: string;
    paths: string[];
}, {
    selector: string;
    paths: string[];
}>;
export declare const BrowserRefreshInputSchema: z.ZodObject<{
    waitUntil: z.ZodDefault<z.ZodOptional<z.ZodEnum<["networkidle", "domcontentloaded", "load"]>>>;
    timeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    waitUntil: "networkidle" | "domcontentloaded" | "load";
    timeout?: number | undefined;
}, {
    waitUntil?: "networkidle" | "domcontentloaded" | "load" | undefined;
    timeout?: number | undefined;
}>;
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
//# sourceMappingURL=types.d.ts.map