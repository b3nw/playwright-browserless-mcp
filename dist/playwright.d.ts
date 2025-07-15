import { Page } from 'playwright';
import { PlaywrightConfig } from './types.js';
export declare class PlaywrightManager {
    private browser;
    private page;
    private config;
    constructor(config: PlaywrightConfig);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getPage(): Page;
    isConnected(): Promise<boolean>;
    private cleanup;
    ensureConnected(): Promise<void>;
}
//# sourceMappingURL=playwright.d.ts.map