import { z } from 'zod';
export interface PlaywrightConfig {
    url: string;
    defaultViewport?: {
        width: number;
        height: number;
    };
    timeout?: number;
}
export declare const NavigateInputSchema: z.ZodObject<{
    url: z.ZodString;
    waitUntil: z.ZodDefault<z.ZodOptional<z.ZodEnum<["networkidle", "domcontentloaded", "load"]>>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    waitUntil: "networkidle" | "domcontentloaded" | "load";
}, {
    url: string;
    waitUntil?: "networkidle" | "domcontentloaded" | "load" | undefined;
}>;
export declare const ScreenshotInputSchema: z.ZodObject<{
    fullPage: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    selector: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullPage: boolean;
    selector?: string | undefined;
}, {
    fullPage?: boolean | undefined;
    selector?: string | undefined;
}>;
export declare const GetHtmlInputSchema: z.ZodObject<{
    selector: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    selector?: string | undefined;
}, {
    selector?: string | undefined;
}>;
export declare const ClickInputSchema: z.ZodObject<{
    selector: z.ZodString;
}, "strip", z.ZodTypeAny, {
    selector: string;
}, {
    selector: string;
}>;
export declare const TypeTextInputSchema: z.ZodObject<{
    selector: z.ZodString;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    selector: string;
    text: string;
}, {
    selector: string;
    text: string;
}>;
export declare const WaitForElementInputSchema: z.ZodObject<{
    selector: z.ZodString;
    timeout: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    selector: string;
    timeout: number;
}, {
    selector: string;
    timeout?: number | undefined;
}>;
export declare const EvaluateInputSchema: z.ZodObject<{
    script: z.ZodString;
}, "strip", z.ZodTypeAny, {
    script: string;
}, {
    script: string;
}>;
export type NavigateInput = z.infer<typeof NavigateInputSchema>;
export type ScreenshotInput = z.infer<typeof ScreenshotInputSchema>;
export type GetHtmlInput = z.infer<typeof GetHtmlInputSchema>;
export type ClickInput = z.infer<typeof ClickInputSchema>;
export type TypeTextInput = z.infer<typeof TypeTextInputSchema>;
export type WaitForElementInput = z.infer<typeof WaitForElementInputSchema>;
export type EvaluateInput = z.infer<typeof EvaluateInputSchema>;
//# sourceMappingURL=types.d.ts.map