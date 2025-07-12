import { PlaywrightConfig } from './types.js';
export declare class PlaywrightMcpServer {
    private server;
    private playwright;
    constructor(config: PlaywrightConfig);
    private setupTools;
    start(): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=server.d.ts.map